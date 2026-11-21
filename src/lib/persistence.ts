import type { RememberMode } from "./config";

export function storageKey(cardKey: string): string {
  return "tabdeck-card:" + cardKey;
}

function clamp(i: number, count: number, fallback: number): number {
  return i >= 0 && i < count ? i : fallback;
}

// URL-friendly form of a tab name: "Living Room" -> "living-room".
export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseHashIndex(hash: string, tabNames: string[]): number | null {
  const m = /(?:^|[#&])tab=([^&]+)/.exec(hash || "");
  if (!m) return null;
  const value = decodeURIComponent(m[1]);
  const byName = tabNames.indexOf(value);
  if (byName >= 0) return byName;
  // Fall back to a case-insensitive / slug match so `#tab=living-room` works.
  const slug = slugify(value);
  const bySlug = slug ? tabNames.findIndex((n) => slugify(n) === slug) : -1;
  if (bySlug >= 0) return bySlug;
  const n = Number(value);
  if (Number.isInteger(n) && n >= 0) return n;
  return null;
}

export function loadInitialIndex(opts: {
  mode: RememberMode;
  cardKey: string;
  defaultIndex: number;
  tabCount: number;
  hash?: string;
  tabNames?: string[];
  storage?: Storage;
  entityValue?: string;
}): number {
  const { mode, cardKey, defaultIndex, tabCount } = opts;
  if (mode === "entity") {
    const n = Number(opts.entityValue);
    if (opts.entityValue !== undefined && Number.isFinite(n)) {
      return clamp(Math.trunc(n), tabCount, defaultIndex);
    }
    return clamp(defaultIndex, tabCount, 0);
  }
  if (mode === "url") {
    const idx = parseHashIndex(opts.hash ?? "", opts.tabNames ?? []);
    if (idx !== null) return clamp(idx, tabCount, defaultIndex);
  }
  if (mode === "browser") {
    const store = opts.storage ?? globalThis.localStorage;
    const raw = store?.getItem(storageKey(cardKey));
    if (raw !== null && raw !== undefined) {
      // "name:<tab>" follows the tab when the order changes (customize,
      // sort_by_usage, alert_first); a bare number is an older saved index.
      if (raw.startsWith("name:")) {
        const i = (opts.tabNames ?? []).indexOf(raw.slice(5));
        return i >= 0 ? i : clamp(defaultIndex, tabCount, 0);
      }
      return clamp(Number(raw), tabCount, defaultIndex);
    }
  }
  return clamp(defaultIndex, tabCount, 0);
}

export function persistIndex(opts: {
  mode: RememberMode;
  cardKey: string;
  index: number;
  tabName?: string;
  storage?: Storage;
}): { hash?: string } {
  if (opts.mode === "browser") {
    const store = opts.storage ?? globalThis.localStorage;
    store?.setItem(storageKey(opts.cardKey), opts.tabName ? `name:${opts.tabName}` : String(opts.index));
    return {};
  }
  if (opts.mode === "url") {
    const value = opts.tabName ? opts.tabName : String(opts.index);
    return { hash: "#tab=" + value };
  }
  return {};
}

// The tab `remember` would restore, or null when there's nothing remembered
// (a fresh browser, no #tab= link, an empty helper). learned_default only
// steps in then.
export function rememberedIndex(opts: {
  mode: RememberMode;
  cardKey: string;
  tabCount: number;
  hash?: string;
  tabNames?: string[];
  storage?: Storage;
  entityValue?: string;
}): number | null {
  const ok = (i: number) => (Number.isInteger(i) && i >= 0 && i < opts.tabCount ? i : null);
  if (opts.mode === "entity") {
    const n = Number(opts.entityValue);
    return opts.entityValue !== undefined && opts.entityValue !== "" && Number.isFinite(n) ? ok(Math.trunc(n)) : null;
  }
  if (opts.mode === "url") {
    const idx = parseHashIndex(opts.hash ?? "", opts.tabNames ?? []);
    return idx === null ? null : ok(idx);
  }
  if (opts.mode === "browser") {
    try {
      const raw = (opts.storage ?? globalThis.localStorage)?.getItem(storageKey(opts.cardKey));
      if (raw === null || raw === undefined) return null;
      if (raw.startsWith("name:")) return ok((opts.tabNames ?? []).indexOf(raw.slice(5)));
      return ok(Number(raw));
    } catch {
      return null;
    }
  }
  return null;
}
