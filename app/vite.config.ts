import type { Plugin } from 'vite'

import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react'
import { cp } from 'node:fs/promises'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['./assets/*'],
  build: { target: 'esnext' },
  // optimizeDeps: { exclude: ['sqlocal'] },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
    generouted(),
    tsconfigPaths(),
    {
      closeBundle: async () => cp('../docs/dist', './dist/docs', { recursive: true }),
      name: '@moeru-ai/chat-docs',
    } satisfies Plugin,
  ],
  publicDir: mode === 'development' ? 'public' : false,
  resolve: {
    dedupe: ['react', 'three'],
  },
  rollupOptions: { target: 'esnext' },
//   server: {
//     headers: {
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//       'Cross-Origin-Opener-Policy': 'same-origin',
//     },
//   },
}))
