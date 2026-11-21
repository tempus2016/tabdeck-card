// bar_autohide: the tab bar slides away while the page scrolls down and
// comes back as soon as it scrolls up. Pure state machine, fed scroll
// positions; the card applies `hidden` to the bar.

export interface AutoHideState {
  // Last scroll position seen (px).
  y: number;
  // Distance travelled in the current direction (px; + down, - up).
  run: number;
  hidden: boolean;
}

// y < 0: nothing seen yet (the first position is only recorded).
export const AUTOHIDE_START: AutoHideState = { y: -1, run: 0, hidden: false };

// Scrolling this far in one direction flips the bar.
export const AUTOHIDE_THRESHOLD = 24;
// The bar always shows this close to the top of the page.
export const AUTOHIDE_TOP = 64;

export function autoHideStep(state: AutoHideState, y: number, threshold = AUTOHIDE_THRESHOLD): AutoHideState {
  if (state.y < 0) return { y, run: 0, hidden: false };
  const dy = y - state.y;
  if (y <= AUTOHIDE_TOP) return { y, run: 0, hidden: false };
  if (dy === 0) return state;
  // A change of direction starts a new run.
  const run = Math.sign(dy) === Math.sign(state.run) ? state.run + dy : dy;
  let hidden = state.hidden;
  if (run >= threshold) hidden = true;
  else if (run <= -threshold) hidden = false;
  return { y, run, hidden };
}
