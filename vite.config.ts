import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Step 2 of `npm run build`: the card, dist/tabdeck-card.js (the file HACS
// counts). The editor was built first into dist/ (vite.editor.config.ts);
// its hashed filename is baked into the release editor loader.
function editorFile(): string {
  const file = readdirSync("dist").find((f) => /^tabdeck-card-editor-[\w-]+\.js$/.test(f));
  if (!file) throw new Error("dist/tabdeck-card-editor-*.js is missing: run `npm run build`.");
  return file;
}

export default defineConfig(() => ({
  define: { __TABDECK_EDITOR_FILE__: JSON.stringify(editorFile()) },
  resolve: {
    alias: [{ find: /^\.\/editor-loader$/, replacement: resolve("src/editor-loader.release.ts") }],
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/tabdeck-card.ts",
      formats: ["es"],
      fileName: () => "tabdeck-card.js",
    },
    rollupOptions: { output: { codeSplitting: false } },
    minify: "terser",
    sourcemap: false,
  },
}));
