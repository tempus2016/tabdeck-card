import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { dropIndex } from "../lib/customize";
import { barWindow } from "../lib/bar-window";
import { defineOnce } from "../lib/define";
import { contrastRatio, parseRgb, readableText } from "../lib/color";
import { reducedMotion, reducedMotionCss } from "../lib/motion";
import { cssUrl, gradientColors, imageColor, type Rgb } from "../lib/image-color";
import type { BadgeDisplay, TabAlign, TabDisplay, TabPosition, TabStyle } from "../lib/config";
import { computeIndicatorRect, liquidKeyframes, type IndicatorRect } from "../lib/indicator";
import { LanguageController, localize } from "../lib/i18n";
import { fadeEdges, fadeMask } from "../lib/bar-fade";
import "./tabdeck-tab";
import { isActiveBadge, type ExtraBadge } from "./tabdeck-tab";

interface TabItem {
  name?: string;
  subtitle?: string;
  icon?: string;
  accent?: string;
  color?: string;
  badge?: string;
  badgeColor?: string;
  disabled?: boolean;
  holdAction?: boolean;
  badgeAction?: boolean;
  // A double tap fires an action; a single tap selects after DOUBLE_TAP_MS.
  doubleTap?: boolean;
  alert?: boolean;
  // Tap runs an action instead of selecting (navigation tab).
  action?: boolean;
  // Hidden tab revealed in edit mode.
  ghost?: boolean;
  // Floating action button style.
  fab?: boolean;
  // Progress ring around the icon (0–100) and its colour.
  ring?: number;
  ringColor?: string;
  ringStyle?: "bar";
  // Mini graph: polyline points (44 × 12) and colour.
  graph?: string;
  graphColor?: string;
  // Icon shown as the badge.
  badgeIcon?: string;
  // More badges after the main one.
  badges?: ExtraBadge[];
  // badge_bounce (off while a countdown ticks).
  bounce?: boolean;
  // Hover summary (tooltip).
  tooltip?: string;
  picture?: string;
  iconAnimation?: string;
  font?: { size?: string; weight?: string; family?: string };
  // Grouped tab: its children, picked from a dropdown on the tab.
  menu?: { name?: string; icon?: string }[];
  // changed_dot: changed since this browser last showed the tab.
  changed?: boolean;
  // health_dim: most of the tab's entities are unavailable.
  unhealthy?: boolean;
  // debug: speed: draw time in ms.
  speed?: number;
  // A line or a flexible space drawn before the tab.
  separator?: "line" | "space";
}

const HOLD_MS = 500;
// drag_reorder: a touch drag starts after holding a tab this long (moving
// sooner scrolls the bar); a mouse drag after moving this many px.
const DRAG_HOLD_MS = 300;
const DRAG_SLOP = 8;
// Second tap within this window counts as a double tap.
export const DOUBLE_TAP_MS = 250;

@defineOnce("tabdeck-tabbar")
export class TabdeckTabbar extends LitElement {
  // Redraws once a non-English language chunk arrives.
  protected readonly _language = new LanguageController(this);
  @property({ attribute: false }) items: TabItem[] = [];
  @property({ type: Number }) selected = 0;
  @property() position: TabPosition = "top";
  @property() tabStyle: TabStyle = "underline";
  @property() display: TabDisplay = "both";
  @property() align: TabAlign = "start";
  @property() badgeDisplay: BadgeDisplay = "text";
  @property() scrollable: "auto" | boolean = "auto";
  @property({ type: Boolean }) animated = true;
  // When true, the moving indicator (and bar) adopt the selected tab's accent.
  @property({ type: Boolean }) accentIndicator = true;
  // Underline indicator thickness in px.
  @property({ type: Number }) indicatorSize = 3;
  // Optional override for the pill/segmented/boxed indicator corner radius (px).
  @property({ type: Number }) indicatorRadius?: number;
  // When true, the bar stays pinned (position: sticky) while content scrolls.
  @property({ type: Boolean }) sticky = false;
  // Raise the bar with a subtle shadow.
  @property({ type: Boolean }) elevation = false;
  // Show ‹ › buttons to scroll an overflowing horizontal bar.
  @property({ type: Boolean }) scrollButtons = false;
  // Show a ⋯ menu (jump-to-tab list) when an overflowing horizontal bar can't
  // fit all tabs.
  @property({ type: Boolean }) overflowMenu = false;
  // bar_fade: fade the edge(s) of an overflowing horizontal bar that have more tabs.
  @property({ type: Boolean }) fade = false;
  // bar_limit: draw at most this many tabs (a page around the selected one);
  // the ⋯ menu lists every tab. 0 = all.
  @property({ type: Number }) limit = 0;

  // The [start, end) item range drawn in the bar.
  private get _window(): [number, number] {
    return barWindow(this.items.length, this.selected, this.limit);
  }

  // The <tabdeck-tab> drawn for item `index` (undefined when it's off the page).
  private _tabEl(index: number): HTMLElement | undefined {
    const [start, end] = this._window;
    if (index < start || index >= end) return undefined;
    return (this.renderRoot as ParentNode).querySelectorAll("tabdeck-tab")[index - start] as HTMLElement | undefined;
  }
  @state() private _menuOpen = false;
  // hidden_alerts: the ⋯ button counts tabs off the bar that need attention.
  @property({ type: Boolean }) hiddenAlerts = false;
  @state() private _hiddenCount = 0;
  // summary_chip: a chip at the end of the bar.
  // null: configured but nothing to show (keeps the layout steady).
  @property({ attribute: false }) summary?: { text: string; icon?: string; color?: string } | null;
  // Index of the grouped tab whose child menu is open (-1 = none).
  @state() private _groupOpen = -1;
  private _groupLeft = 0;
  // Deck content is folded away (collapsible): dims the indicator.
  @property({ type: Boolean, reflect: true }) collapsed = false;
  // Accessible name for the tablist (defaults to a localised "Tabs").
  @property() barLabel?: string;
  // UI language for built-in strings (aria labels, menu, tooltips).
  @property() language = "en";
  // Optional custom bar background colour.
  @property() barBackground?: string;
  // Right-to-left layout: arrow keys, scroll buttons, side-bar edges and
  // drag-reorder are mirrored (CSS uses logical properties).
  @property({ attribute: false }) rtl = false;
  // liquid_indicator: the marker stretches to the new tab, then settles.
  @property({ type: Boolean }) liquid = false;
  private _lastRect?: IndicatorRect;
  private _lastSel = -1;
  // bar_text: auto (work it out from the bar background) | light | dark.
  @property() barText?: "auto" | "light" | "dark";
  // The sampled colour of a bar_background picture (bar_text: auto).
  @state() private _picRgb?: Rgb;
  private _picUrl?: string;
  // glass: frosted bar and menus, blur in px.
  @property({ attribute: false }) glass?: number;
  // compact | default | comfortable (reflected for the CSS).
  @property({ reflect: true }) density = "default";
  // Vertical bars only: icons until hovered / focused, then labels too. The
  // expanded rail overlays the content instead of pushing it aside.
  @property({ type: Boolean }) railExpand = false;
  @state() private _railOpen = false;
  // A ⚙ button that lets the person reorder / hide tabs (customize).
  @property({ type: Boolean }) customizable = false;
  // Every tab in the person's order: { name, icon, key, hidden }.
  @property({ attribute: false }) customItems: { name?: string; icon?: string; key?: string; hidden?: boolean }[] = [];
  @state() private _customOpen = false;
  // A 🔍 button that opens a quick-switch filter over the tabs.
  @property({ type: Boolean }) searchable = false;
  // A full-screen button after the tabs (fires tabdeck-fullscreen).
  @property({ type: Boolean }) expandable = false;
  // A grid button that opens the overview of every tab (fires tabdeck-overview).
  @property({ type: Boolean }) overviewable = false;
  // A button that opens the dashboard search (fires tabdeck-entity-search).
  @property({ type: Boolean }) entitySearchable = false;
  // last_tab_button: a swap button naming the tab to go back to (fires
  // tabdeck-last). Undefined: no button (or nothing to go back to yet).
  @property({ attribute: false }) lastTab?: { name?: string; icon?: string };
  // share_button: a button that asks for a link to the open tab (fires
  // tabdeck-share); the card answers with shareInfo, shown in a panel.
  @property({ type: Boolean }) shareable = false;
  @property({ attribute: false }) shareInfo?: { url: string; copied: boolean; qrPath?: string; qrSize?: number };
  // drag_reorder: tabs can be dragged along the bar (fires tabdeck-reorder
  // { from, to, after } with visible indices).
  @property({ type: Boolean }) reorderable = false;
  // Where a dragged tab would land: before/after the tab at this index.
  @state() private _dropAt?: { index: number; after: boolean };
  @state() private _searchOpen = false;
  @state() private _query = "";
  @state() private _active = 0;
  // Pinned to the bottom of the viewport, phone-navigation style.
  @property({ type: Boolean, reflect: true }) dock = false;
  // bar_autohide: the bar may slide out of view (`autohidden` hides it).
  @property({ type: Boolean, reflect: true }) autohide = false;
  @property({ type: Boolean }) autohidden = false;

