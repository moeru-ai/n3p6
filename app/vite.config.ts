import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { cp } from 'node:fs/promises'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['./assets/*'],
  build: { target: 'esnext' },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    // exclude: ['sqlocal'],
  },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
    generouted(),
    tsconfigPaths(),
    {
      name: '@moeru-ai/chat-docs',
      closeBundle: async () => cp('../docs/dist', './dist/docs', { recursive: true })
    } satisfies Plugin
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
