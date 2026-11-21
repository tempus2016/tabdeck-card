// Mini graph: a tiny history line of one entity drawn inside a tab.
// History comes from one `history/history_during_period` call per entity
// (minimal_response, no attributes); after that, new states are taken from
// the hass object the card already receives, and the history is fetched
// again every REFETCH_MS so the line stays aligned. Nothing is subscribed.

export interface GraphSpec {
  entity: string;
  hours: number;
  color?: string;
}

// [time in seconds, value]
export type Point = [number, number];

const REFETCH_MS = 15 * 60_000;
const ENTITY_RE = /^[a-z_]+\.[a-z0-9_]+$/;

export function normalizeGraph(raw: any): GraphSpec | undefined {
  const obj = typeof raw === "string" ? { entity: raw } : raw;
  const entity = typeof obj?.entity === "string" ? obj.entity.trim() : "";
  if (!ENTITY_RE.test(entity)) return undefined;
  const hours = Number(obj.hours);
  const out: GraphSpec = { entity, hours: Number.isFinite(hours) && hours > 0 ? hours : 24 };
  if (typeof obj.color === "string" && obj.color) out.color = obj.color;
  return out;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

// A step line through the points inside the last `hours`, scaled to w × h
// (1 px kept free above and below), as an SVG polyline `points` string.
export function sparkline(points: Point[], nowSec: number, hours: number, w: number, h: number): string | undefined {
  if (!points.length) return undefined;
  const start = nowSec - hours * 3600;
  // Keep the last point before the window: it is the value at its start.
  let first = 0;
  for (let i = 0; i < points.length; i++) if (points[i][0] <= start) first = i;
  const pts = points.slice(first);
  const vals = pts.map((p) => p[1]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const x = (t: number) => r1((Math.max(0, t - start) / (nowSec - start)) * w);
  const y = (v: number) => (max === min ? r1(h / 2) : r1(h - 1 - ((v - min) / (max - min)) * (h - 2)));
  // One step per x position: changes that land on the same spot keep the last.
  const steps: [number, number][] = [];
  for (const [t, v] of pts) {
    const sx = x(t);
    if (steps.length && steps[steps.length - 1][0] === sx) steps[steps.length - 1][1] = y(v);
    else steps.push([sx, y(v)]);
  }
  const out: string[] = [];
  steps.forEach(([sx, sy], i) => {
    if (i > 0) out.push(`${sx},${steps[i - 1][1]}`);
    out.push(`${sx},${sy}`);
  });
  out.push(`${w},${steps[steps.length - 1][1]}`);
  // Drop repeats ("20,9 20,9") a step at the window edge would make.
  return out.filter((p, i) => p !== out[i - 1]).join(" ");
}

// At most ~MAX_POINTS: keep the last value in each time slice, so a sensor
// that reports every second doesn't keep a day of states.
const MAX_POINTS = 240;
export function thin(points: Point[], hours: number): Point[] {
  if (points.length <= MAX_POINTS) return points;
  const slice = (hours * 3600) / MAX_POINTS;
  const out: Point[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (last && Math.floor(last[0] / slice) === Math.floor(p[0] / slice)) out[out.length - 1] = p;
    else out.push(p);
  }
  return out;
}

interface Entry {
  points?: Point[];
  fetchedAt: number;
  hours: number;
}

export class GraphStore {
  private _data = new Map<string, Entry>();

  constructor(private _changed: () => void) {}

  points(entity: string): Point[] | undefined {
    return this._data.get(entity)?.points;
  }

  // Keep history for exactly the entities in `specs` (the graphs on show).
  sync(hass: any, specs: GraphSpec[], nowMs = Date.now()): void {
    const wanted = new Map<string, number>();
    for (const s of specs) wanted.set(s.entity, Math.max(wanted.get(s.entity) ?? 0, s.hours));
    for (const key of [...this._data.keys()]) if (!wanted.has(key)) this._data.delete(key);
    for (const [entity, hours] of wanted) {
      const entry = this._data.get(entity);
      if (!entry || hours > entry.hours || nowMs - entry.fetchedAt >= REFETCH_MS) {
        this._fetch(hass, entity, hours, nowMs);
      } else if (entry.points) {
        this._append(entry, hass?.states?.[entity], nowMs);
      }
    }
  }

  private _append(entry: Entry, stateObj: any, nowMs: number): void {
    const v = Number(stateObj?.state);
    const t = Date.parse(stateObj?.last_updated ?? "") / 1000;
    if (!Number.isFinite(v) || !Number.isFinite(t) || stateObj.state === "") return;
    const last = entry.points!.at(-1);
    if (last && t <= last[0]) return;
    entry.points!.push([t, v]);
    const start = nowMs / 1000 - entry.hours * 3600;
    while (entry.points!.length > 2 && entry.points![1][0] <= start) entry.points!.shift();
  }

  private _fetch(hass: any, entity: string, hours: number, nowMs: number): void {
    const prev = this._data.get(entity);
    const entry: Entry = { points: prev?.points, fetchedAt: nowMs, hours };
    this._data.set(entity, entry);
    if (typeof hass?.callWS !== "function") return;
    hass
      .callWS({
        type: "history/history_during_period",
        start_time: new Date(nowMs - hours * 3600_000).toISOString(),
        entity_ids: [entity],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      })
      .then((res: any) => {
        if (this._data.get(entity) !== entry) return;
        const points: Point[] = [];
        for (const s of res?.[entity] ?? []) {
          const v = Number(s?.s ?? s?.state);
          const t = Number(s?.lu ?? s?.lc ?? Date.parse(s?.last_updated ?? s?.last_changed ?? "") / 1000);
          if ((s?.s ?? s?.state) !== "" && Number.isFinite(v) && Number.isFinite(t)) points.push([t, v]);
        }
        entry.points = thin(points, hours);
        this._changed();
      })
      .catch(() => {
        // No recorder or no access: show nothing.
      });
  }
}
