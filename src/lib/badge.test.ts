import { describe, it, expect } from "vitest";
import { formatBadge, normalizeBadgeFormat } from "./badge";

describe("formatBadge", () => {
  it("passes values through without a format", () => {
    expect(formatBadge("7", undefined)).toBe("7");
    expect(formatBadge(undefined, { max: 9 })).toBeUndefined();
  });
  it("rounds to a precision", () => {
    expect(formatBadge("21.456", { precision: 1 })).toBe("21.5");
    expect(formatBadge("3", { precision: 0 })).toBe("3");
    expect(formatBadge("2.5", { precision: 0 })).toBe("3");
  });
  it("caps at max with a plus", () => {
    expect(formatBadge("150", { max: 99 })).toBe("99+");
    expect(formatBadge("99", { max: 99 })).toBe("99");
  });
  it("appends a unit (and applies it after the cap)", () => {
    expect(formatBadge("21.46", { precision: 1, unit: "°" })).toBe("21.5°");
    expect(formatBadge("12", { unit: " W" })).toBe("12 W");
    expect(formatBadge("150", { max: 99, unit: "%" })).toBe("99+%");
  });
  it("leaves non-numeric values untouched", () => {
    expect(formatBadge("on", { precision: 1, unit: "x", max: 3 })).toBe("on");
    expect(formatBadge("", { unit: "x" })).toBe("");
  });
});

describe("normalizeBadgeFormat", () => {
  it("keeps only valid keys", () => {
    expect(normalizeBadgeFormat({ precision: "2", unit: "°", max: 99, junk: 1 })).toEqual({
      precision: 2,
      unit: "°",
      max: 99,
    });
    expect(normalizeBadgeFormat({ precision: -1, max: "x" })).toEqual({});
    expect(normalizeBadgeFormat("nope")).toBeUndefined();
  });
});
