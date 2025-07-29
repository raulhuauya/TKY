// @ts-check
import { defineConfig } from "astro/config";

// Integraciones que SÍ necesitas
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// NO importes "vercel" aquí

// https://astro.build/config
export default defineConfig({
	// --- CAMBIO CLAVE #1: Modo estático ---
	// Esto le ordena a Astro crear los archivos .html que necesitamos
	output: "static",

	// La URL de tu sitio. ¡Mantenla!
	site: "https://tukuylabs.com",

	// --- CAMBIO CLAVE #2: Eliminar el adaptador y lo experimental ---
	// Ya no necesitamos el 'adapter' de Vercel ni la configuración 'experimental'
	
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		sitemap(),
		partytown({ config: { forward: ["dataLayer.push"] } }),
	],
});
