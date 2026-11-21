// Visual editor layout: which deck setting sits in which folding section,
// plus the small pure helpers behind the editor's search box, section
// summaries and config-check links. Editor-only (imported by src/editor/).

export interface EditorSection {
  // Section id (labels: editor.section.<id>); also the key for its open state.
  id: string;
  // ha-icon name shown in the section header.
  icon: string;
  // Top-level settings in this section, in display order.
  fields: string[];
  // Settings whose value is always named in the header summary.
  lead?: string[];
}

// Every top-level visual-editor field appears in exactly one section
// (editor-sections.test.ts checks this against the editor's own field list).
export const EDITOR_SECTIONS: EditorSection[] = [
  {
    id: "look",
    icon: "mdi:palette-outline",
    lead: ["style", "tab_display"],
    fields: [
      "preset", "style", "tab_display", "density", "tab_display_narrow", "narrow_width",
      "accent_indicator", "animated", "liquid_indicator", "indicator_size", "indicator_radius",
      "picture_accent", "glass", "elevation", "bar_background", "bar_text", "header",
      "content_height", "content_max_height", "split", "scroll_spy",
    ],
  },
  {
    id: "bar",
    icon: "mdi:dock-top",
    lead: ["position", "align"],
    fields: [
      "position", "orientation_layout", "align", "scrollable", "bar_fade", "scroll_buttons", "overflow_menu",
      "bar_limit", "sticky", "bar_autohide", "dock", "rail_expand", "collapsible", "start_collapsed",
      "wizard", "breadcrumbs", "customize", "drag_reorder", "sort_by_usage",
    ],
  },
  {
    id: "badges",
    icon: "mdi:numeric-3-circle-outline",
    fields: [
      "badge_display", "hide_inactive_badge", "badge_bounce", "summary_chip", "hidden_alerts",
      "alert_first", "alert_snooze", "changed_dot", "health_dim",
    ],
  },
  {
    id: "move",
    icon: "mdi:gesture-swipe",
    fields: [
      "swipe", "swipe_mouse", "swipe_wrap", "swipe_edge", "swipe_lock", "swipe_peek", "wheel_switch",
      "transition", "transition_narrow", "transition_duration", "transition_easing", "hotkeys",
      "content_arrows", "history", "search", "entity_search", "overview", "last_tab_button",
      "hold_peek", "compare", "haptic",
    ],
  },
  {
    id: "start",
    icon: "mdi:home-import-outline",
    lead: ["default_tab", "remember"],
    fields: ["default_tab", "remember", "remember_entity", "storage_key", "learned_default", "idle_return", "scroll_memory"],
  },
  {
    id: "auto",
    icon: "mdi:robot-outline",
    fields: ["remote_entity", "follow_room", "remote_event", "fire_event", "event_id", "sync_group", "popup", "companion", "usage_stats"],
  },
  {
    id: "kiosk",
    icon: "mdi:tablet",
    fields: ["idle_dim", "idle_dim_mode", "auto_rotate", "click_sound", "fullscreen", "offline_banner"],
  },
  {
    id: "perf",
    icon: "mdi:speedometer",
    fields: ["lazy", "preload", "unmount_hidden", "unload_after", "loading_placeholder", "friendly_errors"],
  },
  {
    id: "adv",
    icon: "mdi:cog-outline",
    fields: ["debug", "edit_mode_reveal", "share_button", "aria_label"],
  },
];

// The tab list section (always first).
export const TABS_SECTION = "tabs";

export function sectionOf(field: string): EditorSection | undefined {
  return EDITOR_SECTIONS.find((s) => s.fields.includes(field));
}

// Lower case without accents, so "défaut" matches "defaut".
export function fold(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Search words from the box; every word must match.
export function searchWords(query: string): string[] {
  return fold(query).split(/\s+/).filter(Boolean);
}

export function matchesWords(haystack: string, words: string[]): boolean {
  if (!words.length) return true;
  const h = fold(haystack);
  return words.every((w) => h.includes(w));
}

// Fields whose editor value differs from the value a deck without that
// option would show. Values are compared as JSON.
export function changedFields(data: Record<string, unknown>, defaults: Record<string, unknown>, fields: string[]): string[] {
  const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  return fields.filter((f) => !same(data[f], defaults[f]));
}

// Which sections are open, per browser. Tabs is open unless closed.
const OPEN_KEY = "tabdeck-editor-sections";

export function readOpenSections(): Record<string, boolean> {
  try {
    const raw = JSON.parse(localStorage.getItem(OPEN_KEY) ?? "null");
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const out: Record<string, boolean> = {};
      for (const [k, v] of Object.entries(raw)) if (typeof v === "boolean") out[k] = v;
      return { [TABS_SECTION]: true, ...out };
    }
  } catch {
    /* storage blocked or bad JSON: defaults */
  }
  return { [TABS_SECTION]: true };
}

export function writeOpenSections(open: Record<string, boolean>): void {
  try {
    localStorage.setItem(OPEN_KEY, JSON.stringify(open));
  } catch {
    /* storage blocked: open state lasts until the editor closes */
  }
}

// Where a config-check note's "Show" link goes: a setting, or a tab by name.
const RULE_FIELD: Record<string, string> = {
  dock_wizard: "dock",
  dock_hide_bar: "dock",
  remember_entity: "remember_entity",
  default_tab: "default_tab",
  many_tabs: "lazy",
  preload_all: "preload",
};

export function lintTarget(note: { rule: string; vars?: Record<string, string | number> }): { field?: string; tab?: string } | undefined {
  const v = note.vars ?? {};
  if (typeof v.tab === "string") return { tab: v.tab };
  const field = RULE_FIELD[note.rule] ?? (typeof v.key === "string" ? v.key : undefined);
  return field && sectionOf(field) ? { field } : undefined;
}
