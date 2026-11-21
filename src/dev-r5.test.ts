// Round 5 "developer and integrations" behaviour: window.tabdeck, the
// companion integration, usage stats, the speed overlay, shared tabs, the
// offline banner and the TaskMate / Z2M tracker sources.
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

beforeAll(() => {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (config: any) => {
      const el = document.createElement("div") as any;
      el.setAttribute("data-type", config.type ?? "");
      el.getCardSize = () => 3;
      return el;
    },
  });
  if (!customElements.get("ha-icon")) customElements.define("ha-icon", class extends HTMLElement {});
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

async function settle(el: any) {
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
}

async function mount(raw: any, hass: any = { states: {} }) {
  await import("./tabdeck-card");
  const el = document.createElement("tabdeck-card") as any;
  el.setConfig(raw);
  document.body.appendChild(el);
  el.hass = hass;
  await settle(el);
  return el;
}

const bar = (el: any) => el.shadowRoot.querySelector("tabdeck-tabbar");
const select = async (el: any, index: number) => {
  bar(el).dispatchEvent(new CustomEvent("tabdeck-select", { detail: { index }, bubbles: true, composed: true }));
  await settle(el);
};
const tabs = [
  { name: "Home", card: { type: "x" } },
  { name: "Lights", card: { type: "x" } },
  { name: "Cameras", card: { type: "x" } },
];

describe("window.tabdeck", () => {
  it("lists every deck, selects by name / step word and reports changes", async () => {
    const a = await mount({ tabs, event_id: "main" });
    const b = await mount({ tabs: tabs.slice(0, 2), event_id: "kitchen" });
    const reg = (window as any).tabdeck;
    expect(reg).toBeTruthy();
    expect(Object.keys(window).includes("tabdeck")).toBe(false);
    expect(reg.list().map((d: any) => [d.id, d.tab, d.tabs])).toEqual([
      ["main", "Home", 3],
      ["kitchen", "Home", 2],
    ]);
    const seen: any[] = [];
    const off = reg.on("tab-changed", (d: any) => seen.push(d));
    expect(reg.get("main").select("Cameras")).toBe(true);
    await settle(a);
    expect(a.selectedTab).toBe("Cameras");
    expect(reg.select("main", "back")).toBe(true);
    await settle(a);
    expect(a.selectedTab).toBe("Home");
    expect(reg.get("kitchen").next()).toBe(true);
    await settle(b);
    expect(b.selectedTab).toBe("Lights");
    expect(reg.select("main", "Nope")).toBe(false);
    // A user tap is reported too.
    await select(a, 1);
    off();
    expect(seen.map((d) => `${d.id}:${d.previous}>${d.name}`)).toEqual([
      "main:Home>Cameras",
      "main:Cameras>Home",
      "kitchen:Home>Lights",
      "main:Home>Lights",
    ]);
    b.remove();
    expect(reg.list().map((d: any) => d.id)).toEqual(["main"]);
  });
});

// A fake HA connection that records companion messages.
function fakeConnection(opts: { missing?: boolean } = {}) {
  const conn: any = {
    subs: [] as any[],
    sent: [] as any[],
    listeners: {} as Record<string, any[]>,
    unsubscribed: 0,
    subscribeMessage(cb: any, msg: any) {
      if (opts.missing) return Promise.reject({ code: "unknown_command" });
      conn.subs.push({ cb, msg });
      return Promise.resolve(() => conn.unsubscribed++);
    },
    sendMessagePromise(msg: any) {
      conn.sent.push(msg);
      return Promise.resolve();
    },
    addEventListener(t: string, fn: any) {
      (conn.listeners[t] ??= []).push(fn);
    },
    removeEventListener(t: string, fn: any) {
      conn.listeners[t] = (conn.listeners[t] ?? []).filter((f: any) => f !== fn);
    },
  };
  return conn;
}

