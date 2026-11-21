// Config check for the visual editor: settings that clash, settings that do
// nothing without another one, unknown keys (typos) and slow setups. Works on
// the raw config as written (before normalizeConfig drops unknown keys).
// Each note is a translation key (editor: lint.<rule>) with its values.
import { TAB_KEYS, TOP_KEYS } from "./schema-keys";
import { normalizeConfig } from "./config";
import { slugify } from "./persistence";

export type LintLevel = "warn" | "info" | "perf";

export interface LintNote {
  level: LintLevel;
  rule: string;
  vars?: Record<string, string | number>;
}

// Keys Home Assistant itself adds to any card's config.
const HA_CARD_KEYS = new Set(["type", "grid_options", "view_layout", "layout_options", "visibility"]);

// A deck this big loads noticeably slower without lazy.
export const MANY_TABS = 15;
// Tab-level templates are one live subscription each.
export const MANY_TEMPLATES = 30;

const isObj = (v: any): v is Record<string, any> => !!v && typeof v === "object" && !Array.isArray(v);
const has = (v: any) => v !== undefined && v !== null && v !== "" && v !== false;
const tabName = (t: any, i: number) => (typeof t?.name === "string" && t.name ? t.name : `#${i + 1}`);

function allTabs(tabs: any): any[] {
  const out: any[] = [];
  const walk = (list: any) => {
    for (const t of Array.isArray(list) ? list : []) {
      if (!isObj(t)) continue;
      out.push(t);
      walk(t.children);
    }
  };
  walk(tabs);
  return out;
}

function countTemplates(v: any): number {
  if (typeof v === "string") return v.includes("{{") || v.includes("{%") ? 1 : 0;
  if (Array.isArray(v)) return v.reduce((n, x) => n + countTemplates(x), 0);
  if (isObj(v)) return Object.values(v).reduce((n: number, x) => n + countTemplates(x), 0);
  return 0;
}

// The values normalizeConfig fills in: the visual editor writes them out, so
// they count as not set.
let defaults: Record<string, any> | undefined;
const isDefault = (key: string, v: any): boolean => {
  defaults ??= normalizeConfig({ tabs: [{ name: "a" }] }) as any;
  return JSON.stringify(defaults![key]) === JSON.stringify(v);
};

