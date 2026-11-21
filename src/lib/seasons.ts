// seasons: date ranges (MM-DD, inclusive, may wrap over New Year) that
// change the look while they last: accent, bar background, bar text and
// any styles. Worked out in the browser from its own date.

export interface Season {
  name?: string;
  from: string;
  to: string;
  accent?: string;
  bar_background?: string;
  bar_text?: "auto" | "light" | "dark";
  styles?: Record<string, string>;
}

// Small built-in examples (original colours).
const BUILT_IN: Record<string, Season> = {
  winter: { from: "12-01", to: "01-06", accent: "#ff5d5d", bar_background: "#14361f", bar_text: "light" },
  autumn: { from: "10-25", to: "10-31", accent: "#ff9a2e", bar_background: "#2b1a0e", bar_text: "light" },
};

function monthDay(v: any): string | undefined {
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(String(v ?? "").trim());
  if (!m || +m[1] < 1 || +m[1] > 12 || +m[2] < 1 || +m[2] > 31) return undefined;
  return `${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

export function normalizeSeasons(raw: any): Season[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: Season[] = [];
  for (const item of raw) {
    const o = typeof item === "string" ? { theme: item } : item;
    if (!o || typeof o !== "object") continue;
    const base = typeof o.theme === "string" ? BUILT_IN[o.theme] : undefined;
    if (o.theme !== undefined && !base) continue;
    const from = monthDay(o.from) ?? base?.from;
    const to = monthDay(o.to) ?? base?.to;
    if (!from || !to || (o.from !== undefined && !monthDay(o.from)) || (o.to !== undefined && !monthDay(o.to))) continue;
    const s: Season = { ...base, from, to };
    if (base) s.name = o.theme;
    if (typeof o.name === "string") s.name = o.name;
    for (const k of ["accent", "bar_background"] as const) if (typeof o[k] === "string" && o[k]) s[k] = o[k];
    if (["auto", "light", "dark"].includes(o.bar_text)) s.bar_text = o.bar_text;
    if (o.styles && typeof o.styles === "object") s.styles = { ...(base?.styles ?? {}), ...o.styles };
    out.push(s);
  }
  return out.length ? out : undefined;
}

// The first season that includes this date.
export function activeSeason(seasons: Season[] | undefined, date: Date): Season | undefined {
  if (!seasons) return undefined;
  const md = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return seasons.find((s) => (s.from <= s.to ? md >= s.from && md <= s.to : md >= s.from || md <= s.to));
}
