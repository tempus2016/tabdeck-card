import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// The live demo (GitHub Pages /demo/): demo/ → site/demo/, next to the docs
// site (docs-site/, built first into site/). Separate from the card bundle.
export default defineConfig({
  root: "demo",
  base: "./",
  build: {
    outDir: "../site/demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./demo/index.html", import.meta.url)),
        theme: fileURLToPath(new URL("./demo/theme.html", import.meta.url)),
        presets: fileURLToPath(new URL("./demo/presets.html", import.meta.url)),
      },
    },
  },
});
