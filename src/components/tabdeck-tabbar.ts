import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { TabPosition, TabStyle } from "../lib/config";
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

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._onKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener("keydown", this._onKeydown);
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

  render() {
    return html`
      <div class="bar ${this.position} style-${this.tabStyle}" part="bar">
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
    .bar.style-underline tabdeck-tab[selected] {
      box-shadow: inset 0 -3px 0 0 var(--tabdeck-accent, var(--primary-color));
    }
    .bar.style-pill {
      gap: 6px;
      border: none;
      padding: 6px;
    }
    .bar.style-pill tabdeck-tab {
      border-radius: 999px;
    }
    .bar.style-pill tabdeck-tab[selected] {
      background: color-mix(
        in srgb,
        var(--tabdeck-accent, var(--primary-color)) 18%,
        transparent
      );
    }
    .bar.style-segmented {
      gap: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 4px;
    }
    .bar.style-segmented tabdeck-tab[selected] {
      background: var(--card-background-color);
      border-radius: 7px;
    }
    @media (prefers-reduced-motion: no-preference) {
      tabdeck-tab {
        transition: background 150ms ease, box-shadow 150ms ease;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tabbar": TabdeckTabbar;
  }
}
