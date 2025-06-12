import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
// import starlightAutoSidebar from 'starlight-auto-sidebar'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
  base: '/docs',
  integrations: [
    starlight({
      components: {
        Sidebar: './src/components/Sidebar.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/moeru-ai/chat/edit/main/docs',
      },
      favicon: '/favicon.png',
      logo: {
        alt: '@moeru-ai/chat',
        // replacesTitle: true,
        src: './public/favicon.png',
      },
      plugins: [
        // starlightAutoSidebar(),
        starlightThemeNova({
          nav: [
            {
              href: 'https://blog.moeru.ai',
              label: 'Blog',
            },
            {
              href: 'https://github.com/moeru-ai/chat/releases',
              label: 'Changelog',
            },
          ],
        }),
        starlightSidebarTopics([
          {
            icon: 'open-book',
            items: [{ autogenerate: { directory: 'guides' }, label: 'Guides' }],
            label: 'Guides',
            link: 'guides/',
          },
          {
            icon: 'pencil',
            items: [{ autogenerate: { directory: 'contributing' }, label: 'Contributing' }],
            label: 'Contributing',
            link: 'contributing/',
          },
          {
            icon: 'npm',
            items: [{ autogenerate: { directory: 'packages' }, label: 'Packages' }],
            label: 'Packages',
            link: 'packages/react-three-vrm',
          },
        ]),
      ],
      social: [{ href: 'https://github.com/moeru-ai/chat', icon: 'github', label: 'GitHub' }],
      title: 'moeChat Docs',
    }),
  ],
  markdown: { smartypants: false },
  site: 'https://chat.moeru.ai',
})
