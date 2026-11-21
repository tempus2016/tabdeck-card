import { describe, it, expect } from "vitest";
import { BUDGETS, checkBudgets, formatReport } from "./size-budget";

describe("size budget", () => {
  it("passes files under their budget and ignores other files", () => {
    const r = checkBudgets({ "tabdeck-card.js": 84_950, "tabdeck-card-editor-C-IRrXR4.js": 85_430, "tabdeck-card.zh-Hans-z1.js": 1_500, "notes.txt": 9_999_999 });
    expect(r.ok).toBe(true);
    expect(r.rows.map((x) => [x.budget, x.gzipKb, x.limitKb])).toEqual([
      ["card", 84.95, 87],
      ["editor", 85.43, 88],
      ["language chunk", 1.5, 16],
    ]);
  });

  it("fails a file over budget, each language chunk on its own, and a missing card", () => {
    const r = checkBudgets({ "tabdeck-card-editor-abc.js": 88_010, "tabdeck-card.de-x1.js": 3_000, "tabdeck-card-editor.pt-br-y2.js": 30_000 });
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(["card"]);
    expect(r.rows.filter((x) => !x.ok).map((x) => x.file)).toEqual(["tabdeck-card-editor-abc.js", "tabdeck-card-editor.pt-br-y2.js"]);
    const text = formatReport(r);
    expect(text).toContain("OVER editor            88.01 kB of  88 kB  tabdeck-card-editor-abc.js");
    expect(text).toContain("MISSING card");
  });

  it("the card and the editor budgets are required", () => {
    expect(BUDGETS.filter((b) => b.required).map((b) => b.name)).toEqual(["card", "editor"]);
  });
});
