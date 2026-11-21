import { normalizeUsageStats } from "./usage-stats";
import type { LovelaceCardConfig } from "../types";
import { normalizeBadgeFormat, type BadgeFormat } from "./badge";
import { normalizeGraph } from "./mini-graph";
import { isPreset, withPreset, type PresetName } from "./presets";
import { cssLength, type TransitionMode } from "./layout";
import { healthThreshold } from "./health";
import { normalizeIdleDim, type IdleDimConfig } from "./screensaver";
import { substituteTokens } from "./generate";
import { normalizeSyncGroup } from "./sync";
import { normalizePopup, type PopupMode } from "./popup";
import { normalizeWizard, type WizardConfig } from "./wizard";
import { normalizeShare, type ShareMode } from "./share";
import { normalizeOrientation, type OrientationLayout } from "./orientation";
import { shortcutCard } from "./shortcuts";
import { normalizeEmpty, type EmptyMessage } from "./empty";
import { lengthOrZero, normalizeZoom } from "./size";
import { normalizeBarLimit } from "./bar-window";
import { normalizeSeasons, type Season } from "./seasons";
import { normalizeTakeovers, type Takeover } from "./takeover";
import { normalizeQuiet, type QuietHours } from "./quiet";
import { normalizeClickSound } from "./click-sound";
import { buildSourceTemplate, defaultTabTemplate, SOURCES, type AutoTabsSource } from "./sources";

export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabStyle = "underline" | "pill" | "segmented" | "boxed" | "text" | "rail";
export type RememberMode = "none" | "browser" | "url" | "entity";
// "active": icon only, except the selected tab, which shows icon + label + subtitle.
// "dots": pagination dots (name read out to screen readers).
export type TabDisplay = "both" | "icon" | "label" | "active" | "dots";
export type TabAlign = "start" | "center" | "end" | "justify";
export type BadgeDisplay = "text" | "dot";
export type PanelTransition = TransitionMode;
export type HapticType = "selection" | "light" | "medium" | "heavy" | "success" | "warning" | "failure";
const HAPTICS: HapticType[] = ["selection", "light", "medium", "heavy", "success", "warning", "failure"];

export interface TabdeckTabConfig {
  name?: string;
  subtitle?: string;
  icon?: string;
  accent?: string;
  color?: string;
  // An entity id, a Jinja template, or a count: { count: light.*, state: on }.
  badge?: string | Record<string, any>;
  badge_color?: string;
  // An icon shown as the badge (while the badge is active, or always when
  // there's no badge value).
  badge_icon?: string;
  // Progress ring around the icon: an entity id, template or number, out of
  // ring_max (default 100).
  ring?: string;
  ring_max?: number;
  ring_color?: string;
  // "bar": draw the ring's value as a progress bar under the tab.
  ring_style?: "bar";
  // More badges after the main one: each an entity / template / count
  // (`badge`), an `icon` and a `color`.
  badges?: { badge?: string | Record<string, any>; icon?: string; color?: string }[];
  // Hover summary (template allowed).
  tooltip?: string;
  // Countdown badge: a timer (or timestamp) entity; wins over `badge` while running.
  countdown?: string;
  // A tiny history line of one entity: entity id or { entity, hours, color }.
  graph?: string | { entity: string; hours?: number; color?: string };
  // A code asked for before the tab opens (a convenience lock, not
  // security: the config is readable by anyone who can edit the dashboard).
  pin?: string;
  // Minutes an unlock lasts (default: until the page is reloaded).
  pin_timeout?: number;
  // Auto content: no card needed, the tab shows tiles of the entities in
  // this area / floor / label (optionally only these domains).
  area?: string;
  floor?: string;
  label?: string;
  domains?: string[];
  // Numeric badge formatting (precision / unit / max → "99+").
  badge_format?: BadgeFormat;
  disabled?: boolean;
  // Render as a raised floating action button (usually an action tab).
  fab?: boolean;
  // Optional getCardSize() hint for this tab (masonry layout sizing).
  card_size?: number;
  // Home Assistant action fired on a long-press of the tab (tap still selects).
  hold_action?: any;
  // HA action fired on a double tap of the tab (a single tap still selects,
  // after a short wait to rule out a second tap).
  double_tap_action?: any;
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
  // Content background while this tab is active: a colour, gradient, var()
  // or an image path / URL. May be a template.
  background?: string;
  // The whole dashboard view's background while this tab is open (same
  // values as background; may be a template).
  page_background?: string;
  // "masonry": the tab's `cards` are balanced into columns.
  // "sections": titled groups of cards, like HA's sections view.
  layout?: "masonry" | "sections";
  // CSS properties applied to the card while this tab is active (over the
  // top-level `styles`).
  styles?: Record<string, string>;
  // Grouped tab: the children (for the parent's menu) and how they show.
  group?: TabGroup;
  // The source keys of a grouped tab, kept so the editor round-trips them.
  children?: any[];
  children_display?: "row" | "menu";
  children_options?: Record<string, any>;
  // Icon animation (spin, pulse, bounce, shake, beat); may be a template.
  icon_animation?: string;
  // A picture instead of the icon: an image URL, or an entity (a person's
  // photo via entity_picture); may be a template.
  picture?: string;
  // This tab's label font (CSS values; numbers are px for the size).
  font_size?: string;
  font_weight?: string;
  font_family?: string;
  // Reuse: fill the top-level tab_templates[use] blueprint with these vars
  // (kept so the editor round-trips them).
  use?: string;
  vars?: Record<string, any>;
  // Drawn in the bar before this tab: a thin `line`, or a `space` that pushes
  // this tab and the ones after it to the far end of the bar.
  separator?: "line" | "space";
  // Shared tab: "dashboard/tab" or "dashboard/view/tab" on another
  // dashboard's Tabdeck card (resolved by the card at load).
  tab_ref?: string;
  // Picture-in-picture: after switching away, this tab's card stays in a
  // small floating window until closed or reopened.
  pip?: boolean;
  // Keep the screen on while this tab is open (Screen Wake Lock, https only).
  keep_awake?: boolean;
  // changed_dot: the entities to watch (default: those in the tab's card).
  watch?: string[];
  // Show another dashboard view's cards: "/dashboard/view" or
  // { dashboard, view } (kept so the editor round-trips it).
  view?: string | { dashboard: string; view?: string };
  // Show a web page (HA's iframe card); aspect_ratio as the iframe card's
  // (e.g. "75%", "16:9").
  url?: string;
  aspect_ratio?: string;
  // Markdown text shown with HA's markdown card (templates work).
  markdown?: string;
  // Shown when every card in the tab is hidden: true, a line of text, or
  // { title, text, icon } (title and text may be templates).
  // Size controls: zoom factor, padding and the gap between cards.
  zoom?: number;
  padding?: string;
  spacing?: string;
  // Minutes: the tab's card is rebuilt this often (cameras, web pages).
  auto_refresh?: number;
  // Kept as written (the editor round-trips it); read with normalizeEmpty.
  empty_message?: true | string | EmptyMessage;
  // A single resolved card. When the source config supplies `cards: [...]`,
  // it is collapsed into one `vertical-stack` card here.
  card: LovelaceCardConfig;
}

