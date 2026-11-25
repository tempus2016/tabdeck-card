import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { handleAction } from "custom-card-helpers";
import type { HomeAssistant } from "./types";
import {
  expandTab,
  isActionTab,
  normalizeConfig,
  normalizeTab,
  resolveDefaultIndex,
  type TabdeckCardConfig,
  type TabdeckTabConfig,
} from "./lib/config";
import { expandGeneratedTabs } from "./lib/generate";
import { conditionEntities, isTabVisible } from "./lib/conditions";
import { loadInitialIndex, parseHashIndex, persistIndex, rememberedIndex } from "./lib/persistence";
import { copyText, shareUrl } from "./lib/share";
import { encodeQr, qrSvgPath } from "./lib/qr";
import { CardManager, getCreateCardElement } from "./lib/card-lifecycle";
import { isTemplate, makeHassSubscribe, TemplateRenderer, type SubscribeFn } from "./lib/templates";
import { formatBadge } from "./lib/badge";
import { hassLanguage, LanguageController, localize, plural } from "./lib/i18n";
import "./translations/card";
import { detectSwipe, startsAtEdge, startsOnControl, type SwipePoint } from "./lib/swipe";
import { hideTabs, loadLayout, moveName, orderTabs, saveLayout, type UserLayout } from "./lib/customize";
import { cssBackground, peekCommit, transitionFrames } from "./lib/layout";
import { cssColor } from "./lib/color";
import { takeoverFires, takeoverSeconds } from "./lib/takeover";
import { isQuiet } from "./lib/quiet";
import { WakeLock } from "./lib/wake-lock";
import { playClick } from "./lib/click-sound";
import { learnedTab, loadHourly, loadUsage, recordHourly, recordUse, saveHourly, saveUsage, sortByUsage, type HourlyUsage, type UsageCounts } from "./lib/usage";
import { isUnhealthy } from "./lib/health";
import { clockText, shouldDim } from "./lib/screensaver";
import { isPinchIn, overviewTiles, touchDistance } from "./lib/overview";
import { remoteStep, type RemoteStep } from "./lib/remote-keywords";
import { lastSynced, matchTabName, onSync, publishSync } from "./lib/sync";
import { popupRequest } from "./lib/popup";
import { wizardStep } from "./lib/wizard";
import { lastTabIndex } from "./lib/last-tab";
import { compareIndex } from "./lib/compare";
import { orientedPosition } from "./lib/orientation";
import { explainCardError, findErrorCards, setErrorCardHidden, type CardProblem } from "./lib/friendly-errors";
import { sizeStyles } from "./lib/size";
import { applyPageBackground, findBackgroundTarget, restorePageBackground, type BackgroundTarget } from "./lib/page-background";
import { savedScroll, saveScroll, scrollWithRetry } from "./lib/scroll-memory";
import { styleMap } from "lit/directives/style-map.js";
import { createPanelWatch, normalizeEmpty, type PanelState } from "./lib/empty";
import { createWheelStepper } from "./lib/wheel";
import { entityPlaces, isSearchShortcut, searchPlaces, type EntityPlace } from "./lib/entity-search";
import { CLIENT_SOURCES } from "./lib/sources";
import { notificationItems, repairItems, type NotificationEntry, type RepairIssue } from "./lib/client-sources";
import { cardEntities, changedSince, loadSeen, saveSeen } from "./lib/changed";
import { GraphStore, normalizeGraph, sparkline } from "./lib/mini-graph";
import { countdownSeconds, formatCountdown } from "./lib/countdown";
import { barWindow } from "./lib/bar-window";
import { AUTOHIDE_START, autoHideStep, type AutoHideState } from "./lib/autohide";
import {
  autoContentCard,
  clearSnooze,
  countBadge,
  deviceId,
  normalizeCountBadge,
  orderAlertsFirst,
  pickByDevice,
  pickByTime,
  pinExpiresAt,
  pinUnlocked,
  rememberPin,
  ringPercent,
  snooze,
  snoozedUntil,
} from "./lib/smart";
import { loadEditor } from "./editor-loader";
import "./components/tabdeck-tabbar";
import "./components/tabdeck-masonry-card";
import "./components/tabdeck-sections-card";
import "./components/tabdeck-view-card";
import { isActiveBadge, type ExtraBadge } from "./components/tabdeck-tab";
import { activeSeason, type Season } from "./lib/seasons";
import { imageColor } from "./lib/image-color";
import { isRtl } from "./lib/rtl";
import { reducedMotion, reducedMotionCss } from "./lib/motion";
import { tabdeckRegistry, type RegisteredDeck } from "./lib/registry";
import { companionBrowserId, companionSafeId, companionTab } from "./lib/companion";
import { UsageMeter } from "./lib/usage-stats";
import { hasTabRefs, placeholderTabs, resolveTabRefs } from "./lib/tab-ref";
import { loadDashboard } from "./lib/view-source";
import { mdiLanDisconnect } from "@mdi/js";
import { version as CARD_VERSION } from "../package.json";

// Events that count as the user interacting with the card.
const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"] as const;

// Tab display fields that may be Jinja templates (rendered live by HA).
const TEMPLATED_FIELDS = ["name", "subtitle", "icon", "color", "accent", "background", "page_background", "icon_animation", "picture", "tooltip"] as const;

// entity_search: every deck on the page with it on. Ctrl+K opens the palette
// on the first one that's on screen, and it searches all of them.
const SEARCH_DECKS = new Set<TabdeckCard>();
let searchKeyBound = false;

function onSearchKey(e: KeyboardEvent): void {
  if (!isSearchShortcut(e) || e.defaultPrevented) return;
  const decks = [...SEARCH_DECKS].filter((d) => d.isConnected);
  const owner = decks.find((d) => typeof (d as any).checkVisibility !== "function" || (d as any).checkVisibility()) ?? decks[0];
  if (!owner) return;
  e.preventDefault();
  e.stopPropagation();
  owner.openEntitySearch();
}

type DeckPlace = EntityPlace & { deck: TabdeckCard };

