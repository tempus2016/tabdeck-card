import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { BadgeDisplay, TabDisplay } from "../lib/config";

// A badge value counts as "active" (worth a dot) when it isn't an empty/zero/
// off-like state. Used by dot badge mode.
const INACTIVE_BADGE = new Set([
  "", "0", "off", "false", "no", "none", "unavailable", "unknown", "closed",
]);
export function isActiveBadge(value?: string): boolean {
  if (value === undefined || value === null) return false;
  const v = String(value).trim().toLowerCase();
  // Any numeric zero ("0.0", "-0") is inactive too, not just the literal "0".
  if (v !== "" && Number(v) === 0) return false;
  return !INACTIVE_BADGE.has(v);
}

@customElement("tabdeck-tab")
export class TabdeckTab extends LitElement {
  @property() label?: string;
  @property() subtitle?: string;
  @property() icon?: string;
  @property() badge?: string;
  @property() badgeColor?: string;
  @property({ type: Boolean }) badgeAction = false;
  @property() badgeDisplay: BadgeDisplay = "text";
  @property() accent?: string;
  @property() color?: string;
  @property({ reflect: true }) display: TabDisplay = "both";
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  // Pulses to draw attention while the tab's alert conditions are met.
  @property({ type: Boolean, reflect: true }) alert = false;
  // Action (navigation) tab: always focusable, Enter/Space activates it.
  @property({ type: Boolean, reflect: true }) action = false;
  // Edit mode only: the tab is normally hidden (visibility unmet) and is shown
  // faded so it can still be reached while editing.
  @property({ type: Boolean, reflect: true }) ghost = false;
  // Icon above a small label (dock / bottom navigation layout).
  @property({ type: Boolean, reflect: true }) stacked = false;
  // Raised round accent button (floating action tab).
  @property({ type: Boolean, reflect: true }) fab = false;
  // Opens a menu of sub-tabs (grouped tab): shows a ▾ caret.
  @property({ type: Boolean, reflect: true }) hasMenu = false;
  @property() ghostLabel = "Hidden: its visibility conditions aren't met (shown while editing)";
  // Accessible label for the badge (localised by the bar).
  @property() badgeLabel?: string;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tab");
    this.addEventListener("keydown", this._onKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener("keydown", this._onKeydown);
    super.disconnectedCallback();
  }

  private _onKeydown = (e: KeyboardEvent): void => {
    if (this.action && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      this.click();
    }
  };

  updated(): void {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
    this.tabIndex = this.selected || this.action ? 0 : -1;
    if (this.accent) this.style.setProperty("--tabdeck-accent", this.accent);
    // A per-tab `color` overrides the label/icon colour in every state (inline
    // host colour beats the :host([selected]) accent rule).
    if (this.color) this.style.color = this.color;
    else this.style.removeProperty("color");
    if (this.ghost) this.title = this.ghostLabel;
    else this.removeAttribute("title");
    // Dots have no visible text, so name the tab for assistive tech.
    if (this.display === "dots" && this.label) this.setAttribute("aria-label", this.label);
    else this.removeAttribute("aria-label");
  }

