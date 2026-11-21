// bar_limit: a big deck (say 140 generated tabs) draws only `limit` tabs in
// the bar, a page at a time around the open tab; the ⋯ menu lists them all.
// Fewer tab elements keeps building and updating the bar fast.
//
// Pages are fixed (tabs don't shift under the finger on every switch); the
// last page is filled from the end so it always shows `limit` tabs.
export function barWindow(count: number, selected: number, limit: number): [number, number] {
  if (!(limit > 0) || count <= limit) return [0, count];
  const sel = Math.min(Math.max(0, selected), count - 1);
  const start = Math.min(Math.floor(sel / limit) * limit, count - limit);
  return [start, start + limit];
}

export function normalizeBarLimit(raw: any): number | undefined {
  const n = Math.round(Number(raw));
  return Number.isFinite(n) && n > 0 ? Math.max(3, n) : undefined;
}
