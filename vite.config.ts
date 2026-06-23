import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/tabdeck-card.ts",
      formats: ["es"],
      fileName: () => "tabdeck-card.js",
    },
    rollupOptions: { output: { codeSplitting: false } },
    minify: "terser",
    sourcemap: false,
  },
});
