import { describe, it, expect } from "vitest";
import { detectSwipe } from "./swipe";

const p = (x: number, y: number, t: number) => ({ x, y, t });

describe("detectSwipe", () => {
  it("detects a leftward swipe as 'next'", () => {
    expect(detectSwipe(p(200, 100, 0), p(100, 110, 200))).toBe("next");
  });

  it("detects a rightward swipe as 'prev'", () => {
    expect(detectSwipe(p(100, 100, 0), p(220, 105, 200))).toBe("prev");
  });

  it("returns null when the horizontal distance is below threshold", () => {
    expect(detectSwipe(p(100, 100, 0), p(130, 100, 100))).toBeNull();
  });

  it("returns null when the gesture is mostly vertical", () => {
    expect(detectSwipe(p(100, 100, 0), p(160, 300, 200))).toBeNull();
  });

  it("returns null when the gesture is too slow", () => {
    expect(detectSwipe(p(200, 100, 0), p(100, 100, 2000))).toBeNull();
  });

  it("respects custom options", () => {
    expect(detectSwipe(p(200, 100, 0), p(170, 100, 100), { minDistance: 20 })).toBe("next");
  });
});
