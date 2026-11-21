#!/usr/bin/env node
// Records short animated clips of the demo (site/demo/) for the docs:
// animated WebP (and GIF with --gif). Clips are defined in
// clips.mjs; frames come from Chrome's screencast and are encoded by
// encode.py (Python 3 with Pillow).
//
//   npm run build:demo
//   node scripts/clips/record-clips.mjs                         local Chromium (npx playwright install chromium)
//   node scripts/clips/record-clips.mjs --cdp <ws/http url> --base-url <url of site/demo/>
//
// Options:
//   --cdp <url>       drive a remote Chrome over CDP (it must be able to load --base-url)
//   --base-url <url>  an already-hosted copy of site/demo/ (default: served from localhost)
//   --only <name>     one clip
//   --out <dir>       where the clips go (default wiki/images/clips)
//   --fps <n>         frame rate of the clip (default 12)
//   --gif             also write a GIF next to each WebP (about 4x larger)
// Set PLAYWRIGHT_MODULE to a path if playwright isn't in this repo's node_modules.
import { createServer } from "node:http";
import { readFile, mkdir, writeFile, rm, mkdtemp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { CLIPS } from "./clips.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const SITE = join(ROOT, "site/demo");
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const CDP = opt("--cdp");
const ONLY = opt("--only");
const OUT = resolve(ROOT, opt("--out") ?? "wiki/images/clips");
const FPS = Number(opt("--fps") ?? 12);
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };

async function serveSite() {
  if (!existsSync(join(SITE, "index.html"))) throw new Error("site/demo/ is missing: run `npm run build:demo` first.");
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
      const file = join(SITE, path === "/" ? "index.html" : path);
      if (!file.startsWith(SITE)) throw new Error("outside");
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { url: `http://127.0.0.1:${server.address().port}/`, close: () => server.close() };
}

// Open the clip's page, ready to play. `minHeight` keeps the target from
// shrinking (and the crop from showing the page around it).
async function open(browser, base, clip, minHeight = 0) {
  const ctx = await browser.newContext({ viewport: { width: clip.width ?? 1200, height: clip.height ?? 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(new URL(clip.page, base).href, { waitUntil: "load" });
  await page.screenshot(); // remote Chrome applies the viewport late
  // …and its screencast can keep an 800×600 view: pin the metrics.
  const cdp = await ctx.newCDPSession(page);
  const vp = page.viewportSize();
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: false });
  if (clip.css) await page.addStyleTag({ content: clip.css });
  if (clip.setup) await page.click(clip.setup);
  await page.waitForTimeout(800);
  await page.evaluate(
    ([sel, h]) => {
      const el = document.querySelector(sel);
      if (h) el.style.minHeight = `${h}px`;
      el.scrollIntoView({ block: "center" });
    },
    [clip.target, minHeight],
  );
  await page.waitForTimeout(400);
  const box = async () =>
    page.evaluate((sel) => {
      const r = document.querySelector(sel).getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }, clip.target);
  const tab = (i) =>
    page.evaluate((i) => {
      const bar = document.querySelector("tabdeck-card").shadowRoot.querySelector("tabdeck-tabbar");
      const r = bar.shadowRoot.querySelectorAll("tabdeck-tab")[i].getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, i);
  let tallest = 0;
  const measure = async () => (tallest = Math.max(tallest, (await box()).height));
  const after = (fn) => async (...a) => {
    const r = await fn(...a);
    await measure();
    return r;
  };
  const ctl = {
    tab,
    box,
    wait: after((ms) => page.waitForTimeout(ms)),
    click: (p) => page.mouse.click(p.x, p.y),
    hover: (p) => page.mouse.move(p.x, p.y, { steps: 8 }),
    check: (sel) => page.click(sel),
    drag: async (a, b) => {
      await page.mouse.move(a.x, a.y);
      await page.mouse.down();
      await page.mouse.move(b.x, b.y, { steps: 10 });
      await page.mouse.up();
    },
  };
  const crop = await box();
  await page.mouse.move(crop.x + crop.width + 40, crop.y + crop.height + 40);
  return { ctx, page, cdp, vp, ctl, crop, errors, tallest: () => tallest };
}

async function record(browser, base, clip) {
  // Dry run: how tall does the target get?
  const dry = await open(browser, base, clip);
  await clip.play(dry.ctl);
  const minHeight = Math.ceil(dry.tallest());
  await dry.ctx.close();

  const { ctx, page, cdp, vp, ctl, crop, errors } = await open(browser, base, clip, minHeight);
  const dir = await mkdtemp(join(tmpdir(), `clip-${clip.name}-`));
  const frames = [];
  let n = 0;
  const pending = [];
  cdp.on("Page.screencastFrame", (f) => {
    const file = `f${String(++n).padStart(4, "0")}.png`;
    frames.push({ file, t: f.metadata.timestamp, w: f.metadata.deviceWidth });
    pending.push(writeFile(join(dir, file), Buffer.from(f.data, "base64")));
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: vp.width, maxHeight: vp.height });

  await clip.play(ctl);
  await page.waitForTimeout(300);
  await cdp.send("Page.stopScreencast");
  await Promise.all(pending);
  await ctx.close();
  if (frames.length < 2) throw new Error(`${clip.name}: only ${frames.length} frame(s) recorded`);
  // Chrome sends a frame only when something changes: add one at the end so the
  // last still lasts as long as it did.
  const end = frames[frames.length - 1].t + 0.8;
  frames.push({ file: frames[frames.length - 1].file, t: end });
  await writeFile(join(dir, "frames.json"), JSON.stringify({ frames, crop: [crop.x, crop.y, crop.width, crop.height] }));
  const out = execFileSync("python3", [join(HERE, "encode.py"), join(dir, "frames.json"), join(OUT, clip.name), "--fps", String(FPS), ...(args.includes("--gif") ? ["--gif"] : [])], { encoding: "utf8" });
  process.stdout.write(out);
  if (!process.env.KEEP_FRAMES) await rm(dir, { recursive: true, force: true });
  else console.log(`frames kept in ${dir}`);
  if (errors.length) console.warn(`${clip.name}: page errors:\n  ${errors.join("\n  ")}`);
}

const served = opt("--base-url") ? undefined : await serveSite();
const base = opt("--base-url") ?? served.url;
const browser = CDP ? await chromium.connectOverCDP(CDP) : await chromium.launch();
await mkdir(OUT, { recursive: true });
try {
  for (const clip of CLIPS.filter((c) => !ONLY || c.name === ONLY)) await record(browser, base, clip);
} finally {
  await browser.close();
  served?.close();
}
