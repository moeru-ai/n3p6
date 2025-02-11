import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: { target: 'esnext' },
  //   optimizeDeps: {
  //     esbuildOptions: {
  //       target: 'esnext',
  //     },
  //     exclude: ['sqlocal'],
  //   },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
    generouted(),
  ],
//   server: {
//     headers: {
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//       'Cross-Origin-Opener-Policy': 'same-origin',
//     },
//   },
})
