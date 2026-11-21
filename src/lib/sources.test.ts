import { describe, it, expect } from "vitest";
import { CLIENT_SOURCES, buildSourceTemplate, defaultTabTemplate, isDefaultTabTemplate, SOURCE_TAB_TEMPLATE } from "./sources";
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

describe("updates / repairs / notifications sources", () => {
  it("updates lists the update entities that are on", () => {
    const t = buildSourceTemplate({ source: "updates", exclude: ["update.skip_me"] });
    expect(t).toContain("states.update | selectattr('state', 'eq', 'on')");
    expect(t).toContain("['update.skip_me']");
    expect(t).toContain("latest_version");
    expect(defaultTabTemplate({ source: "updates" }).card).toEqual({ type: "entities", entities: ["{{ item.id }}"] });
  });

  it("repairs and notifications have no template (the card fetches them)", () => {
    expect(buildSourceTemplate({ source: "repairs" })).toBe("");
    expect(buildSourceTemplate({ source: "notifications" })).toBe("");
    expect(CLIENT_SOURCES).toEqual(["repairs", "notifications"]);
    const n = defaultTabTemplate({ source: "notifications" });
    expect(n.card.cards[1].entities[0].tap_action.data).toEqual({ notification_id: "{{ item.id }}" });
    expect(isDefaultTabTemplate(n)).toBe(true);
  });
});

describe("taskmate / z2m_tracker sources", () => {
  it("taskmate makes a tab per child from TaskMate's sensors", () => {
    const t = buildSourceTemplate({ source: "taskmate", exclude: ["abc123", "bad id!"] });
    expect(t).toContain("integration_entities('taskmate')");
    expect(t).toContain("attributes.total_points_earned");
    expect(t).toContain("attributes.left");
    expect(t).toContain("['abc123']");
    expect(t).toContain("custom:taskmate-child-card");
    expect(t).toContain("sort(attribute='name')");
    const tpl = defaultTabTemplate({ source: "taskmate" });
    expect(tpl).toEqual({ name: "{{ item.name }}", icon: "{{ item.icon }}", badge: "{{ item.left }}", card: "{{ item.card }}" });
    expect(isDefaultTabTemplate(tpl)).toBe(true);
  });

  it("z2m_tracker makes a tab per kind of issue from the tracker's issues sensor", () => {
    const t = buildSourceTemplate({ source: "z2m_tracker", exclude: ["chatty_device"] });
    expect(t).toContain("integration_entities('z2m_tracker')");
    expect(t).toContain("attributes.warnings");
    expect(t).toContain("'low battery': 'mdi:battery-alert-variant-outline'");
    expect(t).toContain("['chatty_device']");
    expect(defaultTabTemplate({ source: "z2m_tracker" }).card).toEqual({ type: "markdown", content: "{{ item.text }}" });
    const c = normalizeConfig({ auto_tabs: { source: "z2m_tracker" } });
    expect(c.auto_tabs!.template).toContain("warnings");
  });
});
