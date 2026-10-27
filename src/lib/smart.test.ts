import { describe, it, expect, beforeEach } from "vitest";
import {
  autoContentCard,
  countBadge,
  deviceId,
  matchesPattern,
  normalizeCountBadge,
  orderAlertsFirst,
  pickByDevice,
  pickByTime,
  ringPercent,
  snoozedUntil,
  snooze,
  clearSnooze,
  pinUnlocked,
  rememberPin,
} from "./smart";

const st = (state: string, attributes: any = {}) => ({ state, attributes });

describe("count badge", () => {
  const hass: any = {
    states: {
      "light.kitchen": st("on"),
      "light.hall": st("off"),
      "light.porch": st("on"),
      "switch.fan": st("on"),
      "binary_sensor.door": st("on"),
    },
    entities: {
      "light.kitchen": { area_id: "kitchen" },
      "light.porch": { area_id: null, device_id: "d1" },
      "switch.fan": { area_id: "kitchen" },
    },
    devices: { d1: { area_id: "outside" } },
  };

  it("matches globs", () => {
    expect(matchesPattern("light.kitchen", "light.*")).toBe(true);
    expect(matchesPattern("switch.kitchen", "light.*")).toBe(false);
    expect(matchesPattern("light.kitchen_main", "*.kitchen*")).toBe(true);
    expect(matchesPattern("light.kitchen", "light.kitchen")).toBe(true);
  });

  it("normalizes the object form only", () => {
    expect(normalizeCountBadge({ count: "light.*" })).toEqual({ count: ["light.*"] });
    expect(normalizeCountBadge({ count: ["light.*", "switch.*"], state: "on", area: "kitchen" })).toEqual({
      count: ["light.*", "switch.*"],
      state: ["on"],
      area: "kitchen",
    });
    expect(normalizeCountBadge("light.kitchen")).toBeUndefined();
    expect(normalizeCountBadge({})).toBeUndefined();
  });

  it("counts active entities by default", () => {
    expect(countBadge({ count: ["light.*"] }, hass)).toBe("2");
  });

  it("counts a given state, over several patterns", () => {
    expect(countBadge({ count: ["light.*"], state: ["off"] }, hass)).toBe("1");
    expect(countBadge({ count: ["light.*", "switch.*"], state: ["on"] }, hass)).toBe("3");
  });

  it("filters by area, including the device's area", () => {
    expect(countBadge({ count: ["light.*", "switch.*"], area: "kitchen" }, hass)).toBe("2");
    expect(countBadge({ count: ["light.*"], area: "outside" }, hass)).toBe("1");
  });
});

describe("default by time", () => {
  const map = { "06:00": "Morning", "12:00": "Day", "18:30": "Evening" };
  const at = (h: number, m = 0) => new Date(2026, 9, 27, h, m);

  it("picks the latest slot that has started", () => {
    expect(pickByTime(map, at(7))).toBe("Morning");
    expect(pickByTime(map, at(12))).toBe("Day");
    expect(pickByTime(map, at(18, 29))).toBe("Day");
    expect(pickByTime(map, at(23))).toBe("Evening");
  });

  it("before the first slot, the last one still applies (overnight)", () => {
    expect(pickByTime(map, at(3))).toBe("Evening");
  });

  it("ignores malformed times and empty maps", () => {
    expect(pickByTime({ nonsense: "X", "7": "Y" }, at(8))).toBeUndefined();
    expect(pickByTime(undefined, at(8))).toBeUndefined();
  });
});

