// Pure helpers for the content-area options: transitions, heights,
// backgrounds, masonry columns and swipe peek. Kept out of the card so they
// can be unit-tested without a DOM.

export type TransitionMode = "none" | "fade" | "slide" | "scale" | "flip" | "rise";

// Enter keyframes for the newly active panel. `dir` is the direction of
// travel (1 = to a later tab, -1 = back), so slide and flip come in from the
// matching side.
export function transitionFrames(mode: TransitionMode, dir: 1 | -1): Keyframe[] {
  switch (mode) {
    case "fade":
      return [{ opacity: 0 }, { opacity: 1 }];
    case "slide":
      return [
        { opacity: 0, transform: `translateX(${12 * dir}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ];
    case "scale":
      return [
        { opacity: 0, transform: "scale(0.96)" },
        { opacity: 1, transform: "scale(1)" },
      ];
    case "flip":
      return [
        { opacity: 0, transform: `perspective(1200px) rotateY(${20 * dir}deg)` },
        { opacity: 1, transform: "perspective(1200px) rotateY(0deg)" },
      ];
    case "rise":
      return [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ];
    default:
      return [];
  }
}

// A CSS length from config: numbers are px; strings pass through when they
// can't escape the declaration they're written into.
export function cssLength(value: unknown): string | undefined {
  if (typeof value === "number") return Number.isFinite(value) && value > 0 ? `${value}px` : undefined;
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  if (v === "" || /[;{}"<>]/.test(v)) return undefined;
  if (!/^[\d.]/.test(v) && !/^(calc|min|max|clamp|var)\(/.test(v)) return undefined;
  return v;
}

// A tab background: an image path / URL becomes a covering image, anything
// else (colour, gradient, var()) is used as written.
export function cssBackground(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  if (v === "" || /[;{}"<>\\]/.test(v)) return undefined;
  if (/^(\/|https?:\/\/)/.test(v)) return `center / cover no-repeat url("${v}")`;
  return v;
}

// Masonry: put each card (by its getCardSize) in the currently shortest
// column, left to right on ties — the same rule as HA's masonry view.
export function distributeMasonry(sizes: number[], columns: number): number[][] {
  const cols: number[][] = Array.from({ length: Math.max(1, columns) }, () => []);
  const heights = cols.map(() => 0);
  sizes.forEach((size, i) => {
    let target = 0;
    for (let c = 1; c < cols.length; c++) if (heights[c] < heights[target]) target = c;
    cols[target].push(i);
    heights[target] += Math.max(1, Number(size) || 1);
  });
  return cols;
}

// swipe_peek: on release, change tab when the content was dragged past a
// third of its width, or flicked (fast and at least 30 px).
export function peekCommit(dx: number, width: number, velocity: number): "next" | "prev" | null {
  const far = Math.abs(dx) > width / 3;
  const flick = Math.abs(dx) >= 30 && Math.abs(velocity) > 0.5;
  if (!far && !flick) return null;
  return dx < 0 ? "next" : "prev";
}

// layout: sections — how many section columns fit the width (each at least
// `min` px, `gap` between), capped by max_columns.
export function sectionColumns(width: number, maxColumns: number, min = 320, gap = 16): number {
  if (!(width > 0)) return 1;
  return Math.max(1, Math.min(maxColumns, Math.floor((width + gap) / (min + gap))));
}

// A card's width on a section's 12-column grid, the way HA's sections view
// reads it: the card's grid_options (or legacy layout_options), then the
// card's own default from getGridOptions(), else full width.
export function cardGridColumns(config: any, defaults?: { columns?: unknown }): number {
  const fromValue = (v: unknown): number | undefined => {
    if (v === "full") return 12;
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.min(12, Math.round(n)) : undefined;
  };
  const legacy = Number(config?.layout_options?.grid_columns);
  return (
    fromValue(config?.grid_options?.columns) ??
    (Number.isFinite(legacy) && legacy > 0 ? Math.min(12, Math.round(legacy * 3)) : undefined) ??
    fromValue(defaults?.columns) ??
    12
  );
}
