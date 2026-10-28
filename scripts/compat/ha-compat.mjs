#!/usr/bin/env node
// Home Assistant compatibility check: loads the built card in a real Home
// Assistant and checks that it renders, switches tabs, hosts HA's own cards
// (tile, heading, entities) and opens its visual editor without errors.
//
//   node scripts/compat/ha-compat.mjs --url http://localhost:8123 --onboard
//   node scripts/compat/ha-compat.mjs --url http://ha:8123 --token <long-lived token> [--cdp <url>] [--cleanup]
//
// --onboard   a brand-new HA: create the owner account through the onboarding
//             API and use its token (CI starts a fresh container).
// --token     an existing HA. The card must already be served at
//             /local/tabdeck-card.js (CI copies it into config/www).
// --cleanup   remove the test dashboard and helper afterwards.
//
// The test dashboard is "tabdeck-compat"; an existing dashboard with that path
// is only replaced when it was made by this script (tabdeck_compat: true).
// Prints a JSON result and appends a summary to GITHUB_STEP_SUMMARY.
import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const URL_BASE = (opt("--url") ?? "http://localhost:8123").replace(/\/$/, "");
const CDP = opt("--cdp");
const DASHBOARD = "tabdeck-compat";
const RESOURCE = "/local/tabdeck-card.js";
const CLIENT_ID = `${URL_BASE}/`;

async function api(path, { method = "GET", token, body, form } = {}) {
  const headers = {};
  if (token) headers.authorization = `Bearer ${token}`;
  let payload;
  if (form) {
    headers["content-type"] = "application/x-www-form-urlencoded";
    payload = new URLSearchParams(form).toString();
  } else if (body !== undefined) {
    headers["content-type"] = "application/json";
    payload = JSON.stringify(body);
  }
  const res = await fetch(URL_BASE + path, { method, headers, body: payload });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : {};
}

// Create the owner account on a fresh instance, finish the remaining
// onboarding steps, and return an access token.
async function onboard() {
  const { auth_code } = await api("/api/onboarding/users", {
    method: "POST",
    body: { client_id: CLIENT_ID, name: "Tabdeck CI", username: "tabdeck", password: "tabdeck-ci-only", language: "en" },
  });
  const { access_token } = await api("/auth/token", {
    method: "POST",
    form: { grant_type: "authorization_code", code: auth_code, client_id: CLIENT_ID },
  });
  for (const [step, body] of [
    ["core_config", {}],
    ["analytics", {}],
    ["integration", { client_id: CLIENT_ID, redirect_uri: `${URL_BASE}/?auth_callback=1` }],
  ]) {
    try {
      await api(`/api/onboarding/${step}`, { method: "POST", token: access_token, body });
    } catch (e) {
      // A step that's already done (or gone in a newer HA) isn't fatal.
      console.warn(`onboarding ${step}: ${e.message}`);
    }
  }
  return access_token;
}

// Minimal Home Assistant WebSocket client.
async function connect(token) {
  const ws = new WebSocket(URL_BASE.replace(/^http/, "ws") + "/api/websocket");
  let id = 0;
  const pending = new Map();
  await new Promise((resolve, reject) => {
    ws.onerror = () => reject(new Error("WebSocket error"));
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "auth_required") ws.send(JSON.stringify({ type: "auth", access_token: token }));
      else if (msg.type === "auth_ok") resolve();
      else if (msg.type === "auth_invalid") reject(new Error("auth_invalid"));
      else if (msg.type === "result" && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.success ? res(msg.result) : rej(new Error(`${msg.error?.code}: ${msg.error?.message}`));
      }
    };
  });
  return {
    send: (payload) =>
      new Promise((res, rej) => {
        const msgId = ++id;
        pending.set(msgId, { res, rej });
        ws.send(JSON.stringify({ id: msgId, ...payload }));
      }),
    close: () => ws.close(),
  };
}

// The deck under test: several features at once, using only a helper this
// script creates (input_boolean.tabdeck_compat), so any HA instance works.
function deckConfig(entity) {
  return {
    type: "custom:tabdeck-card",
    remember: "none",
    header_cards: [{ type: "markdown", content: "Tabdeck compatibility check" }],
    tabs: [
      {
        name: "Home",
        icon: "mdi:home",
        badge: "{{ 2 + 3 }}",
        layout: "sections",
        sections: [
          {
            title: "Helpers",
            icon: "mdi:toggle-switch",
            cards: [{ type: "tile", entity }, { type: "tile", entity }],
          },
        ],
      },
      { name: "Grid", icon: "mdi:view-grid", layout: "masonry", columns: 2, cards: [{ type: "entities", entities: [entity] }, { type: "markdown", content: "two" }] },
      {
        name: "When on",
        icon: "mdi:eye",
        visibility: [{ condition: "state", entity, state: "on" }],
        card: { type: "markdown", content: "visible" },
      },
    ],
  };
}

