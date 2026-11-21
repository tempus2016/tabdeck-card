import { describe, it, expect } from "vitest";
import { fadeEdges, fadeMask } from "./bar-fade";

describe("fadeEdges", () => {
  it("fades nothing when the bar fits", () => {
    expect(fadeEdges(0, 400, 400)).toEqual({ start: false, end: false });
    expect(fadeEdges(0, 400, 401)).toEqual({ start: false, end: false });
  });

  it("fades the end at the start, both in the middle, the start at the end", () => {
    expect(fadeEdges(0, 400, 900)).toEqual({ start: false, end: true });
    expect(fadeEdges(250, 400, 900)).toEqual({ start: true, end: true });
    expect(fadeEdges(500, 400, 900)).toEqual({ start: true, end: false });
    // Sub-pixel scroll positions at the end.
    expect(fadeEdges(499.5, 400, 900)).toEqual({ start: true, end: false });
  });

  it("reads RTL scroll positions (negative towards the end)", () => {
    expect(fadeEdges(-0, 400, 900)).toEqual({ start: false, end: true });
    expect(fadeEdges(-250, 400, 900)).toEqual({ start: true, end: true });
    expect(fadeEdges(-500, 400, 900)).toEqual({ start: true, end: false });
  });
});

describe("fadeMask", () => {
  it("is empty without a faded edge", () => {
    expect(fadeMask({ start: false, end: false }, false)).toBe("");
  });

  it("fades the reading direction's edges", () => {
    expect(fadeMask({ start: false, end: true }, false)).toBe("linear-gradient(to right, #000, #000 calc(100% - 32px), transparent)");
    expect(fadeMask({ start: true, end: true }, false)).toBe("linear-gradient(to right, transparent, #000 32px, #000 calc(100% - 32px), transparent)");
    expect(fadeMask({ start: true, end: false }, false)).toBe("linear-gradient(to right, transparent, #000 32px, #000)");
  });

  it("runs right to left in RTL, so the start edge is on the right", () => {
    expect(fadeMask({ start: false, end: true }, true)).toBe("linear-gradient(to left, #000, #000 calc(100% - 32px), transparent)");
  });
});
