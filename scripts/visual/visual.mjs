#!/usr/bin/env node
// Visual regression test: screenshots every demo example (desktop + phone,
// plus a light-theme shot) against the demo's mock Home Assistant, and
// compares each with a saved baseline.
//
//   npm run build:demo
//   node scripts/visual/visual.mjs            compare (CI)
//   node scripts/visual/visual.mjs --update   write new baselines
//
// Options:
//   --base-url <url>  load an already-hosted copy of site/ instead of serving it
//   --cdp <url>       drive a remote Chrome over CDP (e.g. browserless)
//   --only <id>       just one example
//
// Baselines live in tests/visual/<platform>/ because fonts render differently
// per OS: CI uses "linux" (set VISUAL_PLATFORM to override). Failed and new
// shots, with diff images, go to tests/visual/output/.
import { createServer } from "node:http";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = join(ROOT, "site");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const UPDATE = flag("--update");
const CDP = opt("--cdp");
const ONLY = opt("--only");
const PLATFORM = process.env.VISUAL_PLATFORM || (CDP ? "browserless" : process.platform);
const BASELINES = join(ROOT, "tests/visual", PLATFORM);
const OUTPUT = join(ROOT, "tests/visual/output");
// A shot fails when more than this share of its pixels differ.
const MAX_DIFF_RATIO = 0.002;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
};

// Serve site/ on a free localhost port.
async function serveSite() {
  if (!existsSync(join(SITE, "index.html"))) {
    throw new Error("site/ is missing: run `npm run build:demo` first.");
  }
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
      const file = resolve(SITE, "." + (path.endsWith("/") ? path + "index.html" : path));
      if (!file.startsWith(SITE)) throw new Error("outside site/");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { url: `http://127.0.0.1:${server.address().port}/index.html`, close: () => server.close() };
}

// Freeze anything that could move between runs: CSS animations and
// transitions (also inside the cards' shadow roots) and the text caret.
const FREEZE = `
  const css = "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}";
  const add = (root) => { const s = document.createElement("style"); s.textContent = css; root.appendChild(s); };
  const orig = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init) { const r = orig.call(this, init); queueMicrotask(() => add(r)); return r; };
  document.addEventListener("DOMContentLoaded", () => add(document.head));
`;

async function settle(page) {
  await page.waitForFunction(() => !!document.querySelector("#stage tabdeck-card")?.shadowRoot?.querySelector("tabdeck-tabbar, .content, .split"));
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(700);
}

function compare(actualBuf, baselineBuf) {
  const a = PNG.sync.read(actualBuf);
  const b = PNG.sync.read(baselineBuf);
  if (a.width !== b.width || a.height !== b.height) {
    return { ok: false, reason: `size ${a.width}×${a.height} vs baseline ${b.width}×${b.height}` };
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const pixels = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
  const ratio = pixels / (a.width * a.height);
  return { ok: ratio <= MAX_DIFF_RATIO, reason: `${pixels} px differ (${(ratio * 100).toFixed(2)}%)`, diff: PNG.sync.write(diff) };
}

async function main() {
  const served = opt("--base-url") ? undefined : await serveSite();
  const baseUrl = opt("--base-url") ?? served.url;
  const browser = CDP ? await chromium.connectOverCDP(CDP) : await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.addInitScript(FREEZE);

  await page.goto(baseUrl);
  await settle(page);
  const ids = await page.$$eval("#examples button", (bs) => bs.map((b) => b.dataset.id));
  const shots = [];
  for (const id of ids) {
    if (ONLY && id !== ONLY) continue;
    shots.push({ name: `${id}-desktop`, id, width: "desktop" });
    shots.push({ name: `${id}-phone`, id, width: "phone" });
  }
  if (!ONLY || ONLY === ids[0]) shots.push({ name: `${ids[0]}-light`, id: ids[0], width: "desktop", light: true });

  await rm(OUTPUT, { recursive: true, force: true });
  await mkdir(OUTPUT, { recursive: true });
  await mkdir(BASELINES, { recursive: true });
  const results = [];
  for (const shot of shots) {
    // A fresh load per shot, so no state carries over between examples.
    await page.goto(`${baseUrl}?shot=${shot.name}#${shot.id}`);
    // Remote browsers (browserless) only apply the viewport on a screenshot.
    if (CDP) await page.screenshot();
    await settle(page);
    await page.evaluate(({ width, light }) => {
      const btn = [...document.querySelectorAll("[data-width]")].find((b) =>
        width === "phone" ? b.textContent.trim().toLowerCase() === "phone" : b.textContent.trim().toLowerCase() === "desktop",
      );
      btn?.click();
      if (light) {
        const dark = document.querySelector("#dark");
        if (dark.checked) dark.click();
      }
    }, shot);
    await page.waitForTimeout(500);
    // A page shot clipped to the preview: element shots came back blank
    // through browserless.
    const box = await page.evaluate(() => {
      const r = document.querySelector("#stage").getBoundingClientRect();
      return { x: Math.floor(r.x + scrollX), y: Math.floor(r.y + scrollY), width: Math.ceil(r.width), height: Math.ceil(r.height) };
    });
    const actual = await page.screenshot({ clip: box, fullPage: true });
    if (process.env.VISUAL_DEBUG) await page.screenshot({ path: join(OUTPUT, `${shot.name}.page.png`), fullPage: true });
    const file = join(BASELINES, `${shot.name}.png`);
    if (UPDATE) {
      await writeFile(file, actual);
      results.push({ name: shot.name, status: "updated" });
      continue;
    }
    if (!existsSync(file)) {
      await writeFile(join(OUTPUT, `${shot.name}.new.png`), actual);
      results.push({ name: shot.name, status: "new" });
      continue;
    }
    const r = compare(actual, await readFile(file));
    if (!r.ok) {
      await writeFile(join(OUTPUT, `${shot.name}.actual.png`), actual);
      if (r.diff) await writeFile(join(OUTPUT, `${shot.name}.diff.png`), r.diff);
    }
    results.push({ name: shot.name, status: r.ok ? "same" : "changed", detail: r.reason });
  }
  await context.close();
  await browser.close();
  served?.close();

  const changed = results.filter((r) => r.status === "changed");
  const fresh = results.filter((r) => r.status === "new");
  for (const r of results) console.log(`${r.status.padEnd(8)} ${r.name}${r.detail ? `  ${r.detail}` : ""}`);
  if (errors.length) console.log(`\nPage errors:\n${errors.map((e) => `  ${e}`).join("\n")}`);
  const summary = [
    `### Visual regression (${PLATFORM})`,
    "",
    `${results.length} shots: ${results.filter((r) => r.status === "same").length} unchanged, ${changed.length} changed, ${fresh.length} new${UPDATE ? `, ${results.length} baselines written` : ""}.`,
    ...changed.map((r) => `- ❌ \`${r.name}\`: ${r.detail}`),
    ...fresh.map((r) => `- 🆕 \`${r.name}\`: no baseline yet`),
    ...(errors.length ? ["", "Page errors:", ...errors.map((e) => `- \`${e}\``)] : []),
  ].join("\n");
  if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY, summary + "\n", { flag: "a" });
  if (fresh.length && process.env.GITHUB_ACTIONS) {
    console.log(`::warning::${fresh.length} visual shots have no baseline yet; run the workflow with "update baselines".`);
  }
  if (changed.length || errors.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
