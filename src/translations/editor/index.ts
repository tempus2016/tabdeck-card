// The editor's languages, registered when the editor (a separate file from
// the card, loaded on demand) is imported. English is bundled with it; each
// other language is fetched as one chunk, dist/tabdeck-card-editor.<lang>-<hash>.js,
// holding that language's editor and card strings (the editor's own copy of
// the tab bar needs the card's). See ./full/.
// A new language needs a line here, one in ../card/index.ts and a ./full/<lang>.ts.
import { preloadPageLanguage, registerLoaders, registerTranslations, type Loader } from "../../lib/i18n";
import en from "./en";

const chunk = (load: () => Promise<{ default: Record<string, string> }>): Loader => () => load().then((m) => m.default);

registerTranslations({ en });

registerLoaders({
  ar: chunk(() => import("./full/ar")),
  bn: chunk(() => import("./full/bn")),
  de: chunk(() => import("./full/de")),
  es: chunk(() => import("./full/es")),
  fr: chunk(() => import("./full/fr")),
  hi: chunk(() => import("./full/hi")),
  id: chunk(() => import("./full/id")),
  it: chunk(() => import("./full/it")),
  ja: chunk(() => import("./full/ja")),
  ko: chunk(() => import("./full/ko")),
  nl: chunk(() => import("./full/nl")),
  pl: chunk(() => import("./full/pl")),
  pt: chunk(() => import("./full/pt")),
  ru: chunk(() => import("./full/ru")),
  tr: chunk(() => import("./full/tr")),
  uk: chunk(() => import("./full/uk")),
  vi: chunk(() => import("./full/vi")),
  "zh-Hans": chunk(() => import("./full/zh-Hans")),
  "zh-Hant": chunk(() => import("./full/zh-Hant")),
  // HA lists Hong Kong Chinese separately; it reads Traditional characters.
  "zh-HK": chunk(() => import("./full/zh-Hant")),
});

preloadPageLanguage();
