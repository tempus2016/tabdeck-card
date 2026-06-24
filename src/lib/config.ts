import type { LovelaceCardConfig } from "../types";

export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabStyle = "underline" | "pill" | "segmented" | "boxed" | "text" | "rail";
export type RememberMode = "none" | "browser" | "url" | "entity";
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
  badge_color?: string;
  disabled?: boolean;
  // Home Assistant action fired on a long-press of the tab (tap still selects).
  hold_action?: any;
  // HA action fired when the tab's badge is clicked (does not select the tab).
  badge_action?: any;
  // Switch to this tab when the entity enters the given state (or becomes
  // active when no state is given). Edge-triggered.
  auto_select?: { entity: string; state?: string };
  // Conditions (visibility-style) that, when met, make this the default tab on
  // load (first matching tab wins, unless a remembered selection exists).
  default_if?: any[];
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
  indicator_radius?: number;
  scrollable: "auto" | boolean;
  remember: RememberMode;
  remember_entity?: string;
  storage_key?: string;
  lazy: boolean;
  unmount_hidden: boolean;
  swipe_wrap: boolean;
  swipe_mouse: boolean;
  animated: boolean;
  accent_indicator: boolean;
  header: boolean;
  sticky: boolean;
  elevation: boolean;
  scroll_buttons: boolean;
  bar_background?: string;
  swipe: boolean;
  styles: Record<string, string>;
  tabs: TabdeckTabConfig[];
}

const POSITIONS: TabPosition[] = ["top", "bottom", "left", "right"];
const STYLES: TabStyle[] = ["underline", "pill", "segmented", "boxed", "text", "rail"];
const REMEMBER: RememberMode[] = ["none", "browser", "url", "entity"];
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
  // `cards: [...]` is a shorthand: wrap multiple cards in a stack so a tab can
  // hold more than one card without hand-writing it. With `columns: N` (>1) they
  // go in a grid instead of a vertical-stack.
  let card = raw?.card ?? {};
  if (Array.isArray(raw?.cards) && raw.cards.length > 0) {
    const cols = Number(raw?.columns);
    card =
      Number.isFinite(cols) && cols > 1
        ? { type: "grid", columns: cols, square: false, cards: raw.cards }
        : { type: "vertical-stack", cards: raw.cards };
  }
  return {
    name: raw?.name ?? attrs.label ?? undefined,
    subtitle: raw?.subtitle ?? undefined,
    icon: raw?.icon ?? attrs.icon ?? undefined,
    accent: raw?.accent ?? undefined,
    color: raw?.color ?? undefined,
    badge: raw?.badge ?? undefined,
    badge_color: raw?.badge_color ?? undefined,
    disabled: raw?.disabled ? true : undefined,
    hold_action: raw?.hold_action ?? undefined,
    badge_action: raw?.badge_action ?? undefined,
    auto_select: normalizeAutoSelect(raw?.auto_select),
    default_if: raw?.default_if ?? undefined,
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
    indicator_radius:
      raw?.indicator_radius === undefined
        ? undefined
        : clampNumber(raw?.indicator_radius, 0, 999, 0),
    scrollable: raw?.scrollable === undefined ? "auto" : raw.scrollable,
    remember: pick(raw?.remember, REMEMBER, "none"),
    remember_entity: raw?.remember_entity ?? undefined,
    storage_key: raw?.storage_key ?? undefined,
    lazy: Boolean(raw?.lazy),
    unmount_hidden: Boolean(raw?.unmount_hidden),
    swipe_wrap: Boolean(raw?.swipe_wrap),
    swipe_mouse: Boolean(raw?.swipe_mouse),
    animated: raw?.animated === undefined ? true : Boolean(raw.animated),
    accent_indicator: raw?.accent_indicator === undefined ? true : Boolean(raw.accent_indicator),
    header: Boolean(raw?.header),
    sticky: Boolean(raw?.sticky),
    elevation: Boolean(raw?.elevation),
    scroll_buttons: Boolean(raw?.scroll_buttons),
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
