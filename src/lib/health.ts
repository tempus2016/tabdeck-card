// health_dim: a tab fades and shows a warning when at least `threshold` of
// its entities are unavailable (or gone from Home Assistant).

// Share (0–1) of the entities that are unavailable; undefined when there's
// nothing to judge (no entities, or no states loaded yet).
export function unavailableShare(entities: string[], states: Record<string, any> | undefined): number | undefined {
  if (!entities.length || !states || Object.keys(states).length === 0) return undefined;
  let down = 0;
  for (const id of entities) {
    const s = states[id];
    if (!s || s.state === "unavailable") down++;
  }
  return down / entities.length;
}

// `health_dim: true` → half; a number 0–1 → that share; else off.
export function healthThreshold(raw: unknown): number | undefined {
  if (raw === true) return 0.5;
  const n = Number(raw);
  if (typeof raw === "number" && Number.isFinite(n) && n > 0 && n <= 1) return n;
  return undefined;
}

export function isUnhealthy(entities: string[], states: Record<string, any> | undefined, threshold: number | undefined): boolean {
  if (threshold === undefined) return false;
  const share = unavailableShare(entities, states);
  return share !== undefined && share >= threshold;
}
