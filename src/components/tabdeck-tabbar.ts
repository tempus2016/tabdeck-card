import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import type { TabPosition, TabStyle } from "../lib/config";
import { indicatorStyle } from "../lib/indicator";
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
  @property() scrollable: "auto" | boolean = "auto";

  @query(".bar") private _bar?: HTMLElement;
  @query(".indicator") private _indicatorEl?: HTMLElement;
  private _resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._onKeydown);
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => this._positionIndicator());
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener("keydown", this._onKeydown);
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    if (this._bar && this._resizeObserver) this._resizeObserver.observe(this._bar);
  }

  protected updated(_changed: PropertyValues): void {
    this._positionIndicator();
  }

  // Slide/resize the active-tab indicator to cover the selected tab. Uses live
  // offset metrics so it works for any position/style; appearance is CSS.
  private _positionIndicator(): void {
    const ind = this._indicatorEl;
    const bar = this._bar;
    if (!ind || !bar) return;
    const tabs = bar.querySelectorAll("tabdeck-tab");
    const el = tabs[this.selected] as HTMLElement | undefined;
    const accent = this.items[this.selected]?.accent;
    if (!el) {
      ind.style.cssText = indicatorStyle(null);
      return;
    }
    ind.style.cssText = indicatorStyle(
      { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight },
      accent,
    );
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

  render() {
    return html`
      <div class="bar ${this.position} style-${this.tabStyle}" part="bar">
        <span class="indicator" part="indicator" style="opacity:0;"></span>
        ${this.items.map(
          (item, index) => html`
            <tabdeck-tab
              .label=${item.name}
              .icon=${item.icon}
              .badge=${item.badge}
              .accent=${item.accent}
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
    /* The single sliding active-tab indicator. A full tab-sized box positioned
       by JS; each style paints it differently. Sits beneath the tab content. */
    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
      pointer-events: none;
      z-index: 0;
    }
    tabdeck-tab {
      position: relative;
      z-index: 1;
    }
    @media (prefers-reduced-motion: no-preference) {
      .indicator {
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
          width 250ms cubic-bezier(0.4, 0, 0.2, 1),
          height 250ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    .bar.top.style-underline .indicator,
    .bar.bottom.style-underline .indicator {
      border-bottom: 3px solid var(--tabdeck-accent, var(--primary-color));
    }
    .bar.left.style-underline .indicator {
      border-right: 3px solid var(--tabdeck-accent, var(--primary-color));
    }
    .bar.right.style-underline .indicator {
      border-left: 3px solid var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-pill .indicator {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
      border-radius: 999px;
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 4px;
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
