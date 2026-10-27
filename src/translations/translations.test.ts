import { describe, it, expect } from "vitest";
import cardEn from "./card/en";
import cardDe from "./card/de";
import cardEs from "./card/es";
import cardFr from "./card/fr";
import cardIt from "./card/it";
import cardNl from "./card/nl";
import cardPl from "./card/pl";
import cardPt from "./card/pt";
import edEn from "./editor/en";
import edDe from "./editor/de";
import edEs from "./editor/es";
import edFr from "./editor/fr";
import edIt from "./editor/it";
import edNl from "./editor/nl";
import edPl from "./editor/pl";
import edPt from "./editor/pt";

type Dict = Record<string, string>;
const SETS: Record<string, { en: Dict; langs: Record<string, Dict> }> = {
  card: { en: cardEn, langs: { de: cardDe, es: cardEs, fr: cardFr, it: cardIt, nl: cardNl, pl: cardPl, pt: cardPt } },
  editor: { en: edEn, langs: { de: edDe, es: edEs, fr: edFr, it: edIt, nl: edNl, pl: edPl, pt: edPt } },
};
const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

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
