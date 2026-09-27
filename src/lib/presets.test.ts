import { describe, it, expect } from "vitest";
import { PRESET_NAMES, presetValues, applyPresetToConfig } from "./presets";
import { normalizeConfig } from "./config";

const tabs = [{ name: "A", card: { type: "markdown" } }];

describe("presets", () => {
  it("lists the presets", () => {
    expect(PRESET_NAMES).toEqual(["default", "ios", "material", "glass", "minimal", "rail"]);
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
