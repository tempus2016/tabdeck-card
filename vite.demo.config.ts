import { defineConfig } from "vite";

// The live demo (GitHub Pages): demo/ → site/. Separate from the card bundle.
export default defineConfig({
  root: "demo",
  base: "./",
  build: {
    outDir: "../site",
    emptyOutDir: true,
  },
});
