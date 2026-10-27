// Loads the visual editor. In tests, the demo and development the editor is
// imported from source. The release build (vite.config.ts) swaps this module
// for editor-loader.release.ts, which loads the separately built editor file.
export const loadEditor = (): Promise<unknown> => import("./editor/tabdeck-card-editor");
