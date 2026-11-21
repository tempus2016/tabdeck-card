/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import cardEn from "./card/en";
import edEn from "./editor/en";

type Dict = Record<string, string>;

// Every language file beside English, picked up automatically.
function others(files: Record<string, { default: Dict }>): Record<string, Dict> {
  const out: Record<string, Dict> = {};
  for (const [path, mod] of Object.entries(files)) {
    const lang = path.split("/").pop()!.replace(/\.ts$/, "");
    if (lang !== "en") out[lang] = mod.default;
  }
  return out;
}
const cardLangs = others(import.meta.glob<{ default: Dict }>(["./card/*.ts", "!./card/index.ts"], { eager: true }));
const edLangs = others(import.meta.glob<{ default: Dict }>(["./editor/*.ts", "!./editor/index.ts"], { eager: true }));

const SETS: Record<string, { en: Dict; langs: Record<string, Dict> }> = {
  card: { en: cardEn, langs: cardLangs },
  editor: { en: edEn, langs: edLangs },
};
const fullFiles = Object.keys(import.meta.glob("./editor/full/*.ts")).map((p) => p.split("/").pop()!.replace(/\.ts$/, ""));
const cardIndex = import.meta.glob<string>("./card/index.ts", { query: "?raw", import: "default", eager: true })["./card/index.ts"];
const edIndex = import.meta.glob<string>("./editor/index.ts", { query: "?raw", import: "default", eager: true })["./editor/index.ts"];

describe("language wiring", () => {
  it("card and editor have the same languages", () => {
    expect(Object.keys(edLangs).sort()).toEqual(Object.keys(cardLangs).sort());
  });

  it.each(Object.keys(cardLangs))("%s has a loader in both index files and an editor/full file", (lang) => {
    expect(cardIndex).toContain(`import("./${lang}")`);
    expect(edIndex).toContain(`import("./full/${lang}")`);
    expect(fullFiles).toContain(lang);
  });
});

// Unique names: plural strings ("one:{n} alert|other:{n} alerts") repeat them per form.
const placeholders = (s: string) => [...new Set(s.match(/\{\w+\}/g) ?? [])].sort();

describe.each(Object.entries(SETS))("%s strings", (set, { en, langs }) => {
  it("card files hold card.* keys only; editor files none", () => {
    for (const key of Object.keys(en)) expect(key.startsWith("card."), key).toBe(set === "card");
  });

  describe.each(Object.entries(langs))("%s", (lang, dict) => {
    it("has every English key and no extras", () => {
      expect(Object.keys(dict).sort()).toEqual(Object.keys(en).sort());
    });

    it("keeps every {placeholder}", () => {
      for (const [key, text] of Object.entries(en)) {
        expect(placeholders(dict[key] ?? ""), `${lang} ${key}`).toEqual(placeholders(text));
      }
    });

    it("has no empty strings", () => {
      for (const [key, text] of Object.entries(dict)) {
        if (en[key].trim() !== "") expect(text.trim(), `${lang} ${key}`).not.toBe("");
      }
    });
  });
});
