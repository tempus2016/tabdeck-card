// Pure horizontal-swipe detection for touch gestures. Kept separate from the
// card so the threshold logic is unit-testable without synthesising DOM touch
// events. A swipe only registers when it is fast enough, long enough, and
// clearly more horizontal than vertical (so it never hijacks vertical scroll).

export interface SwipePoint {
  x: number;
  y: number;
  t: number;
}

export interface SwipeOptions {
  minDistance?: number;
  maxDuration?: number;
  ratio?: number;
}

export type SwipeDirection = "next" | "prev" | null;

export function detectSwipe(
  start: SwipePoint,
  end: SwipePoint,
  opts: SwipeOptions = {},
): SwipeDirection {
  const minDistance = opts.minDistance ?? 50;
  const maxDuration = opts.maxDuration ?? 800;
  const ratio = opts.ratio ?? 1.5;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dt = end.t - start.t;
  if (dt > maxDuration) return null;
  if (Math.abs(dx) < minDistance) return null;
  if (Math.abs(dx) < Math.abs(dy) * ratio) return null;
  return dx < 0 ? "next" : "prev";
}

// swipe_edge: a swipe only counts when it starts within `edge` px of the
// content's left or right side, so the middle (sliders, maps) is left alone.
export function startsAtEdge(x: number, rect: { left: number; right: number }, edge: number): boolean {
  return x - rect.left <= edge || rect.right - x <= edge;
}

// swipe_lock: a swipe that starts on a slider or a map belongs to that
// control. `path` is the event's composedPath() (it crosses shadow roots,
// so sliders inside other cards are found).
export function startsOnControl(path: EventTarget[]): boolean {
  for (const node of path) {
    const el = node as Element;
    if (!el || typeof el.getAttribute !== "function") continue;
    const tag = el.tagName.toLowerCase();
    if (tag.includes("slider") || tag === "ha-map") return true;
    if (el.getAttribute("role") === "slider") return true;
    if (tag === "input" && (el.getAttribute("type") ?? "").toLowerCase() === "range") return true;
    if (el.classList?.contains("leaflet-container")) return true;
  }
  return false;
}
