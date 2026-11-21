// orientation_layout: the bar's position follows the screen's orientation,
// e.g. along the bottom of a tablet held upright and down the left side when
// it's turned sideways. It picks a `position`, so everything that follows
// `position` (vertical bars, rail_expand, dock spacing) works as usual.
import type { TabPosition } from "./config";

export interface OrientationLayout {
  portrait: TabPosition;
  landscape: TabPosition;
}

const POSITIONS: TabPosition[] = ["top", "bottom", "left", "right"];
const pick = (v: any, fallback: TabPosition): TabPosition => (POSITIONS.includes(v) ? v : fallback);

export function normalizeOrientation(raw: any): OrientationLayout | undefined {
  if (raw === true) return { portrait: "bottom", landscape: "left" };
  if (!raw || typeof raw !== "object") return undefined;
  return { portrait: pick(raw.portrait, "bottom"), landscape: pick(raw.landscape, "left") };
}

export function orientedPosition(position: TabPosition, layout: OrientationLayout | undefined, portrait: boolean): TabPosition {
  if (!layout) return position;
  return portrait ? layout.portrait : layout.landscape;
}
