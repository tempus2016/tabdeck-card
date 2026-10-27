// Release build: the editor is its own self-contained file next to the card,
// dist/tabdeck-card-editor-<hash>.js (built first by vite.editor.config.ts),
// so dashboards that never open the editor never download it. The import is by
// URL relative to this file; the content hash in the name means a cached
// older editor is never paired with a newer card.
declare const __TABDECK_EDITOR_FILE__: string;

// A variable, not a literal, so Vite doesn't treat it as an asset pattern.
const EDITOR_PATH = "./" + __TABDECK_EDITOR_FILE__;

export const loadEditor = (): Promise<unknown> =>
  import(/* @vite-ignore */ new URL(EDITOR_PATH, import.meta.url).href);
