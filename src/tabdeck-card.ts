import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { handleAction } from "custom-card-helpers";
import type { HomeAssistant } from "./types";
import {
  isActionTab,
  normalizeConfig,
  normalizeTab,
  resolveDefaultIndex,
  type TabdeckCardConfig,
  type TabdeckTabConfig,
} from "./lib/config";
import { expandGeneratedTabs } from "./lib/generate";
import { isTabVisible } from "./lib/conditions";
import { loadInitialIndex, persistIndex } from "./lib/persistence";
import { CardManager, getCreateCardElement } from "./lib/card-lifecycle";
import { isTemplate, makeHassSubscribe, TemplateRenderer, type SubscribeFn } from "./lib/templates";
import { formatBadge } from "./lib/badge";
import { hassLanguage, localize } from "./lib/i18n";
import { detectSwipe, type SwipePoint } from "./lib/swipe";
import { hideTabs, loadLayout, orderTabs, saveLayout, type UserLayout } from "./lib/customize";
import { cssBackground, peekCommit, transitionFrames } from "./lib/layout";
import "./components/tabdeck-tabbar";
import "./components/tabdeck-masonry-card";
import "./components/tabdeck-sections-card";
import { isActiveBadge } from "./components/tabdeck-tab";

// Events that count as the user interacting with the card.
const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"] as const;

// Tab display fields that may be Jinja templates (rendered live by HA).
const TEMPLATED_FIELDS = ["name", "subtitle", "icon", "color", "accent", "background"] as const;

@customElement("tabdeck-card")
export class TabdeckCard extends LitElement {
  @state() private _config?: TabdeckCardConfig;
  @state() private _selected = 0;
  @state() private _built = false;
  // Measured card width (px; 0 = unknown), for split / narrow layouts.
  @state() private _width = 0;
  private _widthObserver?: ResizeObserver;
  // collapsible: content folded away (the bar stays).
  @state() private _collapsed = false;
  // fullscreen: the content is open as a full-screen overlay.
  @state() private _fullscreen = false;
  // header_cards / footer_cards, built in one manager (header first).
  private _extras?: CardManager;
  private _hass?: HomeAssistant;
  private _manager?: CardManager;
  private _cardKey = "";
  private _templates?: TemplateRenderer;
  // Per-tab (original index) previous auto_select match, for edge detection.
  private _autoPrev?: boolean[];
  // Normalized generated tabs (from auto_tabs), appended after static tabs.
  @state() private _genTabs: TabdeckTabConfig[] = [];
  // JSON signature of the last raw generated set, to skip no-op rebuilds.
  private _genKey = "";
  // Last remember_entity state seen, so only a real change switches tabs.
  private _lastEntityValue?: string;
  // Until this time, entity changes are echoes of our own recent writes.
  private _entityWriteGuard = 0;
  // Set by Home Assistant: `editMode` while the dashboard is being edited,
  // `preview` there and in the card editor's preview.
  private _editModeFlag = false;
  private _previewFlag = false;

  set editMode(v: boolean) {
    this._setEditFlags(!!v, this._previewFlag);
  }
  get editMode(): boolean {
    return this._editModeFlag;
  }
  set preview(v: boolean) {
    this._setEditFlags(this._editModeFlag, !!v);
  }
  get preview(): boolean {
    return this._previewFlag;
  }

  // Keep the user on the same tab while the visible set grows / shrinks.
  private _setEditFlags(editMode: boolean, preview: boolean): void {
    if (editMode === this._editModeFlag && preview === this._previewFlag) return;
    const prevName = this._config && this._built ? this._visibleTabs()[this._selected]?.name : undefined;
    this._editModeFlag = editMode;
    this._previewFlag = preview;
    if (prevName !== undefined) this._restoreSelection(prevName);
    this.requestUpdate();
  }

