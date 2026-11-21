import { describe, it, expect } from "vitest";
import { PRESET_NAMES, presetValues, applyPresetToConfig } from "./presets";
import { normalizeConfig } from "./config";

const tabs = [{ name: "A", card: { type: "markdown" } }];

describe("presets", () => {
  it("lists the presets", () => {
    expect(PRESET_NAMES).toEqual([
      "default", "ios", "material", "glass", "minimal", "rail",
      "neumorphic", "ha-tile", "mushroom", "bubble", "fluent", "material-you",
      "material-expressive", "liquid-glass", "accessible",
    ]);
  });

  it("every preset sets the full visual key set", () => {
    const keys = Object.keys(presetValues("default")).sort();
    for (const name of PRESET_NAMES) expect(Object.keys(presetValues(name)).sort()).toEqual(keys);
  });

  it("applies preset values under explicit config (YAML)", () => {
    const c = normalizeConfig({ preset: "ios", tabs });
    expect(c.style).toBe("segmented");
    expect(c.align).toBe("justify");
    expect(c.preset).toBe("ios");
    expect(c.styles["--tabdeck-tab-height"]).toBe("36px");
    const o = normalizeConfig({ preset: "ios", style: "pill", styles: { "--x": "1" }, tabs });
    expect(o.style).toBe("pill");
    expect(o.styles).toEqual({ "--tabdeck-tab-height": "36px", "--x": "1" });
  });

  it("glass sets a translucent, blurred sticky bar", () => {
    const c = normalizeConfig({ preset: "glass", tabs });
    expect(c.sticky).toBe(true);
    expect(c.bar_background).toContain("color-mix");
    expect(c.styles["--tabdeck-bar-backdrop"]).toBe("blur(12px)");
  });

  it("liquid-glass: a glass capsule with a liquid indicator", () => {
    const c = normalizeConfig({ preset: "liquid-glass", tabs });
    expect(c.glass).toBe(20);
    expect(c.liquid_indicator).toBe(true);
    expect(c.style).toBe("pill");
    expect(c.styles["--tabdeck-bar-radius"]).toBe("999px");
    // Your own keys still win.
    expect(normalizeConfig({ preset: "liquid-glass", glass: false, liquid_indicator: false, tabs }).glass).toBeUndefined();
  });

  it("material-expressive: a tall, rounded tonal bar that springs", () => {
    const c = normalizeConfig({ preset: "material-expressive", tabs });
    expect(c.style).toBe("pill");
    expect(c.liquid_indicator).toBe(true);
    expect(c.styles["--tabdeck-tab-height"]).toBe("56px");
    expect(c.styles["--tabdeck-bar-radius"]).toBe("28px");
  });

  it("switching away from a glass preset clears glass and liquid", () => {
    const cfg = applyPresetToConfig(applyPresetToConfig(normalizeConfig({ tabs }), "liquid-glass"), "default");
    expect(cfg.glass).toBeUndefined();
    expect(cfg.liquid_indicator).toBe(false);
  });

  it("accessible: high contrast, big touch targets, strong focus ring", () => {
    const c = normalizeConfig({ preset: "accessible", tabs });
    expect(c.style).toBe("boxed");
    expect(c.align).toBe("justify");
    expect(c.tab_display).toBe("both");
    expect(c.styles["--tabdeck-tab-height"]).toBe("64px");
    expect(c.styles["--tabdeck-tab-color"]).toBe("var(--primary-text-color)");
    expect(c.styles["--tabdeck-indicator-color"]).toBe("#ffd400");
    expect(c.styles["--tabdeck-icon-size"]).toBe("28px");
    expect(c.styles["--tabdeck-focus-width"]).toBe("4px");
  });

  it("ignores unknown presets", () => {
    const c = normalizeConfig({ preset: "nope", tabs });
    expect(c.preset).toBeUndefined();
    expect(c.style).toBe("underline");
  });

  it("applyPresetToConfig overwrites visual keys and swaps preset styles", () => {
    const ios = applyPresetToConfig(normalizeConfig({ tabs, styles: { "--mine": "red" } }), "ios");
    const mat = applyPresetToConfig(ios, "material");
    expect(mat.style).toBe("underline");
    expect(mat.elevation).toBe(true);
    expect(mat.preset).toBe("material");
    // ios's tab height is removed, the user's own style is kept.
    expect(mat.styles).toEqual({ "--mine": "red" });
  });
});
