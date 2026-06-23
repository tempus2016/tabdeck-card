import type { RememberMode } from "./config";

export function storageKey(cardKey: string): string {
  return "tabdeck-card:" + cardKey;
}

function clamp(i: number, count: number, fallback: number): number {
  return i >= 0 && i < count ? i : fallback;
}

export function parseHashIndex(hash: string, tabNames: string[]): number | null {
  const m = /(?:^|[#&])tab=([^&]+)/.exec(hash || "");
  if (!m) return null;
  const value = decodeURIComponent(m[1]);
  const byName = tabNames.indexOf(value);
  if (byName >= 0) return byName;
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
}): number {
  const { mode, cardKey, defaultIndex, tabCount } = opts;
  if (mode === "url") {
    const idx = parseHashIndex(opts.hash ?? "", opts.tabNames ?? []);
    if (idx !== null) return clamp(idx, tabCount, defaultIndex);
  }
  if (mode === "browser") {
    const store = opts.storage ?? globalThis.localStorage;
    const raw = store?.getItem(storageKey(cardKey));
    if (raw !== null && raw !== undefined) {
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
    store?.setItem(storageKey(opts.cardKey), String(opts.index));
    return {};
  }
  if (opts.mode === "url") {
    const value = opts.tabName ? opts.tabName : String(opts.index);
    return { hash: "#tab=" + value };
  }
  return {};
}