  // Edit mode reveals hidden tabs and pauses automatic switching.
  private get _editing(): boolean {
    return (this._editModeFlag || this._previewFlag) && this._config?.edit_mode_reveal !== false;
  }

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
    this._collapsed = this._config.start_collapsed;
    this._fullscreen = false;
    this._seenAt.clear();
    this._autoPrev = undefined;
    this._lastEntityValue = undefined;
    this._genTabs = [];
    this._genKey = "";
    // Drop any subscriptions from a previous config; they re-sync on next hass.
    this._templates?.destroy();
    this._templates = undefined;
    this._syncTimer();
    this._syncUnloadTimer();
    this._syncWidthObserver();
    void this._build();
  }

  // Only measure when a responsive option needs the width.
  private _syncWidthObserver(): void {
    const want =
      !!(this._config?.split || this._config?.tab_display_narrow || this._config?.transition_narrow) &&
      this.isConnected &&
      typeof ResizeObserver !== "undefined";
    if (want && !this._widthObserver) {
      this._widthObserver = new ResizeObserver((entries) => {
        const w = Math.round(entries[0]?.contentRect?.width ?? 0);
        if (w !== this._width) this._width = w;
      });
      this._widthObserver.observe(this);
    } else if (!want && this._widthObserver) {
      this._widthObserver.disconnect();
      this._widthObserver = undefined;
    }
  }

  private get _isSplit(): boolean {
    const split = this._config?.split;
    return !!split && this._width >= split.min_width;
  }

  // Narrower than narrow_width (once measured).
  private get _isNarrow(): boolean {
    return this._width > 0 && this._width < this._config!.narrow_width;
  }

  private get _effectiveDisplay() {
    const cfg = this._config!;
    if (cfg.tab_display_narrow && this._isNarrow) return cfg.tab_display_narrow;
    return cfg.tab_display;
  }

  // Wide layout: every visible content tab as a titled column.
  private _renderSplit(visible: TabdeckTabConfig[]) {
    const cols = visible.filter((t) => !isActionTab(t));
    return html`
      <div class="split" style="--tabdeck-split-columns:${this._config!.split!.columns}">
        ${cols.map((tab) => {
          const icon = this._text(tab.icon);
          return html`
            <div class="split-col">
              <div class="split-title">
                ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
                <span>${this._text(tab.name) ?? ""}</span>
              </div>
              ${this._manager?.get(this._allTabs().indexOf(tab))}
            </div>
          `;
        })}
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    for (const ev of INTERACTION_EVENTS) this.addEventListener(ev, this._onInteraction);
    this._syncTimer();
    this._syncUnloadTimer();
    this._syncWidthObserver();
    // disconnectedCallback dropped the template subscriptions. Restore them
    // now: a quiet instance may not send a new hass for a long time.
    if (this._hass) this._syncTemplates();
    // HA moves cards around the DOM during layout; re-observe on reconnect.
    if (this._config?.scroll_spy) this.updateComplete.then(() => this._syncSpyObserver());
    if (this._config?.dock) this.updateComplete.then(() => this._syncDock());
    document.addEventListener("keydown", this._onHotkey);
    document.addEventListener("keydown", this._onFullscreenKey);
    window.addEventListener("popstate", this._onPopState);
  }

  // --- history (back button) ------------------------------------------------
  // Set while applying a popstate, so the switch isn't pushed again.
  private _fromPop = false;

  private _historyState(index: number): any {
    const prev = history.state && typeof history.state === "object" ? history.state : {};
    return { ...prev, tabdeck: { ...(prev.tabdeck ?? {}), [this._cardKey]: index } };
  }

  private _onPopState = (e: PopStateEvent): void => {
    if (!this._config?.history || !this._built) return;
    const index = e.state?.tabdeck?.[this._cardKey];
    if (typeof index !== "number" || index === this._selected) return;
    if (!this._isContentTab(this._visibleTabs()[index])) return;
    this._fromPop = true;
    try {
      this._collapsed = false;
      this._selectIndex(index);
    } finally {
      this._fromPop = false;
    }
  };

  // --- hotkeys --------------------------------------------------------------
  // Page-wide while the card is on screen. Typing in a field, modified keys
  // and decks without `hotkeys` are left alone.
  private _onHotkey = (e: KeyboardEvent): void => {
    const cfg = this._config;
    if (!cfg?.hotkeys || !this._built || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    const target = e.composedPath()[0] as HTMLElement | undefined;
    if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName ?? ""))) return;
    // Not on screen (e.g. a nested deck in an inactive tab): stay quiet.
    if (typeof (this as any).checkVisibility === "function" && !(this as any).checkVisibility()) return;
    if (e.key === "/" && cfg.search) {
      e.preventDefault();
      (this.renderRoot.querySelector("tabdeck-tabbar") as any)?.openSearch?.();
    } else if (/^[1-9]$/.test(e.key)) {
      if (this.selectTab(Number(e.key) - 1)) e.preventDefault();
    } else if (e.key === "[" || e.key === "]") {
      const next = this._stepContent(this._selected, e.key === "]" ? 1 : -1, cfg.swipe_wrap);
      if (next !== this._selected) this._selectIndex(next);
    }
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const ev of INTERACTION_EVENTS) this.removeEventListener(ev, this._onInteraction);
    document.removeEventListener("keydown", this._onHotkey);
    document.removeEventListener("keydown", this._onFullscreenKey);
    window.removeEventListener("popstate", this._onPopState);
    this._stopTimer();
    if (this._unloadTimer) clearInterval(this._unloadTimer);
    this._unloadTimer = undefined;
    this._spyObserver?.disconnect();
    this._spyObserver = undefined;
    this._spyObserved = [];
    this._widthObserver?.disconnect();
    this._widthObserver = undefined;
    this._dockObserver?.disconnect();
    this._dockObserver = undefined;
    this._templates?.destroy();
    this._templates = undefined;
  }

  // --- auto_rotate / idle_return -------------------------------------------
  // One 1 s ticker drives both. `_tick(now)` holds all the logic so it can be
  // tested without fake timers.
  private _timer?: ReturnType<typeof setInterval>;
  private _lastInteraction = Date.now();
  private _lastRotate = Date.now();
  // Rotation is held until this time after the user touches the card.
  private _rotatePausedUntil = 0;

  private _onInteraction = (): void => this._noteInteraction(Date.now());

  private _noteInteraction(now: number): void {
    this._lastInteraction = now;
    const resume = this._config?.auto_rotate?.resume_after ?? 0;
    this._rotatePausedUntil = now + resume * 1000;
  }

  private _syncTimer(): void {
    const want = !!(this._config?.auto_rotate || this._config?.idle_return) && this.isConnected;
    if (want && !this._timer) {
      this._lastInteraction = this._lastRotate = Date.now();
      this._timer = setInterval(() => this._tick(Date.now()), 1000);
    } else if (!want) {
      this._stopTimer();
    }
  }

  private _stopTimer(): void {
    if (this._timer) clearInterval(this._timer);
    this._timer = undefined;
  }

  private _tick(now: number): void {
    const cfg = this._config;
    if (!cfg || !this._built) return;
    if (this._editing) {
      // Hold while editing; timers restart from the end of the edit.
      this._lastInteraction = this._lastRotate = now;
      return;
    }
    const idleMs = now - this._lastInteraction;
    const rotate = cfg.auto_rotate;
    if (rotate) {
      if (now < this._rotatePausedUntil) {
        // Recently touched: hold; the interval restarts once it resumes.
        this._lastRotate = now;
        return;
      }
      if (now - this._lastRotate >= rotate.interval * 1000) {
        this._lastRotate = now;
        const next = this._nextRotatable(this._selected);
        if (next !== this._selected) this._selectIndex(next, false);
      }
      return;
    }
    if (cfg.idle_return && idleMs >= cfg.idle_return * 1000) {
      const home = this._computeDefaultIndex();
      if (home !== this._selected) this._selectIndex(home, false);
      this._lastInteraction = now; // don't re-fire every tick
    }
  }

  // Next visible content tab after `from` (wraps, skips disabled/action).
  private _nextRotatable(from: number): number {
    return this._stepContent(from, 1, true);
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
    this._layout = this._config.customize ? loadLayout(this._cardKey) : { order: [], hidden: [] };
    const create = await getCreateCardElement();
    this._manager = new CardManager(create);
    this._manager.addEventListener("ll-rebuild-done", () => this.requestUpdate());
    await this._manager.build(this._cardConfigs());
    if (this._hass) this._manager.setHass(this._hass);
    const extras = [...(this._config.header_cards ?? []), ...(this._config.footer_cards ?? [])];
    if (extras.length) {
      this._extras = new CardManager(create);
      this._extras.addEventListener("ll-rebuild-done", () => this.requestUpdate());
      await this._extras.build(extras);
      if (this._hass) this._extras.setHass(this._hass);
    } else {
      this._extras = undefined;
    }
    this._builtAt = Date.now();
    this._syncTemplates();
    this._selected = loadInitialIndex({
      mode: this._config.remember,
      cardKey: this._cardKey,
      defaultIndex: this._computeDefaultIndex(),
      tabCount: this._visibleTabs().length,
      hash: typeof location !== "undefined" ? location.hash : "",
      tabNames: this._visibleTabs().map((t) => t.name ?? ""),
      entityValue: this._config.remember_entity
        ? this._hass?.states?.[this._config.remember_entity]?.state
        : undefined,
    });
    this._selected = this._ensureContentTab(this._selected);
    // Tag the current entry, so Back to it restores the starting tab.
    if (this._config.history && typeof history !== "undefined") {
      history.replaceState(this._historyState(this._selected), "", location.href);
    }
    this._lastEntityValue = this._rememberEntityState();
    this._built = true;
    this.requestUpdate();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._manager?.setHass(hass);
    this._extras?.setHass(hass);
    this._syncTemplates();
    this._runAutoSelect();
    this._syncRememberEntity();
    this.requestUpdate();
  }

  private _rememberEntityState(): string | undefined {
    const ent = this._config?.remember === "entity" ? this._config.remember_entity : undefined;
    return ent ? this._hass?.states?.[ent]?.state : undefined;
  }

  // Live two-way sync for remember:entity — when the helper is changed
  // elsewhere (another device, an automation, Node-RED), follow it. Only a
  // real change of the entity's value switches, so a routine hass tick never
  // yanks the user back while their own write is still in flight. Does not
  // write back (the entity already holds the value).
  private _syncRememberEntity(): void {
    if (!this._built) return;
    const value = this._rememberEntityState();
    if (value === undefined || value === this._lastEntityValue) return;
    this._lastEntityValue = value;
    // Rapid taps: an echo of an earlier write must not bounce the selection.
    if (Date.now() < this._entityWriteGuard) return;
    const n = Math.trunc(Number(value));
    if (!Number.isFinite(n) || n < 0 || n >= this._visibleTabs().length) return;
    if (n !== this._selected) this._selectIndex(n, false);
  }

  // Edge-triggered tab switching: when a tab's auto_select entity enters its
  // target state (or becomes active), switch to that tab. The first hass only
  // seeds the baseline so the card never jumps on initial load, and the user can
  // still navigate away afterwards (it only fires on a fresh transition).
  private _runAutoSelect(): void {
    const cfg = this._config;
    if (!cfg) return;
    const tabs = this._allTabs();
    if (!tabs.some((t) => t.auto_select)) return;
    const match = (a: { entity: string; state?: string }): boolean => {
      const st = this._hass?.states?.[a.entity]?.state;
      if (st === undefined) return false;
      return a.state !== undefined ? st === a.state : isActiveBadge(st);
    };
    const now = tabs.map((t) => (t.auto_select ? match(t.auto_select) : false));
    const prev = this._autoPrev;
    this._autoPrev = now;
    if (!prev) return; // seed only
    for (let i = 0; i < tabs.length; i++) {
      if (now[i] && !prev[i]) {
        const visible = this._visibleTabs();
        const vIdx = visible.indexOf(tabs[i]);
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

  // Card configs aligned with _allTabs(); action tabs without a card get none.
  private _cardConfigs() {
    return this._allTabs().map((t) => (isActionTab(t) && !t.card?.type ? null : t.card));
  }

  // A tab that can become the active panel (not disabled, not an action tab).
  private _isContentTab(tab: TabdeckTabConfig | undefined): boolean {
    return !!tab && !tab.disabled && !isActionTab(tab);
  }

  // Keep `index` if it's a content tab, else the first content tab.
  private _ensureContentTab(index: number): number {
    const visible = this._visibleTabs();
    if (!visible[index] || !isActionTab(visible[index])) return index;
    const first = visible.findIndex((t) => !isActionTab(t));
    return first >= 0 ? first : index;
  }

  // Step from `from` in `dir`, skipping non-content tabs. Wraps or clamps
  // (returning `from` when the end is reached without a content tab).
  private _stepContent(from: number, dir: 1 | -1, wrap: boolean): number {
    const visible = this._visibleTabs();
    const n = visible.length;
    for (let i = 1; i < n; i++) {
      let idx = from + dir * i;
      if (wrap) idx = ((idx % n) + n) % n;
      else if (idx < 0 || idx >= n) return from;
      if (this._isContentTab(visible[idx])) return idx;
    }
    return from;
  }

  // Effective tab list: static tabs first, generated tabs appended.
  private _allTabs(): TabdeckTabConfig[] {
    if (!this._config) return [];
    return this._genTabs.length ? [...this._config.tabs, ...this._genTabs] : this._config.tabs;
  }

  private _visibleTabs() {
    if (!this._config) return [];
    if (this._editing) return this._allTabs();
    const shown = this._allTabs().filter((t) => !this._isHidden(t));
    if (!this._config.customize) return shown;
    return hideTabs(orderTabs(shown, this._layout), this._layout);
  }

  // --- customize (per-browser order & hidden tabs) ---------------------------
  @state() private _layout: UserLayout = { order: [], hidden: [] };

  // Every tab the conditions allow, in the person's order, flagged if hidden.
  private _customItems() {
    const shown = this._allTabs().filter((t) => !this._isHidden(t));
    return orderTabs(shown, this._layout).map((t) => ({
      name: this._text(t.name),
      icon: this._text(t.icon),
      key: t.name,
      hidden: t.name !== undefined && this._layout.hidden.includes(t.name),
    }));
  }

  private _onCustomize(e: CustomEvent<{ order?: string[]; hidden?: string[]; reset?: boolean }>): void {
    const prevName = this._visibleTabs()[this._selected]?.name;
    const d = e.detail ?? {};
    this._layout = d.reset ? { order: [], hidden: [] } : { order: d.order ?? [], hidden: d.hidden ?? [] };
    saveLayout(this._cardKey, d.reset ? null : this._layout);
    this._restoreSelection(prevName);
    if (!this._isContentTab(this._visibleTabs()[this._selected])) {
      this._selected = this._ensureContentTab(this._computeDefaultIndex());
    }
    this.requestUpdate();
  }

  private _isHidden(t: TabdeckTabConfig): boolean {
    return !isTabVisible(t.visibility, this._hass, this._templateResolver);
  }

  private _collectTemplates(): string[] {
    if (!this._config) return [];
    const out: string[] = [];
    if (this._config.auto_tabs?.template) out.push(this._config.auto_tabs.template);
    // Walk a condition tree, gathering template value_templates (including those
    // nested inside and/or/not groups) so they all get subscribed.
    const walk = (conds: any[] | undefined) => {
      for (const c of conds ?? []) {
        if (c?.condition === "template" && c.value_template) out.push(c.value_template);
        if (Array.isArray(c?.conditions)) walk(c.conditions);
      }
    };
    for (const t of this._allTabs()) {
      if (isTemplate(t.badge)) out.push(t.badge!);
      for (const f of TEMPLATED_FIELDS) if (isTemplate(t[f])) out.push(t[f]!);
      walk(t.visibility);
      walk(t.default_if);
      walk(t.alert);
    }
    return out;
  }

  private _makeSubscribe(): SubscribeFn | undefined {
    if (!this._hass?.connection?.subscribeMessage) return undefined;
    return makeHassSubscribe(() => this._hass);
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
      this._templates.addEventListener("change", () => {
        void this._syncGeneratedTabs();
        this.requestUpdate();
      });
    }
    this._templates.track(templates);
  }

  // Rebuild generated tabs from the latest template result. Guarded by a JSON
  // signature so an unchanged result causes no card churn. On a real change,
  // rebuild the card manager over the combined list, re-subscribe any templates
  // the new tabs introduce, and keep the user on the same tab where possible.
  private async _syncGeneratedTabs(): Promise<void> {
    const auto = this._config?.auto_tabs;
    if (!auto || !this._manager) return;
    let items = this._templates?.result(auto.template);
    // Areas source: use each area's icon from HA's area registry.
    const areas = (this._hass as any)?.areas;
    if (auto.source === "areas" && Array.isArray(items) && areas) {
      items = items.map((it: any) =>
        it && typeof it === "object" ? { ...it, icon: areas[it.id]?.icon || it.icon } : it,
      );
    }
    const raw = expandGeneratedTabs(items, auto);
    const key = JSON.stringify(raw);
    if (key === this._genKey) return;
    const prevName = this._visibleTabs()[this._selected]?.name;
    this._genKey = key;
    this._genTabs = raw.map(normalizeTab);
    // Restore selection synchronously, before awaiting the (internally sync)
    // rebuild, so the panel never renders the new tab set against a stale index.
    this._restoreSelection(prevName);
    await this._manager.build(this._cardConfigs());
    if (this._hass) this._manager.setHass(this._hass);
    this._syncTemplates();
    this.requestUpdate();
  }

  // Keep the selection on the same-named tab; else clamp into range; else fall
  // back to the computed default.
  private _restoreSelection(prevName?: string): void {
    const visible = this._visibleTabs();
    if (prevName) {
      const i = visible.findIndex((t) => t.name === prevName);
      if (i >= 0) {
        this._selected = i;
        return;
      }
    }
    if (this._selected > visible.length - 1) {
      this._selected = Math.min(this._computeDefaultIndex(), Math.max(0, visible.length - 1));
    }
  }

  getCardSize(): number {
    if (this._collapsed) return 1;
    // A per-tab card_size hint wins, so masonry sizing doesn't jump around as
    // tabs change (and works even before the nested card reports a size).
    const tab = this._visibleTabs()[this._selected];
    if (tab && typeof tab.card_size === "number") return tab.card_size;
    const card = this._manager?.get(this._activeOriginalIndex());
    if (card && typeof card.getCardSize === "function") return card.getCardSize();
    return 1;
  }

  getGridOptions() {
    return { columns: "full", rows: "auto" };
  }

  // The starting tab index (in visible space) when nothing is remembered:
  // the first visible tab whose `default_if` conditions are met, else the
  // configured `default_tab`.
  private _computeDefaultIndex(): number {
    const visible = this._visibleTabs();
    for (let i = 0; i < visible.length; i++) {
      const c = visible[i].default_if;
      if (Array.isArray(c) && c.length > 0 && isTabVisible(c, this._hass, this._templateResolver)) {
        return i;
      }
    }
    const orig = resolveDefaultIndex(this._config!);
    const vIdx = visible.indexOf(this._allTabs()[orig] ?? this._config!.tabs[orig]);
    return vIdx >= 0 ? vIdx : 0;
  }

  private _activeOriginalIndex(): number {
    const visible = this._visibleTabs();
    const target = visible[this._selected];
    return this._allTabs().indexOf(target);
  }

  private _onSelect(e: CustomEvent<{ index: number; child?: string }>): void {
    const tab = this._visibleTabs()[e.detail.index];
    if (e.detail.child !== undefined) {
      // A child picked from a grouped tab's menu: open the group, then the child.
      this._collapsed = false;
      if (e.detail.index !== this._selected) this._selectIndex(e.detail.index);
      const nested = this._manager?.get(this._allTabs().indexOf(tab!));
      this.updateComplete.then(() => nested?.selectTab?.(e.detail.child));
      return;
    }
    if (isActionTab(tab)) {
      this._runAction(tab!.tap_action, "tap");
      return;
    }
    if (this._config?.collapsible) {
      if (e.detail.index === this._selected) {
        this._collapsed = !this._collapsed;
        return;
      }
      this._collapsed = false;
    }
    this._selectIndex(e.detail.index);
  }

  // --- scroll_spy -----------------------------------------------------------
  private _spyObserver?: IntersectionObserver;
  private _spyObserved: Element[] = [];
  private _spyInView = new Set<number>();
  // Spy updates are ignored until this time (a programmatic scroll is running).
  private _spySuppressUntil = 0;
  private _spyDriven = false;

  private _scrollToSection(index: number): void {
    this._spySuppressUntil = Date.now() + 900;
    this.updateComplete.then(() => {
      const panel = this.renderRoot?.querySelector?.(
        `.panel[data-index="${index}"]`,
      ) as HTMLElement | null;
      panel?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    });
  }

  // (Re)observe the section panels whenever the rendered set changes.
  private _syncSpyObserver(): void {
    if (!this._config?.scroll_spy || typeof IntersectionObserver === "undefined") {
      this._spyObserver?.disconnect();
      this._spyObserver = undefined;
      this._spyObserved = [];
      return;
    }
    const panels = [...(this.renderRoot?.querySelectorAll?.(".panel") ?? [])];
    const same =
      panels.length === this._spyObserved.length &&
      panels.every((p, i) => p === this._spyObserved[i]);
    if (same && this._spyObserver) return;
    this._spyObserver?.disconnect();
    this._spyInView.clear();
    // A band across the upper part of the viewport, below HA's header and the
    // sticky bar: whichever section crosses it is "current".
    this._spyObserver = new IntersectionObserver(
      (entries) => this._onSpyEntries(entries),
      { rootMargin: "-120px 0px -55% 0px" },
    );
    for (const p of panels) this._spyObserver.observe(p);
    this._spyObserved = panels;
  }

  private _onSpyEntries(entries: Array<Pick<IntersectionObserverEntry, "target" | "isIntersecting">>): void {
    for (const e of entries) {
      const idx = Number((e.target as HTMLElement).dataset?.index);
      if (!Number.isInteger(idx)) continue;
      if (e.isIntersecting) this._spyInView.add(idx);
      else this._spyInView.delete(idx);
    }
    if (Date.now() < this._spySuppressUntil || this._spyInView.size === 0) return;
    const top = Math.min(...this._spyInView);
    if (top === this._selected) return;
    // Selection follows the scroll here — don't scroll back in response.
    this._spyDriven = true;
    try {
      this._selectIndex(top, false);
    } finally {
      this._spyDriven = false;
    }
  }

  // Fire an HA action via the standard handler. handleAction reads `entity`
  // from the top-level config (for more-info/toggle), so surface the action's.
  private _runAction(action: any, key: "tap" | "hold"): void {
    if (!action || !this._hass) return;
    // custom-card-helpers only knows the legacy `call-service`; translate the
    // modern `perform-action` (what HA's own action picker writes).
    if (action.action === "perform-action" && typeof action.perform_action === "string") {
      action = {
        ...action,
        action: "call-service",
        service: action.perform_action,
        service_data: action.data ?? action.service_data,
      };
    }
    const cfg = { entity: action?.entity, [`${key}_action`]: action };
    handleAction(this, this._hass as any, cfg as any, key as any);
  }

  // Tab long-press (kind="hold") or badge click (kind="badge") → fire the tab's
  // corresponding action via HA's handler. handleAction reads `entity` from the
  // top-level config (for more-info/toggle), so surface the action's entity.
  private _onTabAction(e: CustomEvent<{ index: number; kind: "hold" | "badge" }>): void {
    const tab = this._visibleTabs()[e.detail.index];
    if (!tab || !this._hass) return;
    const action = e.detail.kind === "badge" ? tab.badge_action : tab.hold_action;
    this._runAction(action, e.detail.kind === "badge" ? "tap" : "hold");
  }

  // --- public API -------------------------------------------------------------
  // Select a visible tab by index, exact name, or slug ("living-room").
  // Returns false when no such tab exists (or it can't be opened).
  selectTab(target: number | string): boolean {
    const visible = this._visibleTabs();
    let i = -1;
    if (typeof target === "number") i = target;
    else {
      const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      i = visible.findIndex((t) => t.name === target);
      if (i < 0) i = visible.findIndex((t) => t.name !== undefined && slug(t.name) === slug(String(target)));
    }
    if (!this._isContentTab(visible[i])) return false;
    this._collapsed = false;
    if (i !== this._selected) this._selectIndex(i);
    return true;
  }

  // Name of the active tab (undefined before the first build).
  get selectedTab(): string | undefined {
    return this._visibleTabs()[this._selected]?.name;
  }

  // The active child of each menu-grouped tab, for its subtitle.
  private _groupChild = new WeakMap<TabdeckTabConfig, string>();

  // A nested deck (grouped tab) changed tab: show the child as the subtitle.
  private _onNestedChanged = (e: Event): void => {
    const detail = (e as CustomEvent).detail;
    if (!detail || detail.deck === this) return;
    const owner = this._allTabs().find((t) => this._manager?.get(this._allTabs().indexOf(t)) === detail.deck);
    if (owner?.group?.display === "menu" && detail.name) {
      this._groupChild.set(owner, detail.name);
      this.requestUpdate();
    }
  };

  // `persist: false` for automatic switches (rotation, idle return, entity
  // sync) that must not overwrite the remembered choice.
  private _selectIndex(index: number, persist = true): void {
    const visible = this._visibleTabs();
    const prev = visible[this._selected];
    const changed = index !== this._selected;
    // unload_after counts from when a tab was last on screen.
    const now = Date.now();
    if (prev) this._seenAt.set(this._allTabs().indexOf(prev), now);
    if (visible[index]) {
      const original = this._allTabs().indexOf(visible[index]);
      this._seenAt.set(original, now);
      this._manager?.ensure(original);
    }
    this._selected = index;
    if (changed) {
      this._runAction(prev?.leave_action, "tap");
      this._runAction(visible[index]?.enter_action, "tap");
    }
    const tab = visible[this._selected];
    if (changed) {
      this.dispatchEvent(
        new CustomEvent("tabdeck-tab-changed", {
          detail: { index, name: tab?.name, deck: this },
          bubbles: true,
          composed: true,
        }),
      );
    }
    // Picks made while editing (possibly of a hidden tab) aren't remembered.
    if (this._config && persist && !this._editing) {
      const r = persistIndex({
        mode: this._config.remember,
        cardKey: this._cardKey,
        index: this._selected,
        tabName: tab?.name,
      });
      if (this._config.history && !this._fromPop) {
        // One entry per user switch, tagged with this deck's key so Back can
        // tell our entries from HA's (dialogs, views).
        history.pushState(this._historyState(this._selected), "", r.hash ?? location.href);
      } else if (r.hash && typeof location !== "undefined") {
        history.replaceState(this._config.history ? this._historyState(this._selected) : null, "", r.hash);
      }
      if (this._config.remember === "entity") this._writeRememberEntity(this._selected);
    }
    if (this._config?.scroll_spy && !this._spyDriven) this._scrollToSection(index);
    this.updateComplete.then(() =>
      this._manager?.notifyVisible(this._activeOriginalIndex()),
    );
  }

  // --- unload_after ----------------------------------------------------------
  // Last time each tab (original index) was on screen.
  private _seenAt = new Map<number, number>();
  private _builtAt = Date.now();
  private _unloadTimer?: ReturnType<typeof setInterval>;

  private _syncUnloadTimer(): void {
    const want = !!this._config?.unload_after && this.isConnected;
    if (want && !this._unloadTimer) {
      this._unloadTimer = setInterval(() => this._sweepUnloaded(Date.now()), 30_000);
    } else if (!want && this._unloadTimer) {
      clearInterval(this._unloadTimer);
      this._unloadTimer = undefined;
    }
  }

  // Free every tab not on screen for unload_after minutes. Layouts that show
  // all tabs at once (scroll_spy, split) keep everything.
  _sweepUnloaded(now: number): void {
    const minutes = this._config?.unload_after;
    if (!minutes || !this._manager || !this._built || this._config!.scroll_spy || this._isSplit) return;
    const active = this._activeOriginalIndex();
    let freed = false;
    this._allTabs().forEach((_t, i) => {
      if (i === active || !this._manager!.isLoaded(i)) return;
      const seen = this._seenAt.get(i) ?? this._builtAt;
      if (now - seen >= minutes * 60_000) {
        this._manager!.unload(i);
        freed = true;
      }
    });
    if (freed) this.requestUpdate();
  }

  // --- fullscreen --------------------------------------------------------------
  private _toggleFullscreen = (): void => {
    this._fullscreen = !this._fullscreen;
    this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
  };

  private _onFullscreenKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this._fullscreen) {
      this._fullscreen = false;
      this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
    }
  };

  // --- swipe_peek -------------------------------------------------------------
  // During a horizontal drag the active panel follows the finger and the
  // neighbour in that direction slides in beside it. Styles are set directly
  // on the panels (no re-render per frame) and cleared on release.
  private _peek?: { x: number; y: number; t: number; axis?: "x" | "y"; dx: number; neighbour?: HTMLElement };
  // Set when a peek drag changes tab, so the normal enter animation is skipped.
  private _peekSettling = false;

  private _panelEl(index: number): HTMLElement | null {
    return this.renderRoot?.querySelector?.(`.panel[data-index="${index}"]`) as HTMLElement | null;
  }

  private _peekStart(x: number, y: number): void {
    this._peek = { x, y, t: performance.now(), dx: 0 };
  }

  private _onTouchMove = (e: TouchEvent): void => {
    const p = this._peek;
    const t = e.touches[0];
    if (!p || !t || !this._config?.swipe_peek) return;
    const dx = t.clientX - p.x;
    const dy = t.clientY - p.y;
    if (!p.axis) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      p.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (p.axis !== "x") return;
    this._peekMove(dx);
  };

  private _peekMove(dx: number): void {
    const p = this._peek!;
    const content = this.renderRoot.querySelector(".content") as HTMLElement | null;
    const active = this._panelEl(this._selected);
    if (!content || !active) return;
    const dir = dx < 0 ? 1 : -1;
    const target = this._stepContent(this._selected, dir, !!this._config?.swipe_wrap);
    const next = target !== this._selected ? this._panelEl(target) : null;
    // Nothing that way: resist instead of following.
    const offset = next ? dx : dx / 3;
    p.dx = dx;
    content.classList.add("dragging");
    active.style.transform = `translateX(${offset}px)`;
    if (p.neighbour && p.neighbour !== next) this._clearPeekPanel(p.neighbour);
    p.neighbour = next ?? undefined;
    if (next) {
      next.classList.add("peek");
      next.style.top = `${active.offsetTop}px`;
      next.style.transform = `translateX(calc(${dir > 0 ? "100%" : "-100%"} + ${offset}px))`;
    }
  }

  private _clearPeekPanel(panel: HTMLElement): void {
    panel.classList.remove("peek");
    panel.style.transform = "";
    panel.style.top = "";
  }

  private _peekEnd(): void {
    const p = this._peek;
    this._peek = undefined;
    if (!p || p.axis !== "x") return;
    const content = this.renderRoot.querySelector(".content") as HTMLElement | null;
    const active = this._panelEl(this._selected);
    const width = content?.clientWidth || 1;
    const velocity = p.dx / Math.max(1, performance.now() - p.t);
    const commit = p.neighbour ? peekCommit(p.dx, width, velocity) : null;
    const from = active?.style.transform ?? "";
    if (active) active.style.transform = "";
    if (p.neighbour) this._clearPeekPanel(p.neighbour);
    content?.classList.remove("dragging");
    if (commit) {
      const dir = commit === "next" ? 1 : -1;
      const target = this._stepContent(this._selected, dir, !!this._config?.swipe_wrap);
      this._peekSettling = true;
      this._selectIndex(target);
      // Carry on from where the neighbour was released.
      const start = `translateX(calc(${dir > 0 ? "100%" : "-100%"} + ${p.dx}px))`;
      this.updateComplete.then(() => {
        const panel = this._panelEl(target);
        if (panel && typeof panel.animate === "function" && !this._reducedMotion()) {
          panel.animate([{ transform: start }, { transform: "translateX(0)" }], { duration: 200, easing: "ease-out" });
        }
      });
    } else if (active && from && typeof active.animate === "function" && !this._reducedMotion()) {
      active.animate([{ transform: from }, { transform: "translateX(0)" }], { duration: 180, easing: "ease-out" });
    }
  }

  private _reducedMotion(): boolean {
    return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Persist the selected index to an HA helper entity (input_number/input_text),
  // so the active tab syncs across devices. Skipped if the entity is absent.
  private _writeRememberEntity(index: number): void {
    const ent = this._config?.remember_entity;
    const hass = this._hass as any;
    if (!ent || !hass?.callService || !hass.states?.[ent]) return;
    this._entityWriteGuard = Date.now() + 1500;
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
    if (this._config.swipe_peek) this._peekStart(t.clientX, t.clientY);
  };

  private _onTouchEnd = (e: TouchEvent): void => {
    const start = this._touchStart;
    this._touchStart = undefined;
    if (!start || !this._config?.swipe) return;
    // With swipe_peek the drag itself decides.
    if (this._config.swipe_peek) return this._peekEnd();
    const t = e.changedTouches[0];
    if (!t) return;
    this._applySwipe(start, { x: t.clientX, y: t.clientY, t: e.timeStamp });
  };

  // Mouse (pointer) drag swiping — opt-in via swipe_mouse, ignores touch
  // pointers (handled by the touch listeners).
  private _onPointerDown = (e: PointerEvent): void => {
    if (!this._config?.swipe_mouse || e.pointerType === "touch") {
      this._touchStart = undefined;
      return;
    }
    this._touchStart = { x: e.clientX, y: e.clientY, t: e.timeStamp };
  };

  private _onPointerUp = (e: PointerEvent): void => {
    const start = this._touchStart;
    this._touchStart = undefined;
    if (!start || !this._config?.swipe_mouse || e.pointerType === "touch") return;
    this._applySwipe(start, { x: e.clientX, y: e.clientY, t: e.timeStamp });
  };

  private _applySwipe(start: SwipePoint, end: SwipePoint): void {
    const dir = detectSwipe(start, end);
    if (!dir || !this._config) return;
    // Wrap around the ends when swipe_wrap is on; otherwise clamp. Disabled
    // and action tabs are stepped over.
    const target = this._stepContent(
      this._selected,
      dir === "next" ? 1 : -1,
      this._config.swipe_wrap,
    );
    if (target !== this._selected) this._selectIndex(target);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const visible = this._visibleTabs();
    if (this._selected > visible.length - 1) this._selected = 0;
    if (
      changed.has("_selected") &&
      changed.get("_selected") !== undefined &&
      !this._config?.scroll_spy
    ) {
      if (this._peekSettling) this._peekSettling = false;
      else this._animatePanel(this._selected >= (changed.get("_selected") as number) ? 1 : -1);
    }
    this._applyStyles();
    this._syncSpyObserver();
    this._syncDock();
  }

  // --- dock ----------------------------------------------------------------
  // The dock spans HA's dashboard area, not the sidebar: find the nearest
  // dashboard panel up the (shadow-crossing) tree and track its edges. A
  // ResizeObserver catches window resizes and the sidebar opening/closing.
  private _dockObserver?: ResizeObserver;

  private _syncDock(): void {
    const want = !!this._config?.dock && !this._editing && this.isConnected;
    if (!want) {
      this._dockObserver?.disconnect();
      this._dockObserver = undefined;
      return;
    }
    if (this._dockObserver || typeof ResizeObserver === "undefined") return;
    const panel = this._dashboardPanel();
    if (!panel) return;
    this._dockObserver = new ResizeObserver(() => this._measureDock(panel));
    this._dockObserver.observe(panel);
    this._measureDock(panel);
  }

  private _dashboardPanel(): Element | undefined {
    let node: Node | null = this;
    while (node) {
      if (node instanceof Element && /^(HUI-ROOT|HA-PANEL-LOVELACE)$/.test(node.tagName)) return node;
      node = node.parentNode ?? (node as ShadowRoot).host ?? null;
    }
    return undefined;
  }

  private _measureDock(panel: Element): void {
    const r = panel.getBoundingClientRect();
    if (r.width === 0) return;
    this.style.setProperty("--tabdeck-dock-left", `${Math.max(0, Math.round(r.left))}px`);
    this.style.setProperty("--tabdeck-dock-right", `${Math.max(0, Math.round(window.innerWidth - r.right))}px`);
  }

  // Keys currently applied to the host from `styles`, so they can be removed if
  // the config changes (otherwise stale custom properties would linger).
  private _appliedStyleKeys: string[] = [];

  // Apply the `styles` map (CSS property → value, e.g. `--tabdeck-accent`) to the
  // card host, plus the active tab's `styles`. A simple, dependency-free theming hook without card-mod.
  private _applyStyles(): void {
    for (const key of this._appliedStyleKeys) this.style.removeProperty(key);
    // The active tab's own styles layer over the top-level ones.
    const active = this._visibleTabs()[this._selected];
    const styles = { ...(this._config?.styles ?? {}), ...(active?.styles ?? {}) };
    this._appliedStyleKeys = Object.keys(styles);
    for (const [key, value] of Object.entries(styles)) {
      this.style.setProperty(key, String(value));
    }
  }

  // Play a short enter animation on the newly-active panel when a transition is
  // configured. Uses the Web Animations API so it replays on every switch;
  // skipped for `none`, in jsdom, and under prefers-reduced-motion.
  private _animatePanel(dir: 1 | -1): void {
    const cfg = this._config;
    if (!cfg) return;
    const mode = cfg.transition_narrow && this._isNarrow ? cfg.transition_narrow : cfg.transition;
    if (mode === "none" || cfg.transition_duration <= 0) return;
    if (this._reducedMotion()) return;
    const panel = this._panelEl(this._selected);
    if (!panel || typeof panel.animate !== "function") return;
    panel.animate(transitionFrames(mode, dir), {
      duration: cfg.transition_duration,
      easing: cfg.transition_easing,
    });
  }

  render() {
    if (!this._config || !this._built) return nothing;
    const visible = this._visibleTabs();
    if (visible.length === 0) {
      return html`<div class="empty"></div>`;
    }
    const cfg = this._config;
    if (this._isSplit) return this._wrapExtras(this._renderSplit(visible));
    // The dock leaves the page while editing so it can't cover HA's edit UI.
    const docked = cfg.dock && !this._editing;
    const bar = html`
      <tabdeck-tabbar
        .items=${visible.map((t) => ({
          name: this._text(t.name),
          subtitle: this._text(t.subtitle) ?? (t.group?.display === "menu" ? this._groupChild.get(t) : undefined),
          icon: this._text(t.icon),
          accent: this._text(t.accent),
          color: this._text(t.color),
          disabled: t.disabled,
          badgeColor: t.badge_color,
          holdAction: !!t.hold_action,
          badgeAction: !!t.badge_action,
          action: isActionTab(t),
          badge: this._resolveBadgeFinal(t),
          alert: this._isAlerting(t),
          ghost: this._editing && this._isHidden(t),
          fab: t.fab,
          menu: t.group?.display === "menu" ? t.group.items : undefined,
        }))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${docked ? "bottom" : cfg.position}
        .dock=${docked}
        .tabStyle=${cfg.style}
        .display=${this._effectiveDisplay}
        .align=${cfg.align}
        .badgeDisplay=${cfg.badge_display}
        .scrollable=${cfg.scrollable}
        .animated=${cfg.animated}
        .accentIndicator=${cfg.accent_indicator}
        .indicatorSize=${cfg.indicator_size}
        .indicatorRadius=${cfg.indicator_radius}
        .sticky=${cfg.sticky || cfg.scroll_spy}
        .collapsed=${this._collapsed}
        .elevation=${cfg.elevation}
        .scrollButtons=${cfg.scroll_buttons}
        .searchable=${cfg.search}
        .expandable=${cfg.fullscreen}
        @tabdeck-fullscreen=${this._toggleFullscreen}
        .railExpand=${cfg.rail_expand}
        .customizable=${cfg.customize && !this._editing}
        .customItems=${cfg.customize ? this._customItems() : []}
        @tabdeck-customize=${this._onCustomize}
        .overflowMenu=${cfg.overflow_menu}
        .barLabel=${cfg.aria_label}
        .language=${hassLanguage(this._hass)}
        .barBackground=${cfg.bar_background}
        @tabdeck-select=${this._onSelect}
      ></tabdeck-tabbar>
    `;
    const activeTab = visible[this._selected];
    const background = activeTab && !cfg.scroll_spy ? cssBackground(this._text(activeTab.background)) : undefined;
    const fixedHeight = cfg.content_height !== "auto" && cfg.content_height !== "tallest" ? cfg.content_height : undefined;
    const scrolls = !this._fullscreen && !!(fixedHeight || cfg.content_max_height);
    const contentStyle = [
      background ? `background:${background}` : "",
      scrolls && fixedHeight ? `height:${fixedHeight}` : "",
      scrolls && cfg.content_max_height ? `max-height:${cfg.content_max_height}` : "",
    ]
      .filter(Boolean)
      .join(";");
    const contentClass = [
      "content",
      cfg.content_arrows && !cfg.scroll_spy ? "with-arrows" : "",
      cfg.content_height === "tallest" && !cfg.scroll_spy ? "tallest" : "",
      scrolls ? "scrolls" : "",
      background || (!cfg.scroll_spy && visible.some((t) => t.background)) ? "has-bg" : "",
      this._fullscreen ? "fullscreen" : "",
      cfg.fullscreen && cfg.hide_bar ? "with-fs" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const lang = hassLanguage(this._hass);
    const panels = html`
      <div
        class=${contentClass}
        style=${contentStyle}
        id="tabdeck-panel"
        role="tabpanel"
        ?hidden=${this._collapsed}
        @touchstart=${this._onTouchStart}
        @touchmove=${this._onTouchMove}
        @touchend=${this._onTouchEnd}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @tabdeck-tab-changed=${this._onNestedChanged}
      >
        ${cfg.content_arrows && !cfg.scroll_spy ? this._renderArrows() : nothing}
        ${cfg.fullscreen && (this._fullscreen || cfg.hide_bar)
          ? html`<button
              class="fs-toggle"
              aria-label=${localize(lang, this._fullscreen ? "card.exit_fullscreen" : "card.fullscreen")}
              title=${localize(lang, this._fullscreen ? "card.exit_fullscreen" : "card.fullscreen")}
              @click=${this._toggleFullscreen}
            >
              <ha-icon .icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
            </button>`
          : nothing}
        ${cfg.header && !cfg.scroll_spy && visible[this._selected]
          ? html`<div class="content-header">
              <span class="content-title">${this._text(visible[this._selected].name) ?? ""}</span>
              ${this._text(visible[this._selected].subtitle)
                ? html`<span class="content-subtitle"
                    >${this._text(visible[this._selected].subtitle)}</span
                  >`
                : nothing}
            </div>`
          : nothing}
        ${visible.map((tab, i) => {
          const original = this._allTabs().indexOf(tab);
          const active = i === this._selected;
          const spy = cfg.scroll_spy;
          // With unmount_hidden, only the active panel's card is in the DOM
          // (others stay retained in the manager but detached) to save memory.
          // scroll_spy stacks every panel, so it always shows them all.
          return html`
            <div class="panel ${spy ? "section" : ""}" data-index=${i} ?hidden=${!spy && !active}>
              ${spy && cfg.header && !isActionTab(tab)
                ? html`<div class="section-title">${this._text(tab.name) ?? ""}</div>`
                : nothing}
              ${active ? this._manager?.ensure(original) : spy || !cfg.unmount_hidden ? this._manager?.get(original) : nothing}
            </div>
          `;
        })}
      </div>
    `;
    return this._wrapExtras(html`
      <div class="root pos-${docked ? "bottom" : cfg.position} ${docked ? "docked" : ""} ${cfg.hide_bar ? "no-bar" : ""}">
        ${cfg.hide_bar ? panels : docked || cfg.position === "bottom" ? html`${panels}${bar}` : html`${bar}${panels}`}
      </div>
    `);
  }

  // header_cards above and footer_cards below the deck, on every tab.
  private _wrapExtras(deck: unknown) {
    if (!this._extras) return deck;
    const head = this._config!.header_cards?.length ?? 0;
    const cards = this._extras.all();
    const header = cards.slice(0, head);
    const footer = cards.slice(head);
    return html`
      ${header.length ? html`<div class="deck-header">${header}</div>` : nothing}
      ${deck}
      ${footer.length ? html`<div class="deck-footer">${footer}</div>` : nothing}
    `;
  }

  // content_arrows: ‹ › over the content. An arrow that can't move (at an end,
  // without swipe_wrap) isn't rendered.
  private _renderArrows() {
    const wrap = !!this._config?.swipe_wrap;
    const prev = this._stepContent(this._selected, -1, wrap);
    const next = this._stepContent(this._selected, 1, wrap);
    const lang = hassLanguage(this._hass);
    return html`
      ${prev !== this._selected
        ? html`<button class="nav-arrow prev" aria-label=${localize(lang, "card.prev_tab")} @click=${() => this._selectIndex(prev)}>‹</button>`
        : nothing}
      ${next !== this._selected
        ? html`<button class="nav-arrow next" aria-label=${localize(lang, "card.next_tab")} @click=${() => this._selectIndex(next)}>›</button>`
        : nothing}
    `;
  }

  // A tab pulses while all of its `alert` conditions are met.
  private _isAlerting(tab: TabdeckTabConfig): boolean {
    if (!tab.alert || !this._hass) return false;
    return isTabVisible(tab.alert, this._hass, this._templateResolver);
  }

  // A display field that may be a Jinja template: the latest rendered value
  // (empty/pending → unset), or the plain string as-is.
  private _text(value?: string): string | undefined {
    if (!isTemplate(value)) return value;
    const r = this._templates?.result(value!);
    return r === undefined || r === null || String(r).trim() === "" ? undefined : String(r).trim();
  }

  // Resolve a badge, then drop it if hide_inactive_badge is on and the value is
  // inactive (0/off/etc) — so e.g. a count badge only shows when > 0.
  // Numeric values are then formatted per badge_format (text badges only —
  // dots show no text, and must keep seeing the raw value).
  private _resolveBadgeFinal(tab: TabdeckTabConfig): string | undefined {
    const value = this._resolveBadge(tab.badge);
    if (this._config?.hide_inactive_badge && !isActiveBadge(value)) return undefined;
    if (this._config?.badge_display === "dot") return value;
    return formatBadge(value, tab.badge_format ?? this._config?.badge_format);
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
    /* Beside a side bar, the content takes the remaining width. */
    .root.pos-left > .content,
    .root.pos-right > .content {
      flex: 1;
      min-width: 0;
    }
    .content {
      padding-top: 8px;
      position: relative;
    }
    .root.no-bar .content {
      padding-top: 0;
    }
    .nav-arrow {
      position: absolute;
      top: 50%;
      z-index: 3;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 24px;
      line-height: 1;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      opacity: var(--tabdeck-arrow-opacity, 0.7);
      transition: opacity 120ms ease;
    }
    .nav-arrow:hover,
    .nav-arrow:focus-visible {
      opacity: 1;
    }
    /* Arrows live in their own gutters so they never cover the card's
       controls. */
    .content.with-arrows {
      padding-left: var(--tabdeck-arrow-gutter, 40px);
      padding-right: var(--tabdeck-arrow-gutter, 40px);
    }
    .nav-arrow.prev {
      left: 2px;
    }
    .nav-arrow.next {
      right: 2px;
    }
    /* Room for the fixed dock so the last card isn't hidden behind it. */
    .root.docked .content {
      padding-bottom: calc(var(--tabdeck-dock-tab-height, 56px) + 16px + env(safe-area-inset-bottom, 0px));
    }
    .content-header {
      display: flex;
      flex-direction: column;
      padding: 4px 4px 10px;
    }
    .content-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .content-subtitle {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .panel[hidden],
    .content[hidden] {
      display: none;
    }
    /* scroll_spy: stacked sections; leave room for HA's header + sticky bar
       when a section is scrolled to. */
    .panel.section {
      scroll-margin-top: var(--tabdeck-spy-offset, 120px);
    }
    .panel.section + .panel.section {
      margin-top: 16px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 4px 4px 10px;
    }
    .empty {
      min-height: 8px;
    }
    .deck-header,
    .deck-footer {
      display: flex;
      flex-direction: column;
      gap: var(--tabdeck-extras-gap, 8px);
    }
    .deck-header {
      margin-bottom: var(--tabdeck-extras-gap, 8px);
    }
    .deck-footer {
      margin-top: var(--tabdeck-extras-gap, 8px);
    }
    /* content_height: tallest — every panel shares one grid cell, so the
       content is as tall as the tallest tab; inactive ones are invisible. */
    .content.tallest {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
    }
    .content.tallest > .content-header {
      grid-row: 1;
    }
    .content.tallest > .panel {
      grid-row: 2;
      grid-column: 1;
    }
    .content.tallest > .panel[hidden] {
      display: block;
      visibility: hidden;
      pointer-events: none;
    }
    .content.scrolls {
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .content.has-bg {
      padding: 12px;
      margin-top: 8px;
      border-radius: var(--tabdeck-content-radius, var(--ha-card-border-radius, 12px));
    }
    .content.with-fs {
      padding-top: 40px;
    }
    .fs-toggle {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 3;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      opacity: var(--tabdeck-arrow-opacity, 0.7);
    }
    .fs-toggle:hover,
    .fs-toggle:focus-visible {
      opacity: 1;
    }
    .content.fullscreen {
      position: fixed;
      inset: 0;
      z-index: var(--tabdeck-fullscreen-z, 9);
      margin: 0;
      padding: calc(52px + env(safe-area-inset-top, 0px)) 16px calc(16px + env(safe-area-inset-bottom, 0px));
      overflow-y: auto;
      border-radius: 0;
      background: var(--tabdeck-fullscreen-background, var(--primary-background-color));
    }
    .content.fullscreen.has-bg {
      background-size: cover;
    }
    .content.fullscreen .fs-toggle {
      position: fixed;
      top: calc(8px + env(safe-area-inset-top, 0px));
      right: 12px;
    }
    /* swipe_peek: the neighbour panel shown beside the dragged one. */
    .content.dragging {
      overflow: hidden;
      touch-action: pan-y;
    }
    .panel.peek[hidden] {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .content.has-bg > .panel.peek {
      left: 12px;
      right: 12px;
    }
    .content.with-arrows > .panel.peek {
      left: var(--tabdeck-arrow-gutter, 40px);
      right: var(--tabdeck-arrow-gutter, 40px);
    }
    .split {
      display: grid;
      grid-template-columns: repeat(var(--tabdeck-split-columns, 2), minmax(0, 1fr));
      gap: var(--tabdeck-split-gap, 16px);
      align-items: start;
    }
    .split-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 4px 4px 10px;
    }
    .split-title ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
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
