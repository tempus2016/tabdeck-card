// sync_group: decks in the same group on a page switch tabs together, matched
// by tab name. A page-wide event carries each switch; the last tab of every
// group is kept so a deck that appears later (another view) starts on it.
export interface SyncMessage {
  group: string;
  name: string;
  source: unknown;
}

const EVENT = "tabdeck-sync";
const last = new Map<string, string>();

export function normalizeSyncGroup(raw: unknown): string | undefined {
  if (typeof raw === "number" && Number.isFinite(raw)) return String(raw);
  return typeof raw === "string" && raw.trim() ? raw.trim() : undefined;
}

export function publishSync(group: string, name: string, source: unknown): void {
  last.set(group, name);
  window.dispatchEvent(new CustomEvent<SyncMessage>(EVENT, { detail: { group, name, source } }));
}

export function lastSynced(group: string): string | undefined {
  return last.get(group);
}

// Listen for switches in `group` made by other decks. Returns the unsubscribe.
export function onSync(group: string, self: unknown, cb: (name: string) => void): () => void {
  const handler = (e: Event) => {
    const d = (e as CustomEvent<SyncMessage>).detail;
    if (d && d.group === group && d.source !== self) cb(d.name);
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

// For tests.
export function resetSync(): void {
  last.clear();
}

// Index of the tab called `name`: the exact name, else the same slug
// ("Living room" matches "living-room"). -1 when none.
export function matchTabName(names: (string | undefined)[], name: string): number {
  const exact = names.indexOf(name);
  if (exact >= 0) return exact;
  const slug = (v: string) => v.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
  const want = slug(name);
  return want ? names.findIndex((n) => n !== undefined && slug(n) === want) : -1;
}