export interface TabGroup {
  // "row": a second-level tab row under the bar; "menu": a dropdown on the tab.
  display: "row" | "menu";
  items: { name?: string; icon?: string }[];
}

// Look of the second-level row a grouped tab gets (children_options win).
const SUB_DECK_DEFAULTS = {
  style: "text",
  align: "start",
  styles: { "--tabdeck-tab-height": "36px", "--tabdeck-tab-font-size": "13px" },
};

export interface AutoTabsConfig {
  // HA Jinja template, server-rendered, must yield a JSON list.
  template: string;
  // Optional per-item blueprint. When present, each list item fills its
  // {{ item }} / {{ item.prop }} / {{ index }} placeholders; when absent, each
  // list element is treated as a complete tab config.
  tab_template?: Record<string, any>;
  // Built-in source (areas/labels); the template is then generated.
  source?: AutoTabsSource;
  domains?: string[];
  exclude?: string[];
  // "tiles": area / floor / label tabs get auto-generated tile grids.
  content?: "entities" | "tiles";
}

export interface AutoRotateConfig {
  // Seconds between automatic tab advances.
  interval: number;
  // Seconds after the last interaction before rotation resumes.
  resume_after: number;
}

export interface SplitConfig {
  // Card width (px) at or above which tabs are shown side by side.
  min_width: number;
  columns: number;
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
  // A tab's badge jumps when its value changes.
  badge_bounce: boolean;
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
  // With lazy: build the tabs next to the open one ("idle"), or every tab one
  // at a time ("all"), while the browser is idle.
  preload?: "idle" | "all";
  unmount_hidden: boolean;
  swipe_wrap: boolean;
  swipe_mouse: boolean;
  // Scrolling the mouse wheel over the tab bar changes tab.
  wheel_switch: boolean;
  // Swipes (touch and swipe_mouse) only count when they start within this
  // many px of the content's left or right edge.
  swipe_edge?: number;
  // A swipe that starts on a slider or a map is left to that control.
  swipe_lock: boolean;
  animated: boolean;
  // The moving marker stretches to the new tab like a drop, then settles.
  liquid_indicator: boolean;
  accent_indicator: boolean;
  // A tab with a picture takes its accent from the picture's main colour.
  picture_accent: boolean;
  header: boolean;
  aria_label?: string;
  sticky: boolean;
  // A pinned bar (sticky / dock / scroll_spy) slides away while the page
  // scrolls down and returns when it scrolls up.
  bar_autohide: boolean;
  elevation: boolean;
  scroll_buttons: boolean;
  // Fade the edge(s) of an overflowing bar that have more tabs (on unless false).
  bar_fade: boolean;
  overflow_menu: boolean;
  // The ⋯ menu counts alerts/badges on tabs that don't fit (turns the menu on).
  hidden_alerts: boolean;
  // A chip at the end of the bar: true = "3 alerts", or text / { text, icon, color }.
  summary_chip?: true | { text?: string; icon?: string; color?: string };
  bar_background?: string;
  // Tab text colour over the bar background: worked out ("auto", also from
  // a picture), or light / dark text.
  bar_text?: "auto" | "light" | "dark";
  // Force left-to-right or right-to-left (default: Home Assistant's language).
  direction?: "ltr" | "rtl";
  // Date ranges that change the accent / bar background / styles.
  seasons?: Season[];
  // Frosted-glass bar and menus: true, or the blur in px.
  glass?: true | number;
  swipe: boolean;
  styles: Record<string, string>;
  tabs: TabdeckTabConfig[];
  auto_tabs?: AutoTabsConfig;
  auto_rotate?: AutoRotateConfig;
  // Seconds of inactivity before returning to the default tab.
  idle_return?: number;
  // Minutes without a touch anywhere on the page before the screen dims,
  // goes black or shows a clock (a touch wakes it).
  idle_dim?: IdleDimConfig;
  // Anchor mode: all panels stacked; the bar scrolls to / tracks sections.
  scroll_spy: boolean;
  // Tapping the active tab folds the content away (and back).
  collapsible: boolean;
  start_collapsed: boolean;
  // Wide cards: every content tab side by side, no bar.
  split?: SplitConfig;
  // Narrow cards (< narrow_width px): use this tab_display instead.
  tab_display_narrow?: TabDisplay;
  narrow_width: number;
  // Named style bundle (defaults under explicit keys).
  preset?: PresetName;
  // In dashboard edit mode / the editor preview, show hidden tabs (ghosted)
  // and pause auto_rotate / idle_return. On by default.
  edit_mode_reveal: boolean;
  // Phone-style navigation: the bar is pinned to the bottom of the screen.
  dock: boolean;
  // ‹ › buttons over the content to step to the previous / next tab.
  content_arrows: boolean;
  // Content only, no tab bar (menu-driven groups, or decks driven by
  // selectTab / remember: entity).
  hide_bar: boolean;
  // A 🔍 quick-switch filter over the tabs.
  search: boolean;
  // Keyboard shortcuts: 1–9 open tabs, [ ] step, / opens search.
  hotkeys: boolean;
  // Tab switches become browser history entries (Back returns to the
  // previous tab).
  history: boolean;
  // Let each person reorder / hide tabs for themselves (per browser).
  customize: boolean;
  // Left/right bars: icons until hovered / focused, then labels (overlay).
  rail_expand: boolean;
  // Panel animation length (ms) and CSS easing.
  transition_duration: number;
  transition_easing: string;
  // Narrow cards (< narrow_width px), e.g. phones: use this transition
  // instead (often `none`).
  transition_narrow?: PanelTransition;
  // "auto" (each tab its own height), "tallest" (the content keeps the
  // tallest tab's height, so the page doesn't jump) or a CSS length.
  content_height: string;
  // Content taller than this scrolls inside the card.
  content_max_height?: string;
  // Cards shown above the bar / below the content on every tab.
  header_cards?: LovelaceCardConfig[];
  footer_cards?: LovelaceCardConfig[];
  // An expand button that opens the active tab full screen.
  fullscreen: boolean;
  // While swiping, the content follows the finger and the next tab slides in.
  swipe_peek: boolean;
  // Holding a tab (without a hold_action) previews its content until released.
  hold_peek: boolean;
  // A dot on tabs whose entities changed since this browser last showed them.
  changed_dot: boolean;
  // Each browser puts the tabs it opens most first (order fixed per page load;
  // a customize order wins).
  sort_by_usage: boolean;
  // Tabs with at least this share (0–1) of their entities unavailable fade
  // and show a warning (`health_dim: true` = half).
  health_dim?: number;
  // Tabs whose alert is active move to the front.
  alert_first: boolean;
  // Minutes a long-press on an alerting tab silences its pulse.
  alert_snooze?: number;
  // Default tab by time of day ({ "06:00": Morning }) and by browser
  // ({ kitchen-panel: Cameras }; see deviceId()).
  default_by_time?: Record<string, any>;
  default_by_device?: Record<string, any>;
  // On load, open the tab this browser picks most around this hour (only
  // when nothing remembered, linked or configured decides it).
  learned_default?: LearnedDefault;
  // Fire a tabdeck_tab_changed event on every tab change (admin users only:
  // HA doesn't let other users fire events).
  fire_event: boolean;
  // This deck's name in events (default: storage_key).
  event_id?: string;
  // Follow this entity: when its state becomes a tab name, slug or index,
  // switch to that tab (input_text / input_select set by an automation).
  remote_entity?: string;
  // Switch on tabdeck_select events ({ tab, deck?, device? }; admin users).
  remote_event: boolean;
  // Show the tab for the room a presence entity reports (by `map`, a tab's
  // `area`, or its name).
  follow_room?: FollowRoom;
  // Jump to a tab for a while when an entity fires (a doorbell), with a
  // banner and countdown, then go back.
  takeover?: Takeover[];
  // A window ("22:00-07:00") and/or an entity that is on: nothing switches by
  // itself, alerts don't pulse, badges don't bounce, no click sound.
  quiet_hours?: QuietHours;
  // Minutes: a tab not opened for this long has its card freed (rebuilt
  // when it's opened again).
  unload_after?: number;
  // Keys applied to every tab (a tab's own keys win; styles merge).
  tab_defaults?: Record<string, any>;
  // Named tab blueprints; a tab with `use: <name>` and `vars` is filled from
  // one ({{ item.<var> }} tokens).
  tab_templates?: Record<string, Record<string, any>>;
  // Tabdeck Companion integration: a select entity per browser + deck.
  companion: boolean;
  // This browser's id for the companion (default: device name or a stored
  // random id).
  companion_id?: string;
  // A warning over the content while the connection to HA is down.
  offline_banner?: boolean;
  // Minutes per tab reported every this many minutes (companion or event).
  usage_stats?: number;
  // A panel under the card showing conditions, templates and timings;
  // "speed" also puts each tab's draw time on the bar.
  debug: boolean | "speed";
  // Companion-app vibration on tab switches the person makes.
  haptic?: HapticType;
  // A soft synthesised tick on those switches: the volume (0–1).
  click_sound?: number;
  // A "Home › Downstairs › Kitchen" trail over the content for grouped and
  // nested decks; `root` names a first crumb that returns to the default tab.
  breadcrumbs?: { root?: string };
  // Tab bar size: compact, default or comfortable.
  density: "compact" | "default" | "comfortable";
  // A grid button (and a pinch-in) that shows every tab as a live thumbnail.
  overview: boolean;
  // Ctrl+K (and a bar button) finds the tab that shows an entity.
  entity_search: boolean;
  // Decks with the same sync_group on a page switch tabs together (by name).
  sync_group?: string;
  // Open a tab in a dialog from a fire-dom-event action (tabdeck_popup);
  // "hidden" shows only the popups, not the deck.
  popup?: PopupMode;
  // A step-by-step guide: Back / Next and a progress bar instead of the bar.
  wizard?: WizardConfig;
  // A swap button in the bar that flips back to the tab open before.
  last_tab_button: boolean;
  // Drag tabs along the bar to reorder them, saved per browser (shares the
  // customize layout).
  drag_reorder: boolean;
  // Long-press a tab to show it beside the open one.
  compare: boolean;
  // A bar button that copies a #tab= link to the open tab ("qr": and shows
  // it as a QR code).
  share_button?: ShareMode;
  // The bar's position by screen orientation (overrides position).
  orientation_layout?: OrientationLayout;
  // Grey boxes in a tab until its card first has a height.
  loading_placeholder: boolean;
  // A broken card shows a plain-words message, and its tab a warning badge.
  friendly_errors: boolean;
  // Each tab remembers how far down the page it was scrolled.
  scroll_memory: boolean;
  // Big decks: the bar draws at most this many tabs (a page around the open
  // one); the ⋯ menu lists them all.
  bar_limit?: number;
}

