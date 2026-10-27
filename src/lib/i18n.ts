// Tiny localisation layer. Strings live in src/translations/<lang>.ts as flat
// key → text maps; missing keys fall back to English, then to the key itself.
// `{name}` placeholders are filled from `vars`.
import en from "../translations/en";

export type Dict = Record<string, string>;

const LANGS: Record<string, Dict> = { en };

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
  let text = dict[key] ?? en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  }
  return text;
}

export const languages = (): string[] => Object.keys(LANGS);
