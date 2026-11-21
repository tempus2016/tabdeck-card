import { describe, it, expect } from "vitest";
import { clockText, normalizeIdleDim, shouldDim } from "./screensaver";

describe("idle_dim", () => {
  it("reads minutes or an object", () => {
    expect(normalizeIdleDim(5)).toEqual({ after: 5, mode: "dim", opacity: 0.7 });
    expect(normalizeIdleDim({ after: 2, mode: "clock", opacity: 0.9 })).toEqual({ after: 2, mode: "clock", opacity: 0.9 });
    expect(normalizeIdleDim({ after: 2, mode: "disco", opacity: 3 })).toEqual({ after: 2, mode: "dim", opacity: 0.7 });
    expect(normalizeIdleDim(0)).toBeUndefined();
    expect(normalizeIdleDim(undefined)).toBeUndefined();
    expect(normalizeIdleDim(0.1)?.after).toBe(0.5);
  });

  it("dims after the idle time", () => {
    const cfg = normalizeIdleDim(1)!;
    expect(shouldDim(cfg, 59_000, 0)).toBe(false);
    expect(shouldDim(cfg, 60_000, 0)).toBe(true);
    expect(shouldDim(undefined, 1e9, 0)).toBe(false);
  });

  it("formats the clock in the given language", () => {
    const d = new Date(2026, 10, 10, 14, 5);
    expect(clockText(d, "en-GB").time).toBe("14:05");
    expect(clockText(d, "en-US").time).toMatch(/2:05/);
    expect(clockText(d, "en-GB").date).toContain("November");
    expect(clockText(d, "not a lang!").time).toBe("14:05");
    expect(clockText(d, "en-US", "24").time).toBe("14:05");
    expect(clockText(d, "en-GB", "12").time).toMatch(/2:05/);
  });
});
