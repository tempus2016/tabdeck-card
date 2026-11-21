// view: tabs show the cards of a view on another (or this) dashboard, read
// with the lovelace/config WebSocket command. Nothing is copied: change the
// view and the tab follows on the next page load.
import type { LovelaceCardConfig } from "../types";

export interface ViewRef {
  // A dashboard url_path ("lovelace" = the default dashboard).
  dashboard: string;
  // A view path, index or title ("" = the first view).
  view: string;
}

export type ViewError = "missing_dashboard" | "missing_view" | "generated" | "empty" | "loop";

// "/energy-dash/energy", "energy-dash/energy", "/energy-dash" or
// { dashboard, view }.
export function parseViewRef(raw: any): ViewRef | undefined {
  if (raw && typeof raw === "object" && typeof raw.dashboard === "string" && raw.dashboard) {
    return { dashboard: raw.dashboard, view: raw.view === undefined ? "" : String(raw.view) };
  }
  if (typeof raw !== "string") return undefined;
  const parts = raw.trim().replace(/^\/+/, "").split("/");
  if (!parts[0]) return undefined;
  return { dashboard: parts[0], view: parts.slice(1).join("/") };
}

export function findView(config: any, view: string): any | undefined {
  const views: any[] = Array.isArray(config?.views) ? config.views : [];
  if (!views.length) return undefined;
  if (view === "") return views[0];
  const byPath = views.find((v) => v?.path === view);
  if (byPath) return byPath;
  if (/^\d+$/.test(view)) return views[Number(view)];
  const t = view.toLowerCase();
  return views.find((v) => typeof v?.title === "string" && v.title.toLowerCase() === t);
}

// The view as one card the tab can show.
export function viewToCard(view: any): { card?: LovelaceCardConfig; error?: ViewError } {
  if (view?.strategy) return { error: "generated" };
  const sections = Array.isArray(view?.sections) ? view.sections.filter((s: any) => Array.isArray(s?.cards) && s.cards.length) : [];
  if (sections.length) {
    const max = Number(view.max_columns);
    return { card: { type: "custom:tabdeck-sections-card", max_columns: max >= 1 ? Math.round(max) : 4, sections } };
  }
  const cards = Array.isArray(view?.cards) ? view.cards : [];
  if (!cards.length) return { error: "empty" };
  if (view.type === "panel") return { card: cards[0] };
  return { card: { type: "custom:tabdeck-masonry-card", min_column_width: 320, cards } };
}

// One request per dashboard per page load, shared by every tab and deck.
const cache = new Map<string, Promise<any>>();

export function loadDashboard(hass: any, dashboard: string): Promise<any> {
  const cached = cache.get(dashboard);
  if (cached) return cached;
  const p: Promise<any> = hass.callWS({ type: "lovelace/config", url_path: dashboard === "lovelace" ? null : dashboard });
  cache.set(dashboard, p);
  return p;
}

export function clearDashboardCache(): void {
  cache.clear();
}
