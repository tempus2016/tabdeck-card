// last_tab_button: flip back to the tab that was open before this one.
// The index of that tab among the visible tabs, or -1 when there's none to
// go to (no switch yet, it's hidden now, or it can't be opened).
export function lastTabIndex<T>(visible: T[], last: T | undefined, canOpen: (tab: T) => boolean): number {
  if (last === undefined) return -1;
  const i = visible.indexOf(last);
  return i >= 0 && canOpen(last) ? i : -1;
}
