// Pure helpers for the "smart" options: count badges, time / device defaults,
// alert ordering and snoozing, PIN unlock memory, progress rings and
// auto-generated tab content. Kept out of the card so they're unit-testable.
import { isActiveBadge } from "../components/tabdeck-tab";

// --- count badges ------------------------------------------------------------

export interface CountBadge {
  // Entity id patterns; `*` matches anything (e.g. light.*, *.kitchen_*).
  count: string[];
  // Count entities in one of these states; default: "active" ones.
  state?: string[];
  // Only entities in this area (directly or through their device).
  area?: string;
}

const list = (v: unknown): string[] | undefined =>
  v === undefined ? undefined : (Array.isArray(v) ? v : [v]).map(String).filter((s) => s !== "");

// `badge: { count: light.*, state: on, area: kitchen }`. Strings (entity ids,
// templates) aren't count badges.
export function normalizeCountBadge(raw: any): CountBadge | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const count = list(raw.count);
  if (!count?.length) return undefined;
  const out: CountBadge = { count };
  const state = list(raw.state);
  if (state?.length) out.state = state;
  if (typeof raw.area === "string" && raw.area) out.area = raw.area;
  return out;
}

export function matchesPattern(entityId: string, pattern: string): boolean {
  if (!pattern.includes("*")) return entityId === pattern;
  const re = new RegExp("^" + pattern.split("*").map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$");
  return re.test(entityId);
}

// The area an entity is in: its own, else its device's.
function entityArea(hass: any, entityId: string): string | undefined {
  const reg = hass?.entities?.[entityId];
  if (!reg) return undefined;
  return reg.area_id || hass?.devices?.[reg.device_id]?.area_id || undefined;
}

export function countBadge(spec: CountBadge, hass: any): string {
  let n = 0;
  for (const [id, stateObj] of Object.entries<any>(hass?.states ?? {})) {
    if (!spec.count.some((p) => matchesPattern(id, p))) continue;
    if (spec.area && entityArea(hass, id) !== spec.area) continue;
    const s = stateObj?.state;
    if (spec.state ? spec.state.includes(s) : isActiveBadge(s)) n++;
  }
  return String(n);
}

// --- time / device defaults -----------------------------------------------------

const HHMM = /^([01]?\d|2[0-3]):([0-5]\d)$/;

// `default_by_time: { "06:00": Morning, "18:00": Evening }` — the slot that
// started most recently (before the first slot, the last one carries over
// from the previous evening).
export function pickByTime(map: Record<string, any> | undefined, now: Date): any {
  if (!map || typeof map !== "object") return undefined;
  const slots = Object.entries(map)
    .map(([k, v]) => {
      const m = HHMM.exec(k.trim());
      return m ? { at: Number(m[1]) * 60 + Number(m[2]), tab: v } : undefined;
    })
    .filter((s): s is { at: number; tab: any } => !!s)
    .sort((a, b) => a.at - b.at);
  if (!slots.length) return undefined;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const started = slots.filter((s) => s.at <= minutes);
  return (started.length ? started[started.length - 1] : slots[slots.length - 1]).tab;
}

const DEVICE_KEY = "tabdeck-device";

// This browser's name for default_by_device / remote_event targeting:
// `?tabdeck_device=kitchen-panel` once (remembered), else browser_mod's id.
export function deviceId(search: string = typeof location !== "undefined" ? location.search : ""): string | undefined {
  try {
    const fromUrl = new URLSearchParams(search).get("tabdeck_device");
    if (fromUrl) {
      localStorage.setItem(DEVICE_KEY, fromUrl);
      return fromUrl;
    }
    return localStorage.getItem(DEVICE_KEY) || localStorage.getItem("browser_mod-browser-id") || undefined;
  } catch {
    return undefined;
  }
}

export function pickByDevice(map: Record<string, any> | undefined, id: string | undefined): any {
  if (!map || typeof map !== "object" || !id) return undefined;
  return Object.prototype.hasOwnProperty.call(map, id) ? map[id] : undefined;
}

// --- alerts ---------------------------------------------------------------------

export function orderAlertsFirst<T>(tabs: T[], alerting: (t: T) => boolean): T[] {
  return [...tabs.filter(alerting), ...tabs.filter((t) => !alerting(t))];
}

const snoozeKey = (deck: string, tab: string) => `tabdeck-snooze:${deck}:${tab}`;

export function snooze(deck: string, tab: string, now: number, minutes: number): void {
  try {
    localStorage.setItem(snoozeKey(deck, tab), String(now + minutes * 60_000));
  } catch {
    /* storage unavailable */
  }
}

export function snoozedUntil(deck: string, tab: string, now: number): number | undefined {
  try {
    const until = Number(localStorage.getItem(snoozeKey(deck, tab)));
    return Number.isFinite(until) && until > now ? until : undefined;
  } catch {
    return undefined;
  }
}

export function clearSnooze(deck: string, tab: string): void {
  try {
    localStorage.removeItem(snoozeKey(deck, tab));
  } catch {
    /* storage unavailable */
  }
}

// --- PIN -------------------------------------------------------------------------

const pinKey = (deck: string, tab: string) => `tabdeck-pin:${deck}:${tab}`;

// Unlocked earlier in this browser session (and, with `minutes`, recently).
export function pinUnlocked(deck: string, tab: string, now: number, minutes: number | undefined): boolean {
  try {
    const at = Number(sessionStorage.getItem(pinKey(deck, tab)));
    if (!Number.isFinite(at) || at <= 0) return false;
    return minutes === undefined || now - at <= minutes * 60_000;
  } catch {
    return false;
  }
}

export function rememberPin(deck: string, tab: string, now: number): void {
  try {
    sessionStorage.setItem(pinKey(deck, tab), String(now));
  } catch {
    /* storage unavailable */
  }
}

// --- progress ring ------------------------------------------------------------------

export function ringPercent(value: string | undefined, max: number): number | undefined {
  if (value === undefined || String(value).trim() === "") return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || !(max > 0)) return undefined;
  return Math.min(100, Math.max(0, (n / max) * 100));
}

// --- auto content --------------------------------------------------------------------

export interface AutoContentSpec {
  area?: string;
  floor?: string;
  label?: string;
  domains?: string[];
}

// A tile grid of every entity in an area / floor / label (entities placed
// through their device count; hidden and config/diagnostic ones are left
// out, as HA's own area dashboards do). Undefined when the tab isn't one.
export function autoContentCard(spec: AutoContentSpec, hass: any, emptyText = "No entities here.", columns = 2): any {
  if (!spec.area && !spec.floor && !spec.label) return undefined;
  const ids = Object.keys(hass?.entities ?? {})
    .filter((id) => {
      const reg = hass.entities[id];
      if (reg.hidden || reg.entity_category || !hass.states?.[id]) return false;
      if (spec.domains?.length && !spec.domains.includes(id.split(".")[0])) return false;
      if (spec.label) return Array.isArray(reg.labels) && reg.labels.includes(spec.label);
      const area = entityArea(hass, id);
      if (spec.area) return area === spec.area;
      return !!area && hass.areas?.[area]?.floor_id === spec.floor;
    })
    .sort();
  if (!ids.length) return { type: "markdown", content: emptyText };
  return { type: "grid", columns, square: false, cards: ids.map((entity) => ({ type: "tile", entity })) };
}
