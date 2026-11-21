// friendly_errors: find Home Assistant's error cards inside a tab and say in
// plain words what went wrong.
export interface CardProblem {
  // A card string key + vars, or the raw error text when it isn't a known one.
  key?: string;
  vars?: Record<string, string>;
  text?: string;
}

// The config HA gives an error card: { type: "error", message } (newer) or
// { type: "error", error, origConfig } (older).
export function explainCardError(config: any): CardProblem {
  const raw = config?.message ?? config?.error;
  const error = typeof raw === "string" ? raw : "";
  const type = typeof config?.origConfig?.type === "string" ? config.origConfig.type : "";
  const custom = error.match(/Custom element (?:doesn't exist|not found):\s*([\w-]+)/i);
  if (custom) return { key: "card.error_not_installed", vars: { type: `custom:${custom[1]}` } };
  const unknown = error.match(/Unknown type(?: encountered)?:\s*([\w:-]+)/i);
  if (unknown) return { key: "card.error_unknown_type", vars: { type: type || unknown[1] } };
  if (/no (card )?type/i.test(error)) return { key: "card.error_no_type" };
  return { text: (error || type || "?").slice(0, 160) };
}

// Showing (HA hides a custom card's error card for its first 2 s while the
// card's code may still arrive) or hidden by us.
function counts(el: HTMLElement): boolean {
  return el.dataset.tabdeckError === "hidden" || el.style.display.toLowerCase() !== "none";
}

// Every error card in `root`, through shadow roots.
export function findErrorCards(root: Element | undefined): HTMLElement[] {
  const found: HTMLElement[] = [];
  const walk = (n: Element | ShadowRoot) => {
    if (n instanceof HTMLElement && n.localName === "hui-error-card") {
      if (counts(n)) found.push(n);
      return;
    }
    if (n instanceof Element && n.shadowRoot) walk(n.shadowRoot);
    for (const c of Array.from(n.children)) walk(c);
  };
  if (root) walk(root);
  return found;
}

// Outside edit mode the friendly message replaces HA's error card; while
// editing HA's own card shows too, with the full details.
export function setErrorCardHidden(el: HTMLElement, hidden: boolean): void {
  if (hidden && el.dataset.tabdeckError !== "hidden") {
    el.dataset.tabdeckError = "hidden";
    el.style.display = "none";
  } else if (!hidden && el.dataset.tabdeckError === "hidden") {
    delete el.dataset.tabdeckError;
    el.style.display = "";
  }
}
