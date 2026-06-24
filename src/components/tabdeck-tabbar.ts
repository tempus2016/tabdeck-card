import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TabDisplay, TabPosition, TabStyle } from "../lib/config";
import { computeIndicatorRect } from "../lib/indicator";
import "./tabdeck-tab";

interface TabItem {
  name?: string;
  icon?: string;
  accent?: string;
  badge?: string;
}

@customElement("tabdeck-tabbar")
export class TabdeckTabbar extends LitElement {
  @property({ attribute: false }) items: TabItem[] = [];
  @property({ type: Number }) selected = 0;
  @property() position: TabPosition = "top";
  @property() tabStyle: TabStyle = "underline";
  @property() display: TabDisplay = "both";
  @property() scrollable: "auto" | boolean = "auto";
  @property({ type: Boolean }) animated = true;

  // Becomes true one frame after the first paint, so the indicator's initial
  // placement never slides in from the corner; only later moves animate.
  @state() private _ready = false;

  private _resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._onKeydown);
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => this._position());
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

  private _onKeydown = (e: KeyboardEvent): void => {
    const last = this.items.length - 1;
    const vertical = this.position === "left" || this.position === "right";
    const next = vertical ? "ArrowDown" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    let target: number | null = null;
    if (e.key === next) target = this.selected >= last ? 0 : this.selected + 1;
    else if (e.key === prev) target = this.selected <= 0 ? last : this.selected - 1;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = last;
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

  protected firstUpdated(): void {
    const bar = (this.renderRoot as ParentNode).querySelector(".bar");
    if (bar && this._resizeObserver) this._resizeObserver.observe(bar);
  }

  protected updated(): void {
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
      <div class="bar ${this.position} style-${this.tabStyle}" part="bar">
        <div class="indicator${animateClass}" part="indicator"></div>
        ${this.items.map(
          (item, index) => html`
            <tabdeck-tab
              .label=${item.name}
              .icon=${item.icon}
              .badge=${item.badge}
              .accent=${item.accent}
              .display=${this.display}
              .selected=${index === this.selected}
              aria-controls="tabdeck-panel"
              @click=${() => this._select(index)}
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tabbar": TabdeckTabbar;
  }
}
