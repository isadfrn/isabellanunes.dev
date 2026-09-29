import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle the menu's dependencies up front. Otherwise the dev server
    // discovers them late, re-optimizes mid-session and briefly serves
    // "Outdated Optimize Dep" errors that leave the hamburger menu unhydrated.
    optimizeDeps: {
      include: [
        "@heroicons/react/24/outline",
        "@radix-ui/react-dialog",
        "@radix-ui/react-separator",
        "@radix-ui/react-visually-hidden",
      ],
    },
  },
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  site: "https://isabellanunes.dev",
});
