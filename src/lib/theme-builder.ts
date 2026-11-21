// The demo site's theme builder: form values → the Tabdeck look options to
// paste into a card. Only what differs from the defaults is written, and
// colours go in as `styles` variables.

export interface ThemeForm {
  preset: string;
  style: string;
  position: string;
  tab_display: string;
  align: string;
  density: string;
  indicator_size: number;
  // Empty = the preset's / style's own.
  indicator_radius: number | "";
  elevation: boolean;
  // Colours: empty = the theme's.
  accent: string;
  bar_background: string;
  indicator_color: string;
  font_family: string;
  // Badge colour, empty = accent.
  badge_color: string;
}

export const THEME_DEFAULTS: ThemeForm = {
  preset: "",
  style: "",
  position: "top",
  tab_display: "both",
  align: "start",
  density: "default",
  indicator_size: 3,
  indicator_radius: "",
  elevation: false,
  accent: "",
  bar_background: "",
  indicator_color: "",
  font_family: "",
  badge_color: "",
};

const STYLE_VARS: [keyof ThemeForm, string][] = [
  ["accent", "--tabdeck-accent"],
  ["indicator_color", "--tabdeck-indicator-color"],
  ["badge_color", "--tabdeck-badge-background"],
  ["font_family", "--tabdeck-tab-font-family"],
];

export function themeOptions(form: Partial<ThemeForm>): Record<string, any> {
  const f = { ...THEME_DEFAULTS, ...form };
  const out: Record<string, any> = {};
  if (f.preset) out.preset = f.preset;
  // With a preset, "" means "the preset's"; without one, the card default.
  if (f.style) out.style = f.style;
  for (const key of ["position", "tab_display", "align", "density"] as const) {
    if (f[key] && f[key] !== THEME_DEFAULTS[key]) out[key] = f[key];
  }
  if (Number(f.indicator_size) !== THEME_DEFAULTS.indicator_size) out.indicator_size = Number(f.indicator_size);
  if (f.indicator_radius !== "" && f.indicator_radius !== undefined) out.indicator_radius = Number(f.indicator_radius);
  if (f.elevation) out.elevation = true;
  if (f.bar_background) out.bar_background = f.bar_background;
  const styles: Record<string, string> = {};
  for (const [key, cssVar] of STYLE_VARS) if (f[key]) styles[cssVar] = String(f[key]);
  if (Object.keys(styles).length) out.styles = styles;
  return out;
}
