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
    expect(c.tabs).toHaveLength(1);
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
