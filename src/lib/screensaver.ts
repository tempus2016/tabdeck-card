// idle_dim: after some minutes without a touch, a wall panel dims, goes
// black or shows a clock. A touch (or key) wakes it.

export type DimMode = "dim" | "black" | "clock";

export interface IdleDimConfig {
  // Minutes without interaction.
  after: number;
  mode: DimMode;
  // Overlay darkness for `dim` (0–1).
  opacity: number;
}

const MODES: DimMode[] = ["dim", "black", "clock"];

// `idle_dim: 5` or `{ after: 5, mode: clock, opacity: 0.8 }`.
export function normalizeIdleDim(raw: unknown): IdleDimConfig | undefined {
  const obj: any = typeof raw === "object" && raw !== null ? raw : { after: raw };
  const after = Number(obj.after);
  if (!Number.isFinite(after) || after <= 0) return undefined;
  const opacity = Number(obj.opacity);
  return {
    after: Math.max(0.5, after),
    mode: MODES.includes(obj.mode) ? obj.mode : "dim",
    opacity: Number.isFinite(opacity) && opacity > 0 && opacity <= 1 ? opacity : 0.7,
  };
}

export function shouldDim(cfg: IdleDimConfig | undefined, now: number, lastInteraction: number): boolean {
  return !!cfg && now - lastInteraction >= cfg.after * 60_000;
}

// The clock's time and date lines in the dashboard's language. `timeFormat`
// is HA's profile setting ("12", "24", or "language" / "system" = the
// language's own).
export function clockText(date: Date, lang: string, timeFormat?: string): { time: string; date: string } {
  const hour12 = timeFormat === "12" ? true : timeFormat === "24" ? false : undefined;
  const safe = (fn: () => string, fallback: string) => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  };
  return {
    time: safe(() => new Intl.DateTimeFormat(lang, { hour: "numeric", minute: "2-digit", ...(hour12 === undefined ? {} : { hour12 }) }).format(date), date.toTimeString().slice(0, 5)),
    date: safe(
      () => new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }).format(date),
      date.toDateString(),
    ),
  };
}