describe("companion", () => {
  const actionTab = { name: "Settings", tap_action: { action: "navigate", navigation_path: "/config" } };

  it("registers the deck, reports switches and follows select commands", async () => {
    const conn = fakeConnection();
    const el = await mount({ tabs: [...tabs, actionTab], event_id: "main", companion: true, companion_id: "kitchen tablet" }, { states: {}, connection: conn });
    expect(conn.subs).toHaveLength(1);
    expect(conn.subs[0].msg).toEqual({
      type: "tabdeck/register",
      browser_id: "kitchen_tablet",
      deck_id: "main",
      tabs: ["Home", "Lights", "Cameras"],
      tab: "Home",
    });
    await select(el, 1);
    expect(conn.sent.at(-1)).toEqual({ type: "tabdeck/update", browser_id: "kitchen_tablet", deck_id: "main", tabs: ["Home", "Lights", "Cameras"], tab: "Lights" });
    const count = conn.sent.length;
    el.hass = { states: {}, connection: conn };
    await settle(el);
    expect(conn.sent.length).toBe(count);
    // HA selected an option.
    conn.subs[0].cb({ command: "select", tab: "Cameras" });
    await settle(el);
    expect(el.selectedTab).toBe("Cameras");
    expect(conn.sent.at(-1).tab).toBe("Cameras");
    // Reconnect: the state is sent again.
    conn.listeners.ready.forEach((f: any) => f());
    expect(conn.sent.length).toBe(count + 2);
    el.remove();
    await Promise.resolve();
    await Promise.resolve();
    expect(conn.unsubscribed).toBe(1);
  });

  it("stays quiet without the integration or the option", async () => {
    const missing = fakeConnection({ missing: true });
    const warn = vi.spyOn(console, "warn");
    const el = await mount({ tabs, companion: true }, { states: {}, connection: missing });
    await select(el, 1);
    el.hass = { states: {}, connection: missing };
    await settle(el);
    expect(missing.sent).toEqual([]);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    const off = fakeConnection();
    await mount({ tabs }, { states: {}, connection: off });
    expect(off.subs).toEqual([]);
  });
});

describe("usage_stats", () => {
  it("reports minutes per tab in batches through the companion", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "Date"] });
    vi.setSystemTime(0);
    const conn = fakeConnection();
    const el = await mount({ tabs, event_id: "main", companion: true, companion_id: "hall", usage_stats: 5 }, { states: {}, connection: conn });
    vi.advanceTimersByTime(60_000);
    await select(el, 2);
    vi.advanceTimersByTime(240_000);
    const usage = conn.sent.filter((m: any) => m.type === "tabdeck/usage");
    expect(usage).toHaveLength(1);
    expect(usage[0]).toEqual({ type: "tabdeck/usage", browser_id: "hall", deck_id: "main", minutes: { Home: 1, Cameras: 4 } });
    // Detaching sends what's left.
    vi.advanceTimersByTime(30_000);
    el.remove();
    expect(conn.sent.filter((m: any) => m.type === "tabdeck/usage").at(-1)!.minutes).toEqual({ Cameras: 0.5 });
  });

  it("fires a tabdeck_usage event without the companion, and nothing when off", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "Date"] });
    vi.setSystemTime(0);
    const conn = fakeConnection();
    const el = await mount({ tabs, event_id: "main", usage_stats: true }, { states: {}, connection: conn });
    vi.advanceTimersByTime(600_000);
    expect(conn.sent).toEqual([{ type: "fire_event", event_type: "tabdeck_usage", event_data: { deck: "main", device: null, minutes: { Home: 10 } } }]);
    el.remove();
    const quiet = fakeConnection();
    const off = await mount({ tabs }, { states: {}, connection: quiet });
    vi.advanceTimersByTime(2_000_000);
    off.remove();
    expect(quiet.sent).toEqual([]);
  });
});

describe("debug: speed", () => {
  it("shows each tab's draw time on the bar and in the panel", async () => {
    const { speedLevel } = await import("./components/tabdeck-tab");
    expect([speedLevel(40), speedLevel(150), speedLevel(412)]).toEqual(["ok", "slow", "bad"]);
    const el = await mount({ tabs, debug: "speed" });
    await new Promise((r) => setTimeout(r, 50));
    await settle(el);
    await select(el, 2);
    await new Promise((r) => setTimeout(r, 50));
    await settle(el);
    const items = bar(el).items;
    expect(typeof items[0].speed).toBe("number");
    expect(items[1].speed).toBeUndefined();
    expect(typeof items[2].speed).toBe("number");
    await bar(el).updateComplete;
    const chip = bar(el).shadowRoot.querySelectorAll("tabdeck-tab")[2].shadowRoot.querySelector(".speed");
    expect(chip.textContent).toMatch(/^\d+ ms$/);
    const rows = [...el.shadowRoot.querySelectorAll(".debug tr")].map((r: any) => r.textContent);
    expect(rows[2]).toMatch(/card \d+\.\d ms · drawn \d+ ms/);
    // debug: true keeps the bar clean.
    const plain = await mount({ tabs, debug: true });
    await new Promise((r) => setTimeout(r, 50));
    await settle(plain);
    expect(bar(plain).items.every((i: any) => i.speed === undefined)).toBe(true);
  });
});

