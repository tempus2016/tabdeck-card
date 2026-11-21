import { describe, it, expect } from "vitest";
import { computeIndicatorRect, liquidKeyframes } from "./indicator";

const tab = { offsetLeft: 10, offsetTop: 20, offsetWidth: 100, offsetHeight: 48 };

describe("computeIndicatorRect", () => {
  it("returns null when the tab is unmeasurable", () => {
    const zero = { offsetLeft: 0, offsetTop: 0, offsetWidth: 0, offsetHeight: 0 };
    expect(computeIndicatorRect(zero, "top", "underline")).toBeNull();
  });

  it("underline top: 3px bar at the bottom edge", () => {
    expect(computeIndicatorRect(tab, "top", "underline")).toEqual({
      left: 10, top: 65, width: 100, height: 3,
    });
  });

  it("underline bottom: 3px bar at the top edge", () => {
    expect(computeIndicatorRect(tab, "bottom", "underline")).toEqual({
      left: 10, top: 20, width: 100, height: 3,
    });
  });

  it("underline left: 3px bar at the right edge", () => {
    expect(computeIndicatorRect(tab, "left", "underline")).toEqual({
      left: 107, top: 20, width: 3, height: 48,
    });
  });

  it("underline right: 3px bar at the left edge", () => {
    expect(computeIndicatorRect(tab, "right", "underline")).toEqual({
      left: 10, top: 20, width: 3, height: 48,
    });
  });

  it("pill: full tab box", () => {
    expect(computeIndicatorRect(tab, "top", "pill")).toEqual({
      left: 10, top: 20, width: 100, height: 48,
    });
  });

  it("segmented: full tab box regardless of position", () => {
    expect(computeIndicatorRect(tab, "left", "segmented")).toEqual({
      left: 10, top: 20, width: 100, height: 48,
    });
  });

  it("boxed: full tab box like pill/segmented", () => {
    expect(computeIndicatorRect(tab, "top", "boxed")).toEqual({
      left: 10, top: 20, width: 100, height: 48,
    });
  });

  it("text: no indicator (null)", () => {
    expect(computeIndicatorRect(tab, "top", "text")).toBeNull();
  });

  it("rail: full tab box", () => {
    expect(computeIndicatorRect(tab, "left", "rail")).toEqual({
      left: 10, top: 20, width: 100, height: 48,
    });
  });

  it("underline thickness is configurable", () => {
    expect(computeIndicatorRect(tab, "top", "underline", 6)).toEqual({
      left: 10, top: 62, width: 100, height: 6,
    });
    // non-positive thickness falls back to the 3px default
    expect(computeIndicatorRect(tab, "top", "underline", 0)?.height).toBe(3);
  });
});

describe("liquidKeyframes", () => {
  const a = { left: 0, top: 45, width: 100, height: 3 };
  const b = { left: 200, top: 45, width: 80, height: 3 };

  it("stretches over both tabs, then settles on the new one", () => {
    const k = liquidKeyframes(a, b, false);
    expect(k[0]).toMatchObject({ left: "0px", width: "100px", offset: 0 });
    // The leading edge reaches the new tab while the trailing edge stays.
    expect(k[1]).toMatchObject({ left: "0px", width: "280px" });
    expect(k[1].transform).toBe("scaleY(0.6)");
    expect(k.at(-1)).toMatchObject({ left: "200px", width: "80px", offset: 1, transform: "none" });
  });

  it("moving back stretches the other way; a vertical bar stretches down", () => {
    expect(liquidKeyframes(b, a, false)[1]).toMatchObject({ left: "0px", width: "280px" });
    const v = liquidKeyframes({ left: 0, top: 0, width: 3, height: 40 }, { left: 0, top: 100, width: 3, height: 40 }, true);
    expect(v[1]).toMatchObject({ top: "0px", height: "140px", transform: "scaleX(0.6)" });
  });
});

describe("computeIndicatorRect right-to-left", () => {
  it("a side bar's underline sits on the edge facing the content (mirrored)", () => {
    // In RTL a `left` bar is drawn on the right, so its inner edge is the tab's left side.
    expect(computeIndicatorRect(tab, "left", "underline", 3, true)).toEqual({ left: 10, top: 20, width: 3, height: 48 });
    expect(computeIndicatorRect(tab, "right", "underline", 3, true)).toEqual({ left: 107, top: 20, width: 3, height: 48 });
    expect(computeIndicatorRect(tab, "top", "underline", 3, true)).toEqual(computeIndicatorRect(tab, "top", "underline", 3));
  });
});
