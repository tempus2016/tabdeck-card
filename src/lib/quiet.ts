// quiet_hours: a time window (and/or an entity that is on) in which the deck
// switches nothing by itself and doesn't flash, bounce or click.

export interface QuietHours {
  from?: string; // "22:00"
  to?: string; // "07:00"
  entity?: string; // quiet while this is "on"
}

const HHMM = /^([01]?\d|2[0-3]):([0-5]\d)$/;
const minutes = (t: string) => {
  const m = HHMM.exec(t.trim())!;
  return Number(m[1]) * 60 + Number(m[2]);
};

// `"22:00-07:00"`, `{ from, to }`, `{ entity }` or both.
export function normalizeQuiet(raw: any): QuietHours | undefined {
  let from: unknown, to: unknown, entity: unknown;
  if (typeof raw === "string") [from, to] = raw.split(/\s*[-–]\s*/);
  else if (raw && typeof raw === "object") ({ from, to, entity } = raw);
  const out: QuietHours = {};
  if (typeof from === "string" && typeof to === "string" && HHMM.test(from.trim()) && HHMM.test(to.trim())) {
    out.from = from.trim();
    out.to = to.trim();
  }
  if (typeof entity === "string" && entity.trim()) out.entity = entity.trim();
  return out.from || out.entity ? out : undefined;
}

// From is inclusive, to exclusive; a window may run over midnight.
export function isQuiet(q: QuietHours | undefined, now: Date, states?: Record<string, any>): boolean {
  if (!q) return false;
  if (q.entity && states?.[q.entity]?.state === "on") return true;
  if (!q.from || !q.to) return false;
  const a = minutes(q.from);
  const b = minutes(q.to);
  const t = now.getHours() * 60 + now.getMinutes();
  return a <= b ? t >= a && t < b : t >= a || t < b;
}
