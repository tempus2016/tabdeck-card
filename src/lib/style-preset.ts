// Style presets from the gallery (presets/community/*.json) or pasted by
// hand: only options that change how the deck looks are accepted, each value
// is checked, and importing merges them into the config (tabs and behaviour
// stay as they are). Values can't load anything: url(...) is refused.
import { isPreset } from "./presets";

type Rule =
  | { enum: readonly string[] }
  | { num: [number, number] }
  | { bool: true }
  | { css: true }
  | { glass: true }
  | { styles: true }
  | { preset: true };

const e = (...v: string[]) => ({ enum: v });
export const STYLE_PRESET_KEYS: Record<string, Rule> = {
  preset: { preset: true },
  position: e("top", "bottom", "left", "right"),
  style: e("underline", "pill", "segmented", "boxed", "text", "rail"),
  tab_display: e("both", "icon", "label", "active", "dots"),
  align: e("start", "center", "end", "justify"),
  badge_display: e("text", "dot"),
  density: e("compact", "default", "comfortable"),
  transition: e("none", "fade", "slide", "scale", "flip", "rise"),
  transition_duration: { num: [0, 2000] },
  transition_easing: { css: true },
  indicator_size: { num: [1, 16] },
  indicator_radius: { num: [0, 100] },
  animated: { bool: true },
  liquid_indicator: { bool: true },
  accent_indicator: { bool: true },
  elevation: { bool: true },
  bar_background: { css: true },
  glass: { glass: true },
  styles: { styles: true },
};

export interface PresetError {
  key: string;
  vars?: Record<string, string>;
}

// A CSS value that can't break out of its declaration or fetch anything.
function safeCss(v: any): boolean {
  if (typeof v === "number") return Number.isFinite(v);
  return typeof v === "string" && v.length <= 300 && !/[;{}<>\\]|url\s*\(|@import|expression\s*\(/i.test(v);
}

function valid(rule: Rule, v: any): boolean {
  if ("enum" in rule) return rule.enum.includes(v);
  if ("num" in rule) return typeof v === "number" && v >= rule.num[0] && v <= rule.num[1];
  if ("bool" in rule) return typeof v === "boolean";
  if ("css" in rule) return safeCss(v);
  if ("glass" in rule) return typeof v === "boolean" || (typeof v === "number" && v >= 1 && v <= 60);
  if ("preset" in rule) return isPreset(v);
  return true;
}

const isObj = (v: any) => !!v && typeof v === "object" && !Array.isArray(v);

// A preset file ({ name, author, config }) or a bare object of options →
// the style config to merge, or errors (nothing is imported then).
export function readStylePreset(raw: any): { name?: string; config: Record<string, any>; errors: PresetError[] } {
  if (!isObj(raw)) return { config: {}, errors: [{ key: "style_import.error.not_object" }] };
  const name = typeof raw.name === "string" ? raw.name : undefined;
  const src = isObj(raw.config) ? raw.config : raw;
  const config: Record<string, any> = {};
  const errors: PresetError[] = [];
  const bad = (key: string) => errors.push({ key: "style_import.error.bad_value", vars: { key } });
  for (const [k, v] of Object.entries(src)) {
    if (src === raw && ["name", "author", "description", "$schema"].includes(k)) continue;
    const rule = STYLE_PRESET_KEYS[k];
    if (!rule) {
      errors.push({ key: "style_import.error.unknown", vars: { key: k } });
      continue;
    }
    if ("styles" in rule) {
      if (!isObj(v)) {
        bad(k);
        continue;
      }
      const styles: Record<string, any> = {};
      for (const [sk, sv] of Object.entries(v as Record<string, any>)) {
        if (/^--tabdeck-[a-z0-9-]+$/.test(sk) && safeCss(sv)) styles[sk] = sv;
        else bad(`styles.${sk}`);
      }
      config.styles = styles;
    } else if (valid(rule, v)) config[k] = v;
    else bad(k);
  }
  if (!errors.length && !Object.keys(config).length) errors.push({ key: "style_import.error.empty" });
  return { name, config, errors };
}

// Merge style options into a config: top-level keys replaced, styles merged.
export function applyStylePreset<T extends Record<string, any>>(cfg: T, style: Record<string, any>): T {
  const out: any = { ...cfg, ...style };
  if (style.styles) out.styles = { ...(cfg.styles ?? {}), ...style.styles };
  return out;
}
