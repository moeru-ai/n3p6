import type { MemuClient } from 'memu-js'

import { createContextState } from 'foxact/context-state'

const [MemuClientProvider, useMemuClient, useSetMemuClient] = createContextState<MemuClient | undefined>(undefined)

export { MemuClientProvider, useMemuClient, useSetMemuClient }