const POSITIONS: TabPosition[] = ["top", "bottom", "left", "right"];
const STYLES: TabStyle[] = ["underline", "pill", "segmented", "boxed", "text", "rail"];
const REMEMBER: RememberMode[] = ["none", "browser", "url", "entity"];
const DISPLAYS: TabDisplay[] = ["both", "icon", "label", "active", "dots"];
const ALIGNS: TabAlign[] = ["start", "center", "end", "justify"];
const BADGE_DISPLAYS: BadgeDisplay[] = ["text", "dot"];
const TRANSITIONS: PanelTransition[] = ["none", "fade", "slide", "scale", "flip", "rise"];

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

function normalizeGlass(raw: any): true | number | undefined {
  if (raw === true) return true;
  const n = Number(raw);
  return raw !== false && raw !== null && raw !== "" && Number.isFinite(n) && n > 0 ? Math.min(n, 60) : undefined;
}

function normalizeSummary(raw: any): TabdeckCardConfig["summary_chip"] {
  if (raw === true) return true;
  const o = typeof raw === "string" ? { text: raw } : raw;
  if (!o || typeof o !== "object" || (typeof o.text !== "string" && o.text !== undefined)) return undefined;
  const out: { text?: string; icon?: string; color?: string } = {};
  if (o.text?.trim()) out.text = o.text;
  if (typeof o.icon === "string" && o.icon) out.icon = o.icon;
  if (typeof o.color === "string" && o.color) out.color = o.color;
  return out;
}

