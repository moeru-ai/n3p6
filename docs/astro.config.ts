import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
  base: '/docs',
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/moeru-ai/chat/edit/main/docs',
      },
      favicon: '/favicon.png',
      logo: {
        alt: '@moeru-ai/chat',
        // replacesTitle: true,
        src: './public/favicon.png',
      },
      plugins: [starlightThemeNova()],
      sidebar: [
        {
          autogenerate: { directory: 'packages' },
          label: 'Packages',
        },
      ],
      social: [{ href: 'https://github.com/moeru-ai/chat', icon: 'github', label: 'GitHub' }],
      title: 'moeChat Docs',
    }),
  ],
  site: 'https://chat.moeru.ai',
})
