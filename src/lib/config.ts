import type { LovelaceCardConfig } from "../types";

export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabStyle = "underline" | "pill" | "segmented" | "boxed" | "text";
export type RememberMode = "none" | "browser" | "url";
export type TabDisplay = "both" | "icon" | "label";
export type TabAlign = "start" | "center" | "end" | "justify";
export type BadgeDisplay = "text" | "dot";
export type PanelTransition = "none" | "fade" | "slide";

export interface TabdeckTabConfig {
  name?: string;
  subtitle?: string;
  icon?: string;
  accent?: string;
  color?: string;
  badge?: string;
  disabled?: boolean;
  // Switch to this tab when the entity enters the given state (or becomes
  // active when no state is given). Edge-triggered.
  auto_select?: { entity: string; state?: string };
  visibility?: any[];
  // A single resolved card. When the source config supplies `cards: [...]`,
  // it is collapsed into one `vertical-stack` card here.
  card: LovelaceCardConfig;
}

export interface TabdeckCardConfig {
  type: string;
  default_tab: number | string;
  position: TabPosition;
  style: TabStyle;
  tab_display: TabDisplay;
  align: TabAlign;
  badge_display: BadgeDisplay;
  hide_inactive_badge: boolean;
  transition: PanelTransition;
  indicator_size: number;
  scrollable: "auto" | boolean;
  remember: RememberMode;
  lazy: boolean;
  animated: boolean;
  accent_indicator: boolean;
  sticky: boolean;
  elevation: boolean;
  bar_background?: string;
  swipe: boolean;
  styles: Record<string, string>;
  tabs: TabdeckTabConfig[];
}

const POSITIONS: TabPosition[] = ["top", "bottom", "left", "right"];
const STYLES: TabStyle[] = ["underline", "pill", "segmented", "boxed", "text"];
const REMEMBER: RememberMode[] = ["none", "browser", "url"];
const DISPLAYS: TabDisplay[] = ["both", "icon", "label"];
const ALIGNS: TabAlign[] = ["start", "center", "end", "justify"];
const BADGE_DISPLAYS: BadgeDisplay[] = ["text", "dot"];
const TRANSITIONS: PanelTransition[] = ["none", "fade", "slide"];

function pick<T>(value: any, allowed: T[], fallback: T): T {
  return allowed.includes(value) ? value : fallback;
}

// Coerce to a finite number within [min,max], else fall back.
function clampNumber(value: any, min: number, max: number, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Accept `auto_select: entity_id` (string) or `{ entity, state }`.
function normalizeAutoSelect(raw: any): { entity: string; state?: string } | undefined {
  if (!raw) return undefined;
  if (typeof raw === "string") return { entity: raw };
  if (typeof raw === "object" && typeof raw.entity === "string") {
    return raw.state === undefined
      ? { entity: raw.entity }
      : { entity: raw.entity, state: String(raw.state) };
  }
  return undefined;
}

function normalizeTab(raw: any): TabdeckTabConfig {
  const attrs = raw?.attributes ?? {};
  // `cards: [...]` is a shorthand: wrap multiple cards in a vertical-stack so a
  // tab can hold more than one card without hand-writing the stack.
  let card = raw?.card ?? {};
  if (Array.isArray(raw?.cards) && raw.cards.length > 0) {
    card = { type: "vertical-stack", cards: raw.cards };
  }
  return {
    name: raw?.name ?? attrs.label ?? undefined,
    subtitle: raw?.subtitle ?? undefined,
    icon: raw?.icon ?? attrs.icon ?? undefined,
    accent: raw?.accent ?? undefined,
    color: raw?.color ?? undefined,
    badge: raw?.badge ?? undefined,
    disabled: raw?.disabled ? true : undefined,
    auto_select: normalizeAutoSelect(raw?.auto_select),
    visibility: raw?.visibility ?? undefined,
    card,
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
    tab_display: pick(raw?.tab_display, DISPLAYS, "both"),
    align: pick(raw?.align, ALIGNS, "start"),
    badge_display: pick(raw?.badge_display, BADGE_DISPLAYS, "text"),
    hide_inactive_badge: Boolean(raw?.hide_inactive_badge),
    transition: pick(raw?.transition, TRANSITIONS, "none"),
    indicator_size: clampNumber(raw?.indicator_size, 1, 16, 3),
    scrollable: raw?.scrollable === undefined ? "auto" : raw.scrollable,
    remember: pick(raw?.remember, REMEMBER, "none"),
    lazy: Boolean(raw?.lazy),
    animated: raw?.animated === undefined ? true : Boolean(raw.animated),
    accent_indicator: raw?.accent_indicator === undefined ? true : Boolean(raw.accent_indicator),
    sticky: Boolean(raw?.sticky),
    elevation: Boolean(raw?.elevation),
    bar_background: raw?.bar_background ?? undefined,
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
