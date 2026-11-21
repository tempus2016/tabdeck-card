import { describe, it, expect, beforeEach } from "vitest";
import {
  EDITOR_SECTIONS,
  changedFields,
  fold,
  lintTarget,
  matchesWords,
  readOpenSections,
  searchWords,
  sectionOf,
  writeOpenSections,
} from "./editor-sections";

describe("editor sections", () => {
  it("lists each field once", () => {
    const all = EDITOR_SECTIONS.flatMap((s) => s.fields);
    expect(new Set(all).size).toBe(all.length);
    for (const s of EDITOR_SECTIONS) for (const f of s.lead ?? []) expect(s.fields).toContain(f);
  });

  it("finds a field's section", () => {
    expect(sectionOf("swipe")?.id).toBe("move");
    expect(sectionOf("glass")?.id).toBe("look");
    expect(sectionOf("nope")).toBeUndefined();
  });
});

describe("search words", () => {
  it("folds case and accents", () => {
    expect(fold("Défaut ÉCRAN")).toBe("defaut ecran");
    expect(searchWords("  Swipe  EDGE ")).toEqual(["swipe", "edge"]);
  });

  it("needs every word", () => {
    expect(matchesWords("Only from the screen edges swipe_edge", ["swipe", "edge"])).toBe(true);
    expect(matchesWords("Swipe between tabs swipe", ["swipe", "edge"])).toBe(false);
    expect(matchesWords("anything", [])).toBe(true);
    expect(matchesWords("Écran de veille", searchWords("ecran"))).toBe(true);
  });
});

describe("changed fields", () => {
  it("compares values as JSON, empty like missing", () => {
    const d = { a: 1, b: "", c: true, e: { x: 1 } };
    const now = { a: 1, b: undefined, c: false, e: { x: 1 } };
    expect(changedFields(now, d, ["a", "b", "c", "e"])).toEqual(["b", "c"]);
    expect(changedFields({ b: null }, { b: undefined }, ["b"])).toEqual([]);
  });
});

describe("open sections", () => {
  beforeEach(() => localStorage.clear());

  it("opens Tabs by default and keeps what was toggled", () => {
    expect(readOpenSections()).toEqual({ tabs: true });
    writeOpenSections({ tabs: false, look: true });
    expect(readOpenSections()).toEqual({ tabs: false, look: true });
  });

  it("ignores bad stored values", () => {
    localStorage.setItem("tabdeck-editor-sections", "[1]");
    expect(readOpenSections()).toEqual({ tabs: true });
    localStorage.setItem("tabdeck-editor-sections", "{bad");
    expect(readOpenSections()).toEqual({ tabs: true });
    localStorage.setItem("tabdeck-editor-sections", JSON.stringify({ look: "yes", bar: true }));
    expect(readOpenSections()).toEqual({ tabs: true, bar: true });
  });
});

describe("config check links", () => {
  it("points at a tab, a rule's setting or the named key", () => {
    expect(lintTarget({ rule: "tab_needs", vars: { tab: "Cameras", key: "badge_color" } })).toEqual({ tab: "Cameras" });
    expect(lintTarget({ rule: "dock_wizard" })).toEqual({ field: "dock" });
    expect(lintTarget({ rule: "needs", vars: { key: "swipe_edge", other: "swipe" } })).toEqual({ field: "swipe_edge" });
    expect(lintTarget({ rule: "many_tabs", vars: { count: 20 } })).toEqual({ field: "lazy" });
  });

  it("has no link for keys the visual editor doesn't show", () => {
    expect(lintTarget({ rule: "unknown", vars: { key: "bar_colour" } })).toBeUndefined();
    expect(lintTarget({ rule: "templates", vars: { count: 40 } })).toBeUndefined();
  });
});