export function lintConfig(input: any): LintNote[] {
  if (!isObj(input)) return [];
  const raw: Record<string, any> = Object.fromEntries(Object.entries(input).filter(([k, v]) => k === "tabs" || !isDefault(k, v)));
  const notes: LintNote[] = [];
  const add = (level: LintLevel, rule: string, vars?: Record<string, string | number>) => notes.push({ level, rule, vars });
  const top: any[] = Array.isArray(raw.tabs) ? raw.tabs.filter(isObj) : [];
  const tabs = allTabs(raw.tabs);
  const tabDefaults = isObj(raw.tab_defaults) ? raw.tab_defaults : {};
  const tabHas = (t: any, key: string) => has(t[key]) || has(tabDefaults[key]);

  // --- clashes ---------------------------------------------------------------
  if (raw.dock && raw.wizard) add("warn", "dock_wizard");
  if (raw.dock && raw.hide_bar) add("warn", "dock_hide_bar");
  if (raw.remember === "entity" && !raw.remember_entity) add("warn", "remember_entity");
  if (has(raw.default_tab) && top.length && !raw.auto_tabs) {
    const d = raw.default_tab;
    const ok =
      typeof d === "number" ? d >= 0 && d < top.length : top.some((t, i) => t.name === d || String(i) === String(d));
    if (!ok) add("warn", "default_tab", { value: String(d) });
  }

  // --- automatic switches into a PIN-locked tab (they never open it) --------
  const pinned = (t: any) => tabHas(t, "pin");
  const refTab = (ref: any): any => {
    if (typeof ref === "number" || (typeof ref === "string" && /^\d+$/.test(ref.trim()) && !top.some((t) => t.name === ref))) return top[Number(ref)];
    if (typeof ref !== "string") return undefined;
    return top.find((t) => t.name === ref) ?? top.find((t) => typeof t.name === "string" && slugify(t.name) === slugify(ref));
  };
  const pinWarn = (key: string, targets: any[]) => {
    const seen = new Set<any>();
    for (const t of targets) {
      if (!t || seen.has(t) || !pinned(t)) continue;
      seen.add(t);
      add("warn", "pin_auto", { tab: tabName(t, top.indexOf(t)), key });
    }
  };
  const takeovers = Array.isArray(raw.takeover) ? raw.takeover : raw.takeover ? [raw.takeover] : [];
  pinWarn("takeover", takeovers.map((t: any) => (isObj(t) ? refTab(t.tab) : undefined)));
  if (isObj(raw.follow_room) && isObj(raw.follow_room.map)) pinWarn("follow_room", Object.values(raw.follow_room.map).map(refTab));
  // remote_entity can be set to any tab.
  if (has(raw.remote_entity)) pinWarn("remote_entity", top);

  // --- does nothing without another option ----------------------------------
  const swipes = raw.swipe || raw.swipe_mouse;
  for (const key of ["swipe_lock", "swipe_edge"]) {
    if (has(raw[key]) && !swipes) add("info", "needs", { key, other: "swipe / swipe_mouse" });
  }
  // The peek follows a finger: touch swiping only.
  if (raw.swipe_peek && !raw.swipe) add("info", "needs", { key: "swipe_peek", other: "swipe" });
  if (raw.swipe_wrap && !swipes && !raw.hotkeys && !raw.content_arrows) {
    add("info", "needs", { key: "swipe_wrap", other: "swipe / hotkeys / content_arrows" });
  }
  if (has(raw.preload) && !raw.lazy) add("info", "needs", { key: "preload", other: "lazy" });
  if (raw.start_collapsed && !raw.collapsible) add("info", "needs", { key: "start_collapsed", other: "collapsible" });
  if (has(raw.event_id) && !raw.fire_event && !raw.remote_event) {
    add("info", "needs", { key: "event_id", other: "fire_event / remote_event" });
  }
  const transition = raw.transition && raw.transition !== "none";
  const narrow = raw.transition_narrow && raw.transition_narrow !== "none";
  for (const key of ["transition_duration", "transition_easing"]) {
    if (has(raw[key]) && !transition && !narrow) add("info", "needs", { key, other: "transition" });
  }
  const alerts = tabs.some((t) => tabHas(t, "alert"));
  for (const key of ["alert_first", "alert_snooze", "hidden_alerts"]) {
    if (has(raw[key]) && !alerts) add("info", "needs_tab", { key, other: "alert" });
  }
  tabs.forEach((t, i) => {
    const tab = tabName(t, i);
    if (has(t.badge_color) && !tabHas(t, "badge") && !tabHas(t, "badge_icon")) {
      add("info", "tab_needs", { tab, key: "badge_color", other: "badge" });
    }
    for (const key of ["ring_max", "ring_color", "ring_style"]) {
      if (has(t[key]) && !tabHas(t, "ring")) add("info", "tab_needs", { tab, key, other: "ring" });
    }
    if (has(t.pin_timeout) && !tabHas(t, "pin")) add("info", "tab_needs", { tab, key: "pin_timeout", other: "pin" });
  });

  // --- unknown keys (typos): the visual editor drops them on save ------------
  // (Keys holding undefined aren't written out.)
  for (const key of Object.keys(raw)) {
    if (raw[key] === undefined) continue;
    if (!TOP_KEYS.has(key) && !HA_CARD_KEYS.has(key)) add("warn", "unknown", { key });
  }
  tabs.forEach((t, i) => {
    for (const key of Object.keys(t)) {
      if (t[key] !== undefined && !TAB_KEYS.has(key)) add("warn", "unknown_tab", { tab: tabName(t, i), key });
    }
  });

  // --- slow setups ------------------------------------------------------------
  if (tabs.length >= MANY_TABS && !raw.lazy) add("perf", "many_tabs", { count: tabs.length });
  if (raw.lazy && raw.preload === "all" && tabs.length >= MANY_TABS) add("perf", "preload_all", { count: tabs.length });
  tabs.forEach((t, i) => {
    const r = Number(t.auto_refresh);
    if (Number.isFinite(r) && r > 0 && r < 1) add("perf", "fast_refresh", { tab: tabName(t, i) });
  });
  // Tab-level fields only (a tab's card renders its own templates).
  const templates = tabs.reduce((n, t) => {
    const { card: _c, cards: _cs, children: _ch, ...fields } = t;
    return n + countTemplates(fields);
  }, 0);
  if (templates > MANY_TEMPLATES) add("perf", "templates", { count: templates });

  return notes;
}
