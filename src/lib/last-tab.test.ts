import { describe, it, expect } from "vitest";
import { lastTabIndex } from "./last-tab";

describe("lastTabIndex", () => {
  const a = { name: "A" }, b = { name: "B" }, c = { name: "C", disabled: true };
  const open = (t: any) => !t.disabled;

  it("finds the previous tab among the visible ones", () => {
    expect(lastTabIndex([a, b, c], b, open)).toBe(1);
  });

  it("is -1 before any switch, when it's hidden now, or can't be opened", () => {
    expect(lastTabIndex([a, b], undefined, open)).toBe(-1);
    expect(lastTabIndex([a], b, open)).toBe(-1);
    expect(lastTabIndex([a, b, c], c, open)).toBe(-1);
  });
});
