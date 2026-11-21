// empty_message: a tab whose cards are all hidden (visibility conditions,
// conditional cards) shows a short message instead of a blank panel.
export interface EmptyMessage {
  title?: string;
  text?: string;
  icon?: string;
}

const str = (v: any): string | undefined => (typeof v === "string" && v.trim() ? v : undefined);

// true = the default title; "text" = a line under it; { title, text, icon }.
export function normalizeEmpty(raw: any): EmptyMessage | undefined {
  if (raw === true) return {};
  if (typeof raw === "string") return raw.trim() ? { text: raw } : undefined;
  if (!raw || typeof raw !== "object") return undefined;
  const out: EmptyMessage = {};
  for (const k of ["title", "text", "icon"] as const) if (str(raw[k])) out[k] = raw[k];
  return out;
}

export type PanelState = "loading" | "empty" | "none";

export interface PanelWatchOptions {
  // loading_placeholder: grey boxes until the card first has a height
  // (at most loadMax ms).
  loading: boolean;
  // empty_message: once the card has stayed 0 px tall for emptyDelay ms.
  empty: boolean;
  // The card already had a height (or finished loading) before.
  loaded?: boolean;
  emptyDelay?: number;
  loadMax?: number;
}

// Follows the open card's height and reports what the panel should show
// over it: "loading" boxes, the "empty" message, or "none". onLoaded fires
// once the card has had a height or has run out of loading time.
export function createPanelWatch(onState: (s: PanelState) => void, opts: PanelWatchOptions, onLoaded?: () => void) {
  let state: PanelState = "none";
  let loaded = !!opts.loaded || !opts.loading;
  let emptyTimer: ReturnType<typeof setTimeout> | undefined;
  let loadTimer: ReturnType<typeof setTimeout> | undefined;
  let lastHeight = -1;
  const set = (s: PanelState) => {
    if (s !== state) onState((state = s));
  };
  const finishLoading = () => {
    if (!loaded) {
      loaded = true;
      onLoaded?.();
    }
    if (loadTimer !== undefined) clearTimeout(loadTimer);
    loadTimer = undefined;
  };
  const stop = () => {
    if (emptyTimer !== undefined) clearTimeout(emptyTimer);
    if (loadTimer !== undefined) clearTimeout(loadTimer);
    emptyTimer = loadTimer = undefined;
  };
  const size = (height: number): void => {
    lastHeight = height;
    if (height > 0) {
      finishLoading();
      if (emptyTimer !== undefined) clearTimeout(emptyTimer);
      emptyTimer = undefined;
      set("none");
      return;
    }
    if (!loaded) {
      set("loading");
      loadTimer ??= setTimeout(() => {
        finishLoading();
        // Still nothing: the cards are hidden, not loading.
        if (lastHeight <= 0) {
          set(opts.empty ? "empty" : "none");
        }
      }, opts.loadMax ?? 4000);
      return;
    }
    if (!opts.empty || state === "empty") return;
    if (state === "loading") set("none");
    emptyTimer ??= setTimeout(() => {
      emptyTimer = undefined;
      set("empty");
    }, opts.emptyDelay ?? 800);
  };
  return { size, stop };
}
