import type { LovelaceCardConfig } from "../types";

export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabStyle = "underline" | "pill" | "segmented";
export type RememberMode = "none" | "browser" | "url";

export interface TabdeckTabConfig {
  name?: string;
  icon?: string;
  accent?: string;
  badge?: string;
  visibility?: any[];
  card: LovelaceCardConfig;
}

export interface TabdeckCardConfig {
  type: string;
  default_tab: number | string;
  position: TabPosition;
  style: TabStyle;
  scrollable: "auto" | boolean;
  remember: RememberMode;
  lazy: boolean;
  swipe: boolean;
  styles: Record<string, string>;
  tabs: TabdeckTabConfig[];
}

const POSITIONS: TabPosition[] = ["top", "bottom", "left", "right"];
const STYLES: TabStyle[] = ["underline", "pill", "segmented"];
const REMEMBER: RememberMode[] = ["none", "browser", "url"];

function pick<T>(value: any, allowed: T[], fallback: T): T {
  return allowed.includes(value) ? value : fallback;
}

function normalizeTab(raw: any): TabdeckTabConfig {
  const attrs = raw?.attributes ?? {};
  return {
    name: raw?.name ?? attrs.label ?? undefined,
    icon: raw?.icon ?? attrs.icon ?? undefined,
    accent: raw?.accent ?? undefined,
    badge: raw?.badge ?? undefined,
    visibility: raw?.visibility ?? undefined,
    card: raw?.card ?? {},
  };
}

export function normalizeConfig(raw: any): TabdeckCardConfig {
  const tabs = Array.isArray(raw?.tabs) ? raw.tabs : [];
  if (tabs.length === 0) {
    throw new Error("tabdeck-card: you must define at least one tab.");
  }
  const defaultTab = raw?.default_tab ?? raw?.options?.defaultTabIndex ?? 0;
  return {
    type: raw?.type ?? "custom:tabdeck-card",
    default_tab: defaultTab,
    position: pick(raw?.position, POSITIONS, "top"),
    style: pick(raw?.style, STYLES, "underline"),
    scrollable: raw?.scrollable === undefined ? "auto" : raw.scrollable,
    remember: pick(raw?.remember, REMEMBER, "none"),
    lazy: Boolean(raw?.lazy),
    swipe: Boolean(raw?.swipe),
    styles: raw?.styles ?? {},
    tabs: tabs.map(normalizeTab),
  };
}

export function resolveDefaultIndex(cfg: TabdeckCardConfig): number {
  const dt = cfg.default_tab;
  if (typeof dt === "string") {
    const i = cfg.tabs.findIndex((t) => t.name === dt);
    return i >= 0 ? i : 0;
  }
  if (typeof dt === "number" && dt >= 0 && dt < cfg.tabs.length) return dt;
  return 0;
}
