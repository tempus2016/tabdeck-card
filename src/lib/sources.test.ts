import { describe, it, expect } from "vitest";
import { buildSourceTemplate, defaultTabTemplate, isDefaultTabTemplate, SOURCE_TAB_TEMPLATE } from "./sources";
import { normalizeConfig } from "./config";

describe("buildSourceTemplate", () => {
  it("builds an areas template with a domain filter and exclusions", () => {
    const t = buildSourceTemplate({ source: "areas", domains: ["light", "switch"], exclude: ["garage"] });
    expect(t).toContain("areas()");
    expect(t).toContain("area_entities(id)");
    expect(t).toContain("^(light|switch)\\\\.");
    expect(t).toContain("['garage']");
    expect(t).toContain("tojson");
  });

  it("builds a labels template", () => {
    const t = buildSourceTemplate({ source: "labels" });
    expect(t).toContain("labels()");
    expect(t).toContain("label_entities(id)");
    expect(t).not.toContain("select('match'");
  });

  it("sanitizes domains and exclusions", () => {
    const t = buildSourceTemplate({ source: "areas", domains: ["light", "x') }}{{ evil"], exclude: ["a'b"] });
    expect(t).not.toContain("evil");
    expect(t).not.toContain("a'b");
  });
});

describe("auto_tabs source normalization", () => {
  it("synthesizes the template and a default tab_template", () => {
    const c = normalizeConfig({ auto_tabs: { source: "areas", domains: ["light"] } });
    expect(c.auto_tabs!.source).toBe("areas");
    expect(c.auto_tabs!.template).toContain("areas()");
    expect(c.auto_tabs!.tab_template).toEqual(SOURCE_TAB_TEMPLATE);
  });

  it("keeps a custom tab_template", () => {
    const tpl = { name: "{{ item.name }}", card: { type: "area", area: "{{ item.id }}" } };
    const c = normalizeConfig({ auto_tabs: { source: "areas", tab_template: tpl } });
    expect(c.auto_tabs!.tab_template).toEqual(tpl);
  });

  it("ignores an unknown source", () => {
    expect(() => normalizeConfig({ auto_tabs: { source: "rooms" } })).toThrow();
  });
});

describe("more sources", () => {
  it("floors gather their areas' entities", () => {
    const t = buildSourceTemplate({ source: "floors", domains: ["light"] });
    expect(t).toContain("floors()");
    expect(t).toContain("floor_areas(id)");
    expect(t).toContain("floor_name(id)");
    expect(t).toContain("^(light)\\\\.");
  });

  it("domains: one tab per given (or common) domain with entities", () => {
    const t = buildSourceTemplate({ source: "domains", domains: ["light", "cover"] });
    expect(t).toContain("['light', 'cover']");
    expect(t).toContain("states[id]");
    expect(t).toContain("mdi:lightbulb");
    expect(buildSourceTemplate({ source: "domains" })).toContain("'climate'");
  });

  it("devices group entities by device", () => {
    const t = buildSourceTemplate({ source: "devices", domains: ["sensor"] });
    expect(t).toContain("device_entities(id)");
    expect(t).toContain("device_attr(id, 'name_by_user')");
    expect(t).toContain("sort(attribute='name')");
  });

  it("todo, calendars, cameras: one tab per entity of that domain", () => {
    expect(buildSourceTemplate({ source: "todo" })).toContain("states.todo");
    expect(buildSourceTemplate({ source: "calendars" })).toContain("states.calendar");
    expect(buildSourceTemplate({ source: "cameras" })).toContain("states.camera");
  });

  it("zones list the people in each zone", () => {
    const t = buildSourceTemplate({ source: "zones" });
    expect(t).toContain("states.zone");
    expect(t).toContain("states.person");
    expect(t).toContain("'count'");
  });

  it("entity sources accept entity ids in exclude", () => {
    const t = buildSourceTemplate({ source: "cameras", exclude: ["camera.doorbell", "bad'id"] });
    expect(t).toContain("['camera.doorbell']");
    expect(t).not.toContain("bad'id");
  });

  it("each source gets a fitting default card", () => {
    expect(defaultTabTemplate({ source: "todo" }).card).toEqual({ type: "todo-list", entity: "{{ item.id }}" });
    expect(defaultTabTemplate({ source: "todo" }).badge).toBe("{{ item.id }}");
    expect(defaultTabTemplate({ source: "calendars" }).card.type).toBe("calendar");
    expect(defaultTabTemplate({ source: "cameras" }).card).toEqual({
      type: "picture-entity",
      entity: "{{ item.id }}",
      camera_view: "auto",
      show_state: false,
    });
    expect(defaultTabTemplate({ source: "zones" }).card).toEqual({ type: "map", entities: "{{ item.entities }}" });
    expect(defaultTabTemplate({ source: "zones" }).badge).toBe("{{ item.count }}");
    expect(defaultTabTemplate({ source: "areas" })).toBe(SOURCE_TAB_TEMPLATE);
  });

  it("content: tiles gives area / floor / label tabs auto-generated tiles", () => {
    expect(defaultTabTemplate({ source: "areas", content: "tiles", domains: ["light"] })).toEqual({
      name: "{{ item.name }}",
      icon: "{{ item.icon }}",
      area: "{{ item.id }}",
      domains: ["light"],
    });
    expect(defaultTabTemplate({ source: "floors", content: "tiles" }).floor).toBe("{{ item.id }}");
    expect(defaultTabTemplate({ source: "labels", content: "tiles" }).label).toBe("{{ item.id }}");
  });

  it("the editor can tell default blueprints from custom ones", () => {
    expect(isDefaultTabTemplate(defaultTabTemplate({ source: "zones" }))).toBe(true);
    expect(isDefaultTabTemplate(defaultTabTemplate({ source: "areas", content: "tiles" }))).toBe(true);
    expect(isDefaultTabTemplate({ name: "x" })).toBe(false);
  });

  it("normalizes the new sources and content", () => {
    const c = normalizeConfig({ auto_tabs: { source: "zones" } });
    expect(c.auto_tabs!.template).toContain("states.zone");
    expect(c.auto_tabs!.tab_template!.card.type).toBe("map");
    const t = normalizeConfig({ auto_tabs: { source: "floors", content: "tiles" } });
    expect(t.auto_tabs!.content).toBe("tiles");
    expect(t.auto_tabs!.tab_template!.floor).toBe("{{ item.id }}");
  });
});
