import { describe, it, expect, beforeEach } from "vitest";
import { hideTabs, loadLayout, orderTabs, saveLayout } from "./customize";

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