@customElement("tabdeck-card")
export class TabdeckCard extends LitElement {
  // Redraws once a non-English language chunk arrives.
  protected readonly _language = new LanguageController(this);
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
    this._scheduleErrorScan();
    this._syncWakeLock();
    this._syncUsage();
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
    await loadEditor();
    return document.createElement("tabdeck-card-editor");
  }

  setConfig(raw: any): void {
    this._flushUsage();
    // tab_ref: show the names now, swap in the shared tabs once loaded.
    if (!this._applyingRefs) {
      this._refToken++;
      this._refRaw = hasTabRefs(raw) ? raw : undefined;
      this._refKeep = undefined;
      if (this._refRaw) raw = placeholderTabs(raw);
    }
    this._config = normalizeConfig(raw);
    this._cardKey = this._computeCardKey(this._config);
    this._built = false;
    this._selected = resolveDefaultIndex(this._config);
    this._collapsed = this._config.start_collapsed;
    this._fullscreen = false;
    this._overview = false;
    this._pinchStart = undefined;
    this._esOpen = false;
    this._popupTab = undefined;
    this._takeover = undefined;
    this._takeoverStates.clear();
    this._syncTakeoverTimer();
    this._syncSearchRegistry();
    this._syncLinked();
    this._seenAt.clear();
    this._autoHide = AUTOHIDE_START;
    this._barHidden = false;
    this._alertOrder = new Set();
    this._autoSigs = [];
    this._lastRemote = undefined;
    this._lastTab = undefined;
    this._pinFor = undefined;
    this._previewIndex = -1;
    this._pipTab = undefined;
    this._pendingAuto = undefined;
    this._unsubscribeRemote();
    this._stopCompanion();
    this._companionMissing = false;
    this._stopClientSource();
    this._clientItems = undefined;
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
    this._syncOrientation();
    this._refreshedAt = new Map();
    this._drawMs.clear();
    void this._build();
    this._syncTabRefs();
    this._syncOffline();
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

  // --- orientation_layout ---------------------------------------------------------
  // Whether the screen is upright, kept live while the option is on.
  @state() private _portrait = false;
  private _orientationQuery?: MediaQueryList;

  private _syncOrientation(): void {
    const want = !!this._config?.orientation_layout && this.isConnected && typeof window.matchMedia === "function";
    if (want && !this._orientationQuery) {
      this._orientationQuery = window.matchMedia("(orientation: portrait)");
      this._portrait = this._orientationQuery.matches;
      this._orientationQuery.addEventListener("change", this._onOrientation);
    } else if (!want && this._orientationQuery) {
      this._orientationQuery.removeEventListener("change", this._onOrientation);
      this._orientationQuery = undefined;
    }
  }

  private _onOrientation = (e: { matches: boolean }): void => {
    this._portrait = e.matches;
  };

  // The bar's side: position, or the one for this orientation.
  private get _position() {
    return orientedPosition(this._config!.position, this._config!.orientation_layout, this._portrait);
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
              ${this._isLocked(tab) ? this._renderLocked(tab) : this._manager?.ensure(this._allTabs().indexOf(tab))}
            </div>
          `;
        })}
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    for (const ev of INTERACTION_EVENTS) this.addEventListener(ev, this._onInteraction);
    this.addEventListener("pointerdown", this._onCardPointerDown);
    this.addEventListener("focusout", this._onFocusOut);
    window.addEventListener("pointerup", this._onPointerRelease, true);
    window.addEventListener("pointercancel", this._onPointerRelease, true);
    document.addEventListener("visibilitychange", this._syncCountdown);
    document.addEventListener("visibilitychange", this._syncWakeLock);
    this._syncCountdown();
    this._syncWakeLock();
    this._syncUsage();
    this._syncTimer();
    this._syncTakeoverTimer();
    this._syncUnloadTimer();
    this._syncRefreshTimer();
    this._syncWidthObserver();
    this._syncOrientation();
    // disconnectedCallback dropped the template subscriptions. Restore them
    // now: a quiet instance may not send a new hass for a long time.
    if (this._hass) {
      this._syncTemplates();
      // Home Assistant sets hass before attaching the card (and detaching
      // drops the subscription), so subscribe here too.
      this._syncRemoteEvent();
      this._syncCompanion();
    }
    // HA moves cards around the DOM during layout; re-observe on reconnect.
    if (this._config?.scroll_spy) this.updateComplete.then(() => this._syncSpyObserver());
    if (this._config?.dock) this.updateComplete.then(() => this._syncDock());
    this.updateComplete.then(() => {
      this._syncPanelWatch();
      this._syncPageBackground();
    });
    if (this._built) this._scheduleErrorScan();
    document.addEventListener("keydown", this._onHotkey);
    document.addEventListener("keydown", this._onFullscreenKey);
    window.addEventListener("popstate", this._onPopState);
    window.addEventListener("scroll", this._onPageScroll, { passive: true });
    for (const ev of INTERACTION_EVENTS) window.addEventListener(ev, this._onPageActivity, { capture: true, passive: ev !== "keydown" });
    this._lastActivity = Date.now();
    this._syncClientSource();
    this._syncSearchRegistry();
    this._syncLinked();
    window.addEventListener("ll-custom", this._onPopupEvent);
    if (this._built) this._schedulePreload();
    this._unregister ??= tabdeckRegistry(CARD_VERSION)._register(this._registered);
    this._syncOffline();
  }

  // --- window.tabdeck (developer access) --------------------------------------
  private _unregister?: () => void;
  private _registered: RegisteredDeck = (() => {
    const deck = this;
    return {
      get deckId() {
        return deck._deckId;
      },
      element: deck,
      names: () => deck._visibleTabs().map((t) => deck._text(t.name) ?? ""),
      current: () => ({ index: deck._selected, name: deck._built ? deck.selectedTab : undefined }),
      select: (target: number | string) => {
        if (!deck._built) return false;
        const step = typeof target === "string" && deck._indexOf(target) < 0 ? remoteStep(target) : undefined;
        if (!step) return deck.selectTab(target);
        const i = deck._stepTarget(step);
        if (i < 0 || !deck._isContentTab(deck._visibleTabs()[i])) return false;
        return deck.selectTab(i);
      },
    };
  })();

  // --- bar_autohide ---------------------------------------------------------
  // Hidden while the page scrolls down; only a pinned bar (sticky, dock,
  // scroll_spy) hides, since an unpinned one scrolls away by itself.
  @state() private _barHidden = false;
  private _autoHide: AutoHideState = AUTOHIDE_START;

  private get _barPinned(): boolean {
    const cfg = this._config;
    return !!cfg && (cfg.sticky || cfg.scroll_spy || (cfg.dock && !this._editing));
  }

  private _onPageScroll = (): void => {
    if (!this._config?.bar_autohide || !this._barPinned) return;
    this._applyScroll(typeof window.scrollY === "number" ? window.scrollY : 0);
  };

  private _applyScroll(y: number): void {
    this._autoHide = autoHideStep(this._autoHide, y);
    const hidden = this._autoHide.hidden && !this._editing;
    if (hidden !== this._barHidden) this._barHidden = hidden;
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
    if (this._isLocked(this._visibleTabs()[index])) {
      this._pinFor = { index, error: false };
      return;
    }
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
    } else if (e.key === "l" && cfg.last_tab_button) {
      if (this.selectLast()) e.preventDefault();
    } else if (e.key === "o" && cfg.overview) {
      e.preventDefault();
      if (this._overview) this.closeOverview();
      else this.openOverview();
    } else if (/^[1-9]$/.test(e.key)) {
      if (this.selectTab(Number(e.key) - 1)) e.preventDefault();
    } else if (e.key === "[" || e.key === "]") {
      const next = this._stepContent(this._selected, e.key === "]" ? 1 : -1, cfg.swipe_wrap);
      if (next !== this._selected) this._userSelect(next);
    }
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const ev of INTERACTION_EVENTS) this.removeEventListener(ev, this._onInteraction);
    this.removeEventListener("pointerdown", this._onCardPointerDown);
    this.removeEventListener("focusout", this._onFocusOut);
    SEARCH_DECKS.delete(this);
    this._syncUsage();
    this._syncOffline();
    this._unregister?.();
    this._unregister = undefined;
    this._esOpen = false;
    this._unlink?.();
    this._unlink = undefined;
    // _popupTab stays: HA moves cards around the DOM during layout.
    window.removeEventListener("ll-custom", this._onPopupEvent);
    window.removeEventListener("pointerup", this._onPointerRelease, true);
    window.removeEventListener("pointercancel", this._onPointerRelease, true);
    document.removeEventListener("visibilitychange", this._syncCountdown);
    document.removeEventListener("visibilitychange", this._syncWakeLock);
    this._syncCountdown();
    this._syncWakeLock();
    this._syncUsage();
    if (this._pendingTimer) clearTimeout(this._pendingTimer);
    this._pendingTimer = undefined;
    if (this._pinTimer) clearTimeout(this._pinTimer);
    this._pinTimer = undefined;
    this._pointerHeld = false;
    document.removeEventListener("keydown", this._onHotkey);
    document.removeEventListener("keydown", this._onFullscreenKey);
    window.removeEventListener("popstate", this._onPopState);
    window.removeEventListener("scroll", this._onPageScroll);
    if (this._preloadHandle !== undefined) {
      const w = window as any;
      if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(this._preloadHandle);
      clearTimeout(this._preloadHandle);
      this._preloadHandle = undefined;
    }
    for (const ev of INTERACTION_EVENTS) window.removeEventListener(ev, this._onPageActivity, { capture: true });
    this._dimmed = false;
    this._endPreview();
    this._stopClientSource();
    if (this._built) this._markSeen(this._visibleTabs()[this._selected], Date.now(), true);
    this._stopTimer();
    this._syncTakeoverTimer();
    if (this._unloadTimer) clearInterval(this._unloadTimer);
    this._unloadTimer = undefined;
    this._spyObserver?.disconnect();
    this._spyObserver = undefined;
    this._spyObserved = [];
    this._widthObserver?.disconnect();
    this._widthObserver = undefined;
    this._orientationQuery?.removeEventListener("change", this._onOrientation);
    this._orientationQuery = undefined;
    this._stopPanelWatch();
    this._clearPageBackground();
    this._errorTimers.forEach(clearTimeout);
    this._errorTimers = [];
    if (this._refreshTimer) clearInterval(this._refreshTimer);
    this._refreshTimer = undefined;
    this._dockObserver?.disconnect();
    this._dockObserver = undefined;
    this._templates?.destroy();
    this._templates = undefined;
    this._stopCompanion();
    this._unsubscribeRemote();
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
    const want = !!(this._config?.auto_rotate || this._config?.idle_return || this._config?.idle_dim) && this.isConnected;
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
    this._tickDim(now);
    if (this._editing) {
      // Hold while editing; timers restart from the end of the edit.
      this._lastInteraction = this._lastRotate = now;
      return;
    }
    if (this._takeover) {
      // Hold rotation and idle return while a takeover shows its tab.
      this._lastInteraction = this._lastRotate = now;
      return;
    }
    if (this._isQuiet()) {
      // quiet_hours: no rotation or idle return; rotation restarts its
      // interval when they end.
      this._lastRotate = now;
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
        // Don't rotate out from under someone typing or dragging.
        if (next !== this._selected && !this._isBusy()) this._selectIndex(next, false);
      }
      return;
    }
    if (cfg.idle_return && idleMs >= cfg.idle_return * 1000) {
      const home = this._computeDefaultIndex();
      if (home !== this._selected && !this._autoLocked(home, "idle_return")) this._selectIndex(home, false);
      this._lastInteraction = now; // don't re-fire every tick
    }
  }

  // --- idle_dim ---------------------------------------------------------------
  // Last touch / key anywhere on the page (idle_dim counts page-wide).
  private _lastActivity = Date.now();
  @state() private _dimmed = false;

  private _onPageActivity = (e: Event): void => {
    if (!this._config?.idle_dim) return;
    if (this._dimmed) {
      // Any key wakes; a touch wakes through the overlay's own click.
      if (e.type === "keydown") this._wake(e);
      return;
    }
    this._lastActivity = Date.now();
  };

  private _tickDim(now: number): void {
    const cfg = this._config!;
    if (!cfg.idle_dim || this._editing) {
      if (this._dimmed) this._dimmed = false;
      this._lastActivity = now;
      return;
    }
    // Only goes dark here; waking is always an explicit touch, so the touch
    // that wakes the screen never lands on the card underneath.
    if (!this._dimmed && shouldDim(cfg.idle_dim, now, this._lastActivity)) this._dimmed = true;
    else if (this._dimmed && cfg.idle_dim.mode === "clock") this.requestUpdate();
  }

  private _wake = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    this._lastActivity = Date.now();
    this._dimmed = false;
  };

  private _renderDim() {
    const dim = this._config?.idle_dim;
    if (!this._dimmed || !dim) return nothing;
    const clock = dim.mode === "clock" ? clockText(new Date(), this._hass?.locale?.language ?? hassLanguage(this._hass), (this._hass?.locale as any)?.time_format) : undefined;
    return html`<div
      class="screensaver mode-${dim.mode}"
      style=${dim.mode === "dim" ? `background:rgba(0,0,0,${dim.opacity})` : ""}
      role="button"
      tabindex="0"
      aria-label=${localize(hassLanguage(this._hass), "card.wake")}
      @pointerdown=${(e: Event) => e.stopPropagation()}
      @click=${this._wake}
    >
      ${clock
        ? html`<div class="saver-clock"><div class="saver-time">${clock.time}</div><div class="saver-date">${clock.date}</div></div>`
        : nothing}
    </div>`;
  }

  // --- hold automatic switches while the card is in use ------------------------
  // A switch an automation asks for (remote_entity / remote_event, entity
  // sync, auto_select) waits while someone is typing in a field or holding a
  // slider on the card, then happens when they let go. Rotation just skips.
  private _pointerHeld = false;
  private _pendingAuto?: { tab: TabdeckTabConfig; persist: boolean };
  private _pendingTimer?: ReturnType<typeof setTimeout>;

  private _onCardPointerDown = (): void => {
    this._pointerHeld = true;
  };

  private _onPointerRelease = (): void => {
    if (!this._pointerHeld) return;
    this._pointerHeld = false;
    this._flushPendingSoon();
  };

  private _onFocusOut = (): void => this._flushPendingSoon();

  // Typing in a field (not a checkbox / button / slider) inside this card,
  // through any number of shadow roots, or a pointer held down on it.
  _isBusy(): boolean {
    if (this._pointerHeld) return true;
    let el: Element | null = document.activeElement;
    while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
    if (!el || !this._containsDeep(el)) return false;
    const tag = el.tagName;
    if ((el as HTMLElement).isContentEditable || tag === "TEXTAREA" || tag === "SELECT") return true;
    return tag === "INPUT" && !/^(checkbox|radio|button|submit|reset|range|color|file|image)$/i.test((el as HTMLInputElement).type);
  }

  private _containsDeep(el: Node): boolean {
    let n: Node | null = el;
    while (n) {
      if (n === this) return true;
      n = n.parentNode ?? (n as ShadowRoot).host ?? null;
    }
    return false;
  }

  private _autoSwitch(index: number, persist: boolean, source: string): void {
    const tab = this._visibleTabs()[index];
    if (!tab || this._autoLocked(index, source)) return;
    if (this._isBusy()) {
      this._pendingAuto = { tab, persist };
      return;
    }
    this._pendingAuto = undefined;
    this._selectIndex(index, persist);
  }

  private _flushPendingSoon(): void {
    if (!this._pendingAuto) return;
    if (this._pendingTimer) clearTimeout(this._pendingTimer);
    // Focus moving between two fields of the same card shouldn't count.
    this._pendingTimer = setTimeout(() => this._flushPending(), 400);
  }

  _flushPending(): void {
    this._pendingTimer = undefined;
    const p = this._pendingAuto;
    if (!p || this._isBusy()) return;
    this._pendingAuto = undefined;
    const i = this._visibleTabs().indexOf(p.tab);
    // The unlock may have run out while the switch waited.
    if (i >= 0 && i !== this._selected && this._isContentTab(p.tab) && !this._autoLocked(i, "a waiting switch")) this._selectIndex(i, p.persist);
  }

  // Next (or previous) visible content tab after `from` that isn't
  // PIN-locked (wraps, skips disabled/action). `from` when there's none.
  private _nextRotatable(from: number, dir: 1 | -1 = 1): number {
    const visible = this._visibleTabs();
    let i = from;
    for (let n = 0; n < visible.length; n++) {
      i = this._stepContent(i, dir, true);
      if (i === from || !this._isLocked(visible[i])) return i;
    }
    return from;
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
    const buildStart = performance.now();
    this._layout = this._config.customize || this._config.drag_reorder ? loadLayout(this._cardKey) : { order: [], hidden: [] };
    this._usage = this._config.sort_by_usage ? loadUsage(this._cardKey) : {};
    // The order is fixed for this page load, so tabs don't move while in use.
    this._usageOrder = { ...this._usage };
    const create = await getCreateCardElement();
    this._manager = new CardManager(create);
    this._manager.addEventListener("ll-rebuild-done", () => {
      this.requestUpdate();
      this._scheduleErrorScan();
    });
    await this._manager.build(this._cardConfigs(), { lazy: this._config.lazy });
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
    this._seen = this._config.changed_dot ? loadSeen(this._cardKey) : {};
    this._watchCache = new WeakMap();
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
    // share_button: a shared #tab= link opens its tab, whatever remember is.
    let linkedStart = false;
    if (this._config.share_button && this._config.remember !== "url" && typeof location !== "undefined") {
      const linked = parseHashIndex(location.hash, this._visibleTabs().map((t) => t.name ?? ""));
      if (linked !== null && linked < this._visibleTabs().length) {
        this._selected = linked;
        linkedStart = true;
      }
    }
    const fallback = this._computeDefaultIndex();
    this._startReason =
      this._selected !== fallback && this._config.remember !== "none"
        ? `remembered (remember: ${this._config.remember})`
        : this._defaultReason;
    this._hourly = this._config.learned_default ? loadHourly(this._cardKey) : {};
    this._learnedNotice = undefined;
    if (!linkedStart && this._applyLearned()) this._startReason = "learned_default";
    // A remembered, linked or default tab with a PIN: never shown on load.
    this._selected = this._unlockedStart(this._ensureContentTab(this._selected));
    // sync_group: start on the tab the group last switched to.
    const synced = this._config.sync_group ? lastSynced(this._config.sync_group) : undefined;
    const syncIndex = synced !== undefined ? this._syncTarget(synced) : -1;
    if (syncIndex >= 0) {
      this._selected = syncIndex;
      this._learnedNotice = undefined;
      this._startReason = `sync_group ${this._config.sync_group}`;
    }
    // Tag the current entry, so Back to it restores the starting tab.
    if (this._config.history && typeof history !== "undefined") {
      history.replaceState(this._historyState(this._selected), "", location.href);
    }
    // tab_ref swap: stay on the tab that was open on the placeholder deck.
    if (this._refKeep !== undefined) {
      const keep = this._visibleTabs().findIndex((t) => t.name === this._refKeep);
      if (keep >= 0) this._selected = keep;
      this._refKeep = undefined;
    }
    this._lastEntityValue = this._rememberEntityState();
    this._built = true;
    this._syncGraphs();
    this._syncCountdown();
    this._syncWakeLock();
    this._syncUsage();
    this._schedulePreload();
    this._baselineSeen();
    this._markSeen(this._visibleTabs()[this._selected], Date.now(), true);
    this._buildMs = performance.now() - buildStart;
    this._refreshAlertOrder();
    // setConfig dropped the event subscriptions; a quiet system may not send
    // a new hass for a long time, so restore them now.
    if (this._hass) {
      this._syncRemoteEvent();
      this._syncClientSource();
      this._syncCompanion();
    }
    // Client-side source items that arrived before the cards were built.
    if (this._clientItems) void this._syncGeneratedTabs();
    this._scheduleErrorScan();
    this.requestUpdate();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._syncOffline();
    this._syncTabRefs();
    this._manager?.setHass(hass);
    this._extras?.setHass(hass);
    this._syncTemplates();
    this._runAutoSelect();
    this._syncRememberEntity();
    this._syncAutoContent();
    this._refreshAlertOrder();
    this._syncRemoteEntity();
    this._syncFollowRoom();
    this._syncTakeover();
    this._syncRemoteEvent();
    this._syncClientSource();
    this._syncCompanion();
    this._syncGraphs();
    this._syncCountdown();
    if (this._built) this._markSeen(this._visibleTabs()[this._selected], Date.now(), false);
    this.requestUpdate();
  }

  // --- mini graphs ---------------------------------------------------------------
  private _graphs = new GraphStore(() => this.requestUpdate());

  // History is kept only for graphs on tabs the bar actually draws.
  private _syncGraphs(): void {
    if (!this._hass) return;
    const specs = this._barTabs().map((t) => normalizeGraph(t.graph)).filter((g) => g !== undefined);
    if (specs.length || this._graphsOn) this._graphs.sync(this._hass, specs);
    this._graphsOn = specs.length > 0;
  }

  private _graphsOn = false;

  // Tabs the bar draws right now (none without a bar).
  private _barTabs(): TabdeckTabConfig[] {
    const cfg = this._config;
    if (!cfg || !this._built || cfg.hide_bar || cfg.wizard || this._effectiveDisplay === "dots" || cfg.popup === "hidden") return [];
    const visible = this._visibleTabs();
    const [start, end] = barWindow(visible.length, this._selected, cfg.bar_limit ?? 0);
    return visible.slice(start, end);
  }

  // --- countdown badges ---------------------------------------------------------
  // A 1 s tick runs only while a countdown on the bar is running and the page
  // is visible; HA's own updates cover paused timers.
  private _countdownTimer?: ReturnType<typeof setInterval>;

  private _syncCountdown = (): void => {
    const now = Date.now();
    const want =
      this.isConnected &&
      document.visibilityState !== "hidden" &&
      this._barTabs().some((t) => t.countdown && countdownSeconds(this._hass?.states?.[t.countdown], now)?.ticking);
    if (want && !this._countdownTimer) {
      this._countdownTimer = setInterval(() => {
        this.requestUpdate();
        this._syncCountdown();
      }, 1000);
    } else if (!want && this._countdownTimer) {
      clearInterval(this._countdownTimer);
      this._countdownTimer = undefined;
    }
  };

  private _graphLine(t: TabdeckTabConfig): string | undefined {
    const g = normalizeGraph(t.graph);
    const pts = g && this._graphs.points(g.entity);
    return pts ? sparkline(pts, Date.now() / 1000, g!.hours, 44, 12) : undefined;
  }

  // --- auto content (area / floor / label tabs without a card) --------------
  // JSON of each auto-content tab's current card, by original index.
  private _autoSigs: (string | undefined)[] = [];

  private _autoCard(t: TabdeckTabConfig): any {
    if (t.card?.type || (!t.area && !t.floor && !t.label)) return undefined;
    return autoContentCard(t, this._hass, localize(hassLanguage(this._hass), "card.no_entities"));
  }

  // Rebuild an auto-content tab's card when its entity list changes.
  private _syncAutoContent(): void {
    if (!this._manager || !this._built) return;
    this._allTabs().forEach((t, i) => {
      const card = this._autoCard(t);
      if (!card) return;
      const sig = JSON.stringify(card);
      if (sig === this._autoSigs[i]) return;
      this._autoSigs[i] = sig;
      this._manager!.replace(i, card);
    });
  }

  // --- alerts first / snooze ----------------------------------------------------
  // Tabs moved to the front by alert_first; only changed here, so the order
  // (and with it every index) holds still between hass updates.
  private _alertOrder = new Set<TabdeckTabConfig>();

  private _refreshAlertOrder(): void {
    if (!this._config?.alert_first || !this._built) return;
    const now = new Set(this._allTabs().filter((t) => this._isAlerting(t)));
    const same = now.size === this._alertOrder.size && [...now].every((t) => this._alertOrder.has(t));
    if (same) return;
    const prevName = this._visibleTabs()[this._selected]?.name;
    this._alertOrder = now;
    this._restoreSelection(prevName);
  }

  private _snoozeKey(tab: TabdeckTabConfig): string {
    return this._text(tab.name) ?? String(this._allTabs().indexOf(tab));
  }

  // --- remote control ----------------------------------------------------------
  private get _deckId(): string {
    return this._config?.event_id ?? this._config?.storage_key ?? this._cardKey;
  }

  // Index of a visible tab by index, exact name, or slug ("living-room").
  private _indexOf(target: unknown): number {
    const visible = this._visibleTabs();
    if (typeof target === "number") return target;
    const text = String(target ?? "").trim();
    // Indexes, also as an input_number reports them ("2.0").
    if (/^\d+(\.0+)?$/.test(text) && !visible.some((t) => t.name === text)) return Number(text);
    const slug = (v: string) => v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const exact = visible.findIndex((t) => t.name === text);
    if (exact >= 0) return exact;
    return visible.findIndex((t) => t.name !== undefined && slug(t.name) === slug(text));
  }

  // A switch asked for by an automation (remote_entity / remote_event / the
  // companion's select): never into a PIN-locked tab, and not remembered.
  private _remoteSelect(target: unknown, source: string): void {
    if (this._isQuiet()) return;
    let i = this._indexOf(target);
    const step = i < 0 ? remoteStep(target) : undefined;
    if (step) i = this._stepTarget(step);
    if (!this._isContentTab(this._visibleTabs()[i])) return;
    this._collapsed = false;
    if (i !== this._selected) this._autoSwitch(i, false, source);
  }

  // The tab a remote step word leads to: next / previous wrap around (past
  // PIN-locked tabs), back is the tab open before this one, default is the
  // deck's starting tab.
  private _stepTarget(step: RemoteStep): number {
    switch (step) {
      case "next":
        return this._nextRotatable(this._selected, 1);
      case "previous":
        return this._nextRotatable(this._selected, -1);
      case "back":
        return lastTabIndex(this._visibleTabs(), this._lastTab, (t) => this._isContentTab(t));
      case "default":
        return this._ensureContentTab(this._computeDefaultIndex());
    }
  }

  // The tab that was open before the current one ("back").
  private _lastTab?: TabdeckTabConfig;

  // last_tab_button: switch to the tab open before this one. False when
  // there's none yet (or it's hidden / can't be opened now).
  selectLast(): boolean {
    if (!this._built) return false;
    const i = lastTabIndex(this._visibleTabs(), this._lastTab, (t) => this._isContentTab(t));
    if (i < 0) return false;
    this._userSelect(i);
    return true;
  }

  // The bar's swap button: the last tab's name and icon.
  private _lastTabItem(): { name?: string; icon?: string } | undefined {
    const tab = this._lastTab;
    if (lastTabIndex(this._visibleTabs(), tab, (t) => this._isContentTab(t)) < 0) return undefined;
    return { name: this._text(tab!.name), icon: this._text(tab!.icon) };
  }

  private _lastRemote?: string;

  private _syncRemoteEntity(): void {
    const ent = this._config?.remote_entity;
    if (!ent) return;
    const value = this._hass?.states?.[ent]?.state;
    if (value === undefined || value === this._lastRemote) return;
    const first = this._lastRemote === undefined;
    this._lastRemote = value;
    if (first || !this._built || ["", "unknown", "unavailable"].includes(value)) return;
    this._remoteSelect(value, "remote_entity");
  }

  // --- follow_room ---------------------------------------------------------------
  // A room-presence entity's state picks the tab: `map` first, then a tab whose
  // `area` (id or name) matches, then a tab name / slug. Only on changes, never
  // into a PIN-locked tab, and it waits while the card is in use.
  private _lastRoom?: string;

  private _syncFollowRoom(): void {
    const fr = this._config?.follow_room;
    if (!fr) return;
    const value = this._hass?.states?.[fr.entity]?.state;
    if (value === undefined || value === this._lastRoom) return;
    const first = this._lastRoom === undefined;
    this._lastRoom = value;
    if (first || !this._built || this._isQuiet()) return;
    const i = this._roomTab(value);
    const tab = this._visibleTabs()[i];
    if (i < 0 || i === this._selected || !this._isContentTab(tab)) return;
    this._autoSwitch(i, false, "follow_room");
  }

  private _roomTab(value: string): number {
    const norm = (v: unknown) => String(v ?? "").toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_|_$/g, "");
    const key = norm(value);
    if (!key || /^(unknown|unavailable|none|not_home|away|off)$/.test(key)) return -1;
    const map = this._config!.follow_room!.map;
    const hit = map && Object.keys(map).find((k) => norm(k) === key);
    if (hit !== undefined) return this._indexOf(map![hit]);
    const visible = this._visibleTabs();
    const areas: any = (this._hass as any)?.areas ?? {};
    const byArea = visible.findIndex((t) => t.area && (norm(t.area) === key || norm(areas[t.area]?.name) === key));
    if (byArea >= 0) return byArea;
    return visible.findIndex((t) => t.name !== undefined && norm(t.name) === key);
  }

  // --- takeover ---------------------------------------------------------------------
  // A doorbell press (an entity, or a tabdeck_select event with `takeover`)
  // shows a tab with a banner and countdown, then goes back to the tab that
  // was open. Opening another tab ends it there; the banner's x goes back now.
  @state() private _takeover?: { tab: TabdeckTabConfig; from?: TabdeckTabConfig; until: number; message?: string; icon?: string };
  private _takeoverStates = new Map<string, string | undefined>();
  private _takeoverTimer?: ReturnType<typeof setInterval>;
  private _takeoverMove = false;

  private _syncTakeover(): void {
    for (const t of this._config?.takeover ?? []) {
      const value = this._hass?.states?.[t.entity!]?.state;
      const seen = this._takeoverStates.has(t.entity!);
      const prev = this._takeoverStates.get(t.entity!);
      this._takeoverStates.set(t.entity!, value);
      if (seen && this._built && takeoverFires(t, prev, value)) this._startTakeover(t.tab, t.duration, t.message, t.icon);
    }
  }

  private _startTakeover(target: unknown, seconds: number, message?: string, icon?: string): void {
    if (!this._built || this._isQuiet()) return;
    const visible = this._visibleTabs();
    const i = this._indexOf(target);
    const tab = visible[i];
    if (!this._isContentTab(tab)) return;
    // A PIN-locked tab: no takeover (a running one carries on).
    if (i !== this._selected && this._autoLocked(i, "takeover")) return;
    // A second ring while one runs: show the new tab, keep the way back.
    const from = this._takeover?.from ?? visible[this._selected];
    this._takeover = { tab, from, until: Date.now() + seconds * 1000, message, icon };
    this._collapsed = false;
    this._moveTakeover(i);
    this._syncTakeoverTimer();
  }

  private _moveTakeover(i: number): void {
    if (i < 0 || i === this._selected) return;
    this._takeoverMove = true;
    try {
      this._selectIndex(i, false);
    } finally {
      this._takeoverMove = false;
    }
  }

  // goBack: to the tab open before (time up, or the banner's x).
  private _endTakeover(goBack: boolean): void {
    const t = this._takeover;
    if (!t) return;
    this._takeover = undefined;
    this._syncTakeoverTimer();
    const visible = this._visibleTabs();
    if (goBack && t.from && visible[this._selected] === t.tab) this._moveTakeover(visible.indexOf(t.from));
  }

  private _syncTakeoverTimer(): void {
    const want = !!this._takeover && this.isConnected;
    if (want && !this._takeoverTimer) {
      this._takeoverTimer = setInterval(() => {
        if (this._takeover && Date.now() >= this._takeover.until) this._endTakeover(true);
        else this.requestUpdate();
      }, 1000);
    } else if (!want && this._takeoverTimer) {
      clearInterval(this._takeoverTimer);
      this._takeoverTimer = undefined;
    }
  }

  // --- offline_banner ------------------------------------------------------------
  // A warning over the content while the websocket to HA is down (after 2 s,
  // so quick reconnects don't flash it).
  @state() private _offline = false;
  private _offlineConn?: any;
  private _offlineTimer?: ReturnType<typeof setTimeout>;

  private _syncOffline(): void {
    const conn = this._config?.offline_banner && this.isConnected ? (this._hass as any)?.connection : undefined;
    if (conn !== this._offlineConn) {
      for (const ev of ["disconnected", "reconnect-error"]) this._offlineConn?.removeEventListener?.(ev, this._onConnDown);
      this._offlineConn?.removeEventListener?.("ready", this._onConnUp);
      this._offlineConn = conn;
      for (const ev of ["disconnected", "reconnect-error"]) conn?.addEventListener?.(ev, this._onConnDown);
      conn?.addEventListener?.("ready", this._onConnUp);
    }
    if (!conn) this._onConnUp();
    else if ((this._hass as any)?.connected === false) this._onConnDown();
    else if ((this._hass as any)?.connected === true && conn.connected !== false) this._onConnUp();
  }

  private _onConnDown = (): void => {
    if (this._offline || this._offlineTimer) return;
    this._offlineTimer = setTimeout(() => {
      this._offlineTimer = undefined;
      this._offline = true;
      this.toggleAttribute("offline", true);
    }, 2000);
  };

  private _onConnUp = (): void => {
    if (this._offlineTimer) clearTimeout(this._offlineTimer);
    this._offlineTimer = undefined;
    if (this._offline) this._offline = false;
    this.toggleAttribute("offline", false);
  };

  private _renderOffline(lang: string) {
    if (!this._offline) return nothing;
    return html`<div class="deck-notice offline" role="alert">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiLanDisconnect}></path></svg>
      <span>${localize(lang, "card.offline")}</span>
    </div>`;
  }

  private _renderTakeover(lang: string) {
    const t = this._takeover;
    if (!t) return nothing;
    const left = formatCountdown(Math.max(0, (t.until - Date.now()) / 1000));
    const back = t.from && t.from !== t.tab ? this._text(t.from.name) : undefined;
    const close = localize(lang, "card.dismiss");
    return html`<div class="deck-notice takeover" role="alert">
      <ha-icon .icon=${t.icon ?? "mdi:bell-ring"}></ha-icon>
      <span>${t.message ?? this._text(t.tab.name) ?? ""}</span>
      <span class="takeover-count">${back ? localize(lang, "card.takeover_back", { tab: back, time: left }) : left}</span>
      <button class="notice-close" aria-label=${close} title=${close} @click=${() => this._endTakeover(true)}><ha-icon icon="mdi:close"></ha-icon></button>
    </div>`;
  }

  // --- keep_awake ---------------------------------------------------------------
  // The screen stays on while a keep_awake tab is open and the page is shown.
  private _wakeLock = new WakeLock();

  private _syncWakeLock = (): void => {
    const tab = this._built ? this._visibleTabs()[this._selected] : undefined;
    this._wakeLock.set(this.isConnected && !this._editing && document.visibilityState !== "hidden" && !!tab?.keep_awake);
  };

  // quiet_hours: inside the window, or while its entity is on.
  _isQuiet(): boolean {
    return isQuiet(this._config?.quiet_hours, new Date(), this._hass?.states);
  }

  private _remoteSub?: Promise<(() => void) | undefined>;

  private _syncRemoteEvent(): void {
    const conn: any = (this._hass as any)?.connection;
    if (!this._config?.remote_event || this._remoteSub || !this.isConnected || !conn?.subscribeEvents) return;
    this._remoteSub = Promise.resolve(
      conn.subscribeEvents((ev: any) => {
        const data = ev?.data ?? {};
        // Empty / null deck and device mean "any" (blueprints always send both).
        if (data.deck !== undefined && data.deck !== null && data.deck !== "" && data.deck !== this._deckId) return;
        if (data.device !== undefined && data.device !== null && data.device !== "" && data.device !== deviceId()) return;
        if (data.takeover) this._startTakeover(data.tab, takeoverSeconds(data.takeover), typeof data.message === "string" ? data.message : undefined, typeof data.icon === "string" ? data.icon : undefined);
        else this._remoteSelect(data.tab, "remote_event");
      }, "tabdeck_select"),
    ).catch((err: any) => {
      // Only admin users may subscribe to custom events.
      console.warn("tabdeck-card: remote_event needs an admin user", err?.message ?? err);
      return undefined;
    });
  }

  // --- companion (Tabdeck Companion integration) -------------------------------
  private _companionSub?: Promise<(() => void) | undefined>;
  // The integration answered "unknown command" (not installed): stay quiet
  // until the next setConfig.
  private _companionMissing = false;
  // What HA last heard: JSON of [tabs, tab]; "" forces a resend.
  private _companionSent = "";
  // Visible index of each tab name sent, to map a select back to a tab.
  private _companionIndex: number[] = [];
  private _companionConn?: any;

  private _companionIds(): { browser_id: string; deck_id: string } | undefined {
    const deck = companionSafeId(this._deckId);
    return deck ? { browser_id: companionBrowserId(this._config?.companion_id), deck_id: deck } : undefined;
  }

  private _companionState(): { tabs: string[]; tab: string | undefined } {
    const visible = this._visibleTabs();
    const tabs: string[] = [];
    this._companionIndex = [];
    visible.forEach((t, i) => {
      const name = this._text(t.name);
      if (!name || !this._isContentTab(t) || tabs.includes(name)) return;
      tabs.push(name);
      this._companionIndex.push(i);
    });
    const open = visible[this._selected];
    return { tabs, tab: open ? this._text(open.name) : undefined };
  }

  private _syncCompanion(): void {
    const conn: any = (this._hass as any)?.connection;
    const want = !!this._config?.companion && this._built && this.isConnected && !this._previewFlag && !this._companionMissing && !!conn?.subscribeMessage;
    if (!want) {
      if (this._companionSub) this._stopCompanion();
      return;
    }
    if (this._companionSub) return;
    const ids = this._companionIds();
    if (!ids) return;
    const state = this._companionState();
    this._companionSent = JSON.stringify([state.tabs, state.tab]);
    this._companionConn = conn;
    conn.addEventListener?.("ready", this._onCompanionReady);
    this._companionSub = Promise.resolve(
      conn.subscribeMessage((msg: any) => this._onCompanionCommand(msg), {
        type: "tabdeck/register",
        ...ids,
        tabs: state.tabs,
        ...(state.tab ? { tab: state.tab } : {}),
      }),
    ).catch(() => {
      // No integration (unknown_command) or it refused this deck: stay quiet.
      this._companionMissing = true;
      this._stopCompanion();
      return undefined;
    });
  }

  // HA reconnected: the subscription is replayed with the first tab list,
  // so send the current one again.
  private _onCompanionReady = (): void => {
    this._companionSent = "";
    this._sendCompanion();
  };

  private _sendCompanion(): void {
    const conn = this._companionConn;
    if (!this._companionSub || !conn?.sendMessagePromise) return;
    const state = this._companionState();
    const sig = JSON.stringify([state.tabs, state.tab]);
    if (sig === this._companionSent) return;
    this._companionSent = sig;
    const ids = this._companionIds();
    if (!ids) return;
    try {
      void Promise.resolve(conn.sendMessagePromise({ type: "tabdeck/update", ...ids, tabs: state.tabs, tab: state.tab ?? null })).catch(() => undefined);
    } catch {
      /* connection gone; the ready handler resends */
    }
  }

  private _onCompanionCommand(msg: any): void {
    const tab = companionTab(msg);
    if (tab === undefined) return;
    const state = this._companionState();
    const k = state.tabs.indexOf(tab);
    this._remoteSelect(k >= 0 ? this._companionIndex[k] : tab, "companion");
  }

  private _stopCompanion(): void {
    const sub = this._companionSub;
    this._companionSub = undefined;
    this._companionConn?.removeEventListener?.("ready", this._onCompanionReady);
    this._companionConn = undefined;
    this._companionSent = "";
    void sub?.then((unsub) => unsub?.()).catch(() => undefined);
  }

  // --- tab_ref (shared tabs) -----------------------------------------------------
  private _refRaw?: any;
  private _refToken = 0;
  private _refLoading = 0;
  private _applyingRefs = false;
  // The tab open on the placeholder deck, reopened after the swap.
  private _refKeep?: string;

  private _syncTabRefs(): void {
    if (!this._refRaw || !this._hass || this._refLoading === this._refToken) return;
    const token = (this._refLoading = this._refToken);
    const raw = this._refRaw;
    const hass = this._hass;
    const lang = hassLanguage(hass);
    void resolveTabRefs(raw, (d) => loadDashboard(hass, d), (error, vars) => localize(lang, `card.tab_ref_${error}`, vars))
      .then((resolved) => {
        if (token !== this._refToken) return;
        this._refKeep = this._built ? this.selectedTab : undefined;
        this._applyingRefs = true;
        try {
          this.setConfig(resolved);
        } finally {
          this._applyingRefs = false;
        }
      })
      .catch((err) => console.warn("tabdeck-card: tab_ref", err?.message ?? err));
  }

  // --- usage_stats ------------------------------------------------------------
  private _usageMeter = new UsageMeter();
  private _usageTimer?: ReturnType<typeof setInterval>;
  private _usageWarned = false;

  // Count while the deck is attached, built, not being edited and the page
  // is visible; a timer reports every usage_stats minutes.
  private _syncUsage = (): void => {
    const every = this._config?.usage_stats;
    const now = Date.now();
    const visible = typeof document === "undefined" || document.visibilityState !== "hidden";
    const on = !!every && this._built && this.isConnected && visible && !this._editing;
    const open = this._built ? this._visibleTabs()[this._selected] : undefined;
    this._usageMeter.switchTo(open ? this._text(open.name) : undefined, now);
    this._usageMeter.setRunning(on, now);
    const wantTimer = !!every && this.isConnected;
    if (wantTimer && !this._usageTimer) {
      this._usageTimer = setInterval(() => this._flushUsage(), every! * 60_000);
      document.addEventListener("visibilitychange", this._syncUsage);
      window.addEventListener("pagehide", this._flushUsageNow);
    } else if (!wantTimer && this._usageTimer) {
      clearInterval(this._usageTimer);
      this._usageTimer = undefined;
      document.removeEventListener("visibilitychange", this._syncUsage);
      window.removeEventListener("pagehide", this._flushUsageNow);
      this._flushUsage();
    }
  };

  private _flushUsageNow = (): void => this._flushUsage();

  // Send the minutes since the last report: through the companion
  // integration when it's connected, else as a tabdeck_usage event.
  private _flushUsage(): void {
    if (!this._config?.usage_stats) return;
    const minutes = this._usageMeter.take(Date.now());
    if (!Object.keys(minutes).length) return;
    const conn: any = (this._hass as any)?.connection;
    if (!conn?.sendMessagePromise) return;
    const ids = this._companionIds();
    const msg =
      this._companionSub && ids
        ? { type: "tabdeck/usage", ...ids, minutes }
        : { type: "fire_event", event_type: "tabdeck_usage", event_data: { deck: this._deckId, device: deviceId() ?? null, minutes } };
    try {
      void Promise.resolve(conn.sendMessagePromise(msg)).catch((err: any) => {
        if (this._usageWarned) return;
        this._usageWarned = true;
        // Only admin users may fire events.
        console.warn("tabdeck-card: usage_stats needs the companion integration or an admin user", err?.message ?? err);
      });
    } catch {
      /* not connected: these minutes are lost */
    }
  }

  private _unsubscribeRemote(): void {
    const sub = this._remoteSub;
    this._remoteSub = undefined;
    void sub?.then((unsub) => unsub?.());
  }

  // --- PIN ------------------------------------------------------------------------
  // `then`: "stay" unlocks in place (a placeholder's button), "popup" opens
  // the tab's popup after the code; otherwise the tab is opened.
  @state() private _pinFor?: { index: number; error: boolean; then?: "stay" | "popup" };
  private _pinTimer?: ReturnType<typeof setTimeout>;

  private _isLocked(tab: TabdeckTabConfig | undefined): boolean {
    if (!tab?.pin || this._editing) return false;
    return !pinUnlocked(this._deckId, tab.name ?? "", Date.now(), tab.pin_timeout);
  }

  // An automatic switch (remote control, companion, takeover, follow_room,
  // auto_select, sync...) never opens a PIN-locked tab: the PIN keeps it from
  // whoever is at the screen. With `debug`, the console says why it stayed.
  private _autoLocked(index: number, source: string): boolean {
    const tab = this._visibleTabs()[index];
    if (!this._isLocked(tab)) return false;
    if (this._config?.debug) console.info(`tabdeck-card: ${source} didn't open "${this._text(tab!.name) ?? index}": it has a PIN and isn't unlocked`);
    return true;
  }

  // A tab to start on or fall back to: `index`, or the first unlocked
  // content tab when it's PIN-locked.
  private _unlockedStart(index: number): number {
    if (!this._isLocked(this._visibleTabs()[index])) return index;
    const open = this._visibleTabs().findIndex((t) => this._isContentTab(t) && !this._isLocked(t));
    return open >= 0 ? open : index;
  }

  // A switch the person asked for: a PIN-locked tab asks for its code first.
  private _userSelect(index: number, persist = true): void {
    if (this._isLocked(this._visibleTabs()[index])) {
      this._pinFor = { index, error: false };
      return;
    }
    this._collapsed = false;
    if (index !== this._selected) this._selectIndex(index, persist);
  }

  private _onPinSubmit(e: Event): void {
    e.preventDefault();
    const pending = this._pinFor;
    if (!pending) return;
    const tab = this._visibleTabs()[pending.index];
    const input = this.renderRoot.querySelector(".pin-dialog input") as HTMLInputElement | null;
    if (!tab || (input?.value ?? "") !== tab.pin) {
      if (input) input.value = "";
      this._pinFor = { ...pending, error: true };
      return;
    }
    rememberPin(this._deckId, tab.name ?? "", Date.now());
    this._pinFor = undefined;
    if (pending.then === "popup") {
      this.openPopup(pending.index);
      return;
    }
    const original = this._allTabs().indexOf(tab);
    this.updateComplete.then(() => this._manager?.notifyVisible(original));
    if (pending.then === "stay") return;
    this._collapsed = false;
    if (pending.index !== this._selected) this._selectIndex(pending.index);
  }

  // A locked tab where its content would show (scroll_spy section, split
  // column, an unlock that ran out...): lock, name and a button for the prompt.
  // The tab's card isn't put here; it appears once the code is entered.
  private _renderLocked(tab: TabdeckTabConfig) {
    const lang = hassLanguage(this._hass);
    const index = this._visibleTabs().indexOf(tab);
    return html`<div class="locked-tab">
      <ha-icon icon="mdi:lock"></ha-icon>
      <span class="locked-name">${this._text(tab.name) ?? ""}</span>
      <button type="button" class="locked-unlock" @click=${() => (this._pinFor = { index, error: false, then: "stay" })}>
        ${localize(lang, "card.pin_enter")}
      </button>
    </div>`;
  }

  // Re-render when the next pin_timeout unlock runs out, so its content
  // goes back behind the placeholder.
  private _syncPinTimer(): void {
    if (this._pinTimer) clearTimeout(this._pinTimer);
    this._pinTimer = undefined;
    if (!this.isConnected || this._editing) return;
    const now = Date.now();
    let next = Infinity;
    for (const t of this._allTabs()) {
      if (!t.pin || !t.pin_timeout) continue;
      const at = pinExpiresAt(this._deckId, t.name ?? "", t.pin_timeout);
      if (at !== undefined && at >= now && at < next) next = at;
    }
    if (next === Infinity) return;
    this._pinTimer = setTimeout(() => {
      this._pinTimer = undefined;
      this.requestUpdate();
    }, Math.min(next - now + 50, 2 ** 31 - 1));
  }

  private _cancelPin = (): void => {
    this._pinFor = undefined;
  };

  private _renderPin() {
    const pending = this._pinFor;
    const tab = pending ? this._visibleTabs()[pending.index] : undefined;
    if (!pending || !tab) return nothing;
    const lang = hassLanguage(this._hass);
    return html`
      <div class="pin-backdrop ${this._popupTab ? "over-popup" : ""}" @click=${this._cancelPin}>
        <div
          class="pin-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tabdeck-pin-title"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <form @submit=${this._onPinSubmit}>
            <div class="pin-title" id="tabdeck-pin-title">
              ${localize(lang, "card.pin_title", { tab: this._text(tab.name) ?? "" })}
            </div>
            <input
              type="password"
              inputmode="numeric"
              autocomplete="off"
              aria-label=${localize(lang, "card.pin_label")}
              @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._cancelPin()}
            />
            ${pending.error ? html`<div class="pin-error" role="alert">${localize(lang, "card.pin_wrong")}</div>` : nothing}
            <div class="pin-actions">
              <button type="button" class="pin-cancel" @click=${this._cancelPin}>${localize(lang, "card.cancel")}</button>
              <button type="submit" class="pin-ok">${localize(lang, "card.open")}</button>
            </div>
          </form>
        </div>
      </div>
    `;
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
    if (n !== this._selected) this._autoSwitch(n, false, "remember_entity");
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
    if (!prev || this._isQuiet()) return; // seed only / quiet_hours
    for (let i = 0; i < tabs.length; i++) {
      if (now[i] && !prev[i]) {
        const visible = this._visibleTabs();
        const vIdx = visible.indexOf(tabs[i]);
        if (vIdx >= 0) {
          this._autoSwitch(vIdx, true, "auto_select");
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
    return this._allTabs().map((t, i) => {
      if (isActionTab(t) && !t.card?.type) return null;
      const auto = this._autoCard(t);
      this._autoSigs[i] = auto ? JSON.stringify(auto) : undefined;
      return auto ?? t.card;
    });
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
    // sort_by_usage gives way to an order the person set with customize or
    // drag_reorder.
    const ordered = this._config.customize || this._config.drag_reorder;
    const learned =
      this._config.sort_by_usage && !(ordered && this._layout.order.length)
        ? sortByUsage(shown, this._usageOrder)
        : shown;
    const placed = ordered ? orderTabs(learned, this._layout) : learned;
    const arranged = this._config.customize ? hideTabs(placed, this._layout) : placed;
    return this._config.alert_first ? orderAlertsFirst(arranged, (t) => this._alertOrder.has(t)) : arranged;
  }

  // --- sort_by_usage ----------------------------------------------------------
  // Live counts, and the snapshot taken at load that the order follows.
  private _usage: UsageCounts = {};
  private _usageOrder: UsageCounts = {};

  // --- customize (per-browser order & hidden tabs) ---------------------------
  @state() private _layout: UserLayout = { order: [], hidden: [] };

  // Every tab the conditions allow, in the person's order, flagged if hidden.
  private _customItems() {
    const all = this._allTabs().filter((t) => !this._isHidden(t));
    const shown = this._config?.sort_by_usage ? sortByUsage(all, this._usageOrder) : all;
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
      this._selected = this._unlockedStart(this._ensureContentTab(this._computeDefaultIndex()));
    }
    this.requestUpdate();
  }

  // drag_reorder: a tab dropped before/after another (visible indices). The
  // new order covers every named tab, so tabs hidden right now keep their
  // place; customize's hidden list is kept.
  private _onReorder(e: CustomEvent<{ from: number; to: number; after: boolean }>): void {
    const visible = this._visibleTabs();
    const moved = visible[e.detail.from]?.name;
    const target = visible[e.detail.to]?.name;
    if (!this._config?.drag_reorder || this._editing || moved === undefined || target === undefined) return;
    const all = this._allTabs();
    const base = this._config.sort_by_usage && !this._layout.order.length ? sortByUsage(all, this._usageOrder) : all;
    const names = orderTabs(base, this._layout)
      .map((t) => t.name)
      .filter((n): n is string => n !== undefined);
    const prevName = visible[this._selected]?.name;
    this._layout = { order: moveName(names, moved, target, e.detail.after), hidden: this._layout.hidden };
    saveLayout(this._cardKey, this._layout);
    this._restoreSelection(prevName);
    this.requestUpdate();
  }

  private _isHidden(t: TabdeckTabConfig): boolean {
    return !isTabVisible(t.visibility, this._hass, this._templateResolver);
  }

  private _collectTemplates(): string[] {
    if (!this._config) return [];
    const out: string[] = [];
    if (this._config.auto_tabs?.template) out.push(this._config.auto_tabs.template);
    const summary = this._config.summary_chip;
    if (summary !== true && isTemplate(summary?.text)) out.push(summary!.text!);
    // Walk a condition tree, gathering template value_templates (including those
    // nested inside and/or/not groups) so they all get subscribed.
    const walk = (conds: any[] | undefined) => {
      for (const c of conds ?? []) {
        if (c?.condition === "template" && c.value_template) out.push(c.value_template);
        if (Array.isArray(c?.conditions)) walk(c.conditions);
      }
    };
    for (const t of this._allTabs()) {
      if (isTemplate(t.badge)) out.push(t.badge);
      for (const b of t.badges ?? []) if (isTemplate(b.badge)) out.push(b.badge as string);
      if (isTemplate(t.ring)) out.push(t.ring);
      for (const f of TEMPLATED_FIELDS) if (isTemplate(t[f])) out.push(t[f]!);
      const empty = normalizeEmpty(t.empty_message);
      for (const m of [empty?.title, empty?.text]) if (isTemplate(m)) out.push(m!);
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
        this._refreshAlertOrder();
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
    let items = auto.source && CLIENT_SOURCES.includes(auto.source) ? this._clientItems : this._templates?.result(auto.template);
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
    const cfg = this._config!;
    this._genTabs = raw.map((t) => normalizeTab(expandTab(t, cfg.tab_templates, cfg.tab_defaults)));
    this._baselineSeen();
    // Restore selection synchronously, before awaiting the (internally sync)
    // rebuild, so the panel never renders the new tab set against a stale index.
    this._restoreSelection(prevName);
    await this._manager.build(this._cardConfigs(), { lazy: cfg.lazy });
    if (this._hass) this._manager.setHass(this._hass);
    this._syncTemplates();
    this.requestUpdate();
  }

  // --- client-side auto_tabs sources (repairs, notifications) ----------------
  private _clientItems?: any[];
  private _clientUnsub?: () => void;
  private _clientTimer?: ReturnType<typeof setInterval>;
  private _clientSource?: string;
  private _notifications: Record<string, NotificationEntry> = {};

  private _syncClientSource(): void {
    const source = this._config?.auto_tabs?.source;
    const want = source && CLIENT_SOURCES.includes(source) && this.isConnected && this._hass?.connection ? source : undefined;
    if (want === this._clientSource) return;
    this._stopClientSource();
    this._clientSource = want;
    if (want === "notifications") {
      this._notifications = {};
      const p = this._hass!.connection.subscribeMessage((msg: any) => this._onNotifications(msg), {
        type: "persistent_notification/subscribe",
      });
      let unsub: (() => unknown) | undefined;
      let dead = false;
      p.then((u) => {
        if (dead) void u();
        else unsub = u;
      }).catch(() => this._setClientItems([]));
      this._clientUnsub = () => {
        dead = true;
        void unsub?.();
      };
    } else if (want === "repairs") {
      void this._fetchRepairs();
      this._clientTimer = setInterval(() => void this._fetchRepairs(), 60_000);
    }
  }

  private _stopClientSource(): void {
    this._clientUnsub?.();
    this._clientUnsub = undefined;
    if (this._clientTimer) clearInterval(this._clientTimer);
    this._clientTimer = undefined;
    this._clientSource = undefined;
  }

  private _onNotifications(msg: { type: string; notifications: Record<string, NotificationEntry> }): void {
    if (msg.type === "current") this._notifications = { ...msg.notifications };
    else if (msg.type === "removed") {
      const next = { ...this._notifications };
      for (const id of Object.keys(msg.notifications ?? {})) delete next[id];
      this._notifications = next;
    } else this._notifications = { ...this._notifications, ...msg.notifications };
    const lang = hassLanguage(this._hass);
    this._setClientItems(
      notificationItems(this._notifications, {
        untitled: localize(lang, "card.notification"),
        dismiss: localize(lang, "card.dismiss"),
      }),
    );
  }

  private async _fetchRepairs(): Promise<void> {
    const hass = this._hass as any;
    if (!hass?.callWS) return;
    let issues: RepairIssue[] = [];
    try {
      issues = ((await hass.callWS({ type: "repairs/list_issues" })) as any)?.issues ?? [];
    } catch {
      // Not an admin (Repairs is admin-only): no tabs.
    }
    // Issue titles live in each integration's "issues" translations.
    const domains = [...new Set(issues.map((i) => i.domain))];
    await Promise.all(domains.map((d) => hass.loadBackendTranslation?.("issues", d)?.catch?.(() => undefined)));
    const latest = this._hass as any;
    const text = (i: RepairIssue, part: "title" | "description") => {
      if (!i.translation_key || typeof latest?.localize !== "function") return undefined;
      const s = latest.localize(`component.${i.domain}.issues.${i.translation_key}.${part}`, i.translation_placeholders ?? {});
      return typeof s === "string" && s ? s : undefined;
    };
    this._setClientItems(repairItems(issues, text, { open: localize(hassLanguage(this._hass), "card.open_repairs") }));
  }

  private _setClientItems(items: any[]): void {
    this._clientItems = items;
    void this._syncGeneratedTabs();
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
      this._selected = this._unlockedStart(Math.min(this._computeDefaultIndex(), Math.max(0, visible.length - 1)));
    }
  }

  getCardSize(): number {
    if (this._config?.popup === "hidden" && !this._editing) return 0;
    if (this._collapsed) return 1;
    // A per-tab card_size hint wins, so masonry sizing doesn't jump around as
    // tabs change (and works even before the nested card reports a size).
    const tab = this._visibleTabs()[this._selected];
    if (tab && typeof tab.card_size === "number") return tab.card_size;
    const card = this._manager?.ensure(this._activeOriginalIndex());
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
        this._defaultReason = `default_if of ${visible[i].name ?? i}`;
        return i;
      }
    }
    const cfg = this._config!;
    const byDevice = pickByDevice(cfg.default_by_device, deviceId());
    const target = byDevice ?? pickByTime(cfg.default_by_time, new Date());
    if (target !== undefined) {
      const i = this._indexOf(target);
      if (this._isContentTab(visible[i])) {
        this._defaultReason = byDevice !== undefined ? `default_by_device (${deviceId()})` : "default_by_time";
        return i;
      }
    }
    this._defaultReason = "default_tab";
    const orig = resolveDefaultIndex(cfg);
    const vIdx = visible.indexOf(this._allTabs()[orig] ?? cfg.tabs[orig]);
    return vIdx >= 0 ? vIdx : 0;
  }

  private _activeOriginalIndex(): number {
    const visible = this._visibleTabs();
    const target = visible[this._selected];
    return this._allTabs().indexOf(target);
  }

  private _onSelect(e: CustomEvent<{ index: number; child?: string }>): void {
    const tab = this._visibleTabs()[e.detail.index];
    // Click to edit: in edit mode or the card editor's preview, ask the
    // visual editor to open this tab's settings (it checks the names).
    if ((this._editModeFlag || this._previewFlag) && this._config && tab) {
      const index = this._config.tabs.indexOf(tab);
      if (index >= 0) {
        this.dispatchEvent(
          new CustomEvent("tabdeck-edit-tab", {
            detail: { index, names: this._config.tabs.map((t) => t.name ?? "") },
            bubbles: true,
            composed: true,
          }),
        );
      }
    }
    if (e.detail.child !== undefined) {
      // A child picked from a grouped tab's menu: open the group, then the child.
      if (this._isLocked(tab)) {
        this._pinFor = { index: e.detail.index, error: false };
        return;
      }
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
    }
    this._userSelect(e.detail.index);
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
      panel?.scrollIntoView?.({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
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
  private _runAction(action: any, key: "tap" | "hold" | "double_tap"): void {
    if (!action || !this._hass) return;
    // custom-card-helpers only knows the legacy `call-service`; translate the
    // modern `perform-action` (what HA's own action picker writes). Since 2.2
    // it reads `data` (not `service_data`) and `target`, so fill both keys
    // and old configs that use `service_data` keep working.
    if (action.action === "perform-action" && typeof action.perform_action === "string") {
      action = { ...action, action: "call-service", service: action.perform_action };
    }
    if (action.action === "call-service") {
      const data = action.data ?? action.service_data;
      action = { ...action, data, service_data: data };
    }
    const cfg = { entity: action?.entity, [`${key}_action`]: action };
    handleAction(this, this._hass as any, cfg as any, key as any);
  }

  // Tab long-press (kind="hold") or badge click (kind="badge") → fire the tab's
  // corresponding action via HA's handler. handleAction reads `entity` from the
  // top-level config (for more-info/toggle), so surface the action's entity.
  private _onTabAction(e: CustomEvent<{ index: number; kind: "hold" | "badge" | "double_tap" }>): void {
    const tab = this._visibleTabs()[e.detail.index];
    if (!tab || !this._hass) return;
    // A long-press on an alerting tab silences its pulse for alert_snooze minutes.
    if (e.detail.kind === "hold" && this._config?.alert_snooze && this._isAlerting(tab)) {
      snooze(this._deckId, this._snoozeKey(tab), Date.now(), this._config.alert_snooze);
      this._refreshAlertOrder();
      this.requestUpdate();
      return;
    }
    if (e.detail.kind === "hold" && !tab.hold_action && this._canCompare(tab)) {
      if (tab === this._compareTab) this.closeCompare();
      else this.compareTab(e.detail.index);
      return;
    }
    if (e.detail.kind === "hold" && !tab.hold_action && this._canPreview(tab)) {
      this._startPreview(e.detail.index);
      return;
    }
    if (e.detail.kind === "hold" && !tab.hold_action && this._holdAsksPin(tab)) {
      this._pinFor = { index: e.detail.index, error: false, then: "stay" };
      return;
    }
    if (e.detail.kind === "double_tap") {
      this._runAction(tab.double_tap_action, "double_tap");
      return;
    }
    const action = e.detail.kind === "badge" ? tab.badge_action : tab.hold_action;
    this._runAction(action, e.detail.kind === "badge" ? "tap" : "hold");
  }

  // --- changed_dot ------------------------------------------------------------
  // When this browser last showed each tab (by name, else #index); ms.
  private _seen: Record<string, number> = {};
  private _seenSaved = 0;
  private _watchCache = new WeakMap<TabdeckTabConfig, string[]>();

  private _seenKey(tab: TabdeckTabConfig): string {
    return tab.name ?? `#${this._allTabs().indexOf(tab)}`;
  }

  private _watchList(tab: TabdeckTabConfig): string[] {
    let list = this._watchCache.get(tab);
    if (!list) {
      list = tab.watch ?? cardEntities(this._autoCard(tab) ?? tab.card);
      this._watchCache.set(tab, list);
    }
    return list;
  }

  // Tabs this browser has no record of start counting from now, and that's
  // stored, so changes made while the page is closed still show next time.
  private _baselineSeen(): void {
    if (!this._config?.changed_dot) return;
    const now = Date.now();
    for (const t of this._allTabs()) this._seen[this._seenKey(t)] ??= now;
  }

  private _isChanged(tab: TabdeckTabConfig): boolean {
    if (!this._config?.changed_dot || this._editing) return false;
    if (tab === this._visibleTabs()[this._selected]) return false;
    const since = this._seen[this._seenKey(tab)] ?? this._builtAt;
    return changedSince(this._watchList(tab), this._hass?.states, since);
  }

  // The tab on screen counts as seen; written to storage at most every 30 s
  // (and on every switch).
  private _markSeen(tab: TabdeckTabConfig | undefined, now: number, save: boolean): void {
    if (!this._config?.changed_dot || !tab || this._editing) return;
    this._seen[this._seenKey(tab)] = now;
    if (save || now - this._seenSaved > 30_000) {
      this._seenSaved = now;
      saveSeen(this._cardKey, this._seen);
    }
  }

  // --- pip (picture-in-picture) ------------------------------------------------
  // The tab floating in the corner (a pip tab that was switched away from).
  @state() private _pipTab?: TabdeckTabConfig;

  private _pipShown(): TabdeckTabConfig | undefined {
    const tab = this._pipTab;
    const cfg = this._config;
    if (!tab || !cfg || this._editing || cfg.scroll_spy || this._isSplit || this._fullscreen) return undefined;
    const visible = this._visibleTabs();
    // Gone (hidden by conditions) or open again: no window.
    // Locked again (pin_timeout ran out): no window.
    if (!visible.includes(tab) || visible[this._selected] === tab || this._isLocked(tab)) return undefined;
    return tab;
  }

  private _closePip(e: Event): void {
    e.stopPropagation();
    this._pipTab = undefined;
  }

  private _openPip(): void {
    const tab = this._pipTab;
    if (!tab) return;
    const i = this._visibleTabs().indexOf(tab);
    if (i >= 0) this._userSelect(i);
  }

  // --- share_button ---------------------------------------------------------------
  // The open share panel: the link, whether it was copied, and its QR code.
  @state() private _share?: { url: string; copied: boolean; qrPath?: string; qrSize?: number };

  private _onShare = async (): Promise<void> => {
    const mode = this._config?.share_button;
    if (!mode) return;
    if (this._share) {
      this._share = undefined;
      return;
    }
    const tab = this._visibleTabs()[this._selected];
    const url = shareUrl(location, tab?.name, this._selected);
    const copied = await copyText(url);
    let qr: { qrPath?: string; qrSize?: number } = {};
    if (mode === "qr") {
      try {
        const code = encodeQr(url, "M");
        qr = { qrPath: qrSvgPath(code, 4), qrSize: code.size + 8 };
      } catch {
        /* too long for a QR code: the link alone */
      }
    }
    this._share = { url, copied, ...qr };
  };

  // --- compare ------------------------------------------------------------------
  // A second tab shown beside the open one (long-press it, or compareTab()).
  // Kept by tab, so it survives reorders; it stays while the main tab changes.
  @state() private _compareTab?: TabdeckTabConfig;

  private _canCompare(tab: TabdeckTabConfig): boolean {
    const cfg = this._config;
    return !!cfg?.compare && !cfg.scroll_spy && !cfg.wizard && this._isContentTab(tab) && !this._isLocked(tab);
  }

  // Visible index of the compared tab, or -1 when none is shown.
  private _compareShown(): number {
    if (!this._compareTab || this._isSplit || this._overview || this._collapsed) return -1;
    return compareIndex(this._visibleTabs(), this._compareTab, this._selected, (t) => this._canCompare(t));
  }

  // Show a visible tab (by index, name or slug) beside the open one.
  compareTab(target: number | string): boolean {
    if (!this._config?.compare || !this._built) return false;
    const visible = this._visibleTabs();
    const i = typeof target === "number" ? target : this._indexOf(target);
    const tab = visible[i];
    if (!tab || i === this._selected || !this._canCompare(tab)) return false;
    this._manager?.ensure(this._allTabs().indexOf(tab));
    this._compareTab = tab;
    this.updateComplete.then(() => this._manager?.notifyVisible(this._allTabs().indexOf(tab)));
    return true;
  }

  closeCompare(): void {
    this._compareTab = undefined;
  }

  // --- hold_peek ----------------------------------------------------------------
  // Visible index of the tab being previewed while its tab is held (-1: none).
  @state() private _previewIndex = -1;

  // Content tabs can be previewed; a locked tab can't (that would show it
  // without the PIN).
  private _canPreview(tab: TabdeckTabConfig): boolean {
    return !!this._config?.hold_peek && !this._config.scroll_spy && this._isContentTab(tab) && !this._isLocked(tab);
  }

  // compare / hold_peek on a locked tab: holding it asks for the code
  // (unlocks in place) and shows nothing.
  private _holdAsksPin(tab: TabdeckTabConfig): boolean {
    const cfg = this._config;
    return !!cfg && (!!cfg.compare || !!cfg.hold_peek) && !cfg.scroll_spy && !cfg.wizard && this._isContentTab(tab) && this._isLocked(tab);
  }

  private _startPreview(index: number): void {
    if (index === this._selected || this._collapsed) return;
    const tab = this._visibleTabs()[index];
    if (!tab) return;
    this._manager?.ensure(this._allTabs().indexOf(tab));
    this._previewIndex = index;
    window.addEventListener("pointerup", this._endPreview, true);
    window.addEventListener("pointercancel", this._endPreview, true);
    window.addEventListener("blur", this._endPreview);
  }

  private _endPreview = (): void => {
    window.removeEventListener("pointerup", this._endPreview, true);
    window.removeEventListener("pointercancel", this._endPreview, true);
    window.removeEventListener("blur", this._endPreview);
    if (this._previewIndex !== -1) this._previewIndex = -1;
  };

  // --- public API -------------------------------------------------------------
  // Select a visible tab by index, exact name, or slug ("living-room").
  // Returns false when no such tab exists (or it can't be opened).
  selectTab(target: number | string): boolean {
    const visible = this._visibleTabs();
    const i = typeof target === "number" ? target : this._indexOf(target);
    if (!this._isContentTab(visible[i])) return false;
    if (this._isLocked(visible[i])) {
      this._pinFor = { index: i, error: false };
      return false;
    }
    this._collapsed = false;
    if (i !== this._selected) this._selectIndex(i);
    return true;
  }

  // Back to the tab the deck starts on (default_if / default_tab). A
  // PIN-locked one asks for its code first, like selectTab().
  selectDefault(): boolean {
    if (!this._built) return false;
    const i = this._ensureContentTab(this._computeDefaultIndex());
    if (i !== this._selected && this._isLocked(this._visibleTabs()[i])) {
      this._pinFor = { index: i, error: false };
      return false;
    }
    this._collapsed = false;
    if (i !== this._selected) this._selectIndex(i);
    return true;
  }

  // The open tab here and in every nested deck below it (grouped tabs), as
  // { name, deck } from the outside in.
  breadcrumbPath(): { name: string; deck: TabdeckCard }[] {
    const tab = this._visibleTabs()[this._selected];
    if (!this._built || !tab) return [];
    const here = { name: this._text(tab.name) ?? "", deck: this as TabdeckCard };
    const nested = this._manager?.get(this._allTabs().indexOf(tab));
    const below = typeof nested?.breadcrumbPath === "function" ? nested.breadcrumbPath() : [];
    return [here, ...below];
  }

  private _renderBreadcrumbs() {
    const cfg = this._config!;
    const path = this.breadcrumbPath();
    const crumbs = [...(cfg.breadcrumbs!.root ? [{ name: cfg.breadcrumbs!.root, deck: undefined as TabdeckCard | undefined }] : []), ...path];
    if (crumbs.length < 2) return nothing;
    // A crumb opens its level: the deck below it goes back to its first tab
    // (the root crumb: this deck does).
    const go = (k: number) => {
      const below = cfg.breadcrumbs!.root ? (k === 0 ? this : path[k]?.deck) : path[k + 1]?.deck;
      below?.selectDefault();
    };
    return html`<nav class="breadcrumbs" aria-label=${localize(hassLanguage(this._hass), "card.breadcrumbs")}>
      <ol>
        ${crumbs.map((c, k) =>
          k === crumbs.length - 1
            ? html`<li><span aria-current="page">${c.name}</span></li>`
            : html`<li><button @click=${() => go(k)}>${c.name}</button><span class="crumb-sep" aria-hidden="true">${this._rtl ? "‹" : "›"}</span></li>`,
        )}
      </ol>
    </nav>`;
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
    if (this._config?.breadcrumbs) this.requestUpdate();
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
    this._share = undefined;
    // Opening the compared tab ends the comparison.
    if (this._compareTab && visible[index] === this._compareTab) this._compareTab = undefined;
    const prev = visible[this._selected];
    const changed = index !== this._selected;
    if (changed && this._config?.debug) this._switchAt = performance.now();
    // Someone (or something) opened another tab: the takeover ends there.
    if (changed && this._takeover && !this._takeoverMove) this._endTakeover(false);
    // unload_after counts from when a tab was last on screen.
    const now = Date.now();
    if (prev) this._seenAt.set(this._allTabs().indexOf(prev), now);
    this._markSeen(prev, now, false);
    this._markSeen(visible[index], now, true);
    if (visible[index]) {
      const original = this._allTabs().indexOf(visible[index]);
      this._seenAt.set(original, now);
      if (this._manager && !this._manager.isLoaded(original)) this._refreshedAt.set(original, now);
      this._manager?.ensure(original);
    }
    if (changed && prev && this._config?.scroll_memory && !this._config.scroll_spy) this._rememberScroll(prev, visible[index]);
    this._selected = index;
    if (changed && prev) this._lastTab = prev;
    if (changed && prev?.pip) this._pipTab = prev;
    else if (changed && visible[index] === this._pipTab) this._pipTab = undefined;
    if (changed) {
      this._runAction(prev?.leave_action, "tap");
      this._runAction(visible[index]?.enter_action, "tap");
    }
    const tab = visible[this._selected];
    if (changed && this._config?.fire_event) this._fireTabEvent(index, tab?.name, prev?.name);
    if (changed && this._config?.sync_group && !this._fromSync && !this._editing && tab?.name !== undefined) {
      publishSync(this._config.sync_group, tab.name, this);
    }
    // Companion-app haptics, for switches the person makes (automatic ones
    // pass persist = false).
    if (changed && persist && this._config?.haptic && !this._editing) {
      window.dispatchEvent(new CustomEvent("haptic", { detail: this._config.haptic }));
    }
    // click_sound: only right after a tap or key (browsers allow sound then),
    // never for automatic switches or in quiet_hours.
    const ua = (navigator as any).userActivation;
    if (changed && persist && this._config?.click_sound && !this._editing && (!ua || ua.isActive) && !this._isQuiet()) {
      playClick(this._config.click_sound);
    }
    if (changed) {
      this.dispatchEvent(
        new CustomEvent("tabdeck-tab-changed", {
          detail: { index, name: tab?.name, deck: this },
          bubbles: true,
          composed: true,
        }),
      );
      tabdeckRegistry(CARD_VERSION)._changed(this._registered, index, tab?.name, prev?.name);
    }
    if (changed && persist && !this._editing && this._config?.sort_by_usage && tab?.name !== undefined) {
      this._usage = recordUse(this._usage, tab.name);
      saveUsage(this._cardKey, this._usage);
    }
    if (changed) this._learnedNotice = undefined;
    if (changed && persist && !this._editing && this._config?.learned_default && tab?.name !== undefined) {
      this._hourly = recordHourly(this._hourly, tab.name, new Date().getHours());
      saveHourly(this._cardKey, this._hourly);
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
    if (changed) this._schedulePreload();
    if (changed) this._scheduleErrorScan();
    if (changed) {
      this._syncWakeLock();
      this._syncUsage();
    }
    if (this._config?.scroll_spy && !this._spyDriven) this._scrollToSection(index);
    this.updateComplete.then(() =>
      this._manager?.notifyVisible(this._activeOriginalIndex()),
    );
  }

  // --- learned_default ----------------------------------------------------------
  // Picks per hour of the day (this browser), and the tab it opened on load.
  private _hourly: HourlyUsage = {};
  @state() private _learnedNotice?: string;

  // Weakest start rule: only when nothing is remembered or linked and no
  // default_if / default_by_device / default_by_time decided the tab.
  private _applyLearned(): boolean {
    const cfg = this._config!;
    const ld = cfg.learned_default;
    if (!ld || this._defaultReason !== "default_tab") return false;
    const visible = this._visibleTabs();
    const names = visible.map((t) => t.name ?? "");
    const remembered = rememberedIndex({
      mode: cfg.remember,
      cardKey: this._cardKey,
      tabCount: visible.length,
      hash: typeof location !== "undefined" ? location.hash : "",
      tabNames: names,
      entityValue: cfg.remember_entity ? this._hass?.states?.[cfg.remember_entity]?.state : undefined,
    });
    if (remembered !== null) return false;
    const name = learnedTab(this._hourly, new Date().getHours(), ld.min_uses);
    const i = name === undefined ? -1 : names.indexOf(name);
    if (i < 0 || !this._isContentTab(visible[i]) || this._isLocked(visible[i])) return false;
    this._selected = i;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(`tabdeck-learned-notice:${this._cardKey}`) === "off";
    } catch {
      /* storage unavailable */
    }
    if (ld.notice && !dismissed) this._learnedNotice = name;
    return true;
  }

  private _dismissLearned = (): void => {
    this._learnedNotice = undefined;
    try {
      localStorage.setItem(`tabdeck-learned-notice:${this._cardKey}`, "off");
    } catch {
      /* storage unavailable */
    }
  };

  private _renderLearned(lang: string) {
    const name = this._learnedNotice;
    if (!name) return nothing;
    const close = localize(lang, "card.dismiss");
    return html`<div class="deck-notice learned" role="status">
      <ha-icon icon="mdi:brain"></ha-icon>
      <span>${localize(lang, "card.learned", { tab: this._text(name) ?? name })}</span>
      <button class="notice-close" aria-label=${close} title=${close} @click=${this._dismissLearned}><ha-icon icon="mdi:close"></ha-icon></button>
    </div>`;
  }

  // --- preload (with lazy) ----------------------------------------------------
  private _preloadHandle?: number;

  private _schedulePreload(): void {
    const cfg = this._config;
    if (!cfg?.lazy || !cfg.preload || this._preloadHandle !== undefined) return;
    const run = () => {
      this._preloadHandle = undefined;
      if (this._preloadStep()) this._schedulePreload();
    };
    const w = window as any;
    this._preloadHandle =
      typeof w.requestIdleCallback === "function" ? w.requestIdleCallback(run, { timeout: 2000 }) : (setTimeout(run, 200) as any);
  }

  // Build one card that isn't built yet; true when there's more to do.
  _preloadStep(): boolean {
    const cfg = this._config;
    if (!cfg || !this._manager || !this.isConnected) return false;
    const visible = this._visibleTabs();
    const candidates =
      cfg.preload === "all"
        ? visible.map((_, i) => i)
        : [this._stepContent(this._selected, 1, true), this._stepContent(this._selected, -1, true)];
    const configs = this._cardConfigs();
    const todo = candidates
      .filter((i) => this._isContentTab(visible[i]) && !this._isLocked(visible[i]))
      .map((i) => this._allTabs().indexOf(visible[i]))
      .filter((o, k, arr) => o >= 0 && arr.indexOf(o) === k && !this._manager!.isLoaded(o) && !!configs[o]);
    if (!todo.length) return false;
    this._manager.ensure(todo[0]);
    this.requestUpdate();
    return todo.length > 1;
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
      // The compared tab is on screen too.
      if (this._compareShown() >= 0 && this._allTabs()[i] === this._compareTab) return;
      const seen = this._seenAt.get(i) ?? this._builtAt;
      if (now - seen >= minutes * 60_000) {
        this._manager!.unload(i);
        freed = true;
      }
    });
    if (freed) this.requestUpdate();
  }

  // --- scroll_memory -------------------------------------------------------------
  private _scrollKey(tab: TabdeckTabConfig): string {
    return tab.name ?? String(this._allTabs().indexOf(tab));
  }

  // Keep where the page (and a scrolling content box) was for the tab being
  // left, and go back to where the next tab was left, once it has drawn.
  private _rememberScroll(prev: TabdeckTabConfig, next: TabdeckTabConfig | undefined): void {
    const content = () => this.renderRoot?.querySelector?.(".content") as HTMLElement | null;
    saveScroll(this._cardKey, this._scrollKey(prev), { page: window.scrollY, inner: content()?.scrollTop ?? 0 });
    const saved = next ? savedScroll(this._cardKey, this._scrollKey(next)) : undefined;
    if (!saved) return;
    this.updateComplete.then(() =>
      requestAnimationFrame(() => {
        scrollWithRetry(
          () => window.scrollY,
          (y) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior }),
          saved.page,
        );
        const box = content();
        if (box) box.scrollTop = saved.inner;
      }),
    );
  }

  // --- auto_refresh ------------------------------------------------------------
  // When each tab's card was last (re)built, by original index.
  private _refreshedAt = new Map<number, number>();
  private _refreshTimer?: ReturnType<typeof setInterval>;

  private _syncRefreshTimer(): void {
    const want = !!this._config && this._allTabs().some((t) => t.auto_refresh) && this.isConnected;
    if (want && !this._refreshTimer) {
      this._refreshTimer = setInterval(() => this._refreshTick(Date.now()), 10_000);
    } else if (!want && this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this._refreshTimer = undefined;
    }
  }

  // A due tab on screen is rebuilt now (not while someone is using it); one
  // off screen is freed, so it's built fresh when next opened.
  _refreshTick(now: number): void {
    if (!this._manager || !this._built || this._editing) return;
    const cfg = this._config!;
    const active = this._activeOriginalIndex();
    const compared = this._compareShown() >= 0 && this._compareTab ? this._allTabs().indexOf(this._compareTab) : -1;
    let changed = false;
    this._allTabs().forEach((t, i) => {
      if (!t.auto_refresh || !this._manager!.isLoaded(i)) return;
      if (now - (this._refreshedAt.get(i) ?? this._builtAt) < t.auto_refresh * 60_000) return;
      if (i === active || i === compared || cfg.scroll_spy || this._isSplit) {
        if (this._isBusy()) return;
        this._manager!.refresh(i);
      } else {
        this._manager!.unload(i);
      }
      this._refreshedAt.set(i, now);
      changed = true;
    });
    if (changed) this.requestUpdate();
  }

  // --- fullscreen --------------------------------------------------------------
  private _toggleFullscreen = (): void => {
    this._fullscreen = !this._fullscreen;
    this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
  };

  private _onFullscreenKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this._share) {
      this._share = undefined;
      return;
    }
    if (e.key === "Escape" && this._compareShown() >= 0) {
      this.closeCompare();
      return;
    }
    if (e.key === "Escape" && this._popupTab) {
      this.closePopup();
      return;
    }
    if (e.key === "Escape" && this._overview) {
      this.closeOverview();
      return;
    }
    if (e.key === "Escape" && this._fullscreen) {
      this._fullscreen = false;
      this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
    }
  };

  // --- overview -----------------------------------------------------------------
  // Every content tab as a live thumbnail: the tabs' own cards, drawn at three
  // times the tile width and scaled down, so they keep updating.
  @state() private _overview = false;
  private _pinchStart?: number;

  openOverview(): boolean {
    if (!this._config?.overview || !this._built) return false;
    this._overview = true;
    this.updateComplete.then(() =>
      (this.renderRoot.querySelector(".ov-tile.current, .ov-tile") as HTMLElement | null)?.focus?.(),
    );
    return true;
  }

  closeOverview(): void {
    if (!this._overview) return;
    this._overview = false;
    this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
  }

  private _toggleOverview = (): void => {
    if (this._overview) this.closeOverview();
    else this.openOverview();
  };

  private _pickOverview(index: number): void {
    this._overview = false;
    this._userSelect(index);
    this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
  }

  private _renderOverview(visible: TabdeckTabConfig[]) {
    const lang = hassLanguage(this._hass);
    const tiles = overviewTiles(visible, (t) => this._isLocked(t));
    return html`
      <div class="overview" role="dialog" aria-label=${localize(lang, "card.all_tabs")}>
        <div class="ov-head">
          <span class="ov-title">${localize(lang, "card.all_tabs")}</span>
          <button class="ov-close" aria-label=${localize(lang, "card.close")} title=${localize(lang, "card.close")} @click=${() => this.closeOverview()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="ov-grid">
          ${tiles.map(({ index, tab, locked }) => {
            const icon = this._text(tab.icon);
            const name = this._text(tab.name) ?? localize(lang, "card.tab_n", { n: index + 1 });
            return html`<button
              class="ov-tile ${index === this._selected ? "current" : ""}"
              aria-current=${index === this._selected ? "true" : "false"}
              aria-label=${name}
              @click=${() => this._pickOverview(index)}
            >
              <div class="ov-frame">
                ${locked
                  ? html`<ha-icon class="ov-lock" icon="mdi:lock"></ha-icon>`
                  : html`<div class="ov-live" inert>${this._manager?.ensure(this._allTabs().indexOf(tab))}</div>`}
              </div>
              <span class="ov-label">${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}<span>${name}</span></span>
            </button>`;
          })}
        </div>
      </div>
    `;
  }

  // --- popup (a tab in a dialog, opened from another card) -----------------------
  @state() private _popupTab?: TabdeckTabConfig;

  // A fire-dom-event action somewhere on the page. The first deck that has
  // the tab (and matches `deck`, when given) opens it.
  private _onPopupEvent = (e: Event): void => {
    if (!this._config?.popup || !this._built || (e as any).__tabdeckPopup) return;
    const req = popupRequest((e as CustomEvent).detail);
    if (!req || (req.deck !== undefined && req.deck !== this._deckId)) return;
    if (this.openPopup(req.tab) || this._pinFor?.then === "popup") (e as any).__tabdeckPopup = true;
  };

  // Open a visible content tab (by name, slug or index) in a dialog. A
  // PIN-locked tab asks for its code first (and returns false meanwhile).
  openPopup(target: number | string): boolean {
    if (!this._built) return false;
    const visible = this._visibleTabs();
    const i = this._indexOf(target);
    const tab = visible[i];
    if (!this._isContentTab(tab)) return false;
    if (this._isLocked(tab)) {
      this._pinFor = { index: i, error: false, then: "popup" };
      return false;
    }
    this._popupTab = tab;
    const original = this._allTabs().indexOf(tab!);
    this._manager?.ensure(original);
    this.updateComplete.then(() => {
      this._manager?.notifyVisible(original);
      (this.renderRoot.querySelector(".popup-close") as HTMLElement | null)?.focus();
    });
    return true;
  }

  closePopup(): void {
    if (!this._popupTab) return;
    this._popupTab = undefined;
    this.updateComplete.then(() => this._manager?.notifyVisible(this._activeOriginalIndex()));
  }

  private _renderPopup() {
    const tab = this._popupTab;
    if (!tab) return nothing;
    const lang = hassLanguage(this._hass);
    const icon = this._text(tab.icon);
    const name = this._text(tab.name) ?? "";
    return html`<div class="popup-backdrop" @click=${(e: Event) => e.target === e.currentTarget && this.closePopup()}>
      <div class="popup-dialog" role="dialog" aria-modal="true" aria-label=${name}>
        <div class="popup-head">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          <span class="popup-title">${name}</span>
          <button class="popup-close" aria-label=${localize(lang, "card.close")} title=${localize(lang, "card.close")} @click=${() => this.closePopup()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="popup-body">${this._isLocked(tab) ? this._renderLocked(tab) : this._manager?.ensure(this._allTabs().indexOf(tab))}</div>
      </div>
    </div>`;
  }

  // --- wizard (step-by-step guide) ------------------------------------------------
  private _finishWizard(first: number): void {
    this._runAction(this._config?.wizard?.finish_action, "tap");
    if (first >= 0) this._userSelect(first);
  }

  private _renderWizard(visible: TabdeckTabConfig[], panels: unknown) {
    const lang = hassLanguage(this._hass);
    const steps = visible.map((_, i) => i).filter((i) => this._isContentTab(visible[i]));
    const w = wizardStep(steps, this._selected);
    const tab = visible[this._selected];
    const subtitle = tab ? this._text(tab.subtitle) : undefined;
    return html`
      <div class="wizard-head">
        <div class="wizard-row">
          <span class="wizard-title">${tab ? this._text(tab.name) ?? "" : ""}</span>
          <span class="wizard-count">${localize(lang, "card.wizard_step", { n: w.step, total: w.total })}</span>
        </div>
        ${subtitle ? html`<div class="wizard-subtitle">${subtitle}</div>` : nothing}
        <div
          class="wizard-progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax=${w.total}
          aria-valuenow=${w.step}
          aria-label=${localize(lang, "card.wizard_step", { n: w.step, total: w.total })}
        >
          <div style="width:${w.percent}%"></div>
        </div>
      </div>
      ${panels}
      <div class="wizard-foot">
        <button class="wizard-back" ?disabled=${w.prev < 0} @click=${() => w.prev >= 0 && this._userSelect(w.prev)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon><span>${localize(lang, "card.back")}</span>
        </button>
        ${w.last
          ? html`<button class="wizard-next wizard-finish" @click=${() => this._finishWizard(steps[0] ?? -1)}>
              <span>${localize(lang, "card.finish")}</span><ha-icon icon="mdi:check"></ha-icon>
            </button>`
          : html`<button class="wizard-next" @click=${() => this._userSelect(w.next)}>
              <span>${localize(lang, "card.next")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>`}
      </div>
    `;
  }

  // --- sync_group (linked decks) --------------------------------------------------
  private _unlink?: () => void;
  private _linkedTo?: string;
  // Set while following another deck, so the switch isn't sent back.
  private _fromSync = false;

  private _syncLinked(): void {
    const group = this.isConnected ? this._config?.sync_group : undefined;
    if (group === this._linkedTo && (this._unlink || !group)) return;
    this._unlink?.();
    this._unlink = group ? onSync(group, this, (name) => this._followSync(name)) : undefined;
    this._linkedTo = group;
  }

  // Index of the visible content tab another deck in the group switched to.
  private _syncTarget(name: string, source?: string): number {
    const visible = this._visibleTabs();
    const i = matchTabName(visible.map((t) => t.name), name);
    if (!this._isContentTab(visible[i])) return -1;
    if (source ? this._autoLocked(i, source) : this._isLocked(visible[i])) return -1;
    return i;
  }

  private _followSync(name: string): void {
    if (!this._built || this._editing) return;
    const i = this._syncTarget(name, "sync_group");
    if (i < 0 || i === this._selected) return;
    this._fromSync = true;
    try {
      this._collapsed = false;
      this._selectIndex(i, false);
    } finally {
      this._fromSync = false;
    }
  }

  // --- entity_search (Ctrl+K) ----------------------------------------------------
  @state() private _esOpen = false;
  @state() private _esQuery = "";
  @state() private _esActive = 0;

  private _syncSearchRegistry(): void {
    if (this._config?.entity_search && this.isConnected) {
      SEARCH_DECKS.add(this);
      if (!searchKeyBound) {
        window.addEventListener("keydown", onSearchKey, true);
        searchKeyBound = true;
      }
    } else SEARCH_DECKS.delete(this);
  }

  // Where each entity is shown in this deck (visible content tabs only).
  entityPlaces(): EntityPlace[] {
    if (!this._built) return [];
    const visible = this._visibleTabs();
    return entityPlaces(
      visible.map((t) => ({ name: t.name, card: this._isContentTab(t) ? this._autoCard(t) ?? t.card : undefined })),
    );
  }

  openEntitySearch(): boolean {
    if (!this._config?.entity_search || !this._built) return false;
    this._esQuery = "";
    this._esActive = 0;
    this._esOpen = true;
    this.updateComplete.then(() => (this.renderRoot.querySelector(".es-input") as HTMLInputElement | null)?.focus());
    return true;
  }

  private _closeEntitySearch = (): void => {
    this._esOpen = false;
  };

  private _esMatches() {
    const places: DeckPlace[] = [...SEARCH_DECKS]
      .filter((d) => d.isConnected)
      .flatMap((deck) => deck.entityPlaces().map((p) => ({ ...p, deck })));
    if (!SEARCH_DECKS.has(this)) places.push(...this.entityPlaces().map((p) => ({ ...p, deck: this as TabdeckCard })));
    return searchPlaces(places, this._hass?.states, this._esQuery);
  }

  private _pickEntity(place: DeckPlace): void {
    this._esOpen = false;
    const deck = place.deck;
    if (!deck.selectTab(place.index)) return;
    if (place.child !== undefined) {
      const nested = deck._manager?.get(deck._allTabs().indexOf(deck._visibleTabs()[place.index]));
      deck.updateComplete.then(() => nested?.selectTab?.(place.child));
    }
    deck.updateComplete.then(() => deck.scrollIntoView?.({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" }));
  }

  private _onEsKeydown(e: KeyboardEvent): void {
    e.stopPropagation();
    const matches = this._esMatches();
    if (e.key === "Escape") {
      e.preventDefault();
      this._esOpen = false;
    } else if (e.key === "Enter") {
      e.preventDefault();
      const m = matches[this._esActive] ?? matches[0];
      if (m) this._pickEntity(m.place);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = matches.length || 1;
      this._esActive = (this._esActive + (e.key === "ArrowDown" ? 1 : -1) + n) % n;
    }
  }

  private _renderEntitySearch() {
    if (!this._esOpen) return nothing;
    const lang = hassLanguage(this._hass);
    const matches = this._esMatches();
    const label = localize(lang, "card.entity_search");
    return html`<div class="es-backdrop" @click=${(e: Event) => e.target === e.currentTarget && this._closeEntitySearch()}>
      <div class="es-panel" role="dialog" aria-label=${label}>
        <div class="es-field">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            class="es-input"
            type="search"
            placeholder=${localize(lang, "card.entity_search_placeholder")}
            aria-label=${label}
            .value=${this._esQuery}
            @input=${(e: Event) => {
              this._esQuery = (e.target as HTMLInputElement).value;
              this._esActive = 0;
            }}
            @keydown=${(e: KeyboardEvent) => this._onEsKeydown(e)}
          />
          <kbd>Ctrl K</kbd>
        </div>
        ${this._esQuery.trim()
          ? html`<div class="es-results" role="listbox">
              ${matches.length
                ? matches.map((m, i) => {
                    const st = this._hass?.states?.[m.place.entity];
                    return html`<button
                      class="es-item ${i === this._esActive ? "active" : ""}"
                      role="option"
                      aria-selected=${i === this._esActive ? "true" : "false"}
                      @click=${() => this._pickEntity(m.place)}
                    >
                      ${customElements.get("ha-state-icon") && st
                        ? html`<ha-state-icon .hass=${this._hass} .stateObj=${st}></ha-state-icon>`
                        : html`<ha-icon .icon=${st?.attributes?.icon ?? "mdi:shape"}></ha-icon>`}
                      <span class="es-name">${m.name}<small>${m.place.entity}</small></span>
                      <span class="es-tab">${m.place.child ? `${m.place.tab} ${this._rtl ? "‹" : "›"} ${m.place.child}` : m.place.tab}</span>
                    </button>`;
                  })
                : html`<div class="es-empty">${localize(lang, "card.entity_search_none")}</div>`}
            </div>`
          : nothing}
      </div>
    </div>`;
  }

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
    if (this._pinchStart !== undefined && e.touches.length === 2) {
      if (isPinchIn(this._pinchStart, touchDistance(e.touches[0], e.touches[1]))) {
        this._pinchStart = undefined;
        this.openOverview();
      }
      return;
    }
    const p = this._peek;
    const t = e.touches[0];
    if (!p || !t || !this._config?.swipe_peek) return;
    // In RTL a drag to the right brings the next tab: work in mirrored x.
    const dx = (t.clientX - p.x) * (this._rtl ? -1 : 1);
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
    const sx = this._rtl ? -1 : 1;
    active.style.transform = `translateX(${offset * sx}px)`;
    if (p.neighbour && p.neighbour !== next) this._clearPeekPanel(p.neighbour);
    p.neighbour = next ?? undefined;
    if (next) {
      next.classList.add("peek");
      next.style.top = `${active.offsetTop}px`;
      next.style.transform = `translateX(calc(${dir * sx > 0 ? "100%" : "-100%"} + ${offset * sx}px))`;
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
      if (this._isLocked(this._visibleTabs()[target])) {
        this._pinFor = { index: target, error: false };
        return;
      }
      this._peekSettling = true;
      this._selectIndex(target);
      // Carry on from where the neighbour was released.
      const sx = this._rtl ? -1 : 1;
      const start = `translateX(calc(${dir * sx > 0 ? "100%" : "-100%"} + ${p.dx * sx}px))`;
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
    return reducedMotion();
  }

  // fire_event: a tabdeck_tab_changed event in Home Assistant. Only admin
  // users may fire events; for others it fails once, quietly.
  private _eventWarned = false;

  private _fireTabEvent(index: number, tab: string | undefined, previous: string | undefined): void {
    const hass: any = this._hass;
    if (!hass?.callApi) return;
    Promise.resolve(
      hass.callApi("POST", "events/tabdeck_tab_changed", { deck: this._deckId, tab, index, previous, device: deviceId() }),
    ).catch((err: any) => {
      if (this._eventWarned) return;
      this._eventWarned = true;
      console.warn("tabdeck-card: fire_event needs an admin user", err?.message ?? err);
    });
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
    this._pinchStart =
      this._config?.overview && e.touches.length === 2 ? touchDistance(e.touches[0], e.touches[1]) : undefined;
    if (!this._config?.swipe || e.touches.length !== 1) {
      this._touchStart = undefined;
      return;
    }
    const t = e.touches[0];
    if (!this._swipeMayStart(e, t.clientX)) {
      this._touchStart = undefined;
      return;
    }
    this._touchStart = { x: t.clientX, y: t.clientY, t: e.timeStamp };
    if (this._config.swipe_peek) this._peekStart(t.clientX, t.clientY);
  };

  // swipe_edge: only a start near the content's left or right edge counts.
  // swipe_lock: a start on a slider or a map belongs to that control.
  private _swipeMayStart(e: Event, x: number): boolean {
    if (this._config?.swipe_lock && startsOnControl(e.composedPath())) return false;
    const edge = this._config?.swipe_edge;
    if (edge === undefined) return true;
    const content = e.currentTarget as HTMLElement | null;
    return !content?.getBoundingClientRect || startsAtEdge(x, content.getBoundingClientRect(), edge);
  }

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
    if (!this._config?.swipe_mouse || e.pointerType === "touch" || !this._swipeMayStart(e, e.clientX)) {
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

  // wheel_switch: scrolling over the bar steps one tab per wheel gesture.
  // The page doesn't scroll meanwhile, unless the deck can't move that way
  // (an end, without swipe_wrap); Ctrl+wheel (zoom) is left alone.
  private _wheelStep = createWheelStepper();

  private _onBarWheel = (e: WheelEvent): void => {
    const cfg = this._config;
    if (!cfg?.wheel_switch || e.ctrlKey || this._editing) return;
    // A sideways scroll towards the end of the bar is "next" (leftwards in RTL).
    const raw = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX * (this._rtl ? -1 : 1);
    if (!raw) return;
    const target = this._stepContent(this._selected, raw > 0 ? 1 : -1, cfg.swipe_wrap);
    if (target === this._selected) return;
    e.preventDefault();
    if (this._wheelStep(e) !== 0) this._userSelect(target);
  };

  private _applySwipe(start: SwipePoint, end: SwipePoint): void {
    // RTL: the next tab is to the left, so a swipe to the right brings it.
    const m = this._rtl ? -1 : 1;
    const dir = detectSwipe({ ...start, x: start.x * m }, { ...end, x: end.x * m });
    if (!dir || !this._config) return;
    // Wrap around the ends when swipe_wrap is on; otherwise clamp. Disabled
    // and action tabs are stepped over.
    const target = this._stepContent(
      this._selected,
      dir === "next" ? 1 : -1,
      this._config.swipe_wrap,
    );
    if (target !== this._selected) this._userSelect(target);
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (this._config?.debug) this._renderStart = performance.now();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (this._companionSub) this._sendCompanion();
    if (this._config?.debug && this._renderStart) this._renderMs = performance.now() - this._renderStart;
    if (this._config?.debug && this._built && (changed.has("_selected") || changed.has("_built"))) this._measureDraw();
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
    if (changed.has("_pinFor") && this._pinFor && !changed.get("_pinFor")) {
      (this.renderRoot.querySelector(".pin-dialog input") as HTMLInputElement | null)?.focus();
    }
    this._syncSpyObserver();
    this._syncDock();
    this._syncPanelWatch();
    // Generated tabs may bring auto_refresh after the build.
    this._syncRefreshTimer();
    this._syncPageBackground();
    this._syncPinTimer();
  }

  // --- page_background -----------------------------------------------------------
  // The view element whose background the open tab has replaced.
  private _pageBg?: BackgroundTarget;

  private _syncPageBackground(): void {
    const tab = this._visibleTabs()[this._selected];
    const value =
      tab?.page_background && this.isConnected && !this._config?.scroll_spy ? cssBackground(this._text(tab.page_background)) : undefined;
    if (!value) return this._clearPageBackground();
    const target = this._pageBg ?? findBackgroundTarget(this);
    if (!target) return;
    this._pageBg = target;
    applyPageBackground(target, this, value);
  }

  private _clearPageBackground(): void {
    if (!this._pageBg) return;
    restorePageBackground(this._pageBg, this);
    this._pageBg = undefined;
  }

  // --- empty_message / loading_placeholder -------------------------------------
  // What the open panel shows over its card: grey boxes while it loads, the
  // empty message while all of its cards are hidden.
  @state() private _panelState?: { tab: TabdeckTabConfig; state: PanelState };
  private _panelWatch?: { panel: Element; card: any; observer: ResizeObserver; stop: () => void };
  // Cards that have finished loading (had a height, or ran out of time).
  private _loadedCards = new WeakSet<object>();

  // Watch the open panel (cards are often display: inline, which a
  // ResizeObserver can't see) and read the card's own height.
  private _syncPanelWatch(): void {
    const tab = this._visibleTabs()[this._selected];
    const original = tab ? this._allTabs().indexOf(tab) : -1;
    const loading = !!this._config?.loading_placeholder;
    const card = tab && (tab.empty_message || loading) && !this._config?.scroll_spy ? this._manager?.get(original) : undefined;
    const panel = card && typeof ResizeObserver !== "undefined" ? this._panelEl(this._selected) : null;
    if (panel && this._panelWatch?.panel === panel && this._panelWatch.card === card) return;
    this._stopPanelWatch();
    if (!panel) return;
    const watch = createPanelWatch(
      (state) => (this._panelState = state === "none" ? undefined : { tab, state }),
      { loading, empty: !!tab.empty_message, loaded: this._loadedCards.has(card) },
      () => this._loadedCards.add(card),
    );
    const observer = new ResizeObserver(() => watch.size(card.isConnected ? card.getBoundingClientRect().height : 1));
    observer.observe(panel);
    this._panelWatch = { panel, card, observer, stop: watch.stop };
  }

  private _stopPanelWatch(): void {
    this._panelWatch?.observer.disconnect();
    this._panelWatch?.stop();
    this._panelWatch = undefined;
    if (this._panelState) this._panelState = undefined;
  }

  private _renderPanelState(tab: TabdeckTabConfig) {
    const s = this._panelState;
    if (s?.tab !== tab) return nothing;
    if (s.state === "loading") {
      return html`<div class="loading-boxes" role="progressbar" aria-label=${localize(hassLanguage(this._hass), "card.loading")}>
        <span></span><span></span><span class="wide"></span>
      </div>`;
    }
    return this._renderEmpty(tab);
  }

  // --- friendly_errors ------------------------------------------------------------
  // Tabs with a card that failed (HA's error card inside), and why.
  @state() private _errors = new Map<TabdeckTabConfig, CardProblem[]>();
  private _errorSig = "";
  private _errorTimers: ReturnType<typeof setTimeout>[] = [];

  // Cards render (and fail) asynchronously, and HA keeps a custom card's
  // error hidden for 2 s while its code may still arrive: look a few times.
  private _scheduleErrorScan(): void {
    if (!this._config?.friendly_errors) return;
    this._errorTimers.forEach(clearTimeout);
    this._errorTimers = [300, 2500, 6000].map((ms) => setTimeout(() => this._scanErrors(), ms));
  }

  _scanErrors(): void {
    if (!this._manager || !this._config?.friendly_errors) return;
    const editing = this._editModeFlag || this._previewFlag;
    const next = new Map<TabdeckTabConfig, CardProblem[]>();
    this._allTabs().forEach((tab, i) => {
      const found = findErrorCards(this._manager!.get(i));
      if (!found.length) return;
      for (const el of found) setErrorCardHidden(el, !editing);
      next.set(tab, found.map((el) => explainCardError((el as any)._config)));
    });
    const sig = JSON.stringify([...next].map(([t, p]) => [this._allTabs().indexOf(t), p]));
    if (sig !== this._errorSig) {
      this._errorSig = sig;
      this._errors = next;
    }
  }

  private _renderErrors(problems: CardProblem[]) {
    const lang = hassLanguage(this._hass);
    return html`<div class="card-errors" role="alert">
      <div class="card-errors-title"><ha-icon icon="mdi:alert-circle"></ha-icon>${localize(lang, "card.error_title")}</div>
      <ul>
        ${problems.map((p) => html`<li>${p.key ? localize(lang, p.key, p.vars) : p.text}</li>`)}
      </ul>
      <div class="card-errors-hint"><ha-icon icon="mdi:pencil"></ha-icon>${localize(lang, "card.error_hint")}</div>
    </div>`;
  }

  private _renderEmpty(tab: TabdeckTabConfig) {
    const msg = normalizeEmpty(tab.empty_message) ?? {};
    return html`<div class="empty-msg" role="status">
      <ha-icon .icon=${msg.icon ?? "mdi:eye-off-outline"}></ha-icon>
      <span class="empty-title">${this._text(msg.title) ?? localize(hassLanguage(this._hass), "card.empty_title")}</span>
      ${msg.text ? html`<span class="empty-text">${this._text(msg.text)}</span>` : nothing}
    </div>`;
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

  // Right-to-left (direction, HA's language or the page's dir): swipes,
  // arrows and the slide transition are mirrored.
  private get _rtl(): boolean {
    return isRtl(this._config?.direction, this._hass, typeof document !== "undefined" ? document.documentElement.dir : undefined);
  }

  // The season whose dates include today (seasons), if any.
  private _season(): Season | undefined {
    return activeSeason(this._config?.seasons, new Date());
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
    // A season (seasons: date ranges) sits between the two.
    const season = this._season();
    const seasonal = { ...(season?.styles ?? {}), ...(season?.accent ? { "--tabdeck-accent": cssColor(season.accent)! } : {}) };
    const styles = { ...(this._config?.styles ?? {}), ...seasonal, ...(active?.styles ?? {}) };
    // The deck (and every card in it) lays out in the worked-out direction,
    // also when only HA's language, not the page, says RTL.
    if (this._config?.direction || this._rtl) this.setAttribute("dir", this._rtl ? "rtl" : "ltr");
    else this.removeAttribute("dir");
    if (season) this.setAttribute("season", season.name ?? `${season.from}..${season.to}`);
    else this.removeAttribute("season");
    this.toggleAttribute("quiet", this._isQuiet());
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
    panel.animate(transitionFrames(mode, this._rtl ? (-dir as 1 | -1) : dir), {
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
    if (this._isSplit) return this._wrapExtras(html`${this._renderSplit(visible)}${this._renderPin()}`);
    if (this._overview) return this._wrapExtras(this._renderOverview(visible));
    // popup: hidden: the deck itself isn't shown, only its popups (shown
    // normally while editing so it can be set up).
    if (cfg.popup === "hidden" && !this._editing) return html`${this._renderPopup()}${this._renderPin()}`;
    // The dock leaves the page while editing so it can't cover HA's edit UI.
    const docked = cfg.dock && !this._editing && !cfg.wizard;
    const quiet = this._isQuiet();
    const bar = html`
      <tabdeck-tabbar
        .items=${visible.map((t) => ({
          name: this._text(t.name),
          subtitle: this._text(t.subtitle) ?? (t.group?.display === "menu" ? this._groupChild.get(t) : undefined),
          icon: this._text(t.icon),
          accent: cssColor(this._text(t.accent)) ?? (cfg.picture_accent ? this._pictureAccent(t) : undefined),
          color: cssColor(this._text(t.color)),
          disabled: t.disabled,
          badgeColor: cssColor(t.badge_color) ?? (this._errors.has(t) && t.badge === undefined && !t.badge_icon ? "var(--error-color, #db4437)" : undefined),
          holdAction: !!t.hold_action || (!!cfg.alert_snooze && !!t.alert) || this._canCompare(t) || this._canPreview(t) || this._holdAsksPin(t),
          badgeAction: !!t.badge_action,
          doubleTap: !!t.double_tap_action,
          action: isActionTab(t),
          badge: this._resolveBadgeFinal(t),
          alert: this._isAlerting(t),
          ghost: this._editing && this._isHidden(t),
          fab: t.fab,
          ring: this._ring(t),
          ringColor: cssColor(t.ring_color),
          ringStyle: t.ring_style,
          graph: t.graph ? this._graphLine(t) : undefined,
          graphColor: t.graph ? cssColor(normalizeGraph(t.graph)?.color) : undefined,
          badges: t.badges ? this._extraBadges(t) : undefined,
          tooltip: this._text(t.tooltip),
          bounce: cfg.badge_bounce && !quiet && !(t.countdown && countdownSeconds(this._hass?.states?.[t.countdown], Date.now())),
          badgeIcon: t.badge_icon ?? (this._errors.has(t) && t.badge === undefined ? "mdi:alert-circle" : undefined),
          picture: this._picture(t),
          iconAnimation: this._text(t.icon_animation),
          font: t.font_size || t.font_weight || t.font_family ? { size: t.font_size, weight: t.font_weight, family: t.font_family } : undefined,
          menu: t.group?.display === "menu" ? t.group.items : undefined,
          separator: t.separator,
          changed: this._isChanged(t),
          unhealthy: !!cfg.health_dim && isUnhealthy(this._watchList(t), this._hass?.states, cfg.health_dim),
          speed: cfg.debug === "speed" ? this._drawMs.get(this._allTabs().indexOf(t)) : undefined,
        }))}
        .selected=${this._selected}
        @tabdeck-action=${this._onTabAction}
        .position=${docked ? "bottom" : this._position}
        .dock=${docked}
        .tabStyle=${cfg.style}
        .display=${this._effectiveDisplay}
        .align=${cfg.align}
        .badgeDisplay=${cfg.badge_display}
        .scrollable=${cfg.scrollable}
        .animated=${cfg.animated}
        .rtl=${this._rtl}
        .liquid=${cfg.liquid_indicator}
        .accentIndicator=${cfg.accent_indicator}
        .indicatorSize=${cfg.indicator_size}
        .indicatorRadius=${cfg.indicator_radius}
        .sticky=${cfg.sticky || cfg.scroll_spy}
        .autohide=${cfg.bar_autohide && this._barPinned}
        .autohidden=${this._barHidden}
        .collapsed=${this._collapsed}
        .elevation=${cfg.elevation}
        .scrollButtons=${cfg.scroll_buttons}
        .fade=${cfg.bar_fade}
        .searchable=${cfg.search}
        .expandable=${cfg.fullscreen}
        .overviewable=${cfg.overview}
        .entitySearchable=${cfg.entity_search}
        .lastTab=${cfg.last_tab_button ? this._lastTabItem() : undefined}
        @tabdeck-last=${() => this.selectLast()}
        @tabdeck-entity-search=${() => this.openEntitySearch()}
        @tabdeck-overview=${this._toggleOverview}
        @tabdeck-fullscreen=${this._toggleFullscreen}
        .railExpand=${cfg.rail_expand}
        .customizable=${cfg.customize && !this._editing}
        .customItems=${cfg.customize ? this._customItems() : []}
        @tabdeck-customize=${this._onCustomize}
        .reorderable=${cfg.drag_reorder && !this._editing}
        .shareable=${!!cfg.share_button}
        .shareInfo=${this._share}
        @tabdeck-share=${this._onShare}
        @tabdeck-share-close=${() => (this._share = undefined)}
        @tabdeck-reorder=${this._onReorder}
        .overflowMenu=${cfg.overflow_menu || cfg.hidden_alerts}
        .hiddenAlerts=${cfg.hidden_alerts}
        .summary=${cfg.summary_chip ? (this._summary() ?? null) : undefined}
        @tabdeck-summary=${this._nextAlert}
        .limit=${cfg.bar_limit ?? 0}
        .barLabel=${cfg.aria_label}
        .language=${hassLanguage(this._hass)}
        .barBackground=${cssColor(this._season()?.bar_background ?? cfg.bar_background)}
        .glass=${cfg.glass === true ? 14 : cfg.glass}
        .barText=${this._season()?.bar_text ?? cfg.bar_text}
        .density=${cfg.density}
        @tabdeck-select=${this._onSelect}
        @wheel=${this._onBarWheel}
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
    const compareAt = this._compareShown();
    const contentClass = [
      "content",
      cfg.content_arrows && !cfg.scroll_spy ? "with-arrows" : "",
      cfg.content_height === "tallest" && !cfg.scroll_spy && compareAt < 0 ? "tallest" : "",
      compareAt >= 0 ? "comparing" : "",
      scrolls ? "scrolls" : "",
      background || (!cfg.scroll_spy && visible.some((t) => t.background)) ? "has-bg" : "",
      this._fullscreen ? "fullscreen" : "",
      cfg.fullscreen && cfg.hide_bar ? "with-fs" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const lang = hassLanguage(this._hass);
    const pipTab = this._pipShown();
    const compareTitle = (tab: TabdeckTabConfig, compared: boolean) => html`<div class="compare-title ${compared ? "" : "main"}">
      ${this._text(tab.icon) ? html`<ha-icon .icon=${this._text(tab.icon)}></ha-icon>` : nothing}
      <span>${this._text(tab.name) ?? ""}</span>
      ${compared
        ? html`<button class="compare-close" aria-label=${localize(lang, "card.close")} title=${localize(lang, "card.close")} @click=${() => this.closeCompare()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>`
        : nothing}
    </div>`;
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
        ${cfg.breadcrumbs && !cfg.scroll_spy ? this._renderBreadcrumbs() : nothing}
        ${this._renderOffline(lang)}${this._renderTakeover(lang)}${this._renderLearned(lang)}
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
          const compared = i === compareAt;
          const preview = i === this._previewIndex && !active && !compared;
          const pip = !active && !preview && !compared && tab === pipTab;
          // The tab's card is in the popup dialog meanwhile.
          const inPopup = tab === this._popupTab;
          const spy = cfg.scroll_spy;
          // A PIN-locked tab never shows its card (scroll_spy section, an
          // unlock that ran out): the placeholder instead.
          const locked = this._isLocked(tab);
          // With unmount_hidden, only the active panel's card is in the DOM
          // (others stay retained in the manager but detached) to save memory.
          // scroll_spy stacks every panel, so it always shows them all.
          return html`
            <div
              class="panel ${spy ? "section" : ""} ${preview ? "preview" : ""} ${pip ? "pip" : ""} ${compared ? "compare" : ""}"
              data-index=${i}
              style=${styleMap(tab.zoom || tab.padding || tab.spacing ? sizeStyles(tab) : {})}
              ?hidden=${!spy && !active && !preview && !pip && !compared}
              role=${pip ? "dialog" : nothing}
              aria-label=${pip ? this._text(tab.name) ?? nothing : nothing}
              @click=${pip ? this._openPip : nothing}
            >
              ${pip
                ? html`<div class="pip-bar">
                    <span class="pip-title">${this._text(tab.name) ?? ""}</span>
                    <button class="pip-close" aria-label=${localize(lang, "card.close")} title=${localize(lang, "card.close")} @click=${this._closePip}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>`
                : nothing}
              ${spy && cfg.header && !isActionTab(tab)
                ? html`<div class="section-title">${this._text(tab.name) ?? ""}</div>`
                : nothing}
              ${preview ? html`<div class="preview-title">${this._text(tab.name) ?? ""}</div>` : nothing}
              ${active && !locked && this._errors.has(tab) ? this._renderErrors(this._errors.get(tab)!) : nothing}
              ${active && !locked ? this._renderPanelState(tab) : nothing}
              ${compareAt >= 0 && (active || compared) ? compareTitle(tab, compared) : nothing}
              ${inPopup
                ? nothing
                : active || preview || pip || spy || compared
                  ? locked
                    ? this._renderLocked(tab)
                    : this._manager?.ensure(original)
                  : !cfg.unmount_hidden
                    ? this._manager?.get(original)
                    : nothing}
            </div>
          `;
        })}
      </div>
    `;
    return this._wrapExtras(html`
      <div class="root pos-${cfg.wizard ? "top" : docked ? "bottom" : this._position} ${docked ? "docked" : ""} ${cfg.hide_bar || cfg.wizard ? "no-bar" : ""} ${cfg.wizard ? "wizard" : ""}">
        ${cfg.wizard
          ? this._renderWizard(visible, panels)
          : cfg.hide_bar
            ? panels
            : docked || this._position === "bottom"
              ? html`${panels}${bar}`
              : html`${bar}${panels}`}
      </div>
      ${this._renderPin()}
    `);
  }

  // header_cards above and footer_cards below the deck, on every tab; the
  // debug panel last.
  private _wrapExtras(deck: unknown) {
    const debug = html`${this._config?.debug ? this._renderDebug() : nothing}${this._renderPopup()}${this._renderEntitySearch()}${this._renderDim()}`;
    if (!this._extras) return html`${deck}${debug}`;
    const head = this._config!.header_cards?.length ?? 0;
    const cards = this._extras.all();
    const header = cards.slice(0, head);
    const footer = cards.slice(head);
    return html`
      ${header.length ? html`<div class="deck-header">${header}</div>` : nothing}
      ${deck}
      ${footer.length ? html`<div class="deck-footer">${footer}</div>` : nothing}
      ${debug}
    `;
  }

  // --- debug panel ---------------------------------------------------------------
  private _defaultReason = "default_tab";
  private _startReason = "";
  private _buildMs = 0;
  private _renderStart = 0;
  private _renderMs = 0;
  // Per tab (original index): ms from the switch (or build) until its card
  // finished rendering and the browser painted.
  private _drawMs = new Map<number, number>();
  private _switchAt = 0;

  private _measureDraw(): void {
    const tab = this._visibleTabs()[this._selected];
    if (!tab || !this._manager || isActionTab(tab)) return;
    const original = this._allTabs().indexOf(tab);
    const start = this._switchAt || this._renderStart || performance.now();
    this._switchAt = 0;
    const card = this._manager.get(original);
    void Promise.resolve(card?.updateComplete)
      .catch(() => undefined)
      .then(() =>
        requestAnimationFrame(() => {
          this._drawMs.set(original, performance.now() - start);
          this.requestUpdate();
        }),
      );
  }

  // One-line description of a condition, for the debug panel.
  private _describeCondition(c: any): string {
    if (!c || typeof c !== "object") return String(c);
    const kind = c.condition ?? (c.entity || c.entity_id ? "state" : "?");
    const ids = conditionEntities(c).join(", ");
    if (Array.isArray(c.conditions)) return `${kind}(${c.conditions.map((x: any) => this._describeCondition(x)).join(", ")})`;
    switch (kind) {
      case "state":
        return `state ${ids} ${c.state_not !== undefined ? "≠ " + [].concat(c.state_not).join("|") : "= " + [].concat(c.state).join("|")}`;
      case "numeric_state":
        return `numeric ${ids}${c.above !== undefined ? " > " + c.above : ""}${c.below !== undefined ? " < " + c.below : ""}`;
      case "screen":
        return `screen ${c.media_query}`;
      case "template":
        return "template";
      default:
        return String(kind);
    }
  }

  private _conditionsText(conds: any[] | undefined): string {
    if (!Array.isArray(conds) || !conds.length) return "";
    return conds
      .map((c) => `${this._describeCondition(c)} ${isTabVisible([c], this._hass, this._templateResolver) ? "✓" : "✗"}`)
      .join("; ");
  }

  private _renderDebug() {
    const visible = this._visibleTabs();
    const selected = visible[this._selected];
    const templates = this._collectTemplates();
    const short = (v: unknown) => {
      const t = typeof v === "string" ? v : JSON.stringify(v);
      return t === undefined ? "…" : t.length > 70 ? t.slice(0, 70) + "…" : t;
    };
    return html`
      <details class="debug" open>
        <summary>tabdeck debug</summary>
        <div class="debug-facts">
          <span>selected ${this._selected} (${selected?.name ?? "—"})</span>
          <span>start: ${this._startReason}</span>
          <span>deck ${this._deckId}</span>
          <span>device ${deviceId() ?? "—"}</span>
          ${this._editing ? html`<span>editing</span>` : nothing}
          <span>build ${this._buildMs.toFixed(1)} ms</span>
          <span>render ${this._renderMs.toFixed(1)} ms</span>
        </div>
        <table>
          <tbody>
            ${this._allTabs().map((t, i) => {
              const shown = visible.includes(t);
              const badge = this._resolveBadgeFinal(t);
              const ring = this._ring(t);
              const parts = [
                shown ? "visible" : "hidden",
                this._conditionsText(t.visibility),
                t.alert ? `alert ${this._isAlerting(t) ? "on" : "off"}` : "",
                badge !== undefined ? `badge ${badge}` : "",
                ring !== undefined ? `ring ${Math.round(ring)}%` : "",
                this._isLocked(t) ? "locked" : "",
                isActionTab(t) ? "action tab" : this._manager?.isLoaded(i) ? "" : "card not built",
                this._manager?.createMs[i] !== undefined ? `card ${this._manager.createMs[i].toFixed(1)} ms` : "",
                this._drawMs.has(i) ? `drawn ${Math.round(this._drawMs.get(i)!)} ms` : "",
              ].filter(Boolean);
              return html`<tr class="tab-row ${t === selected ? "current" : ""}">
                <td>${this._text(t.name) ?? i}</td>
                <td>${parts.join(" · ")}</td>
              </tr>`;
            })}
          </tbody>
        </table>
        ${templates.length
          ? html`<div class="debug-templates">
              ${templates.map((tpl) => html`<div><code>${short(tpl)}</code> → <code>${short(this._templates?.result(tpl))}</code></div>`)}
            </div>`
          : nothing}
      </details>
    `;
  }

  // content_arrows: ‹ › over the content. An arrow that can't move (at an
  // end, without swipe_wrap) isn't rendered. In RTL prev sits on the right
  // and points right (the browser doesn't mirror a lone ‹ in a button).
  private _renderArrows() {
    const wrap = !!this._config?.swipe_wrap;
    const prev = this._stepContent(this._selected, -1, wrap);
    const next = this._stepContent(this._selected, 1, wrap);
    const lang = hassLanguage(this._hass);
    return html`
      ${prev !== this._selected
        ? html`<button class="nav-arrow prev" aria-label=${localize(lang, "card.prev_tab")} @click=${() => this._userSelect(prev)}>${this._rtl ? "›" : "‹"}</button>`
        : nothing}
      ${next !== this._selected
        ? html`<button class="nav-arrow next" aria-label=${localize(lang, "card.next_tab")} @click=${() => this._userSelect(next)}>${this._rtl ? "‹" : "›"}</button>`
        : nothing}
    `;
  }

  // A tab pulses while all of its `alert` conditions are met.
  // A tab pulses while all of its `alert` conditions are met, unless the
  // pulse was snoozed (a snooze ends early when the alert clears).
  private _isAlerting(tab: TabdeckTabConfig): boolean {
    if (!tab.alert || !this._hass) return false;
    const met = isTabVisible(tab.alert, this._hass, this._templateResolver);
    if (!this._config?.alert_snooze) return met;
    const key = this._snoozeKey(tab);
    const snoozed = snoozedUntil(this._deckId, key, Date.now()) !== undefined;
    if (!met && snoozed) clearSnooze(this._deckId, key);
    return met && !snoozed;
  }

  // picture_accent: the main colour of the tab's picture, read once per URL
  // in the background (undefined until then, or when it can't be read).
  private _picAccents = new Map<string, string | null>();
  private _pictureAccent(tab: TabdeckTabConfig): string | undefined {
    const url = this._picture(tab);
    if (!url) return undefined;
    if (!this._picAccents.has(url)) {
      this._picAccents.set(url, null);
      imageColor(url, "dominant").then((rgb) => {
        if (!rgb) return;
        this._picAccents.set(url, `rgb(${rgb.join(", ")})`);
        this.requestUpdate();
      });
    }
    return this._picAccents.get(url) ?? undefined;
  }

  // A tab's picture: an entity's entity_picture (a person's photo), or a URL.
  private _picture(tab: TabdeckTabConfig): string | undefined {
    const v = this._text(tab.picture);
    if (!v) return undefined;
    if (/^[a-z_]+\.[a-z0-9_]+$/.test(v)) return this._hass?.states?.[v]?.attributes?.entity_picture || undefined;
    return v;
  }

  // summary_chip: "3 alerts" (alerting tabs), or its own text where {n} is
  // that count. Hidden when there's nothing to say.
  private _summary(): { text: string; icon?: string; color?: string } | undefined {
    const sc = this._config!.summary_chip!;
    const o = sc === true ? {} : sc;
    const n = this._visibleTabs().filter((t) => this._isAlerting(t)).length;
    const raw = o.text === undefined ? (n ? plural(hassLanguage(this._hass), "card.n_alerts", n) : undefined) : this._text(o.text);
    if (!raw || (raw.includes("{n}") && !n)) return undefined;
    return { text: raw.split("{n}").join(String(n)), icon: o.icon ?? "mdi:alert", color: cssColor(o.color) };
  }

  // Clicking the chip opens the next alerting tab after the open one.
  private _nextAlert = (): void => {
    const visible = this._visibleTabs();
    for (let k = 1; k <= visible.length; k++) {
      const i = (this._selected + k) % visible.length;
      if (this._isAlerting(visible[i])) return void (i !== this._selected && this._userSelect(i));
    }
  };

  // Progress ring percentage (undefined: no ring).
  private _ring(tab: TabdeckTabConfig): number | undefined {
    if (tab.ring === undefined) return undefined;
    return ringPercent(this._resolveBadge(tab.ring), tab.ring_max ?? 100);
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
    if (tab.countdown) {
      const left = countdownSeconds(this._hass?.states?.[tab.countdown], Date.now());
      if (left) return formatCountdown(left.seconds);
    }
    const value = this._resolveBadge(tab.badge);
    if (this._config?.hide_inactive_badge && !isActiveBadge(value)) return undefined;
    if (this._config?.badge_display === "dot") return value;
    return formatBadge(value, tab.badge_format ?? this._config?.badge_format);
  }

  // badges: [...] after the main badge. An icon shows while its value is
  // active (or always without one); a text value follows the main badge's
  // rules (hide_inactive_badge, badge_format).
  private _extraBadges(tab: TabdeckTabConfig): ExtraBadge[] {
    const out: ExtraBadge[] = [];
    for (const b of tab.badges ?? []) {
      const color = cssColor(b.color);
      const value = b.badge === undefined ? undefined : this._resolveBadge(b.badge);
      if (b.icon) {
        if (b.badge === undefined || isActiveBadge(value)) out.push({ icon: b.icon, color });
        continue;
      }
      if (value === undefined || value === "" || (this._config?.hide_inactive_badge && !isActiveBadge(value))) continue;
      out.push({ text: this._config?.badge_display === "dot" ? value : formatBadge(value, tab.badge_format ?? this._config?.badge_format), color });
    }
    return out;
  }

  private _resolveBadge(badge?: string | Record<string, any>): string | undefined {
    if (!badge) return undefined;
    if (typeof badge === "object") {
      const spec = normalizeCountBadge(badge);
      return spec && this._hass ? countBadge(spec, this._hass) : undefined;
    }
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
    ${reducedMotionCss}
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
      padding-inline: var(--tabdeck-arrow-gutter, 40px);
    }
    .nav-arrow.prev {
      inset-inline-start: 2px;
    }
    .nav-arrow.next {
      inset-inline-end: 2px;
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
    .card-errors {
      margin-bottom: 8px;
      padding: 10px 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 45%, transparent);
      background: color-mix(in srgb, var(--error-color, #db4437) 8%, var(--card-background-color, transparent));
      font-size: 14px;
    }
    .card-errors-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      color: var(--error-color, #db4437);
    }
    .card-errors ul {
      margin: 6px 0;
      padding-inline-start: 26px;
      color: var(--primary-text-color);
    }
    .card-errors-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .card-errors ha-icon {
      --mdc-icon-size: 18px;
    }
    .loading-boxes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--tabdeck-placeholder-gap, 8px);
    }
    .loading-boxes span {
      height: 56px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--tabdeck-placeholder-color, rgba(127, 127, 127, 0.16));
      animation: tabdeck-placeholder 1.4s ease-in-out infinite;
    }
    .loading-boxes .wide {
      grid-column: 1 / -1;
      height: 96px;
    }
    @keyframes tabdeck-placeholder {
      50% {
        opacity: 0.45;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .loading-boxes span {
        animation: none;
      }
    }
    .empty-msg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: var(--tabdeck-empty-height, 140px);
      padding: 16px;
      box-sizing: border-box;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .empty-msg ha-icon {
      --mdc-icon-size: 36px;
      opacity: 0.7;
    }
    .empty-title {
      font-size: 15px;
    }
    .empty-text {
      font-size: 13px;
      opacity: 0.8;
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
      inset-inline-end: 6px;
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
      inset-inline-end: 12px;
    }
    /* debug panel */
    .debug {
      margin-top: 8px;
      padding: 8px 10px;
      border: 1px dashed var(--divider-color, #888);
      border-radius: 8px;
      font: 12px/1.5 var(--code-font-family, ui-monospace, monospace);
      color: var(--secondary-text-color);
    }
    .debug summary {
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .debug-facts {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      margin: 6px 0;
    }
    .debug table {
      width: 100%;
      border-collapse: collapse;
    }
    .debug td {
      padding: 2px 6px 2px 0;
      vertical-align: top;
    }
    .debug tr.current td:first-child {
      color: var(--primary-color);
    }
    .debug-templates {
      margin-top: 6px;
      word-break: break-all;
    }
    /* PIN prompt */
    .pin-backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--tabdeck-pin-z, 10);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);
    }
    .pin-backdrop.over-popup {
      z-index: 2147481001;
    }
    /* A PIN-locked tab where its content would show. */
    .locked-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px 16px;
      color: var(--secondary-text-color);
      text-align: center;
    }
    .locked-tab ha-icon {
      --mdc-icon-size: 32px;
    }
    .locked-name {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .locked-unlock {
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font: inherit;
      cursor: pointer;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .pin-dialog {
      width: min(320px, calc(100vw - 32px));
      padding: 20px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    .pin-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .pin-dialog input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      font-size: 20px;
      letter-spacing: 0.3em;
      text-align: center;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--secondary-background-color, transparent);
      color: inherit;
    }
    .pin-error {
      margin-top: 8px;
      color: var(--error-color, #db4437);
      font-size: 13px;
    }
    .pin-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
    .pin-actions button {
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font: inherit;
      cursor: pointer;
      background: none;
      color: var(--primary-color);
    }
    .pin-actions .pin-ok {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    /* quiet_hours: alerts keep their colour but stop pulsing. */
    :host([quiet]) {
      --tabdeck-alert-animation: none;
    }
    /* A one-line note over the content (learned_default). */
    .deck-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 8px;
      padding-block: 6px;
      padding-inline: 10px 6px;
      border-radius: 8px;
      font-size: 13px;
      background: color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 12%, transparent);
      color: var(--primary-text-color);
      --mdc-icon-size: 18px;
    }
    .deck-notice > ha-icon {
      color: var(--tabdeck-accent, var(--primary-color));
      flex: none;
    }
    .deck-notice.offline {
      background: var(--tabdeck-offline-background, var(--error-color, #db4437));
      color: var(--tabdeck-offline-color, #fff);
      font-weight: 500;
    }
    .deck-notice.offline > svg {
      width: 18px;
      height: 18px;
      flex: none;
      fill: currentColor;
    }
    .deck-notice.takeover {
      background: var(--tabdeck-takeover-background, var(--warning-color, #ffa600));
      color: var(--tabdeck-takeover-color, #fff);
      font-weight: 500;
    }
    .deck-notice.takeover > ha-icon {
      color: inherit;
    }
    .takeover-count {
      margin-inline-start: auto;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .takeover .notice-close {
      margin-inline-start: 0;
    }
    .notice-close {
      margin-inline-start: auto;
      flex: none;
      display: inline-flex;
      border: none;
      background: none;
      padding: 2px;
      border-radius: 50%;
      color: inherit;
      cursor: pointer;
    }
    /* breadcrumbs: the open tab at every level of nested decks. */
    .breadcrumbs ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2px;
      list-style: none;
      margin: 0;
      padding: 0 4px 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .breadcrumbs li {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }
    .breadcrumbs button {
      border: none;
      background: none;
      padding: 2px 4px;
      border-radius: 4px;
      font: inherit;
      color: var(--tabdeck-accent, var(--primary-color));
      cursor: pointer;
    }
    .breadcrumbs button:hover,
    .breadcrumbs button:focus-visible {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    .breadcrumbs [aria-current] {
      padding: 2px 4px;
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .crumb-sep {
      opacity: 0.6;
    }
    /* wizard: step counter, progress bar, Back / Next. */
    .wizard-head {
      padding: 12px 16px 4px;
    }
    .wizard-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }
    .wizard-title {
      font-size: 16px;
      font-weight: 500;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .wizard-count {
      flex-shrink: 0;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .wizard-subtitle {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .wizard-progress {
      margin-top: 8px;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color, rgba(127, 127, 127, 0.25));
      overflow: hidden;
    }
    .wizard-progress > div {
      height: 100%;
      border-radius: 3px;
      background: var(--tabdeck-accent, var(--primary-color));
      transition: width 0.25s ease;
    }
    .wizard-foot {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 4px 16px 12px;
    }
    .wizard-foot button {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      border: none;
      border-radius: 18px;
      padding: 8px 14px;
      min-height: 36px;
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .wizard-back {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      color: var(--primary-text-color);
    }
    .wizard-back[disabled] {
      visibility: hidden;
    }
    .wizard-next {
      background: var(--tabdeck-accent, var(--primary-color));
      color: var(--text-primary-color, #fff);
    }
    @media (prefers-reduced-motion: reduce) {
      .wizard-progress > div {
        transition: none;
      }
    }
    /* popup: one tab in a dialog over the page. */
    .popup-backdrop {
      position: fixed;
      inset: 0;
      z-index: 2147481000;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    }
    .popup-dialog {
      width: min(var(--tabdeck-popup-width, 640px), 100%);
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      overflow: hidden;
    }
    .popup-head {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 8px 8px 16px;
      min-height: 48px;
      box-sizing: border-box;
    }
    .popup-title {
      flex: 1;
      font-size: 17px;
      font-weight: 500;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .popup-close {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 8px;
      border-radius: 50%;
      display: inline-flex;
    }
    .popup-body {
      overflow-y: auto;
      padding: 0 8px 8px;
    }
    /* entity_search: a command palette over the page. */
    .es-backdrop {
      position: fixed;
      inset: 0;
      z-index: 2147482000;
      background: rgba(0, 0, 0, 0.32);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 12vh;
    }
    .es-panel {
      width: min(560px, calc(100vw - 32px));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 14px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      overflow: hidden;
    }
    .es-field {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      color: var(--secondary-text-color);
    }
    .es-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 16px;
    }
    .es-field kbd {
      font: 11px var(--code-font-family, monospace);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
    }
    .es-results {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding: 6px;
      max-height: 50vh;
      overflow-y: auto;
    }
    .es-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      text-align: start;
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
    }
    .es-item.active,
    .es-item:hover {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
    }
    .es-name {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .es-name small {
      color: var(--secondary-text-color);
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .es-tab {
      flex-shrink: 0;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 99px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .es-empty {
      padding: 12px;
      color: var(--secondary-text-color);
    }
    /* overview: every tab as a live thumbnail. */
    .overview {
      padding: 8px 12px 12px;
    }
    .ov-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
    }
    .ov-title {
      font-weight: 500;
      font-size: 15px;
    }
    .ov-close {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 6px;
      border-radius: 50%;
      display: inline-flex;
    }
    .ov-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--tabdeck-overview-min, 140px), 1fr));
      gap: 12px;
    }
    .ov-tile {
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
      min-width: 0;
      width: 100%;
    }
    .ov-frame {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      outline: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ov-tile.current .ov-frame {
      outline: 2px solid var(--tabdeck-accent, var(--primary-color));
    }
    .ov-tile:focus-visible {
      outline: none;
    }
    .ov-tile:focus-visible .ov-frame {
      outline: 3px solid var(--primary-color);
    }
    .ov-live {
      position: absolute;
      top: 0;
      left: 0;
      width: 300%;
      transform: scale(calc(1 / 3));
      transform-origin: 0 0;
      pointer-events: none;
    }
    .ov-lock {
      --mdc-icon-size: 32px;
      color: var(--secondary-text-color);
    }
    .ov-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      min-width: 0;
      --mdc-icon-size: 18px;
    }
    .ov-label span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* idle_dim: a full-screen layer over the whole dashboard. */
    .screensaver {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: none;
      touch-action: none;
      animation: tabdeck-saver-in 1.2s ease;
    }
    .screensaver.mode-black,
    .screensaver.mode-clock {
      background: #000;
    }
    .saver-clock {
      color: rgba(255, 255, 255, 0.85);
      text-align: center;
      font-variant-numeric: tabular-nums;
      user-select: none;
    }
    .saver-time {
      font-size: clamp(64px, 18vw, 220px);
      font-weight: 200;
      line-height: 1;
    }
    .saver-date {
      margin-top: 12px;
      font-size: clamp(16px, 3vw, 32px);
      opacity: 0.7;
    }
    @keyframes tabdeck-saver-in {
      from {
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .screensaver {
        animation: none;
      }
    }
    /* pip: a tab switched away from keeps its card in a corner window. */
    .panel.pip {
      position: fixed;
      inset-inline-end: var(--tabdeck-pip-right, 16px);
      bottom: calc(var(--tabdeck-pip-bottom, 16px) + env(safe-area-inset-bottom, 0px));
      z-index: 7;
      width: var(--tabdeck-pip-width, min(320px, 45vw));
      max-height: var(--tabdeck-pip-max-height, 40vh);
      overflow: hidden;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      animation: tabdeck-preview-in 150ms ease-out;
    }
    .root.docked .panel.pip {
      bottom: calc(var(--tabdeck-pip-bottom, 16px) + 72px + env(safe-area-inset-bottom, 0px));
    }
    /* The card inside is for looking at; a tap opens the tab. */
    .panel.pip > :not(.pip-bar) {
      pointer-events: none;
    }
    .pip-bar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .pip-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pip-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: none;
      color: inherit;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .pip-close:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    @media (prefers-reduced-motion: reduce) {
      .panel.pip {
        animation: none;
      }
    }
    /* compare: the open tab and the compared one side by side (stacked when
       narrow); the open tab first, everything else in the content full width. */
    .content.comparing {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--tabdeck-compare-min, 200px)), 1fr));
      gap: var(--tabdeck-compare-gap, 12px);
      align-items: start;
    }
    .content.comparing > :not(.panel) {
      grid-column: 1 / -1;
    }
    .content.comparing > .panel {
      order: 1;
      min-width: 0;
    }
    .content.comparing > .panel.compare {
      order: 2;
    }
    .compare-title {
      display: flex;
      align-items: center;
      gap: 6px;
      align-self: flex-start;
      width: fit-content;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0 0 8px;
      padding: 2px 4px 2px 10px;
      min-height: 28px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .compare-title.main {
      padding-inline-end: 10px;
      color: var(--tabdeck-accent, var(--primary-color));
      background: color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 14%, transparent);
    }
    .compare-title ha-icon {
      --mdc-icon-size: 16px;
    }
    .compare-title span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .compare-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: none;
      color: inherit;
      cursor: pointer;
    }
    .compare-close ha-icon {
      --mdc-icon-size: 16px;
    }
    .compare-close:hover {
      background: rgba(127, 127, 127, 0.2);
    }
    /* hold_peek: the held tab's content floats over the active one. */
    .panel.preview {
      position: absolute;
      top: 8px;
      inset-inline: 8px;
      z-index: 6;
      max-height: 70vh;
      overflow: hidden;
      padding: 8px;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      animation: tabdeck-preview-in 150ms ease-out;
    }
    .preview-title {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      padding: 0 4px 6px;
    }
    @keyframes tabdeck-preview-in {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .panel.preview {
        animation: none;
      }
    }
    /* swipe_peek: the neighbour panel shown beside the dragged one. */
    .content.dragging {
      overflow: hidden;
      touch-action: pan-y;
    }
    .panel.peek[hidden] {
      display: block;
      position: absolute;
      inset-inline: 0;
      pointer-events: none;
    }
    .content.has-bg > .panel.peek {
      inset-inline: 12px;
    }
    .content.with-arrows > .panel.peek {
      inset-inline: var(--tabdeck-arrow-gutter, 40px);
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