describe("tab_ref", () => {
  it("shows the names at once, then swaps in the shared tab; errors become a message", async () => {
    const { clearDashboardCache } = await import("./lib/view-source");
    clearDashboardCache();
    const family = {
      views: [{ path: "home", cards: [{ type: "custom:tabdeck-card", tabs: [{ name: "Weather", icon: "mdi:weather-rainy", badge: "8°", card: { type: "weather-forecast" } }] }] }],
    };
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const calls: any[] = [];
    const hass = {
      states: {},
      language: "en",
      callWS: async (msg: any) => {
        calls.push(msg);
        await gate;
        if (msg.url_path === "family") return family;
        throw new Error("no such dashboard");
      },
    };
    const el = await mount(
      { tabs: [{ tab_ref: "family/weather" }, { name: "Lights", card: { type: "x" } }, { tab_ref: "nowhere/x" }, { tab_ref: "family/home/rain", name: "Rain" }] },
      hass,
    );
    expect(bar(el).items.map((i: any) => i.name)).toEqual(["weather", "Lights", "x", "Rain"]);
    await select(el, 1);
    release();
    await new Promise((r) => setTimeout(r, 20));
    await settle(el);
    expect(bar(el).items.map((i: any) => [i.name, i.icon, i.badge])).toEqual([
      ["Weather", "mdi:weather-rainy", "8°"],
      ["Lights", undefined, undefined],
      ["x", "mdi:link-variant-off", undefined],
      ["Rain", "mdi:link-variant-off", undefined],
    ]);
    // Still on the tab picked before the swap; each dashboard read once.
    expect(el.selectedTab).toBe("Lights");
    expect(calls.map((c) => c.url_path)).toEqual(["family", "nowhere"]);
    expect(el._config.tabs[0].card).toEqual({ type: "weather-forecast" });
    expect(el._config.tabs[2].card.content).toContain("no dashboard nowhere");
    expect(el._config.tabs[3].card.content).toContain("no tab rain on family");
  });
});

describe("offline_banner", () => {
  it("shows a translated warning 2 s after the connection drops, until it's back", async () => {
    const conn = fakeConnection();
    const banner = (el: any) => el.shadowRoot.querySelector(".deck-notice.offline");
    const el = await mount({ tabs, offline_banner: true }, { states: {}, connected: true, connection: conn });
    // German loads on demand.
    await (await import("./lib/i18n")).ensureLanguage("de");
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    conn.listeners.disconnected.forEach((f: any) => f());
    vi.advanceTimersByTime(1000);
    // A quick reconnect never shows it.
    conn.listeners.ready.forEach((f: any) => f());
    vi.advanceTimersByTime(3000);
    await el.updateComplete;
    expect(banner(el)).toBeNull();
    conn.listeners.disconnected.forEach((f: any) => f());
    vi.advanceTimersByTime(2100);
    await el.updateComplete;
    expect(banner(el).textContent).toContain("Connection lost");
    expect(el.hasAttribute("offline")).toBe(true);
    // HA's own hass.connected works too, and German text.
    el.hass = { states: {}, connected: true, connection: conn, language: "de" };
    await el.updateComplete;
    expect(banner(el)).toBeNull();
    el.hass = { states: {}, connected: false, connection: conn, language: "de" };
    vi.advanceTimersByTime(2100);
    await el.updateComplete;
    expect(banner(el).textContent).toContain("Verbindung verloren");
    el.remove();
    expect(conn.listeners.disconnected).toEqual([]);
    vi.useRealTimers();
    // Off by default.
    const plain = fakeConnection();
    await mount({ tabs }, { states: {}, connection: plain });
    expect(plain.listeners.disconnected).toBeUndefined();
  });
});

describe("auto_tabs: taskmate / z2m_tracker", () => {
  it("builds TaskMate child tabs with their card and chores-left badge", async () => {
    const conn = fakeConnection();
    const items = [
      { id: "c1", name: "Alex", icon: "mdi:account", left: "3", card: { type: "custom:taskmate-child-card", entity: "sensor.taskmate_overview", child_id: "c1" } },
      { id: "c2", name: "Sam", icon: "mdi:account", left: "", card: { type: "entities", entities: ["sensor.sam_points"] } },
    ];
    conn.subscribeMessage = (cb: any, msg: any) => {
      conn.subs.push({ cb, msg });
      if (msg.type === "render_template" && msg.template.includes("taskmate")) setTimeout(() => cb({ result: items }), 0);
      return Promise.resolve(() => undefined);
    };
    const el = await mount({ tabs: [{ name: "Home", card: { type: "x" } }], auto_tabs: { source: "taskmate" } }, { states: {}, connection: conn });
    await new Promise((r) => setTimeout(r, 20));
    await settle(el);
    expect(bar(el).items.map((i: any) => [i.name, i.badge])).toEqual([
      ["Home", undefined],
      ["Alex", "3"],
      ["Sam", undefined],
    ]);
    expect(el._allTabs()[1].card).toEqual(items[0].card);
    expect(el._allTabs()[2].card).toEqual(items[1].card);
  });
});
