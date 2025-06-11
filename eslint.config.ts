import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_TSX } from '@antfu/eslint-config'
import { defineConfig } from '@importantimport/eslint-config'

export default defineConfig({
  react: true,
  typescript: { tsconfigPath: './tsconfig.json' },
}, [
  {
    ignores: [
      'app/src/router.ts',
      'app/src/assets/lip-sync/profile.json',
      'cspell.config.yaml',
    ],
  },
  {
    rules: {
      'sonarjs/fixme-tag': 'warn',
      'sonarjs/todo-tag': 'warn',
    },
  },
  {
    files: [GLOB_TSX],
    rules: {
      'react-hooks/react-compiler': 'error',
    },
  },
  {
    files: [GLOB_MARKDOWN, GLOB_MARKDOWN_CODE],
    rules: {
      '@masknet/no-top-level': 'off',
    },
  },
])
