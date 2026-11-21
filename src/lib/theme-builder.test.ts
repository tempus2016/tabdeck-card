import { describe, it, expect } from "vitest";
import { themeOptions } from "./theme-builder";
import { normalizeConfig } from "./config";

describe("themeOptions", () => {
  it("writes nothing for the defaults", () => {
    expect(themeOptions({})).toEqual({});
  });

  it("writes only what changed, colours as styles", () => {
    expect(
      themeOptions({
        preset: "ios",
        density: "compact",
        indicator_size: 4,
        indicator_radius: 0,
        elevation: true,
        accent: "#e91e63",
        bar_background: "transparent",
        font_family: "Georgia, serif",
        badge_color: "#ff9800",
      }),
    ).toEqual({
      preset: "ios",
      density: "compact",
      indicator_size: 4,
      indicator_radius: 0,
      elevation: true,
      bar_background: "transparent",
      styles: {
        "--tabdeck-accent": "#e91e63",
        "--tabdeck-tab-font-family": "Georgia, serif",
        "--tabdeck-badge-background": "#ff9800",
      },
    });
  });

  it("produces options the card accepts", () => {
    const opts = themeOptions({ style: "pill", position: "bottom", tab_display: "icon", align: "justify" });
    const cfg = normalizeConfig({ ...opts, tabs: [{ name: "A", card: {} }] });
    expect([cfg.style, cfg.position, cfg.tab_display, cfg.align]).toEqual(["pill", "bottom", "icon", "justify"]);
  });
});
