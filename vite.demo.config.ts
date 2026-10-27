import { defineConfig } from "vite";

// The live demo (GitHub Pages /demo/): demo/ → site/demo/, next to the docs
// site (docs-site/, built first into site/). Separate from the card bundle.
export default defineConfig({
  root: "demo",
  base: "./",
  build: {
    outDir: "../site/demo",
    emptyOutDir: true,
  },
});
