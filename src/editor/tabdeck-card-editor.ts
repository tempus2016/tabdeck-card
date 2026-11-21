import "../translations/editor";
import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fireEvent } from "custom-card-helpers";
import type { HomeAssistant } from "../types";
import { normalizeConfig, normalizeTab, type TabdeckCardConfig } from "../lib/config";
import { isTemplate, makeHassSubscribe, TemplateRenderer } from "../lib/templates";
import { conditionsSignature, explainConditions, type ConditionExplanation } from "../lib/explain";
import { hasKey, hassLanguage, LanguageController, localize, plural, resolveLanguage } from "../lib/i18n";
import { summarizeConfig, type SummaryLine } from "../lib/summary";
import { CURRENT_VERSION, dismissNote, dismissedNote, noteKey, pendingNote } from "./whats-new";
import { lintConfig, type LintLevel } from "../lib/lint";
import { applyStarter, buildStarter, STARTERS, type StarterKind } from "../lib/starters";
import { applyConversion, convertConfig, type ConvertResult } from "../lib/convert";
import { deckToSectionsView } from "../lib/export";
import { toYaml } from "../lib/yaml-dump";
import { PRESET_NAMES, applyPresetToConfig, isPreset } from "../lib/presets";
import { reducedMotion, reducedMotionCss } from "../lib/motion";
import { isDefaultTabTemplate } from "../lib/sources";
import { cssLength } from "../lib/layout";
import { UndoStack, changeLabel } from "../lib/undo";
import { suggestIcons } from "../lib/icon-suggest";
import { loadRegistries, roomList, roomTabs, type Room } from "../lib/room-wizard";
import { createInstantDashboard } from "../lib/instant-dashboard";
import { applyStylePreset, readStylePreset, type PresetError } from "../lib/style-preset";
import { isShortcutCard, shortcutCard } from "../lib/shortcuts";
import { lengthOrZero, normalizeZoom } from "../lib/size";
import { normalizeBarLimit } from "../lib/bar-window";
import { contrastRatio, cssColor, isThemeColor, parseRgb } from "../lib/color";
import {
  EDITOR_SECTIONS,
  TABS_SECTION,
  changedFields,
  lintTarget,
  matchesWords,
  readOpenSections,
  searchWords,
  sectionOf,
  writeOpenSections,
  type EditorSection,
} from "../lib/editor-sections";
import "../components/tabdeck-tabbar";

// MDI icon paths for the per-tab reorder/delete buttons. Inlined rather than
// pulling in @mdi/js so the bundle stays dependency-free.
const MDI_ARROW_UP = "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";
const MDI_ARROW_DOWN = "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z";
const MDI_DELETE =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const MDI_PLUS = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const MDI_COPY =
  "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
const MDI_DRAG =
  "M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z";
const MDI_EXPORT =
  "M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z";
const MDI_IMPORT =
  "M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z";
const MDI_CREATION =
  "M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74";
const MDI_SWAP =
  "M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z";
const MDI_VIEW_DASHBOARD =
  "M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z";
const MDI_UNDO =
  "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z";
const MDI_REDO =
  "M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z";
const MDI_CLIPBOARD_CHECK =
  "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z";
const LINT_ICONS: Record<LintLevel, string> = {
  warn: "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",
  info: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
  perf: "M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z",
};
const MDI_PALETTE =
  "M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z";
const MDI_AUTO_FIX =
  "M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z";
const MDI_TEXT_BOX =
  "M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z";
const MDI_GIFT =
  "M9.06,1.93C7.17,1.92 5.33,3.74 6.17,6H3A2,2 0 0,0 1,8V10A1,1 0 0,0 2,11H11V8H13V11H22A1,1 0 0,0 23,10V8A2,2 0 0,0 21,6H17.83C19,2.73 14.6,0.42 12.57,3.24L12,4L11.43,3.22C10.8,2.33 9.93,1.94 9.06,1.93M9,4C9.89,4 10.34,5.08 9.71,5.71C9.08,6.34 8,5.89 8,5A1,1 0 0,1 9,4M15,4C15.89,4 16.34,5.08 15.71,5.71C15.08,6.34 14,5.89 14,5A1,1 0 0,1 15,4M2,12V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V12H13V20H11V12H2Z";
const MDI_CLOSE =
  "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
const MDI_CHEVRON_DOWN = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
const MDI_MAGNIFY =
  "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
const MDI_CHECKBOX_MULTIPLE =
  "M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z";

// Fallback icon shown in a collapsed tab header when the tab has no icon set.
const DEFAULT_TAB_ICON = "mdi:tab";

// Per-tab field schema for ha-form. The `icon` selector renders HA's native
// searchable icon picker (with live previews); the text/select/boolean
// selectors let ha-form resolve the right sub-elements for whatever HA frontend
// version is running, so we never hard-code version-specific element names.
// Colour fields get HA's colour picker (theme colours) while empty or set to a
// theme colour; a custom CSS value (hex, var(), gradient) keeps a text field.
const COLOR_FIELDS = new Set(["accent", "color", "badge_color", "ring_color"]);

function tabSchema(tab: Record<string, any>, opts: (values: string[], field: string) => any[]) {
  return TAB_SCHEMA.map((f) => {
    if (COLOR_FIELDS.has(f.name) && (!tab[f.name] || isThemeColor(tab[f.name]))) {
      return { name: f.name, selector: { ui_color: {} } };
    }
    if (f.name === "separator") {
      return { name: f.name, selector: { select: { mode: "dropdown", options: opts(["", "line", "space"], "separator") } } };
    }
    if (f.name === "icon_animation") {
      return { name: f.name, selector: { select: { mode: "dropdown", options: opts(["", "spin", "pulse", "bounce", "shake", "beat"], "icon_animation") } } };
    }
    return f;
  });
}

// Tab keys that expand into the tab's card (src/lib/shortcuts.ts).
const SHORTCUT_KEYS = ["view", "url", "aspect_ratio", "markdown"];

const TAB_SCHEMA: { name: string; selector: any }[] = [
  { name: "name", selector: { text: {} } },
  { name: "subtitle", selector: { text: {} } },
  { name: "tooltip", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "accent", selector: { text: {} } },
  { name: "color", selector: { text: {} } },
  { name: "badge", selector: { text: {} } },
  { name: "badge_color", selector: { text: {} } },
  { name: "countdown", selector: { entity: { filter: [{ domain: "timer" }, { domain: "sensor", device_class: "timestamp" }] } } },
  { name: "background", selector: { text: {} } },
  { name: "page_background", selector: { text: {} } },
  { name: "badge_icon", selector: { icon: {} } },
  { name: "picture", selector: { text: {} } },
  { name: "icon_animation", selector: { text: {} } },
  { name: "font_size", selector: { text: {} } },
  { name: "font_weight", selector: { text: {} } },
  { name: "font_family", selector: { text: {} } },
  { name: "ring", selector: { text: {} } },
  { name: "ring_max", selector: { number: { min: 1, step: 1, mode: "box" } } },
  { name: "ring_color", selector: { text: {} } },
  { name: "ring_style", selector: { boolean: {} } },
  { name: "graph", selector: { entity: {} } },
  { name: "area", selector: { area: {} } },
  { name: "view", selector: { text: {} } },
  { name: "tab_ref", selector: { text: {} } },
  { name: "url", selector: { text: {} } },
  { name: "aspect_ratio", selector: { text: {} } },
  { name: "markdown", selector: { text: { multiline: true } } },
  { name: "empty_message", selector: { text: {} } },
  { name: "zoom", selector: { number: { min: 0.25, max: 3, step: 0.05, mode: "box" } } },
  { name: "padding", selector: { text: {} } },
  { name: "spacing", selector: { text: {} } },
  { name: "auto_refresh", selector: { number: { min: 0, max: 1440, step: 0.5, mode: "box", unit_of_measurement: "min" } } },
  { name: "pin", selector: { text: {} } },
  { name: "pin_timeout", selector: { number: { min: 0, max: 1440, step: 1, mode: "box" } } },
  { name: "separator", selector: { text: {} } },
  { name: "disabled", selector: { boolean: {} } },
  { name: "fab", selector: { boolean: {} } },
  { name: "pip", selector: { boolean: {} } },
  { name: "keep_awake", selector: { boolean: {} } },
  { name: "card_size", selector: { number: { min: 1, max: 20, step: 1, mode: "box" } } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
  { name: "badge_action", selector: { ui_action: {} } },
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "enter_action", selector: { ui_action: {} } },
  { name: "leave_action", selector: { ui_action: {} } },
];

// Common built-in Lovelace card types offered when choosing/changing a tab's
// card. `custom_value` lets the user type anything else (e.g. `custom:my-card`).
const CARD_TYPES = [
  "entities", "tile", "button", "light", "thermostat", "humidifier",
  "weather-forecast", "markdown", "picture", "picture-entity", "picture-glance",
  "glance", "gauge", "sensor", "history-graph", "statistics-graph",
  "media-control", "map", "area", "alarm-panel", "calendar", "todo-list",
  "iframe", "entity", "conditional", "vertical-stack", "horizontal-stack", "grid",
  // Popular custom cards (HACS) — suggestions only; custom_value still allows
  // any type the user types.
  "custom:mushroom-template-card", "custom:mushroom-entity-card",
  "custom:button-card", "custom:mini-graph-card", "custom:apexcharts-card",
  "custom:auto-entities", "custom:bubble-card", "custom:layout-card",
];

const CARD_TYPE_SCHEMA = [
  {
    name: "type",
    selector: {
      select: {
        mode: "dropdown",
        custom_value: true,
        options: CARD_TYPES.map((t) => ({ value: t, label: t })),
      },
    },
  },
];

interface ConditionSection {
  key: "visibility" | "alert" | "default_if";
}

// Per-tab condition lists editable in the visual editor (labels: editor.cond.<key>.*).
const CONDITION_SECTIONS: ConditionSection[] = [
  { key: "visibility" },
  { key: "alert" },
  { key: "default_if" },
];

export type CardEditorTag =
  | "hui-card-element-editor"
  | "ha-yaml-editor"
  | "textarea-json";

// Decide which nested card editor to use. Prefer Home Assistant's own
// hui-card-element-editor (visual + per-card YAML toggle + card picker); fall
// back to ha-yaml-editor, then to a raw JSON textarea, so the editor never
// hard-fails on an HA version that lacks the internal element.
export function pickCardEditorTag(has: (tag: string) => boolean): CardEditorTag {
  if (has("hui-card-element-editor")) return "hui-card-element-editor";
  if (has("ha-yaml-editor")) return "ha-yaml-editor";
  return "textarea-json";
}

@customElement("tabdeck-card-editor")
export class TabdeckCardEditor extends LitElement {
  // Redraws once a non-English language chunk arrives.
  protected readonly _language = new LanguageController(this);
  @state() private _config?: TabdeckCardConfig;
  // Index of the tab currently being edited in the drill-in card view, or null
  // for the tab-list view.
  @state() private _editingTab: number | null = null;
  // Index of the tab whose card JSON failed to parse, so we can show an error
  // without discarding what the user is typing.
  @state() private _cardError: number | null = null;
  // Indices of tabs whose fields are expanded in the list view. Empty by
  // default, so every tab opens collapsed to save vertical space.
  @state() private _expanded = new Set<number>();
  // Import panel: open state, pending parsed value, and error message.
  @state() private _importOpen = false;
  // Import a style (preset gallery): open, pasted value, errors.
  @state() private _styleOpen = false;
  @state() private _styleErrors: PresetError[] = [];
  private _styleValue: any;
  @state() private _importError = "";
  private _importValue: any;
  // Starter-template panel.
  @state() private _starterOpen = false;
  @state() private _starterKind: StarterKind = "rooms";
  // Convert-from panel: open state, current conversion (or error key).
  @state() private _convertOpen = false;
  @state() private _exportOpen = false;
  @state() private _convertResult?: ConvertResult;
  @state() private _convertError = "";
  // What's new: the release note to show (once per version, per browser).
  @state() private _note = pendingNote(CURRENT_VERSION, dismissedNote());
  // Room wizard: open state, the rooms found (undefined while loading) and
  // the ticked area ids.
  @state() private _roomsOpen = false;
  @state() private _rooms?: Room[];
  @state() private _roomPick = new Set<string>();
  // Instant dashboard (from the room wizard): busy flag, the dashboard made, or an error key.
  @state() private _instantBusy = false;
  @state() private _instantDone?: { url_path: string; title: string };
  @state() private _instantError = "";
  // Bulk edit: select mode, the picked tab indices and the values to set.
  @state() private _selecting = false;
  @state() private _picked = new Set<number>();
  private _bulk: Record<string, string> = {};
  // Click to edit: the tab briefly highlighted, and the preview's open tab.
  @state() private _flashTab = -1;
  @state() private _previewSelected = 0;
  private _flashTimer?: ReturnType<typeof setTimeout>;
  // Folding sections: which are open (per browser), the search box, the
  // status line, and whether HA's own preview sits beside the editor.
  @state() private _open = readOpenSections();
  @state() private _query = "";
  // Sections folded by hand during the current search.
  @state() private _searchClosed = new Set<string>();
  @state() private _statusOpen = false;
  @state() private _haPreview = false;
  @state() private _flashField = "";
  private _resize?: ResizeObserver;
  // Transient status line (e.g. "Copied tab …").
  @state() private _status = "";
  private _statusTimer?: ReturnType<typeof setTimeout>;
  private _hass?: HomeAssistant;
  // Live template results for template conditions (the "why hidden" check).
  private _templates?: TemplateRenderer;
  // Fingerprint of every live condition result, so a hass tick only redraws
  // the editor when something shown actually changed.
  private _checkSig = "";

  set hass(hass: HomeAssistant | undefined) {
    const first = !this._hass;
    this._hass = hass;
    this._syncTemplates();
    const sig = this._checkSignature();
    if (first || sig !== this._checkSig) {
      this._checkSig = sig;
      this.requestUpdate();
    }
  }
  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  private _t(key: string, vars?: Record<string, string | number>): string {
    return localize(hassLanguage(this._hass), key, vars);
  }

  // Tri-state resolver: undefined while a template result is pending.
  private _resolver = (tpl: string): boolean | undefined =>
    this._templates?.result(tpl) === undefined ? undefined : this._templates!.boolean(tpl);

  private _conditionTemplates(): string[] {
    const out: string[] = [];
    const walk = (conds: any) => {
      for (const c of Array.isArray(conds) ? conds : []) {
        if (c?.condition === "template" && c.value_template) out.push(c.value_template);
        if (Array.isArray(c?.conditions)) walk(c.conditions);
      }
    };
    for (const t of this._config?.tabs ?? []) {
      walk(t.visibility);
      walk(t.alert);
      walk(t.default_if);
    }
    return out;
  }

