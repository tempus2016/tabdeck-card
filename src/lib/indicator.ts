import type { TabPosition, TabStyle } from "./config";

export interface TabGeometry {
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;
}

export interface IndicatorRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// Matches the original static underline thickness.
const THICKNESS = 3;

// Geometry of the moving indicator over the selected tab. Pure so the math is
// testable without a DOM (jsdom reports offset* as 0 → null, never throws).
export function computeIndicatorRect(
  tab: TabGeometry,
  position: TabPosition,
  style: TabStyle,
): IndicatorRect | null {
  if (!tab || tab.offsetWidth <= 0) return null;

  // The `text` style has no moving indicator at all.
  if (style === "text") return null;

  if (style === "pill" || style === "segmented" || style === "boxed") {
    return {
      left: tab.offsetLeft,
      top: tab.offsetTop,
      width: tab.offsetWidth,
      height: tab.offsetHeight,
    };
  }

  // underline: a THICKNESS-thin bar on the bar's inner edge.
  switch (position) {
    case "top":
      return {
        left: tab.offsetLeft,
        top: tab.offsetTop + tab.offsetHeight - THICKNESS,
        width: tab.offsetWidth,
        height: THICKNESS,
      };
    case "bottom":
      return {
        left: tab.offsetLeft,
        top: tab.offsetTop,
        width: tab.offsetWidth,
        height: THICKNESS,
      };
    case "left":
      return {
        left: tab.offsetLeft + tab.offsetWidth - THICKNESS,
        top: tab.offsetTop,
        width: THICKNESS,
        height: tab.offsetHeight,
      };
    case "right":
      return {
        left: tab.offsetLeft,
        top: tab.offsetTop,
        width: THICKNESS,
        height: tab.offsetHeight,
      };
  }
}
