// overview: every content tab as a live thumbnail in a grid. A two-finger
// pinch-in over the content opens it.
import { isActionTab, type TabdeckTabConfig } from "./config";

export interface TouchLike {
  clientX: number;
  clientY: number;
}

export function touchDistance(a: TouchLike, b: TouchLike): number {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

// Fingers that started at least 40px apart and closed to under 70% of that.
export function isPinchIn(start: number, now: number): boolean {
  return start >= 40 && now < start * 0.7;
}

export interface OverviewTile {
  index: number;
  tab: TabdeckTabConfig;
  locked: boolean;
}

// The tiles: every visible tab that has content to open (disabled and action
// tabs are left out). A PIN-locked tab shows a lock instead of its card.
export function overviewTiles(
  visible: TabdeckTabConfig[],
  isLocked: (tab: TabdeckTabConfig) => boolean,
): OverviewTile[] {
  return visible
    .map((tab, index) => ({ index, tab, locked: false }))
    .filter(({ tab }) => !tab.disabled && !isActionTab(tab))
    .map((t) => ({ ...t, locked: isLocked(t.tab) }));
}
