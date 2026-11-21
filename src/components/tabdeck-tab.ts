import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { defineOnce } from "../lib/define";
import { readableText } from "../lib/color";
import { reducedMotion, reducedMotionCss } from "../lib/motion";
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

export interface ExtraBadge {
  text?: string;
  icon?: string;
  color?: string;
  label?: string;
}

// Speed chip colour: under 100 ms fine, under 300 ms slow, else bad.
export function speedLevel(ms: number): "ok" | "slow" | "bad" {
  return ms < 100 ? "ok" : ms < 300 ? "slow" : "bad";
}

@defineOnce("tabdeck-tab")
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
  // changed_dot: something on this tab changed since it was last shown.
  @property({ type: Boolean, reflect: true }) changed = false;
  @property() changedLabel = "Changed since you last looked";
  // health_dim: most of this tab's devices are unavailable.
  @property({ type: Boolean, reflect: true }) unhealthy = false;
  @property() unhealthyLabel = "Most of this tab's devices are unavailable";
  // debug: speed: how long this tab's card took to draw (ms).
  @property({ type: Number, reflect: true }) speed?: number;
  // Progress ring around the icon (0–100; undefined = none).
  @property({ type: Number }) ring?: number;
  @property() ringColor?: string;
  // ring_style: "bar" draws the ring's value as a bar under the tab.
  @property({ reflect: true, attribute: "ring-style" }) ringStyle?: "bar";
  // Mini graph: SVG polyline points in a 44 × 12 box.
  @property() graph?: string;
  @property() graphColor?: string;
  // An icon shown as the badge.
  @property() badgeIcon?: string;
  // More badges after the main one (badges: [...]): text or icon, own colour.
  @property({ attribute: false }) extraBadges?: ExtraBadge[];
  // badge_bounce: the badge jumps when its value changes.
  @property({ type: Boolean }) bounce = false;
  // Values arriving just after the tab appears don't bounce.
  _bounceFrom = 0;
  // A picture (URL) shown round instead of the icon.
  @property() picture?: string;
  // spin | pulse | bounce | shake | beat (reflected for the CSS).
  @property({ reflect: true, attribute: "icon-animation" }) iconAnimation?: string;
  // This tab's label font: CSS size / weight / family.
  @property({ attribute: false }) font?: { size?: string; weight?: string; family?: string };

  connectedCallback(): void {
    super.connectedCallback();
    this._bounceFrom = Date.now() + 1500;
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

  updated(changed: Map<string, unknown>): void {
    this._applyFont(changed);
    if (this.bounce && changed.has("badge") && !changed.has("bounce") && Date.now() >= this._bounceFrom) this._bounceBadge();
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
    this._applyReadableText();
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
    const hasIcon = !!this.icon || !!this.picture;
    const showIcon = display !== "label" && hasIcon;
    const showLabel = display !== "icon" || !hasIcon;
    return html`
      <div class="inner">
        ${showIcon ? this._renderIcon() : nothing}
        ${showLabel && this.label
          ? html`<span class="text">
              <span class="label">${this.label}</span>
              ${this.subtitle
                ? html`<span class="subtitle">${this.subtitle}</span>`
                : nothing}
            </span>`
          : nothing}
        ${this.graph
          ? html`<svg class="graph" part="graph" viewBox="0 0 44 12" aria-hidden="true"
              ><polyline points=${this.graph} style=${this.graphColor ? `stroke:${this.graphColor}` : ""}></polyline
            ></svg>`
          : nothing}
        ${this.extraBadges?.length
          ? html`<span class="badges">${this._renderBadge()}${this.extraBadges.map((b) => this._renderExtra(b))}</span>`
          : this._renderBadge()}
        ${this.changed && !this.selected
          ? html`<span class="changed-dot" part="changed-dot" role="img" aria-label=${this.changedLabel} title=${this.changedLabel}></span>`
          : nothing}
        ${this.unhealthy
          ? html`<ha-icon class="health-mark" icon="mdi:alert-circle-outline" role="img" aria-label=${this.unhealthyLabel} title=${this.unhealthyLabel}></ha-icon>`
          : nothing}
        ${this.hasMenu ? html`<span class="caret" aria-hidden="true">▾</span>` : nothing}
        ${this.ghost
          ? html`<ha-icon class="ghost-mark" icon="mdi:eye-off-outline" aria-hidden="true"></ha-icon>`
          : nothing}
      </div>
      ${this._renderProgress()}
      ${this.speed !== undefined ? html`<span class="speed ${speedLevel(this.speed)}" part="speed">${Math.round(this.speed)} ms</span>` : nothing}
    `;
  }

  private _renderIcon() {
    const glyph = this.picture
      ? html`<img class="picture icon" src=${this.picture} alt="" loading="lazy" />`
      : html`<ha-icon class="icon" icon=${this.icon}></ha-icon>`;
    if (this.ringStyle === "bar" || !this._hasRing()) {
      return glyph;
    }
    // pathLength=100 lets the dash array be the percentage directly.
    return html`<span class="icon-wrap">
      <svg class="ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="ring-track" cx="18" cy="18" r="16" pathLength="100"></circle>
        <circle
          class="ring-value"
          cx="18"
          cy="18"
          r="16"
          pathLength="100"
          stroke-dasharray="${Math.round(this.ring!)} 100"
          style=${this.ringColor ? `stroke:${this.ringColor}` : ""}
        ></circle>
      </svg>
      ${glyph}
    </span>`;
  }

  private _bounceBadge(): void {
    const el = this.renderRoot.querySelector(".badges, .badge, .badge-dot") as HTMLElement | null;
    if (!el || typeof el.animate !== "function") return;
    if (reducedMotion()) return;
    el.animate([{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(0.9)" }, { transform: "scale(1)" }], {
      duration: 450,
      easing: "ease-out",
    });
  }

  private _hasRing(): boolean {
    return this.ring !== undefined && this.ring !== null && Number.isFinite(this.ring);
  }

  private _renderProgress() {
    if (this.ringStyle !== "bar" || !this._hasRing()) return nothing;
    const pct = Math.round(this.ring!);
    return html`<span class="progress" part="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${pct}
      ><span class="progress-value" style="width:${pct}%${this.ringColor ? `;background:${this.ringColor}` : ""}"></span
    ></span>`;
  }

  private _applyFont(changed: Map<string, unknown>): void {
    if (changed.has("font")) {
      const f = this.font ?? {};
      for (const [key, value] of [["size", f.size], ["weight", f.weight], ["family", f.family]] as const) {
        if (value) this.style.setProperty(`--tabdeck-tab-font-${key}`, value);
        else this.style.removeProperty(`--tabdeck-tab-font-${key}`);
      }
    }
  }

  // Black or white text on solid fills (a coloured badge, a FAB), whichever
  // reads better, unless a colour is set explicitly.
  private _applyReadableText(): void {
    for (const badge of this.renderRoot.querySelectorAll<HTMLElement>(".badge:not(.icon-badge)")) {
      const text = badge.style.background ? readableText(getComputedStyle(badge).backgroundColor) : undefined;
      badge.style.color = text ?? "";
    }
    if (this.fab && !this.color) {
      this.style.color = readableText(getComputedStyle(this).backgroundColor) ?? "";
    }
  }

  private _renderExtra(b: ExtraBadge) {
    const bg = b.color ? `background:${b.color}` : "";
    if (this.badgeDisplay === "dot") {
      return b.icon || isActiveBadge(b.text) ? html`<span class="badge-dot" part="badge-dot" style=${bg}></span>` : nothing;
    }
    return html`<span class="badge${b.icon ? " icon-badge" : ""}" part="badge" style=${bg} aria-label=${b.label ?? ""}
      >${b.icon ? html`<ha-icon icon=${b.icon}></ha-icon>` : b.text}</span
    >`;
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
    if (this.badgeIcon && (this.badge === undefined || isActiveBadge(this.badge))) {
      return html`<span
        class="badge icon-badge${cls}"
        part="badge"
        style=${bg}
        aria-label=${this.badgeLabel ?? `badge: ${this.badge ?? ""}`}
        @click=${this._onBadgeClick}
        ><ha-icon icon=${this.badgeIcon}></ha-icon
      ></span>`;
    }
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
    ${reducedMotionCss}
    :host {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding: var(--tabdeck-tab-padding, var(--tabdeck-density-padding, 0 16px));
      height: var(--tabdeck-tab-height, var(--tabdeck-density-height, 48px));
      cursor: pointer;
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      font-size: var(--tabdeck-tab-font-size, var(--tabdeck-density-font-size, 14px));
      font-weight: var(--tabdeck-tab-font-weight, normal);
      font-family: var(--tabdeck-tab-font-family, var(--paper-font-body1_-_font-family, inherit));
      border-radius: var(--tabdeck-tab-radius, 0);
      user-select: none;
      white-space: nowrap;
      outline: none;
      transition: color 120ms ease;
    }
    :host([selected]) {
      color: var(--tabdeck-selected-color, var(--tabdeck-selected-auto, var(--tabdeck-accent, var(--primary-color))));
    }
    /* icon_animation */
    :host([icon-animation="spin"]) .icon {
      animation: tabdeck-spin 1.6s linear infinite;
    }
    :host([icon-animation="pulse"]) .icon {
      animation: tabdeck-pulse 1.4s ease-in-out infinite;
    }
    :host([icon-animation="bounce"]) .icon {
      animation: tabdeck-bounce 1s ease-in-out infinite;
    }
    :host([icon-animation="shake"]) .icon {
      animation: tabdeck-shake 0.9s ease-in-out infinite;
    }
    :host([icon-animation="beat"]) .icon {
      animation: tabdeck-beat 1.2s ease-in-out infinite;
    }
    @keyframes tabdeck-spin {
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes tabdeck-pulse {
      50% {
        transform: scale(1.18);
        opacity: 0.7;
      }
    }
    @keyframes tabdeck-bounce {
      50% {
        transform: translateY(-3px);
      }
    }
    @keyframes tabdeck-shake {
      20%,
      60% {
        transform: rotate(-12deg);
      }
      40%,
      80% {
        transform: rotate(12deg);
      }
    }
    @keyframes tabdeck-beat {
      15%,
      45% {
        transform: scale(1.2);
      }
      30% {
        transform: scale(1);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([icon-animation]) .icon {
        animation: none;
      }
    }
    .picture {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    .icon-wrap .picture {
      width: 22px;
      height: 22px;
    }
    /* alert: a gentle pulsing tint + alert-coloured label/icon. */
    :host([alert]) {
      color: var(--tabdeck-alert-color, var(--error-color, #db4437));
      border-radius: var(--tabdeck-alert-radius, 8px);
      /* quiet_hours sets none: the label stays red, without the pulse. */
      animation: var(--tabdeck-alert-animation, tabdeck-alert-pulse 1.6s ease-in-out infinite);
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
    :host([stacked]) .badge-dot,
    :host([stacked]) .badges {
      position: absolute;
      top: -4px;
      inset-inline-start: calc(50% + 6px);
    }
    .badges {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    :host([stacked]) .badges > * {
      position: static;
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
      margin-inline-start: -2px;
    }
    .ghost-mark {
      --mdc-icon-size: 14px;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 var(--tabdeck-focus-width, 2px) var(--tabdeck-focus-color, var(--tabdeck-accent, var(--primary-color)));
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
      color: var(--tabdeck-tab-color, var(--secondary-text-color));
      opacity: 0.9;
    }
    ha-icon {
      --mdc-icon-size: var(--tabdeck-icon-size, 22px);
    }
    .icon-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 18px;
    }
    .ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ring circle {
      fill: none;
      stroke-width: 3;
    }
    .ring-track {
      stroke: var(--tabdeck-ring-track, rgba(127, 127, 127, 0.25));
    }
    .ring-value {
      stroke: var(--tabdeck-ring-color, var(--tabdeck-accent, var(--primary-color)));
      stroke-linecap: round;
    }
    .graph {
      width: var(--tabdeck-graph-width, 44px);
      height: var(--tabdeck-graph-height, 12px);
      flex-shrink: 0;
      overflow: visible;
    }
    .graph polyline {
      fill: none;
      stroke: var(--tabdeck-graph-color, currentColor);
      stroke-width: 1.5;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    /* ring_style: bar */
    :host([ring-style="bar"]) {
      position: relative;
    }
    .progress {
      position: absolute;
      inset-inline: 12%;
      bottom: var(--tabdeck-progress-offset, 5px);
      height: var(--tabdeck-progress-height, 3px);
      border-radius: 3px;
      overflow: hidden;
      background: var(--tabdeck-ring-track, rgba(127, 127, 127, 0.25));
    }
    .progress-value {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--tabdeck-ring-color, var(--tabdeck-accent, var(--primary-color)));
    }
    .icon-badge {
      padding: 0 3px;
    }
    .icon-badge ha-icon {
      --mdc-icon-size: 13px;
    }
    .badge {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)));
      color: var(--tabdeck-badge-color, var(--text-primary-color, #fff));
      font-size: 11px;
      line-height: 18px;
      text-align: center;
    }
    :host([selected]) .badge {
      background: var(
        --tabdeck-selected-badge-background,
        var(--tabdeck-badge-background, var(--tabdeck-accent, var(--primary-color)))
      );
      color: var(--tabdeck-selected-badge-color, var(--tabdeck-badge-color, var(--text-primary-color, #fff)));
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tabdeck-accent, var(--primary-color));
      flex-shrink: 0;
    }
    :host([unhealthy]) .icon,
    :host([unhealthy]) .icon-wrap,
    :host([unhealthy]) .text {
      opacity: var(--tabdeck-unhealthy-opacity, 0.45);
    }
    .health-mark {
      --mdc-icon-size: 16px;
      color: var(--tabdeck-unhealthy-color, var(--warning-color, #ff9800));
      flex-shrink: 0;
    }
    :host([stacked]) .health-mark {
      position: absolute;
      top: 0;
      inset-inline-start: calc(50% + 6px);
    }
    :host([speed]) {
      position: relative;
    }
    .speed {
      position: absolute;
      top: 1px;
      inset-inline-end: 2px;
      padding: 0 4px;
      border-radius: 6px;
      font: 600 9px/14px ui-monospace, monospace;
      color: #fff;
      background: var(--success-color, #43a047);
      pointer-events: none;
    }
    .speed.slow {
      background: var(--warning-color, #ff9800);
    }
    .speed.bad {
      background: var(--error-color, #db4437);
    }
    .changed-dot {
      width: var(--tabdeck-changed-size, 7px);
      height: var(--tabdeck-changed-size, 7px);
      border-radius: 50%;
      background: var(--tabdeck-changed-color, var(--accent-color, #ff9800));
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: 2px;
    }
    :host([stacked]) .changed-dot {
      position: absolute;
      top: 2px;
      inset-inline-end: calc(50% - 18px);
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
