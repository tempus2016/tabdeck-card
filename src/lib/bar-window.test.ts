import { describe, it, expect } from "vitest";
import { barWindow, normalizeBarLimit } from "./bar-window";

describe("bar_limit window", () => {
  it("shows everything when off or when the deck fits", () => {
    expect(barWindow(140, 50, 0)).toEqual([0, 140]);
    expect(barWindow(5, 3, 8)).toEqual([0, 5]);
  });

  it("shows the page of `limit` tabs holding the open one, the last page filled from the end", () => {
    expect(barWindow(140, 0, 6)).toEqual([0, 6]);
    expect(barWindow(140, 5, 6)).toEqual([0, 6]);
    expect(barWindow(140, 6, 6)).toEqual([6, 12]);
    expect(barWindow(140, 139, 6)).toEqual([134, 140]);
    expect(barWindow(140, 137, 6)).toEqual([132, 138]);
    expect(barWindow(140, 138, 6)).toEqual([134, 140]);
    expect(barWindow(140, 999, 6)).toEqual([134, 140]);
  });

  it("a limit is at least 3 tabs", () => {
    expect(normalizeBarLimit(8)).toBe(8);
    expect(normalizeBarLimit("1")).toBe(3);
    expect(normalizeBarLimit(0)).toBeUndefined();
    expect(normalizeBarLimit("x")).toBeUndefined();
  });
});
