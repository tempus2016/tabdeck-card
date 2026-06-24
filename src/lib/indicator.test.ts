import { describe, it, expect } from "vitest";
import { computeIndicatorRect } from "./indicator";

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
});