function normalizeBadges(raw: any): TabdeckTabConfig["badges"] {
  if (!Array.isArray(raw)) return undefined;
  const out = raw
    .filter((b) => b && typeof b === "object" && (b.badge || b.icon))
    .map((b) => {
      const o: { badge?: string | Record<string, any>; icon?: string; color?: string } = {};
      if (b.badge !== undefined && b.badge !== null && b.badge !== "") o.badge = typeof b.badge === "object" ? b.badge : String(b.badge);
      if (typeof b.icon === "string" && b.icon) o.icon = b.icon;
      if (typeof b.color === "string" && b.color) o.color = b.color;
      return o;
    });
  return out.length ? out : undefined;
}

export function normalizeTab(raw: any): TabdeckTabConfig {
  const attrs = raw?.attributes ?? {};
  // `cards: [...]` is a shorthand: wrap multiple cards in a stack so a tab can
  // hold more than one card without hand-writing it. With `columns: N` (>1) they
  // go in a grid instead of a vertical-stack.
  let card = raw?.card ?? {};
  let group: TabGroup | undefined;
  if (Array.isArray(raw?.children) && raw.children.length > 0) {
    // `children: [...]` — a group: the content is a nested deck of the
    // children (a sub-row, or bar-less behind a menu on this tab).
    const display = raw.children_display === "menu" ? "menu" : "row";
    const opts = raw.children_options && typeof raw.children_options === "object" ? raw.children_options : {};
    card = {
      type: "custom:tabdeck-card",
      ...SUB_DECK_DEFAULTS,
      ...opts,
      hide_bar: display === "menu",
      tabs: raw.children,
    };
    group = {
      display,
      items: raw.children.map((c: any) => ({ name: c?.name ?? c?.attributes?.label, icon: c?.icon })),
    };
  } else if (raw?.layout === "sections" && Array.isArray(raw?.sections) && raw.sections.length > 0) {
    const max = Number(raw?.max_columns);
    card = {
      type: "custom:tabdeck-sections-card",
      max_columns: Number.isFinite(max) && max >= 1 ? Math.round(max) : 4,
      sections: raw.sections,
    };
  } else if (Array.isArray(raw?.cards) && raw.cards.length > 0) {
    const cols = Number(raw?.columns);
    const minWidth = Number(raw?.min_column_width);
    card =
      raw?.layout === "masonry"
        ? {
            type: "custom:tabdeck-masonry-card",
            ...(Number.isFinite(minWidth) && minWidth > 0
              ? { min_column_width: minWidth }
              : { columns: Number.isFinite(cols) && cols >= 1 ? Math.round(cols) : 2 }),
            cards: raw.cards,
          }
        : Number.isFinite(cols) && cols > 1
        ? { type: "grid", columns: cols, square: false, cards: raw.cards }
        : { type: "vertical-stack", cards: raw.cards };
  } else if (!raw?.card) {
    card = shortcutCard(raw) ?? card;
  }
  return {
    name: raw?.name ?? attrs.label ?? undefined,
    subtitle: raw?.subtitle ?? undefined,
    icon: raw?.icon ?? attrs.icon ?? undefined,
    accent: raw?.accent ?? undefined,
    color: raw?.color ?? undefined,
    badge: raw?.badge ?? undefined,
    badge_color: raw?.badge_color ?? undefined,
    badge_icon: typeof raw?.badge_icon === "string" && raw.badge_icon ? raw.badge_icon : undefined,
    ring: raw?.ring === undefined || raw.ring === null || raw.ring === "" ? undefined : String(raw.ring),
    ring_max: Number(raw?.ring_max) > 0 ? Number(raw.ring_max) : undefined,
    ring_color: typeof raw?.ring_color === "string" && raw.ring_color ? raw.ring_color : undefined,
    ring_style: raw?.ring_style === "bar" ? "bar" : undefined,
    graph: normalizeGraph(raw?.graph) ? raw.graph : undefined,
    badges: normalizeBadges(raw?.badges),
    tooltip: typeof raw?.tooltip === "string" && raw.tooltip.trim() ? raw.tooltip : undefined,
    countdown: typeof raw?.countdown === "string" && raw.countdown.trim() ? raw.countdown.trim() : undefined,
    pin: raw?.pin === undefined || raw.pin === null || raw.pin === "" ? undefined : String(raw.pin),
    pin_timeout: Number(raw?.pin_timeout) > 0 ? Number(raw.pin_timeout) : undefined,
    area: typeof raw?.area === "string" && raw.area ? raw.area : undefined,
    floor: typeof raw?.floor === "string" && raw.floor ? raw.floor : undefined,
    label: typeof raw?.label === "string" && raw.label ? raw.label : undefined,
    domains: Array.isArray(raw?.domains) && raw.domains.length ? raw.domains.map(String) : undefined,
    badge_format: normalizeBadgeFormat(raw?.badge_format),
    disabled: raw?.disabled ? true : undefined,
    fab: raw?.fab ? true : undefined,
    card_size: typeof raw?.card_size === "number" ? raw.card_size : undefined,
    hold_action: raw?.hold_action ?? undefined,
    badge_action: raw?.badge_action ?? undefined,
    double_tap_action: actionOrUndefined(raw?.double_tap_action),
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
    background: typeof raw?.background === "string" && raw.background.trim() ? raw.background : undefined,
    page_background: typeof raw?.page_background === "string" && raw.page_background.trim() ? raw.page_background : undefined,
    layout:
      raw?.layout === "masonry" && Array.isArray(raw?.cards) && raw.cards.length > 0
        ? "masonry"
        : raw?.layout === "sections" && Array.isArray(raw?.sections) && raw.sections.length > 0 && !group
          ? "sections"
          : undefined,
    styles:
      raw?.styles && typeof raw.styles === "object" && !Array.isArray(raw.styles)
        ? raw.styles
        : undefined,
    icon_animation: typeof raw?.icon_animation === "string" && raw.icon_animation ? raw.icon_animation : undefined,
    picture: typeof raw?.picture === "string" && raw.picture.trim() ? raw.picture.trim() : undefined,
    font_size: cssLength(raw?.font_size),
    font_weight: safeCss(raw?.font_weight),
    font_family: safeCss(raw?.font_family),
    pip: raw?.pip ? true : undefined,
    keep_awake: raw?.keep_awake ? true : undefined,
    watch: Array.isArray(raw?.watch) ? raw.watch.map(String) : typeof raw?.watch === "string" && raw.watch ? [raw.watch] : undefined,
    separator: raw?.separator === "line" || raw?.separator === "space" ? raw.separator : undefined,
    tab_ref: typeof raw?.tab_ref === "string" && raw.tab_ref.trim() ? raw.tab_ref.trim() : undefined,
    use: typeof raw?.use === "string" && raw.use ? raw.use : undefined,
    vars: raw?.vars && typeof raw.vars === "object" && !Array.isArray(raw.vars) ? raw.vars : undefined,
    view: typeof raw?.view === "string" ? raw.view.trim() || undefined : raw?.view && typeof raw.view === "object" ? raw.view : undefined,
    url: typeof raw?.url === "string" && raw.url.trim() ? raw.url.trim() : undefined,
    aspect_ratio:
      typeof raw?.aspect_ratio === "string" || typeof raw?.aspect_ratio === "number" ? String(raw.aspect_ratio).trim() || undefined : undefined,
    markdown: typeof raw?.markdown === "string" && raw.markdown.trim() ? raw.markdown : undefined,
    empty_message: normalizeEmpty(raw?.empty_message) ? raw.empty_message : undefined,
    zoom: normalizeZoom(raw?.zoom),
    padding: lengthOrZero(raw?.padding),
    spacing: lengthOrZero(raw?.spacing),
    auto_refresh: Number(raw?.auto_refresh) > 0 ? Math.max(0.1, Number(raw.auto_refresh)) : undefined,
    group,
    children: group ? raw.children : undefined,
    children_display: group ? group.display : undefined,
    children_options: group && raw.children_options && typeof raw.children_options === "object" ? raw.children_options : undefined,
    card,
  };
}

