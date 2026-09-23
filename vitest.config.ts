/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      // content.config.ts imports the "astro:content" virtual module, which
      // throws when loaded outside Astro's own server pipeline, so it can't
      // be exercised by a unit test.
      exclude: [
        "src/**/*.d.ts",
        "src/data/**",
        "src/pages/**",
        "src/content.config.ts",
      ],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
  },
});
