import type { DefaultCategoriesResponse } from 'memu-js'

// https://github.com/NevaMind-AI/memU/blob/main/docs/API_REFERENCE.md#retrievedefaultcategories
export const stringifyDefaultCategories = (categories: DefaultCategoriesResponse): string => categories
  .categories
  .map(category => [
    `Category: ${category.name}`,
    `Memories: ${category.memoryCount}`,
    `Summary: ${category.summary}`,
  ].join('\n'))
  .join('\n')