describe("device id and default by device", () => {
  beforeEach(() => localStorage.clear());

  it("takes ?tabdeck_device= from the URL and remembers it", () => {
    expect(deviceId("?tabdeck_device=kitchen-panel")).toBe("kitchen-panel");
    expect(deviceId("")).toBe("kitchen-panel");
  });

  it("falls back to browser_mod's browser id", () => {
    localStorage.setItem("browser_mod-browser-id", "abc123");
    expect(deviceId("")).toBe("abc123");
  });

  it("picks the tab for this device", () => {
    expect(pickByDevice({ "kitchen-panel": "Cameras" }, "kitchen-panel")).toBe("Cameras");
    expect(pickByDevice({ "kitchen-panel": "Cameras" }, "phone")).toBeUndefined();
    expect(pickByDevice({ a: "X" }, undefined)).toBeUndefined();
  });
});

describe("alerts first", () => {
  it("moves alerting tabs to the front, keeping order otherwise", () => {
    const tabs = ["A", "B", "C", "D"];
    expect(orderAlertsFirst(tabs, (t) => t === "C" || t === "D")).toEqual(["C", "D", "A", "B"]);
    expect(orderAlertsFirst(tabs, () => false)).toEqual(tabs);
  });
});

describe("progress ring", () => {
  it("turns a value into 0–100 against max", () => {
    expect(ringPercent("50", 100)).toBe(50);
    expect(ringPercent("3", 4)).toBe(75);
    expect(ringPercent("150", 100)).toBe(100);
    expect(ringPercent("-5", 100)).toBe(0);
    expect(ringPercent("unavailable", 100)).toBeUndefined();
    expect(ringPercent(undefined, 100)).toBeUndefined();
  });
});

describe("alert snooze", () => {
  beforeEach(() => localStorage.clear());

  it("stores and expires a snooze per deck and tab", () => {
    snooze("deck", "Garage", 1000, 10);
    expect(snoozedUntil("deck", "Garage", 1000 + 5 * 60_000)).toBe(1000 + 10 * 60_000);
    expect(snoozedUntil("deck", "Garage", 1000 + 11 * 60_000)).toBeUndefined();
    expect(snoozedUntil("deck", "Other", 1000)).toBeUndefined();
  });

  it("can be cleared", () => {
    snooze("deck", "Garage", 0, 10);
    clearSnooze("deck", "Garage");
    expect(snoozedUntil("deck", "Garage", 1)).toBeUndefined();
  });
});

describe("pin unlock memory", () => {
  beforeEach(() => sessionStorage.clear());

  it("is unlocked for the session, or for N minutes", () => {
    expect(pinUnlocked("deck", "Sec", 0, undefined)).toBe(false);
    rememberPin("deck", "Sec", 1000);
    expect(pinUnlocked("deck", "Sec", 5000, undefined)).toBe(true);
    expect(pinUnlocked("deck", "Sec", 1000 + 4 * 60_000, 5)).toBe(true);
    expect(pinUnlocked("deck", "Sec", 1000 + 6 * 60_000, 5)).toBe(false);
  });
});

