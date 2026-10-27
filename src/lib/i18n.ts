// Tiny localisation layer. Strings live in flat key → text maps: the card's
// own in src/translations/card/<lang>.ts (bundled), the editor's in
// src/translations/editor/<lang>.ts (registered when the editor loads).
// Missing keys fall back to English, then to the key itself. `{name}`
// placeholders are filled from `vars`.
import en from "../translations/card/en";
import de from "../translations/card/de";
import es from "../translations/card/es";
import fr from "../translations/card/fr";
import it from "../translations/card/it";
import nl from "../translations/card/nl";
import pl from "../translations/card/pl";
import pt from "../translations/card/pt";

export type Dict = Record<string, string>;

const LANGS: Record<string, Dict> = { en: { ...en }, de: { ...de }, es: { ...es }, fr: { ...fr }, it: { ...it }, nl: { ...nl }, pl: { ...pl }, pt: { ...pt } };

// Merge more strings in (the editor's, when it loads).
export function registerTranslations(dicts: Record<string, Dict>): void {
  for (const [lang, dict] of Object.entries(dicts)) LANGS[lang] = { ...(LANGS[lang] ?? {}), ...dict };
}

export function registerLanguage(lang: string, dict: Dict): void {
  LANGS[lang] = dict;
}

// HA exposes the UI language as hass.locale.language (newer) or hass.language.
export function hassLanguage(hass: any): string {
  return String(hass?.locale?.language ?? hass?.language ?? "en");
}

// "pt-BR" → "pt-BR" if present, else "pt"; unknown → "en".
export function resolveLanguage(lang: string): string {
  if (LANGS[lang]) return lang;
  const base = lang.split(/[-_]/)[0].toLowerCase();
  return LANGS[base] ? base : "en";
}

export function localize(lang: string, key: string, vars?: Record<string, string | number>): string {
  const dict = LANGS[resolveLanguage(lang)];
  let text = dict[key] ?? LANGS.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  }
  return text;
}

// True when English (the source) defines `key`.
export function hasKey(key: string): boolean {
  return key in LANGS.en;
}

export const languages = (): string[] => Object.keys(LANGS);