// A tab whose tap runs an action rather than showing a panel.
export function isActionTab(tab: TabdeckTabConfig | undefined): boolean {
  return !!tab?.tap_action;
}

function normalizeAutoTabs(raw: any): AutoTabsConfig | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  if (SOURCES.includes(raw.source)) {
    const domains = Array.isArray(raw.domains) ? raw.domains.map(String) : undefined;
    const exclude = Array.isArray(raw.exclude) ? raw.exclude.map(String) : undefined;
    const content = raw.content === "tiles" ? ("tiles" as const) : undefined;
    return {
      source: raw.source,
      domains,
      exclude,
      content,
      template: buildSourceTemplate({ source: raw.source, domains, exclude }),
      tab_template:
        raw.tab_template && typeof raw.tab_template === "object"
          ? raw.tab_template
          : defaultTabTemplate({ source: raw.source, content, domains }),
    };
  }
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

// `split: 900` or `{ min_width: 900, columns: 2 }`.
// A CSS value that can't escape its declaration (numbers allowed).
function safeCss(raw: any): string | undefined {
  if (typeof raw === "number" && Number.isFinite(raw)) return String(raw);
  if (typeof raw !== "string" || !raw.trim() || /[;{}<>]/.test(raw)) return undefined;
  return raw.trim();
}