  render() {
    if (this.display === "dots") {
      return html`<span class="dot" part="dot"></span>`;
    }
    // Honour the display mode, but never render an empty tab: fall back to the
    // label when icon-only is requested on a tab that has no icon.
    // "active" is icon-only for unselected tabs and "both" for the selected one.
    const display =
      this.display === "active" ? (this.selected ? "both" : "icon") : this.display;
    const hasIcon = !!this.icon;
    const showIcon = display !== "label" && hasIcon;
    const showLabel = display !== "icon" || !hasIcon;
    return html`
      <div class="inner">
        ${showIcon ? html`<ha-icon icon=${this.icon}></ha-icon>` : nothing}
        ${showLabel && this.label
          ? html`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle
                ? html`<span class="subtitle">${this.subtitle}</span>`
                : nothing}
            </span>`
          : nothing}
        ${this._renderBadge()}
        ${this.hasMenu ? html`<span class="caret" aria-hidden="true">▾</span>` : nothing}
        ${this.ghost
          ? html`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`
          : nothing}
      </div>
    `;
  }

  private _onBadgeClick(e: Event): void {
    if (!this.badgeAction) return;
    // Don't let a badge click also select the tab.
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("badge-click", { bubbles: true, composed: true }));
  }

  private _renderBadge() {
    const bg = this.badgeColor ? `background:${this.badgeColor}` : "";
    const cls = this.badgeAction ? " clickable" : "";
    if (this.badgeDisplay === "dot") {
      return isActiveBadge(this.badge)
        ? html`<span class="badge-dot${cls}" part="badge-dot" style=${bg} @click=${this._onBadgeClick}></span>`
        : nothing;
    }
    return this.badge
      ? html`<span
          class="badge${cls}"
          part="badge"
          style=${bg}
          aria-label=${this.badgeLabel ?? `badge: ${this.badge}`}
          @click=${this._onBadgeClick}
          >${this.badge}</span>`
      : nothing;
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
    /* alert: a gentle pulsing tint + alert-coloured label/icon. */
    :host([alert]) {
      color: var(--tabdeck-alert-color, var(--error-color, #db4437));
      border-radius: var(--tabdeck-alert-radius, 8px);
      animation: tabdeck-alert-pulse 1.6s ease-in-out infinite;
    }
    @keyframes tabdeck-alert-pulse {
      0%,
      100% {
        background: transparent;
      }
      50% {
        background: color-mix(
          in srgb,
          var(--tabdeck-alert-color, var(--error-color, #db4437)) 20%,
          transparent
        );
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([alert]) {
        animation: none;
        background: color-mix(
          in srgb,
          var(--tabdeck-alert-color, var(--error-color, #db4437)) 14%,
          transparent
        );
      }
    }
    /* dots: pagination dots; the selected one stretches into a pill. */
    :host([display="dots"]) {
      padding: 0 4px;
      height: var(--tabdeck-dot-area, 24px);
    }
    .dot {
      display: block;
      width: var(--tabdeck-dot-size, 8px);
      height: var(--tabdeck-dot-size, 8px);
      border-radius: 999px;
      background: var(--secondary-text-color);
      opacity: 0.5;
      transition: width 160ms ease, opacity 160ms ease, background 160ms ease;
    }
    :host([selected]) .dot {
      width: calc(var(--tabdeck-dot-size, 8px) * 2.5);
      opacity: 1;
      background: var(--tabdeck-accent, var(--primary-color));
    }
    :host([alert]) .dot {
      background: var(--tabdeck-alert-color, var(--error-color, #db4437));
      opacity: 1;
    }
    :host([stacked]) {
      flex-direction: column;
      justify-content: center;
      padding: 0 8px;
      height: var(--tabdeck-dock-tab-height, 56px);
      font-size: var(--tabdeck-dock-font-size, 11px);
    }
    :host([stacked]) .inner {
      flex-direction: column;
      gap: 2px;
      position: relative;
    }
    :host([stacked]) .text {
      align-items: center;
    }
    :host([stacked]) .subtitle {
      display: none;
    }
    :host([stacked]) .badge,
    :host([stacked]) .badge-dot {
      position: absolute;
      top: -4px;
      left: calc(50% + 6px);
    }
    :host([fab]) {
      color: var(--text-primary-color, #fff);
      padding: 0;
      align-self: center;
      justify-content: center;
      width: var(--tabdeck-fab-size, 48px);
      height: var(--tabdeck-fab-size, 48px);
      margin: 0 6px;
      border-radius: 50%;
      background: var(--tabdeck-fab-color, var(--tabdeck-accent, var(--primary-color)));
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      flex: 0 0 auto !important;
    }
    :host([fab][stacked]) {
      margin-top: -18px;
      width: var(--tabdeck-fab-size, 56px);
      height: var(--tabdeck-fab-size, 56px);
    }
    :host([fab]) .text,
    :host([fab]) .badge {
      display: none;
    }
    :host([fab]) ha-icon {
      --mdc-icon-size: 26px;
    }
    :host([ghost]) {
      opacity: 0.55;
      outline: 1px dashed currentColor;
      outline-offset: -6px;
      border-radius: 8px;
    }
    .caret {
      font-size: 11px;
      opacity: 0.7;
      margin-left: -2px;
    }
    .ghost-mark {
      --mdc-icon-size: 14px;
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
    .text {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.15;
    }
    .subtitle {
      font-size: 11px;
      font-weight: 400;
      color: var(--secondary-text-color);
      opacity: 0.9;
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
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tabdeck-accent, var(--primary-color));
      flex-shrink: 0;
    }
    .badge.clickable,
    .badge-dot.clickable {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-tab": TabdeckTab;
  }
}
