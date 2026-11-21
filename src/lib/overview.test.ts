import { describe, it, expect } from "vitest";
import { isPinchIn, overviewTiles, touchDistance } from "./overview";

describe("touchDistance", () => {
  it("measures the gap between two touches", () => {
    expect(touchDistance({ clientX: 0, clientY: 0 }, { clientX: 3, clientY: 4 })).toBe(5);
  });
});

describe("isPinchIn", () => {
  it("is a pinch once the fingers close to under 70% of the start gap", () => {
    expect(isPinchIn(200, 150)).toBe(false);
    expect(isPinchIn(200, 130)).toBe(true);
  });

  it("ignores fingers that start too close together to tell", () => {
    expect(isPinchIn(20, 5)).toBe(false);
  });

  it("never fires for spreading fingers", () => {
    expect(isPinchIn(200, 300)).toBe(false);
  });
});

describe("overviewTiles", () => {
  const tabs = [
    { name: "Home" },
    { name: "Lights", disabled: true },
    { name: "Docs", tap_action: { action: "navigate" } },
    { name: "Safe", pin: "1234" },
  ] as any[];

  it("lists content tabs only, with their visible index", () => {
    const tiles = overviewTiles(tabs, () => false);
    expect(tiles.map((t) => [t.index, t.tab.name])).toEqual([
      [0, "Home"],
      [3, "Safe"],
    ]);
  });

  it("marks locked tabs so their content isn't shown", () => {
    const tiles = overviewTiles(tabs, (t) => !!t.pin);
    expect(tiles.find((t) => t.tab.name === "Safe")?.locked).toBe(true);
    expect(tiles.find((t) => t.tab.name === "Home")?.locked).toBe(false);
  });
});
