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

// Default static underline thickness (px).
const DEFAULT_THICKNESS = 3;

// Geometry of the moving indicator over the selected tab. Pure so the math is
// testable without a DOM (jsdom reports offset* as 0 → null, never throws).
// `thickness` controls the underline bar size (px).
export function computeIndicatorRect(
  tab: TabGeometry,
  position: TabPosition,
  style: TabStyle,
  thickness: number = DEFAULT_THICKNESS,
  // Right-to-left: side bars are mirrored (a `left` bar is drawn on the
  // right), so their inner edge swaps too.
  rtl = false,
): IndicatorRect | null {
  if (!tab || tab.offsetWidth <= 0) return null;
  const THICKNESS = thickness > 0 ? thickness : DEFAULT_THICKNESS;

  // The `text` style has no moving indicator at all.
  if (style === "text") return null;

  if (style === "pill" || style === "segmented" || style === "boxed" || style === "rail") {
    return {
      left: tab.offsetLeft,
      top: tab.offsetTop,
      width: tab.offsetWidth,
      height: tab.offsetHeight,
    };
  }

  // underline: a THICKNESS-thin bar on the bar's inner edge.
  if (rtl && (position === "left" || position === "right")) position = position === "left" ? "right" : "left";
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

// liquid_indicator: the marker's leading edge runs ahead to the new tab
// while the trailing edge follows, so it stretches over both and thins a
// little (like a drop), then settles. WAAPI keyframes in px.
export function liquidKeyframes(from: IndicatorRect, to: IndicatorRect, vertical: boolean, squash = 0.6): Keyframe[] {
  const box = (r: IndicatorRect) => ({ left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
  const start = Math.min(vertical ? from.top : from.left, vertical ? to.top : to.left);
  const end = Math.max(vertical ? from.top + from.height : from.left + from.width, vertical ? to.top + to.height : to.left + to.width);
  const stretched = vertical
    ? { ...box(to), left: `${to.left}px`, top: `${start}px`, height: `${end - start}px` }
    : { ...box(to), top: `${to.top}px`, left: `${start}px`, width: `${end - start}px` };
  const thin = vertical ? `scaleX(${squash})` : `scaleY(${squash})`;
  return [
    { ...box(from), transform: "none", offset: 0 },
    { ...stretched, transform: thin, offset: 0.45 },
    { ...box(to), transform: "none", offset: 1 },
  ];
}
