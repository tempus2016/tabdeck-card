import { describe, it, expect } from "vitest";
import { normalizeConfig, resolveDefaultIndex } from "./config";

describe("normalizeConfig", () => {
  it("applies defaults", () => {
    const c = normalizeConfig({ tabs: [{ card: { type: "light" } }] });
    expect(c.position).toBe("top");
    expect(c.style).toBe("underline");
    expect(c.scrollable).toBe("auto");
    expect(c.remember).toBe("none");
    expect(c.lazy).toBe(false);
    expect(c.swipe).toBe(false);
    expect(c.default_tab).toBe(0);
    expect(c.tab_display).toBe("both");
    expect(c.tabs).toHaveLength(1);
  });

  it("defaults indicator_size to 3 and clamps to [1,16]", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).indicator_size).toBe(3);
    expect(normalizeConfig({ indicator_size: 6, tabs: [{ card: {} }] }).indicator_size).toBe(6);
    expect(normalizeConfig({ indicator_size: 99, tabs: [{ card: {} }] }).indicator_size).toBe(16);
    expect(normalizeConfig({ indicator_size: 0, tabs: [{ card: {} }] }).indicator_size).toBe(1);
    expect(normalizeConfig({ indicator_size: "x", tabs: [{ card: {} }] }).indicator_size).toBe(3);
  });

  it("defaults hide_inactive_badge to false", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).hide_inactive_badge).toBe(false);
    expect(normalizeConfig({ hide_inactive_badge: true, tabs: [{ card: {} }] }).hide_inactive_badge).toBe(true);
  });

  it("defaults transition to none and picks fade/slide", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).transition).toBe("none");
    expect(normalizeConfig({ transition: "fade", tabs: [{ card: {} }] }).transition).toBe("fade");
    expect(normalizeConfig({ transition: "slide", tabs: [{ card: {} }] }).transition).toBe("slide");
    expect(normalizeConfig({ transition: "zoom", tabs: [{ card: {} }] }).transition).toBe("none");
  });

  it("defaults badge_display to text and picks dot", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).badge_display).toBe("text");
    expect(normalizeConfig({ badge_display: "dot", tabs: [{ card: {} }] }).badge_display).toBe("dot");
    expect(normalizeConfig({ badge_display: "x", tabs: [{ card: {} }] }).badge_display).toBe("text");
  });

  it("defaults align to start and picks valid values", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).align).toBe("start");
    expect(normalizeConfig({ align: "center", tabs: [{ card: {} }] }).align).toBe("center");
    expect(normalizeConfig({ align: "justify", tabs: [{ card: {} }] }).align).toBe("justify");
    expect(normalizeConfig({ align: "nope", tabs: [{ card: {} }] }).align).toBe("start");
  });

  it("accepts the boxed and text styles", () => {
    expect(normalizeConfig({ style: "boxed", tabs: [{ card: {} }] }).style).toBe("boxed");
    expect(normalizeConfig({ style: "text", tabs: [{ card: {} }] }).style).toBe("text");
    expect(normalizeConfig({ style: "nope", tabs: [{ card: {} }] }).style).toBe("underline");
  });

  it("defaults elevation off and keeps bar_background", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).elevation).toBe(false);
    expect(normalizeConfig({ elevation: true, tabs: [{ card: {} }] }).elevation).toBe(true);
    expect(normalizeConfig({ bar_background: "#222", tabs: [{ card: {} }] }).bar_background).toBe("#222");
  });

  it("defaults accent_indicator to true and respects explicit false", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).accent_indicator).toBe(true);
    expect(normalizeConfig({ accent_indicator: false, tabs: [{ card: {} }] }).accent_indicator).toBe(false);
  });

  it("picks a valid tab_display and falls back to both", () => {
    expect(normalizeConfig({ tab_display: "icon", tabs: [{ card: {} }] }).tab_display).toBe("icon");
    expect(normalizeConfig({ tab_display: "label", tabs: [{ card: {} }] }).tab_display).toBe("label");
    expect(normalizeConfig({ tab_display: "bogus", tabs: [{ card: {} }] }).tab_display).toBe("both");
  });

  it("accepts remember:entity with remember_entity and storage_key", () => {
    const c = normalizeConfig({ remember: "entity", remember_entity: "input_number.t", storage_key: "deck1", tabs: [{ card: {} }] });
    expect(c.remember).toBe("entity");
    expect(c.remember_entity).toBe("input_number.t");
    expect(c.storage_key).toBe("deck1");
  });

  it("defaults unmount_hidden and swipe_wrap to false", () => {
    const d = normalizeConfig({ tabs: [{ card: {} }] });
    expect(d.unmount_hidden).toBe(false);
    expect(d.swipe_wrap).toBe(false);
    expect(normalizeConfig({ unmount_hidden: true, swipe_wrap: true, tabs: [{ card: {} }] }).unmount_hidden).toBe(true);
  });

  it("defaults animated to true and respects explicit false", () => {
    expect(normalizeConfig({ tabs: [{ card: {} }] }).animated).toBe(true);
    expect(normalizeConfig({ animated: false, tabs: [{ card: {} }] }).animated).toBe(false);
    expect(normalizeConfig({ animated: true, tabs: [{ card: {} }] }).animated).toBe(true);
  });

  it("throws when there are no tabs", () => {
    expect(() => normalizeConfig({ tabs: [] })).toThrow(/at least one tab/i);
    expect(() => normalizeConfig({})).toThrow(/at least one tab/i);
  });

  it("maps original options.defaultTabIndex to default_tab", () => {
    const c = normalizeConfig({
      options: { defaultTabIndex: 2 },
      tabs: [{ card: {} }, { card: {} }, { card: {} }],
    });
    expect(c.default_tab).toBe(2);
  });

  it("collapses a per-tab `cards` array into a vertical-stack card", () => {
    const c = normalizeConfig({
      tabs: [{ name: "A", cards: [{ type: "markdown", content: "x" }, { type: "light" }] }],
    });
    expect(c.tabs[0].card.type).toBe("vertical-stack");
    expect(c.tabs[0].card.cards).toHaveLength(2);
    expect(c.tabs[0].card.cards[1].type).toBe("light");
  });

  it("uses a grid card when cards + columns>1 are given", () => {
    const c = normalizeConfig({
      tabs: [{ name: "A", columns: 2, cards: [{ type: "a" }, { type: "b" }, { type: "c" }] }],
    });
    expect(c.tabs[0].card.type).toBe("grid");
    expect(c.tabs[0].card.columns).toBe(2);
    expect(c.tabs[0].card.cards).toHaveLength(3);
  });

  it("falls back to vertical-stack for cards without columns", () => {
    const c = normalizeConfig({ tabs: [{ name: "A", cards: [{ type: "a" }] }] });
    expect(c.tabs[0].card.type).toBe("vertical-stack");
  });

  it("prefers `cards` over a single `card` when both are given", () => {
    const c = normalizeConfig({
      tabs: [{ name: "A", card: { type: "light" }, cards: [{ type: "markdown" }] }],
    });
    expect(c.tabs[0].card.type).toBe("vertical-stack");
  });

  it("keeps a single `card` when no `cards` array is present", () => {
    const c = normalizeConfig({ tabs: [{ name: "A", card: { type: "light" } }] });
    expect(c.tabs[0].card.type).toBe("light");
  });

  it("normalizes per-tab disabled to true/undefined", () => {
    expect(normalizeConfig({ tabs: [{ disabled: true, card: {} }] }).tabs[0].disabled).toBe(true);
    expect(normalizeConfig({ tabs: [{ card: {} }] }).tabs[0].disabled).toBeUndefined();
  });

  it("keeps a per-tab default_if", () => {
    const c = normalizeConfig({ tabs: [{ default_if: [{ condition: "state", entity: "x.y", state: "on" }], card: {} }] });
    expect(c.tabs[0].default_if).toHaveLength(1);
  });

  it("keeps a per-tab hold_action", () => {
    const c = normalizeConfig({ tabs: [{ hold_action: { action: "more-info", entity: "sun.sun" }, card: {} }] });
    expect(c.tabs[0].hold_action).toEqual({ action: "more-info", entity: "sun.sun" });
  });

  it("normalizes auto_select from a string or object", () => {
    const a = normalizeConfig({ tabs: [{ auto_select: "binary_sensor.door", card: {} }] });
    expect(a.tabs[0].auto_select).toEqual({ entity: "binary_sensor.door" });
    const b = normalizeConfig({ tabs: [{ auto_select: { entity: "sensor.x", state: "alarm" }, card: {} }] });
    expect(b.tabs[0].auto_select).toEqual({ entity: "sensor.x", state: "alarm" });
    const c = normalizeConfig({ tabs: [{ auto_select: { nope: 1 }, card: {} }] });
    expect(c.tabs[0].auto_select).toBeUndefined();
  });

  it("keeps a per-tab subtitle", () => {
    const c = normalizeConfig({ tabs: [{ name: "A", subtitle: "3 zones", card: {} }] });
    expect(c.tabs[0].subtitle).toBe("3 zones");
  });

  it("keeps a per-tab color override", () => {
    const c = normalizeConfig({ tabs: [{ name: "A", color: "#c00", card: {} }] });
    expect(c.tabs[0].color).toBe("#c00");
  });

  it("maps original per-tab attributes.label/icon to name/icon", () => {
    const c = normalizeConfig({
      tabs: [{ attributes: { label: "Lights", icon: "mdi:lightbulb" }, card: {} }],
    });
    expect(c.tabs[0].name).toBe("Lights");
    expect(c.tabs[0].icon).toBe("mdi:lightbulb");
  });

  it("keeps new keys when both present (new wins)", () => {
    const c = normalizeConfig({
      tabs: [{ name: "New", attributes: { label: "Old" }, card: {} }],
    });
    expect(c.tabs[0].name).toBe("New");
  });
});

describe("resolveDefaultIndex", () => {
  const base = normalizeConfig({
    tabs: [{ name: "A", card: {} }, { name: "B", card: {} }],
  });

  it("returns a numeric default unchanged", () => {
    expect(resolveDefaultIndex({ ...base, default_tab: 1 })).toBe(1);
  });

  it("resolves a name to its index", () => {
    expect(resolveDefaultIndex({ ...base, default_tab: "B" })).toBe(1);
  });

  it("clamps out-of-range and unknown names to 0", () => {
    expect(resolveDefaultIndex({ ...base, default_tab: 9 })).toBe(0);
    expect(resolveDefaultIndex({ ...base, default_tab: "ZZ" })).toBe(0);
  });
});
