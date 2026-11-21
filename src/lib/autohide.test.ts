import { describe, it, expect } from "vitest";
import { AUTOHIDE_START, autoHideStep } from "./autohide";

const feed = (ys: number[]) => ys.reduce((s, y) => autoHideStep(s, y), AUTOHIDE_START);

describe("autoHideStep", () => {
  it("hides after scrolling down past the threshold", () => {
    expect(feed([100, 110]).hidden).toBe(false);
    expect(feed([100, 110, 130]).hidden).toBe(true);
  });

  it("shows again after scrolling up past the threshold", () => {
    const down = feed([100, 200]);
    expect(down.hidden).toBe(true);
    expect(autoHideStep(down, 190).hidden).toBe(true);
    expect(feed([100, 200, 190, 170]).hidden).toBe(false);
  });

  it("always shows near the top of the page", () => {
    expect(feed([100, 300, 40]).hidden).toBe(false);
  });

  it("ignores jitter that never builds a run", () => {
    expect(feed([100, 110, 105, 115, 108, 118]).hidden).toBe(false);
  });

  it("an unchanged position keeps the state", () => {
    const s = feed([100, 200]);
    expect(autoHideStep(s, 200)).toBe(s);
  });
});
