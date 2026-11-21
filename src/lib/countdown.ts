// Countdown badge: time left on a timer entity (finishes_at while active,
// remaining while paused), or until an entity whose state is a timestamp.

export interface Countdown {
  seconds: number;
  // True when the value changes by itself each second (needs a local tick).
  ticking: boolean;
}

function parseDuration(v: unknown): number | undefined {
  const m = /^(\d+):(\d{1,2}):(\d{1,2})(?:\.\d+)?$/.exec(String(v ?? "").trim());
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : undefined;
}

export function countdownSeconds(stateObj: any, nowMs: number): Countdown | undefined {
  if (!stateObj) return undefined;
  const attrs = stateObj.attributes ?? {};
  if (String(stateObj.entity_id ?? "").startsWith("timer.")) {
    if (stateObj.state === "active") {
      const end = Date.parse(attrs.finishes_at ?? "");
      if (Number.isFinite(end)) return { seconds: Math.max(0, (end - nowMs) / 1000), ticking: true };
    }
    if (stateObj.state !== "active" && stateObj.state !== "paused") return undefined;
    const left = parseDuration(attrs.remaining);
    return left === undefined ? undefined : { seconds: left, ticking: false };
  }
  // A timestamp state ("2026-11-21T10:12:34+00:00"), not a plain number.
  if (!/^\d{4}-\d\d-\d\dT/.test(String(stateObj.state))) return undefined;
  const end = Date.parse(stateObj.state);
  return Number.isFinite(end) && end > nowMs ? { seconds: (end - nowMs) / 1000, ticking: true } : undefined;
}

export function formatCountdown(seconds: number): string {
  const s = Math.ceil(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}
