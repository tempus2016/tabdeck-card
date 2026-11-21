import { describe, it, expect } from "vitest";
import { createWheelStepper } from "./wheel";

const ev = (deltaY: number, timeStamp: number, extra: Partial<{ deltaX: number; deltaMode: number }> = {}) => ({
  deltaX: 0,
  deltaMode: 0,
  ...extra,
  deltaY,
  timeStamp,
});

describe("wheel stepper", () => {
  it("one notch of a mouse wheel is one step; down/right is next, up/left is previous", () => {
    const step = createWheelStepper();
    expect(step(ev(100, 0))).toBe(1);
    expect(step(ev(-100, 1000))).toBe(-1);
    expect(step(ev(0, 2000, { deltaX: 120 }))).toBe(1);
    expect(step(ev(0, 3000, { deltaX: -120 }))).toBe(-1);
  });

  it("adds up small trackpad deltas, and a fling's tail doesn't skip more tabs", () => {
    const step = createWheelStepper();
    expect(step(ev(10, 0))).toBe(0);
    expect(step(ev(10, 16))).toBe(0);
    expect(step(ev(30, 32))).toBe(1);
    // Inertia keeps sending deltas: ignored while they keep coming.
    for (let t = 48; t < 600; t += 16) expect(step(ev(40, t))).toBe(0);
    // After a pause, a new gesture steps again.
    expect(step(ev(60, 1200))).toBe(1);
  });

  it("counts line-mode deltas (Firefox) as lines, not pixels", () => {
    const step = createWheelStepper();
    expect(step(ev(3, 0, { deltaMode: 1 }))).toBe(1);
  });

  it("forgets a half-finished nudge after a pause", () => {
    const step = createWheelStepper();
    expect(step(ev(30, 0))).toBe(0);
    expect(step(ev(-30, 1000))).toBe(0);
    expect(step(ev(-30, 1010))).toBe(-1);
  });
});
