// Fails when a built file is over its gzip size budget (src/lib/size-budget.ts).
//   npm run build && npm run size
// In GitHub Actions the table also goes to the job summary.
import { appendFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { checkBudgets, formatReport } from "../src/lib/size-budget.ts";

const DIST = "dist";
const files = {};
for (const f of readdirSync(DIST)) {
  if (f.endsWith(".js")) files[f] = gzipSync(readFileSync(join(DIST, f)), { level: 6 }).length;
}
const result = checkBudgets(files);
const report = formatReport(result);
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Bundle size (gzip)\n\n\`\`\`\n${report}\n\`\`\`\n`);
}
if (!result.ok) {
  console.error("\nOver budget. Make the bundle smaller (lazy-load into the editor chunk), or raise the budget in src/lib/size-budget.ts on purpose.");
  process.exit(1);
}
