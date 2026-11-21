// changed_dot: a dot on tabs whose entities changed state since this browser
// last showed them. The entities come from the tab's card config (or the
// tab's own `watch` list); the "last seen" times live in localStorage.

// Keys that hold entity ids in Lovelace card configs.
const ENTITY_KEYS = new Set(["entity", "entity_id", "entities", "camera_image", "camera_entity"]);

const ENTITY_ID = /^[a-z_]+\.[a-z0-9_]+$/;

// Every entity id named anywhere in a card config (nested cards included).
export function cardEntities(card: unknown): string[] {
  const out = new Set<string>();
  const add = (v: unknown) => {
    if (typeof v === "string" && ENTITY_ID.test(v)) out.add(v);
    else if (Array.isArray(v)) v.forEach(add);
    else if (v && typeof v === "object" && typeof (v as any).entity === "string") add((v as any).entity);
  };
  const walk = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;
    for (const [k, v] of Object.entries(node)) {
      if (ENTITY_KEYS.has(k)) add(v);
      if (v && typeof v === "object") walk(v);
    }
  };
  walk(card);
  return [...out];
}

// True when any entity's state changed after `since` (ms).
export function changedSince(entities: string[], states: Record<string, any> | undefined, since: number): boolean {
  if (!states) return false;
  for (const id of entities) {
    const t = Date.parse(states[id]?.last_changed ?? "");
    if (Number.isFinite(t) && t > since) return true;
  }
  return false;
}

const storeKey = (deck: string) => `tabdeck-seen:${deck}`;

export function loadSeen(deck: string): Record<string, number> {
  try {
    const raw = JSON.parse(localStorage.getItem(storeKey(deck)) ?? "{}");
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  } catch {
    return {};
  }
}

export function saveSeen(deck: string, seen: Record<string, number>): void {
  try {
    localStorage.setItem(storeKey(deck), JSON.stringify(seen));
  } catch {
    // Private mode / storage full: the dots just won't survive a reload.
  }
}
