// sort_by_usage: each browser counts how often each tab is opened and puts
// the most used first. Counts live in localStorage by tab name.

export type UsageCounts = Record<string, number>;

const storeKey = (deck: string) => `tabdeck-usage:${deck}`;

export function loadUsage(deck: string): UsageCounts {
  try {
    const raw = JSON.parse(localStorage.getItem(storeKey(deck)) ?? "{}");
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    const out: UsageCounts = {};
    for (const [k, v] of Object.entries(raw)) if (typeof v === "number" && v > 0) out[k] = v;
    return out;
  } catch {
    return {};
  }
}

export function saveUsage(deck: string, counts: UsageCounts): void {
  try {
    localStorage.setItem(storeKey(deck), JSON.stringify(counts));
  } catch {
    /* storage unavailable: the order just isn't learned */
  }
}

// One more open of `name`.
export function recordUse(counts: UsageCounts, name: string): UsageCounts {
  return { ...counts, [name]: (counts[name] ?? 0) + 1 };
}

// Most opened first; ties (and unnamed tabs) keep their order.
export function sortByUsage<T extends { name?: string }>(tabs: T[], counts: UsageCounts): T[] {
  const n = (t: T) => (t.name === undefined ? 0 : counts[t.name] ?? 0);
  return tabs
    .map((t, i) => ({ t, i }))
    .sort((a, b) => n(b.t) - n(a.t) || a.i - b.i)
    .map((x) => x.t);
}

// learned_default: each browser also counts its picks per hour of the day,
// and on load opens the tab it picks most around this hour.

export type HourlyUsage = Record<string, UsageCounts>;

const hourKey = (deck: string) => `tabdeck-learned:${deck}`;

export function loadHourly(deck: string): HourlyUsage {
  try {
    const raw = JSON.parse(localStorage.getItem(hourKey(deck)) ?? "{}");
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    const out: HourlyUsage = {};
    for (const [h, counts] of Object.entries<any>(raw)) {
      if (!/^(1?\d|2[0-3])$/.test(h) || !counts || typeof counts !== "object") continue;
      const c: UsageCounts = {};
      for (const [k, v] of Object.entries(counts)) if (typeof v === "number" && v > 0) c[k] = v;
      out[h] = c;
    }
    return out;
  } catch {
    return {};
  }
}

export function saveHourly(deck: string, usage: HourlyUsage): void {
  try {
    localStorage.setItem(hourKey(deck), JSON.stringify(usage));
  } catch {
    /* storage unavailable: nothing is learned */
  }
}

// One more pick of `name` at `hour`. An hour's counts halve once one passes
// 100, so habits that change win through within a few weeks.
export function recordHourly(usage: HourlyUsage, name: string, hour: number): HourlyUsage {
  let counts = recordUse(usage[hour] ?? {}, name);
  if (counts[name] > 100) {
    const halved: UsageCounts = {};
    for (const [k, v] of Object.entries(counts)) if (Math.floor(v / 2) > 0) halved[k] = Math.floor(v / 2);
    counts = halved;
  }
  return { ...usage, [hour]: counts };
}

// The tab picked most around `hour` (the hour itself counts double, the hours
// either side once), when it was picked at least `minUses` times there and
// clearly more than any other. Undefined when nothing stands out.
export function learnedTab(usage: HourlyUsage, hour: number, minUses: number): string | undefined {
  const score: Record<string, number> = {};
  for (const [h, weight] of [[hour, 2], [(hour + 23) % 24, 1], [(hour + 1) % 24, 1]]) {
    for (const [name, n] of Object.entries(usage[h] ?? {})) score[name] = (score[name] ?? 0) + n * weight;
  }
  const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]);
  if (!ranked.length || ranked[0][1] < minUses * 2) return undefined;
  if (ranked.length > 1 && ranked[1][1] === ranked[0][1]) return undefined;
  return ranked[0][0];
}
