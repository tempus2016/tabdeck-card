// entity_search: find the tab that shows an entity (Ctrl+K). The entities of
// each tab come from its card config; a grouped tab (a nested deck) records
// which child shows the entity, so the search can open that child too.
import { cardEntities } from "./changed";

export interface EntityPlace {
  entity: string;
  // Visible index of the tab in its deck, and its name.
  index: number;
  tab: string;
  // A grouped / nested deck's child tab, when the entity is in one.
  child?: string;
}

const NESTED = "custom:tabdeck-card";

// Every entity shown by each tab, with where it is. An entity in two tabs is
// listed twice.
export function entityPlaces(tabs: { name?: string; card: unknown }[]): EntityPlace[] {
  const out: EntityPlace[] = [];
  tabs.forEach((t, index) => {
    const tab = t.name ?? String(index + 1);
    const card: any = t.card;
    if (card && card.type === NESTED && Array.isArray(card.tabs)) {
      const seen = new Set<string>();
      for (const child of card.tabs) {
        const name = typeof child?.name === "string" ? child.name : undefined;
        for (const entity of cardEntities(child)) {
          if (seen.has(entity)) continue;
          seen.add(entity);
          out.push({ entity, index, tab, child: name });
        }
      }
      return;
    }
    for (const entity of cardEntities(card)) out.push({ entity, index, tab });
  });
  return out;
}

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export interface EntityMatch<T> {
  place: T;
  name: string;
  score: number;
}

// Places whose entity's friendly name or id matches every word of the query,
// best first: names starting with the query, then names containing it, then
// ids. At most `limit` results.
export function searchPlaces<T extends EntityPlace>(
  places: T[],
  states: Record<string, any> | undefined,
  query: string,
  limit = 8,
): EntityMatch<T>[] {
  const q = norm(query).trim();
  if (!q) return [];
  const words = q.split(/\s+/);
  const out: EntityMatch<T>[] = [];
  for (const place of places) {
    const name = String(states?.[place.entity]?.attributes?.friendly_name ?? place.entity);
    const n = norm(name);
    const id = norm(place.entity);
    if (!words.every((w) => n.includes(w) || id.includes(w))) continue;
    const score = n.startsWith(q) ? 0 : n.includes(q) ? 1 : words.every((w) => n.includes(w)) ? 2 : 3;
    out.push({ place, name, score });
  }
  return out
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
    .slice(0, limit);
}

// Ctrl+K, or ⌘K on a Mac.
export function isSearchShortcut(e: { key: string; ctrlKey?: boolean; metaKey?: boolean; altKey?: boolean; shiftKey?: boolean }): boolean {
  return (e.key === "k" || e.key === "K") && !!(e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey;
}
