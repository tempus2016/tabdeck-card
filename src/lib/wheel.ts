// wheel_switch: turn mouse-wheel / trackpad scrolling over the tab bar into
// one tab step per gesture. A mouse notch is ~100 px; trackpads send many
// small deltas and keep sending them (inertia) after the fingers lift, so the
// deltas are summed until THRESHOLD and then ignored until the stream pauses.

export interface WheelLike {
  deltaX: number;
  deltaY: number;
  deltaMode: number;
  timeStamp: number;
}

const THRESHOLD = 40; // px
const LINE = 16; // px per line (deltaMode 1, Firefox)
const PAGE = 400; // px per page (deltaMode 2)
const GAP = 250; // ms without wheel events ends a gesture

// Returns a stepper: feed it each wheel event, it returns 1 (next), -1
// (previous) or 0 (nothing yet / still the same gesture).
export function createWheelStepper(): (e: WheelLike) => -1 | 0 | 1 {
  let sum = 0;
  let last = -Infinity;
  let stepped = false;
  return (e) => {
    if (e.timeStamp - last > GAP) {
      sum = 0;
      stepped = false;
    }
    last = e.timeStamp;
    if (stepped) return 0;
    const unit = e.deltaMode === 1 ? LINE : e.deltaMode === 2 ? PAGE : 1;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    sum += delta * unit;
    if (Math.abs(sum) < THRESHOLD) return 0;
    const dir = sum > 0 ? 1 : -1;
    sum = 0;
    stepped = true;
    return dir;
  };
}
