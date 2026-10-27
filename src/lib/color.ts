// Colour helpers: Home Assistant theme colour names (as its ui_color picker
// writes them) and readable-text / contrast maths.

// The names HA's colour picker offers (frontend compute-color.ts).
const THEME_COLORS = new Set([
  "primary", "accent", "red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal",
  "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "light-grey", "grey",
  "dark-grey", "blue-grey", "black", "white",
]);
// Also theme colours in HA, but YAML-only (not in the picker).
const YAML_ONLY = new Set(["primary-text", "secondary-text", "disabled"]);
// Theme names that are also CSS colour keywords: used as the fallback.
const CSS_KEYWORDS = new Set(["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange", "brown", "grey", "black", "white"]);

export function isThemeColor(value: unknown): value is string {
  return typeof value === "string" && THEME_COLORS.has(value);
}

// "red" → var(--red-color, red), as HA's own cards resolve theme colours;
// anything else is CSS and passes through.
export function cssColor(value: string | undefined): string | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const v = value.trim();
  if (!THEME_COLORS.has(v) && !YAML_ONLY.has(v)) return v;
  return CSS_KEYWORDS.has(v) ? `var(--${v}-color, ${v})` : `var(--${v}-color)`;
}

// [r, g, b] from a computed "rgb(…)" / "rgba(…)" string.
export function parseRgb(value: string): [number, number, number] | undefined {
  const m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(value?.trim() ?? "");
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : undefined;
}

function luminance([r, g, b]: number[]): number {
  const ch = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

// WCAG contrast ratio, 1 (none) to 21 (black on white).
export function contrastRatio(a: number[], b: number[]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Black or white, whichever reads better on this background.
export function readableText(background: string): "#000" | "#fff" | undefined {
  const rgb = parseRgb(background);
  if (!rgb) return undefined;
  return contrastRatio(rgb, [0, 0, 0]) >= contrastRatio(rgb, [255, 255, 255]) ? "#000" : "#fff";
}
