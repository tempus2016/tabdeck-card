import { describe, it, expect, beforeEach } from "vitest";
import { cardEntities, changedSince, loadSeen, saveSeen } from "./changed";

describe("cardEntities", () => {
  it("finds entity ids in nested card configs", () => {
    const card = {
      type: "vertical-stack",
      cards: [
        { type: "tile", entity: "light.kitchen" },
        { type: "entities", entities: ["switch.fan", { entity: "sensor.temp", name: "T" }, { type: "divider" }] },
        { type: "picture-glance", camera_image: "camera.door", entities: [] },
        { type: "button", tap_action: { action: "toggle", target: { entity_id: ["light.hall", "light.porch"] } } },
      ],
    };
    expect(cardEntities(card).sort()).toEqual(
      ["camera.door", "light.hall", "light.kitchen", "light.porch", "sensor.temp", "switch.fan"].sort(),
    );
  });

  it("ignores strings that aren't entity ids", () => {
    expect(cardEntities({ type: "markdown", content: "light.kitchen is on", entity: "not an id" })).toEqual([]);
  });

  it("returns nothing for no card", () => {
    expect(cardEntities(undefined)).toEqual([]);
  });
});

describe("changedSince", () => {
  const states = {
    "light.a": { state: "on", last_changed: "2026-11-10T10:00:00Z" },
    "light.b": { state: "off", last_changed: "2026-11-10T12:00:00Z" },
  };
  it("is true when any entity changed after the time", () => {
    expect(changedSince(["light.a", "light.b"], states, Date.parse("2026-11-10T11:00:00Z"))).toBe(true);
  });
  it("is false when nothing changed after it", () => {
    expect(changedSince(["light.a"], states, Date.parse("2026-11-10T11:00:00Z"))).toBe(false);
    expect(changedSince(["light.missing"], states, 0)).toBe(false);
    expect(changedSince(["light.a"], undefined, 0)).toBe(false);
  });
});

describe("seen store", () => {
  beforeEach(() => localStorage.clear());
  it("round-trips per deck", () => {
    saveSeen("deck1", { Lights: 5 });
    expect(loadSeen("deck1")).toEqual({ Lights: 5 });
    expect(loadSeen("deck2")).toEqual({});
  });
  it("survives junk in storage", () => {
    localStorage.setItem("tabdeck-seen:x", "{nope");
    expect(loadSeen("x")).toEqual({});
  });
});
