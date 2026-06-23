import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("tabdeck-tab")
export class TabdeckTab extends LitElement {
  @property() label?: string;
  @property() icon?: string;
  @property() badge?: string;
  @property() accent?: string;
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
  }

  render() {
    return html`
      <div class="inner">
        ${this.icon ? html`<ha-icon icon=${this.icon}></ha-icon>` : nothing}
        ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
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
