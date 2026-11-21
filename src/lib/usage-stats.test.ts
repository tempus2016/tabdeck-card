import { describe, expect, it } from "vitest";
import { UsageMeter, normalizeUsageStats } from "./usage-stats";

describe("UsageMeter", () => {
  it("counts visible time per tab and hands it out once", () => {
    const m = new UsageMeter();
    m.switchTo("Home", 0);
    m.setRunning(true, 0);
    m.switchTo("Cameras", 90_000);
    m.setRunning(false, 150_000);
    m.setRunning(true, 1_000_000);
    m.switchTo("Home", 1_030_000);
    expect(m.take(1_060_000)).toEqual({ Home: 2, Cameras: 1.5 });
    expect(m.take(1_060_000)).toEqual({});
  });

  it("carries less than a hundredth of a minute to the next report", () => {
    const m = new UsageMeter();
    m.switchTo("Home", 0);
    m.setRunning(true, 0);
    expect(m.take(400)).toEqual({});
    expect(m.take(700)).toEqual({ Home: 0.01 });
    m.switchTo(undefined, 700);
    expect(m.take(100_000)).toEqual({});
  });
});

describe("normalizeUsageStats", () => {
  it("reads true, minutes and junk", () => {
    expect(normalizeUsageStats(true)).toBe(10);
    expect(normalizeUsageStats(5)).toBe(5);
    expect(normalizeUsageStats("90")).toBe(60);
    expect(normalizeUsageStats(0.2)).toBe(1);
    expect(normalizeUsageStats(false)).toBeUndefined();
    expect(normalizeUsageStats(0)).toBeUndefined();
    expect(normalizeUsageStats("x")).toBeUndefined();
  });
});
