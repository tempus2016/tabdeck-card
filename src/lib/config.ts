import type { LovelaceCardConfig } from "../types";
import { normalizeBadgeFormat, type BadgeFormat } from "./badge";

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
  // Numeric badge formatting (precision / unit / max → "99+").
  badge_format?: BadgeFormat;
  disabled?: boolean;
  // Optional getCardSize() hint for this tab (masonry layout sizing).
  card_size?: number;
  // Home Assistant action fired on a long-press of the tab (tap still selects).
  hold_action?: any;
  // HA action fired when the tab's badge is clicked (does not select the tab).
  badge_action?: any;
  // HA action fired when the tab is tapped, *instead of* selecting it — turns
  // the tab into a navigation link / button. Such a tab needs no card.
  tap_action?: any;
  // HA actions fired when this tab becomes / stops being the active tab.
  enter_action?: any;
  leave_action?: any;
  // Switch to this tab when the entity enters the given state (or becomes
  // active when no state is given). Edge-triggered.
  auto_select?: { entity: string; state?: string };
  // Conditions (visibility-style) that, when met, make this the default tab on
  // load (first matching tab wins, unless a remembered selection exists).
  default_if?: any[];
  visibility?: any[];
  // Conditions (visibility-style) that, while met, make the tab pulse.
  alert?: any[];
  // A single resolved card. When the source config supplies `cards: [...]`,
  // it is collapsed into one `vertical-stack` card here.
  card: LovelaceCardConfig;
}

export interface AutoTabsConfig {
  // HA Jinja template, server-rendered, must yield a JSON list.
  template: string;
  // Optional per-item blueprint. When present, each list item fills its
  // {{ item }} / {{ item.prop }} / {{ index }} placeholders; when absent, each
  // list element is treated as a complete tab config.
  tab_template?: Record<string, any>;
}

export interface AutoRotateConfig {
  // Seconds between automatic tab advances.
  interval: number;
  // Seconds after the last interaction before rotation resumes.
  resume_after: number;
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
  // Default numeric badge format for every tab (a tab's own badge_format wins).
  badge_format?: BadgeFormat;
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
  aria_label?: string;
  sticky: boolean;
  elevation: boolean;
  scroll_buttons: boolean;
  overflow_menu: boolean;
  bar_background?: string;
  swipe: boolean;
  styles: Record<string, string>;
  tabs: TabdeckTabConfig[];
  auto_tabs?: AutoTabsConfig;
  auto_rotate?: AutoRotateConfig;
  // Seconds of inactivity before returning to the default tab.
  idle_return?: number;
  // Anchor mode: all panels stacked; the bar scrolls to / tracks sections.
  scroll_spy: boolean;
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

function actionOrUndefined(raw: any): any {
  return raw && typeof raw === "object" && raw.action && raw.action !== "none" ? raw : undefined;
}

export function normalizeTab(raw: any): TabdeckTabConfig {
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
    badge_format: normalizeBadgeFormat(raw?.badge_format),
    disabled: raw?.disabled ? true : undefined,
    card_size: typeof raw?.card_size === "number" ? raw.card_size : undefined,
    hold_action: raw?.hold_action ?? undefined,
    badge_action: raw?.badge_action ?? undefined,
    tap_action:
      raw?.tap_action && typeof raw.tap_action === "object" && raw.tap_action.action !== "none"
        ? raw.tap_action
        : undefined,
    enter_action: actionOrUndefined(raw?.enter_action),
    leave_action: actionOrUndefined(raw?.leave_action),
    auto_select: normalizeAutoSelect(raw?.auto_select),
    default_if: raw?.default_if ?? undefined,
    visibility: raw?.visibility ?? undefined,
    alert: Array.isArray(raw?.alert) && raw.alert.length > 0 ? raw.alert : undefined,
    card,
  };
}

// A tab whose tap runs an action rather than showing a panel.
export function isActionTab(tab: TabdeckTabConfig | undefined): boolean {
  return !!tab?.tap_action;
}

function normalizeAutoTabs(raw: any): AutoTabsConfig | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  if (typeof raw.template !== "string" || raw.template.trim() === "") return undefined;
  return {
    template: raw.template,
    tab_template:
      raw.tab_template && typeof raw.tab_template === "object" ? raw.tab_template : undefined,
  };
}

// `auto_rotate: 10` or `{ interval: 10, resume_after: 60 }`. 0/absent = off.
function normalizeAutoRotate(raw: any): AutoRotateConfig | undefined {
  const obj = typeof raw === "object" && raw !== null ? raw : { interval: raw };
  const interval = Number(obj.interval);
  if (!Number.isFinite(interval) || interval <= 0) return undefined;
  return {
    interval: Math.max(2, interval),
    resume_after: clampNumber(obj.resume_after, 0, 86400, 60),
  };
}

export function normalizeConfig(raw: any): TabdeckCardConfig {
  const tabs = Array.isArray(raw?.tabs) ? raw.tabs : [];
  const auto_tabs = normalizeAutoTabs(raw?.auto_tabs);
  if (tabs.length === 0 && !auto_tabs) {
    throw new Error("tabdeck-card: you must define at least one tab (or auto_tabs).");
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
    badge_format: normalizeBadgeFormat(raw?.badge_format),
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
    aria_label: raw?.aria_label ?? undefined,
    sticky: Boolean(raw?.sticky),
    elevation: Boolean(raw?.elevation),
    scroll_buttons: Boolean(raw?.scroll_buttons),
    overflow_menu: Boolean(raw?.overflow_menu),
    bar_background: raw?.bar_background ?? undefined,
    swipe: Boolean(raw?.swipe),
    styles: raw?.styles ?? {},
    tabs: tabs.map(normalizeTab),
    auto_tabs,
    auto_rotate: normalizeAutoRotate(raw?.auto_rotate),
    scroll_spy: Boolean(raw?.scroll_spy),
    idle_return:
      Number(raw?.idle_return) > 0 ? Math.max(5, Number(raw.idle_return)) : undefined,
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
