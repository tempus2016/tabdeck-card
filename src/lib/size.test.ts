import { describe, it, expect } from "vitest";
import { normalizeZoom, lengthOrZero, sizeStyles } from "./size";
import { normalizeTab } from "./config";

describe("size controls", () => {
  it("zoom is a factor from 0.25 to 3; 1 or rubbish means none", () => {
    expect(normalizeZoom(0.8)).toBe(0.8);
    expect(normalizeZoom("1.2")).toBe(1.2);
    expect(normalizeZoom(0.1)).toBe(0.25);
    expect(normalizeZoom(9)).toBe(3);
    expect(normalizeZoom(1)).toBeUndefined();
    expect(normalizeZoom("big")).toBeUndefined();
    expect(normalizeZoom(undefined)).toBeUndefined();
  });

  it("padding and spacing take CSS lengths, numbers as px, and 0", () => {
    expect(lengthOrZero(8)).toBe("8px");
    expect(lengthOrZero("4px 12px")).toBe("4px 12px");
    expect(lengthOrZero(0)).toBe("0px");
    expect(lengthOrZero("red; x")).toBeUndefined();
  });

  it("builds the panel styles, spacing covering HA's stacks/grid and Tabdeck's layouts", () => {
    expect(sizeStyles({})).toEqual({});
    const s = sizeStyles({ zoom: 0.8, padding: "4px", spacing: "2px" });
    expect(s.zoom).toBe("0.8");
    expect(s.padding).toBe("4px");
    expect(s["--vertical-stack-card-gap"]).toBe("2px");
    expect(s["--grid-card-gap"]).toBe("2px");
    expect(s["--tabdeck-masonry-gap"]).toBe("2px");
  });

  it("normalizeTab keeps them", () => {
    const t = normalizeTab({ zoom: 0.8, padding: 6, spacing: 0, card: {} });
    expect([t.zoom, t.padding, t.spacing]).toEqual([0.8, "6px", "0px"]);
  });
});
