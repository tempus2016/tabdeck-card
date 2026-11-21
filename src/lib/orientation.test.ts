import { describe, it, expect } from "vitest";
import { normalizeOrientation, orientedPosition } from "./orientation";

describe("orientation_layout", () => {
  it("true is bottom in portrait and left in landscape", () => {
    expect(normalizeOrientation(true)).toEqual({ portrait: "bottom", landscape: "left" });
  });

  it("takes either side, falling back to the default for the other or a bad value", () => {
    expect(normalizeOrientation({ landscape: "right" })).toEqual({ portrait: "bottom", landscape: "right" });
    expect(normalizeOrientation({ portrait: "top", landscape: "sideways" })).toEqual({ portrait: "top", landscape: "left" });
  });

  it("is off when unset or false", () => {
    expect(normalizeOrientation(undefined)).toBeUndefined();
    expect(normalizeOrientation(false)).toBeUndefined();
  });

  it("picks the position for the screen's orientation, else the plain position", () => {
    const o = { portrait: "bottom", landscape: "left" } as const;
    expect(orientedPosition("top", o, true)).toBe("bottom");
    expect(orientedPosition("top", o, false)).toBe("left");
    expect(orientedPosition("top", undefined, true)).toBe("top");
  });
});
