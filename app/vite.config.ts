// import type { AssetPackConfig } from '@assetpack/core'
// import type { Plugin, ResolvedConfig } from 'vite'

// import { AssetPack } from '@assetpack/core'
import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react'
// import { cwd } from 'node:process'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// import assetpackConfig from './assetpack.config'

// const assetpack = (apConfig: AssetPackConfig): Plugin => {
//   let mode: ResolvedConfig['command']
//   let ap: AssetPack | undefined

//   return {
//     buildEnd: async () => {
//       if (!(ap))
//         return
//       await ap.stop()
//       ap = undefined
//     },
//     buildStart: async () => {
//       if (mode === 'serve') {
//         if (ap)
//           return
//         ap = new AssetPack(apConfig)
//         void ap.watch()
//       }
//       else {
//         await new AssetPack(apConfig).run()
//       }
//     },
//     configResolved(resolvedConfig) {
//       mode = resolvedConfig.command
//       if (!resolvedConfig.publicDir)
//         return
//       if (apConfig.output !== undefined)
//         return
//       const publicDir = resolvedConfig.publicDir.replace(cwd(), '')
//       apConfig.output = `.${publicDir}/assets/`
//     },
//     name: 'vite-plugin-assetpack',
//   }
// }

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
    // assetpack(assetpackConfig),
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
