import { describe, it, expect, vi } from "vitest";
import { parseViewRef, findView, viewToCard, loadDashboard, clearDashboardCache } from "./view-source";

describe("view: tabs", () => {
  it("reads /dashboard/view, dashboard/view, a bare dashboard and an object", () => {
    expect(parseViewRef("/energy-dash/energy")).toEqual({ dashboard: "energy-dash", view: "energy" });
    expect(parseViewRef("energy-dash/2")).toEqual({ dashboard: "energy-dash", view: "2" });
    expect(parseViewRef("/energy-dash")).toEqual({ dashboard: "energy-dash", view: "" });
    expect(parseViewRef({ dashboard: "lovelace", view: "home" })).toEqual({ dashboard: "lovelace", view: "home" });
    expect(parseViewRef("")).toBeUndefined();
    expect(parseViewRef(42)).toBeUndefined();
  });

  it("finds a view by path, then index, then title; empty is the first", () => {
    const cfg = { views: [{ title: "Home", cards: [] }, { title: "Energy use", path: "energy", cards: [] }] };
    expect(findView(cfg, "energy")).toBe(cfg.views[1]);
    expect(findView(cfg, "0")).toBe(cfg.views[0]);
    expect(findView(cfg, "energy use")).toBe(cfg.views[1]);
    expect(findView(cfg, "")).toBe(cfg.views[0]);
    expect(findView(cfg, "nope")).toBeUndefined();
    expect(findView({}, "")).toBeUndefined();
  });

  it("turns a view into one card: sections, masonry cards, or a panel's card", () => {
    expect(viewToCard({ type: "sections", max_columns: 3, sections: [{ type: "grid", cards: [{ type: "tile" }] }, { cards: [] }] })).toEqual({
      card: { type: "custom:tabdeck-sections-card", max_columns: 3, sections: [{ type: "grid", cards: [{ type: "tile" }] }] },
    });
    expect(viewToCard({ cards: [{ type: "tile" }, { type: "light" }] })).toEqual({
      card: { type: "custom:tabdeck-masonry-card", min_column_width: 320, cards: [{ type: "tile" }, { type: "light" }] },
    });
    expect(viewToCard({ type: "panel", cards: [{ type: "map" }, { type: "tile" }] })).toEqual({ card: { type: "map" } });
    expect(viewToCard({ strategy: { type: "energy" } })).toEqual({ error: "generated" });
    expect(viewToCard({ title: "x" })).toEqual({ error: "empty" });
  });

  it("loads each dashboard once per page load and remembers failures", async () => {
    clearDashboardCache();
    const callWS = vi.fn(async (msg: any) => {
      if (msg.url_path === "gone") throw { code: "config_not_found" };
      return { views: [{ cards: [] }], url: msg.url_path };
    });
    const hass: any = { callWS };
    const a = await loadDashboard(hass, "energy");
    const b = await loadDashboard(hass, "energy");
    expect(a).toBe(b);
    expect(callWS).toHaveBeenCalledTimes(1);
    expect(callWS).toHaveBeenCalledWith({ type: "lovelace/config", url_path: "energy" });
    await loadDashboard(hass, "lovelace");
    expect(callWS).toHaveBeenLastCalledWith({ type: "lovelace/config", url_path: null });
    await expect(loadDashboard(hass, "gone")).rejects.toEqual({ code: "config_not_found" });
    await expect(loadDashboard(hass, "gone")).rejects.toEqual({ code: "config_not_found" });
    expect(callWS).toHaveBeenCalledTimes(3);
  });
});