function plainMap(raw: any): Record<string, any> | undefined {
  return raw && typeof raw === "object" && !Array.isArray(raw) && Object.keys(raw).length ? raw : undefined;
}

function cardList(raw: any): LovelaceCardConfig[] | undefined {
  return Array.isArray(raw) && raw.length > 0 ? raw : undefined;
}

// `content_height: auto | tallest | <length>`.
function normalizeContentHeight(raw: any): string {
  if (raw === "tallest") return "tallest";
  return cssLength(raw) ?? "auto";
}

function normalizeSplit(raw: any): SplitConfig | undefined {
  const obj = typeof raw === "object" && raw !== null ? raw : { min_width: raw };
  const min = Number(obj.min_width);
  if (!Number.isFinite(min) || min <= 0) return undefined;
  return { min_width: min, columns: Math.round(clampNumber(obj.columns, 2, 4, 2)) };
}

// Merge `over` onto `base`, with `styles` maps merged rather than replaced.
function layer(base: Record<string, any>, over: Record<string, any>): Record<string, any> {
  const out = { ...base, ...over };
  if (base.styles || over.styles) out.styles = { ...(base.styles ?? {}), ...(over.styles ?? {}) };
  return out;
}

// A raw tab with its tab_templates blueprint (use + vars) and tab_defaults
// applied: defaults < template < the tab's own keys. Defaults never set a
// name or a card.
export function expandTab(raw: any, templates?: Record<string, any>, defaults?: Record<string, any>): any {
  if (!raw || typeof raw !== "object") return raw;
  let tab = raw;
  const blueprint = typeof raw.use === "string" ? templates?.[raw.use] : undefined;
  if (blueprint && typeof blueprint === "object") {
    tab = layer(substituteTokens(blueprint, raw.vars ?? {}, 0), raw);
  }
  if (defaults) {
    const { name: _name, card: _card, cards: _cards, ...rest } = defaults;
    tab = layer(rest, tab);
  }
  return tab;
}

