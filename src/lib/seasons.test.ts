import { describe, it, expect } from "vitest";
import { activeSeason, normalizeSeasons } from "./seasons";

const day = (m: number, d: number) => new Date(2026, m - 1, d, 12);

describe("seasons", () => {
  it("expands built-in names and validates entries", () => {
    const s = normalizeSeasons(["winter", { from: "3-1", to: "03-31", accent: "green" }, { from: "13-01", to: "01-01" }, "nope", { to: "01-01" }])!;
    expect(s).toHaveLength(2);
    expect(s[0]).toMatchObject({ name: "winter", from: "12-01", to: "01-06" });
    expect(s[0].bar_background).toBeTruthy();
    expect(s[1]).toMatchObject({ from: "03-01", to: "03-31", accent: "green" });
    expect(normalizeSeasons(undefined)).toBeUndefined();
    expect(normalizeSeasons([])).toBeUndefined();
  });

  it("a built-in can be changed: own dates, own keys", () => {
    const [w] = normalizeSeasons([{ theme: "winter", from: "12-10", accent: "gold" }])!;
    expect(w).toMatchObject({ name: "winter", from: "12-10", to: "01-06", accent: "gold" });
  });

  it("picks the first season whose dates include today, across New Year too", () => {
    const s = normalizeSeasons(["winter", "autumn", { from: "06-01", to: "06-30", accent: "yellow" }])!;
    expect(activeSeason(s, day(12, 1))?.name).toBe("winter");
    expect(activeSeason(s, day(1, 6))?.name).toBe("winter");
    expect(activeSeason(s, day(1, 7))).toBeUndefined();
    expect(activeSeason(s, day(10, 31))?.name).toBe("autumn");
    expect(activeSeason(s, day(10, 24))).toBeUndefined();
    expect(activeSeason(s, day(6, 15))?.accent).toBe("yellow");
    expect(activeSeason(undefined, day(6, 15))).toBeUndefined();
  });
});
