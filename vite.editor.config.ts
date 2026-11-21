import { defineConfig } from "vite";

// Step 1 of `npm run build`: the visual editor as its own self-contained file,
// dist/tabdeck-card-editor-<hash>.js. The card (vite.config.ts, step 2) loads
// it on demand. Self-contained (apart from its language chunks) on purpose: importing shared code from the
// card file would load the card a second time, because HA adds a query
// (?hacstag=…) to the card's URL and browsers key modules by full URL.
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      input: "src/editor/tabdeck-card-editor.ts",
      preserveEntrySignatures: "allow-extension",
      output: {
        format: "es",
        entryFileNames: "tabdeck-card-editor-[hash].js",
        // Each non-English language (editor and card strings together) is a
        // chunk of its own, fetched only when the page asks for it:
        // dist/tabdeck-card-editor.<lang>-<hash>.js. They import nothing.
        chunkFileNames: "tabdeck-card-editor.[name]-[hash].js",
      },
    },
  },
});
