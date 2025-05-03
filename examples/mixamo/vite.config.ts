import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
  ],
  publicDir: mode === 'development' ? 'public' : false,
  resolve: {
    dedupe: ['react', 'three'],
  },
}))
