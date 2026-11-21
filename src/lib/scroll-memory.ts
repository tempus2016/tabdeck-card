// scroll_memory: each tab remembers how far down the page it was, and going
// back to it scrolls there again. Home Assistant scrolls the window, so the
// window's position is what's kept (plus the content's own, when
// content_height / content_max_height make it scroll inside the card).
export interface ScrollPos {
  page: number;
  inner: number;
}

// Per deck (card key) and tab, for this page load.
const memory = new Map<string, ScrollPos>();

export function saveScroll(deck: string, tab: string, pos: ScrollPos): void {
  memory.set(`${deck}\n${tab}`, pos);
}

export function savedScroll(deck: string, tab: string): ScrollPos | undefined {
  return memory.get(`${deck}\n${tab}`);
}

export function clearScrollMemory(): void {
  memory.clear();
}

// Scroll to `target`, trying again a few times while the page is still too
// short (cards that are still drawing).
export function scrollWithRetry(get: () => number, set: (y: number) => void, target: number, tries = 3, wait = 250): void {
  set(target);
  if (Math.abs(get() - target) <= 2 || tries <= 1) return;
  setTimeout(() => scrollWithRetry(get, set, target, tries - 1, wait), wait);
}
