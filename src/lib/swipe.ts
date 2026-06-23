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
