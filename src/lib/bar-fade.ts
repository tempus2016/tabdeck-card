// bar_fade: soft edges on a horizontally scrolling tab bar, on the side(s)
// that have more tabs.

export interface FadeEdges {
  // More tabs before (towards the start of the reading direction).
  start: boolean;
  // More tabs after.
  end: boolean;
}

// Width of the fade, px.
const FADE = 32;

// pos = scrollLeft (negative towards the end in RTL), client/scroll = the
// bar's clientWidth / scrollWidth.
export function fadeEdges(pos: number, client: number, scroll: number): FadeEdges {
  if (scroll - client <= 1) return { start: false, end: false };
  const p = Math.abs(pos);
  return { start: p > 1, end: p + client < scroll - 1 };
}

// The CSS mask-image for the faded edges ("" for none).
export function fadeMask(edges: FadeEdges, rtl: boolean): string {
  if (!edges.start && !edges.end) return "";
  const from = edges.start ? `transparent, #000 ${FADE}px` : "#000";
  const to = edges.end ? `#000 calc(100% - ${FADE}px), transparent` : "#000";
  return `linear-gradient(to ${rtl ? "left" : "right"}, ${from}, ${to})`;
}