describe("auto content", () => {
  const hass: any = {
    states: {
      "light.kitchen": st("on"),
      "switch.kettle": st("off"),
      "sensor.kitchen_temp": st("21"),
      "sensor.kitchen_signal": st("-60"),
      "light.hidden": st("on"),
      "light.lounge": st("off"),
      "light.porch": st("on"),
    },
    entities: {
      "light.kitchen": { entity_id: "light.kitchen", area_id: "kitchen", labels: ["lights"] },
      "switch.kettle": { entity_id: "switch.kettle", device_id: "kettle" },
      "sensor.kitchen_temp": { entity_id: "sensor.kitchen_temp", area_id: "kitchen" },
      "sensor.kitchen_signal": { entity_id: "sensor.kitchen_signal", area_id: "kitchen", entity_category: "diagnostic" },
      "light.hidden": { entity_id: "light.hidden", area_id: "kitchen", hidden: true },
      "light.lounge": { entity_id: "light.lounge", area_id: "lounge", labels: ["lights"] },
      "light.porch": { entity_id: "light.porch", area_id: "porch" },
    },
    devices: { kettle: { area_id: "kitchen" } },
    areas: {
      kitchen: { area_id: "kitchen", floor_id: "ground" },
      lounge: { area_id: "lounge", floor_id: "ground" },
      porch: { area_id: "porch", floor_id: null },
    },
  };

  it("builds a tile grid of an area's entities (device areas too; hidden and diagnostic left out)", () => {
    const card = autoContentCard({ area: "kitchen" }, hass)!;
    expect(card.type).toBe("grid");
    expect(card.cards.map((c: any) => c.entity)).toEqual(["light.kitchen", "sensor.kitchen_temp", "switch.kettle"]);
    expect(card.cards[0]).toEqual({ type: "tile", entity: "light.kitchen" });
  });

  it("works for floors and labels, and filters by domain", () => {
    expect(autoContentCard({ floor: "ground", domains: ["light"] }, hass)!.cards.map((c: any) => c.entity)).toEqual([
      "light.kitchen",
      "light.lounge",
    ]);
    expect(autoContentCard({ label: "lights" }, hass)!.cards.map((c: any) => c.entity)).toEqual([
      "light.kitchen",
      "light.lounge",
    ]);
  });

  it("an empty area gets a short note instead of an empty grid", () => {
    expect(autoContentCard({ area: "nowhere" }, hass)).toEqual({ type: "markdown", content: "No entities here." });
  });

  it("returns undefined for a tab that isn't an auto-content tab", () => {
    expect(autoContentCard({}, hass)).toBeUndefined();
  });
});

import { normalizeConfig, normalizeTab } from "./config";

describe("section 4 config", () => {
  const one = { tabs: [{ card: { type: "x" } }] };

  it("keeps the per-tab keys", () => {
    const t = normalizeTab({
      name: "Garage",
      badge: { count: "light.*", state: "on" },
      badge_icon: "mdi:alert",
      ring: "sensor.battery",
      ring_max: 4,
      ring_color: "#0f0",
      pin: 1234,
      pin_timeout: 5,
      area: "kitchen",
      domains: ["light"],
      card: { type: "x" },
    });
    expect(t.badge).toEqual({ count: "light.*", state: "on" });
    expect(t.badge_icon).toBe("mdi:alert");
    expect(t.ring).toBe("sensor.battery");
    expect(t.ring_max).toBe(4);
    expect(t.ring_color).toBe("#0f0");
    expect(t.pin).toBe("1234");
    expect(t.pin_timeout).toBe(5);
    expect(t.area).toBe("kitchen");
    expect(t.domains).toEqual(["light"]);
  });

  it("auto-content tabs need no card", () => {
    expect(normalizeTab({ name: "Kitchen", floor: "ground" }).floor).toBe("ground");
    expect(normalizeTab({ name: "L", label: "lights" }).label).toBe("lights");
  });

  it("top-level smart options default off", () => {
    const c = normalizeConfig(one);
    expect(c.alert_first).toBe(false);
    expect(c.alert_snooze).toBeUndefined();
    expect(c.fire_event).toBe(false);
    expect(c.remote_event).toBe(false);
    expect(c.remote_entity).toBeUndefined();
    expect(c.default_by_time).toBeUndefined();
    expect(c.default_by_device).toBeUndefined();
  });

  it("reads them", () => {
    const c = normalizeConfig({
      ...one,
      alert_first: true,
      alert_snooze: 30,
      fire_event: true,
      event_id: "hall",
      remote_entity: "input_text.panel_tab",
      remote_event: true,
      default_by_time: { "06:00": "Morning" },
      default_by_device: { panel: "Cameras" },
    });
    expect(c.alert_first).toBe(true);
    expect(c.alert_snooze).toBe(30);
    expect(c.fire_event).toBe(true);
    expect(c.event_id).toBe("hall");
    expect(c.remote_entity).toBe("input_text.panel_tab");
    expect(c.remote_event).toBe(true);
    expect(c.default_by_time).toEqual({ "06:00": "Morning" });
    expect(c.default_by_device).toEqual({ panel: "Cameras" });
  });
});
