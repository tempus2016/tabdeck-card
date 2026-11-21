import { describe, it, expect } from "vitest";
import { averagePixels, backgroundTone, cssUrl, dominantPixels, gradientColors, imageColor } from "./image-color";

const px = (...cols: number[][]) => new Uint8ClampedArray(cols.flatMap((c) => (c.length === 3 ? [...c, 255] : c)));

describe("image colours", () => {
  it("averages pixels, ignoring transparent ones", () => {
    expect(averagePixels(px([0, 0, 0], [200, 100, 50], [255, 255, 255, 0]))).toEqual([100, 50, 25]);
    expect(averagePixels(px([1, 2, 3, 0]))).toBeUndefined();
  });

  it("picks the dominant colourful hue, not a muddy average", () => {
    const green = [46, 125, 50];
    const grey = [128, 128, 128];
    const c = dominantPixels(px(green, green, green, [30, 120, 40], grey, grey, grey, grey, [255, 0, 0]))!;
    // A green, not grey and not red.
    expect(c[1]).toBeGreaterThan(c[0] + 40);
    expect(c[1]).toBeGreaterThan(c[2] + 40);
    // A grey picture falls back to its average.
    expect(dominantPixels(px(grey, grey))).toEqual(grey);
  });

  it("reads the URL out of a CSS background", () => {
    expect(cssUrl("center / cover url('/local/a b.jpg')")).toBe("/local/a b.jpg");
    expect(cssUrl('url("/local/x.png") no-repeat')).toBe("/local/x.png");
    expect(cssUrl("url(/local/y.svg)")).toBe("/local/y.svg");
    expect(cssUrl("/local/z.jpg")).toBe("/local/z.jpg");
    expect(cssUrl("https://x.test/z.webp")).toBe("https://x.test/z.webp");
    expect(cssUrl("#123")).toBeUndefined();
    expect(cssUrl("linear-gradient(#000, #fff)")).toBeUndefined();
  });

  it("collects a computed gradient's colours", () => {
    expect(gradientColors("linear-gradient(90deg, rgb(253, 246, 227), rgba(243, 224, 181, 0.5))")).toEqual([
      [253, 246, 227],
      [243, 224, 181],
    ]);
    expect(gradientColors("none")).toEqual([]);
  });

  it("calls a colour light or dark", () => {
    expect(backgroundTone([253, 246, 227])).toBe("light");
    expect(backgroundTone([20, 33, 61])).toBe("dark");
  });

  it("never throws without a canvas (jsdom): resolves undefined", async () => {
    await expect(imageColor("/local/nothing.png")).resolves.toBeUndefined();
  });
});
