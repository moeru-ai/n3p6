import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['./assets/*'],
  build: { target: 'esnext' },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
    generouted(),
    tsconfigPaths(),
  ],
  publicDir: mode === 'development' ? 'public' : false,
  //   optimizeDeps: {
  //     esbuildOptions: {
  //       target: 'esnext',
  //     },
  //     exclude: ['sqlocal'],
  //   },
  resolve: {
    dedupe: ['react', 'three'],
  },
//   server: {
//     headers: {
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//       'Cross-Origin-Opener-Policy': 'same-origin',
//     },
//   },
}))
