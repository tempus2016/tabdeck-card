// usage_stats: time spent on each tab, reported in batches (minutes per tab
// since the last report) to the Tabdeck Companion integration, or as a
// tabdeck_usage event. Only time while the page is visible counts.

export class UsageMeter {
  private _tab?: string;
  private _since = 0;
  private _running = false;
  private _ms = new Map<string, number>();

  // The open tab changed (undefined: none).
  switchTo(tab: string | undefined, now: number): void {
    this._bank(now);
    this._tab = tab;
  }

  // Counting starts / stops (page shown / hidden, card attached / detached).
  setRunning(on: boolean, now: number): void {
    this._bank(now);
    this._running = on;
  }

  private _bank(now: number): void {
    if (this._running && this._tab !== undefined && now > this._since) {
      this._ms.set(this._tab, (this._ms.get(this._tab) ?? 0) + (now - this._since));
    }
    this._since = now;
  }

  // Minutes per tab since the last take (2 decimals, tabs under 0.01 min
  // are kept for the next one).
  take(now: number): Record<string, number> {
    this._bank(now);
    const out: Record<string, number> = {};
    for (const [tab, ms] of this._ms) {
      const min = Math.floor(ms / 600) / 100;
      if (min <= 0) continue;
      out[tab] = min;
      const left = ms - min * 60000;
      if (left > 0.5) this._ms.set(tab, left);
      else this._ms.delete(tab);
    }
    return out;
  }
}

// usage_stats: true = every 10 minutes, or a number of minutes (1–60).
export function normalizeUsageStats(raw: unknown): number | undefined {
  if (raw === true) return 10;
  const n = Number(raw);
  if (typeof raw === "number" || (typeof raw === "string" && raw.trim() !== "")) {
    if (Number.isFinite(n) && n > 0) return Math.min(60, Math.max(1, Math.round(n)));
  }
  return undefined;
}
