// Tiny localisation layer. Strings live in flat key → text maps: the card's
// own in src/translations/card/<lang>.ts, the editor's in
// src/translations/editor/<lang>.ts. Missing keys fall back to English, then
// to the key itself. `{name}` placeholders are filled from `vars`.
//
// Only English is compiled into the bundle. Every other language is a chunk
// of its own beside it in dist/, fetched the first time the page's language
// asks for it (src/translations/card/index.ts and editor/index.ts register
// the loaders). The request normally goes out as the bundle loads, so the
// chunk is here before the first card draws. Until it is, text reads in
// English, and LANGUAGE_LOADED_EVENT redraws everything once it lands.
import type { ReactiveController, ReactiveControllerHost } from "lit";
import en from "../translations/card/en";

export type Dict = Record<string, string>;
export type Loader = () => Promise<Dict>;

const FALLBACK = "en";

const LANGS: Record<string, Dict> = { [FALLBACK]: { ...en } };

// One loader per language. The editor replaces the card's with loaders that
// bring both sets of strings, so a language counts as complete only once the
// loader currently registered for it has run.
const LOADERS: Record<string, Loader> = {};
const loadedBy = new Map<string, Loader>();
const pending = new Map<Loader, Promise<void>>();

/** Fired on window once a language's strings have arrived, so what is on screen can be drawn again. */
export const LANGUAGE_LOADED_EVENT = "tabdeck-language-loaded";

// Merge more strings in (the editor's English, when it loads).
export function registerTranslations(dicts: Record<string, Dict>): void {
  for (const [lang, dict] of Object.entries(dicts)) LANGS[lang] = { ...(LANGS[lang] ?? {}), ...dict };
}

/** Puts a language's strings in place without fetching anything: the loader's last step, and the tests' way in. */
export function registerLanguage(lang: string, dict: Dict): void {
  LANGS[lang] = dict;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(LANGUAGE_LOADED_EVENT));
}

/** Registers how to fetch each language; a later call for the same language replaces the earlier loader. */
export function registerLoaders(loaders: Record<string, Loader>): void {
  Object.assign(LOADERS, loaders);
}

/** Calls back whenever a language lands; returns what to call to stop listening. */
export function onLanguageLoaded(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(LANGUAGE_LOADED_EVENT, listener);
  return () => window.removeEventListener(LANGUAGE_LOADED_EVENT, listener);
}

// "pt-BR" is worth trying as "pt" too, most specific first.
function candidatesFor(lang: string): string[] {
  const candidates = [lang];
  const base = lang.split(/[-_]/)[0].toLowerCase();
  if (base !== lang) candidates.push(base);
  return candidates;
}

/**
 * Makes a language's strings available, fetching its chunk the first time.
 * Resolves at once for English, for a language already complete, and for one
 * this card does not have. A failed fetch leaves English and is retried the
 * next time the language is asked for.
 */
export function ensureLanguage(lang: string): Promise<void> {
  const wanted = candidatesFor(lang).find((c) => LOADERS[c] !== undefined);
  if (!wanted) return Promise.resolve();
  const loader = LOADERS[wanted];
  if (loadedBy.get(wanted) === loader) return Promise.resolve();
  let promise = pending.get(loader);
  if (!promise) {
    promise = loader()
      .then((dict) => {
        loadedBy.set(wanted, loader);
        registerLanguage(wanted, { ...(LANGS[wanted] ?? {}), ...dict });
      })
      .catch(() => undefined)
      .finally(() => pending.delete(loader));
    pending.set(loader, promise);
  }
  return promise;
}

// HA exposes the UI language as hass.locale.language (newer) or hass.language.
export function hassLanguage(hass: any): string {
  return String(hass?.locale?.language ?? hass?.language ?? FALLBACK);
}

/**
 * The language the strings come from right now: "pt-BR" → "pt-BR" if here,
 * else "pt"; unknown or not fetched yet → "en". Asks for a missing chunk.
 */
export function resolveLanguage(lang: string): string {
  void ensureLanguage(lang);
  return candidatesFor(lang).find((c) => LANGS[c] !== undefined) ?? FALLBACK;
}

export function localize(lang: string, key: string, vars?: Record<string, string | number>): string {
  const dict = LANGS[resolveLanguage(lang)];
  let text = dict[key] ?? LANGS[FALLBACK][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  }
  return text;
}

// True when English (the source) defines `key`.
export function hasKey(key: string): boolean {
  return key in LANGS[FALLBACK];
}

/** Every language there are strings or a loader for, English included. */
export const languages = (): string[] => [...new Set([...Object.keys(LANGS), ...Object.keys(LOADERS)])];

// A count in words: the string holds "one:{n} alert|other:{n} alerts"
// (forms named as Intl.PluralRules names them); a plain string is used as is.
export function plural(lang: string, key: string, n: number): string {
  const text = localize(lang, key, { n });
  if (!text.includes("|")) return text;
  const forms = Object.fromEntries(text.split("|").map((f) => [f.slice(0, f.indexOf(":")), f.slice(f.indexOf(":") + 1)]));
  let cat = "other";
  try {
    cat = new Intl.PluralRules(resolveLanguage(lang)).select(n);
  } catch {
    // Unknown locale: "other".
  }
  return forms[cat] ?? forms.other ?? text;
}

/**
 * The page's language before any hass object reaches a card: from the
 * <home-assistant> element, else the choice HA stores for the user.
 */
export function pageLanguage(): string | undefined {
  if (typeof document !== "undefined") {
    const hass = (document.querySelector("home-assistant") as { hass?: unknown } | null)?.hass;
    const live = (hass as any)?.locale?.language ?? (hass as any)?.language;
    if (live) return String(live);
  }
  try {
    // HA stores the user's chosen language here, JSON-encoded.
    const stored = JSON.parse(globalThis.localStorage?.getItem("selectedLanguage") ?? "null");
    if (typeof stored === "string" && stored) return stored;
  } catch {
    // Unreadable is the same as nothing stored.
  }
  return undefined;
}

/** Fetches the page's language now, so its chunk is normally here before the first draw. */
export function preloadPageLanguage(): void {
  const lang = pageLanguage();
  if (lang) void ensureLanguage(lang);
}

/** Redraws its host whenever a language's strings arrive. */
export class LanguageController implements ReactiveController {
  private stop?: () => void;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.stop = onLanguageLoaded(() => this.host.requestUpdate());
  }

  hostDisconnected(): void {
    this.stop?.();
    this.stop = undefined;
  }
}
