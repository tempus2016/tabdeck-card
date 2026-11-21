// Colours read from pictures: the average of a bar_background image (is it
// light or dark?) and the main colour of a tab's picture. Images are drawn
// small onto a canvas; anything that can't be read (no canvas, a failed or
// cross-origin image without CORS) gives undefined, so callers fall back.

import { contrastRatio, parseRgb } from "./color";

export type Rgb = [number, number, number];

// Mean of the visible pixels of RGBA data.
export function averagePixels(data: Uint8ClampedArray): Rgb | undefined {
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3] / 255;
    if (a < 0.1) continue;
    r += data[i] * a;
    g += data[i + 1] * a;
    b += data[i + 2] * a;
    n += a;
  }
  return n ? [Math.round(r / n), Math.round(g / n), Math.round(b / n)] : undefined;
}

// The most common colourful hue (12 hue buckets weighted by saturation),
// averaged; a picture with no real colour gives its average.
export function dominantPixels(data: Uint8ClampedArray): Rgb | undefined {
  const buckets = Array.from({ length: 12 }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max ? (max - min) / max : 0;
    // Near-grey, near-black and near-white pixels carry no hue.
    if (sat < 0.25 || max < 40 || min > 235) continue;
    const d = max - min;
    let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    if (h < 0) h += 6;
    const k = buckets[Math.floor(h * 2) % 12];
    k.w += sat;
    k.r += r * sat;
    k.g += g * sat;
    k.b += b * sat;
  }
  const best = buckets.reduce((a, b) => (b.w > a.w ? b : a));
  if (best.w === 0) return averagePixels(data);
  return [Math.round(best.r / best.w), Math.round(best.g / best.w), Math.round(best.b / best.w)];
}

// The image URL in a CSS background value, or a bare image path / URL.
export function cssUrl(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;
  const m = /url\(\s*(['"]?)(.*?)\1\s*\)/.exec(value);
  if (m) return m[2] || undefined;
  const v = value.trim();
  return /^(\/|https?:\/\/)\S/.test(v) && !/\s/.test(v) ? v : undefined;
}

// The colour stops of a computed gradient (background-image).
export function gradientColors(value: string): Rgb[] {
  return (value.match(/rgba?\([^)]*\)/g) ?? []).map((c) => parseRgb(c)!).filter(Boolean) as Rgb[];
}

export function backgroundTone(rgb: number[]): "light" | "dark" {
  return contrastRatio(rgb, [0, 0, 0]) >= contrastRatio(rgb, [255, 255, 255]) ? "light" : "dark";
}

const cache = new Map<string, Promise<Rgb | undefined>>();

// Average ("average") or main ("dominant") colour of an image, cached per URL.
export function imageColor(url: string, mode: "average" | "dominant" = "average"): Promise<Rgb | undefined> {
  const key = `${mode} ${url}`;
  let p = cache.get(key);
  if (!p) {
    p = load(url).then((data) => (data ? (mode === "dominant" ? dominantPixels(data) : averagePixels(data)) : undefined));
    cache.set(key, p);
  }
  return p;
}

function load(url: string): Promise<Uint8ClampedArray | undefined> {
  if (typeof OffscreenCanvas === "undefined" || typeof Image === "undefined") return Promise.resolve(undefined);
  return new Promise((resolve) => {
    const img = new Image();
    let to: ReturnType<typeof setTimeout>;
    const done = (v?: Uint8ClampedArray) => {
      clearTimeout(to);
      img.onload = img.onerror = null;
      resolve(v);
    };
    // Another site's picture is only readable with CORS; without it the
    // load fails and the caller keeps its fallback colour.
    try {
      if (new URL(url, location.href).origin !== location.origin) img.crossOrigin = "anonymous";
    } catch {
      return done();
    }
    img.onload = () => {
      try {
        const ctx = new OffscreenCanvas(24, 24).getContext("2d")!;
        ctx.drawImage(img, 0, 0, 24, 24);
        done(ctx.getImageData(0, 0, 24, 24).data);
      } catch {
        done();
      }
    };
    img.onerror = () => done();
    to = setTimeout(() => done(), 10000);
    img.src = url;
  });
}
