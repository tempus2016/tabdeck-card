// Translation files ↔ i18n/*.json for Weblate.
//   node --experimental-strip-types scripts/i18n-json.mjs export   TS → JSON (after adding strings)
//   node --experimental-strip-types scripts/i18n-json.mjs import   JSON → TS (after Weblate commits)
//   node --experimental-strip-types scripts/i18n-json.mjs check    exit 1 if they differ
// (npm run i18n:export / i18n:import / i18n:check). Each set is a folder of
// <lang>.ts files; English is the source language.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { applyStrings, toJson, tsToStrings } from "../src/lib/i18n-json.ts";

const SETS = { card: "src/translations/card", editor: "src/translations/editor" };
const OUT = "i18n";
const mode = process.argv[2];
if (!["export", "import", "check"].includes(mode)) {
  console.error("usage: i18n-json.mjs export|import|check");
  process.exit(2);
}

const langs = (dir, ext) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(ext) && f !== `index${ext}`)
    .map((f) => f.slice(0, -ext.length))
    .sort();

let changed = 0;
const problems = [];
for (const [set, dir] of Object.entries(SETS)) {
  const jsonDir = join(OUT, set);
  const order = Object.keys(tsToStrings(readFileSync(join(dir, "en.ts"), "utf8")));
  if (mode === "import") {
    for (const lang of langs(jsonDir, ".json")) {
      const tsPath = join(dir, `${lang}.ts`);
      if (!existsSync(tsPath)) {
        problems.push(`${set}/${lang}: new language from Weblate; add src/translations/${set}/${lang}.ts and register it first (see i18n/README.md)`);
        continue;
      }
      const ts = readFileSync(tsPath, "utf8");
      const next = applyStrings(ts, JSON.parse(readFileSync(join(jsonDir, `${lang}.json`), "utf8")), order);
      if (next !== ts) {
        writeFileSync(tsPath, next);
        changed++;
        console.log(`updated ${tsPath}`);
      }
    }
    continue;
  }
  mkdirSync(jsonDir, { recursive: true });
  for (const lang of langs(dir, ".ts")) {
    const json = toJson(tsToStrings(readFileSync(join(dir, `${lang}.ts`), "utf8")));
    const path = join(jsonDir, `${lang}.json`);
    const old = existsSync(path) ? readFileSync(path, "utf8") : "";
    if (old === json) continue;
    if (mode === "check") problems.push(`${path} is out of date`);
    else {
      writeFileSync(path, json);
      changed++;
      console.log(`wrote ${path}`);
    }
  }
}
for (const p of problems) console.error(p);
if (problems.length) {
  if (mode === "check") console.error("run npm run i18n:export (TS changed) or npm run i18n:import (Weblate changed the JSON)");
  process.exit(1);
}
console.log(`i18n ${mode}: ${changed} file(s) changed`);
