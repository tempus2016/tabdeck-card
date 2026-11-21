import { describe, it, expect } from "vitest";
import { shortcutCard, isShortcutCard } from "./shortcuts";
import { normalizeTab } from "./config";

describe("tab content shortcuts", () => {
  it("view: becomes a tabdeck-view-card", () => {
    expect(shortcutCard({ view: "/energy/use" })).toEqual({ type: "custom:tabdeck-view-card", view: "/energy/use" });
    expect(shortcutCard({ view: "" })).toBeUndefined();
    expect(shortcutCard({ name: "x" })).toBeUndefined();
  });

  it("url: becomes HA's iframe card, with an optional aspect_ratio", () => {
    expect(shortcutCard({ url: " http://192.168.1.50:8080 " })).toEqual({ type: "iframe", url: "http://192.168.1.50:8080" });
    expect(shortcutCard({ url: "https://x", aspect_ratio: "75%" })).toEqual({ type: "iframe", url: "https://x", aspect_ratio: "75%" });
    expect(shortcutCard({ url: "" })).toBeUndefined();
    const t = normalizeTab({ name: "Reports", url: "https://x", aspect_ratio: "16:9" });
    expect(t.url).toBe("https://x");
    expect(t.aspect_ratio).toBe("16:9");
    expect(t.card).toEqual({ type: "iframe", url: "https://x", aspect_ratio: "16:9" });
    expect(isShortcutCard(t)).toBe(true);
  });

  it("markdown: becomes HA's markdown card (templates and all)", () => {
    expect(shortcutCard({ markdown: "## Notes\n- Bins out {{ 'Tuesday' }}" })).toEqual({ type: "markdown", content: "## Notes\n- Bins out {{ 'Tuesday' }}" });
    expect(shortcutCard({ markdown: "  " })).toBeUndefined();
    const t = normalizeTab({ name: "Notes", markdown: "Hi" });
    expect(t.markdown).toBe("Hi");
    expect(isShortcutCard(t)).toBe(true);
  });

  it("normalizeTab keeps the shortcut key and expands it; an explicit card wins", () => {
    const t = normalizeTab({ name: "Energy", view: "/energy/use" });
    expect(t.view).toBe("/energy/use");
    expect(t.card).toEqual({ type: "custom:tabdeck-view-card", view: "/energy/use" });
    expect(isShortcutCard(t)).toBe(true);
    const own = normalizeTab({ name: "Energy", view: "/energy/use", card: { type: "markdown" } });
    expect(own.card).toEqual({ type: "markdown" });
    expect(isShortcutCard(own)).toBe(false);
  });
});
