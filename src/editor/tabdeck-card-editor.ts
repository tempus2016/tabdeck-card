import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fireEvent } from "custom-card-helpers";
import type { HomeAssistant } from "../types";
import { normalizeConfig, type TabdeckCardConfig } from "../lib/config";

// MDI icon paths for the per-tab reorder/delete buttons. Inlined rather than
// pulling in @mdi/js so the bundle stays dependency-free.
const MDI_ARROW_UP = "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";
const MDI_ARROW_DOWN = "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z";
const MDI_DELETE =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const MDI_PLUS = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const MDI_CHEVRON_DOWN = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";

// Fallback icon shown in a collapsed tab header when the tab has no icon set.
const DEFAULT_TAB_ICON = "mdi:tab";

// Per-tab field schema for ha-form. The `icon` selector renders HA's native
// searchable icon picker (with live previews); the text/select/boolean
// selectors let ha-form resolve the right sub-elements for whatever HA frontend
// version is running, so we never hard-code version-specific element names.
const TAB_SCHEMA = [
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "accent", selector: { text: {} } },
  { name: "badge", selector: { text: {} } },
];

// Common built-in Lovelace card types offered when choosing/changing a tab's
// card. `custom_value` lets the user type anything else (e.g. `custom:my-card`).
const CARD_TYPES = [
  "entities", "tile", "button", "light", "thermostat", "humidifier",
  "weather-forecast", "markdown", "picture", "picture-entity", "picture-glance",
  "glance", "gauge", "sensor", "history-graph", "statistics-graph",
  "media-control", "map", "area", "alarm-panel", "calendar", "todo-list",
  "iframe", "entity", "conditional", "vertical-stack", "horizontal-stack", "grid",
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

const TAB_LABELS: Record<string, string> = {
  name: "Tab name",
  icon: "Icon",
  accent: "Accent colour",
  badge: "Badge (entity id or template)",
};

const GLOBAL_LABELS: Record<string, string> = {
  position: "Position",
  style: "Style",
  tab_display: "Tab display",
  remember: "Remember selected tab",
  default_tab: "Default tab",
  scrollable: "Scrollable",
  lazy: "Lazy-mount inactive tabs",
  animated: "Animate indicator",
  swipe: "Swipe to change tabs (mobile)",
};

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
  public hass?: HomeAssistant;
  // Set by Home Assistant's card-editor dialog; forwarded to the nested editor.
  public lovelace?: any;

  setConfig(config: any): void {
    this._config = normalizeConfig(config);
  }

  private _emit(next: TabdeckCardConfig): void {
    this._config = next;
    fireEvent(this, "config-changed", { config: next } as any);
    this.requestUpdate();
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
      { name: `Tab ${this._config.tabs.length + 1}`, card: {} as any },
    ];
    // Reindexing tabs invalidates the expanded set; collapse all so a stale
    // index never reveals the wrong tab.
    this._expanded = new Set();
    this._emit({ ...this._config, tabs });
  }

  private _deleteTab(index: number): void {
    if (!this._config) return;
    const tabs = this._config.tabs.filter((_, i) => i !== index);
    this._expanded = new Set();
    this._emit({ ...this._config, tabs });
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

  private _move(index: number, delta: number): void {
    if (!this._config) return;
    const target = index + delta;
    if (target < 0 || target >= this._config.tabs.length) return;
    const tabs = this._config.tabs.slice();
    [tabs[index], tabs[target]] = [tabs[target], tabs[index]];
    this._expanded = new Set();
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
  private get _currentDefaultTab(): string | undefined {
    const cfg = this._config!;
    for (let i = 0; i < cfg.tabs.length; i++) {
      const value = cfg.tabs[i].name ?? String(i);
      if (String(cfg.default_tab) === value || cfg.default_tab === i) return value;
    }
    return undefined;
  }

  private _globalSchema() {
    const cfg = this._config!;
    // ha-form's select selector wants options as {value,label} objects.
    const opts = (values: string[]) => values.map((v) => ({ value: v, label: v }));
    const tabOptions = cfg.tabs.map((t, i) => ({
      value: t.name ?? String(i),
      label: t.name || `Tab ${i + 1}`,
    }));
    return [
      { name: "position", selector: { select: { mode: "dropdown", options: opts(["top", "bottom", "left", "right"]) } } },
      { name: "style", selector: { select: { mode: "dropdown", options: opts(["underline", "pill", "segmented"]) } } },
      { name: "tab_display", selector: { select: { mode: "dropdown", options: opts(["both", "icon", "label"]) } } },
      { name: "remember", selector: { select: { mode: "dropdown", options: opts(["none", "browser", "url"]) } } },
      { name: "default_tab", selector: { select: { mode: "dropdown", options: tabOptions } } },
      { name: "scrollable", selector: { select: { mode: "dropdown", options: opts(["auto", "true", "false"]) } } },
      { name: "lazy", selector: { boolean: {} } },
      { name: "animated", selector: { boolean: {} } },
      { name: "swipe", selector: { boolean: {} } },
    ];
  }

  private get _globalData() {
    const cfg = this._config!;
    return {
      position: cfg.position,
      style: cfg.style,
      tab_display: cfg.tab_display,
      remember: cfg.remember,
      default_tab: this._currentDefaultTab,
      scrollable: String(cfg.scrollable),
      lazy: cfg.lazy,
      animated: cfg.animated,
      swipe: cfg.swipe,
    };
  }

  private _onGlobalChanged(e: CustomEvent): void {
    e.stopPropagation();
    const v = (e.detail as any).value ?? {};
    const scrollable =
      v.scrollable === "auto" ? "auto" : v.scrollable === "true" || v.scrollable === true;
    this._patch({
      position: v.position,
      style: v.style,
      tab_display: v.tab_display,
      remember: v.remember,
      default_tab: v.default_tab,
      scrollable,
      lazy: !!v.lazy,
      animated: !!v.animated,
      swipe: !!v.swipe,
    });
  }

  private _onTabFieldsChanged(index: number, e: CustomEvent): void {
    e.stopPropagation();
    const v = (e.detail as any).value ?? {};
    this._patchTab(index, {
      name: v.name ?? "",
      icon: v.icon || undefined,
      accent: v.accent || undefined,
      badge: v.badge || undefined,
    });
  }

  private _computeGlobalLabel = (s: { name: string }) => GLOBAL_LABELS[s.name] ?? s.name;
  private _computeTabLabel = (s: { name: string }) => TAB_LABELS[s.name] ?? s.name;

  render() {
    if (!this._config) return html``;
    if (this._editingTab !== null) return this._renderCardView(this._editingTab);
    return this._renderListView();
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
          <button class="back-to-list" @click=${this._closeCard}>← Back</button>
          <span class="card-editor-title">${tab.name || `Tab ${index + 1}`}</span>
          ${hasType
            ? html`<button class="change-card-type" @click=${() => this._changeCardType(index)}>
                Change card type
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
          .computeLabel=${() => "Card type"}
          @value-changed=${(e: CustomEvent) => this._onTypeChosen(index, e)}
        ></ha-form>
        <p class="card-type-hint">
          Choose a card type to configure it. Enter a custom type (e.g.
          <code>custom:my-card</code>) for cards not in the list.
        </p>
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
        >Card (JSON)
        <textarea
          class="tab-card-json"
          rows="10"
          .value=${JSON.stringify(tab.card ?? {}, null, 2)}
          @change=${(e: any) => this._editCardJson(index, e.target.value)}
        ></textarea>
      </label>
      ${this._cardError === index
        ? html`<div class="tab-card-error">Invalid JSON — not saved.</div>`
        : nothing}
    `;
  }

  private _renderListView() {
    const cfg = this._config!;
    return html`
      <div class="editor">
        <ha-form
          class="globals-form"
          .hass=${this.hass}
          .data=${this._globalData}
          .schema=${this._globalSchema()}
          .computeLabel=${this._computeGlobalLabel}
          @value-changed=${this._onGlobalChanged}
        ></ha-form>

        <div class="tabs">
          ${cfg.tabs.map((tab, index) => {
            const expanded = this._expanded.has(index);
            return html`
              <div class="tab ${expanded ? "expanded" : "collapsed"}">
                <div
                  class="tab-header"
                  role="button"
                  tabindex="0"
                  aria-expanded=${expanded ? "true" : "false"}
                  @click=${() => this._toggleExpanded(index)}
                  @keydown=${(e: KeyboardEvent) => this._onHeaderKeydown(index, e)}
                >
                  <div class="tab-summary">
                    <ha-svg-icon
                      class="expand-chevron"
                      .path=${MDI_CHEVRON_DOWN}
                    ></ha-svg-icon>
                    <ha-icon
                      class="tab-icon"
                      .icon=${tab.icon || DEFAULT_TAB_ICON}
                    ></ha-icon>
                    <span class="tab-title">${tab.name || `Tab ${index + 1}`}</span>
                    <span class="tab-type">${tab.card?.type ?? "—"}</span>
                  </div>
                  <div class="tab-controls">
                    <ha-icon-button
                      class="move-up"
                      label="Move up"
                      .path=${MDI_ARROW_UP}
                      .disabled=${index === 0}
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._move(index, -1);
                      }}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="move-down"
                      label="Move down"
                      .path=${MDI_ARROW_DOWN}
                      .disabled=${index === cfg.tabs.length - 1}
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._move(index, 1);
                      }}
                    ></ha-icon-button>
                    <ha-icon-button
                      class="delete-tab"
                      label="Delete tab"
                      .path=${MDI_DELETE}
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._deleteTab(index);
                      }}
                    ></ha-icon-button>
                  </div>
                </div>
                ${expanded
                  ? html`
                      <ha-form
                        class="tab-form"
                        .hass=${this.hass}
                        .data=${{
                          name: tab.name ?? "",
                          icon: tab.icon ?? "",
                          accent: tab.accent ?? "",
                          badge: tab.badge ?? "",
                        }}
                        .schema=${TAB_SCHEMA}
                        .computeLabel=${this._computeTabLabel}
                        @value-changed=${(e: CustomEvent) =>
                          this._onTabFieldsChanged(index, e)}
                      ></ha-form>
                      <button class="edit-card" @click=${() => this._openCard(index)}>
                        <span class="edit-card-label">Edit card</span>
                        <span class="edit-card-type">${tab.card?.type ?? "—"}</span>
                        <span class="edit-card-arrow">→</span>
                      </button>
                    `
                  : nothing}
              </div>
            `;
          })}
          <ha-button class="add-tab" @click=${this._addTab}>
            <ha-svg-icon slot="icon" .path=${MDI_PLUS}></ha-svg-icon>
            Add tab
          </ha-button>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .globals-form {
      display: block;
    }
    .tabs {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tab {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background));
    }
    .tab-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: pointer;
      padding: 4px;
      margin: -4px;
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
    .tab-summary {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
    }
    .expand-chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
    }
    .tab.expanded .expand-chevron {
      transform: rotate(180deg);
    }
    .tab-icon {
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .tab-title {
      font-weight: 500;
      font-size: 15px;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-type {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }
    .tab-controls {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      --mdc-icon-button-size: 40px;
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
      text-align: left;
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
      margin-left: auto;
      color: var(--secondary-text-color);
    }
    .add-tab {
      align-self: flex-start;
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
      margin-left: auto;
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
