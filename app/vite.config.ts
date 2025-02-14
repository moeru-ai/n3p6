import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['./assets/*'],
  build: { target: 'esnext' },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
    generouted(),
  ],
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
})
