// Bundle size budgets (scripts/size-budget.mjs, run in CI after the build).
// Sizes are gzip (level 6, like `gzip -c`) in kB (1000 bytes).

export interface Budget {
  // Shown in the report.
  name: string;
  // A file name in dist/, or a pattern matching several (each one is checked).
  match: RegExp;
  // Largest allowed gzip size per file, kB.
  gzipKb: number;
  // At least one file must match (the card and the editor always exist).
  required?: boolean;
}

export const BUDGETS: Budget[] = [
  // Each budget is the built size plus about 2 kB, so growth shows up early.
  { name: "card", match: /^tabdeck-card\.js$/, gzipKb: 87, required: true },
  { name: "editor", match: /^tabdeck-card-editor-[\w-]+\.js$/, gzipKb: 88, required: true },
  // Lazy-loaded language chunks (tabdeck-card.<lang>-<hash>.js, tabdeck-card-editor.<lang>-<hash>.js);
  // <lang> can be a script or region tag such as zh-Hans or pt-br.
  { name: "language chunk", match: /^tabdeck-card(?:-editor)?\.[a-z]{2}(?:-[a-z]{2,4})?-[\w-]+\.js$/i, gzipKb: 16 },
];

export interface SizeRow {
  budget: string;
  file: string;
  gzipKb: number;
  limitKb: number;
  ok: boolean;
}

// Check each file's gzip size against its budget. `files` maps a dist file
// name to its gzip size in bytes. Files no budget matches are ignored.
export function checkBudgets(files: Record<string, number>, budgets: Budget[] = BUDGETS): { rows: SizeRow[]; missing: string[]; ok: boolean } {
  const rows: SizeRow[] = [];
  const missing: string[] = [];
  for (const b of budgets) {
    const hits = Object.keys(files).filter((f) => b.match.test(f)).sort();
    if (!hits.length && b.required) missing.push(b.name);
    for (const f of hits) {
      const kb = Math.round(files[f] / 10) / 100;
      rows.push({ budget: b.name, file: f, gzipKb: kb, limitKb: b.gzipKb, ok: kb <= b.gzipKb });
    }
  }
  return { rows, missing, ok: !missing.length && rows.every((r) => r.ok) };
}

// A plain-text table for the CI log (and the step summary).
export function formatReport(r: ReturnType<typeof checkBudgets>): string {
  const lines = r.rows.map(
    (row) =>
      `${row.ok ? "ok  " : "OVER"} ${row.budget.padEnd(15)} ${row.gzipKb.toFixed(2).padStart(7)} kB of ${String(row.limitKb).padStart(3)} kB  ${row.file}`,
  );
  for (const m of r.missing) lines.push(`MISSING ${m}: no file in dist/ (run npm run build first)`);
  return lines.join("\n");
}