  private _syncTemplates(): void {
    const templates = this._conditionTemplates();
    if (templates.length === 0 || !this._hass?.connection?.subscribeMessage) {
      if (templates.length === 0) {
        this._templates?.destroy();
        this._templates = undefined;
      }
      return;
    }
    if (!this._templates) {
      this._templates = new TemplateRenderer(makeHassSubscribe(() => this._hass));
      this._templates.addEventListener("change", () => this.requestUpdate());
    }
    this._templates.track(templates);
  }

  private _explain(conditions: any) {
    return explainConditions(conditions, this._hass ?? ({ states: {} } as any), this._resolver);
  }

  // Includes the UI language, so switching language redraws the labels.
  private _checkSignature(): string {
    if (!this._hass) return "";
    return hassLanguage(this._hass) + "#" + (this._config?.tabs ?? [])
      .map((t) =>
        CONDITION_SECTIONS.map((sec) => conditionsSignature(this._explain((t as any)[sec.key]))).join("/"),
      )
      .join(";");
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("tabdeck-edit-tab", this._onEditTab);
    this.addEventListener("keydown", this._onKeydown);
    window.addEventListener("resize", this._checkHaPreview);
    if (typeof ResizeObserver !== "undefined") {
      this._resize = new ResizeObserver(() => this._checkHaPreview());
      this._resize.observe(this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("tabdeck-edit-tab", this._onEditTab);
    this.removeEventListener("keydown", this._onKeydown);
    window.removeEventListener("resize", this._checkHaPreview);
    this._resize?.disconnect();
    this._resize = undefined;
    this._templates?.destroy();
    this._templates = undefined;
  }

  // Set by Home Assistant's card-editor dialog; forwarded to the nested editor.
  public lovelace?: any;

  setConfig(config: any): void {
    // HA hands back what the editor just sent; anything else (the YAML code
    // editor) is a change of its own and can be undone too.
    let raw = "";
    try {
      raw = JSON.stringify(config);
    } catch {
      /* not JSON-safe: treat as a change */
    }
    const prev = this._config;
    this._raw = config;
    // Keep tab_defaults / tab_templates / use as written (the card applies them).
    this._config = normalizeConfig(config, { expand: false });
    if (prev && raw !== this._lastOut) {
      this._history.record(prev);
      this._undoNote = changeLabel(prev, this._config);
    }
    this._lastOut = raw;
    this._syncTemplates();
  }

  // --- undo / redo ----------------------------------------------------------
  private _history = new UndoStack<TabdeckCardConfig>();
  private _lastOut = "";
  // The config as written (before normalizing drops unknown keys), for the
  // config check.
  private _raw: any;
  @state() private _undoNote?: { key: string; vars?: Record<string, string> };

  undo(): void {
    this._step(this._history.undo(this._config!), true);
  }

  redo(): void {
    this._step(this._history.redo(this._config!), false);
  }

  private _step(target: TabdeckCardConfig | undefined, back: boolean): void {
    if (!target || !this._config) return;
    // Name the change being undone (target → now) or redone (now → target).
    const note = back ? changeLabel(target, this._config) : changeLabel(this._config, target);
    const key = back ? "editor.undo.undone" : "editor.undo.redone";
    this._emit(target, false);
    if (this._editingTab !== null && !target.tabs[this._editingTab]) this._editingTab = null;
    this._expanded = new Set([...this._expanded].filter((i) => i < target.tabs.length));
    this._picked = new Set([...this._picked].filter((i) => i < target.tabs.length));
    this._undoNote = undefined;
    this._flash(this._t(key, { change: this._t(note.key, note.vars) }));
  }

  // Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y while focus is in the editor, except in a
  // text box (its own undo wins there). Handled keys stop here, so HA's
  // dashboard undo doesn't also run.
  private _onKeydown = (e: KeyboardEvent): void => {
    if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
    const key = e.key.toLowerCase();
    const redo = key === "y" || (key === "z" && e.shiftKey);
    if (key !== "z" && key !== "y") return;
    const target = e.composedPath()[0] as HTMLElement | undefined;
    if (
      target &&
      (target.localName === "input" ||
        target.localName === "textarea" ||
        target.isContentEditable ||
        target.closest?.(".cm-editor, ha-code-editor"))
    )
      return;
    if (redo ? !this._history.canRedo : !this._history.canUndo) return;
    e.preventDefault();
    e.stopPropagation();
    if (redo) this.redo();
    else this.undo();
  };

  // Shown (pinned to the top of the editor) once there is something to undo.
  private _renderWhatsNew() {
    const v = this._note;
    if (!v) return nothing;
    return html`<div class="whats-new" role="status">
      <ha-svg-icon class="whats-new-icon" .path=${MDI_GIFT}></ha-svg-icon>
      <div class="whats-new-text">
        <b>${this._t("whatsnew.title", { version: v })}</b>
        <span>${this._t(noteKey(v))}</span>
        <a href="https://github.com/tempus2016/tabdeck-card/releases/tag/v${v}" target="_blank" rel="noopener noreferrer"
          >${this._t("whatsnew.more")}</a
        >
      </div>
      <ha-icon-button
        class="whats-new-close"
        .label=${this._t("whatsnew.dismiss")}
        .path=${MDI_CLOSE}
        @click=${() => {
          dismissNote(v);
          this._note = undefined;
        }}
      ></ha-icon-button>
    </div>`;
  }

  // One summary sentence in the reader's language: tab names joined with
  // "and", plural forms picked by Intl.PluralRules.
  private _summaryText(line: SummaryLine): string {
    const lang = resolveLanguage(hassLanguage(this._hass));
    const vars: Record<string, string | number> = { ...(line.vars ?? {}) };
    if (line.names) {
      try {
        vars.names = new Intl.ListFormat(lang, { type: "conjunction" }).format(line.names);
      } catch {
        vars.names = line.names.join(", ");
      }
    }
    if (line.n !== undefined) vars.n = line.n;
    // An entity by its friendly name when HA knows it.
    const ent = typeof vars.entity === "string" ? this._hass?.states?.[vars.entity] : undefined;
    if (ent?.attributes?.friendly_name) vars.entity = ent.attributes.friendly_name;
    const text = localize(lang, line.key, vars);
    if (!text.includes("|")) return text;
    const forms = Object.fromEntries(text.split("|").map((f) => [f.slice(0, f.indexOf(":")), f.slice(f.indexOf(":") + 1)]));
    let cat = "other";
    try {
      cat = new Intl.PluralRules(lang).select(line.n ?? 0);
    } catch {
      /* "other" */
    }
    return forms[cat] ?? forms.other ?? text;
  }

  private _renderSummary() {
    const lines = summarizeConfig(this._config);
    if (!lines.length) return nothing;
    return html`<div class="summary-box">
      <div class="status-head"><ha-svg-icon .path=${MDI_TEXT_BOX}></ha-svg-icon> ${this._t("summary.title")}</div>
      <p>${lines.map((l) => this._summaryText(l)).join(" ")}</p>
    </div>`;
  }

  // Config check: clashes, options that do nothing, unknown keys, slow setups.
  private _renderLint(notes: ReturnType<typeof lintConfig>) {
    if (!notes.length) return nothing;
    return html`<div class="lint">
      <div class="status-head">
        <ha-svg-icon .path=${MDI_CLIPBOARD_CHECK}></ha-svg-icon>
        ${plural(hassLanguage(this._hass), "lint.title", notes.length)}
      </div>
      <ul>
        ${notes.map(
          (n) => html`<li class="lint-note ${n.level}">
            <ha-svg-icon .path=${LINT_ICONS[n.level]}></ha-svg-icon>
            <span>${this._t(`lint.${n.rule}`, n.vars)}</span>
            ${lintTarget(n)
              ? html`<button class="lint-go" @click=${() => this._goToLint(n)}>${this._t("editor.status.show")}</button>`
              : nothing}
          </li>`,
        )}
      </ul>
    </div>`;
  }

  private _renderHistory() {
    if (!this._history.canUndo && !this._history.canRedo) return nothing;
    const note = this._undoNote;
    return html`<div class="history">
      ${note && this._history.canUndo
        ? html`<span class="history-note">${this._t(note.key, note.vars)}</span>`
        : nothing}
      <ha-icon-button
        class="undo"
        .label=${this._t("editor.undo.undo")}
        title=${this._t("editor.undo.undo") + " (Ctrl+Z)"}
        .path=${MDI_UNDO}
        .disabled=${!this._history.canUndo}
        @click=${() => this.undo()}
      ></ha-icon-button>
      <ha-icon-button
        class="redo"
        .label=${this._t("editor.undo.redo")}
        title=${this._t("editor.undo.redo") + " (Ctrl+Shift+Z)"}
        .path=${MDI_REDO}
        .disabled=${!this._history.canRedo}
        @click=${() => this.redo()}
      ></ha-icon-button>
    </div>`;
  }

  private _emit(next: TabdeckCardConfig, record = true): void {
    if (record && this._config && next !== this._config) {
      this._history.record(this._config);
      this._undoNote = changeLabel(this._config, next);
    }
    this._config = next;
    this._syncTemplates();
    const out = this._forOutput(next);
    this._raw = out;
    try {
      this._lastOut = JSON.stringify(out);
    } catch {
      this._lastOut = "";
    }
    fireEvent(this, "config-changed", { config: out } as any);
    this.requestUpdate();
  }

  // Drop values the card derives itself, so they aren't baked into the YAML:
  // an auto_tabs `source` regenerates its template (and default blueprint).
  private _forOutput(cfg: TabdeckCardConfig): TabdeckCardConfig {
    // A grouped tab's nested deck and menu data derive from `children`, and
    // a shortcut tab's card (view:) from its shortcut.
    if (cfg.tabs.some((t) => t.group || isShortcutCard(t))) {
      cfg = {
        ...cfg,
        tabs: cfg.tabs.map((t) => {
          if (isShortcutCard(t)) {
            const { card: _c, ...rest } = t;
            return rest as any;
          }
          if (!t.group) return t;
          const { group: _g, card: _c, ...rest } = t;
          return rest as any;
        }),
      };
    }
    const auto = cfg.auto_tabs;
    if (!auto?.source) return cfg;
    const { template: _t, ...rest } = auto;
    const out: any = { ...rest };
    if (isDefaultTabTemplate(out.tab_template)) delete out.tab_template;
    for (const k of ["domains", "exclude", "content"]) if (out[k] === undefined) delete out[k];
    return { ...cfg, auto_tabs: out };
  }

  private _patch(partial: Partial<TabdeckCardConfig>): void {
    if (!this._config) return;
    this._emit({ ...this._config, ...partial });
  }

  private _patchTab(index: number, partial: Record<string, any>): void {
    if (!this._config) return;
    const tabs = this._config.tabs.map((t, i) =>
      i === index ? { ...t, ...partial } : t,
    );
    this._emit({ ...this._config, tabs });
  }

  private _addTab(): void {
    if (!this._config) return;
    // Start with a typeless card so the drill-in shows HA's card picker
    // (rather than silently locking the new tab to one card type).
    const tabs = [
      ...this._config.tabs,
      { name: this._t("editor.tab_n", { n: this._config.tabs.length + 1 }), card: {} as any },
    ];
    // Appending doesn't shift existing indices, so keep what's open and also
    // expand the new tab so the user can configure it immediately.
    const newIndex = this._config.tabs.length;
    this._expanded = new Set(this._expanded).add(newIndex);
    this._emit({ ...this._config, tabs });
  }

  private _expandAll(): void {
    if (!this._config) return;
    this._expanded = new Set(this._config.tabs.map((_, i) => i));
  }

  private _collapseAll(): void {
    this._expanded = new Set();
  }

  private _deleteTab(index: number): void {
    if (!this._config) return;
    const tabs = this._config.tabs.filter((_, i) => i !== index);
    this._expanded = new Set();
    this._picked = new Set();
    this._emit({ ...this._config, tabs });
  }

  private _duplicateTab(index: number): void {
    if (!this._config) return;
    const src = this._config.tabs[index];
    if (!src) return;
    // Deep clone so the copy doesn't share nested card/visibility objects.
    const copy = JSON.parse(JSON.stringify(src));
    copy.name = this._t("editor.copy_name", { name: src.name ?? this._t("editor.tab_n", { n: index + 1 }) });
    const tabs = this._config.tabs.slice();
    tabs.splice(index + 1, 0, copy);
    this._expanded = new Set();
    this._picked = new Set();
    this._emit({ ...this._config, tabs });
  }

  // --- room wizard -----------------------------------------------------------
  private async _toggleRooms(): Promise<void> {
    this._roomsOpen = !this._roomsOpen;
    this._rooms = undefined;
    this._instantDone = undefined;
    this._instantError = "";
    if (!this._roomsOpen) return;
    let rooms: Room[] = [];
    try {
      rooms = roomList(await loadRegistries(this._hass), this._hass?.states ?? {});
    } catch {
      rooms = [];
    }
    // Ticked to start with: rooms with entities that don't have a tab yet.
    const have = new Set((this._config?.tabs ?? []).map((t) => t.area).filter(Boolean));
    this._roomPick = new Set(rooms.filter((r) => r.entities.length && !have.has(r.id)).map((r) => r.id));
    this._rooms = rooms;
  }

  private _toggleRoom(id: string): void {
    const next = new Set(this._roomPick);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._roomPick = next;
  }

  private _createRooms(): void {
    if (!this._config || !this._rooms) return;
    const tabs = roomTabs(this._rooms.filter((r) => this._roomPick.has(r.id))).map(normalizeTab);
    if (!tabs.length) return;
    this._roomsOpen = false;
    this._flash(this._t("rooms.done", { count: tabs.length }));
    this._emit({ ...this._config, tabs: [...this._config.tabs, ...tabs] });
  }

  // A NEW dashboard with one deck holding a tab per ticked room. The deck
  // being edited is left as it is.
  private async _createDashboard(): Promise<void> {
    if (!this._rooms || this._instantBusy || !this._hass?.callWS) return;
    const tabs = roomTabs(this._rooms.filter((r) => this._roomPick.has(r.id))).map(normalizeTab);
    if (!tabs.length) return;
    this._instantBusy = true;
    this._instantDone = undefined;
    this._instantError = "";
    try {
      this._instantDone = await createInstantDashboard((m) => this._hass!.callWS(m as any), tabs, this._t("instant.title"));
    } catch (e: any) {
      this._instantError = e?.reason === "admin" ? "instant.error.admin" : "instant.error.failed";
    } finally {
      this._instantBusy = false;
    }
  }

  private _renderRooms() {
    const rooms = this._rooms;
    const have = new Set((this._config?.tabs ?? []).map((t) => t.area).filter(Boolean));
    const lang = hassLanguage(this._hass);
    const n = this._roomPick.size;
    return html`<div class="import-panel rooms-panel">
      <div class="import-hint">${this._t("rooms.hint")}</div>
      ${!rooms
        ? html`<div class="import-hint">…</div>`
        : rooms.length === 0
          ? html`<div class="import-error" role="alert">${this._t("rooms.none")}</div>`
          : html`<ul class="room-list">
              ${rooms.map(
                (r) => html`<li>
                  <label class="room ${this._roomPick.has(r.id) ? "on" : ""}">
                    <input
                      type="checkbox"
                      class="room-pick"
                      .checked=${this._roomPick.has(r.id)}
                      @change=${() => this._toggleRoom(r.id)}
                    />
                    <ha-icon .icon=${r.icon ?? "mdi:texture-box"}></ha-icon>
                    <span class="room-name">${r.name}</span>
                    <span class="room-count">
                      ${plural(lang, "rooms.entities", r.entities.length)}${have.has(r.id) ? ` · ${this._t("rooms.has_tab")}` : ""}
                    </span>
                  </label>
                </li>`,
              )}
            </ul>`}
      <div class="import-actions">
        <ha-button class="rooms-create" .disabled=${n === 0} @click=${this._createRooms}
          >${plural(lang, "rooms.create", n)}</ha-button
        >
        <ha-button
          class="rooms-dashboard"
          .disabled=${n === 0 || this._instantBusy || !this._hass?.callWS}
          @click=${this._createDashboard}
          >${this._t(this._instantBusy ? "instant.working" : "instant.button")}</ha-button
        >
        <ha-button class="rooms-cancel" @click=${this._toggleRooms}>${this._t("editor.cancel")}</ha-button>
      </div>
      ${this._instantDone
        ? html`<div class="import-hint instant-done" role="status">
            ${this._t("instant.done", { title: this._instantDone.title })}
            <a href="/${this._instantDone.url_path}/rooms" target="_blank" rel="noopener">${this._t("instant.open")}</a>
          </div>`
        : nothing}
      ${this._instantError
        ? html`<div class="import-error" role="alert">${this._t(this._instantError)}</div>`
        : nothing}
    </div>`;
  }

  // --- bulk edit -------------------------------------------------------------
  private _toggleSelecting(): void {
    this._selecting = !this._selecting;
    this._picked = new Set();
    this._bulk = {};
  }

  private _togglePicked(index: number): void {
    const next = new Set(this._picked);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this._picked = next;
  }

  private _pickAll(all: boolean): void {
    this._picked = all ? new Set(this._config?.tabs.map((_, i) => i)) : new Set();
  }

  // Set the filled-in fields on every picked tab, as one change (one undo step).
  private _applyBulk(): void {
    if (!this._config || this._picked.size === 0) return;
    const fields = Object.fromEntries(
      Object.entries(this._bulk).filter(([k, v]) => ["icon", "accent", "color"].includes(k) && typeof v === "string" && v),
    );
    if (Object.keys(fields).length === 0) return;
    const count = this._picked.size;
    const tabs = this._config.tabs.map((t, i) => (this._picked.has(i) ? { ...t, ...fields } : t));
    this._flash(this._t("editor.bulk.applied", { count }));
    this._emit({ ...this._config, tabs });
  }

  private _renderBulk() {
    const schema = [
      { name: "icon", selector: { icon: {} } },
      { name: "accent", selector: { ui_color: {} } },
      { name: "color", selector: { ui_color: {} } },
    ];
    const n = this._picked.size;
    return html`<div class="import-panel bulk-panel">
      <div class="bulk-head">
        <span class="bulk-count">${this._t("editor.bulk.count", { n })}</span>
        <button class="bulk-all" @click=${() => this._pickAll(true)}>${this._t("editor.bulk.all")}</button>
        <button class="bulk-none" @click=${() => this._pickAll(false)}>${this._t("editor.bulk.none")}</button>
      </div>
      <div class="import-hint">${this._t("editor.bulk.hint")}</div>
      <ha-form
        class="bulk-form"
        .hass=${this.hass}
        .data=${this._bulk}
        .schema=${schema}
        .computeLabel=${this._computeTabLabel}
        @value-changed=${(e: CustomEvent) => {
          e.stopPropagation();
          this._bulk = { ...((e.detail as any)?.value ?? {}) };
          this.requestUpdate();
        }}
      ></ha-form>
      <div class="import-actions">
        <ha-button class="bulk-apply" .disabled=${n === 0 || !Object.values(this._bulk).some((v) => v)} @click=${this._applyBulk}
          >${this._t("editor.bulk.apply")}</ha-button
        >
        <ha-button class="bulk-done" @click=${this._toggleSelecting}>${this._t("editor.bulk.done")}</ha-button>
      </div>
    </div>`;
  }

  // --- click to edit ---------------------------------------------------------
  // A tab clicked in the card's preview (the card fires tabdeck-edit-tab in
  // edit / preview mode). Only the editor in the same dialog, editing the same
  // tabs, reacts.
  private _onEditTab = (e: Event): void => {
    const d = (e as CustomEvent).detail;
    const tabs = this._config?.tabs;
    if (!tabs || !d || !Number.isInteger(d.index) || !Array.isArray(d.names)) return;
    if (d.names.length !== tabs.length || d.index < 0 || d.index >= tabs.length) return;
    if (tabs.some((t, i) => typeof t.name === "string" && !isTemplate(t.name) && t.name !== d.names[i])) return;
    const dialog = this._dialog();
    if (dialog && !e.composedPath().includes(dialog)) return;
    void this._focusTab(d.index);
  };

  // Nearest dialog around the editor (HA's card editor dialog), if any.
  private _dialog(): Element | undefined {
    let n: any = this.parentNode ?? (this as any).host;
    while (n) {
      if (n instanceof Element && n.localName.includes("dialog")) return n;
      n = n.parentNode ?? n.host;
    }
    return undefined;
  }

  // Expand one tab's settings, scroll to it and briefly highlight it.
  async _focusTab(index: number): Promise<void> {
    if (!this._config?.tabs[index]) return;
    this._editingTab = null;
    this._query = "";
    this._searchClosed = new Set();
    if (!this._open[TABS_SECTION]) {
      this._open = { ...this._open, [TABS_SECTION]: true };
      writeOpenSections(this._open);
    }
    this._expanded = new Set([index]);
    this._flashTab = index;
    this._previewSelected = index;
    await this.updateComplete;
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    const el = this.renderRoot.querySelectorAll(".tabs > .tab")[index] as HTMLElement | undefined;
    el?.scrollIntoView?.({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" });
    if (this._flashTimer) clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(() => (this._flashTab = -1), 1600);
  }

  private _flash(message: string): void {
    this._status = message;
    if (this._statusTimer) clearTimeout(this._statusTimer);
    this._statusTimer = setTimeout(() => (this._status = ""), 2500);
  }

  // Copy one tab's config (as JSON, which is valid YAML) to paste into another
  // deck's "Import tab". Falls back to execCommand on insecure (http) origins,
  // where navigator.clipboard is unavailable.
  private async _copyTab(index: number): Promise<void> {
    const tab = this._config?.tabs[index];
    if (!tab) return;
    const ok = await this._copyText(JSON.stringify(tab, null, 2));
    const label = tab.name || this._t("editor.tab_n", { n: index + 1 });
    this._flash(ok ? this._t("editor.copied", { name: label }) : this._t("editor.clipboard_error"));
  }

  private async _copyText(text: string): Promise<boolean> {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      this.renderRoot.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }
    return ok;
  }

  // --- export as a dashboard view ------------------------------------------
  private _toggleExport(): void {
    this._exportOpen = !this._exportOpen;
  }

  private _exportResult() {
    // Apply tab_defaults / tab_templates, as the card does.
    return deckToSectionsView(normalizeConfig(this._config), this._hass, this._config?.aria_label || "Tabdeck");
  }

  private async _copyExport(): Promise<void> {
    const ok = await this._copyText(toYaml(this._exportResult().view));
    this._flash(ok ? this._t("export.copied") : this._t("editor.clipboard_error"));
  }

  private _renderExport() {
    const r = this._exportResult();
    return html`
      <div class="import-panel export-panel">
        <div class="import-hint">${this._t("export.hint")}</div>
        <textarea class="import-json export-yaml" rows="12" readonly .value=${toYaml(r.view)}></textarea>
        ${r.skipped.length
          ? html`<div class="convert-note">ℹ️ ${this._t("export.skipped", { names: r.skipped.join(", ") })}</div>`
          : nothing}
        ${r.notes.map((n) => html`<div class="convert-note">ℹ️ ${this._t(n)}</div>`)}
        <div class="import-actions">
          <ha-button class="export-copy" @click=${this._copyExport}>${this._t("export.copy")}</ha-button>
          <ha-button class="export-close" @click=${this._toggleExport}>${this._t("convert.cancel")}</ha-button>
        </div>
      </div>
    `;
  }

  private _toggleConvert(): void {
    this._convertOpen = !this._convertOpen;
    this._convertResult = undefined;
    this._convertError = "";
  }

  private _onConvertInput(value: any): void {
    this._convertResult = undefined;
    this._convertError = "";
    if (value === undefined || value === null || value === "") return;
    try {
      const r = convertConfig(value, this._hass);
      if (r.tabs.length === 0) this._convertError = "convert.error.no_tabs";
      else this._convertResult = r;
    } catch (err: any) {
      const key = String(err?.message ?? "");
      this._convertError = key.startsWith("convert.") ? key : "convert.error.not_card";
    }
  }

  private _applyConvert(mode: "replace" | "append"): void {
    const r = this._convertResult;
    if (!this._config || !r) return;
    const next = normalizeConfig(applyConversion(this._config, r, mode), { expand: false });
    this._expanded = new Set();
    this._picked = new Set();
    this._convertOpen = false;
    this._convertResult = undefined;
    this._flash(this._t("convert.done", { count: r.tabs.length, source: this._t(`convert.source.${r.source}`) }));
    this._emit(next);
  }

  private _renderConvert() {
    const r = this._convertResult;
    const onYaml = (e: CustomEvent) => {
      e.stopPropagation();
      const d = e.detail as any;
      if (d?.isValid === false) return;
      this._onConvertInput(d?.value);
    };
    return html`
      <div class="import-panel convert-panel">
        <div class="import-hint">${this._t("convert.hint")}</div>
        ${customElements.get("ha-yaml-editor")
          ? html`<ha-yaml-editor class="convert-yaml" @value-changed=${onYaml}></ha-yaml-editor>`
          : html`<textarea
              class="import-json convert-json"
              rows="8"
              @input=${(e: any) => {
                try {
                  this._onConvertInput(JSON.parse(e.target.value));
                } catch {
                  this._convertResult = undefined;
                }
              }}
            ></textarea>`}
        ${this._convertError
          ? html`<div class="import-error" role="alert">${this._t(this._convertError)}</div>`
          : nothing}
        ${r
          ? html`<div class="convert-summary" role="status">
              ${this._t("convert.detected", { source: this._t(`convert.source.${r.source}`), count: r.tabs.length })}
              <ul class="convert-tabs">
                ${r.tabs.map((t) => html`<li>${t.icon ? html`<ha-icon .icon=${t.icon}></ha-icon>` : nothing}${t.name}</li>`)}
              </ul>
              ${r.notes.map((n) => html`<div class="convert-note">ℹ️ ${this._t(n)}</div>`)}
            </div>`
          : nothing}
        <div class="import-actions">
          <ha-button class="convert-replace" .disabled=${!r} @click=${() => this._applyConvert("replace")}
            >${this._t("convert.replace")}</ha-button
          >
          <ha-button class="convert-append" .disabled=${!r} @click=${() => this._applyConvert("append")}
            >${this._t("convert.append")}</ha-button
          >
          <ha-button class="convert-cancel" @click=${this._toggleConvert}>${this._t("convert.cancel")}</ha-button>
        </div>
      </div>
    `;
  }

  private _toggleStarter(): void {
    this._starterOpen = !this._starterOpen;
  }

  private _applyStarter(mode: "replace" | "append"): void {
    if (!this._config) return;
    const kind = this._starterKind;
    const label = this._t(`starter.kind.${kind}`);
    const starter = buildStarter(kind, this._hass, (k) => this._t(k));
    if (starter.count === 0) {
      this._flash(this._t("starter.none", { name: label }));
      return;
    }
    const next = normalizeConfig(applyStarter(this._config, starter, mode), { expand: false });
    this._expanded = new Set();
    this._picked = new Set();
    this._starterOpen = false;
    this._flash(this._t("starter.done", { name: label }));
    this._emit(next);
  }

  private _renderStarter() {
    const schema = [
      {
        name: "kind",
        selector: {
          select: {
            mode: "dropdown",
            options: STARTERS.map((k) => ({ value: k, label: this._t(`starter.kind.${k}`) })),
          },
        },
      },
    ];
    return html`
      <div class="import-panel starter-panel">
        <div class="import-hint">${this._t("starter.hint")}</div>
        <ha-form
          class="starter-form"
          .hass=${this.hass}
          .data=${{ kind: this._starterKind }}
          .schema=${schema}
          .computeLabel=${() => this._t("starter.pick")}
          @value-changed=${(e: CustomEvent) => {
            e.stopPropagation();
            const k = (e.detail as any)?.value?.kind;
            if (STARTERS.includes(k)) this._starterKind = k;
          }}
        ></ha-form>
        <div class="import-actions">
          <ha-button class="starter-replace" @click=${() => this._applyStarter("replace")}
            >${this._t("starter.replace")}</ha-button
          >
          <ha-button class="starter-append" @click=${() => this._applyStarter("append")}
            >${this._t("starter.append")}</ha-button
          >
          <ha-button class="starter-cancel" @click=${this._toggleStarter}>${this._t("starter.cancel")}</ha-button>
        </div>
      </div>
    `;
  }

  // --- import a style ---------------------------------------------------------
  private _toggleStyleImport(): void {
    this._styleOpen = !this._styleOpen;
    this._styleErrors = [];
    this._styleValue = undefined;
  }

  private _applyStyleImport(): void {
    if (!this._config) return;
    const r = readStylePreset(this._styleValue);
    if (r.errors.length) {
      this._styleErrors = r.errors;
      return;
    }
    this._styleOpen = false;
    this._styleErrors = [];
    this._flash(r.name ? this._t("style_import.done", { name: r.name }) : this._t("style_import.done_unnamed"));
    this._emit(applyStylePreset(this._config, r.config));
  }

  private _renderStyleImport() {
    const onYaml = (e: CustomEvent) => {
      e.stopPropagation();
      const d = e.detail as any;
      this._styleValue = d?.isValid === false ? undefined : d?.value;
      this._styleErrors = [];
    };
    return html`
      <div class="import-panel style-import-panel">
        <div class="import-hint">
          ${this._t("style_import.hint")}
          <a href="https://tempus2016.github.io/tabdeck-card/demo/presets.html" target="_blank" rel="noopener"
            >${this._t("style_import.gallery")}</a
          >
        </div>
        ${customElements.get("ha-yaml-editor")
          ? html`<ha-yaml-editor @value-changed=${onYaml}></ha-yaml-editor>`
          : html`<textarea
              class="import-json"
              rows="8"
              placeholder='{"config": {"style": "pill", "styles": {"--tabdeck-accent": "teal"}}}'
              @input=${(e: any) => {
                try {
                  this._styleValue = JSON.parse(e.target.value);
                } catch {
                  this._styleValue = undefined;
                }
                this._styleErrors = [];
              }}
            ></textarea>`}
        ${this._styleErrors.length
          ? html`<div class="import-error" role="alert">
              ${this._t("style_import.error.title")}
              <ul>
                ${this._styleErrors.map((e) => html`<li>${this._t(e.key, e.vars)}</li>`)}
              </ul>
            </div>`
          : nothing}
        <div class="import-actions">
          <ha-button class="style-import-apply" @click=${this._applyStyleImport}>${this._t("style_import.apply")}</ha-button>
          <ha-button class="style-import-cancel" @click=${this._toggleStyleImport}>${this._t("editor.cancel")}</ha-button>
        </div>
      </div>
    `;
  }

  private _toggleImport(): void {
    this._importOpen = !this._importOpen;
    this._importError = "";
    this._importValue = undefined;
  }

  // Accept one tab object or a list of them.
  private _applyImport(): void {
    if (!this._config) return;
    const raw = this._importValue;
    const list = Array.isArray(raw) ? raw : [raw];
    const tabLike = (o: any) =>
      o && typeof o === "object" && !Array.isArray(o) && (o.card || o.cards || o.tap_action);
    if (list.length === 0 || !list.every(tabLike)) {
      this._importError = this._t("editor.import_error");
      return;
    }
    const start = this._config.tabs.length;
    const tabs = [...this._config.tabs, ...list.map(normalizeTab)];
    const expanded = new Set(this._expanded);
    for (let i = start; i < tabs.length; i++) expanded.add(i);
    this._expanded = expanded;
    this._importOpen = false;
    this._importValue = undefined;
    this._flash(this._t(list.length > 1 ? "editor.imported_many" : "editor.imported_one", { count: list.length }));
    this._emit({ ...this._config, tabs });
  }

  private _renderImport() {
    const onYaml = (e: CustomEvent) => {
      e.stopPropagation();
      const d = e.detail as any;
      this._importValue = d?.isValid === false ? undefined : d?.value;
      this._importError = "";
    };
    return html`
      <div class="import-panel">
        <div class="import-hint">${this._t("editor.import_hint")}</div>
        ${customElements.get("ha-yaml-editor")
          ? html`<ha-yaml-editor @value-changed=${onYaml}></ha-yaml-editor>`
          : html`<textarea
              class="import-json"
              rows="8"
              placeholder='{"name": "Lights", "card": {"type": "light", "entity": "light.kitchen"}}'
              @input=${(e: any) => {
                try {
                  this._importValue = JSON.parse(e.target.value);
                  this._importError = "";
                } catch {
                  this._importValue = undefined;
                }
              }}
            ></textarea>`}
        ${this._importError ? html`<div class="import-error" role="alert">${this._importError}</div>` : nothing}
        <div class="import-actions">
          <ha-button class="import-apply" @click=${this._applyImport}>${this._t("editor.add")}</ha-button>
          <ha-button class="import-cancel" @click=${this._toggleImport}>${this._t("editor.cancel")}</ha-button>
        </div>
      </div>
    `;
  }

  private _toggleExpanded(index: number): void {
    const next = new Set(this._expanded);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this._expanded = next;
  }

  private _onHeaderKeydown(index: number, e: KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._toggleExpanded(index);
    }
  }

  private _editCardJson(index: number, raw: string): void {
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      this._cardError = index;
      return;
    }
    this._cardError = null;
    this._patchTab(index, { card: parsed });
  }

  // Drag-to-reorder via ha-sortable (fires item-moved with old/new indices).
  private _onItemMoved(e: CustomEvent): void {
    if (!this._config) return;
    const { oldIndex, newIndex } = (e.detail ?? {}) as { oldIndex: number; newIndex: number };
    if (
      oldIndex == null ||
      newIndex == null ||
      oldIndex === newIndex ||
      oldIndex < 0 ||
      newIndex < 0 ||
      oldIndex >= this._config.tabs.length ||
      newIndex >= this._config.tabs.length
    )
      return;
    const tabs = this._config.tabs.slice();
    const [moved] = tabs.splice(oldIndex, 1);
    tabs.splice(newIndex, 0, moved);
    this._expanded = new Set();
    this._picked = new Set();
    this._emit({ ...this._config, tabs });
  }

  // Editor warnings for footguns the user can't see at a glance.
  private _warnings(): string[] {
    const cfg = this._config;
    if (!cfg) return [];
    const out: string[] = [];
    const names = cfg.tabs.map((t) => t.name ?? "").filter((n) => n);
    const dupes = names.filter((n, i) => names.indexOf(n) !== i);
    if (dupes.length > 0) {
      out.push(this._t("editor.warn_duplicates", { names: [...new Set(dupes)].join(", ") }));
    }
    return out;
  }

  private _move(index: number, delta: number): void {
    if (!this._config) return;
    const target = index + delta;
    if (target < 0 || target >= this._config.tabs.length) return;
    const tabs = this._config.tabs.slice();
    [tabs[index], tabs[target]] = [tabs[target], tabs[index]];
    this._expanded = new Set();
    this._picked = new Set();
    this._emit({ ...this._config, tabs });
  }

  private _openCard(index: number): void {
    this._cardError = null;
    this._editingTab = index;
  }

  private _closeCard(): void {
    this._editingTab = null;
  }

  private get _lovelace(): any {
    return this.lovelace ?? { config: { views: [] }, editMode: true };
  }

  private _onNativeCardChanged(index: number, e: CustomEvent): void {
    e.stopPropagation();
    const config = (e.detail as any)?.config;
    if (!config) return;
    // Editing a grouped tab's nested deck edits its children.
    if (this._config?.tabs[index]?.children && Array.isArray(config.tabs)) {
      this._patchTab(index, normalizeTab({ ...this._config.tabs[index], children: config.tabs }));
      return;
    }
    this._patchTab(index, { card: config });
  }

  // User picked a card type from the chooser; seed the tab with it so the view
  // flips to the card editor for that type.
  private _onTypeChosen(index: number, e: CustomEvent): void {
    e.stopPropagation();
    const type = (e.detail as any)?.value?.type;
    if (!type) return;
    this._patchTab(index, { card: { type } as any });
  }

  // Reset the card to typeless so the chooser reappears, letting the user switch
  // to a different card type.
  private _changeCardType(index: number): void {
    this._patchTab(index, { card: {} as any });
  }

  private _onYamlCardChanged(index: number, e: CustomEvent): void {
    e.stopPropagation();
    const detail = e.detail as any;
    if (detail?.isValid === false) return;
    if (detail?.value === undefined) return;
    this._patchTab(index, { card: detail.value });
  }

  // Current default_tab expressed as a single option value (tab name, or the
  // stringified index) so it can seed the ha-form select.
  private _defaultTabValue(cfg: TabdeckCardConfig): string | undefined {
    for (let i = 0; i < cfg.tabs.length; i++) {
      const value = cfg.tabs[i].name ?? String(i);
      if (String(cfg.default_tab) === value || cfg.default_tab === i) return value;
    }
    return undefined;
  }

  // ha-form select options as {value,label}; labels localised where a
  // translation exists (editor.opt.<field>.<value>).
  private _opts = (values: string[], field?: string) =>
    values.map((v) => {
      const key = `editor.opt.${field}.${v}`;
      return { value: v, label: field && hasKey(key) ? this._t(key) : v };
    });

  // Resolve a CSS colour against the current theme (via a probe inside the
  // editor, so theme variables apply) to [r, g, b].
  private _resolveColor(value: string): number[] | undefined {
    const probe = document.createElement("span");
    probe.style.color = value;
    if (!probe.style.color) return undefined;
    this.renderRoot.appendChild(probe);
    const rgb = parseRgb(getComputedStyle(probe).color);
    probe.remove();
    return rgb;
  }

  // Accent / colour too close to the card background to read (< 3:1).
  private _contrastWarnings(tab: Record<string, any>): string[] {
    const bg = this._resolveColor("var(--card-background-color, var(--ha-card-background, #fff))");
    if (!bg) return [];
    const out: string[] = [];
    for (const field of ["accent", "color"]) {
      const value = tab[field];
      if (typeof value !== "string" || !value || value.includes("{")) continue;
      const rgb = this._resolveColor(cssColor(value)!);
      if (!rgb) continue;
      const ratio = contrastRatio(rgb, bg);
      if (ratio < 3) {
        out.push(this._t("editor.contrast_low", { field: this._t(`editor.tab.${field}`), ratio: ratio.toFixed(1) }));
      }
    }
    return out;
  }

  private _globalSchema() {
    const cfg = this._config!;
    // ha-form's select selector wants options as {value,label} objects.
    // Option labels are localised where a translation exists (editor.opt.<field>.<value>).
    const opts = (values: string[], field?: string) =>
      values.map((v) => {
        const key = `editor.opt.${field}.${v}`;
        return { value: v, label: field && hasKey(key) ? this._t(key) : v };
      });
    const tabOptions = cfg.tabs.map((t, i) => ({
      value: t.name ?? String(i),
      label: t.name || this._t("editor.tab_n", { n: i + 1 }),
    }));
    return [
      { name: "preset", selector: { select: { mode: "dropdown", options: opts(["", ...PRESET_NAMES]) } } },
      { name: "position", selector: { select: { mode: "dropdown", options: opts(["top", "bottom", "left", "right"], "position") } } },
      { name: "orientation_layout", selector: { boolean: {} } },
      { name: "style", selector: { select: { mode: "dropdown", options: opts(["underline", "pill", "segmented", "boxed", "text", "rail"], "style") } } },
      { name: "tab_display", selector: { select: { mode: "dropdown", options: opts(["both", "icon", "label", "active", "dots"], "tab_display") } } },
      { name: "align", selector: { select: { mode: "dropdown", options: opts(["start", "center", "end", "justify"], "align") } } },
      { name: "badge_display", selector: { select: { mode: "dropdown", options: opts(["text", "dot"], "badge_display") } } },
      { name: "hide_inactive_badge", selector: { boolean: {} } },
      { name: "badge_bounce", selector: { boolean: {} } },
      { name: "transition", selector: { select: { mode: "dropdown", options: opts(["none", "fade", "slide", "scale", "flip", "rise"], "transition") } } },
      { name: "transition_narrow", selector: { select: { mode: "dropdown", options: opts(["", "none", "fade", "slide", "scale", "flip", "rise"], "transition") } } },
      { name: "transition_duration", selector: { number: { min: 0, max: 2000, step: 10, mode: "box" } } },
      { name: "transition_easing", selector: { text: {} } },
      { name: "indicator_size", selector: { number: { min: 1, max: 16, step: 1, mode: "slider" } } },
      { name: "indicator_radius", selector: { number: { min: 0, max: 30, step: 1, mode: "slider" } } },
      { name: "remember", selector: { select: { mode: "dropdown", options: opts(["none", "browser", "url", "entity"], "remember") } } },
      { name: "remember_entity", selector: { text: {} } },
      { name: "storage_key", selector: { text: {} } },
      { name: "default_tab", selector: { select: { mode: "dropdown", options: tabOptions } } },
      { name: "scrollable", selector: { select: { mode: "dropdown", options: opts(["auto", "true", "false"], "scrollable") } } },
      { name: "lazy", selector: { boolean: {} } },
      { name: "preload", selector: { select: { mode: "dropdown", options: opts(["", "idle", "all"], "preload") } } },
      { name: "unmount_hidden", selector: { boolean: {} } },
      { name: "loading_placeholder", selector: { boolean: {} } },
      { name: "friendly_errors", selector: { boolean: {} } },
      { name: "swipe_wrap", selector: { boolean: {} } },
      { name: "animated", selector: { boolean: {} } },
      { name: "liquid_indicator", selector: { boolean: {} } },
      { name: "accent_indicator", selector: { boolean: {} } },
      { name: "picture_accent", selector: { boolean: {} } },
      { name: "header", selector: { boolean: {} } },
      { name: "aria_label", selector: { text: {} } },
      { name: "sticky", selector: { boolean: {} } },
      { name: "bar_autohide", selector: { boolean: {} } },
      { name: "elevation", selector: { boolean: {} } },
      { name: "glass", selector: { boolean: {} } },
      { name: "scroll_buttons", selector: { boolean: {} } },
      { name: "bar_fade", selector: { boolean: {} } },
      { name: "overflow_menu", selector: { boolean: {} } },
      { name: "hidden_alerts", selector: { boolean: {} } },
      { name: "summary_chip", selector: { boolean: {} } },
      { name: "bar_limit", selector: { number: { min: 0, max: 100, step: 1, mode: "box" } } },
      { name: "bar_background", selector: { text: {} } },
      { name: "bar_text", selector: { select: { mode: "dropdown", options: opts(["", "auto", "light", "dark"], "bar_text") } } },
      { name: "swipe", selector: { boolean: {} } },
      { name: "swipe_mouse", selector: { boolean: {} } },
      { name: "wheel_switch", selector: { boolean: {} } },
      { name: "swipe_lock", selector: { boolean: {} } },
      { name: "swipe_edge", selector: { number: { min: 0, max: 400, step: 4, mode: "box", unit_of_measurement: "px" } } },
      { name: "tab_display_narrow", selector: { select: { mode: "dropdown", options: opts(["", "both", "icon", "label", "active", "dots"], "tab_display") } } },
      { name: "narrow_width", selector: { number: { min: 100, max: 4000, step: 10, mode: "box" } } },
      { name: "split", selector: { number: { min: 0, max: 4000, step: 10, mode: "box" } } },
      { name: "collapsible", selector: { boolean: {} } },
      { name: "start_collapsed", selector: { boolean: {} } },
      { name: "scroll_spy", selector: { boolean: {} } },
      { name: "auto_rotate", selector: { number: { min: 0, max: 3600, step: 1, mode: "box" } } },
      { name: "idle_return", selector: { number: { min: 0, max: 86400, step: 1, mode: "box" } } },
      { name: "idle_dim", selector: { number: { min: 0, max: 1440, step: 1, mode: "box" } } },
      { name: "idle_dim_mode", selector: { select: { mode: "dropdown", options: opts(["dim", "black", "clock"], "idle_dim_mode") } } },
      { name: "dock", selector: { boolean: {} } },
      { name: "content_arrows", selector: { boolean: {} } },
      { name: "wizard", selector: { boolean: {} } },
      { name: "breadcrumbs", selector: { boolean: {} } },
      { name: "search", selector: { boolean: {} } },
      { name: "entity_search", selector: { boolean: {} } },
      { name: "hotkeys", selector: { boolean: {} } },
      { name: "history", selector: { boolean: {} } },
      { name: "scroll_memory", selector: { boolean: {} } },
      { name: "customize", selector: { boolean: {} } },
      { name: "drag_reorder", selector: { boolean: {} } },
      { name: "rail_expand", selector: { boolean: {} } },
      { name: "content_height", selector: { text: {} } },
      { name: "content_max_height", selector: { text: {} } },
      { name: "fullscreen", selector: { boolean: {} } },
      { name: "overview", selector: { boolean: {} } },
      { name: "last_tab_button", selector: { boolean: {} } },
      { name: "swipe_peek", selector: { boolean: {} } },
      { name: "hold_peek", selector: { boolean: {} } },
      { name: "compare", selector: { boolean: {} } },
      { name: "changed_dot", selector: { boolean: {} } },
      { name: "sort_by_usage", selector: { boolean: {} } },
      { name: "learned_default", selector: { boolean: {} } },
      { name: "health_dim", selector: { boolean: {} } },
      { name: "alert_first", selector: { boolean: {} } },
      { name: "alert_snooze", selector: { number: { min: 0, max: 1440, step: 1, mode: "box" } } },
      { name: "remote_entity", selector: { entity: { domain: ["input_text", "input_select", "select", "sensor"] } } },
      { name: "follow_room", selector: { entity: { domain: ["sensor", "input_select", "select", "input_text", "device_tracker"] } } },
      { name: "remote_event", selector: { boolean: {} } },
      { name: "fire_event", selector: { boolean: {} } },
      { name: "companion", selector: { boolean: {} } },
      { name: "offline_banner", selector: { boolean: {} } },
      { name: "usage_stats", selector: { number: { min: 0, max: 60, step: 1, mode: "box", unit_of_measurement: "min" } } },
      { name: "event_id", selector: { text: {} } },
      { name: "sync_group", selector: { text: {} } },
      { name: "popup", selector: { select: { mode: "dropdown", options: opts(["", "on", "hidden"], "popup") } } },
      { name: "share_button", selector: { select: { mode: "dropdown", options: opts(["", "link", "qr"], "share_button") } } },
      { name: "unload_after", selector: { number: { min: 0, max: 1440, step: 1, mode: "box" } } },
      { name: "edit_mode_reveal", selector: { boolean: {} } },
      { name: "density", selector: { select: { mode: "dropdown", options: opts(["default", "compact", "comfortable"], "density") } } },
      { name: "haptic", selector: { select: { mode: "dropdown", options: opts(["", "selection", "light", "medium", "heavy"], "haptic") } } },
      { name: "click_sound", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
      { name: "debug", selector: { select: { mode: "dropdown", options: opts(["", "on", "speed"], "debug") } } },
    ];
  }

  // The globals' editor values for a config (the selects/switches/boxes shown).
  private _dataFor(cfg: TabdeckCardConfig): Record<string, any> {
    return {
      preset: cfg.preset ?? "",
      position: cfg.position,
      orientation_layout: !!cfg.orientation_layout,
      style: cfg.style,
      tab_display: cfg.tab_display,
      align: cfg.align,
      badge_display: cfg.badge_display,
      hide_inactive_badge: cfg.hide_inactive_badge,
      badge_bounce: cfg.badge_bounce,
      transition: cfg.transition,
      indicator_size: cfg.indicator_size,
      indicator_radius: cfg.indicator_radius,
      remember: cfg.remember,
      remember_entity: cfg.remember_entity ?? "",
      storage_key: cfg.storage_key ?? "",
      default_tab: this._defaultTabValue(cfg),
      scrollable: String(cfg.scrollable),
      lazy: cfg.lazy,
      preload: cfg.preload ?? "",
      unmount_hidden: cfg.unmount_hidden,
      loading_placeholder: cfg.loading_placeholder,
      friendly_errors: cfg.friendly_errors,
      swipe_wrap: cfg.swipe_wrap,
      animated: cfg.animated,
      liquid_indicator: cfg.liquid_indicator,
      accent_indicator: cfg.accent_indicator,
      picture_accent: cfg.picture_accent,
      header: cfg.header,
      aria_label: cfg.aria_label ?? "",
      sticky: cfg.sticky,
      bar_autohide: cfg.bar_autohide,
      elevation: cfg.elevation,
      glass: !!cfg.glass,
      scroll_buttons: cfg.scroll_buttons,
      bar_fade: cfg.bar_fade,
      overflow_menu: cfg.overflow_menu,
      hidden_alerts: cfg.hidden_alerts,
      summary_chip: !!cfg.summary_chip,
      bar_limit: cfg.bar_limit ?? 0,
      bar_background: cfg.bar_background ?? "",
      bar_text: cfg.bar_text ?? "",
      swipe: cfg.swipe,
      swipe_mouse: cfg.swipe_mouse,
      wheel_switch: cfg.wheel_switch,
      swipe_lock: cfg.swipe_lock,
      swipe_edge: cfg.swipe_edge ?? 0,
      tab_display_narrow: cfg.tab_display_narrow ?? "",
      narrow_width: cfg.narrow_width,
      split: cfg.split?.min_width ?? 0,
      collapsible: cfg.collapsible,
      start_collapsed: cfg.start_collapsed,
      scroll_spy: cfg.scroll_spy,
      auto_rotate: cfg.auto_rotate?.interval ?? 0,
      idle_return: cfg.idle_return ?? 0,
      idle_dim: cfg.idle_dim?.after ?? 0,
      idle_dim_mode: cfg.idle_dim?.mode ?? "dim",
      dock: cfg.dock,
      content_arrows: cfg.content_arrows,
      wizard: !!cfg.wizard,
      breadcrumbs: !!cfg.breadcrumbs,
      search: cfg.search,
      entity_search: cfg.entity_search,
      hotkeys: cfg.hotkeys,
      history: cfg.history,
      scroll_memory: cfg.scroll_memory,
      customize: cfg.customize,
      drag_reorder: cfg.drag_reorder,
      rail_expand: cfg.rail_expand,
      edit_mode_reveal: cfg.edit_mode_reveal,
      transition_narrow: cfg.transition_narrow ?? "",
      transition_duration: cfg.transition_duration,
      transition_easing: cfg.transition_easing,
      content_height: cfg.content_height,
      content_max_height: cfg.content_max_height ?? "",
      fullscreen: cfg.fullscreen,
      overview: cfg.overview,
      last_tab_button: cfg.last_tab_button,
      swipe_peek: cfg.swipe_peek,
      hold_peek: cfg.hold_peek,
      compare: cfg.compare,
      changed_dot: cfg.changed_dot,
      sort_by_usage: cfg.sort_by_usage,
      learned_default: !!cfg.learned_default,
      health_dim: cfg.health_dim !== undefined,
      unload_after: cfg.unload_after ?? 0,
      alert_first: cfg.alert_first,
      alert_snooze: cfg.alert_snooze ?? 0,
      remote_entity: cfg.remote_entity ?? "",
      follow_room: cfg.follow_room?.entity ?? "",
      remote_event: cfg.remote_event,
      fire_event: cfg.fire_event,
      companion: cfg.companion,
      offline_banner: cfg.offline_banner,
      usage_stats: cfg.usage_stats ?? 0,
      event_id: cfg.event_id ?? "",
      sync_group: cfg.sync_group ?? "",
      popup: cfg.popup === true ? "on" : cfg.popup ?? "",
      share_button: cfg.share_button ?? "",
      debug: cfg.debug === "speed" ? "speed" : cfg.debug ? "on" : "",
      density: cfg.density,
      haptic: cfg.haptic ?? "",
      click_sound: cfg.click_sound ?? 0,
    };
  }

  private _onGlobalChanged(e: CustomEvent): void {
    e.stopPropagation();
    const v = (e.detail as any).value ?? {};
    // Picking a preset writes its bundle of values; other fields follow.
    if (this._config && isPreset(v.preset) && v.preset !== this._config.preset) {
      this._emit(applyPresetToConfig(this._config, v.preset));
      return;
    }
    const scrollable =
      v.scrollable === "auto" ? "auto" : v.scrollable === "true" || v.scrollable === true;
    this._patch({
      position: v.position,
      // On: keep positions set in YAML; the defaults are written as true.
      orientation_layout: (v.orientation_layout
        ? this._config?.orientation_layout && (this._config.orientation_layout.portrait !== "bottom" || this._config.orientation_layout.landscape !== "left")
          ? this._config.orientation_layout
          : true
        : undefined) as any,
      style: v.style,
      tab_display: v.tab_display,
      align: v.align,
      badge_display: v.badge_display,
      hide_inactive_badge: !!v.hide_inactive_badge,
      badge_bounce: !!v.badge_bounce,
      transition: v.transition,
      indicator_size: v.indicator_size,
      indicator_radius: v.indicator_radius,
      remember: v.remember,
      remember_entity: v.remember_entity || undefined,
      storage_key: v.storage_key || undefined,
      default_tab: v.default_tab,
      scrollable,
      lazy: !!v.lazy,
      preload: v.preload === "idle" || v.preload === "all" ? v.preload : undefined,
      unmount_hidden: !!v.unmount_hidden,
      loading_placeholder: !!v.loading_placeholder,
      friendly_errors: !!v.friendly_errors,
      swipe_wrap: !!v.swipe_wrap,
      animated: !!v.animated,
      liquid_indicator: !!v.liquid_indicator,
      accent_indicator: !!v.accent_indicator,
      picture_accent: !!v.picture_accent,
      header: !!v.header,
      aria_label: v.aria_label || undefined,
      sticky: !!v.sticky,
      bar_autohide: !!v.bar_autohide,
      elevation: !!v.elevation,
      // A blur strength from YAML stays while the switch is on.
      glass: v.glass ? (this._config?.glass || true) : undefined,
      scroll_buttons: !!v.scroll_buttons,
      bar_fade: v.bar_fade !== false,
      overflow_menu: !!v.overflow_menu,
      hidden_alerts: !!v.hidden_alerts,
      // Custom text / { text, icon, color } from YAML stays while the switch is on.
      summary_chip: v.summary_chip ? (this._config?.summary_chip || true) : undefined,
      bar_limit: normalizeBarLimit(v.bar_limit),
      bar_background: v.bar_background || undefined,
      bar_text: v.bar_text || undefined,
      swipe: !!v.swipe,
      swipe_mouse: !!v.swipe_mouse,
      wheel_switch: !!v.wheel_switch,
      swipe_lock: !!v.swipe_lock,
      swipe_edge: Number(v.swipe_edge) > 0 ? Math.max(8, Number(v.swipe_edge)) : undefined,
      tab_display_narrow: v.tab_display_narrow || undefined,
      narrow_width: Number(v.narrow_width) || 450,
      // Keep a YAML-set column count when only the width is edited.
      split:
        Number(v.split) > 0
          ? { min_width: Number(v.split), columns: this._config?.split?.columns ?? 2 }
          : undefined,
      collapsible: !!v.collapsible,
      start_collapsed: !!v.collapsible && !!v.start_collapsed,
      scroll_spy: !!v.scroll_spy,
      // Keep a YAML-set resume_after when only the interval is edited.
      auto_rotate:
        Number(v.auto_rotate) > 0
          ? {
              interval: Math.max(2, Number(v.auto_rotate)),
              resume_after: this._config?.auto_rotate?.resume_after ?? 60,
            }
          : undefined,
      idle_return: Number(v.idle_return) > 0 ? Math.max(5, Number(v.idle_return)) : undefined,
      // Keep a YAML-set opacity when only the minutes / mode are edited.
      idle_dim:
        Number(v.idle_dim) > 0
          ? {
              after: Number(v.idle_dim),
              mode: v.idle_dim_mode === "black" || v.idle_dim_mode === "clock" ? v.idle_dim_mode : "dim",
              opacity: this._config?.idle_dim?.opacity ?? 0.7,
            }
          : undefined,
      dock: !!v.dock,
      content_arrows: !!v.content_arrows,
      // Keep a YAML-set finish_action while the switch stays on.
      wizard: v.wizard ? this._config?.wizard ?? {} : undefined,
      // Keep a YAML-set root crumb while the switch stays on.
      breadcrumbs: v.breadcrumbs ? this._config?.breadcrumbs ?? {} : undefined,
      search: !!v.search,
      entity_search: !!v.entity_search,
      hotkeys: !!v.hotkeys,
      history: !!v.history,
      scroll_memory: !!v.scroll_memory,
      customize: !!v.customize,
      drag_reorder: !!v.drag_reorder,
      rail_expand: !!v.rail_expand,
      edit_mode_reveal: v.edit_mode_reveal !== false,
      transition_duration: Number.isFinite(Number(v.transition_duration))
        ? Math.min(2000, Math.max(0, Number(v.transition_duration)))
        : 180,
      transition_easing: v.transition_easing || "ease",
      transition_narrow: v.transition_narrow || undefined,
      content_height: v.content_height === "tallest" ? "tallest" : cssLength(v.content_height) ?? "auto",
      content_max_height: cssLength(v.content_max_height),
      fullscreen: !!v.fullscreen,
      overview: !!v.overview,
      last_tab_button: !!v.last_tab_button,
      swipe_peek: !!v.swipe_peek,
      hold_peek: !!v.hold_peek,
      compare: !!v.compare,
      changed_dot: !!v.changed_dot,
      sort_by_usage: !!v.sort_by_usage,
      learned_default: v.learned_default ? (this._config?.learned_default || true) as any : undefined,
      // Keep a YAML-set share when the switch stays on.
      health_dim: v.health_dim ? this._config?.health_dim ?? 0.5 : undefined,
      unload_after: Number(v.unload_after) > 0 ? Math.max(1, Number(v.unload_after)) : undefined,
      alert_first: !!v.alert_first,
      alert_snooze: Number(v.alert_snooze) > 0 ? Number(v.alert_snooze) : undefined,
      remote_entity: v.remote_entity || undefined,
      // Keep a YAML map when the entity changes.
      follow_room: v.follow_room ? { ...this._config?.follow_room, entity: v.follow_room } : undefined,
      remote_event: !!v.remote_event,
      fire_event: !!v.fire_event,
      companion: !!v.companion,
      offline_banner: !!v.offline_banner,
      usage_stats: Number(v.usage_stats) > 0 ? Math.min(60, Math.round(Number(v.usage_stats))) : undefined,
      event_id: v.event_id || undefined,
      popup: v.popup === "on" ? true : v.popup === "hidden" ? "hidden" : undefined,
      share_button: (v.share_button === "link" ? true : v.share_button === "qr" ? "qr" : undefined) as any,
      sync_group: typeof v.sync_group === "string" && v.sync_group.trim() ? v.sync_group.trim() : undefined,
      debug: v.debug === "speed" ? "speed" : v.debug === "on" || v.debug === true,
      density: v.density === "compact" || v.density === "comfortable" ? v.density : "default",
      haptic: v.haptic || undefined,
      click_sound: Number(v.click_sound) > 0 ? Math.min(1, Number(v.click_sound)) : undefined,
    });
  }

  private _onTabFieldsChanged(index: number, e: CustomEvent): void {
    e.stopPropagation();
    const v = (e.detail as any).value ?? {};
    this._patchTab(index, {
      name: v.name ?? "",
      subtitle: v.subtitle || undefined,
      tooltip: v.tooltip || undefined,
      icon: v.icon || undefined,
      accent: v.accent || undefined,
      color: v.color || undefined,
      // A count badge ({ count: ... }) is YAML-only: keep it unless replaced.
      badge: v.badge || (typeof this._config?.tabs[index]?.badge === "object" ? this._config.tabs[index].badge : undefined),
      badge_color: v.badge_color || undefined,
      countdown: v.countdown || undefined,
      background: v.background || undefined,
      page_background: v.page_background || undefined,
      badge_icon: v.badge_icon || undefined,
      picture: v.picture || undefined,
      icon_animation: v.icon_animation || undefined,
      separator: v.separator === "line" || v.separator === "space" ? v.separator : undefined,
      tab_ref: typeof v.tab_ref === "string" && v.tab_ref.trim() ? v.tab_ref.trim() : undefined,
      font_size: cssLength(typeof v.font_size === "string" && /^\d+(\.\d+)?$/.test(v.font_size) ? Number(v.font_size) : v.font_size),
      font_weight: v.font_weight ? String(v.font_weight) : undefined,
      font_family: v.font_family || undefined,
      ring: v.ring === undefined || v.ring === null || v.ring === "" ? undefined : String(v.ring),
      ring_max: Number(v.ring_max) > 0 ? Number(v.ring_max) : undefined,
      ring_color: v.ring_color || undefined,
      ring_style: v.ring_style ? "bar" : undefined,
      // { entity, hours, color } set in YAML keeps its extras while the entity stays.
      graph: v.graph
        ? typeof this._config?.tabs[index]?.graph === "object" && this._config.tabs[index].graph.entity === v.graph
          ? this._config.tabs[index].graph
          : v.graph
        : undefined,
      area: v.area || undefined,
      ...this._shortcutFields(index, v),
      auto_refresh: Number(v.auto_refresh) > 0 ? Number(v.auto_refresh) : undefined,
      zoom: normalizeZoom(v.zoom),
      // Typed digits only mean px.
      padding: lengthOrZero(typeof v.padding === "string" && /^\d+(\.\d+)?$/.test(v.padding.trim()) ? Number(v.padding) : v.padding),
      spacing: lengthOrZero(typeof v.spacing === "string" && /^\d+(\.\d+)?$/.test(v.spacing.trim()) ? Number(v.spacing) : v.spacing),
      // true / { title, text, icon } set in YAML is kept while the box is empty.
      empty_message:
        v.empty_message || (typeof this._config?.tabs[index]?.empty_message === "object" || this._config?.tabs[index]?.empty_message === true ? this._config.tabs[index].empty_message : undefined),
      pin: v.pin ? String(v.pin) : undefined,
      pin_timeout: Number(v.pin_timeout) > 0 ? Number(v.pin_timeout) : undefined,
      disabled: v.disabled ? true : undefined,
      fab: v.fab ? true : undefined,
      pip: v.pip ? true : undefined,
      keep_awake: v.keep_awake ? true : undefined,
      card_size: typeof v.card_size === "number" ? v.card_size : undefined,
      hold_action: v.hold_action ?? undefined,
      double_tap_action: v.double_tap_action ?? undefined,
      badge_action: v.badge_action ?? undefined,
      tap_action:
        v.tap_action && v.tap_action.action !== "none" ? v.tap_action : undefined,
      enter_action:
        v.enter_action && v.enter_action.action !== "none" ? v.enter_action : undefined,
      leave_action:
        v.leave_action && v.leave_action.action !== "none" ? v.leave_action : undefined,
    });
  }

  // Shortcut fields (view, url, markdown): typing one makes it the tab's content;
  // clearing it leaves the tab without a card type. An object form set in
  // YAML is kept.
  private _shortcutFields(index: number, v: Record<string, any>): Record<string, any> {
    const tab: any = this._config?.tabs[index] ?? {};
    const out: Record<string, any> = {};
    for (const key of SHORTCUT_KEYS) {
      const raw = v[key];
      // Markdown keeps its spacing (trimming would eat what's being typed).
      const text =
        typeof raw === "string" ? (key === "markdown" ? (raw.trim() ? raw : "") : raw.trim()) : typeof raw === "number" ? String(raw) : "";
      if (!text && tab[key] && typeof tab[key] === "object") continue;
      out[key] = text || undefined;
    }
    const next = { ...tab, ...out };
    if (!SHORTCUT_KEYS.some((k) => next[k] !== tab[k])) return out;
    const derived = shortcutCard(next);
    if (derived) out.card = derived;
    else if (isShortcutCard(tab)) out.card = {};
    return out;
  }

  // A collapsible condition-list editor for one of a tab's condition keys.
  // Uses HA's own ha-card-conditions-editor (the one behind a card's
  // Visibility tab) — tabdeck-only condition types such as `template` show as
  // editable YAML inside it. Falls back to ha-yaml-editor, then JSON.
  private _renderConditions(index: number, tab: any, sec: ConditionSection) {
    const conditions: any[] = Array.isArray(tab[sec.key]) ? tab[sec.key] : [];
    const onChange = (e: CustomEvent) => {
      e.stopPropagation();
      const value = (e.detail as any)?.value;
      if ((e.detail as any)?.isValid === false || !Array.isArray(value)) return;
      this._patchTab(index, { [sec.key]: value.length ? value : undefined });
    };
    let body;
    if (customElements.get("ha-card-conditions-editor")) {
      body = html`<ha-card-conditions-editor
        .hass=${this.hass}
        .conditions=${conditions}
        @value-changed=${onChange}
      ></ha-card-conditions-editor>`;
    } else if (customElements.get("ha-yaml-editor")) {
      body = html`<ha-yaml-editor
        .defaultValue=${conditions}
        @value-changed=${onChange}
      ></ha-yaml-editor>`;
    } else {
      body = html`<textarea
        class="conditions-json"
        rows="6"
        .value=${JSON.stringify(conditions, null, 2)}
        @change=${(e: any) => {
          try {
            const value = JSON.parse(e.target.value || "[]");
            if (Array.isArray(value)) {
              this._patchTab(index, { [sec.key]: value.length ? value : undefined });
            }
          } catch {
            /* keep typing */
          }
        }}
      ></textarea>`;
    }
    const check = conditions.length && this._hass ? this._explain(conditions) : undefined;
    return html`
      <details class="conditions-section" data-key=${sec.key}>
        <summary>
          ${this._t(`editor.cond.${sec.key}.label`)}${conditions.length ? ` (${conditions.length})` : ""}
          ${check
            ? html`<span class="check-dot ${check.met ? "met" : "unmet"}" aria-hidden="true"></span>`
            : nothing}
          <span class="conditions-hint">${this._t(`editor.cond.${sec.key}.hint`)}</span>
        </summary>
        ${check ? this._renderCheck(check) : nothing}
        ${body}
      </details>
    `;
  }

  // Live "why" panel: every condition with its current result.
  private _renderCheck(check: { met: boolean; items: ConditionExplanation[] }) {
    return html`
      <div class="check ${check.met ? "met" : "unmet"}" role="status">
        <div class="check-head">
          ${check.met ? "✅" : "❌"} ${this._t(check.met ? "check.now_met" : "check.now_unmet")}
        </div>
        <ul class="check-list">
          ${check.items.map((i) => this._renderCheckItem(i))}
        </ul>
      </div>
    `;
  }

  private _renderCheckItem(i: ConditionExplanation): unknown {
    const mark = i.met ? "✅" : "❌";
    return html`<li class="check-item ${i.met ? "met" : "unmet"}">
      <span class="check-mark">${mark}</span>
      <span class="check-text">${this._describe(i)}</span>
      ${i.children
        ? html`<ul class="check-list">${i.children.map((c) => this._renderCheckItem(c))}</ul>`
        : nothing}
    </li>`;
  }

  private _describe(i: ConditionExplanation): string {
    const t = (k: string, v?: Record<string, string | number>) => this._t(k, v);
    const now = (): string => {
      if (i.missing) return ` (${t("check.missing")})`;
      return i.current !== undefined ? ` (${t("check.now", { value: i.current })})` : "";
    };
    switch (i.type) {
      case "state":
        return (
          t(i.negate ? "check.state_is_not" : "check.state_is", {
            entity: i.entity ?? "?",
            values: (i.expected ?? []).join(t("check.or")),
          }) + now()
        );
      case "numeric_state": {
        const parts: string[] = [];
        if (i.above !== undefined) parts.push(t("check.above", { value: i.above }));
        if (i.below !== undefined) parts.push(t("check.below", { value: i.below }));
        return t("check.numeric", { entity: i.entity ?? "?", range: parts.join(t("check.and")) }) + now();
      }
      case "screen":
        return t("check.screen", { query: i.media_query ?? "" });
      case "time": {
        const parts: string[] = [];
        if (i.after) parts.push(t("check.time_after", { value: i.after }));
        if (i.before) parts.push(t("check.time_before", { value: i.before }));
        if (i.weekday?.length) parts.push(t("check.time_days", { days: i.weekday.join(", ") }));
        return t("check.time", { range: parts.join(" ") });
      }
      case "user":
        return t("check.user", { count: i.count ?? 0 });
      case "template":
        return t(i.pending ? "check.template_pending" : "check.template");
      case "and":
      case "or":
      case "not":
        return t(`check.group_${i.type}`);
      default:
        return t("check.unknown");
    }
  }

  // HA lazy-loads its conditions editor with the conditional card's editor;
  // pull it in so the builder is available even if nothing else loaded it.
  private async _ensureConditionsEditor(): Promise<void> {
    if (customElements.get("ha-card-conditions-editor")) return;
    try {
      const helpers = await (window as any).loadCardHelpers?.();
      helpers?.createCardElement?.({ type: "conditional", conditions: [], card: { type: "markdown" } });
      const ctor: any = customElements.get("hui-conditional-card");
      await ctor?.getConfigElement?.();
      if (customElements.get("ha-card-conditions-editor")) this.requestUpdate();
    } catch {
      /* fallback editors are used */
    }
  }

  protected firstUpdated(): void {
    void this._ensureConditionsEditor();
    // HA lays the dialog out after the editor first draws.
    setTimeout(this._checkHaPreview, 300);
  }

  private _computeGlobalLabel = (s: { name: string }) => this._t(`editor.global.${s.name}`);
  private _computeTabLabel = (s: { name: string }) => this._t(`editor.tab.${s.name}`);

  render() {
    if (!this._config) return html``;
    return html`${this._renderHistory()}${this._editingTab !== null
      ? this._renderCardView(this._editingTab)
      : this._renderListView()}`;
  }

  private _renderCardView(index: number) {
    const tab = this._config!.tabs[index];
    if (!tab) {
      // Tab vanished (e.g. deleted elsewhere) — bail back to the list.
      this._editingTab = null;
      return this._renderListView();
    }
    const hasType = !!tab.card?.type;
    return html`
      <div class="card-editor-view">
        <div class="card-editor-header">
          <button class="back-to-list" @click=${this._closeCard}><span class="flip">←</span> ${this._t("editor.back")}</button>
          <span class="card-editor-title">${tab.name || this._t("editor.tab_n", { n: index + 1 })}</span>
          ${hasType
            ? html`<button class="change-card-type" @click=${() => this._changeCardType(index)}>
                ${this._t("editor.change_type")}
              </button>`
            : nothing}
        </div>
        ${hasType
          ? this._renderCardEditor(index, tab)
          : this._renderCardTypeChooser(index)}
      </div>
    `;
  }

  private _renderCardTypeChooser(index: number) {
    return html`
      <div class="card-type-chooser">
        <ha-form
          class="card-type-form"
          .hass=${this.hass}
          .data=${{}}
          .schema=${CARD_TYPE_SCHEMA}
          .computeLabel=${() => this._t("editor.card_type")}
          @value-changed=${(e: CustomEvent) => this._onTypeChosen(index, e)}
        ></ha-form>
        <p class="card-type-hint">${this._t("editor.card_type_hint")}</p>
      </div>
    `;
  }

  private _renderCardEditor(index: number, tab: any) {
    const tag = pickCardEditorTag((t) => !!customElements.get(t));
    if (tag === "hui-card-element-editor") {
      return html`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this._lovelace}
          .value=${tab.card ?? {}}
          @config-changed=${(e: CustomEvent) => this._onNativeCardChanged(index, e)}
        ></hui-card-element-editor>
      `;
    }
    if (tag === "ha-yaml-editor") {
      return html`
        <ha-yaml-editor
          .defaultValue=${tab.card ?? {}}
          @value-changed=${(e: CustomEvent) => this._onYamlCardChanged(index, e)}
        ></ha-yaml-editor>
      `;
    }
    return html`
      <label class="card-label"
        >${this._t("editor.card_json")}
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(tab.card ?? {}, null, 2)}
          @change=${(e: any) => this._editCardJson(index, e.target.value)}
        ></textarea>
      </label>
      ${this._cardError === index
        ? html`<div class="tab-card-error">${this._t("editor.invalid_json")}</div>`
        : nothing}
    `;
  }

  // Icons that fit the tab's name; a click sets one.
  private _renderIconSuggestions(index: number, tab: any) {
    const icons = suggestIcons(tab.name);
    if (!icons.length || isTemplate(tab.icon)) return nothing;
    return html`<div class="icon-suggest">
      <span class="icon-suggest-label">${this._t("editor.icon_suggest")}</span>
      ${icons.map(
        (icon) => html`<button
          class="icon-choice ${tab.icon === icon ? "on" : ""}"
          title=${icon}
          aria-label=${this._t("editor.icon_use", { icon })}
          aria-pressed=${tab.icon === icon ? "true" : "false"}
          @click=${() => this._patchTab(index, { icon })}
        >
          <ha-icon .icon=${icon}></ha-icon>
        </button>`,
      )}
    </div>`;
  }

  // At-a-glance live status on the collapsed tab header.
  private _renderStatusChips(tab: any) {
    if (!this._hass) return nothing;
    const hidden = Array.isArray(tab.visibility) && tab.visibility.length > 0 && !this._explain(tab.visibility).met;
    const alerting = Array.isArray(tab.alert) && tab.alert.length > 0 && this._explain(tab.alert).met;
    if (!hidden && !alerting) return nothing;
    return html`<span class="tab-status">
      ${hidden
        ? html`<span class="chip chip-hidden" title=${this._t("check.chip_hidden_title")}
            >${this._t("check.chip_hidden")}</span>`
        : nothing}
      ${alerting ? html`<span class="chip chip-alert">${this._t("check.chip_alert")}</span>` : nothing}
    </span>`;
  }

  // --- sections, search, status line ----------------------------------------
  private _hint(name: string): string {
    const key = `editor.hint.${name}`;
    return hasKey(key) ? this._t(key) : "";
  }

  private _computeGlobalHelper = (s: { name: string }) => this._hint(s.name) || undefined;

  // What a setting is found by: its label, hint, key name and option labels,
  // in the current HA language.
  private _fieldText(item: any): string {
    const opts = item.selector?.select?.options ?? [];
    return [
      this._t(`editor.global.${item.name}`),
      this._hint(item.name),
      item.name,
      item.name.replace(/_/g, " "),
      ...opts.map((o: any) => o.label),
    ].join(" ");
  }

  private _tabTags(tab: any): string[] {
    const tags: string[] = [];
    if (tab.badge) tags.push(this._t("editor.tag.badge"));
    if (tab.pin) tags.push(this._t("editor.tag.pin"));
    if (!tab.icon) tags.push(this._t("editor.tag.no_icon"));
    return tags;
  }

  private _tabMatches(tab: any, index: number, words: string[]): boolean {
    const name = tab.name || this._t("editor.tab_n", { n: index + 1 });
    return matchesWords([name, ...this._tabTags(tab)].join(" "), words);
  }

  private _isOpen(id: string, searching: boolean): boolean {
    return searching ? !this._searchClosed.has(id) : !!this._open[id];
  }

  private _onSectionToggle(id: string, e: CustomEvent): void {
    // Card editors inside a tab can hold expansion panels of their own.
    if (e.target !== e.currentTarget) return;
    const open = !!(e.detail as any)?.expanded;
    if (this._query.trim()) {
      const closed = new Set(this._searchClosed);
      if (open) closed.delete(id);
      else closed.add(id);
      this._searchClosed = closed;
      return;
    }
    this._open = { ...this._open, [id]: open };
    writeOpenSections(this._open);
  }

  private _onSearch(value: string): void {
    this._query = value;
    this._searchClosed = new Set();
  }

  // A section header's second line: lead values, then the other changed
  // settings, or "Defaults".
  private _sectionSummary(sec: EditorSection, schema: Map<string, any>, data: Record<string, any>, changed: string[]): string {
    const show = [...(sec.lead ?? []), ...changed.filter((f) => !sec.lead?.includes(f))];
    const parts = show.map((f) => {
      const item = schema.get(f);
      const v = data[f];
      const opt = item?.selector?.select?.options?.find((o: any) => o.value === v);
      if (opt) return opt.label;
      const label = this._t(`editor.global.${f}`);
      if (item?.selector?.boolean) return v ? label : `${label}: ${this._t("editor.off")}`;
      return `${label}: ${v}`;
    });
    return parts.length ? parts.join(" · ") : this._t("editor.section.defaults");
  }

  private _renderSection(id: string, icon: string, title: string, summary: string, dot: boolean, open: boolean, body: () => unknown) {
    if (customElements.get("ha-expansion-panel")) {
      return html`<ha-expansion-panel
        outlined
        class="section"
        data-section=${id}
        .expanded=${open}
        .header=${title}
        .secondary=${summary}
        @expanded-will-change=${(e: CustomEvent) => this._onSectionToggle(id, e)}
      >
        <ha-icon slot="leading-icon" .icon=${icon}></ha-icon>
        ${dot ? html`<span slot="icons" class="dot" title=${this._t("editor.section.changed")}></span>` : nothing}
        ${open ? body() : nothing}
      </ha-expansion-panel>`;
    }
    // Without HA's panel (very old HA, tests) every section is shown open.
    return html`<div class="section" data-section=${id}>
      <div class="section-head">
        <ha-icon .icon=${icon}></ha-icon>
        <span class="section-title">${title}</span>
        <span class="section-summary">${summary}</span>
        ${dot ? html`<span class="dot" title=${this._t("editor.section.changed")}></span>` : nothing}
      </div>
      ${body()}
    </div>`;
  }

  private _renderStatusLine(notes: ReturnType<typeof lintConfig>) {
    const lang = hassLanguage(this._hass);
    const n = this._config!.tabs.length;
    const warn = notes.some((x) => x.level === "warn");
    return html`<button
      class="status-line ${this._statusOpen ? "open" : ""}"
      aria-expanded=${this._statusOpen ? "true" : "false"}
      @click=${() => (this._statusOpen = !this._statusOpen)}
    >
      <span class="schip">${plural(lang, "editor.status.tabs", n)}</span>
      ${notes.length
        ? html`<span class="schip notes ${warn ? "warn" : ""}"
            ><ha-svg-icon .path=${LINT_ICONS[warn ? "warn" : "info"]}></ha-svg-icon>${plural(lang, "editor.status.notes", notes.length)}</span
          >`
        : nothing}
      ${this._note
        ? html`<span class="schip new"
            ><ha-svg-icon .path=${MDI_GIFT}></ha-svg-icon>${this._t("editor.status.new", { version: this._note })}</span
          >`
        : nothing}
      <ha-svg-icon class="status-chevron" .path=${MDI_CHEVRON_DOWN}></ha-svg-icon>
    </button>`;
  }

  // Open a setting's section, scroll to it and briefly highlight it.
  async _goToField(field: string): Promise<void> {
    const sec = sectionOf(field);
    if (!sec) return;
    this._query = "";
    this._searchClosed = new Set();
    this._open = { ...this._open, [sec.id]: true };
    writeOpenSections(this._open);
    this._flashField = field;
    await this.updateComplete;
    // HA's panel shows its content a frame after opening.
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    const row = this.renderRoot.querySelector(`.row[data-field="${field}"]`) as HTMLElement | null;
    row?.scrollIntoView?.({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" });
    setTimeout(() => (this._flashField = ""), 1600);
  }

  private _goToLint(note: { rule: string; vars?: Record<string, string | number> }): void {
    const target = lintTarget(note);
    if (target?.field) void this._goToField(target.field);
    else if (target?.tab) {
      const i = this._config!.tabs.findIndex((t, n) => (t.name || this._t("editor.tab_n", { n: n + 1 })) === target.tab);
      if (i >= 0) void this._focusTab(i);
    }
  }

  // Hide the editor's own preview strip while HA's preview sits beside it.
  private _checkHaPreview = (): void => {
    // HA's card editor dialog holds both panes in its shadow root.
    let prev: HTMLElement | null = null;
    for (let n: any = this.getRootNode(); n && !prev; n = n.host?.getRootNode?.()) {
      prev = n.querySelector?.(".element-preview") ?? null;
      if (!n.host) break;
    }
    let beside = false;
    if (prev) {
      const p = prev.getBoundingClientRect();
      const me = this.getBoundingClientRect();
      beside = p.width > 0 && me.width > 0 && (p.left >= me.right - 2 || p.right <= me.left + 2) && p.top < me.bottom;
    }
    if (beside !== this._haPreview) this._haPreview = beside;
  };

  private _renderPreviewStrip() {
    const cfg = this._config!;
    return html`<div class="preview">
      <span class="preview-label">${this._t("editor.preview")} · ${this._t("editor.preview_hint")}</span>
      <tabdeck-tabbar
        class="preview-bar"
        @tabdeck-select=${(e: CustomEvent) => {
          e.stopPropagation();
          void this._focusTab(e.detail?.index);
        }}
        .items=${cfg.tabs.map((t, i) => ({
          // Templated fields only render on the live card; preview plain ones.
          name: (!isTemplate(t.name) && t.name) || this._t("editor.tab_n", { n: i + 1 }),
          icon: isTemplate(t.icon) ? undefined : t.icon,
          accent: isTemplate(t.accent) ? undefined : t.accent,
          color: isTemplate(t.color) ? undefined : t.color,
          disabled: t.disabled,
        }))}
        .selected=${this._previewSelected < cfg.tabs.length ? this._previewSelected : 0}
        .position=${"top"}
        .tabStyle=${cfg.style}
        .display=${cfg.tab_display}
        .align=${cfg.align}
        .indicatorSize=${cfg.indicator_size}
        .indicatorRadius=${cfg.indicator_radius}
        .accentIndicator=${cfg.accent_indicator}
      ></tabdeck-tabbar>
    </div>`;
  }

  private _renderTabRow(tab: any, index: number) {
    const cfg = this._config!;
    const expanded = this._expanded.has(index);
    const name = tab.name || this._t("editor.tab_n", { n: index + 1 });
    return html`
      <div class="tab ${expanded ? "expanded" : "collapsed"} ${this._flashTab === index ? "flash" : ""} ${this._picked.has(index) ? "picked" : ""}">
        <div
          class="tab-header"
          role="button"
          tabindex="0"
          aria-expanded=${expanded ? "true" : "false"}
          @click=${() => this._toggleExpanded(index)}
          @keydown=${(e: KeyboardEvent) => this._onHeaderKeydown(index, e)}
        >
          ${this._selecting
            ? html`<input
                type="checkbox"
                class="pick"
                aria-label=${this._t("editor.bulk.pick", { name })}
                .checked=${this._picked.has(index)}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._togglePicked(index);
                }}
                @keydown=${(e: Event) => e.stopPropagation()}
              />`
            : nothing}
          <ha-svg-icon
            class="drag-handle"
            .path=${MDI_DRAG}
            title=${this._t("editor.drag")}
            @click=${(e: Event) => e.stopPropagation()}
          ></ha-svg-icon>
          <ha-icon class="tab-icon" .icon=${(!isTemplate(tab.icon) && tab.icon) || DEFAULT_TAB_ICON}></ha-icon>
          <span class="tab-title">${name}</span>
          ${this._tabTags(tab).map((t) => html`<span class="tag">${t}</span>`)}
          ${this._renderStatusChips(tab)}
          <span class="tab-controls">
            <ha-icon-button
              class="duplicate-tab"
              .label=${this._t("editor.duplicate_tab")}
              .path=${MDI_COPY}
              @click=${(e: Event) => {
                e.stopPropagation();
                this._duplicateTab(index);
              }}
            ></ha-icon-button>
            <ha-icon-button
              class="delete-tab"
              .label=${this._t("editor.delete_tab")}
              .path=${MDI_DELETE}
              @click=${(e: Event) => {
                e.stopPropagation();
                this._deleteTab(index);
              }}
            ></ha-icon-button>
            <ha-svg-icon class="expand-chevron" .path=${MDI_CHEVRON_DOWN}></ha-svg-icon>
          </span>
        </div>
        ${expanded
          ? html`<div class="tab-body">
              <div class="tab-actions">
                <span class="tab-type">${tab.card?.type ?? "—"}</span>
                <ha-icon-button
                  class="move-up"
                  .label=${this._t("editor.move_up")}
                  .path=${MDI_ARROW_UP}
                  .disabled=${index === 0}
                  @click=${() => this._move(index, -1)}
                ></ha-icon-button>
                <ha-icon-button
                  class="move-down"
                  .label=${this._t("editor.move_down")}
                  .path=${MDI_ARROW_DOWN}
                  .disabled=${index === cfg.tabs.length - 1}
                  @click=${() => this._move(index, 1)}
                ></ha-icon-button>
                <ha-icon-button
                  class="copy-tab"
                  .label=${this._t("editor.copy_tab")}
                  .path=${MDI_EXPORT}
                  @click=${() => void this._copyTab(index)}
                ></ha-icon-button>
              </div>
              ${this._renderIconSuggestions(index, tab)}
              <ha-form
                class="tab-form"
                .hass=${this.hass}
                .data=${this._tabData(tab)}
                .schema=${tabSchema(tab, this._opts)}
                .computeLabel=${this._computeTabLabel}
                @value-changed=${(e: CustomEvent) => this._onTabFieldsChanged(index, e)}
              ></ha-form>
              ${this._contrastWarnings(tab).map(
                (w) => html`<div class="editor-warning contrast-warning" role="alert">⚠️ ${w}</div>`,
              )}
              ${CONDITION_SECTIONS.map((sec) => this._renderConditions(index, tab, sec))}
              <button class="edit-card" @click=${() => this._openCard(index)}>
                <span class="edit-card-label">${this._t("editor.edit_card")}</span>
                <span class="edit-card-type">${tab.card?.type ?? "—"}</span>
                <span class="edit-card-arrow flip">→</span>
              </button>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _tabData(tab: any) {
    return {
      name: tab.name ?? "",
      subtitle: tab.subtitle ?? "",
      tooltip: tab.tooltip ?? "",
      icon: tab.icon ?? "",
      accent: tab.accent ?? "",
      color: tab.color ?? "",
      badge: typeof tab.badge === "string" ? tab.badge : "",
      badge_color: tab.badge_color ?? "",
      countdown: tab.countdown ?? "",
      background: tab.background ?? "",
      page_background: tab.page_background ?? "",
      badge_icon: tab.badge_icon ?? "",
      picture: tab.picture ?? "",
      icon_animation: tab.icon_animation ?? "",
      separator: tab.separator ?? "",
      font_size: tab.font_size ?? "",
      font_weight: tab.font_weight ?? "",
      font_family: tab.font_family ?? "",
      ring: tab.ring ?? "",
      ring_max: tab.ring_max,
      ring_color: tab.ring_color ?? "",
      ring_style: tab.ring_style === "bar",
      graph: typeof tab.graph === "object" ? tab.graph?.entity ?? "" : tab.graph ?? "",
      area: tab.area ?? "",
      view: typeof tab.view === "string" ? tab.view : "",
      tab_ref: tab.tab_ref ?? "",
      url: tab.url ?? "",
      aspect_ratio: tab.aspect_ratio ?? "",
      markdown: tab.markdown ?? "",
      empty_message: typeof tab.empty_message === "string" ? tab.empty_message : "",
      auto_refresh: tab.auto_refresh,
      zoom: tab.zoom,
      padding: tab.padding ?? "",
      spacing: tab.spacing ?? "",
      pin: tab.pin ?? "",
      pin_timeout: tab.pin_timeout,
      disabled: !!tab.disabled,
      fab: !!tab.fab,
      pip: !!tab.pip,
      keep_awake: !!tab.keep_awake,
      card_size: tab.card_size,
      hold_action: tab.hold_action,
      double_tap_action: tab.double_tap_action,
      badge_action: tab.badge_action,
      tap_action: tab.tap_action,
      enter_action: tab.enter_action,
      leave_action: tab.leave_action,
    };
  }

  private _toolButton(cls: string, path: string, label: string, onClick: () => void) {
    // Icons go in both slots: "start" (current WebAwesome ha-button) and
    // "icon" (older builds); the unused slot's copy isn't rendered.
    return html`<ha-button class=${cls} @click=${onClick}>
      <ha-svg-icon slot="start" .path=${path}></ha-svg-icon>
      <ha-svg-icon slot="icon" .path=${path}></ha-svg-icon>
      ${label}
    </ha-button>`;
  }

  private _renderTabsBody(words: string[]) {
    const cfg = this._config!;
    const searching = words.length > 0;
    return html`
      ${this._haPreview ? nothing : this._renderPreviewStrip()}
      ${this._warnings().map((w) => html`<div class="editor-warning" role="alert">⚠️ ${w}</div>`)}
      ${this._selecting ? this._renderBulk() : nothing}
      <ha-sortable handle-selector=".drag-handle" .disabled=${searching} @item-moved=${this._onItemMoved}>
        <div class="tabs">
          ${cfg.tabs.map((tab, index) =>
            searching && !this._tabMatches(tab, index, words) ? html`<div class="tab filtered" hidden></div>` : this._renderTabRow(tab, index),
          )}
        </div>
      </ha-sortable>
      <div class="add-row">
        ${this._toolButton("add-tab", MDI_PLUS, this._t("editor.add_tab"), () => this._addTab())}
        ${this._toolButton("rooms-tab", MDI_AUTO_FIX, this._t("rooms.button"), () => void this._toggleRooms())}
        ${cfg.tabs.length > 1
          ? html`${this._toolButton("select-tabs", MDI_CHECKBOX_MULTIPLE, this._t("editor.bulk.select"), () => this._toggleSelecting())}
              <span class="bulk-controls">
                <button class="expand-all" @click=${this._expandAll}>${this._t("editor.expand_all")}</button>
                <button class="collapse-all" @click=${this._collapseAll}>${this._t("editor.collapse_all")}</button>
              </span>`
          : nothing}
      </div>
      ${this._roomsOpen ? this._renderRooms() : nothing}
    `;
  }

  private _renderFieldRows(sec: EditorSection, schema: Map<string, any>, data: Record<string, any>, fields: string[]) {
    return html`${fields.map(
      (f) => html`<div class="row ${this._flashField === f ? "flash" : ""}" data-field=${f}>
        <ha-form
          class="globals-form"
          .hass=${this.hass}
          .data=${data}
          .schema=${[schema.get(f)]}
          .computeLabel=${this._computeGlobalLabel}
          .computeHelper=${this._computeGlobalHelper}
          @value-changed=${this._onGlobalChanged}
        ></ha-form>
      </div>`,
    )}${sec.id === "adv" ? this._renderTools() : nothing}`;
  }

  // Rarely used tools, at the end of Advanced.
  private _renderTools() {
    return html`<div class="add-row tools">
        ${this._toolButton("import-tab", MDI_IMPORT, this._t("editor.import_tab"), () => this._toggleImport())}
        ${this._toolButton("starter-tab", MDI_CREATION, this._t("starter.button"), () => this._toggleStarter())}
        ${this._toolButton("convert-tab", MDI_SWAP, this._t("convert.button"), () => this._toggleConvert())}
        ${this._toolButton("style-import-tab", MDI_PALETTE, this._t("style_import.button"), () => this._toggleStyleImport())}
        ${this._toolButton("export-view", MDI_VIEW_DASHBOARD, this._t("export.button"), () => this._toggleExport())}
      </div>
      ${this._convertOpen ? this._renderConvert() : nothing}
      ${this._exportOpen ? this._renderExport() : nothing}
      ${this._starterOpen ? this._renderStarter() : nothing}
      ${this._importOpen ? this._renderImport() : nothing}
      ${this._styleOpen ? this._renderStyleImport() : nothing}`;
  }

  private _renderListView() {
    const cfg = this._config!;
    const notes = lintConfig(this._raw ?? this._forOutput(cfg));
    const words = searchWords(this._query);
    const searching = words.length > 0;
    const schema = new Map(this._globalSchema().map((s: any) => [s.name, s]));
    const data = this._dataFor(cfg);
    const defaults = this._dataFor(normalizeConfig({ type: (cfg as any).type, tabs: cfg.tabs }, { expand: false }));
    let shown = 0;

    const tabsTitle = this._t("editor.section.tabs");
    const tabsHit = !searching || matchesWords(tabsTitle, words) || cfg.tabs.some((t, i) => this._tabMatches(t, i, words));
    const sections = EDITOR_SECTIONS.map((sec) => {
      const title = this._t(`editor.section.${sec.id}`);
      const fields = searching && !matchesWords(title, words)
        ? sec.fields.filter((f) => matchesWords(this._fieldText(schema.get(f)), words))
        : sec.fields;
      if (!fields.length) return nothing;
      shown++;
      const changed = changedFields(data, defaults, sec.fields);
      return this._renderSection(
        sec.id,
        sec.icon,
        title,
        this._sectionSummary(sec, schema, data, changed),
        changed.length > 0,
        this._isOpen(sec.id, searching),
        () => this._renderFieldRows(sec, schema, data, fields),
      );
    });
    if (tabsHit) shown++;

    return html`
      <div class="editor">
        ${this._renderStatusLine(notes)}
        ${this._statusOpen
          ? html`<div class="status-body">${this._renderSummary()}${this._renderLint(notes)}${this._renderWhatsNew()}</div>`
          : nothing}
        <label class="search">
          <ha-svg-icon .path=${MDI_MAGNIFY}></ha-svg-icon>
          <input
            class="search-input"
            type="search"
            .value=${this._query}
            placeholder=${this._t("editor.search.placeholder")}
            aria-label=${this._t("editor.search.placeholder")}
            @input=${(e: Event) => this._onSearch((e.target as HTMLInputElement).value)}
          />
          ${this._query
            ? html`<ha-icon-button class="search-clear" .label=${this._t("editor.search.clear")} .path=${MDI_CLOSE} @click=${() => this._onSearch("")}></ha-icon-button>`
            : nothing}
        </label>
        ${tabsHit
          ? this._renderSection(
              TABS_SECTION,
              "mdi:tab",
              tabsTitle,
              plural(hassLanguage(this._hass), "editor.status.tabs", cfg.tabs.length),
              false,
              this._isOpen(TABS_SECTION, searching),
              () => this._renderTabsBody(searching && !matchesWords(tabsTitle, words) ? words : []),
            )
          : nothing}
        ${sections}
        ${shown === 0 ? html`<div class="search-none" role="status">${this._t("editor.search.none")}</div>` : nothing}
        ${this._status ? html`<div class="editor-status" role="status">${this._status}</div>` : nothing}
      </div>
    `;
  }

  static styles = css`
    ${reducedMotionCss}
    /* Arrows point the reading way in right-to-left languages. */
    :host(:dir(rtl)) .flip {
      display: inline-block;
      transform: scaleX(-1);
    }
    .whats-new {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 4px 10px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      font-size: 13px;
      --mdc-icon-button-size: 32px;
    }
    .whats-new-icon {
      flex-shrink: 0;
      color: var(--primary-color);
      margin-top: 2px;
    }
    .whats-new-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .whats-new-text a {
      color: var(--primary-color);
      align-self: flex-start;
    }
    .whats-new-close {
      flex-shrink: 0;
      margin-top: -6px;
    }
    .summary-box,
    .lint {
      font-size: 13px;
    }
    .status-head {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .summary-box p {
      margin: 6px 0 2px;
      line-height: 1.45;
    }
    .lint ul {
      list-style: none;
      margin: 6px 0 2px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .lint-note {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 8px;
      --mdc-icon-size: 18px;
    }
    .lint-note span {
      flex: 1;
    }
    .lint-go {
      flex-shrink: 0;
      background: none;
      border: none;
      padding: 0 4px;
      color: var(--primary-color);
      font: inherit;
      font-weight: 500;
    }
    .lint-note ha-svg-icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
    }
    .lint-note.warn {
      background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent);
    }
    .lint-note.info {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .lint-note.perf {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .history {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2px;
      margin-bottom: 4px;
      background: var(--ha-dialog-surface-background, var(--mdc-theme-surface, var(--card-background-color, #fff)));
      --mdc-icon-button-size: 36px;
    }
    .history-note {
      margin-inline-end: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-status {
      display: contents;
    }
    .chip {
      flex-shrink: 0;
      font-size: 11px;
      line-height: 18px;
      padding: 0 8px;
      border-radius: 9px;
      white-space: nowrap;
    }
    .chip-hidden {
      background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent);
      color: var(--secondary-text-color);
    }
    .chip-alert {
      background: color-mix(in srgb, var(--error-color, #db4437) 18%, transparent);
      color: var(--error-color, #db4437);
    }
    .check-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-inline-start: 6px;
      vertical-align: middle;
    }
    .check-dot.met {
      background: var(--success-color, #43a047);
    }
    .check-dot.unmet {
      background: var(--secondary-text-color);
    }
    .check {
      font-size: 13px;
      padding: 8px 10px;
      margin-bottom: 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .check-head {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .check-list {
      list-style: none;
      margin: 0;
      padding-inline-start: 4px;
    }
    .check-list .check-list {
      padding-inline-start: 18px;
    }
    .check-item {
      padding: 2px 0;
    }
    .check-mark {
      font-size: 11px;
      margin-inline-end: 4px;
    }
    .check-text {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .add-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding-top: 8px;
    }
    .editor-status {
      position: sticky;
      bottom: 0;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
      box-shadow: 0 -1px 0 var(--divider-color, #e0e0e0);
    }
    .import-panel {
      margin-top: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px;
    }
    .import-hint {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    textarea.import-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
    }
    .import-error {
      color: var(--error-color, #db4437);
      font-size: 13px;
      margin-top: 6px;
    }
    .import-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
    .convert-summary {
      margin-top: 8px;
      font-size: 13px;
    }
    .convert-tabs {
      margin: 6px 0;
      padding-inline-start: 18px;
    }
    .convert-tabs ha-icon {
      --mdc-icon-size: 16px;
      margin-inline-end: 6px;
      color: var(--secondary-text-color);
    }
    .convert-note {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    .editor-status {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .conditions-section {
      margin: 8px 0;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 6px 10px;
    }
    .conditions-section summary {
      cursor: pointer;
      font-weight: 500;
      padding: 4px 0;
    }
    .conditions-hint {
      font-weight: 400;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-inline-start: 6px;
    }
    .conditions-section[open] summary {
      margin-bottom: 8px;
    }
    textarea.conditions-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .status-line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      width: 100%;
      padding: 6px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
      --mdc-icon-size: 16px;
    }
    .schip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 99px;
      background: var(--secondary-background-color, #f5f5f5);
      font-size: 12px;
    }
    .schip ha-svg-icon {
      width: 16px;
      height: 16px;
    }
    .schip.warn {
      background: color-mix(in srgb, var(--warning-color, #ffa600) 20%, transparent);
    }
    .schip.new {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      color: var(--primary-color);
    }
    .status-chevron {
      margin-inline-start: auto;
      color: var(--secondary-text-color);
      transition: transform 0.2s;
    }
    .status-line.open .status-chevron {
      transform: rotate(180deg);
    }
    .status-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
    }
    .search {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 4px 0 12px;
      min-height: 40px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--secondary-text-color);
      --mdc-icon-button-size: 32px;
    }
    .search-input {
      flex: 1;
      min-width: 0;
      border: 0;
      outline: none;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
    }
    .search-input::-webkit-search-cancel-button {
      display: none;
    }
    .search-none {
      padding: 8px 2px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    ha-expansion-panel.section {
      --expansion-panel-summary-padding: 0 12px;
      --expansion-panel-content-padding: 0 12px 8px;
      border-radius: 12px;
    }
    .section ha-icon[slot="leading-icon"] {
      margin-inline-end: 12px;
      color: var(--secondary-text-color);
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      font-weight: 500;
    }
    .section-summary {
      font-weight: 400;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .dot {
      flex-shrink: 0;
      width: 8px;
      height: 8px;
      margin: 0 8px;
      border-radius: 50%;
      background: var(--primary-color);
    }
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 44px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      scroll-margin: 48px;
    }
    .row:first-child {
      border-top: 0;
    }
    .row > ha-form {
      display: block;
    }
    .row.flash,
    .tab.flash {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 4px;
      transition: outline-color 0.3s;
    }
    .preview {
      border: 1px dashed var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 8px;
      margin-bottom: 8px;
    }
    .preview-label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    .tabs {
      display: flex;
      flex-direction: column;
    }
    .tab {
      /* Clear of the pinned undo bar when scrolled to. */
      scroll-margin-top: 48px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .tab:first-child {
      border-top: 0;
    }
    .tab-header {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 46px;
      cursor: pointer;
      border-radius: 8px;
      user-select: none;
    }
    .tab-header:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .tab-header:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 0;
    }
    .drag-handle {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      cursor: grab;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .editor-warning {
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .expand-chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
      padding: 0 4px;
    }
    .tab.expanded .expand-chevron {
      transform: rotate(180deg);
    }
    .tab-icon {
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .tab-title {
      min-width: 3em;
      flex: 0 1 auto;
      font-size: 15px;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tag {
      flex-shrink: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .tab-type {
      margin-inline-end: auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-controls {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-inline-start: auto;
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .tab-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 4px 4px 16px;
    }
    .tab-actions {
      display: flex;
      align-items: center;
      margin: -4px 0 -12px;
      --mdc-icon-button-size: 36px;
    }
    .delete-tab {
      color: var(--error-color, #db4437);
    }
    .edit-card {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      font-size: 14px;
      text-align: start;
    }
    .edit-card:hover {
      background: var(--divider-color, #e0e0e0);
    }
    .edit-card-type {
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .edit-card-arrow {
      margin-inline-start: auto;
      color: var(--secondary-text-color);
    }
    .room-list {
      list-style: none;
      margin: 0 0 4px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .room {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 8px;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .room.on {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .room input {
      width: 18px;
      height: 18px;
      margin: 0;
      accent-color: var(--primary-color);
    }
    .room ha-icon {
      color: var(--secondary-text-color);
    }
    .room-count {
      margin-inline-start: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .icon-suggest {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
      margin: -8px 0;
    }
    .icon-suggest-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-inline-end: 4px;
    }
    .icon-choice {
      display: inline-flex;
      padding: 6px;
      border: none;
      border-radius: 8px;
      background: none;
      color: var(--primary-text-color);
      --mdc-icon-size: 22px;
    }
    .icon-choice:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .icon-choice.on {
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-color);
    }
    .tab.picked {
      background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color, #fff));
    }
    input.pick {
      width: 18px;
      height: 18px;
      margin: 0;
      flex-shrink: 0;
      accent-color: var(--primary-color);
      cursor: pointer;
    }
    .bulk-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .bulk-count {
      font-weight: 500;
      margin-inline-end: auto;
    }
    .bulk-head button,
    .select-tabs[aria-pressed="true"] {
      font-weight: 500;
    }
    .bulk-head button {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 13px;
    }
    .bulk-controls {
      display: flex;
      gap: 4px;
      margin-inline-start: auto;
    }
    .bulk-controls button {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 13px;
      padding: 4px 6px;
    }
    .card-editor-view {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .card-editor-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .card-editor-title {
      font-weight: 500;
    }
    .back-to-list,
    .change-card-type {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      color: var(--primary-text-color);
      background: none;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      font-size: 14px;
    }
    .change-card-type {
      margin-inline-start: auto;
      color: var(--primary-color);
    }
    .card-type-chooser {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-type-hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .card-type-hint code {
      font-family: var(--code-font-family, monospace);
    }
    .card-label {
      font-size: 12px;
      gap: 4px;
    }
    .tab-card-json {
      width: 100%;
      box-sizing: border-box;
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-card-error {
      color: var(--error-color, #b00020);
      font-size: 12px;
    }
    button {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-card-editor": TabdeckCardEditor;
  }
}
