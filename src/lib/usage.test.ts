import { describe, it, expect, beforeEach } from "vitest";
import { learnedTab, loadHourly, loadUsage, recordHourly, recordUse, saveHourly, saveUsage, sortByUsage } from "./usage";

describe("usage", () => {
  beforeEach(() => localStorage.clear());

  it("sorts most-opened first, keeping ties in order", () => {
    const tabs = [{ name: "A" }, { name: "B" }, { name: "C" }, {}];
    expect(sortByUsage(tabs, { C: 5, B: 2 }).map((t) => t.name)).toEqual(["C", "B", "A", undefined]);
    expect(sortByUsage(tabs, {}).map((t) => t.name)).toEqual(["A", "B", "C", undefined]);
  });

  it("counts opens", () => {
    let c = recordUse({}, "A");
    c = recordUse(c, "A");
    expect(c).toEqual({ A: 2 });
  });

  it("round-trips through storage, dropping junk", () => {
    saveUsage("d", { A: 3 });
    expect(loadUsage("d")).toEqual({ A: 3 });
    localStorage.setItem("tabdeck-usage:x", JSON.stringify({ A: "no", B: 2 }));
    expect(loadUsage("x")).toEqual({ B: 2 });
    localStorage.setItem("tabdeck-usage:y", "{bad");
    expect(loadUsage("y")).toEqual({});
  });
});

describe("learned default (per hour)", () => {
  beforeEach(() => localStorage.clear());

  it("learns the tab picked most around an hour", () => {
    let u = {};
    for (let i = 0; i < 3; i++) u = recordHourly(u, "Kitchen", 7);
    u = recordHourly(u, "Home", 7);
    expect(learnedTab(u, 7, 3)).toBe("Kitchen");
    // Neighbouring hours count half, so 8 am still knows about 7 am.
    expect(learnedTab(u, 8, 1)).toBe("Kitchen");
    expect(learnedTab(u, 8, 3)).toBeUndefined();
    // Too few picks, or a tie, learn nothing.
    expect(learnedTab(u, 7, 4)).toBeUndefined();
    u = recordHourly(recordHourly(u, "Home", 7), "Home", 7);
    expect(learnedTab(u, 7, 1)).toBeUndefined();
    expect(learnedTab({}, 7, 1)).toBeUndefined();
    // Wraps around midnight.
    expect(learnedTab(recordHourly({}, "Night", 23), 0, 0.5)).toBe("Night");
  });

  it("halves an hour's counts once one passes 100", () => {
    let u: any = { 7: { A: 100, B: 9, C: 1 } };
    u = recordHourly(u, "A", 7);
    expect(u[7]).toEqual({ A: 50, B: 4 });
  });

  it("round-trips through storage, dropping junk", () => {
    saveHourly("d", { 7: { A: 2 } });
    expect(loadHourly("d")).toEqual({ 7: { A: 2 } });
    localStorage.setItem("tabdeck-learned:x", JSON.stringify({ 7: { A: "x", B: 1 }, 99: { C: 1 }, 8: 3 }));
    expect(loadHourly("x")).toEqual({ 7: { B: 1 } });
    localStorage.setItem("tabdeck-learned:y", "[");
    expect(loadHourly("y")).toEqual({});
  });
});
