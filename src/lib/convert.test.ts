import { describe, it, expect } from "vitest";
import { applyConversion, convertConfig, describeCard, toVisibility } from "./convert";
import { normalizeConfig } from "./config";

const hass: any = {
  states: { "light.kitchen": { state: "on", attributes: { friendly_name: "Kitchen Light" } } },
};
const valid = (r: any) => expect(() => normalizeConfig({ tabs: r.tabs, ...r.options })).not.toThrow();

describe("convertConfig", () => {
  it("kinghat tabbed-card", () => {
    const r = convertConfig({
      type: "custom:tabbed-card",
      options: { defaultTabIndex: 1 },
      styles: { "--mdc-theme-primary": "yellow", "--mdc-tab-text-label-color-default": "orange" },
      tabs: [
        { card: { type: "entities", entities: ["light.kitchen"] }, attributes: { label: "Lights", icon: "mdi:lightbulb" } },
        { card: { type: "weather-forecast", entity: "weather.home" }, attributes: { label: "Weather" } },
      ],
    });
    expect(r.source).toBe("tabbed-card");
    expect(r.tabs.map((t) => t.name)).toEqual(["Lights", "Weather"]);
    expect(r.tabs[0].icon).toBe("mdi:lightbulb");
    expect(r.tabs[1].icon).toBe("mdi:weather-partly-cloudy");
    expect(r.options).toEqual({ default_tab: 1, styles: { "--tabdeck-accent": "yellow" } });
    expect(r.notes).toContain("convert.note.styles");
    valid(r);
  });

  it("swipe-card", () => {
    const r = convertConfig({
      type: "custom:swipe-card",
      start_card: 2,
      parameters: { loop: true, autoplay: { delay: 8000 } },
      cards: [{ type: "light", entity: "light.kitchen" }, { type: "map" }],
    }, hass);
    expect(r.tabs.map((t) => t.name)).toEqual(["Kitchen Light", "Map"]);
    expect(r.options).toMatchObject({ swipe: true, swipe_wrap: true, default_tab: 1, auto_rotate: 8 });
    valid(r);
  });

  it("vertical-stack: one tab per card, or split at heading cards", () => {
    const plain = convertConfig({ type: "vertical-stack", cards: [{ type: "markdown", title: "Notes" }, { type: "calendar" }] });
    expect(plain.tabs.map((t) => t.name)).toEqual(["Notes", "Calendar"]);
    const headed = convertConfig({
      type: "vertical-stack",
      cards: [
        { type: "heading", heading: "Downstairs", icon: "mdi:sofa" },
        { type: "tile", entity: "light.kitchen" },
        { type: "tile", entity: "light.hall" },
        { type: "heading", heading: "Upstairs" },
        { type: "tile", entity: "light.bed" },
      ],
    });
    expect(headed.tabs.map((t) => t.name)).toEqual(["Downstairs", "Upstairs"]);
    expect(headed.tabs[0]).toMatchObject({ icon: "mdi:sofa" });
    expect(headed.tabs[0].cards).toHaveLength(2);
    expect(headed.tabs[1].card).toMatchObject({ type: "tile", entity: "light.bed" });
    valid(headed);
  });

  it("conditional cards and card visibility become tab visibility", () => {
    const r = convertConfig([
      { type: "conditional", conditions: [{ entity: "input_boolean.guest", state: "on" }], card: { type: "markdown", title: "Guests" } },
      { type: "tile", entity: "light.kitchen", visibility: [{ condition: "screen", media_query: "(min-width: 0px)" }] },
    ]);
    expect(r.tabs[0]).toMatchObject({
      name: "Guests",
      visibility: [{ condition: "state", entity: "input_boolean.guest", state: "on" }],
    });
    expect(r.tabs[1].visibility[0].condition).toBe("screen");
    expect(r.tabs[1].card.visibility).toBeUndefined();
  });

  it("state-switch", () => {
    const r = convertConfig(
      {
        type: "custom:state-switch",
        entity: "input_select.mode",
        default: "day",
        transition: "slide-left",
        states: { day: { type: "markdown" }, night: { type: "light", entity: "light.kitchen" } },
      },
      { states: { "input_select.mode": { state: "night" } } },
    );
    expect(r.tabs.map((t) => t.name)).toEqual(["day", "night"]);
    expect(r.tabs[1].auto_select).toEqual({ entity: "input_select.mode", state: "night" });
    expect(r.options).toMatchObject({ default_tab: "night", transition: "slide" });
    expect(convertConfig({ type: "custom:state-switch", entity: "hash", states: { a: { type: "markdown" } } }).options.remember).toBe("url");
    expect(convertConfig({ type: "custom:state-switch", entity: "user", states: { a: { type: "markdown" } } }).notes).toContain("convert.note.state_switch_mode");
  });

  it("Bubble Card pop-ups", () => {
    const r = convertConfig([
      {
        type: "vertical-stack",
        cards: [
          { type: "custom:bubble-card", card_type: "pop-up", hash: "#kitchen", name: "Kitchen", icon: "mdi:fridge" },
          { type: "tile", entity: "light.kitchen" },
        ],
      },
      {
        type: "vertical-stack",
        cards: [
          { type: "custom:bubble-card", card_type: "pop-up", hash: "#living_room" },
          { type: "tile", entity: "light.a" },
          { type: "tile", entity: "light.b" },
        ],
      },
    ]);
    expect(r.source).toBe("bubble-popups");
    expect(r.tabs.map((t) => [t.name, t.icon])).toEqual([["Kitchen", "mdi:fridge"], ["Living room", "mdi:lightbulb"]]);
    expect(r.tabs[1].cards).toHaveLength(2);
  });

  it("sections view and whole dashboards", () => {
    const view = convertConfig({
      type: "sections",
      sections: [
        { type: "grid", cards: [{ type: "heading", heading: "Climate" }, { type: "thermostat", entity: "climate.x" }] },
        { type: "grid", cards: [{ type: "tile", entity: "light.kitchen" }] },
      ],
    }, hass);
    expect(view.tabs.map((t) => t.name)).toEqual(["Climate", "Kitchen Light"]);
    const dash = convertConfig({
      views: [
        { title: "Home", icon: "mdi:home", cards: [{ type: "markdown" }, { type: "map" }] },
        { title: "Energy", sections: [{ cards: [{ type: "energy-distribution" }] }] },
      ],
    });
    expect(dash.tabs.map((t) => [t.name, t.icon])).toEqual([["Home", "mdi:home"], ["Energy", "mdi:lightning-bolt"]]);
    expect(dash.tabs[0].cards).toHaveLength(2);
    valid(dash);
  });

  it("an existing tabdeck config or a list of tabs passes through", () => {
    const r = convertConfig({ type: "custom:tabdeck-card", style: "pill", tabs: [{ name: "A", card: { type: "markdown" } }] });
    expect(r).toMatchObject({ source: "tabdeck", options: { style: "pill" } });
    expect(convertConfig([{ name: "A", card: { type: "markdown" } }]).source).toBe("tabdeck");
  });

  it("a single card becomes one tab; junk throws", () => {
    expect(convertConfig({ type: "light", entity: "light.kitchen" }, hass).tabs[0].name).toBe("Kitchen Light");
    expect(() => convertConfig("hello")).toThrow("convert.error.not_card");
    expect(() => convertConfig([])).toThrow("convert.error.empty");
    expect(() => convertConfig({ foo: 1 })).toThrow();
  });
});

