// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
		svg: true,
	},
	output: "server",
	adapter: vercel(),
	site: "https://tukuylabs.com",
	integrations: [
		react(),
		sitemap(),
		partytown({ config: { forward: ["dataLayer.push"] } }),
	],
});
