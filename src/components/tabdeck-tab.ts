import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { TabDisplay } from "../lib/config";

@customElement("tabdeck-tab")
export class TabdeckTab extends LitElement {
  @property() label?: string;
  @property() icon?: string;
  @property() badge?: string;
  @property() accent?: string;
  @property() color?: string;
  @property() display: TabDisplay = "both";
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tab");
  }

  updated(): void {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
    this.tabIndex = this.selected ? 0 : -1;
    if (this.accent) this.style.setProperty("--tabdeck-accent", this.accent);
    // A per-tab `color` overrides the label/icon colour in every state (inline
    // host colour beats the :host([selected]) accent rule).
    if (this.color) this.style.color = this.color;
    else this.style.removeProperty("color");
  }

  render() {
    // Honour the display mode, but never render an empty tab: fall back to the
    // label when icon-only is requested on a tab that has no icon.
    const hasIcon = !!this.icon;
    const showIcon = this.display !== "label" && hasIcon;
    const showLabel = this.display !== "icon" || !hasIcon;
    return html`
      <div class="inner">
        ${showIcon ? html`<ha-icon icon=${this.icon}></ha-icon>` : nothing}
        ${showLabel && this.label
          ? html`<span class="label">${this.label}</span>`
          : nothing}
        ${this.badge ? html`<span class="badge">${this.badge}</span>` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 16px;
      height: var(--tabdeck-tab-height, 48px);
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: var(--tabdeck-tab-font-size, 14px);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      user-select: none;
      white-space: nowrap;
      outline: none;
      transition: color 120ms ease;
    }
    :host([selected]) {
      color: var(--tabdeck-accent, var(--primary-color));
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 2px var(--tabdeck-accent, var(--primary-color));
      border-radius: 6px;
    }
    .inner {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    .badge {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--tabdeck-accent, var(--primary-color));
      color: var(--text-primary-color, #fff);
      font-size: 11px;
      line-height: 18px;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tab": TabdeckTab;
  }
}