  // Becomes true one frame after the first paint, so the indicator's initial
  // placement never slides in from the corner; only later moves animate.
  @state() private _ready = false;
  // True when a horizontal bar overflows and scroll buttons should show.
  @state() private _overflow = false;

  private _resizeObserver?: ResizeObserver;
  private _resizeRaf = 0;

  // tooltip: shown after a mouse rests on a tab (or keyboard focus lands on
  // it), at a fixed spot beside the tab; never on touch, gone on press.
  @state() private _tip?: { text: string; x: number; y: number; place: string };
  private _tipTimer?: ReturnType<typeof setTimeout>;

  private _tipStart(index: number, e: Event, delay = 500): void {
    this._tipEnd();
    const text = this.items[index]?.tooltip;
    if (!text || (e as PointerEvent).pointerType === "touch") return;
    const target = e.currentTarget as HTMLElement;
    this._tipTimer = setTimeout(() => {
      const r = target.getBoundingClientRect();
      // Beside a side bar, on the content's side (mirrored in RTL).
      const side = this.position === "left" || this.position === "right" ? (this.position === "left") !== this.rtl ? "right" : "left" : undefined;
      const place = this.dock || this.position === "bottom" ? "above" : side ?? "below";
      this._tip = {
        text,
        place,
        x: place === "right" ? r.right + 6 : place === "left" ? r.left - 6 : r.left + r.width / 2,
        y: place === "below" ? r.bottom + 6 : place === "above" ? r.top - 6 : r.top + r.height / 2,
      };
      window.addEventListener("keydown", this._tipKey);
      window.addEventListener("scroll", this._tipEnd, { capture: true, once: true });
    }, delay);
  }

  private _tipEnd = (): void => {
    clearTimeout(this._tipTimer);
    if (!this._tip) return;
    this._tip = undefined;
    window.removeEventListener("keydown", this._tipKey);
    window.removeEventListener("scroll", this._tipEnd, { capture: true });
  };

