import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    // The first test in a file pays for loading the whole card, which can
    // pass 5 s when the full suite runs in parallel.
    testTimeout: 20_000,
  },
});
