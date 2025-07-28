// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

export default defineConfig({
    output: "static",
    site: "https://tukuylabs.com", 
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        react(),
        sitemap(),
        partytown({ config: { forward: ["dataLayer.push"] } }),
    ],
});
