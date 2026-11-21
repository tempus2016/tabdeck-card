// page_background: while a tab is open, the whole dashboard view behind the
// deck takes its background. Home Assistant draws a view's background with
// <hui-view-background> (background: var(--view-background, …)) inside
// <hui-view-container>; older versions used --lovelace-background on the
// container. Only that view's own element is changed, and the value it had
// is put back when the tab changes or the deck leaves the page.
export interface BackgroundTarget {
  el: HTMLElement;
  prop: string;
}

interface Applied {
  owner: object;
  prev: string;
  priority: string;
}

const applied = new WeakMap<HTMLElement, Applied>();

// The view this node sits in, found up through shadow roots.
export function findBackgroundTarget(start: Node): BackgroundTarget | undefined {
  let node: Node | null = start;
  while (node) {
    if (node instanceof HTMLElement && node.localName === "hui-view-container") {
      const bg = Array.from(node.children).find((c) => c.localName === "hui-view-background") as HTMLElement | undefined;
      return bg ? { el: bg, prop: "--view-background" } : { el: node, prop: "--lovelace-background" };
    }
    node = node.parentNode ?? (node as ShadowRoot).host ?? null;
  }
  return undefined;
}

export function applyPageBackground(target: BackgroundTarget, owner: object, value: string): void {
  const { el, prop } = target;
  const mine = applied.get(el);
  if (!mine) {
    applied.set(el, { owner, prev: el.style.getPropertyValue(prop), priority: el.style.getPropertyPriority(prop) });
  } else if (mine.owner !== owner) {
    mine.owner = owner;
  }
  el.style.setProperty(prop, value, "important");
}

// Put the view's own value back, unless another deck has taken over since.
export function restorePageBackground(target: BackgroundTarget, owner: object): void {
  const { el, prop } = target;
  const mine = applied.get(el);
  if (!mine || mine.owner !== owner) return;
  applied.delete(el);
  if (mine.prev) el.style.setProperty(prop, mine.prev, mine.priority);
  else el.style.removeProperty(prop);
}
