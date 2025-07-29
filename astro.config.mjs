    import { defineConfig } from 'astro/config';
    import tailwind from '@astrojs/tailwind';
    import react from '@astrojs/react';
    import sitemap from '@astrojs/sitemap';
    import partytown from '@astrojs/partytown';

    // https://astro.build/config
    export default defineConfig({
        output: 'static',
        site: 'https://tukuylabs.com',
        integrations: [
            tailwind(),
            react(),
            sitemap(),
            partytown({
                config: {
                    forward: ["dataLayer.push"],
                },
            }),
        ]
    });