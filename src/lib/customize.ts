// Per-browser tab layout chosen by the person using the dashboard
// (`customize: true`): their own order and hidden tabs, stored in
// localStorage by tab name, so the shared config is never touched.

export interface UserLayout {
  order: string[];
  hidden: string[];
}

const EMPTY: UserLayout = { order: [], hidden: [] };

export const layoutKey = (cardKey: string): string => `tabdeck-layout:${cardKey}`;

export function loadLayout(cardKey: string): UserLayout {
  try {
    const raw = JSON.parse(localStorage.getItem(layoutKey(cardKey)) ?? "null");
    if (!raw || typeof raw !== "object") return EMPTY;
    const strings = (v: any) => (Array.isArray(v) ? v.filter((x) => typeof x === "string") : []);
    return { order: strings(raw.order), hidden: strings(raw.hidden) };
  } catch {
    return EMPTY;
  }
}

export function saveLayout(cardKey: string, layout: UserLayout | null): void {
  try {
    if (!layout || (layout.order.length === 0 && layout.hidden.length === 0)) {
      localStorage.removeItem(layoutKey(cardKey));
    } else {
      localStorage.setItem(layoutKey(cardKey), JSON.stringify(layout));
    }
  } catch {
    /* storage unavailable (private mode): the layout just isn't kept */
  }
}

// Reorder by the saved names (tabs the person hasn't placed keep their
// config order, after the placed ones). Unnamed tabs can't be placed.
export function orderTabs<T extends { name?: string }>(tabs: T[], layout: UserLayout): T[] {
  if (layout.order.length === 0) return tabs;
  const rank = (t: T) => {
    const i = t.name === undefined ? -1 : layout.order.indexOf(t.name);
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };
  return tabs
    .map((t, i) => ({ t, i }))
    .sort((a, b) => rank(a.t) - rank(b.t) || a.i - b.i)
    .map((x) => x.t);
}

// Drop the person's hidden tabs, but never all of them.
export function hideTabs<T extends { name?: string }>(tabs: T[], layout: UserLayout): T[] {
  if (layout.hidden.length === 0) return tabs;
  const kept = tabs.filter((t) => t.name === undefined || !layout.hidden.includes(t.name));
  return kept.length ? kept : tabs;
}
