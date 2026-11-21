import { describe, it, expect } from "vitest";
import { compareIndex } from "./compare";

describe("compareIndex", () => {
  const a = { name: "A" }, b = { name: "B" }, c = { name: "C", disabled: true };
  const open = (t: any) => !t.disabled;

  it("is where the compared tab sits now", () => {
    expect(compareIndex([a, b], b, 0, open)).toBe(1);
    expect(compareIndex([b, a], b, 1, open)).toBe(0);
  });

  it("is -1 with nothing compared, when it's the open tab, hidden, or can't be opened", () => {
    expect(compareIndex([a, b], undefined, 0, open)).toBe(-1);
    expect(compareIndex([a, b], a, 0, open)).toBe(-1);
    expect(compareIndex([a], b, 0, open)).toBe(-1);
    expect(compareIndex([a, c], c, 0, open)).toBe(-1);
  });
});
