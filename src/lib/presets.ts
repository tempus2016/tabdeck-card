// Style presets: named bundles of the existing visual options. In YAML a
// `preset` supplies defaults under any explicitly-set key; in the editor,
// choosing one writes its values into the config (see applyPresetToConfig).

export const PRESET_NAMES = ["default", "ios", "material", "glass", "minimal", "rail"] as const;
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
