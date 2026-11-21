// compare: a second tab shown beside the open one (long-press a tab).
// Its index among the visible tabs, or -1 when there's nothing to show: no
// tab is being compared, it's the open tab itself, it's hidden now, or it
// can't be opened (action / disabled / locked).
export function compareIndex<T>(visible: T[], tab: T | undefined, selected: number, canOpen: (tab: T) => boolean): number {
  if (tab === undefined) return -1;
  const i = visible.indexOf(tab);
  return i >= 0 && i !== selected && canOpen(tab) ? i : -1;
}
