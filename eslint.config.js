import antfu from '@antfu/eslint-config'
import { ii } from '@importantimport/eslint-config'

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
      'sonarjs/fixme-tag': 'warn',
      'sonarjs/todo-tag': 'warn',
    },
  })
