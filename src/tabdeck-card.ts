import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { handleAction } from "custom-card-helpers";
import type { HomeAssistant } from "./types";
import {
  normalizeConfig,
  resolveDefaultIndex,
  type TabdeckCardConfig,
} from "./lib/config";
import { isTabVisible } from "./lib/conditions";
import { loadInitialIndex, persistIndex } from "./lib/persistence";
import { CardManager, getCreateCardElement } from "./lib/card-lifecycle";
import { isTemplate, TemplateRenderer, type SubscribeFn } from "./lib/templates";
import { detectSwipe, type SwipePoint } from "./lib/swipe";
import "./components/tabdeck-tabbar";
import { isActiveBadge } from "./components/tabdeck-tab";

@customElement("tabdeck-card")
export class TabdeckCard extends LitElement {
  @state() private _config?: TabdeckCardConfig;
  @state() private _selected = 0;
  @state() private _built = false;
  private _hass?: HomeAssistant;
  private _manager?: CardManager;
  private _cardKey = "";
  private _templates?: TemplateRenderer;
  // Per-tab (original index) previous auto_select match, for edge detection.
  private _autoPrev?: boolean[];

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
    this._autoPrev = undefined;
    // Drop any subscriptions from a previous config; they re-sync on next hass.
    this._templates?.destroy();
    this._templates = undefined;
    void this._build();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._templates?.destroy();
    this._templates = undefined;
  }

  private _computeCardKey(cfg: TabdeckCardConfig): string {
    // An explicit storage_key lets two identical decks persist independently.
    if (cfg.storage_key) return cfg.storage_key;
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
    this._syncTemplates();
    this._selected = loadInitialIndex({
      mode: this._config.remember,
      cardKey: this._cardKey,
      defaultIndex: resolveDefaultIndex(this._config),
      tabCount: this._visibleTabs().length,
      hash: typeof location !== "undefined" ? location.hash : "",
      tabNames: this._visibleTabs().map((t) => t.name ?? ""),
      entityValue: this._config.remember_entity
        ? this._hass?.states?.[this._config.remember_entity]?.state
        : undefined,
    });
    this._built = true;
    this.requestUpdate();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._manager?.setHass(hass);
    this._syncTemplates();
    this._runAutoSelect();
    this.requestUpdate();
  }

  // Edge-triggered tab switching: when a tab's auto_select entity enters its
  // target state (or becomes active), switch to that tab. The first hass only
  // seeds the baseline so the card never jumps on initial load, and the user can
  // still navigate away afterwards (it only fires on a fresh transition).
  private _runAutoSelect(): void {
    const cfg = this._config;
    if (!cfg) return;
    if (!cfg.tabs.some((t) => t.auto_select)) return;
    const match = (a: { entity: string; state?: string }): boolean => {
      const st = this._hass?.states?.[a.entity]?.state;
      if (st === undefined) return false;
      return a.state !== undefined ? st === a.state : isActiveBadge(st);
    };
    const now = cfg.tabs.map((t) => (t.auto_select ? match(t.auto_select) : false));
    const prev = this._autoPrev;
    this._autoPrev = now;
    if (!prev) return; // seed only
    for (let i = 0; i < cfg.tabs.length; i++) {
      if (now[i] && !prev[i]) {
        const visible = this._visibleTabs();
        const vIdx = visible.indexOf(cfg.tabs[i]);
        if (vIdx >= 0) {
          this._selectIndex(vIdx);
          break;
        }
      }
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  // Resolves a `template` visibility condition's value_template to a rendered
  // boolean (undefined while pending → fail-closed in isTabVisible).
  private _templateResolver = (tpl: string): boolean | undefined =>
    this._templates?.boolean(tpl);

  private _visibleTabs() {
    if (!this._config) return [];
    return this._config.tabs.filter((t) =>
      isTabVisible(t.visibility, this._hass, this._templateResolver),
    );
  }

  private _collectTemplates(): string[] {
    if (!this._config) return [];
    const out: string[] = [];
    // Walk a condition tree, gathering template value_templates (including those
    // nested inside and/or/not groups) so they all get subscribed.
    const walk = (conds: any[] | undefined) => {
      for (const c of conds ?? []) {
        if (c?.condition === "template" && c.value_template) out.push(c.value_template);
        if (Array.isArray(c?.conditions)) walk(c.conditions);
      }
    };
    for (const t of this._config.tabs) {
      if (isTemplate(t.badge)) out.push(t.badge!);
      walk(t.visibility);
    }
    return out;
  }

  private _makeSubscribe(): SubscribeFn | undefined {
    if (!this._hass?.connection?.subscribeMessage) return undefined;
    return (template, onResult, onError) => {
      const conn = this._hass?.connection;
      if (!conn?.subscribeMessage) {
        onError();
        return () => {};
      }
      let unsubbed = false;
      let realUnsub: (() => void) | undefined;
      Promise.resolve(
        conn.subscribeMessage(
          (msg: any) => {
            if (msg && msg.error !== undefined) onError();
            else onResult(msg?.result);
          },
          { type: "render_template", template, report_errors: true },
        ),
      )
        .then((u: any) => {
          realUnsub = u;
          if (unsubbed) u?.();
        })
        .catch(() => onError());
      return () => {
        unsubbed = true;
        realUnsub?.();
      };
    };
  }

  private _syncTemplates(): void {
    const templates = this._collectTemplates();
    if (templates.length === 0) {
      this._templates?.destroy();
      this._templates = undefined;
      return;
    }
    if (!this._templates) {
      const subscribe = this._makeSubscribe();
      if (!subscribe) return; // no connection yet; retried on next hass
      this._templates = new TemplateRenderer(subscribe);
      this._templates.addEventListener("change", () => this.requestUpdate());
    }
    this._templates.track(templates);
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
    this._selectIndex(e.detail.index);
  }

  // Long-press on a tab → fire its hold_action via HA's action handler.
  // handleAction reads `entity` from the top-level config (for more-info/toggle),
  // so surface the action's entity there.
  private _onTabAction(e: CustomEvent<{ index: number }>): void {
    const tab = this._visibleTabs()[e.detail.index];
    if (!tab?.hold_action || !this._hass) return;
    const cfg = { entity: tab.hold_action?.entity, hold_action: tab.hold_action };
    handleAction(this, this._hass as any, cfg as any, "hold");
  }

  private _selectIndex(index: number): void {
    this._selected = index;
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
      if (this._config.remember === "entity") this._writeRememberEntity(this._selected);
    }
    this.updateComplete.then(() =>
      this._manager?.notifyVisible(this._activeOriginalIndex()),
    );
  }

  // Persist the selected index to an HA helper entity (input_number/input_text),
  // so the active tab syncs across devices. Skipped if the entity is absent.
  private _writeRememberEntity(index: number): void {
    const ent = this._config?.remember_entity;
    const hass = this._hass as any;
    if (!ent || !hass?.callService || !hass.states?.[ent]) return;
    const domain = ent.split(".")[0];
    if (domain === "input_number") {
      hass.callService("input_number", "set_value", { entity_id: ent, value: index });
    } else if (domain === "input_text") {
      hass.callService("input_text", "set_value", { entity_id: ent, value: String(index) });
    }
  }

  private _touchStart?: SwipePoint;

  private _onTouchStart = (e: TouchEvent): void => {
    if (!this._config?.swipe || e.touches.length !== 1) {
      this._touchStart = undefined;
      return;
    }
    const t = e.touches[0];
    this._touchStart = { x: t.clientX, y: t.clientY, t: e.timeStamp };
  };

  private _onTouchEnd = (e: TouchEvent): void => {
    const start = this._touchStart;
    this._touchStart = undefined;
    if (!start || !this._config?.swipe) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dir = detectSwipe(start, { x: t.clientX, y: t.clientY, t: e.timeStamp });
    if (!dir) return;
    const last = this._visibleTabs().length - 1;
    const target = dir === "next" ? this._selected + 1 : this._selected - 1;
    const clamped = Math.max(0, Math.min(last, target));
    if (clamped !== this._selected) this._selectIndex(clamped);
  };

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const visible = this._visibleTabs();
    if (this._selected > visible.length - 1) this._selected = 0;
    if (changed.has("_selected") && changed.get("_selected") !== undefined) {
      this._animatePanel();
    }
    this._applyStyles();
  }

  // Keys currently applied to the host from `styles`, so they can be removed if
  // the config changes (otherwise stale custom properties would linger).
  private _appliedStyleKeys: string[] = [];

  // Apply the `styles` map (CSS property → value, e.g. `--tabdeck-accent`) to the
  // card host. A simple, dependency-free theming hook without card-mod.
  private _applyStyles(): void {
    for (const key of this._appliedStyleKeys) this.style.removeProperty(key);
    const styles = this._config?.styles ?? {};
    this._appliedStyleKeys = Object.keys(styles);
    for (const [key, value] of Object.entries(styles)) {
      this.style.setProperty(key, String(value));
    }
  }

  // Play a short enter animation on the newly-active panel when a transition is
  // configured. Uses the Web Animations API so it replays on every switch;
  // skipped for `none`, in jsdom, and under prefers-reduced-motion.
  private _animatePanel(): void {
    const mode = this._config?.transition;
    if (!mode || mode === "none") return;
    if (
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const panel = this.renderRoot?.querySelector?.(
      ".panel:not([hidden])",
    ) as HTMLElement | null;
    if (!panel || typeof panel.animate !== "function") return;
    const frames =
      mode === "slide"
        ? [
            { opacity: 0, transform: "translateX(12px)" },
            { opacity: 1, transform: "translateX(0)" },
          ]
        : [{ opacity: 0 }, { opacity: 1 }];
    panel.animate(frames, { duration: 180, easing: "ease" });
  }

  render() {
    if (!this._config || !this._built) return nothing;
    const visible = this._visibleTabs();
    const cfg = this._config;
    const bar = html`
      <tabdeck-tabbar
        .items=${visible.map((t) => ({
          name: t.name,
          subtitle: t.subtitle,
          icon: t.icon,
          accent: t.accent,
          color: t.color,
          disabled: t.disabled,
          badgeColor: t.badge_color,
          holdAction: !!t.hold_action,
          badge: this._resolveBadgeFinal(t.badge),
        }))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${cfg.position}
        .tabStyle=${cfg.style}
        .display=${cfg.tab_display}
        .align=${cfg.align}
        .badgeDisplay=${cfg.badge_display}
        .scrollable=${cfg.scrollable}
        .animated=${cfg.animated}
        .accentIndicator=${cfg.accent_indicator}
        .indicatorSize=${cfg.indicator_size}
        .sticky=${cfg.sticky}
        .elevation=${cfg.elevation}
        .barBackground=${cfg.bar_background}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `;
    const panels = html`
      <div
        class="content"
        id="tabdeck-panel"
        role="tabpanel"
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
      >
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

  // Resolve a badge, then drop it if hide_inactive_badge is on and the value is
  // inactive (0/off/etc) — so e.g. a count badge only shows when > 0.
  private _resolveBadgeFinal(badge?: string): string | undefined {
    const value = this._resolveBadge(badge);
    if (this._config?.hide_inactive_badge && !isActiveBadge(value)) return undefined;
    return value;
  }

  private _resolveBadge(badge?: string): string | undefined {
    if (!badge) return undefined;
    if (isTemplate(badge)) {
      const r = this._templates?.result(badge);
      return r === undefined || r === null ? undefined : String(r);
    }
    if (!this._hass) return undefined;
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

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabdeck-card",
  name: "Tabdeck Card",
  description: "Organize multiple cards into a modern tabbed interface.",
  preview: true,
  documentationURL: "https://github.com/tempus2016/tabdeck-card",
});
