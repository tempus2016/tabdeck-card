import { describe, it, expect } from "vitest";
import { normalizeConfig } from "./config";

describe("tab_defaults", () => {
  const raw = {
    tab_defaults: { accent: "red", badge_format: { precision: 1 }, styles: { "--a": "1", "--b": "1" } },
    tabs: [
      { name: "A", card: { type: "x" } },
      { name: "B", accent: "blue", styles: { "--b": "2" }, card: { type: "y" } },
    ],
  };

  it("applies to every tab; a tab's own keys win and styles merge", () => {
    const c = normalizeConfig(raw);
    expect(c.tabs[0].accent).toBe("red");
    expect(c.tabs[0].badge_format).toEqual({ precision: 1 });
    expect(c.tabs[1].accent).toBe("blue");
    expect(c.tabs[1].styles).toEqual({ "--a": "1", "--b": "2" });
  });

  it("never sets a default name or card", () => {
    const c = normalizeConfig({ tab_defaults: { name: "X", card: { type: "z" } }, tabs: [{ card: { type: "x" } }] });
    expect(c.tabs[0].name).toBeUndefined();
    expect(c.tabs[0].card).toEqual({ type: "x" });
  });

  it("the editor keeps the short form", () => {
    const c = normalizeConfig(raw, { expand: false });
    expect(c.tab_defaults).toEqual(raw.tab_defaults);
    expect(c.tabs[0].accent).toBeUndefined();
  });
});

describe("tab_templates", () => {
  const raw = {
    tab_templates: {
      room: {
        icon: "mdi:sofa",
        badge: { count: "light.{{ item.area }}_*", state: "on" },
        card: { type: "area", area: "{{ item.area }}", show_camera: "{{ item.camera }}" },
      },
    },
    tabs: [
      { name: "Kitchen", use: "room", vars: { area: "kitchen", camera: true } },
      { name: "Lounge", use: "room", icon: "mdi:television", vars: { area: "lounge" } },
      { name: "Plain", card: { type: "x" } },
    ],
  };

  it("fills a blueprint from vars; the tab's own keys win", () => {
    const c = normalizeConfig(raw);
    expect(c.tabs[0].icon).toBe("mdi:sofa");
    expect(c.tabs[0].card).toEqual({ type: "area", area: "kitchen", show_camera: true });
    expect(c.tabs[0].badge).toEqual({ count: "light.kitchen_*", state: "on" });
    expect(c.tabs[1].icon).toBe("mdi:television");
    expect(c.tabs[1].card).toEqual({ type: "area", area: "lounge", show_camera: "" });
    expect(c.tabs[2].card).toEqual({ type: "x" });
  });

  it("tab_defaults apply under the template", () => {
    const c = normalizeConfig({ ...raw, tab_defaults: { icon: "mdi:help", accent: "green" } });
    expect(c.tabs[0].icon).toBe("mdi:sofa");
    expect(c.tabs[0].accent).toBe("green");
  });

  it("an unknown template leaves the tab as written", () => {
    const c = normalizeConfig({ tabs: [{ name: "A", use: "nope", card: { type: "x" } }] });
    expect(c.tabs[0].card).toEqual({ type: "x" });
  });

  it("the editor keeps use / vars and the templates", () => {
    const c = normalizeConfig(raw, { expand: false });
    expect(c.tab_templates).toEqual(raw.tab_templates);
    expect(c.tabs[0].use).toBe("room");
    expect(c.tabs[0].vars).toEqual({ area: "kitchen", camera: true });
    expect(c.tabs[0].icon).toBeUndefined();
  });
});