// A fresh Home Assistant can restart once while it finishes setting up
// (seen on stable right after onboarding). Wait until it reports RUNNING and
// has stayed up for a few seconds before using it.
async function waitForHa(token, { settleMs = 8000, timeoutMs = 180000 } = {}) {
  const start = Date.now();
  let upSince = 0;
  while (Date.now() - start < timeoutMs) {
    let running = false;
    try {
      running = (await api("/api/config", { token })).state === "RUNNING";
    } catch {
      running = false;
    }
    if (!running) upSince = 0;
    else if (!upSince) upSince = Date.now();
    else if (Date.now() - upSince >= settleMs) return;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("Home Assistant didn't settle into RUNNING in time");
}

// A frontend error caused by Home Assistant reloading the page (a restart),
// not by the card.
const RELOADED = /Execution context was destroyed|navigation|Target (page, context or browser )?closed|net::ERR_/i;

async function main() {
  const token = opt("--token") ?? (args.includes("--onboard") ? await onboard() : undefined);
  if (!token) throw new Error("Pass --token <token> or --onboard.");
  await waitForHa(token);
  const { version } = await api("/api/config", { token });
  const checks = [];
  const check = (name, ok, detail = "") => checks.push({ name, ok: !!ok, detail });

  // --- set up: helper, resource, dashboard ---------------------------------
  const conn = await connect(token);
  const entity = "input_boolean.tabdeck_compat";
  const helpers = await conn.send({ type: "input_boolean/list" });
  let createdHelper;
  if (!helpers.some((h) => h.id === "tabdeck_compat" || h.name === "tabdeck_compat")) {
    createdHelper = await conn.send({ type: "input_boolean/create", name: "tabdeck_compat" });
  }
  await api("/api/services/input_boolean/turn_off", { method: "POST", token, body: { entity_id: entity } });

  const resources = await conn.send({ type: "lovelace/resources" });
  let createdResource;
  if (!resources.some((r) => (r.url ?? "").split("?")[0] === RESOURCE)) {
    createdResource = await conn.send({ type: "lovelace/resources/create", res_type: "module", url: `${RESOURCE}?v=${Date.now()}` });
  }

  const dashboards = await conn.send({ type: "lovelace/dashboards/list" });
  const existing = dashboards.find((d) => d.url_path === DASHBOARD);
  if (existing) {
    const current = await conn.send({ type: "lovelace/config", url_path: DASHBOARD }).catch(() => null);
    if (current && !current.tabdeck_compat) {
      throw new Error(`Dashboard /${DASHBOARD} exists and wasn't made by this script; not touching it.`);
    }
  } else {
    await conn.send({ type: "lovelace/dashboards/create", url_path: DASHBOARD, title: "Tabdeck compat", mode: "storage", show_in_sidebar: false, require_admin: false });
  }
  await conn.send({
    type: "lovelace/config/save",
    url_path: DASHBOARD,
    config: { tabdeck_compat: true, views: [{ title: "Compat", path: "compat", cards: [deckConfig(entity)] }] },
  });

  // --- drive the frontend ---------------------------------------------------
  const browser = CDP ? await chromium.connectOverCDP(CDP) : await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.addInitScript(
    ({ token, url }) => {
      localStorage.setItem(
        "hassTokens",
        JSON.stringify({ access_token: token, token_type: "Bearer", expires_in: 315360000, hassUrl: url, clientId: url + "/", expires: Date.now() + 315360000000, refresh_token: "" }),
      );
      localStorage.setItem("selectedLanguage", '"en"');
    },
    { token, url: URL_BASE },
  );
  if (CDP) await page.screenshot();

  const deep = `window.__deep = (sel, root = document) => { const f = []; (function w(n) { if (!n) return; if (n.matches && n.matches(sel)) f.push(n); if (n.shadowRoot) w(n.shadowRoot); for (const k of n.children || []) w(k); })(root); return f; };`;
  // The browser checks, run against a freshly loaded dashboard. Returns the
  // results instead of recording them, so a run cut short by a restart
  // leaves nothing behind.
  const frontend = async () => {
    const out = [];
    const check = (name, ok, detail = "") => out.push({ name, ok: !!ok, detail });
    await page.goto(`${URL_BASE}/${DASHBOARD}/compat`);
    await page.waitForFunction(() => !!customElements.get("tabdeck-card"), null, { timeout: 60000 });
    check("card loads (custom element registered)", true);
    await page.evaluate(deep);
    await page.waitForFunction(() => window.__deep("tabdeck-card")[0]?.shadowRoot?.querySelector("tabdeck-tabbar"), null, { timeout: 30000 });
    await page.waitForTimeout(3000);
    const r = await page.evaluate(async () => {
      const el = window.__deep("tabdeck-card")[0];
      const bar = el.shadowRoot.querySelector("tabdeck-tabbar");
      const out = {
        tabs: bar.items.map((i) => i.name),
        badge: bar.items[0]?.badge,
        header: !!el.shadowRoot.querySelector(".deck-header > *"),
        headingCards: window.__deep("hui-heading-card", el).length,
        tileCards: window.__deep("hui-tile-card", el).length,
      };
      el.selectTab("Grid");
      await new Promise((r) => setTimeout(r, 800));
      out.selected = el.selectedTab;
      out.entitiesCard = window.__deep("hui-entities-card", el).length;
      const hass = document.querySelector("home-assistant").hass;
      await hass.callService("input_boolean", "turn_on", { entity_id: "input_boolean.tabdeck_compat" });
      await new Promise((r) => setTimeout(r, 1500));
      out.tabsWhenOn = el.shadowRoot.querySelector("tabdeck-tabbar").items.map((i) => i.name);
      return out;
    });
    check("tab bar shows the visible tabs", JSON.stringify(r.tabs) === JSON.stringify(["Home", "Grid"]), JSON.stringify(r.tabs));
    check("template badge renders", r.badge === "5", `badge=${r.badge}`);
    check("header card renders", r.header);
    check("sections: HA heading card", r.headingCards >= 1, `${r.headingCards} found`);
    check("HA tile cards inside the deck", r.tileCards >= 2, `${r.tileCards} found`);
    check("selectTab switches tabs", r.selected === "Grid", `selected=${r.selected}`);
    check("masonry: HA entities card", r.entitiesCard >= 1, `${r.entitiesCard} found`);
    check("visibility follows entity state", r.tabsWhenOn.includes("When on"), JSON.stringify(r.tabsWhenOn));

    // The visual editor, mounted where HA mounts it (inside its own tree).
    const ed = await page.evaluate(async () => {
      const Card = customElements.get("tabdeck-card");
      const editor = await Card.getConfigElement();
      const main = document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main");
      (main.shadowRoot ?? main).appendChild(editor);
      editor.hass = document.querySelector("home-assistant").hass;
      editor.setConfig({ type: "custom:tabdeck-card", tabs: [{ name: "A", card: { type: "markdown", content: "a" } }] });
      await new Promise((r) => setTimeout(r, 2500));
      const forms = window.__deep("ha-form", editor).length;
      editor.remove();
      return { tag: editor.localName, forms };
    });
    check("visual editor renders HA forms", ed.forms >= 1, `${ed.forms} ha-form`);
    return out;
  };

  // One retry when Home Assistant reloads the page mid-run.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      checks.push(...(await frontend()));
      if (attempt > 1) console.warn("frontend: passed on the second run, after Home Assistant reloaded the page");
      break;
    } catch (e) {
      if (attempt < 2 && RELOADED.test(e.message)) {
        console.warn(`frontend: Home Assistant reloaded the page (${e.message.split("\n")[0]}); waiting and retrying`);
        await waitForHa(token);
        errors.length = 0;
        continue;
      }
      check("frontend run", false, e.message);
      break;
    }
  }
  const ours = errors.filter((e) => /tabdeck/i.test(e));
  check("no errors from the card", ours.length === 0, ours.join(" | "));
  await context.close();
  await browser.close();

  // --- clean up --------------------------------------------------------------
  if (args.includes("--cleanup")) {
    const list = await conn.send({ type: "lovelace/dashboards/list" });
    const mine = list.find((d) => d.url_path === DASHBOARD);
    if (mine) await conn.send({ type: "lovelace/dashboards/delete", dashboard_id: mine.id });
    if (createdHelper?.id) await conn.send({ type: "input_boolean/delete", input_boolean_id: createdHelper.id }).catch(() => {});
    if (createdResource?.id) await conn.send({ type: "lovelace/resources/delete", resource_id: createdResource.id });
  }
  conn.close();

  const ok = checks.every((c) => c.ok);
  const result = { version, ok, checks, otherErrors: errors.filter((e) => !/tabdeck/i.test(e)).slice(0, 10) };
  console.log(JSON.stringify(result, null, 2));
  if (opt("--out")) await writeFile(opt("--out"), JSON.stringify(result));
  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = [`### Home Assistant ${version}: ${ok ? "✅ works" : "❌ problems"}`, "", ...checks.map((c) => `- ${c.ok ? "✅" : "❌"} ${c.name}${c.detail ? ` (${c.detail})` : ""}`), ""];
    await writeFile(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n", { flag: "a" });
  }
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
