// Size controls: a tab's zoom, padding and the gap between its cards, for
// crowded wall tablets (more fits at zoom 0.8) or far-away screens.
import { cssLength } from "./layout";

export function normalizeZoom(raw: any): number | undefined {
  const n = Number(raw);
  if (raw === undefined || raw === null || raw === "" || !Number.isFinite(n) || n <= 0 || n === 1) return undefined;
  return Math.min(3, Math.max(0.25, n));
}

// A CSS length where 0 counts (no padding / no gap).
export function lengthOrZero(raw: any): string | undefined {
  if (raw === 0 || raw === "0") return "0px";
  return cssLength(raw);
}

// The panel styles for a tab's zoom / padding / spacing. spacing sets the
// gaps of HA's stacks and grid and Tabdeck's masonry and sections.
export function sizeStyles(tab: { zoom?: number; padding?: string; spacing?: string }): Record<string, string> {
  const out: Record<string, string> = {};
  if (tab.zoom) out.zoom = String(tab.zoom);
  if (tab.padding) out.padding = tab.padding;
  if (tab.spacing) {
    for (const v of ["--vertical-stack-card-gap", "--horizontal-stack-card-gap", "--stack-card-gap", "--grid-card-gap", "--tabdeck-masonry-gap", "--tabdeck-section-gap"]) {
      out[v] = tab.spacing;
    }
  }
  return out;
}
