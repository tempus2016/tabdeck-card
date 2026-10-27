import { describe, it, expect } from "vitest";
import { applyStarter, buildStarter, STARTERS } from "./starters";
import { normalizeConfig } from "./config";

const hass: any = {
  areas: { kitchen: { area_id: "kitchen" } },
  states: {
    "camera.front": { state: "idle", attributes: {} },
    "camera.back": { state: "idle", attributes: {} },
    "alarm_control_panel.home": { state: "disarmed", attributes: {} },
    "lock.front": { state: "locked", attributes: {} },
    "binary_sensor.front_door": { state: "off", attributes: { device_class: "door" } },
    "binary_sensor.motion": { state: "off", attributes: { device_class: "motion" } },
    "media_player.lounge_tv": { state: "off", attributes: { friendly_name: "Lounge TV", device_class: "tv" } },
    "climate.hall": { state: "heat", attributes: { friendly_name: "Hall" } },
    "person.john": { state: "home", attributes: { friendly_name: "John" } },
    "light.kitchen": { state: "on", attributes: {} },
  },
};

describe("starters", () => {
  it("every starter produces a valid config", () => {
    for (const kind of STARTERS) {
      const s = buildStarter(kind, hass);
      expect(s.count, kind).toBeGreaterThan(0);
      const cfg = applyStarter({ type: "custom:tabdeck-card", tabs: [] }, s, "replace");
      expect(() => normalizeConfig(cfg), kind).not.toThrow();
    }
  });

  it("security builds alarm, cameras, openings and locks tabs", () => {
    const s = buildStarter("security", hass);
    expect(s.tabs.map((t) => t.name)).toEqual(["Alarm", "Cameras", "Doors & windows", "Locks"]);
    const cams = s.tabs[1];
    expect(cams.columns).toBe(2);
    expect(cams.cards).toHaveLength(2);
    const doors = s.tabs[2];
    expect(doors.card.entities).toEqual(["binary_sensor.front_door"]);
    expect(doors.badge).toContain("binary_sensor.front_door");
    expect(s.options?.hide_inactive_badge).toBe(true);
  });

  it("media, climate and family build a tab per entity", () => {
    expect(buildStarter("media", hass).tabs[0]).toMatchObject({ name: "Lounge TV", icon: "mdi:television" });
    expect(buildStarter("climate", hass).tabs[0]).toMatchObject({ name: "Hall", card: { type: "thermostat" } });
    expect(buildStarter("family", hass).tabs[0].cards[1]).toMatchObject({ type: "map", entities: ["person.john"] });
  });

  it("rooms and lights use the areas source", () => {
    expect(buildStarter("rooms", hass).auto_tabs).toEqual({ source: "areas" });
    expect(buildStarter("lights", hass).auto_tabs).toEqual({ source: "areas", domains: ["light"] });
  });

  it("reports zero when nothing matches", () => {
    expect(buildStarter("security", { states: {} }).count).toBe(0);
    expect(buildStarter("rooms", { states: {} }).count).toBe(0);
  });

  it("applyStarter replaces or appends", () => {
    const base = { tabs: [{ name: "Mine", card: { type: "markdown" } }], auto_tabs: { source: "labels" } };
    const s = buildStarter("climate", hass);
    expect(applyStarter(base, s, "append").tabs.map((t: any) => t.name)).toEqual(["Mine", "Hall"]);
    expect(applyStarter(base, s, "append").auto_tabs).toEqual({ source: "labels" });
    const rep = applyStarter(base, s, "replace");
    expect(rep.tabs.map((t: any) => t.name)).toEqual(["Hall"]);
    expect(rep.auto_tabs).toBeUndefined();
  });
});
