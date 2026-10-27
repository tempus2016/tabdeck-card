import { describe, it, expect } from "vitest";
import en from "./en";
import de from "./de";
import es from "./es";
import fr from "./fr";
import itl from "./it";
import nl from "./nl";
import pl from "./pl";
import pt from "./pt";

const LANGS: Record<string, Record<string, string>> = { de, es, fr, it: itl, nl, pl, pt };
const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

describe.each(Object.entries(LANGS))("translation %s", (lang, dict) => {
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