// `expand: false` (the editor) keeps tab_defaults / tab_templates / use as
// written instead of applying them to the tabs.
export function normalizeConfig(raw: any, opts: { expand?: boolean } = {}): TabdeckCardConfig {
  raw = withPreset(raw);
  const tabDefaults = plainMap(raw?.tab_defaults);
  const tabTemplates = plainMap(raw?.tab_templates);
  const written = Array.isArray(raw?.tabs) ? raw.tabs : [];
  const tabs = opts.expand === false ? written : written.map((t: any) => expandTab(t, tabTemplates, tabDefaults));
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
    badge_bounce: Boolean(raw?.badge_bounce),
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
    preload: raw?.preload === true || raw?.preload === "idle" ? "idle" : raw?.preload === "all" ? "all" : undefined,
    unmount_hidden: Boolean(raw?.unmount_hidden),
    swipe_wrap: Boolean(raw?.swipe_wrap),
    swipe_mouse: Boolean(raw?.swipe_mouse),
    wheel_switch: Boolean(raw?.wheel_switch),
    swipe_lock: Boolean(raw?.swipe_lock),
    swipe_edge: raw?.swipe_edge === true ? 40 : typeof raw?.swipe_edge === "number" ? clampNumber(raw.swipe_edge, 8, 400, 40) : undefined,
    animated: raw?.animated === undefined ? true : Boolean(raw.animated),
    liquid_indicator: Boolean(raw?.liquid_indicator),
    accent_indicator: raw?.accent_indicator === undefined ? true : Boolean(raw.accent_indicator),
    picture_accent: Boolean(raw?.picture_accent),
    header: Boolean(raw?.header),
    aria_label: raw?.aria_label ?? undefined,
    sticky: Boolean(raw?.sticky),
    bar_autohide: Boolean(raw?.bar_autohide),
    elevation: Boolean(raw?.elevation),
    scroll_buttons: Boolean(raw?.scroll_buttons),
    bar_fade: raw?.bar_fade !== false,
    overflow_menu: Boolean(raw?.overflow_menu),
    hidden_alerts: Boolean(raw?.hidden_alerts),
    summary_chip: normalizeSummary(raw?.summary_chip),
    bar_background: raw?.bar_background ?? undefined,
    glass: normalizeGlass(raw?.glass),
    seasons: normalizeSeasons(raw?.seasons),
    direction: raw?.direction === "rtl" || raw?.direction === "ltr" ? raw.direction : undefined,
    bar_text: raw?.bar_text === true ? "auto" : ["auto", "light", "dark"].includes(raw?.bar_text) ? raw.bar_text : undefined,
    swipe: Boolean(raw?.swipe),
    styles: raw?.styles ?? {},
    tabs: tabs.map(normalizeTab),
    auto_tabs,
    auto_rotate: normalizeAutoRotate(raw?.auto_rotate),
    scroll_spy: Boolean(raw?.scroll_spy),
    split: normalizeSplit(raw?.split),
    tab_display_narrow: DISPLAYS.includes(raw?.tab_display_narrow)
      ? raw.tab_display_narrow
      : undefined,
    narrow_width: clampNumber(raw?.narrow_width, 100, 4000, 450),
    preset: isPreset(raw?.preset) ? raw.preset : undefined,
    collapsible: Boolean(raw?.collapsible),
    start_collapsed: Boolean(raw?.collapsible && raw?.start_collapsed),
    idle_return:
      Number(raw?.idle_return) > 0 ? Math.max(5, Number(raw.idle_return)) : undefined,
    idle_dim: normalizeIdleDim(raw?.idle_dim),
    dock: Boolean(raw?.dock),
    content_arrows: Boolean(raw?.content_arrows),
    hide_bar: Boolean(raw?.hide_bar),
    search: Boolean(raw?.search),
    hotkeys: Boolean(raw?.hotkeys),
    history: Boolean(raw?.history),
    customize: Boolean(raw?.customize),
    rail_expand: Boolean(raw?.rail_expand),
    edit_mode_reveal: raw?.edit_mode_reveal === undefined ? true : Boolean(raw.edit_mode_reveal),
    transition_duration: clampNumber(raw?.transition_duration, 0, 2000, 180),
    transition_narrow: TRANSITIONS.includes(raw?.transition_narrow) ? raw.transition_narrow : undefined,
    transition_easing:
      typeof raw?.transition_easing === "string" && raw.transition_easing.trim() && !/[;{}"<>]/.test(raw.transition_easing)
        ? raw.transition_easing.trim()
        : "ease",
    content_height: normalizeContentHeight(raw?.content_height),
    content_max_height: cssLength(raw?.content_max_height),
    header_cards: cardList(raw?.header_cards),
    footer_cards: cardList(raw?.footer_cards),
    fullscreen: Boolean(raw?.fullscreen),
    swipe_peek: Boolean(raw?.swipe_peek),
    hold_peek: Boolean(raw?.hold_peek),
    changed_dot: Boolean(raw?.changed_dot),
    sort_by_usage: Boolean(raw?.sort_by_usage),
    health_dim: healthThreshold(raw?.health_dim),
    alert_first: Boolean(raw?.alert_first),
    alert_snooze: Number(raw?.alert_snooze) > 0 ? Number(raw.alert_snooze) : undefined,
    default_by_time: plainMap(raw?.default_by_time),
    default_by_device: plainMap(raw?.default_by_device),
    learned_default: normalizeLearned(raw?.learned_default),
    fire_event: Boolean(raw?.fire_event),
    event_id: typeof raw?.event_id === "string" && raw.event_id ? raw.event_id : undefined,
    remote_entity: typeof raw?.remote_entity === "string" && raw.remote_entity ? raw.remote_entity : undefined,
    remote_event: Boolean(raw?.remote_event),
    follow_room: normalizeFollowRoom(raw?.follow_room),
    takeover: normalizeTakeovers(raw?.takeover),
    quiet_hours: normalizeQuiet(raw?.quiet_hours),
    tab_defaults: tabDefaults,
    tab_templates: tabTemplates,
    companion: raw?.companion === true,
    companion_id: typeof raw?.companion_id === "string" && raw.companion_id.trim() ? raw.companion_id.trim() : undefined,
    usage_stats: normalizeUsageStats(raw?.usage_stats),
    offline_banner: raw?.offline_banner === true ? true : undefined,
    debug: raw?.debug === "speed" ? "speed" : Boolean(raw?.debug),
    haptic: raw?.haptic === true ? "selection" : HAPTICS.includes(raw?.haptic) ? raw.haptic : undefined,
    click_sound: normalizeClickSound(raw?.click_sound),
    breadcrumbs:
      raw?.breadcrumbs === true
        ? {}
        : raw?.breadcrumbs && typeof raw.breadcrumbs === "object"
          ? { root: typeof raw.breadcrumbs.root === "string" && raw.breadcrumbs.root ? raw.breadcrumbs.root : undefined }
          : undefined,
    density: raw?.density === "compact" || raw?.density === "comfortable" ? raw.density : "default",
    unload_after: Number(raw?.unload_after) > 0 ? Math.max(1, Number(raw.unload_after)) : undefined,
    overview: Boolean(raw?.overview),
    entity_search: Boolean(raw?.entity_search),
    sync_group: normalizeSyncGroup(raw?.sync_group),
    popup: normalizePopup(raw?.popup),
    wizard: normalizeWizard(raw?.wizard),
    last_tab_button: Boolean(raw?.last_tab_button),
    drag_reorder: Boolean(raw?.drag_reorder),
    compare: Boolean(raw?.compare),
    share_button: normalizeShare(raw?.share_button),
    orientation_layout: normalizeOrientation(raw?.orientation_layout),
    loading_placeholder: Boolean(raw?.loading_placeholder),
    friendly_errors: Boolean(raw?.friendly_errors),
    scroll_memory: Boolean(raw?.scroll_memory),
    bar_limit: normalizeBarLimit(raw?.bar_limit),
  };
}

export interface FollowRoom {
  entity: string;
  // Entity state -> tab (name, slug or index), checked before areas and names.
  map?: Record<string, any>;
}

// `follow_room: sensor.my_room` or `{ entity, map: { kitchen: Cooking } }`.
export function normalizeFollowRoom(raw: any): FollowRoom | undefined {
  const entity = typeof raw === "string" ? raw : raw?.entity;
  if (typeof entity !== "string" || !entity.trim()) return undefined;
  const map = typeof raw === "object" ? plainMap(raw.map) : undefined;
  return map ? { entity: entity.trim(), map } : { entity: entity.trim() };
}

export interface LearnedDefault {
  // Picks around this hour before a tab is learned (default 3).
  min_uses: number;
  // A dismissible note saying why the tab opened (default on).
  notice: boolean;
}

// `learned_default: true` or `{ min_uses: 5, notice: false }`.
export function normalizeLearned(raw: any): LearnedDefault | undefined {
  if (!raw) return undefined;
  const o = typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const n = Number(o.min_uses);
  return { min_uses: Number.isFinite(n) && n >= 1 ? Math.min(100, Math.round(n)) : 3, notice: o.notice === undefined ? true : Boolean(o.notice) };
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
