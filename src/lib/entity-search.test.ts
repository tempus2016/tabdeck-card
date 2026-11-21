import { describe, it, expect } from "vitest";
import { entityPlaces, isSearchShortcut, searchPlaces } from "./entity-search";

const tabs = [
  { name: "Lights", card: { type: "entities", entities: ["light.kitchen", { entity: "light.hall" }] } },
  { name: "Climate", card: { type: "thermostat", entity: "climate.lounge" } },
  {
    name: "Rooms",
    card: {
      type: "custom:tabdeck-card",
      tabs: [
        { name: "Kitchen", card: { type: "tile", entity: "sensor.kitchen_temperature" } },
        { name: "Hall", cards: [{ type: "tile", entity: "light.hall" }] },
      ],
    },
  },
];

const states = {
  "light.kitchen": { attributes: { friendly_name: "Kitchen light" } },
  "light.hall": { attributes: { friendly_name: "Hall light" } },
  "climate.lounge": { attributes: { friendly_name: "Lounge" } },
  "sensor.kitchen_temperature": { attributes: { friendly_name: "Kitchen temperature" } },
};

describe("entityPlaces", () => {
  it("lists each tab's entities, and the child tab of a nested deck", () => {
    expect(entityPlaces(tabs)).toEqual([
      { entity: "light.kitchen", index: 0, tab: "Lights" },
      { entity: "light.hall", index: 0, tab: "Lights" },
      { entity: "climate.lounge", index: 1, tab: "Climate" },
      { entity: "sensor.kitchen_temperature", index: 2, tab: "Rooms", child: "Kitchen" },
      { entity: "light.hall", index: 2, tab: "Rooms", child: "Hall" },
    ]);
  });

  it("names an unnamed tab by its position", () => {
    expect(entityPlaces([{ card: { type: "tile", entity: "light.a" } }])[0].tab).toBe("1");
  });
});

describe("searchPlaces", () => {
  const places = entityPlaces(tabs);

  it("matches friendly names, names starting with the query first", () => {
    const r = searchPlaces(places, states, "kitchen");
    expect(r.map((m) => m.name)).toEqual(["Kitchen light", "Kitchen temperature"]);
  });

  it("matches every word, in any order, ignoring case and accents", () => {
    expect(searchPlaces(places, states, "LIGHT hall").map((m) => m.place.tab)).toEqual(["Lights", "Rooms"]);
    expect(searchPlaces(places, { "light.kitchen": { attributes: { friendly_name: "Küche" } } }, "kuche")).toHaveLength(1);
  });

  it("falls back to the entity id", () => {
    expect(searchPlaces(places, {}, "climate.lou")[0].place.entity).toBe("climate.lounge");
  });

  it("returns nothing for an empty query and caps the list", () => {
    expect(searchPlaces(places, states, "  ")).toEqual([]);
    expect(searchPlaces(places, states, "l", 2)).toHaveLength(2);
  });
});

describe("isSearchShortcut", () => {
  it("is Ctrl+K or Cmd+K only", () => {
    expect(isSearchShortcut({ key: "k", ctrlKey: true })).toBe(true);
    expect(isSearchShortcut({ key: "k", metaKey: true })).toBe(true);
    expect(isSearchShortcut({ key: "k" })).toBe(false);
    expect(isSearchShortcut({ key: "k", ctrlKey: true, shiftKey: true })).toBe(false);
  });
});
