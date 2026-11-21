// takeover: something happens (a doorbell press) and the deck jumps to a tab
// for a while, with a banner and a countdown, then goes back.

export interface Takeover {
  // The entity that starts it (config form; remote_event needs none).
  entity?: string;
  // Starts when the entity enters this state. Default: "on", or any new
  // value for event / button entities (their state is the press time).
  state?: string;
  // The tab to show: name, slug or index.
  tab: string | number;
  // Seconds before it goes back (5–3600, default 30).
  duration: number;
  message?: string;
  icon?: string;
}

export function takeoverSeconds(raw: unknown, fallback = 30): number {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.min(3600, Math.max(5, Math.round(n))) : fallback;
}

// `takeover: { entity, tab, ... }` or a list of them.
export function normalizeTakeovers(raw: any): Takeover[] | undefined {
  const list = (Array.isArray(raw) ? raw : raw ? [raw] : [])
    .filter((t: any) => t && typeof t === "object" && typeof t.entity === "string" && t.entity && (typeof t.tab === "string" || typeof t.tab === "number"))
    .map((t: any) => {
      const out: Takeover = { entity: t.entity, tab: t.tab, duration: takeoverSeconds(t.duration) };
      if (t.state !== undefined && t.state !== null && t.state !== "") out.state = String(t.state);
      if (typeof t.message === "string" && t.message) out.message = t.message;
      if (typeof t.icon === "string" && t.icon) out.icon = t.icon;
      return out;
    });
  return list.length ? list : undefined;
}

const PRESS_DOMAINS = ["event", "button", "input_button"];

// Whether a state change from `prev` to `value` starts the takeover.
export function takeoverFires(t: Takeover, prev: string | undefined, value: string | undefined): boolean {
  if (prev === undefined || value === undefined || value === prev) return false;
  if (t.state !== undefined) return value === t.state;
  if (PRESS_DOMAINS.includes(String(t.entity).split(".")[0])) return value !== "unavailable" && value !== "unknown" && prev !== "unavailable";
  return value === "on";
}