  private _tipKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") this._tipEnd();
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.setAttribute("aria-label", this.barLabel || localize(this.language, "card.tabs"));
    // HA builds cards before they're in the page, where nothing has a
    // computed colour yet: measure the bar background again once shown.
    if (this.barText === "auto") requestAnimationFrame(() => this._applyBarText());
    this.addEventListener("keydown", this._onKeydown);
    this.addEventListener("mouseenter", this._railEnter);
    this.addEventListener("mouseleave", this._railLeave);
    this.addEventListener("focusin", this._railEnter);
    this.addEventListener("focusout", this._railFocusOut);
    if (typeof ResizeObserver !== "undefined") {
      // Debounce resize work to one reposition per animation frame.
      this._resizeObserver = new ResizeObserver(() => {
        if (this._resizeRaf) return;
        this._resizeRaf = requestAnimationFrame(() => {
          this._resizeRaf = 0;
          this._position();
        });
      });
    }
  }

  disconnectedCallback(): void {
    this._dragEnd();
    this._tipEnd();
    window.removeEventListener("pointerdown", this._onShareOutside, true);
    this.removeEventListener("keydown", this._onKeydown);
    window.removeEventListener("pointerdown", this._onOutside, true);
    window.removeEventListener("pointerdown", this._onSearchOutside, true);
    window.removeEventListener("pointerdown", this._onCustomOutside, true);
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  private get _railActive(): boolean {
    return this.railExpand && !this._horizontal;
  }

  private _railEnter = (): void => {
    if (this._railActive) this._railOpen = true;
  };

  private _railLeave = (): void => {
    if (this._railActive && !this.matches(":focus-within")) this._railOpen = false;
  };

  private _railFocusOut = (e: FocusEvent): void => {
    if (!this._railActive) return;
    const to = e.relatedTarget as Node | null;
    if (!to || !this.contains(to)) {
      if (!this.matches(":hover")) this._railOpen = false;
    }
  };

  private _select(index: number): void {
    this.dispatchEvent(
      new CustomEvent("tabdeck-select", {
        detail: { index },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // Long-press support: when a tab has a hold action, a press held for HOLD_MS
  // fires "tabdeck-action" and suppresses the click so it doesn't also select.
  private _holdTimer?: ReturnType<typeof setTimeout>;
  private _suppressClick = false;

  private _emitAction(index: number, kind: "hold" | "badge" | "double_tap"): void {
    this.dispatchEvent(
      new CustomEvent("tabdeck-action", {
        detail: { index, kind },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onPointerDown(index: number, e?: PointerEvent): void {
    this._suppressClick = false;
    if (this.reorderable && e) this._dragStart(index, e);
    if (!this.items[index]?.holdAction) return;
    this._holdTimer = setTimeout(() => {
      // The hold action wins over a drag that hasn't started yet.
      if (this._drag && !this._drag.active) this._dragEnd();
      this._suppressClick = true;
      this._emitAction(index, "hold");
    }, HOLD_MS);
  }

  // --- drag_reorder -------------------------------------------------------------
  private _drag?: {
    index: number;
    x: number;
    y: number;
    touch: boolean;
    held: boolean;
    active: boolean;
    el: HTMLElement;
    timer?: ReturnType<typeof setTimeout>;
  };

  private _dragStart(index: number, e: PointerEvent): void {
    if (e.button > 0) return;
    const touch = e.pointerType === "touch" || e.pointerType === "pen";
    const el = e.currentTarget as HTMLElement;
    this._dragEnd();
    const drag = { index, x: e.clientX, y: e.clientY, touch, held: !touch, active: false, el } as NonNullable<typeof this._drag>;
    if (touch) drag.timer = setTimeout(() => (drag.held = true), DRAG_HOLD_MS);
    this._drag = drag;
    window.addEventListener("pointermove", this._dragMove, true);
    window.addEventListener("pointerup", this._dragUp, true);
    window.addEventListener("pointercancel", this._dragCancel, true);
    window.addEventListener("keydown", this._dragKey, true);
    // Only a non-passive touchmove can stop the bar from scrolling meanwhile.
    window.addEventListener("touchmove", this._dragTouchMove, { passive: false, capture: true });
  }

  private _dragTouchMove = (e: TouchEvent): void => {
    if (this._drag?.held && e.cancelable) e.preventDefault();
  };

  private _dragMove = (e: PointerEvent): void => {
    const d = this._drag;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.active) {
      if (Math.hypot(dx, dy) < DRAG_SLOP) return;
      // A touch that moves before the hold is a scroll of the bar.
      if (!d.held) return this._dragEnd();
      d.active = true;
      this._cancelHold();
      d.el.classList.add("dragging");
    }
    e.preventDefault();
    const horizontal = this._horizontal;
    // RTL: tabs run right to left, so measure from the right (negated x).
    const flip = horizontal && this.rtl ? -1 : 1;
    d.el.style.transform = `${horizontal ? `translateX(${dx}px)` : `translateY(${dy}px)`} rotate(-2deg)`;
    const tabs = [...this.renderRoot.querySelectorAll("tabdeck-tab")] as HTMLElement[];
    const rects = tabs.map((t) => {
      const r = t.getBoundingClientRect();
      // The dragged tab is measured where it started, not where it's drawn.
      const shift = t === d.el ? (horizontal ? dx : dy) : 0;
      if (!horizontal) return { start: r.top - shift, end: r.bottom - shift };
      return flip < 0 ? { start: -(r.right - shift), end: -(r.left - shift) } : { start: r.left - shift, end: r.right - shift };
    });
    const at = dropIndex(rects, horizontal ? e.clientX * flip : e.clientY);
    this._dropAt = at && { ...at, index: at.index + this._window[0] };
  };

  private _dragUp = (): void => {
    const d = this._drag;
    const at = this._dropAt;
    if (d?.active) {
      // The click that follows the release must not select.
      this._suppressClick = true;
      if (at && at.index !== d.index) {
        this.dispatchEvent(
          new CustomEvent("tabdeck-reorder", { detail: { from: d.index, to: at.index, after: at.after }, bubbles: true, composed: true }),
        );
      }
    }
    this._dragEnd();
  };

  private _dragCancel = (): void => this._dragEnd();

  private _dragKey = (e: KeyboardEvent): void => {
    if (e.key !== "Escape" || !this._drag?.active) return;
    e.preventDefault();
    e.stopPropagation();
    this._suppressClick = true;
    this._dragEnd();
  };

  private _dragEnd(): void {
    const d = this._drag;
    this._drag = undefined;
    this._dropAt = undefined;
    window.removeEventListener("pointermove", this._dragMove, true);
    window.removeEventListener("pointerup", this._dragUp, true);
    window.removeEventListener("pointercancel", this._dragCancel, true);
    window.removeEventListener("keydown", this._dragKey, true);
    window.removeEventListener("touchmove", this._dragTouchMove, true);
    if (!d) return;
    if (d.timer) clearTimeout(d.timer);
    d.el.classList.remove("dragging");
    d.el.style.transform = "";
  }

  private _cancelHold(): void {
    if (this._holdTimer) clearTimeout(this._holdTimer);
    this._holdTimer = undefined;
  }

  private _onTabClick(index: number, e?: Event): void {
    this._cancelHold();
    if (this._suppressClick) {
      this._suppressClick = false;
      return;
    }
    if (this.items[index]?.doubleTap) {
      // Hold the select briefly: a second tap turns it into the action.
      if (this._tapTimer && this._tapIndex === index) {
        clearTimeout(this._tapTimer);
        this._tapTimer = undefined;
        this._emitAction(index, "double_tap");
        return;
      }
      if (this._tapTimer) clearTimeout(this._tapTimer);
      this._tapIndex = index;
      const target = e?.currentTarget as HTMLElement | undefined;
      this._tapTimer = setTimeout(() => {
        this._tapTimer = undefined;
        this._activate(index, target);
      }, DOUBLE_TAP_MS);
      return;
    }
    this._activate(index, e?.currentTarget as HTMLElement | undefined);
  }

  private _tapTimer?: ReturnType<typeof setTimeout>;
  private _tapIndex = -1;

  private _activate(index: number, target?: HTMLElement): void {
    if (this.items[index]?.menu?.length) {
      this._toggleGroup(index, target);
      return;
    }
    this._select(index);
  }

  // --- customize panel ------------------------------------------------------
  private _emitCustomize(detail: { order?: string[]; hidden?: string[]; reset?: boolean }): void {
    this.dispatchEvent(new CustomEvent("tabdeck-customize", { detail, bubbles: true, composed: true }));
  }

  private _customLayout(items = this.customItems) {
    return {
      order: items.map((i) => i.key).filter((k): k is string => k !== undefined),
      hidden: items.filter((i) => i.hidden && i.key !== undefined).map((i) => i.key!),
    };
  }

  private _moveCustom(i: number, dir: -1 | 1): void {
    const items = this.customItems.slice();
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    this._emitCustomize(this._customLayout(items));
  }

  private _toggleCustomHidden(i: number): void {
    const items = this.customItems.map((it, k) => (k === i ? { ...it, hidden: !it.hidden } : it));
    // Keep at least one tab visible.
    if (items.every((it) => it.hidden)) return;
    this._emitCustomize(this._customLayout(items));
  }

  private _onCustomOutside = (e: Event): void => {
    const panel = (this.renderRoot as ParentNode).querySelector(".custom-panel");
    const btn = (this.renderRoot as ParentNode).querySelector(".custom-btn");
    const path = e.composedPath();
    if ((panel && path.includes(panel)) || (btn && path.includes(btn))) return;
    this._closeCustom();
  };

  private _openCustom(): void {
    this._customOpen = true;
    window.addEventListener("pointerdown", this._onCustomOutside, true);
  }

  private _closeCustom(): void {
    this._customOpen = false;
    window.removeEventListener("pointerdown", this._onCustomOutside, true);
  }

  private _renderCustom() {
    const lang = this.language;
    const t = (k: string, v?: Record<string, string>) => localize(lang, k, v);
    const n = this.customItems.length;
    return html`<div
      class="custom-panel"
      role="dialog"
      aria-label=${t("card.customize")}
      @keydown=${(e: KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === "Escape") this._closeCustom();
      }}
    >
      <div class="custom-title">${t("card.customize")}</div>
      ${this.customItems.map(
        (it, i) => html`<div class="custom-row ${it.hidden ? "is-hidden" : ""}">
          ${it.icon ? html`<ha-icon .icon=${it.icon}></ha-icon>` : html`<span class="custom-noicon"></span>`}
          <span class="custom-name">${it.name ?? ""}</span>
          <button class="custom-up" ?disabled=${i === 0} aria-label=${t("card.move_up", { name: it.name ?? "" })} @click=${() => this._moveCustom(i, -1)}>↑</button>
          <button class="custom-down" ?disabled=${i === n - 1} aria-label=${t("card.move_down", { name: it.name ?? "" })} @click=${() => this._moveCustom(i, 1)}>↓</button>
          <button
            class="custom-eye"
            aria-pressed=${it.hidden ? "false" : "true"}
            aria-label=${t(it.hidden ? "card.show_tab" : "card.hide_tab", { name: it.name ?? "" })}
            @click=${() => this._toggleCustomHidden(i)}
          >
            <ha-icon .icon=${it.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
          </button>
        </div>`,
      )}
      <div class="custom-actions">
        <button class="custom-reset" @click=${() => this._emitCustomize({ reset: true })}>${t("card.reset")}</button>
        <button class="custom-done" @click=${() => this._closeCustom()}>${t("card.done")}</button>
      </div>
    </div>`;
  }

  // --- quick-switch search -------------------------------------------------
  // Case- and accent-insensitive match on name and subtitle; disabled tabs
  // can't be opened, so they're left out.
  private _matches(query: string): { index: number; item: TabItem }[] {
    const norm = (s?: string) =>
      (s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const q = norm(query).trim();
    return this.items
      .map((item, index) => ({ index, item }))
      .filter(({ item }) => !item.disabled)
      .filter(({ item }) => !q || norm(item.name).includes(q) || norm(item.subtitle).includes(q));
  }

  openSearch(): void {
    this._query = "";
    this._active = 0;
    this._searchOpen = true;
    window.addEventListener("pointerdown", this._onSearchOutside, true);
    this.updateComplete.then(() =>
      ((this.renderRoot as ParentNode).querySelector(".search-input") as HTMLInputElement | null)?.focus(),
    );
  }

  private _closeSearch(): void {
    this._searchOpen = false;
    window.removeEventListener("pointerdown", this._onSearchOutside, true);
  }

  // --- share_button panel ----------------------------------------------------------
  private _renderShare(info: { url: string; copied: boolean; qrPath?: string; qrSize?: number }) {
    const t = (key: string) => localize(this.language, key);
    return html`<div class="share-panel" role="dialog" aria-label=${t("card.share")}>
      <div class="share-status ${info.copied ? "ok" : ""}">
        ${info.copied ? html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>` : ""}
        ${t(info.copied ? "card.link_copied" : "card.copy_link")}
      </div>
      <input class="share-url" readonly .value=${info.url} @focus=${(e: Event) => (e.target as HTMLInputElement).select()} />
      ${info.qrPath
        ? html`<svg class="share-qr" viewBox="0 0 ${info.qrSize} ${info.qrSize}" role="img" aria-label=${t("card.scan_qr")} shape-rendering="crispEdges">
              <rect width="100%" height="100%" fill="#fff"></rect>
              <path d=${info.qrPath} fill="#000"></path>
            </svg>
            <div class="share-caption">${t("card.scan_qr")}</div>`
        : ""}
    </div>`;
  }

  private _onShareOutside = (e: Event): void => {
    const root = this.renderRoot as ParentNode;
    const path = e.composedPath();
    const panel = root.querySelector(".share-panel");
    const btn = root.querySelector(".share-btn");
    if ((panel && path.includes(panel)) || (btn && path.includes(btn))) return;
    this.dispatchEvent(new CustomEvent("tabdeck-share-close", { bubbles: true, composed: true }));
  };

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has("shareInfo")) {
      window.removeEventListener("pointerdown", this._onShareOutside, true);
      if (this.shareInfo) window.addEventListener("pointerdown", this._onShareOutside, true);
    }
  }

  private _onSearchOutside = (e: Event): void => {
    const panel = (this.renderRoot as ParentNode).querySelector(".search-panel");
    const btn = (this.renderRoot as ParentNode).querySelector(".search-btn");
    const path = e.composedPath();
    if ((panel && path.includes(panel)) || (btn && path.includes(btn))) return;
    this._closeSearch();
  };

  private _pickSearch(index: number): void {
    this._closeSearch();
    this._select(index);
  }

  private _onSearchKeydown(e: KeyboardEvent): void {
    // Keep arrows/Home/End from also driving the tablist.
    e.stopPropagation();
    const matches = this._matches(this._query);
    if (e.key === "Escape") {
      this._closeSearch();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const m = matches[this._active] ?? matches[0];
      if (m) this._pickSearch(m.index);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = matches.length || 1;
      this._active = (this._active + (e.key === "ArrowDown" ? 1 : -1) + n) % n;
    }
  }

  private _renderSearch() {
    const matches = this._matches(this._query);
    const lang = this.language;
    return html`<div class="search-panel" role="dialog" aria-label=${localize(lang, "card.search")}>
      <input
        class="search-input"
        type="search"
        placeholder=${localize(lang, "card.search_placeholder")}
        aria-label=${localize(lang, "card.search")}
        .value=${this._query}
        @input=${(e: Event) => {
          this._query = (e.target as HTMLInputElement).value;
          this._active = 0;
        }}
        @keydown=${(e: KeyboardEvent) => this._onSearchKeydown(e)}
      />
      <div class="search-results" role="listbox">
        ${matches.length
          ? matches.map(
              (m, i) => html`<button
                class="group-item ${i === this._active ? "active" : ""}"
                role="option"
                aria-selected=${i === this._active ? "true" : "false"}
                @click=${() => this._pickSearch(m.index)}
              >
                ${m.item.icon ? html`<ha-icon .icon=${m.item.icon}></ha-icon>` : ""}<span>${m.item.name ?? ""}</span>
              </button>`,
            )
          : html`<div class="search-empty">${localize(lang, "card.search_none")}</div>`}
      </div>
    </div>`;
  }

  // --- grouped-tab menu -----------------------------------------------------
  private _toggleGroup(index: number, tab?: HTMLElement): void {
    if (this._groupOpen === index) {
      this._closeGroup();
      return;
    }
    const bar = (this.renderRoot as ParentNode).querySelector(".bar") as HTMLElement | null;
    this._groupLeft = tab ? tab.offsetLeft - (bar?.scrollLeft ?? 0) : 0;
    this._groupOpen = index;
    window.addEventListener("pointerdown", this._onOutside, true);
    this.updateComplete.then(() =>
      ((this.renderRoot as ParentNode).querySelector(".group-item") as HTMLElement | null)?.focus(),
    );
  }

  private _closeGroup(): void {
    this._groupOpen = -1;
    window.removeEventListener("pointerdown", this._onOutside, true);
  }

  private _onOutside = (e: Event): void => {
    const menu = (this.renderRoot as ParentNode).querySelector(".group-menu");
    if (menu && e.composedPath().includes(menu)) return;
    // A press on the group's own tab is handled by its click (toggle).
    const tab = this._tabEl(this._groupOpen);
    if (tab && e.composedPath().includes(tab)) return;
    this._closeGroup();
  };

  private _pickChild(index: number, child: string | undefined): void {
    this._closeGroup();
    this.dispatchEvent(
      new CustomEvent("tabdeck-select", {
        detail: { index, child },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onGroupKeydown(e: KeyboardEvent): void {
    const items = [...(this.renderRoot as ParentNode).querySelectorAll(".group-item")] as HTMLElement[];
    const i = items.indexOf(e.composedPath()[0] as HTMLElement);
    if (e.key === "Escape") {
      e.stopPropagation();
      const tab = this._tabEl(this._groupOpen);
      this._closeGroup();
      tab?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      const n = items.length;
      items[(i + (e.key === "ArrowDown" ? 1 : -1) + n) % n]?.focus();
    }
  }

  private _renderGroupMenu() {
    const item = this.items[this._groupOpen];
    if (!item?.menu) return "";
    const index = this._groupOpen;
    return html`<div
      class="group-menu"
      role="menu"
      style="left:${this._groupLeft}px"
      @keydown=${(e: KeyboardEvent) => this._onGroupKeydown(e)}
    >
      ${item.menu.map(
        (c) => html`<button class="group-item" role="menuitem" @click=${() => this._pickChild(index, c.name)}>
          ${c.icon ? html`<ha-icon .icon=${c.icon}></ha-icon>` : ""}<span>${c.name ?? ""}</span>
        </button>`,
      )}
    </div>`;
  }

  // Arrow/Home/End only land on real panels: not disabled, not action tabs
  // (arrowing onto a navigate tab would otherwise leave the page).
  private _selectable(index: number): boolean {
    const item = this.items[index];
    return !!item && !item.disabled && !item.action;
  }

  // Step from `from` in `dir` (+1/-1), wrapping, skipping disabled tabs. Returns
  // the original index if every other tab is disabled.
  private _step(from: number, dir: number): number {
    const n = this.items.length;
    for (let i = 1; i <= n; i++) {
      const idx = (from + dir * i + n * i) % n;
      if (this._selectable(idx)) return idx;
    }
    return from;
  }

  private _firstEnabled(fromEnd = false): number {
    const n = this.items.length;
    for (let i = 0; i < n; i++) {
      const idx = fromEnd ? n - 1 - i : i;
      if (this._selectable(idx)) return idx;
    }
    return 0;
  }

  private _onKeydown = (e: KeyboardEvent): void => {
    const vertical = this.position === "left" || this.position === "right";
    // In RTL the next tab is to the left.
    const next = vertical ? "ArrowDown" : this.rtl ? "ArrowLeft" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : this.rtl ? "ArrowRight" : "ArrowLeft";
    let target: number | null = null;
    if (e.key === next) target = this._step(this.selected, 1);
    else if (e.key === prev) target = this._step(this.selected, -1);
    else if (e.key === "Home") target = this._firstEnabled();
    else if (e.key === "End") target = this._firstEnabled(true);
    if (target !== null) {
      e.preventDefault();
      this._select(target);
      // bar_limit: the target may be on another page, drawn by a different
      // element; keep the keyboard focus on it once the bar has redrawn.
      const t = target;
      if (this.limit > 0) setTimeout(() => this._tabEl(t)?.focus(), 0);
    }
  };

  // Measure the selected tab and write the indicator's box inline. Guards for
  // jsdom / pre-layout (offset* == 0) by hiding the indicator instead of moving
  // it to (0,0).
  // Mask the bar's edges that have more tabs beyond them. Set on the element
  // (not in render) so scrolling doesn't re-render the bar; data-fade names
  // the faded edges ("start", "end", "start end").
  private _fadeMask = "";
  private _updateFade(): void {
    const bar = (this.renderRoot as ParentNode | undefined)?.querySelector(".bar") as HTMLElement | null;
    if (!bar) return;
    const edges = this.fade && this._horizontal && !this.dock ? fadeEdges(bar.scrollLeft, bar.clientWidth, bar.scrollWidth) : { start: false, end: false };
    const mask = fadeMask(edges, this.rtl);
    const names = [edges.start && "start", edges.end && "end"].filter(Boolean).join(" ");
    // A re-render can replace the bar's style attribute: check it too.
    if (mask === this._fadeMask && (bar.dataset.fade ?? "") === names && bar.style.cssText.includes("mask-image") === !!mask) return;
    this._fadeMask = mask;
    if (names) bar.dataset.fade = names;
    else delete bar.dataset.fade;
    if (mask) {
      bar.style.setProperty("mask-image", mask);
      bar.style.setProperty("-webkit-mask-image", mask);
    } else {
      bar.style.removeProperty("mask-image");
      bar.style.removeProperty("-webkit-mask-image");
    }
  }

  private _onBarScroll = (): void => {
    if (this.hiddenAlerts) this._countHidden();
    this._updateFade();
  };

  private _position(): void {
    this._updateFade();
    const root = this.renderRoot as ParentNode | undefined;
    const indicator = root?.querySelector(".indicator") as HTMLElement | null;
    if (!indicator) return;
    // Address the selected tab by index — `this.selected` is the source of
    // truth. Don't query `[selected]`: each child reflects that attribute in its
    // own async update, which runs after this parent's updated(), so at this
    // point the attribute can still sit on the previously-selected tab.
    const tab = this._tabEl(this.selected);
    const rect = tab
      ? computeIndicatorRect(
          {
            offsetLeft: tab.offsetLeft,
            offsetTop: tab.offsetTop,
            offsetWidth: tab.offsetWidth,
            offsetHeight: tab.offsetHeight,
          },
          this.position,
          this.tabStyle,
          this.indicatorSize,
          this.rtl,
        )
      : null;
    if (!rect) {
      indicator.style.opacity = "0";
      return;
    }
    this._liquidMove(indicator, rect);
    indicator.style.left = `${rect.left}px`;
    indicator.style.top = `${rect.top}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.height = `${rect.height}px`;
    indicator.style.opacity = "1";
  }

  // liquid_indicator: play the stretch when the selection moves (not on a
  // resize or a re-measure), unless motion is off or reduced.
  private _liquidMove(indicator: HTMLElement, rect: IndicatorRect): void {
    const from = this._lastRect;
    const moved = this._lastSel >= 0 && this._lastSel !== this.selected;
    this._lastRect = rect;
    this._lastSel = this.selected;
    if (!this.liquid || !moved || !from || !this.animated || !this._ready || typeof indicator.animate !== "function") return;
    if (reducedMotion()) return;
    const squash = this.tabStyle === "underline" ? 0.6 : 0.85;
    indicator.animate(liquidKeyframes(from, rect, !this._horizontal, squash), {
      duration: 420,
      easing: "cubic-bezier(0.3, 0.7, 0.2, 1)",
    });
  }

  // Push the selected tab's accent onto the host as --tabdeck-accent so the
  // moving indicator (a sibling of the tabs) takes that colour. Off → fall back
  // to the theme primary colour.
  // A solid indicator (e.g. the bubble preset) gets readable selected text:
  // black or white, unless --tabdeck-selected-color says otherwise. Tinted
  // (translucent) indicators keep the accent-coloured text.
  private _applyReadableSelected(): void {
    const indicator = this.renderRoot?.querySelector?.(".indicator") as HTMLElement | null;
    // Only pill and boxed: their default indicator is a translucent tint, so a
    // solid one was asked for. (Segmented's is the card colour, behind
    // accent-coloured text, and stays that way.)
    const bg = indicator && ["pill", "boxed"].includes(this.tabStyle) ? getComputedStyle(indicator).backgroundColor : "";
    const solid = /^rgb\(/.test(bg) || /^rgba\(.*,\s*1\)$/.test(bg);
    const text = solid ? readableText(bg) : undefined;
    if (text) this.style.setProperty("--tabdeck-selected-auto", text);
    else this.style.removeProperty("--tabdeck-selected-auto");
  }

  private _applyAccent(): void {
    const accent = this.accentIndicator
      ? this.items[this.selected]?.accent
      : undefined;
    if (accent) this.style.setProperty("--tabdeck-accent", accent);
    else this.style.removeProperty("--tabdeck-accent");
    if (this.indicatorRadius != null) {
      this.style.setProperty("--tabdeck-indicator-radius", `${this.indicatorRadius}px`);
    } else {
      this.style.removeProperty("--tabdeck-indicator-radius");
    }
  }

  // The bar background's colour for bar_text: a hint, a sampled picture, a
  // gradient's average or a solid colour; undefined when it can't be told
  // (transparent, color-mix, a picture still loading or unreadable).
  private _barRgb(): number[] | undefined {
    if (this.barText === "light") return [24, 24, 24];
    if (this.barText === "dark") return [240, 240, 240];
    if (this.barText !== "auto") return undefined;
    const url = cssUrl(this.barBackground);
    if (url) {
      if (url !== this._picUrl) {
        this._picUrl = url;
        this._picRgb = undefined;
        // Never blocks the render: the colour lands in a later update.
        imageColor(url).then((rgb) => {
          if (this._picUrl === url) this._picRgb = rgb;
        });
      }
      return this._picRgb;
    }
    this._picUrl = undefined;
    const bar = this.renderRoot?.querySelector?.(".bar");
    if (!bar || !this.barBackground) return undefined;
    const cs = getComputedStyle(bar);
    const stops = gradientColors(cs.backgroundImage || "");
    if (stops.length) return [0, 1, 2].map((i) => stops.reduce((s, c) => s + c[i], 0) / stops.length);
    const bg = cs.backgroundColor || "";
    return /,\s*0(\.0+)?\)$/.test(bg) ? undefined : parseRgb(bg);
  }

  // Tab text (and bar buttons) in black or white, whichever reads on the bar
  // background; the selected tab too when its accent would be hard to read.
  private _applyBarText(): void {
    if (!this.isConnected) return;
    const rgb = this._barRgb();
    const text = rgb ? readableText(`rgb(${rgb.join(",")})`) : undefined;
    if (!text) {
      this.style.removeProperty("--tabdeck-tab-color");
      return;
    }
    this.style.setProperty("--tabdeck-tab-color", text === "#fff" ? "rgba(255, 255, 255, 0.88)" : "rgba(0, 0, 0, 0.72)");
    if (this.style.getPropertyValue("--tabdeck-selected-auto")) return;
    const tab = this._tabEl(this.selected);
    const fg = tab && !tab.style.color ? parseRgb(getComputedStyle(tab).color) : undefined;
    if (fg && contrastRatio(fg, rgb!) < 3) this.style.setProperty("--tabdeck-selected-auto", text);
  }

  private _applyGlass(): void {
    this.toggleAttribute("glass", !!this.glass);
    if (this.glass) this.style.setProperty("--tabdeck-glass-blur", `${this.glass}px`);
    else this.style.removeProperty("--tabdeck-glass-blur");
  }

  // Pin the bar with position: sticky so it stays visible while the panel
  // scrolls. Pins to the inner edge (top for top/left/right bars, bottom for a
  // bottom bar) and paints a card background so content doesn't show through.
  private _applySticky(): void {
    if (this.sticky) {
      this.style.position = "sticky";
      this.style.zIndex = "2";
      // A custom (possibly translucent/blurred) bar background paints itself;
      // otherwise back the pinned bar with the card colour.
      this.style.background = this.barBackground || this.glass
        ? "transparent"
        : "var(--card-background-color, var(--ha-card-background, inherit))";
      if (this.position === "bottom") {
        this.style.bottom = "0";
        this.style.top = "";
      } else {
        // Pin just below HA's fixed app header (it exposes --header-height);
        // --tabdeck-sticky-top overrides (e.g. 0px for a kiosk with no header).
        this.style.setProperty("top", "var(--tabdeck-sticky-top, var(--header-height, 0px))");
        this.style.bottom = "";
      }
    } else {
      for (const p of ["position", "zIndex", "background", "top", "bottom"]) {
        this.style.removeProperty(
          p.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
        );
      }
    }
  }

  protected firstUpdated(): void {
    const bar = (this.renderRoot as ParentNode).querySelector(".bar");
    if (bar && this._resizeObserver) this._resizeObserver.observe(bar);
  }

  protected updated(changed: PropertyValues): void {
    this.setAttribute("aria-label", this.barLabel || localize(this.language, "card.tabs"));
    this.toggleAttribute("rail-expand", this._railActive);
    this.toggleAttribute("expanded", this._railActive && this._railOpen);
    this.toggleAttribute("rtl", this.rtl);
    this._applyAccent();
    this._applyGlass();
    this._applyReadableSelected();
    this._applyBarText();
    this._applySticky();
    // Never slide away while one of the bar's own panels is open.
    const busy = this._searchOpen || this._customOpen || this._menuOpen || this._groupOpen >= 0;
    this.toggleAttribute("autohidden", this.autohide && this.autohidden && !busy);
    this.toggleAttribute("autohide-down", this.dock || this.position === "bottom");
    this._position();
    // Tab widths can change in the tabs' own (later) update — e.g. display
    // "active" expands the newly selected tab — so measure again once they settle.
    const tabs = [...this.renderRoot.querySelectorAll("tabdeck-tab")] as LitElement[];
    // bar_fade: a tab that widens later (an icon loading) changes the overflow
    // without resizing the bar.
    if (this.fade && this._horizontal) for (const t of tabs) this._resizeObserver?.observe(t);
    Promise.all(tabs.map((t) => t.updateComplete)).then(() => {
      this._position();
      // Tab widths are only right once the tabs have drawn.
      if (this.limit > 0) this._revealLimited(changed);
    });
    this._updateOverflow();
    this._countHidden();
    if (!this._ready) {
      requestAnimationFrame(() => {
        this._ready = true;
      });
    }
  }

  // bar_limit: keep the open tab in view on its page, and open the ⋯ list
  // at the open tab rather than at the top of a long list.
  private _revealLimited(changed: PropertyValues): void {
    const root = this.renderRoot as ParentNode;
    if (changed.has("selected") || changed.has("items")) {
      const bar = root.querySelector(".bar") as HTMLElement | null;
      const tab = this._tabEl(this.selected);
      if (bar && tab && this._horizontal) {
        // Screen positions, so it works the same right-to-left.
        const b = bar.getBoundingClientRect();
        const r = tab.getBoundingClientRect();
        if (r.left < b.left) bar.scrollLeft -= b.left - r.left;
        else if (r.right > b.right) bar.scrollLeft += r.right - b.right;
      }
    }
    if (changed.has("_menuOpen") && this._menuOpen) {
      const current = root.querySelector(".overflow-item.current") as HTMLElement | null;
      const list = root.querySelector(".overflow-menu") as HTMLElement | null;
      if (current && list) list.scrollTop = current.offsetTop - list.clientHeight / 2 + current.offsetHeight / 2;
    }
  }

  private get _horizontal(): boolean {
    return this.position === "top" || this.position === "bottom";
  }

  private _needsAttention(item: TabItem): boolean {
    return !!item.alert || isActiveBadge(item.badge);
  }

  // Tabs needing attention that aren't on screen: outside the bar_limit
  // page, or scrolled out of an overflowing bar.
  private _countHidden = (): void => {
    let n = 0;
    if (this.hiddenAlerts) {
      const [start, end] = this._window;
      const bar = (this.renderRoot as ParentNode).querySelector(".bar") as HTMLElement | null;
      const box = bar?.getBoundingClientRect();
      this.items.forEach((item, i) => {
        if (!this._needsAttention(item)) return;
        if (i < start || i >= end) return void n++;
        const r = this._tabEl(i)?.getBoundingClientRect();
        if (box && r && r.width && (r.left < box.left - 1 || r.right > box.right + 1)) n++;
      });
    }
    if (n !== this._hiddenCount) this._hiddenCount = n;
  };

  private _updateOverflow(): void {
    if ((!this.scrollButtons && !this.overflowMenu) || !this._horizontal) {
      if (this._overflow) this._overflow = false;
      return;
    }
    const bar = (this.renderRoot as ParentNode).querySelector(".bar") as HTMLElement | null;
    const next = !!bar && bar.scrollWidth - bar.clientWidth > 1;
    if (next !== this._overflow) this._overflow = next;
  }

  private _scrollBy(dir: number): void {
    const bar = (this.renderRoot as ParentNode).querySelector(".bar") as HTMLElement | null;
    if (!bar) return;
    // dir is towards the start (-1) or end (1) of the bar; the start is on
    // the right in RTL.
    bar.scrollBy({ left: dir * (this.rtl ? -1 : 1) * bar.clientWidth * 0.8, behavior: reducedMotion() ? "auto" : "smooth" });
  }

  private _pickFromMenu(index: number): void {
    this._menuOpen = false;
    if (!this.items[index]?.disabled) this._select(index);
  }

  render() {
    // The liquid move is a WAAPI animation; no CSS transition under it.
    const animateClass = this._ready && this.animated && !this.liquid ? " animate" : "";
    const arrows = this.scrollButtons && this._horizontal && this._overflow;
    const [winStart, winEnd] = this._window;
    const limited = winEnd - winStart < this.items.length;
    const menu = (this.overflowMenu && this._horizontal && this._overflow) || limited;
    return html`
      <div class="bar-wrap ${arrows || menu || this.searchable || this.customizable || this.expandable || this.overviewable || this.entitySearchable || this.lastTab || this.shareable || this.summary !== undefined ? "has-arrows" : ""}">
      ${arrows
        ? html`<button class="scroll-btn left" aria-label=${localize(this.language, this.rtl ? "card.scroll_right" : "card.scroll_left")} @click=${() => this._scrollBy(-1)}>${this.rtl ? "›" : "‹"}</button>`
        : ""}
      <div
        @scroll=${this.hiddenAlerts || this.fade ? this._onBarScroll : nothing}
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation ? "elevated" : ""} ${this.display === "dots" ? "dots" : ""}"
        part="bar"
        style=${this.barBackground ? `background:${this.barBackground}` : ""}
      >
        <div class="indicator${animateClass}" part="indicator"></div>
        ${this.items.slice(winStart, winEnd).map(
          (item, k, _a, index = winStart + k) => html`
            ${item.separator && this.display !== "dots"
              ? html`<span class="sep sep-${item.separator}" aria-hidden="true"></span>`
              : ""}
            <tabdeck-tab
              .label=${item.name}
              .subtitle=${item.subtitle}
              .icon=${item.icon}
              .badge=${item.badge}
              .badgeColor=${item.badgeColor}
              .badgeAction=${!!item.badgeAction}
              .changed=${!!item.changed}
              .changedLabel=${localize(this.language, "card.changed")}
              .unhealthy=${!!item.unhealthy}
              .speed=${item.speed}
              .unhealthyLabel=${localize(this.language, "card.unhealthy")}
              .badgeDisplay=${this.badgeDisplay}
              @badge-click=${() => this._emitAction(index, "badge")}
              .accent=${item.accent}
              .color=${item.color}
              .disabled=${!!item.disabled}
              .alert=${!!item.alert}
              .action=${!!item.action}
              .ghost=${!!item.ghost}
              .fab=${!!item.fab}
              .ring=${item.ring}
              .ringColor=${item.ringColor}
              .ringStyle=${item.ringStyle}
              .graph=${item.graph}
              .graphColor=${item.graphColor}
              .badgeIcon=${item.badgeIcon}
              .bounce=${!!item.bounce}
              .extraBadges=${item.badges?.map((b) => ({ ...b, label: localize(this.language, "card.badge", { value: b.text ?? b.icon ?? "" }) }))}
              .picture=${item.picture}
              .iconAnimation=${item.iconAnimation}
              .font=${item.font}
              .hasMenu=${!!item.menu?.length}
              aria-haspopup=${item.menu?.length ? "menu" : "false"}
              aria-expanded=${item.menu?.length ? String(this._groupOpen === index) : "false"}
              .stacked=${this.dock}
              .ghostLabel=${localize(this.language, "card.ghost")}
              .badgeLabel=${localize(this.language, "card.badge", { value: item.badge ?? "" })}
              .display=${this._railActive ? (this._railOpen ? "both" : "icon") : this.display}
              .selected=${index === this.selected}
              aria-controls="tabdeck-panel"
              @click=${(e: Event) => this._onTabClick(index, e)}
              data-drop=${this._dropAt?.index === index ? (this._dropAt.after ? "after" : "before") : ""}
              @pointerdown=${(e: PointerEvent) => {
                this._tipEnd();
                this._onPointerDown(index, e);
              }}
              @pointerup=${() => this._cancelHold()}
              aria-description=${item.tooltip || nothing}
              @pointerenter=${item.tooltip ? (e: PointerEvent) => this._tipStart(index, e) : nothing}
              @focusin=${item.tooltip ? (e: FocusEvent) => (e.currentTarget as HTMLElement).matches?.(":focus-visible") && this._tipStart(index, e, 0) : nothing}
              @focusout=${item.tooltip ? this._tipEnd : nothing}
              @pointerleave=${() => {
                this._tipEnd();
                this._cancelHold();
              }}
              @pointercancel=${() => this._cancelHold()}
            ></tabdeck-tab>
          `,
        )}
      </div>
      ${this._tip
        ? html`<div class="tip tip-${this._tip.place}" role="tooltip" style="left:${this._tip.x}px;top:${this._tip.y}px">${this._tip.text}</div>`
        : ""}
      ${this.summary
        ? html`<button
            class="summary-chip"
            part="summary-chip"
            style=${this.summary.color ? `background:${this.summary.color}` : ""}
            @click=${() => this.dispatchEvent(new CustomEvent("tabdeck-summary", { bubbles: true, composed: true }))}
          >
            ${this.summary.icon ? html`<ha-icon icon=${this.summary.icon}></ha-icon>` : ""}<span>${this.summary.text}</span>
          </button>`
        : ""}
      ${this._groupOpen >= 0 ? this._renderGroupMenu() : ""}
      ${this.searchable
        ? html`<button
            class="search-btn"
            aria-label=${localize(this.language, "card.search")}
            aria-expanded=${this._searchOpen ? "true" : "false"}
            @click=${() => (this._searchOpen ? this._closeSearch() : this.openSearch())}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
          </button>`
        : ""}
      ${this._searchOpen ? this._renderSearch() : ""}
      ${this.customizable
        ? html`<button
            class="custom-btn search-btn"
            aria-label=${localize(this.language, "card.customize")}
            aria-expanded=${this._customOpen ? "true" : "false"}
            @click=${() => (this._customOpen ? this._closeCustom() : this._openCustom())}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"></path></svg>
          </button>`
        : ""}
      ${this._customOpen ? this._renderCustom() : ""}
      ${this.lastTab
        ? html`<button
            class="last-btn search-btn"
            aria-label=${localize(this.language, "card.last_tab", { name: this.lastTab.name ?? "" })}
            title=${localize(this.language, "card.last_tab", { name: this.lastTab.name ?? "" })}
            @click=${() => this.dispatchEvent(new CustomEvent("tabdeck-last", { bubbles: true, composed: true }))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z"></path></svg>
            ${this.display !== "icon" && this.display !== "dots" && this.lastTab.name
              ? html`<span class="last-name">${this.lastTab.name}</span>`
              : ""}
          </button>`
        : ""}
      ${this.shareable
        ? html`<button
            class="share-btn search-btn"
            aria-label=${localize(this.language, "card.share")}
            title=${localize(this.language, "card.share")}
            aria-expanded=${this.shareInfo ? "true" : "false"}
            @click=${() => this.dispatchEvent(new CustomEvent("tabdeck-share", { bubbles: true, composed: true }))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"></path></svg>
          </button>`
        : ""}
      ${this.shareable && this.shareInfo ? this._renderShare(this.shareInfo) : ""}
      ${this.entitySearchable
        ? html`<button
            class="es-btn search-btn"
            aria-label=${localize(this.language, "card.entity_search")}
            title=${localize(this.language, "card.entity_search") + " (Ctrl K)"}
            @click=${() => this.dispatchEvent(new CustomEvent("tabdeck-entity-search", { bubbles: true, composed: true }))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,4H21V6H3V4M3,9H11V11H3V9M3,14H9V16H3V14M15.5,10A4.5,4.5 0 0,1 20,14.5C20,15.38 19.75,16.21 19.31,16.9L22.39,20L21,21.39L17.88,18.32C17.19,18.75 16.37,19 15.5,19A4.5,4.5 0 0,1 11,14.5A4.5,4.5 0 0,1 15.5,10M15.5,12A2.5,2.5 0 0,0 13,14.5A2.5,2.5 0 0,0 15.5,17A2.5,2.5 0 0,0 18,14.5A2.5,2.5 0 0,0 15.5,12Z"></path></svg>
          </button>`
        : ""}
      ${this.overviewable
        ? html`<button
            class="ov-btn search-btn"
            aria-label=${localize(this.language, "card.overview")}
            title=${localize(this.language, "card.overview")}
            @click=${() => this.dispatchEvent(new CustomEvent("tabdeck-overview", { bubbles: true, composed: true }))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3"></path></svg>
          </button>`
        : ""}
      ${this.expandable
        ? html`<button
            class="fs-btn search-btn"
            aria-label=${localize(this.language, "card.fullscreen")}
            @click=${() => this.dispatchEvent(new CustomEvent("tabdeck-fullscreen", { bubbles: true, composed: true }))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"></path></svg>
          </button>`
        : ""}
      ${arrows
        ? html`<button class="scroll-btn right" aria-label=${localize(this.language, this.rtl ? "card.scroll_left" : "card.scroll_right")} @click=${() => this._scrollBy(1)}>${this.rtl ? "‹" : "›"}</button>`
        : ""}
      ${menu
        ? html`<button
              class="overflow-btn"
              aria-label=${localize(this.language, "card.all_tabs") +
              (this._hiddenCount ? ` (${localize(this.language, "card.badge", { value: this._hiddenCount })})` : "")}
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen ? "true" : "false"}
              @click=${() => (this._menuOpen = !this._menuOpen)}
            >
              ⋯${this._hiddenCount ? html`<span class="ov-count">${this._hiddenCount}</span>` : ""}
            </button>
            ${this._menuOpen
              ? html`<div class="overflow-menu" role="menu">
                  ${this.items.map(
                    (item, index) => html`<button
                      class="overflow-item ${index === this.selected ? "current" : ""}"
                      role="menuitem"
                      ?disabled=${item.disabled}
                      @click=${() => this._pickFromMenu(index)}
                    >
                      ${item.name ?? localize(this.language, "card.tab_n", { n: index + 1 })}
                      ${this.hiddenAlerts && this._needsAttention(item)
                        ? html`<span class="ov-badge ${isActiveBadge(item.badge) ? "" : "alert"}">${isActiveBadge(item.badge) ? item.badge : "!"}</span>`
                        : ""}
                    </button>`,
                  )}
                </div>`
              : ""}`
        : ""}
      </div>
    `;
  }

  static styles = css`
    ${reducedMotionCss}
    :host {
      display: block;
    }
    .tip {
      position: fixed;
      z-index: 9;
      max-width: 240px;
      padding: 6px 9px;
      border-radius: 6px;
      background: var(--tabdeck-tooltip-background, rgba(40, 44, 52, 0.95));
      color: var(--tabdeck-tooltip-color, #fff);
      font-size: 12px;
      line-height: 1.35;
      white-space: pre-line;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      transform: translateX(-50%);
    }
    .tip-above {
      transform: translate(-50%, -100%);
    }
    .tip-right {
      transform: translateY(-50%);
    }
    .tip-left {
      transform: translate(-100%, -50%);
    }
    /* bar_autohide: slide out past the pinned edge (HA's header for a top bar). */
    :host([autohide]) {
      transition: transform 200ms ease;
    }
    :host([autohidden]) {
      transform: translateY(calc(-100% - var(--tabdeck-sticky-top, var(--header-height, 0px))));
      pointer-events: none;
    }
    :host([autohidden][autohide-down]) {
      transform: translateY(calc(100% + 8px));
    }
    @media (prefers-reduced-motion: reduce) {
      :host([autohide]) {
        transition: none;
      }
    }
    /* rail_expand: an icon rail that widens over the content on hover. */
    :host([rail-expand]) {
      position: relative;
      z-index: 3;
      flex: none;
      width: var(--tabdeck-rail-width, 64px);
    }
    :host([rail-expand]) .bar-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      inset-inline-start: 0;
      min-width: 100%;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      transition: box-shadow 150ms ease;
    }
    :host([rail-expand]) .bar {
      height: 100%;
      box-sizing: border-box;
    }
    :host([rail-expand][expanded]) .bar-wrap {
      box-shadow: 4px 0 14px rgba(0, 0, 0, 0.25);
      border-start-end-radius: 12px;
      border-end-end-radius: 12px;
    }
    :host([rail-expand][expanded][rtl]) .bar-wrap {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
    }
    :host([rail-expand][expanded]) .bar {
      align-items: stretch;
    }
    :host([rail-expand][expanded]) tabdeck-tab {
      justify-content: flex-start;
      padding-inline-end: 20px;
    }
    /* A right-hand rail grows leftwards. */
    :host([rail-expand]) .bar-wrap:has(.bar.right) {
      inset-inline-start: auto;
      inset-inline-end: 0;
    }
    :host([rail-expand][expanded]) .bar-wrap:has(.bar.right) {
      box-shadow: -4px 0 14px rgba(0, 0, 0, 0.25);
      border-radius: 0;
      border-start-start-radius: 12px;
      border-end-start-radius: 12px;
    }
    :host([rail-expand][expanded][rtl]) .bar-wrap:has(.bar.right) {
      box-shadow: 4px 0 14px rgba(0, 0, 0, 0.25);
    }
    /* separator: a thin line, or a space that pushes later tabs to the end. */
    .sep {
      flex: none;
      align-self: center;
    }
    .sep-line {
      width: 1px;
      height: 60%;
      min-height: 16px;
      margin: 0 4px;
      background: var(--tabdeck-separator-color, var(--divider-color, rgba(127, 127, 127, 0.4)));
    }
    .bar.left .sep-line,
    .bar.right .sep-line {
      width: 60%;
      height: 1px;
      min-height: 0;
      margin: 4px auto;
    }
    .sep-space {
      flex: 1 1 0;
      min-width: 12px;
      min-height: 12px;
      align-self: stretch;
    }
    /* dots: a centred, borderless row of pagination dots, no indicator. */
    .bar.dots {
      justify-content: center;
      border: none;
      padding: 4px 0;
      gap: 0;
    }
    .bar.dots .indicator {
      display: none;
    }
    /* dock: a phone-style navigation bar fixed to the bottom of the screen. */
    :host([dock]) {
      position: fixed;
      left: var(--tabdeck-dock-left, 0);
      right: var(--tabdeck-dock-right, 0);
      bottom: 0;
      z-index: 5;
      padding-bottom: env(safe-area-inset-bottom, 0px);
      background: var(--tabdeck-dock-background, var(--card-background-color, var(--ha-card-background, #fff)));
      box-shadow: var(--tabdeck-dock-shadow, 0 -2px 10px rgba(0, 0, 0, 0.18));
    }
    :host([dock]) .bar {
      border-top: none;
      overflow: visible;
    }
    :host([dock]) .bar tabdeck-tab:not([fab]) {
      flex: 1 1 0;
      justify-content: center;
    }
    .bar-wrap {
      position: relative;
    }
    .group-menu {
      position: absolute;
      top: 100%;
      z-index: 4;
      min-width: 180px;
      max-height: 320px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    :host([dock]) .group-menu,
    .bar.bottom ~ .group-menu {
      top: auto;
      bottom: 100%;
    }
    .group-item {
      display: flex;
      align-items: center;
      gap: 10px;
      text-align: start;
      border: none;
      background: none;
      cursor: pointer;
      padding: 9px 12px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .group-item:hover,
    .group-item:focus-visible {
      background: var(--secondary-background-color, #f5f5f5);
      outline: none;
    }
    .search-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0 8px;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      display: inline-flex;
      align-items: center;
    }
    .search-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .last-btn {
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      max-width: 88px;
      color: var(--tabdeck-accent, var(--primary-color));
    }
    .last-name {
      font-size: 11px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(320px, 100%);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 6px;
      box-sizing: border-box;
    }
    .share-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(260px, 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 10px;
      box-sizing: border-box;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      color: var(--primary-text-color);
    }
    :host([dock]) .share-panel {
      top: auto;
      bottom: 100%;
    }
    .share-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .share-status.ok {
      color: var(--success-color, #2e7d32);
      background: color-mix(in srgb, var(--success-color, #2e7d32) 14%, transparent);
    }
    .share-status svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    .share-url {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      font: inherit;
      font-size: 12px;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, transparent);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
    }
    .share-qr {
      width: 168px;
      height: 168px;
      border-radius: 6px;
    }
    .share-caption {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    :host([dock]) .search-panel {
      top: auto;
      bottom: 100%;
    }
    .search-input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      font: inherit;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      outline: none;
    }
    .search-input:focus {
      border-color: var(--tabdeck-accent, var(--primary-color));
    }
    .search-results {
      display: flex;
      flex-direction: column;
      max-height: 280px;
      overflow: auto;
      margin-top: 4px;
    }
    .search-results .group-item.active {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .custom-panel {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 4;
      width: min(320px, 100%);
      max-height: 420px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      padding: 8px;
      box-sizing: border-box;
      color: var(--primary-text-color);
    }
    :host([dock]) .custom-panel {
      top: auto;
      bottom: 100%;
    }
    .custom-title {
      font-weight: 500;
      font-size: 14px;
      padding: 4px 6px 8px;
    }
    .custom-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 4px;
      border-radius: 6px;
    }
    .custom-row.is-hidden .custom-name,
    .custom-row.is-hidden > ha-icon {
      opacity: 0.45;
    }
    .custom-row ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .custom-noicon {
      width: 20px;
    }
    .custom-name {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .custom-row button {
      border: none;
      background: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: var(--secondary-text-color);
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .custom-row button:hover:not([disabled]) {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .custom-row button[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    .custom-actions {
      display: flex;
      justify-content: space-between;
      padding: 8px 4px 2px;
    }
    .custom-actions button {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--tabdeck-accent, var(--primary-color));
      font-size: 14px;
      padding: 6px 8px;
      border-radius: 6px;
    }
    .search-empty {
      padding: 10px 12px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .group-item ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .bar-wrap.has-arrows {
      display: flex;
      align-items: center;
      position: relative;
    }
    .overflow-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      padding: 0 8px;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
    }
    .overflow-menu {
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      z-index: 3;
      min-width: 160px;
      max-height: 320px;
      overflow: auto;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    .overflow-item {
      text-align: start;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 6px;
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .summary-chip {
      flex-shrink: 0;
      align-self: center;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin: 0 6px;
      padding: 3px 10px 3px 8px;
      border: none;
      border-radius: 999px;
      background: var(--tabdeck-summary-background, var(--tabdeck-alert-color, var(--error-color, #db4437)));
      color: var(--tabdeck-summary-color, #fff);
      font: inherit;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
    }
    .summary-chip ha-icon {
      --mdc-icon-size: 16px;
    }
    .ov-count,
    .ov-badge {
      display: inline-block;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      box-sizing: border-box;
      border-radius: 8px;
      background: var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)));
      color: var(--tabdeck-badge-color, var(--text-primary-color, #fff));
      font-size: 10px;
      line-height: 16px;
      text-align: center;
      vertical-align: top;
    }
    .ov-count,
    .ov-badge.alert {
      background: var(--tabdeck-alert-color, var(--error-color, #db4437));
      color: #fff;
    }
    .ov-count {
      margin-inline-start: 2px;
    }
    .ov-badge {
      float: inline-end;
      margin-inline-start: 12px;
    }
    .overflow-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .overflow-item.current {
      color: var(--tabdeck-accent, var(--primary-color));
      font-weight: 600;
    }
    .overflow-item[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .bar-wrap.has-arrows .bar {
      flex: 1;
      min-width: 0;
    }
    .scroll-btn {
      flex-shrink: 0;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      padding: 0 6px;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      border-radius: var(--tabdeck-bar-radius, 0);
      position: relative;
      /* e.g. blur(12px) for a frosted-glass bar (the glass preset). */
      backdrop-filter: var(--tabdeck-bar-backdrop, none);
      -webkit-backdrop-filter: var(--tabdeck-bar-backdrop, none);
    }
    .bar.top,
    .bar.bottom {
      flex-direction: row;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .bar::-webkit-scrollbar {
      display: none;
    }
    .bar.bottom {
      border-bottom: none;
      border-top: 1px solid var(--divider-color);
    }
    .bar.left,
    .bar.right {
      flex-direction: column;
      border-bottom: none;
    }
    .bar.left {
      border-inline-end: 1px solid var(--divider-color);
    }
    .bar.right {
      border-inline-start: 1px solid var(--divider-color);
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: var(--tabdeck-bar-radius, 10px);
      padding: 4px;
    }
    /* boxed: each tab is its own bordered chip; selected gets a tinted fill. */
    .bar.style-boxed {
      gap: 8px;
      border: none;
      padding: 4px 0;
    }
    .bar.style-boxed tabdeck-tab {
      border: var(--tabdeck-tab-border, 1px solid var(--divider-color));
      border-radius: 10px;
    }
    /* text: no indicator, no borders — just colour the selected label. */
    .bar.style-text {
      gap: 4px;
      border: none;
    }
    /* rail: compact icon rail — centered tabs, rounded selected highlight.
       Designed to pair with position:left/right + tab_display:icon. */
    .bar.style-rail {
      gap: 4px;
      border: none;
      padding: 4px;
      justify-content: center;
    }
    .bar.style-rail tabdeck-tab {
      justify-content: center;
      border-radius: 12px;
    }
    .bar.style-rail.left,
    .bar.style-rail.right {
      align-items: center;
    }
    .bar.style-rail .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: var(--tabdeck-indicator-radius, 12px);
    }
    /* glass: a frosted, translucent bar (and its menus) over whatever is
       behind the card. A bar_background becomes the tint. */
    :host([glass]) .bar {
      background: var(--tabdeck-glass-tint, color-mix(in srgb, var(--card-background-color, #fff) 55%, transparent));
      backdrop-filter: var(--tabdeck-bar-backdrop, blur(var(--tabdeck-glass-blur, 14px)) saturate(160%));
      -webkit-backdrop-filter: var(--tabdeck-bar-backdrop, blur(var(--tabdeck-glass-blur, 14px)) saturate(160%));
      border: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
      border-radius: var(--tabdeck-bar-radius, var(--tabdeck-glass-radius, 16px));
      box-shadow: var(--tabdeck-glass-shadow, 0 4px 18px rgba(0, 0, 0, 0.12));
    }
    :host([glass]) .overflow-menu,
    :host([glass]) .group-menu,
    :host([glass]) .search-panel,
    :host([glass]) .custom-panel,
    :host([glass]) .share-panel,
    :host([glass]) .tip {
      background: var(--tabdeck-glass-tint, color-mix(in srgb, var(--card-background-color, #fff) 70%, transparent));
      backdrop-filter: blur(var(--tabdeck-glass-blur, 14px)) saturate(160%);
      -webkit-backdrop-filter: blur(var(--tabdeck-glass-blur, 14px)) saturate(160%);
      border: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
      color: var(--primary-text-color);
    }
    /* A glass dock floats above the page instead of a solid strip. */
    :host([glass][dock]) {
      background: transparent;
      box-shadow: none;
      padding: 0 8px calc(8px + env(safe-area-inset-bottom, 0px));
    }
    :host([glass][dock]) .bar {
      border-top: 1px solid var(--tabdeck-glass-border, rgba(255, 255, 255, 0.35));
    }
    :host([glass][rail-expand]) .bar-wrap {
      background: transparent;
    }
    .bar.elevated {
      box-shadow: var(--tabdeck-bar-shadow, 0 2px 6px rgba(0, 0, 0, 0.18));
      z-index: 1;
    }
    /* Alignment of the tabs within the bar. */
    .bar.align-center {
      justify-content: center;
    }
    .bar.align-end {
      justify-content: flex-end;
    }
    .bar.align-justify tabdeck-tab {
      flex: 1 1 0;
      justify-content: center;
    }
    .bar.align-justify {
      justify-content: stretch;
    }

    /* The single moving indicator. Sits behind tab content. */
    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
      z-index: 0;
      box-shadow: var(--tabdeck-indicator-shadow, none);
    }
    :host([density="compact"]) {
      --tabdeck-density-height: 36px;
      --tabdeck-density-padding: 0 10px;
      --tabdeck-density-font-size: 13px;
    }
    :host([density="comfortable"]) {
      --tabdeck-density-height: 56px;
      --tabdeck-density-padding: 0 20px;
      --tabdeck-density-font-size: 15px;
    }
    .indicator.animate {
      transition: left 200ms ease, top 200ms ease, width 200ms ease,
        height 200ms ease;
    }
    /* collapsible: while folded, the selection is only hinted. */
    :host([collapsed]) .indicator {
      opacity: 0.35 !important;
    }
    @media (prefers-reduced-motion: reduce) {
      .indicator.animate {
        transition: none;
      }
    }
    tabdeck-tab {
      position: relative;
      z-index: 1;
    }
    /* drag_reorder: the lifted tab follows the pointer; a line marks the drop. */
    tabdeck-tab.dragging {
      z-index: 3;
      cursor: grabbing;
      background: var(--card-background-color, #fff);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }
    tabdeck-tab[data-drop="before"] {
      box-shadow: inset 3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    tabdeck-tab[data-drop="after"] {
      box-shadow: inset -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    :host([rtl]) tabdeck-tab[data-drop="before"] {
      box-shadow: inset -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    :host([rtl]) tabdeck-tab[data-drop="after"] {
      box-shadow: inset 3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left tabdeck-tab[data-drop="before"],
    .bar.right tabdeck-tab[data-drop="before"] {
      box-shadow: inset 0 3px 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left tabdeck-tab[data-drop="after"],
    .bar.right tabdeck-tab[data-drop="after"] {
      box-shadow: inset 0 -3px 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-underline .indicator {
      background: var(--tabdeck-indicator-color, var(--tabdeck-accent, var(--primary-color)));
    }
    .bar.style-pill .indicator {
      background: var(
        --tabdeck-indicator-color,
        color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 18%, transparent)
      );
      border-radius: var(--tabdeck-indicator-radius, 999px);
    }
    .bar.style-segmented .indicator {
      background: var(--tabdeck-indicator-color, var(--card-background-color));
      border-radius: var(--tabdeck-indicator-radius, 7px);
    }
    .bar.style-boxed .indicator {
      background: var(
        --tabdeck-indicator-color,
        color-mix(in srgb, var(--tabdeck-accent, var(--primary-color)) 20%, transparent)
      );
      border-radius: var(--tabdeck-indicator-radius, 10px);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tabbar": TabdeckTabbar;
  }
}
