import { describe, it, expect } from "vitest";
import { UndoStack, changeLabel } from "./undo";

describe("UndoStack", () => {
  it("undoes and redoes, and a new change clears redo", () => {
    const s = new UndoStack<string>(50, 0);
    s.record("a", 1);
    s.record("b", 2);
    expect(s.undo("c")).toBe("b");
    expect(s.undo("b")).toBe("a");
    expect(s.undo("a")).toBeUndefined();
    expect(s.redo("a")).toBe("b");
    expect(s.canRedo).toBe(true);
    s.record("b", 10);
    expect(s.canRedo).toBe(false);
    expect(s.redo("x")).toBeUndefined();
  });

  it("joins quick changes into one step and keeps the last 50", () => {
    const s = new UndoStack<number>(50, 800);
    s.record(0, 1000);
    s.record(1, 1300);
    s.record(2, 1900);
    expect(s.size).toBe(1);
    s.record(3, 3000);
    expect(s.undo(4)).toBe(3);
    expect(s.undo(3)).toBe(0);
    const big = new UndoStack<number>(50, 0);
    for (let i = 0; i < 60; i++) big.record(i, i * 10);
    expect(big.size).toBe(50);
    let last: number | undefined;
    for (let v: number | undefined = 99; v !== undefined; v = big.undo(v)) last = v;
    expect(last).toBe(10);
  });
});

describe("changeLabel", () => {
  const h = { name: "Home" };
  const g = { name: "Garden" };
  it("names added, removed, moved and edited tabs", () => {
    expect(changeLabel({ tabs: [h, g] }, { tabs: [h] })).toEqual({ key: "editor.undo.removed", vars: { name: "Garden" } });
    expect(changeLabel({ tabs: [h] }, { tabs: [h, g] })).toEqual({ key: "editor.undo.added", vars: { name: "Garden" } });
    expect(changeLabel({ tabs: [h, g] }, { tabs: [g, h] })).toEqual({ key: "editor.undo.moved" });
    expect(changeLabel({ tabs: [h, g] }, { tabs: [h, { name: "Yard" }] })).toEqual({ key: "editor.undo.tab", vars: { name: "Yard" } });
    expect(changeLabel({ tabs: [h, g] }, { tabs: [{}, {}] })).toEqual({ key: "editor.undo.tabs" });
    expect(changeLabel({ tabs: [h], style: "pill" }, { tabs: [h] })).toEqual({ key: "editor.undo.options" });
    expect(changeLabel({ tabs: [] }, { tabs: [{}] })).toEqual({ key: "editor.undo.added", vars: { name: "#1" } });
  });
});

describe("changeLabel by value", () => {
  it("works on copies (HA hands configs back as new objects)", () => {
    const before = { tabs: [{ name: "Home" }, { name: "Garden" }, { name: "Yard" }] };
    const copy = JSON.parse(JSON.stringify(before));
    expect(changeLabel(copy, { tabs: [{ name: "Home" }, { name: "Yard" }] })).toEqual({ key: "editor.undo.removed", vars: { name: "Garden" } });
    expect(changeLabel(copy, { tabs: [{ name: "Yard" }, { name: "Home" }, { name: "Garden" }] })).toEqual({ key: "editor.undo.moved" });
  });
});