describe("helpers", () => {
  it("describeCard falls back sensibly", () => {
    expect(describeCard({ type: "custom:mini-graph-card", entities: ["sensor.temp_lounge"] })).toEqual({ name: "Temp lounge", icon: "mdi:eye" });
    expect(describeCard({ type: "custom:mushroom-chips-card" })).toEqual({ name: "Mushroom chips card", icon: undefined });
  });
  it("toVisibility keeps modern conditions", () => {
    expect(toVisibility([{ condition: "user", users: ["x"] }])).toEqual([{ condition: "user", users: ["x"] }]);
    expect(toVisibility([{ entity: "a.b", state_not: "off" }])).toEqual([{ condition: "state", entity: "a.b", state_not: "off" }]);
  });
  it("applyConversion replaces with options, or appends tabs only", () => {
    const base = { style: "pill", tabs: [{ name: "Mine" }], auto_tabs: { source: "areas" } };
    const r = { source: "cards" as const, tabs: [{ name: "New" }], options: { swipe: true }, notes: [] };
    expect(applyConversion(base, r, "append")).toEqual({ ...base, tabs: [{ name: "Mine" }, { name: "New" }] });
    const rep = applyConversion(base, r, "replace");
    expect(rep).toMatchObject({ style: "pill", swipe: true, tabs: [{ name: "New" }] });
    expect(rep.auto_tabs).toBeUndefined();
  });
});

