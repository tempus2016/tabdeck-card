import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant } from "./types";
import {
  normalizeConfig,
  resolveDefaultIndex,
  type TabdeckCardConfig,
} from "./lib/config";
import { isTabVisible } from "./lib/conditions";
import { loadInitialIndex, persistIndex } from "./lib/persistence";
import { CardManager, getCreateCardElement } from "./lib/card-lifecycle";
import "./components/tabdeck-tabbar";

@customElement("tabdeck-card")
export class TabdeckCard extends LitElement {
  @state() private _config?: TabdeckCardConfig;
  @state() private _selected = 0;
  @state() private _built = false;
  private _hass?: HomeAssistant;
  private _manager?: CardManager;
  private _cardKey = "";

  static getStubConfig() {
    return {
      tabs: [
        { name: "Tab 1", icon: "mdi:numeric-1-box", card: { type: "markdown", content: "Tab 1" } },
        { name: "Tab 2", icon: "mdi:numeric-2-box", card: { type: "markdown", content: "Tab 2" } },
      ],
    };
  }

  static async getConfigElement() {
    await import("./editor/tabdeck-card-editor");
    return document.createElement("tabdeck-card-editor");
  }

  setConfig(raw: any): void {
    this._config = normalizeConfig(raw);
    this._cardKey = this._computeCardKey(this._config);
    this._built = false;
    this._selected = resolveDefaultIndex(this._config);
    void this._build();
  }

  private _computeCardKey(cfg: TabdeckCardConfig): string {
    const path = typeof location !== "undefined" ? location.pathname : "";
    const names = cfg.tabs.map((t) => t.name ?? "").join("|");
    return `${path}#${names}`;
  }

  private async _build(): Promise<void> {
    if (!this._config) return;
    const create = await getCreateCardElement();
    this._manager = new CardManager(create);
    this._manager.addEventListener("ll-rebuild-done", () => this.requestUpdate());
    await this._manager.build(this._config.tabs.map((t) => t.card));
    if (this._hass) this._manager.setHass(this._hass);
    this._selected = loadInitialIndex({
      mode: this._config.remember,
      cardKey: this._cardKey,
      defaultIndex: resolveDefaultIndex(this._config),
      tabCount: this._visibleTabs().length,
      hash: typeof location !== "undefined" ? location.hash : "",
      tabNames: this._visibleTabs().map((t) => t.name ?? ""),
    });
    this._built = true;
    this.requestUpdate();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._manager?.setHass(hass);
    this.requestUpdate();
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  private _visibleTabs() {
    if (!this._config) return [];
    return this._config.tabs.filter((t) => isTabVisible(t.visibility, this._hass));
  }

  getCardSize(): number {
    const card = this._manager?.get(this._activeOriginalIndex());
    if (card && typeof card.getCardSize === "function") return card.getCardSize();
    return 1;
  }

  getGridOptions() {
    return { columns: "full", rows: "auto" };
  }

  private _activeOriginalIndex(): number {
    const visible = this._visibleTabs();
    const target = visible[this._selected];
    return this._config ? this._config.tabs.indexOf(target) : 0;
  }

  private _onSelect(e: CustomEvent<{ index: number }>): void {
    this._selected = e.detail.index;
    const visible = this._visibleTabs();
    const tab = visible[this._selected];
    if (this._config) {
      const r = persistIndex({
        mode: this._config.remember,
        cardKey: this._cardKey,
        index: this._selected,
        tabName: tab?.name,
      });
      if (r.hash && typeof location !== "undefined") {
        history.replaceState(null, "", r.hash);
      }
    }
    this.updateComplete.then(() =>
      this._manager?.notifyVisible(this._activeOriginalIndex()),
    );
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const visible = this._visibleTabs();
    if (this._selected > visible.length - 1) this._selected = 0;
  }

  render() {
    if (!this._config || !this._built) return nothing;
    const visible = this._visibleTabs();
    const cfg = this._config;
    const bar = html`
      <tabdeck-tabbar
        .items=${visible.map((t) => ({
          name: t.name,
          icon: t.icon,
          accent: t.accent,
          badge: this._resolveBadge(t.badge),
        }))}
        .selected=${this._selected}
        .position=${cfg.position}
        .tabStyle=${cfg.style}
        .scrollable=${cfg.scrollable}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `;
    const panels = html`
      <div class="content" id="tabdeck-panel" role="tabpanel">
        ${visible.map((tab, i) => {
          const original = cfg.tabs.indexOf(tab);
          return html`
            <div class="panel" ?hidden=${i !== this._selected}>
              ${this._manager?.get(original)}
            </div>
          `;
        })}
      </div>
    `;
    return html`
      <div class="root pos-${cfg.position}">
        ${cfg.position === "bottom" ? html`${panels}${bar}` : html`${bar}${panels}`}
      </div>
    `;
  }

  private _resolveBadge(badge?: string): string | undefined {
    if (!badge || !this._hass) return undefined;
    const stateObj = this._hass.states[badge];
    if (stateObj) return stateObj.state;
    return badge;
  }

  static styles = css`
    :host {
      display: block;
    }
    .root.pos-left,
    .root.pos-right {
      display: flex;
    }
    .root.pos-right {
      flex-direction: row-reverse;
    }
    .content {
      padding-top: 8px;
    }
    .panel[hidden] {
      display: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-card": TabdeckCard;
  }
  interface Window {
    customCards?: any[];
  }
}
