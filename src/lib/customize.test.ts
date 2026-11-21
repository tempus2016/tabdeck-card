import { describe, it, expect, beforeEach } from "vitest";
import { dropIndex, hideTabs, loadLayout, moveName, orderTabs, saveLayout } from "./customize";

const tabs = [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }];

describe("user layout", () => {
  beforeEach(() => localStorage.clear());

  it("orders placed tabs first, others keep config order", () => {
    expect(orderTabs(tabs, { order: ["C", "A"], hidden: [] }).map((t) => t.name)).toEqual(["C", "A", "B", "D"]);
    expect(orderTabs(tabs, { order: [], hidden: [] })).toBe(tabs);
  });

  it("hides tabs but never all of them", () => {
    expect(hideTabs(tabs, { order: [], hidden: ["B", "D"] }).map((t) => t.name)).toEqual(["A", "C"]);
    expect(hideTabs(tabs, { order: [], hidden: ["A", "B", "C", "D"] })).toHaveLength(4);
  });

  it("saves, loads and clears per card", () => {
    saveLayout("k", { order: ["B"], hidden: ["C"] });
    expect(loadLayout("k")).toEqual({ order: ["B"], hidden: ["C"] });
    expect(loadLayout("other")).toEqual({ order: [], hidden: [] });
    saveLayout("k", null);
    expect(localStorage.getItem("tabdeck-layout:k")).toBeNull();
    localStorage.setItem("tabdeck-layout:bad", "{nope");
    expect(loadLayout("bad")).toEqual({ order: [], hidden: [] });
  });
});

describe("drag to reorder", () => {
  it("moves a name before or after another", () => {
    const names = ["A", "B", "C", "D"];
    expect(moveName(names, "A", "C", true)).toEqual(["B", "C", "A", "D"]);
    expect(moveName(names, "D", "B", false)).toEqual(["A", "D", "B", "C"]);
    expect(moveName(names, "B", "B", true)).toEqual(names);
    expect(moveName(names, "X", "B", true)).toEqual(names);
  });

  it("finds the drop slot from the pointer position along the bar", () => {
    const rects = [
      { start: 0, end: 100 },
      { start: 100, end: 200 },
      { start: 200, end: 300 },
    ];
    expect(dropIndex(rects, 120)).toEqual({ index: 1, after: false });
    expect(dropIndex(rects, 180)).toEqual({ index: 1, after: true });
    // Past either end: the first / last tab.
    expect(dropIndex(rects, -40)).toEqual({ index: 0, after: false });
    expect(dropIndex(rects, 900)).toEqual({ index: 2, after: true });
    expect(dropIndex([], 10)).toBeUndefined();
  });
});