describe("more imports (idea 127)", () => {
  const load = async (name: string) => (await import("yaml")).parse((await import(`./fixtures/${name}?raw`)).default);

  it("Bubble Card 3 stand-alone pop-ups in a sections view, named by the buttons stack", async () => {
    const r = convertConfig(await load("bubble-v3-sections.yaml"));
    expect(r.source).toBe("bubble-popups");
    expect(r.tabs.map((t) => [t.name, t.icon])).toEqual([
      ["Living room", "mdi:sofa"],
      ["Cuisine", "mdi:fridge"],
    ]);
    expect(r.tabs[0].cards.map((c: any) => c.entity)).toEqual(["light.living_room", "media_player.tv"]);
    expect(r.tabs[1].card).toEqual({ type: "tile", entity: "light.kitchen" });
    expect(r.notes).toEqual(["convert.note.bubble", "convert.note.bubble_nav", "convert.note.bubble_outside"]);
  });

  it("stand-alone pop-ups in a plain list take the cards after them; chips name them", () => {
    const r = convertConfig([
      { type: "custom:mushroom-chips-card", chips: [{ type: "action", icon: "mdi:garage", tap_action: { action: "navigate", navigation_path: "#garage" } }] },
      { type: "custom:bubble-card", card_type: "pop-up", hash: "#garage" },
      { type: "tile", entity: "cover.garage" },
      { type: "custom:bubble-card", card_type: "pop-up", hash: "#office", name: "Office", icon: "mdi:desk" },
    ]);
    expect(r.tabs).toEqual([
      { name: "Garage", icon: "mdi:garage", card: { type: "tile", entity: "cover.garage" } },
      { name: "Office", icon: "mdi:desk", card: { type: "markdown", content: " " } },
    ]);
    expect(r.notes).not.toContain("convert.note.bubble_outside");
  });

  it("Mushroom chips: navigating chips become view tabs, URL chips action tabs", async () => {
    const r = convertConfig(await load("mushroom-chips.yaml"), hass);
    expect(r.source).toBe("mushroom-chips");
    expect(r.tabs).toEqual([
      { name: "Home", icon: "mdi:home", view: "/lovelace/home" },
      { name: "Lights", icon: "mdi:lightbulb", view: "/dashboard-rooms/lights" },
      { name: "Climate", view: "/lovelace/climate" },
      {
        name: "Guests",
        icon: "mdi:account-multiple",
        view: "/lovelace/guests",
        visibility: [{ condition: "state", entity: "input_boolean.guest_mode", state: "on" }],
      },
      { name: "Example.com", icon: "mdi:web", tap_action: { action: "url", url_path: "https://example.com/status" } },
    ]);
    expect(r.notes).toEqual(["convert.note.chips"]);
    valid(r);
  });

  it("a chips card that doesn't navigate stays an ordinary card tab", () => {
    const r = convertConfig({ type: "custom:mushroom-chips-card", chips: [{ type: "entity", entity: "light.kitchen" }] });
    expect(r.source).toBe("cards");
  });
});
