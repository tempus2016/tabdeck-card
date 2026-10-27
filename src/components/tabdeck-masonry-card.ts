import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig } from "../types";
import { getCreateCardElement } from "../lib/card-lifecycle";
import { distributeMasonry } from "../lib/layout";

// Cards balanced into columns like HA's masonry view: each card goes into the
// shortest column. A tab gets one with `layout: masonry` + `cards:`.
// `columns: N` is fixed; `min_column_width: px` fits as many as the width allows.
@customElement("tabdeck-masonry-card")
export class TabdeckMasonryCard extends LitElement {
  @state() private _cards: any[] = [];
  @state() private _width = 0;
  // Measured getCardSize per card (HA's cards may answer asynchronously).
  @state() private _sizes: number[] = [];
  private _config?: { columns?: number; min_column_width?: number; cards: LovelaceCardConfig[] };
  private _hass?: HomeAssistant;
  private _observer?: ResizeObserver;

  setConfig(config: any): void {
    if (!Array.isArray(config?.cards) || config.cards.length === 0) {
      throw new Error("tabdeck-masonry-card: cards is required.");
    }
    this._config = config;
    void this._build();
  }

  private async _build(): Promise<void> {
    const create = await getCreateCardElement();
    this._cards = this._config!.cards.map((c) => {
      const el = create(c);
      if (this._hass) el.hass = this._hass;
      return el;
    });
    this._sizes = this._cards.map(() => 1);
    await this._measure();
  }

  // Ask each card its size once it's defined; HA cards may return a promise.
  async _measure(): Promise<void> {
    const cards = this._cards;
    const sizes = await Promise.all(cards.map((c) => this._sizeOf(c)));
    if (cards === this._cards) this._sizes = sizes;
  }

  private async _sizeOf(card: any): Promise<number> {
    try {
      const tag = card?.localName ?? "";
      if (typeof card?.getCardSize !== "function" && tag.includes("-")) {
        await Promise.race([customElements.whenDefined(tag), new Promise((r) => setTimeout(r, 2000))]);
      }
      const s = typeof card?.getCardSize === "function" ? await card.getCardSize() : 1;
      return typeof s === "number" && s > 0 ? s : 1;
    } catch {
      return 1;
    }
  }

  set hass(hass: HomeAssistant) {
    const first = !this._hass;
    this._hass = hass;
    for (const c of this._cards) c.hass = hass;
    // Some cards size themselves from state: measure again once it arrives.
    if (first && this._cards.length) void this._measure();
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this._config?.min_column_width && typeof ResizeObserver !== "undefined") {
      this._observer = new ResizeObserver((e) => this._setWidth(e[0]?.contentRect?.width ?? 0));
      this._observer.observe(this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = undefined;
  }

  // Separate from the observer so tests can drive it.
  _setWidth(width: number): void {
    const w = Math.round(width);
    if (w !== this._width) this._width = w;
  }

  private get _columnCount(): number {
    const cfg = this._config;
    if (!cfg) return 1;
    if (cfg.min_column_width) {
      if (this._width <= 0) return 1;
      return Math.max(1, Math.min(this._cards.length || 1, Math.floor(this._width / cfg.min_column_width)));
    }
    return Math.max(1, Math.round(cfg.columns ?? 2));
  }

  private _size(i: number): number {
    return this._sizes[i] ?? 1;
  }

  getCardSize(): number {
    const cols = distributeMasonry(this._cards.map((_c, i) => this._size(i)), this._columnCount);
    return Math.max(1, ...cols.map((col) => col.reduce((sum, i) => sum + this._size(i), 0)));
  }

  render() {
    if (this._cards.length === 0) return nothing;
    const count = this._columnCount;
    const cols = distributeMasonry(this._cards.map((_c, i) => this._size(i)), count);
    return html`
      <div class="masonry" style="--tabdeck-masonry-columns:${count}">
        ${cols.map((col) => html`<div class="column">${col.map((i) => this._cards[i])}</div>`)}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .masonry {
      display: grid;
      grid-template-columns: repeat(var(--tabdeck-masonry-columns, 2), minmax(0, 1fr));
      gap: var(--tabdeck-masonry-gap, 8px);
      align-items: start;
    }
    .column {
      display: flex;
      flex-direction: column;
      gap: var(--tabdeck-masonry-gap, 8px);
      min-width: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-masonry-card": TabdeckMasonryCard;
  }
}
