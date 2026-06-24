import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { BadgeDisplay, TabAlign, TabDisplay, TabPosition, TabStyle } from "../lib/config";
import { computeIndicatorRect } from "../lib/indicator";
import "./tabdeck-tab";

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
}

const HOLD_MS = 500;

@customElement("tabdeck-tabbar")
export class TabdeckTabbar extends LitElement {
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
  // When true, the bar stays pinned (position: sticky) while content scrolls.
  @property({ type: Boolean }) sticky = false;
  // Raise the bar with a subtle shadow.
  @property({ type: Boolean }) elevation = false;
  // Optional custom bar background colour.
  @property() barBackground?: string;

  // Becomes true one frame after the first paint, so the indicator's initial
  // placement never slides in from the corner; only later moves animate.
  @state() private _ready = false;

  private _resizeObserver?: ResizeObserver;
  private _resizeRaf = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._onKeydown);
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
    this.removeEventListener("keydown", this._onKeydown);
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

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

  private _onPointerDown(index: number): void {
    this._suppressClick = false;
    if (!this.items[index]?.holdAction) return;
    this._holdTimer = setTimeout(() => {
      this._suppressClick = true;
      this.dispatchEvent(
        new CustomEvent("tabdeck-action", {
          detail: { index },
          bubbles: true,
          composed: true,
        }),
      );
    }, HOLD_MS);
  }

  private _cancelHold(): void {
    if (this._holdTimer) clearTimeout(this._holdTimer);
    this._holdTimer = undefined;
  }

  private _onTabClick(index: number): void {
    this._cancelHold();
    if (this._suppressClick) {
      this._suppressClick = false;
      return;
    }
    this._select(index);
  }

  // Step from `from` in `dir` (+1/-1), wrapping, skipping disabled tabs. Returns
  // the original index if every other tab is disabled.
  private _step(from: number, dir: number): number {
    const n = this.items.length;
    for (let i = 1; i <= n; i++) {
      const idx = (from + dir * i + n * i) % n;
      if (!this.items[idx]?.disabled) return idx;
    }
    return from;
  }

  private _firstEnabled(fromEnd = false): number {
    const n = this.items.length;
    for (let i = 0; i < n; i++) {
      const idx = fromEnd ? n - 1 - i : i;
      if (!this.items[idx]?.disabled) return idx;
    }
    return 0;
  }

  private _onKeydown = (e: KeyboardEvent): void => {
    const vertical = this.position === "left" || this.position === "right";
    const next = vertical ? "ArrowDown" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    let target: number | null = null;
    if (e.key === next) target = this._step(this.selected, 1);
    else if (e.key === prev) target = this._step(this.selected, -1);
    else if (e.key === "Home") target = this._firstEnabled();
    else if (e.key === "End") target = this._firstEnabled(true);
    if (target !== null) {
      e.preventDefault();
      this._select(target);
    }
  };

  // Measure the selected tab and write the indicator's box inline. Guards for
  // jsdom / pre-layout (offset* == 0) by hiding the indicator instead of moving
  // it to (0,0).
  private _position(): void {
    const root = this.renderRoot as ParentNode | undefined;
    const indicator = root?.querySelector(".indicator") as HTMLElement | null;
    if (!indicator) return;
    // Address the selected tab by index — `this.selected` is the source of
    // truth. Don't query `[selected]`: each child reflects that attribute in its
    // own async update, which runs after this parent's updated(), so at this
    // point the attribute can still sit on the previously-selected tab.
    const tabs = root?.querySelectorAll("tabdeck-tab");
    const tab = tabs?.[this.selected] as HTMLElement | undefined;
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
        )
      : null;
    if (!rect) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.left = `${rect.left}px`;
    indicator.style.top = `${rect.top}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.height = `${rect.height}px`;
    indicator.style.opacity = "1";
  }

  // Push the selected tab's accent onto the host as --tabdeck-accent so the
  // moving indicator (a sibling of the tabs) takes that colour. Off → fall back
  // to the theme primary colour.
  private _applyAccent(): void {
    const accent = this.accentIndicator
      ? this.items[this.selected]?.accent
      : undefined;
    if (accent) this.style.setProperty("--tabdeck-accent", accent);
    else this.style.removeProperty("--tabdeck-accent");
  }

  // Pin the bar with position: sticky so it stays visible while the panel
  // scrolls. Pins to the inner edge (top for top/left/right bars, bottom for a
  // bottom bar) and paints a card background so content doesn't show through.
  private _applySticky(): void {
    if (this.sticky) {
      this.style.position = "sticky";
      this.style.zIndex = "2";
      this.style.background =
        "var(--card-background-color, var(--ha-card-background, inherit))";
      if (this.position === "bottom") {
        this.style.bottom = "0";
        this.style.top = "";
      } else {
        this.style.top = "0";
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

  protected updated(): void {
    this._applyAccent();
    this._applySticky();
    this._position();
    if (!this._ready) {
      requestAnimationFrame(() => {
        this._ready = true;
      });
    }
  }

  render() {
    const animateClass = this._ready && this.animated ? " animate" : "";
    return html`
      <div
        class="bar ${this.position} style-${this.tabStyle} align-${this.align} ${this.elevation ? "elevated" : ""}"
        part="bar"
        style=${this.barBackground ? `background:${this.barBackground}` : ""}
      >
        <div class="indicator${animateClass}" part="indicator"></div>
        ${this.items.map(
          (item, index) => html`
            <tabdeck-tab
              .label=${item.name}
              .subtitle=${item.subtitle}
              .icon=${item.icon}
              .badge=${item.badge}
              .badgeColor=${item.badgeColor}
              .badgeDisplay=${this.badgeDisplay}
              .accent=${item.accent}
              .color=${item.color}
              .disabled=${!!item.disabled}
              .display=${this.display}
              .selected=${index === this.selected}
              aria-controls="tabdeck-panel"
              @click=${() => this._onTabClick(index)}
              @pointerdown=${() => this._onPointerDown(index)}
              @pointerup=${() => this._cancelHold()}
              @pointerleave=${() => this._cancelHold()}
              @pointercancel=${() => this._cancelHold()}
            ></tabdeck-tab>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--divider-color);
      position: relative;
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
      border-right: 1px solid var(--divider-color);
    }
    .bar.right {
      border-left: 1px solid var(--divider-color);
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
      border-radius: 10px;
      padding: 4px;
    }
    /* boxed: each tab is its own bordered chip; selected gets a tinted fill. */
    .bar.style-boxed {
      gap: 8px;
      border: none;
      padding: 4px 0;
    }
    .bar.style-boxed tabdeck-tab {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }
    /* text: no indicator, no borders — just colour the selected label. */
    .bar.style-text {
      gap: 4px;
      border: none;
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
    }
    .indicator.animate {
      transition: left 200ms ease, top 200ms ease, width 200ms ease,
        height 200ms ease;
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
    .bar.style-underline .indicator {
      background: var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: 999px;
    }
    .bar.style-segmented .indicator {
      background: var(--card-background-color);
      border-radius: 7px;
    }
    .bar.style-boxed .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 20%,
        transparent
      );
      border-radius: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tabbar": TabdeckTabbar;
  }
}
