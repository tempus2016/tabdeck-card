import { describe, it, expect } from "vitest";
import { isQuiet, normalizeQuiet } from "./quiet";

const at = (h: number, m = 0) => new Date(2026, 10, 21, h, m);

describe("quiet hours", () => {
  it("normalises a string, a window, an entity or both", () => {
    expect(normalizeQuiet(undefined)).toBeUndefined();
    expect(normalizeQuiet("22:00-07:00")).toEqual({ from: "22:00", to: "07:00" });
    expect(normalizeQuiet("22:00 – 7:30")).toEqual({ from: "22:00", to: "7:30" });
    expect(normalizeQuiet({ from: "23:00", to: "06:00", entity: "input_boolean.night" })).toEqual({ from: "23:00", to: "06:00", entity: "input_boolean.night" });
    expect(normalizeQuiet({ entity: "input_boolean.night" })).toEqual({ entity: "input_boolean.night" });
    expect(normalizeQuiet("25:00-07:00")).toBeUndefined();
    expect(normalizeQuiet({ from: "22:00" })).toBeUndefined();
  });

  it("is quiet inside the window (over midnight too) or while the entity is on", () => {
    const night = normalizeQuiet("22:00-07:00");
    expect(isQuiet(night, at(23))).toBe(true);
    expect(isQuiet(night, at(3))).toBe(true);
    expect(isQuiet(night, at(7))).toBe(false);
    expect(isQuiet(night, at(21, 59))).toBe(false);
    const day = normalizeQuiet("13:00-15:00");
    expect(isQuiet(day, at(14))).toBe(true);
    expect(isQuiet(day, at(15))).toBe(false);
    const ent = normalizeQuiet({ entity: "input_boolean.night" });
    expect(isQuiet(ent, at(12), { "input_boolean.night": { state: "on" } })).toBe(true);
    expect(isQuiet(ent, at(12), { "input_boolean.night": { state: "off" } })).toBe(false);
    expect(isQuiet(undefined, at(3))).toBe(false);
  });
});
