import type { AssetPackConfig } from '@assetpack/core'

import { msdfFont } from '@assetpack/core/webfont'

export default {
  entry: './src/assets/raw',
  output: './src/assets/generated',
  pipes: [
    msdfFont({
      font: { outputType: 'json' },
    }),
  ],
} satisfies AssetPackConfig
