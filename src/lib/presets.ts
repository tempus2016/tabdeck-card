// Style presets: named bundles of the existing visual options. In YAML a
// `preset` supplies defaults under any explicitly-set key; in the editor,
// choosing one writes its values into the config (see applyPresetToConfig).

export const PRESET_NAMES = [
  "default",
  "ios",
  "material",
  "glass",
  "minimal",
  "rail",
  "neumorphic",
  "ha-tile",
  "mushroom",
  "bubble",
  "fluent",
  "material-you",
] as const;
export type PresetName = (typeof PRESET_NAMES)[number];

// Every preset sets this full set of visual keys, so switching presets never
// leaves a previous preset's value behind.
const BASE: Record<string, any> = {
  position: "top",
  style: "underline",
  align: "start",
  tab_display: "both",
  badge_display: "text",
  indicator_size: 3,
  indicator_radius: undefined,
  elevation: false,
  sticky: false,
  bar_background: undefined,
  styles: {},
};

const PRESETS: Record<PresetName, Record<string, any>> = {
  default: {},
  ios: {
    style: "segmented",
    align: "justify",
    indicator_radius: 8,
    // A grey track so the card-coloured selected segment stands out.
    bar_background: "var(--secondary-background-color, #efefef)",
    styles: { "--tabdeck-tab-height": "36px" },
  },
  material: {
    style: "underline",
    align: "justify",
    elevation: true,
  },
  glass: {
    style: "pill",
    sticky: true,
    bar_background: "color-mix(in srgb, var(--card-background-color, #fff) 60%, transparent)",
    styles: { "--tabdeck-bar-backdrop": "blur(12px)" },
  },
  minimal: {
    style: "text",
    tab_display: "label",
    badge_display: "dot",
  },
  rail: {
    position: "left",
    style: "rail",
    tab_display: "icon",
  },
  // Soft extruded surface: an inset track and a raised selected tab.
  neumorphic: {
    style: "pill",
    align: "justify",
    indicator_radius: 14,
    bar_background: "var(--card-background-color, #e0e5ec)",
    styles: {
      "--tabdeck-bar-shadow": "inset 3px 3px 7px rgba(0, 0, 0, 0.18), inset -3px -3px 7px rgba(255, 255, 255, 0.06)",
      "--tabdeck-indicator-color": "var(--card-background-color, #e0e5ec)",
      "--tabdeck-selected-color": "var(--tabdeck-accent, var(--primary-color))",
      "--tabdeck-indicator-shadow": "3px 3px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px rgba(255, 255, 255, 0.06)",
      "--tabdeck-tab-height": "44px",
    },
  },
  // Like HA's tile card: rounded chips, tinted when selected.
  "ha-tile": {
    style: "boxed",
    indicator_radius: 12,
    styles: { "--tabdeck-tab-height": "52px", "--tabdeck-tab-font-weight": "500" },
  },
  // Mushroom-style chips: compact rounded pills with a soft tint.
  mushroom: {
    style: "pill",
    indicator_radius: 12,
    styles: { "--tabdeck-tab-height": "40px", "--tabdeck-tab-font-weight": "500", "--tabdeck-tab-radius": "12px" },
  },
  // Bubble Card: a solid accent bubble on a soft track; text auto-contrasts.
  bubble: {
    style: "pill",
    indicator_radius: 999,
    bar_background: "var(--secondary-background-color, rgba(127, 127, 127, 0.12))",
    styles: {
      "--tabdeck-indicator-color": "var(--tabdeck-accent, var(--primary-color))",
      "--tabdeck-selected-badge-background": "var(--card-background-color, #fff)",
      "--tabdeck-selected-badge-color": "var(--tabdeck-accent, var(--primary-color))",
      "--tabdeck-tab-height": "46px",
      "--tabdeck-tab-font-weight": "500",
    },
  },
  // Windows Fluent: a short rounded underline, start-aligned.
  fluent: {
    style: "underline",
    indicator_size: 3,
    indicator_radius: 2,
    styles: { "--tabdeck-tab-height": "40px", "--tabdeck-tab-font-weight": "600" },
  },
  // Material You: a tonal pill in the theme's accent.
  "material-you": {
    style: "pill",
    align: "justify",
    indicator_radius: 20,
    styles: {
      "--tabdeck-indicator-color": "color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 26%, transparent)",
      "--tabdeck-selected-color": "var(--primary-text-color)",
      "--tabdeck-tab-height": "40px",
      "--tabdeck-tab-font-weight": "500",
    },
  },
};

export function isPreset(name: any): name is PresetName {
  return (PRESET_NAMES as readonly string[]).includes(name);
}

export function presetValues(name: PresetName): Record<string, any> {
  const p = PRESETS[name];
  return { ...BASE, ...p, styles: { ...(p.styles ?? {}) } };
}

// Style keys any preset may set (removed when switching presets).
const PRESET_STYLE_KEYS = new Set(
  Object.values(PRESETS).flatMap((p) => Object.keys(p.styles ?? {})),
);

// Merge a preset under a raw (YAML) config: explicit keys win; styles merge.
export function withPreset(raw: any): any {
  if (!raw || !isPreset(raw.preset)) return raw;
  const values = presetValues(raw.preset);
  const out: any = { ...values };
  for (const [k, v] of Object.entries(raw)) if (v !== undefined) out[k] = v;
  out.styles = { ...values.styles, ...(raw.styles ?? {}) };
  return out;
}

// Editor: write a preset's values into a (normalized) config.
export function applyPresetToConfig<T extends Record<string, any>>(cfg: T, name: PresetName): T {
  const values = presetValues(name);
  const own = Object.fromEntries(
    Object.entries(cfg.styles ?? {}).filter(([k]) => !PRESET_STYLE_KEYS.has(k)),
  );
  return { ...cfg, ...values, styles: { ...own, ...values.styles }, preset: name };
}
