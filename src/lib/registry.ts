// window.tabdeck: one page-wide object to list and drive every deck from
// the browser console, other cards or your own JavaScript. Each connected
// deck registers itself; nothing else is put on window.
//
//   tabdeck.list()                       → [{ id, tab, index, tabs, names }]
//   tabdeck.get("main")?.select("Cameras") → true
//   tabdeck.select("main", "next")       → true
//   tabdeck.on("tab-changed", (d) => …)  → unsubscribe function
//
// Events (also plain EventTarget events, detail as below):
//   tab-changed { id, index, name, previous }
//   added / removed { id }

export interface RegisteredDeck {
  // The deck's id: event_id, else storage_key, else its config hash.
  readonly deckId: string;
  readonly element: HTMLElement;
  names(): string[];
  current(): { index: number; name: string | undefined };
  // Name, index or slug; step words next / previous / back / default.
  select(target: number | string): boolean;
}

export interface DeckInfo {
  id: string;
  tab: string | undefined;
  index: number;
  tabs: number;
  names: string[];
}

export interface DeckHandle extends DeckInfo {
  element: HTMLElement;
  select(target: number | string): boolean;
  next(): boolean;
  previous(): boolean;
  back(): boolean;
  default(): boolean;
}

export type RegistryEvent = "tab-changed" | "added" | "removed";

const MARK = "__tabdeckRegistry";

function onScreen(el: HTMLElement): boolean {
  const check = (el as any).checkVisibility;
  return el.isConnected && (typeof check !== "function" || check.call(el));
}

export class TabdeckRegistry extends EventTarget {
  readonly [MARK] = 1;
  readonly version: string;
  private _decks = new Set<RegisteredDeck>();

  constructor(version: string) {
    super();
    this.version = version;
  }

  // Internal: called by each deck when it connects. Returns the unregister
  // function; registering the same deck twice is a no-op.
  _register(deck: RegisteredDeck): () => void {
    if (!this._decks.has(deck)) {
      this._decks.add(deck);
      this._emit("added", { id: deck.deckId });
    }
    return () => {
      if (this._decks.delete(deck)) this._emit("removed", { id: deck.deckId });
    };
  }

  // Internal: a deck changed tab.
  _changed(deck: RegisteredDeck, index: number, name: string | undefined, previous: string | undefined): void {
    if (this._decks.has(deck)) this._emit("tab-changed", { id: deck.deckId, index, name, previous });
  }

  private _emit(type: RegistryEvent, detail: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }

  private _info(d: RegisteredDeck): DeckInfo {
    const names = d.names();
    const cur = d.current();
    return { id: d.deckId, tab: cur.name, index: cur.index, tabs: names.length, names };
  }

  // Every deck on the page, in the order they connected.
  list(): DeckInfo[] {
    return [...this._decks].filter((d) => d.element.isConnected).map((d) => this._info(d));
  }

  // A deck by id (the one on screen first, when several share it); without
  // an id, the first deck on screen.
  get(id?: string): DeckHandle | undefined {
    const all = [...this._decks].filter((d) => d.element.isConnected && (id === undefined || d.deckId === id));
    const deck = all.find((d) => onScreen(d.element)) ?? all[0];
    if (!deck) return undefined;
    const info = this._info(deck);
    const sel = (t: number | string) => deck.select(t);
    return {
      ...info,
      element: deck.element,
      select: sel,
      next: () => sel("next"),
      previous: () => sel("previous"),
      back: () => sel("back"),
      default: () => sel("default"),
    };
  }

  select(id: string, target: number | string): boolean {
    return this.get(id)?.select(target) ?? false;
  }

  // Listen for an event; returns a function that stops listening.
  on(type: RegistryEvent, fn: (detail: any) => void): () => void {
    const h = (e: Event) => fn((e as CustomEvent).detail);
    this.addEventListener(type, h);
    return () => this.removeEventListener(type, h);
  }
}

// The page's registry: reuses one another copy of the card already made
// (two bundles on one page), else puts a new one on window.tabdeck. Leaves
// a window.tabdeck that isn't ours alone and returns a private registry.
let fallback: TabdeckRegistry | undefined;
export function tabdeckRegistry(version: string, win: any = typeof window !== "undefined" ? window : undefined): TabdeckRegistry {
  const existing = win?.tabdeck;
  if (existing && existing[MARK]) return existing as TabdeckRegistry;
  if (win && existing === undefined) {
    const reg = new TabdeckRegistry(version);
    Object.defineProperty(win, "tabdeck", { value: reg, configurable: true, enumerable: false, writable: false });
    return reg;
  }
  return (fallback ??= new TabdeckRegistry(version));
}
