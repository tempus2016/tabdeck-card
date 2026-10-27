import { describe, it, expect } from "vitest";
import { contrastRatio, cssColor, isThemeColor, parseRgb, readableText } from "./color";

describe("theme colours (as HA's computeCssColor)", () => {
  it("maps theme colour names to their variable, with the name as fallback", () => {
    expect(cssColor("red")).toBe("var(--red-color, red)");
    expect(cssColor("deep-purple")).toBe("var(--deep-purple-color)");
    expect(cssColor("primary")).toBe("var(--primary-color)");
    expect(cssColor("primary-text")).toBe("var(--primary-text-color)");
  });

  it("passes other CSS through", () => {
    expect(cssColor("#ff0000")).toBe("#ff0000");
    expect(cssColor("var(--my-color)")).toBe("var(--my-color)");
    expect(cssColor("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(cssColor(undefined)).toBeUndefined();
    expect(cssColor("")).toBeUndefined();
  });

  it("knows which values the picker offers", () => {
    expect(isThemeColor("light-blue")).toBe(true);
    expect(isThemeColor("#fff")).toBe(false);
    expect(isThemeColor("primary-text")).toBe(false);
  });
});

describe("contrast", () => {
  it("parses rgb() and rgba()", () => {
    expect(parseRgb("rgb(255, 0, 0)")).toEqual([255, 0, 0]);
    expect(parseRgb("rgba(0, 128, 255, 0.5)")).toEqual([0, 128, 255]);
    expect(parseRgb("rgb(10 20 30)")).toEqual([10, 20, 30]);
    expect(parseRgb("red")).toBeUndefined();
  });

  it("computes WCAG contrast ratios", () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 0);
    expect(contrastRatio([255, 255, 255], [255, 255, 255])).toBeCloseTo(1, 5);
    expect(contrastRatio([255, 235, 59], [255, 255, 255])).toBeLessThan(1.5);
  });

  it("picks black or white text for a background", () => {
    expect(readableText("rgb(255, 235, 59)")).toBe("#000");
    expect(readableText("rgb(13, 71, 161)")).toBe("#fff");
    // WCAG: black reads better than white on HA's lighter blue (6.7 vs 3.1).
    expect(readableText("rgb(33, 150, 243)")).toBe("#000");
    expect(readableText("rgb(0, 0, 0)")).toBe("#fff");
    expect(readableText("not a colour")).toBeUndefined();
  });
});
