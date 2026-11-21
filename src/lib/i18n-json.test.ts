/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import { applyStrings, placeholders, toJson, tsToStrings } from "./i18n-json";

const TS = `// German: test.
const de: Record<string, string> = {
  // Group
  "a.one": "Eins",
  "a.two": "Zwei \\"quoted\\" {n}",
};
export default de;
`;

const tsFiles = import.meta.glob("../translations/{card,editor}/*.ts", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const jsonFiles = import.meta.glob("../../i18n/{card,editor}/*.json", { eager: true, import: "default" }) as Record<string, Record<string, string>>;

describe("translation JSON for Weblate", () => {
  it("reads the strings of a translation file", () => {
    expect(tsToStrings(TS)).toEqual({ "a.one": "Eins", "a.two": 'Zwei "quoted" {n}' });
  });

  it("writes texts back in place, keeps comments and untranslated keys, appends new keys", () => {
    const out = applyStrings(TS, { "a.two": "Zwo {n}\n", "a.three": "Drei", "a.stray": "x" }, ["a.one", "a.two", "a.three"]);
    expect(out).toBe(`// German: test.
const de: Record<string, string> = {
  // Group
  "a.one": "Eins",
  "a.two": "Zwo {n}\\n",
  "a.three": "Drei",
};
export default de;
`);
    expect(tsToStrings(out)).toEqual({ "a.one": "Eins", "a.two": "Zwo {n}\n", "a.three": "Drei" });
    expect(applyStrings(TS, tsToStrings(TS))).toBe(TS);
  });

  it("finds placeholders", () => {
    expect(placeholders("one:{n} tab|other:{n} tabs of {name}")).toEqual(["{name}", "{n}"]);
  });

  it("every translation file round-trips and i18n/*.json is up to date (npm run i18n:export / i18n:import)", () => {
    const entries = Object.entries(tsFiles).filter(([p]) => !p.endsWith("/index.ts"));
    // 20 languages, card + editor.
    expect(entries.length).toBe(40);
    for (const [path, ts] of entries) {
      const strings = tsToStrings(ts);
      // No entry line the converter can't read (it would be lost on Weblate).
      const lines = ts.split("\n").filter((l) => /^ {2}"/.test(l)).length;
      expect(Object.keys(strings).length, path).toBe(lines);
      expect(applyStrings(ts, strings), path).toBe(ts);
      const [, set, lang] = /translations\/(\w+)\/([\w-]+)\.ts$/.exec(path)!;
      const json = jsonFiles[`../../i18n/${set}/${lang}.json`];
      expect(json, `i18n/${set}/${lang}.json missing: npm run i18n:export`).toBeDefined();
      expect(toJson(json), `i18n/${set}/${lang}.json differs from ${path}: run npm run i18n:export (TS changed) or npm run i18n:import (Weblate changed the JSON)`).toBe(toJson(strings));
    }
  });

  it("translations keep the English placeholders", () => {
    for (const [path, ts] of Object.entries(tsFiles)) {
      if (path.endsWith("/index.ts") || path.endsWith("/en.ts")) continue;
      const en = tsToStrings(tsFiles[path.replace(/[\w-]+\.ts$/, "en.ts")]);
      const tr = tsToStrings(ts);
      for (const [k, text] of Object.entries(tr)) {
        if (!(k in en)) continue;
        expect(placeholders(text), `${path} ${k}`).toEqual(placeholders(en[k]));
      }
    }
  });
});
