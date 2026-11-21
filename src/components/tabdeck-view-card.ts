import { LitElement, html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { defineOnce } from "../lib/define";
import type { HomeAssistant } from "../types";
import { getCreateCardElement } from "../lib/card-lifecycle";
import { findView, loadDashboard, parseViewRef, viewToCard, type ViewError, type ViewRef } from "../lib/view-source";
import { hassLanguage, localize } from "../lib/i18n";

// A tab with `view: /dashboard/view` gets one of these: it reads that
// dashboard's config (read only, once per page load) and shows the view's
// cards, or a message saying why it can't.
@defineOnce("tabdeck-view-card")
export class TabdeckViewCard extends LitElement {
  @state() private _card?: any;
  @state() private _error?: ViewError;
  private _ref?: ViewRef;
  private _hass?: HomeAssistant;
  private _started = false;

  setConfig(config: any): void {
    const ref = parseViewRef(config?.view);
    if (!ref) throw new Error("tabdeck-view-card: view is required (/dashboard/view).");
    this._ref = ref;
    this._started = false;
    this._card = undefined;
    this._error = undefined;
    this._maybeLoad();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._card) this._card.hass = hass;
    this._maybeLoad();
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._maybeLoad();
  }

  // A view tab inside the view it shows would draw itself forever.
  private _insideSameView(): boolean {
    const key = this._key();
    let node: Node | null = this.parentNode ?? (this.getRootNode() as ShadowRoot).host ?? null;
    while (node) {
      if (node instanceof TabdeckViewCard && node._key() === key) return true;
      node = node.parentNode ?? (node as ShadowRoot).host ?? null;
    }
    if (typeof location === "undefined") return false;
    const [dash, view] = location.pathname.replace(/^\/+/, "").split("/");
    return dash === this._ref!.dashboard && (view ?? "") === this._ref!.view;
  }

  private _key(): string {
    return `${this._ref?.dashboard}/${this._ref?.view}`;
  }

  private _maybeLoad(): void {
    if (this._started || !this._ref || !this._hass || !this.isConnected) return;
    this._started = true;
    if (this._insideSameView()) {
      this._error = "loop";
      return;
    }
    void this._load(this._ref);
  }

  private async _load(ref: ViewRef): Promise<void> {
    let config: any;
    try {
      config = await loadDashboard(this._hass, ref.dashboard);
    } catch {
      if (ref === this._ref) this._error = "missing_dashboard";
      return;
    }
    if (ref !== this._ref) return;
    if (config?.strategy) {
      this._error = "generated";
      return;
    }
    const view = findView(config, ref.view);
    if (!view) {
      this._error = "missing_view";
      return;
    }
    const { card, error } = viewToCard(view);
    if (error || !card) {
      this._error = error ?? "empty";
      return;
    }
    const create = await getCreateCardElement();
    if (ref !== this._ref) return;
    const el = create(card);
    if (this._hass) el.hass = this._hass;
    this._card = el;
  }

  getCardSize(): number {
    return typeof this._card?.getCardSize === "function" ? this._card.getCardSize() : 3;
  }

  render() {
    if (this._card) return this._card;
    if (!this._error) return nothing;
    const lang = hassLanguage(this._hass);
    return html`<div class="msg" role="note">
      <ha-icon icon="mdi:view-dashboard-outline"></ha-icon>
      <span>${localize(lang, `card.view_${this._error}`, { dashboard: this._ref!.dashboard, view: this._ref!.view || "1" })}</span>
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    .msg {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px;
      color: var(--secondary-text-color);
      border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: var(--ha-card-border-radius, 12px);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-view-card": TabdeckViewCard;
  }
}
