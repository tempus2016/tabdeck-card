import type { HomeAssistant, LovelaceCardConfig } from "../types";

export type CreateCardElement = (config: LovelaceCardConfig) => any;

export async function getCreateCardElement(): Promise<CreateCardElement> {
  const helpers = await (window as any).loadCardHelpers();
  return (config: LovelaceCardConfig) => helpers.createCardElement(config);
}

export class CardManager extends EventTarget {
  private _create: CreateCardElement;
  private _configs: (LovelaceCardConfig | null)[] = [];
  private _elements: any[] = [];
  private _hass?: HomeAssistant;
  // How long creating each card took (ms), for the debug panel.
  readonly createMs: number[] = [];

  constructor(create: CreateCardElement) {
    super();
    this._create = create;
  }

  // A `null` config reserves the slot without building a card (e.g. action
  // tabs), keeping indices aligned with the tab list. `lazy`: build nothing
  // yet; ensure() builds each card the first time it's needed. Cards already
  // built for an unchanged config are kept.
  async build(configs: (LovelaceCardConfig | null)[], opts: { lazy?: boolean } = {}): Promise<void> {
    this._configs = configs.slice();
    this._elements = configs.map((cfg, index) => (opts.lazy ? undefined : this._make(cfg, index)));
  }

  private _make(config: LovelaceCardConfig | null, index: number): any {
    if (!config) return undefined;
    const start = performance.now();
    const el = this._create(config);
    this.createMs[index] = performance.now() - start;
    if (this._hass) el.hass = this._hass;
    el.addEventListener("ll-rebuild", (e: Event) => {
      e.stopPropagation();
      void this._rebuild(index);
    });
    return el;
  }

  get(index: number): any | undefined {
    return this._elements[index];
  }

  all(): any[] {
    return this._elements;
  }

  // Swap the card at `index` for one built from a new config (auto-content
  // tabs whose entity list changed).
  replace(index: number, config: LovelaceCardConfig | null): void {
    this._configs[index] = config;
    this._elements[index] = this._make(config, index);
  }

  // Swap a built card for a fresh one from the same config (auto_refresh).
  refresh(index: number): void {
    if (this._configs[index]) this._elements[index] = this._make(this._configs[index], index);
  }

  // Free a built card (unload_after); its config is kept so ensure() can
  // rebuild it.
  unload(index: number): void {
    this._elements[index] = undefined;
  }

  isLoaded(index: number): boolean {
    return !!this._elements[index];
  }

  // The card at `index`, rebuilt first if it was unloaded.
  ensure(index: number): any | undefined {
    if (!this._elements[index] && this._configs[index]) {
      this._elements[index] = this._make(this._configs[index], index);
    }
    return this._elements[index];
  }

  setHass(hass: HomeAssistant): void {
    this._hass = hass;
    for (const el of this._elements) if (el) el.hass = hass;
  }

  notifyVisible(index: number): void {
    const el = this._elements[index];
    if (el) el.dispatchEvent(new Event("resize"));
  }

  private async _rebuild(index: number): Promise<void> {
    const fresh = this._make(this._configs[index], index);
    if (!fresh) return;
    if (this._hass) fresh.hass = this._hass;
    this._elements[index] = fresh;
    this.dispatchEvent(new CustomEvent("ll-rebuild-done", { detail: { index } }));
  }
}
