import { describe, it, expect } from "vitest";
import { parse } from "yaml";
import { normalizeConfig } from "./config";
import { deckToSectionsView } from "./export";
import { toYaml } from "./yaml-dump";

describe("deckToSectionsView", () => {
  it("makes a section per tab with a heading and the tab's cards", () => {
    const cfg = normalizeConfig({
      tabs: [
        { name: "Lights", icon: "mdi:lightbulb", cards: [{ type: "tile", entity: "light.a" }, { type: "tile", entity: "light.b" }] },
        { name: "Climate", card: { type: "thermostat", entity: "climate.x" }, visibility: [{ condition: "user", users: ["u1"] }] },
        { name: "Go", tap_action: { action: "navigate", navigation_path: "/x" } },
      ],
    });
    const r = deckToSectionsView(cfg, undefined, "Home");
    expect(r.view.title).toBe("Home");
    expect(r.view.type).toBe("sections");
    expect(r.view.sections).toHaveLength(2);
    expect(r.view.sections[0].cards).toEqual([
      { type: "heading", heading: "Lights", heading_style: "title", icon: "mdi:lightbulb" },
      { type: "tile", entity: "light.a" },
      { type: "tile", entity: "light.b" },
    ]);
    expect(r.view.sections[1].visibility).toEqual([{ condition: "user", users: ["u1"] }]);
    expect(r.skipped).toEqual(["Go"]);
  });

  it("keeps a sections-layout tab's own sections", () => {
    const cfg = normalizeConfig({
      tabs: [{ name: "Home", layout: "sections", sections: [{ cards: [{ type: "tile", entity: "a.b" }] }, { cards: [{ type: "markdown" }] }] }],
    });
    const r = deckToSectionsView(cfg);
    expect(r.view.sections).toHaveLength(2);
    expect(r.view.sections[0].cards[0].heading).toBe("Home");
    expect(r.view.sections[1].cards).toEqual([{ type: "markdown" }]);
  });

  it("notes what doesn't carry over", () => {
    const cfg = normalizeConfig({
      tabs: [{ name: "{{ states('x') }}", card: { type: "markdown" }, visibility: [{ condition: "template", value_template: "{{ true }}" }] }],
      auto_tabs: { source: "areas" },
    });
    const r = deckToSectionsView(cfg);
    expect(r.notes.sort()).toEqual(["export.note.auto_tabs", "export.note.conditions", "export.note.templates"]);
    expect(r.view.sections[0].cards[0].heading).toBe("Tab 1");
  });

  it("notes that a PIN doesn't carry over", () => {
    const r = deckToSectionsView(normalizeConfig({ tabs: [{ name: "Safe", pin: "1", card: { type: "markdown" } }] }));
    expect(r.notes).toEqual(["export.note.pin"]);
  });

  it("area tabs export as tiles", () => {
    const hass = {
      entities: { "light.k": { area_id: "kitchen" } },
      states: { "light.k": { state: "on" } },
      devices: {},
      areas: { kitchen: {} },
    };
    const cfg = normalizeConfig({ tabs: [{ name: "Kitchen", area: "kitchen" }] });
    const r = deckToSectionsView(cfg, hass);
    expect(r.view.sections[0].cards.slice(1)).toEqual([{ type: "tile", entity: "light.k" }]);
  });
});

describe("toYaml", () => {
  it("round-trips through a YAML parser", () => {
    const value = {
      title: "Home",
      sections: [
        { type: "grid", cards: [{ type: "heading", heading: "Lights: on", icon: "mdi:x" }, { type: "markdown", content: "line 1\nline 2" }] },
      ],
      empty: [],
      n: 4,
      flag: true,
      tricky: ["yes", "on", "", " lead", "#hash", "a: b", "{{ x }}", "12", "mdi:lightbulb", "a:", "http://x"],
      nested: { list: [[1, 2], { a: null }] },
    };
    expect(parse(toYaml(value))).toEqual(value);
  });
});
