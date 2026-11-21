/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import { STYLE_PRESET_KEYS, applyStylePreset, readStylePreset } from "./style-preset";
import fileSchema from "../../presets/preset.schema.json";

const community = import.meta.glob("../../presets/community/*.json", { eager: true, import: "default" }) as Record<string, any>;

describe("style presets", () => {
  it("reads a preset file or a bare object of style options", () => {
    const file = { name: "Neon", author: "someone", config: { style: "pill", glass: 10, styles: { "--tabdeck-accent": "#ff00e0" } } };
    expect(readStylePreset(file)).toEqual({ name: "Neon", config: file.config, errors: [] });
    expect(readStylePreset({ align: "justify", indicator_size: 4 })).toEqual({
      name: undefined,
      config: { align: "justify", indicator_size: 4 },
      errors: [],
    });
  });

  it("refuses anything that isn't a style option or has a bad value", () => {
    const r = readStylePreset({
      config: {
        tabs: [],
        swipe: true,
        style: "sparkly",
        indicator_size: 400,
        bar_background: "url(https://example.com/track.png)",
        styles: { "--tabdeck-accent": "teal", color: "red", "--tabdeck-x": "a;b" },
      },
    });
    expect(r.errors).toEqual([
      { key: "style_import.error.unknown", vars: { key: "tabs" } },
      { key: "style_import.error.unknown", vars: { key: "swipe" } },
      { key: "style_import.error.bad_value", vars: { key: "style" } },
      { key: "style_import.error.bad_value", vars: { key: "indicator_size" } },
      { key: "style_import.error.bad_value", vars: { key: "bar_background" } },
      { key: "style_import.error.bad_value", vars: { key: "styles.color" } },
      { key: "style_import.error.bad_value", vars: { key: "styles.--tabdeck-x" } },
    ]);
    expect(readStylePreset("hello").errors).toEqual([{ key: "style_import.error.not_object" }]);
    expect(readStylePreset({ config: {} }).errors).toEqual([{ key: "style_import.error.empty" }]);
  });

  it("merges style options into a config and keeps tabs and behaviour", () => {
    const cfg = { swipe: true, style: "underline", styles: { "--tabdeck-tab-height": "40px", "--tabdeck-accent": "red" }, tabs: [{ name: "A" }] };
    expect(applyStylePreset(cfg, { style: "pill", styles: { "--tabdeck-accent": "teal" } })).toEqual({
      swipe: true,
      style: "pill",
      styles: { "--tabdeck-tab-height": "40px", "--tabdeck-accent": "teal" },
      tabs: [{ name: "A" }],
    });
  });

  it("every community preset is valid and the file schema lists the same options", () => {
    const files = Object.entries(community).map(([p, raw]) => [p.split("/").pop()!, raw] as const);
    expect(files.length).toBeGreaterThanOrEqual(4);
    for (const [f, raw] of files) {
      expect(raw.name, f).toBeTypeOf("string");
      expect(raw.author, f).toBeTypeOf("string");
      expect(f.replace(/\.json$/, ""), f).toMatch(/^[a-z0-9-]+$/);
      expect(readStylePreset(raw).errors, f).toEqual([]);
    }
    expect(Object.keys((fileSchema as any).properties.config.properties).sort()).toEqual(Object.keys(STYLE_PRESET_KEYS).sort());
  });
});
