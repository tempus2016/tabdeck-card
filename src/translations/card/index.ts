// The card's languages. English is bundled (src/lib/i18n.ts); each other
// language is fetched as its own chunk, dist/tabdeck-card.<lang>-<hash>.js,
// only when the page asks for it.
import { preloadPageLanguage, registerLoaders, type Loader } from "../../lib/i18n";

const chunk = (load: () => Promise<{ default: Record<string, string> }>): Loader => () => load().then((m) => m.default);

registerLoaders({
  ar: chunk(() => import("./ar")),
  bn: chunk(() => import("./bn")),
  de: chunk(() => import("./de")),
  es: chunk(() => import("./es")),
  fr: chunk(() => import("./fr")),
  hi: chunk(() => import("./hi")),
  id: chunk(() => import("./id")),
  it: chunk(() => import("./it")),
  ja: chunk(() => import("./ja")),
  ko: chunk(() => import("./ko")),
  nl: chunk(() => import("./nl")),
  pl: chunk(() => import("./pl")),
  pt: chunk(() => import("./pt")),
  ru: chunk(() => import("./ru")),
  tr: chunk(() => import("./tr")),
  uk: chunk(() => import("./uk")),
  vi: chunk(() => import("./vi")),
  "zh-Hans": chunk(() => import("./zh-Hans")),
  "zh-Hant": chunk(() => import("./zh-Hant")),
  // HA lists Hong Kong Chinese separately; it reads Traditional characters.
  "zh-HK": chunk(() => import("./zh-Hant")),
});

preloadPageLanguage();
