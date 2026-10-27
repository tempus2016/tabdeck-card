import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig } from "../types";
import { getCreateCardElement } from "../lib/card-lifecycle";
import { cardGridColumns, sectionColumns } from "../lib/layout";

interface SectionConfig {
  title?: string;
  icon?: string;
  // HA heading-card badges (entities shown beside the title).
  badges?: any[];
  // Section columns this section spans (shrinks to fit narrow widths).
  column_span?: number;
  cards?: LovelaceCardConfig[];
}

interface BuiltSection {
  span: number;
  heading?: any;
  cards: { el: any; config: LovelaceCardConfig }[];
}

// Titled groups of cards laid out like HA's sections view: sections flow into
// as many columns as fit (each at least 320px wide),
// up to max_columns. Headings are HA's own heading card; cards sit on a
// 12-column grid sized by grid_options.columns or the card's own default.
@customElement("tabdeck-sections-card")
export class TabdeckSectionsCard extends LitElement {
  @state() private _sections: BuiltSection[] = [];
  @state() private _width = 0;
  // Bumped when card defaults (getGridOptions) become readable.
  @state() private _sized = 0;
  private _config?: { max_columns: number; sections: SectionConfig[] };
  private _hass?: HomeAssistant;
  private _observer?: ResizeObserver;

  setConfig(config: any): void {
    if (!Array.isArray(config?.sections) || config.sections.length === 0) {
      throw new Error("tabdeck-sections-card: sections is required.");
    }
    this._config = { max_columns: Math.max(1, Number(config.max_columns) || 4), sections: config.sections };
    void this._build();
  }

  private async _build(): Promise<void> {
    const create = await getCreateCardElement();
    const make = (c: LovelaceCardConfig) => {
      const el = create(c);
      if (this._hass) el.hass = this._hass;
      return el;
    };
    this._sections = this._config!.sections.map((s) => ({
      span: Math.max(1, Math.round(Number(s?.column_span) || 1)),
      heading: s?.title
        ? make({
            type: "heading",
            heading: s.title,
            ...(s.icon ? { icon: s.icon } : {}),
            heading_style: "title",
            ...(Array.isArray(s.badges) ? { badges: s.badges } : {}),
          })
        : undefined,
      cards: (Array.isArray(s?.cards) ? s.cards : []).map((c) => ({ el: make(c), config: c })),
    }));
    // A card's default width (getGridOptions) needs its element defined.
    const tags = new Set(
      this._sections.flatMap((s) => s.cards.map((c) => c.el?.localName ?? "")).filter((t) => t.includes("-")),
    );
    await Promise.race([
      Promise.all([...tags].map((t) => customElements.whenDefined(t))),
      new Promise((r) => setTimeout(r, 2000)),
    ]);
    this._sized++;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    for (const s of this._sections) {
      if (s.heading) s.heading.hass = hass;
      for (const c of s.cards) if (c.el) c.el.hass = hass;
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== "undefined") {
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

  private _cardColumns(card: { el: any; config: LovelaceCardConfig }): number {
    let defaults: { columns?: unknown } | undefined;
    try {
      defaults = typeof card.el?.getGridOptions === "function" ? card.el.getGridOptions() : undefined;
    } catch {
      defaults = undefined;
    }
    return cardGridColumns(card.config, defaults);
  }

  getCardSize(): number {
    return Math.max(1, ...this._sections.map((s) => s.cards.length * 2 + (s.heading ? 1 : 0)));
  }

  render() {
    if (!this._config || this._sections.length === 0) return nothing;
    const cols = sectionColumns(this._width, this._config.max_columns);
    return html`
      <div class="sections" style="--tabdeck-section-columns:${cols}">
        ${this._sections.map(
          (s) => html`
            <div class="section" style="grid-column:span ${Math.min(s.span, cols)}">
              ${s.heading ?? nothing}
              <div class="cards">
                ${s.cards.map(
                  (c) => html`<div class="cell" style="grid-column:span ${this._cardColumns(c)}">${c.el}</div>`,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .sections {
      display: grid;
      grid-template-columns: repeat(var(--tabdeck-section-columns, 1), minmax(0, 1fr));
      gap: var(--tabdeck-section-gap, 16px);
      align-items: start;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 8px;
    }
    .cell {
      min-width: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "tabdeck-sections-card": TabdeckSectionsCard;
  }
}
