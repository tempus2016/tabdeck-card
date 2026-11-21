import { describe, it, expect, vi } from "vitest";
import { normalizeEmpty, createPanelWatch } from "./empty";

describe("empty_message", () => {
  it("true = the default title, a string = the line under it, an object = all three", () => {
    expect(normalizeEmpty(true)).toEqual({});
    expect(normalizeEmpty("All alerts are clear")).toEqual({ text: "All alerts are clear" });
    expect(normalizeEmpty({ title: "Quiet", text: "No alerts", icon: "mdi:weather-night", x: 1 })).toEqual({ title: "Quiet", text: "No alerts", icon: "mdi:weather-night" });
    expect(normalizeEmpty(false)).toBeUndefined();
    expect(normalizeEmpty("")).toBeUndefined();
    expect(normalizeEmpty(undefined)).toBeUndefined();
  });

  it("normalizeTab keeps it as written so the editor round-trips it", async () => {
    const { normalizeTab } = await import("./config");
    expect(normalizeTab({ empty_message: "Clear", card: {} }).empty_message).toBe("Clear");
    expect(normalizeTab({ empty_message: true, card: {} }).empty_message).toBe(true);
    expect(normalizeTab({ empty_message: "", card: {} }).empty_message).toBeUndefined();
  });

  it("empty: reports empty only after the card has stayed 0 px tall for the delay", () => {
    vi.useFakeTimers();
    try {
      const seen: string[] = [];
      const w = createPanelWatch((s) => seen.push(s), { loading: false, empty: true, emptyDelay: 500 });
      w.size(0);
      vi.advanceTimersByTime(400);
      expect(seen).toEqual([]);
      w.size(120);
      vi.advanceTimersByTime(1000);
      expect(seen).toEqual([]);
      w.size(0);
      vi.advanceTimersByTime(500);
      expect(seen).toEqual(["empty"]);
      w.size(0);
      w.size(40);
      expect(seen).toEqual(["empty", "none"]);
      w.size(0);
      w.stop();
      vi.advanceTimersByTime(1000);
      expect(seen).toEqual(["empty", "none"]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("loading: boxes until the card first has a height, never again after", () => {
    vi.useFakeTimers();
    try {
      const seen: string[] = [];
      let loaded = 0;
      const w = createPanelWatch((s) => seen.push(s), { loading: true, empty: false }, () => loaded++);
      w.size(0);
      expect(seen).toEqual(["loading"]);
      w.size(200);
      expect(seen).toEqual(["loading", "none"]);
      expect(loaded).toBe(1);
      w.size(0);
      vi.advanceTimersByTime(5000);
      expect(seen).toEqual(["loading", "none"]);
      const again = createPanelWatch((s) => seen.push(s), { loading: true, empty: false, loaded: true });
      again.size(0);
      expect(seen).toEqual(["loading", "none"]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("loading that never ends gives way to the empty message (or nothing) after loadMax", () => {
    vi.useFakeTimers();
    try {
      const seen: string[] = [];
      const w = createPanelWatch((s) => seen.push(s), { loading: true, empty: true, loadMax: 3000 });
      w.size(0);
      vi.advanceTimersByTime(2999);
      expect(seen).toEqual(["loading"]);
      vi.advanceTimersByTime(1);
      expect(seen).toEqual(["loading", "empty"]);
      const plain: string[] = [];
      const p = createPanelWatch((s) => plain.push(s), { loading: true, empty: false, loadMax: 3000 });
      p.size(0);
      vi.advanceTimersByTime(3000);
      expect(plain).toEqual(["loading", "none"]);
    } finally {
      vi.useRealTimers();
    }
  });
});
