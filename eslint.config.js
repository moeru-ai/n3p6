import antfu from '@antfu/eslint-config'
import { ii } from '@importantimport/eslint-config'
// @ts-expect-error missing types
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  react: true,
  typescript: { tsconfigPath: './tsconfig.json' },
}, {
  ignores: [
    'app/src/router.ts',
    'cspell.config.yaml',
  ],
})
  .append(ii())
  .append({
    rules: {
      'sonarjs/todo-tag': 'warn',
    },
  })
  .append(reactCompiler.configs.recommended)
