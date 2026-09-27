import { describe, it, expect } from "vitest";
import { buildSourceTemplate, SOURCE_TAB_TEMPLATE } from "./sources";
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
