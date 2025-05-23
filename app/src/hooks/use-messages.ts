import type { Message } from '@xsai/shared-chat'

import { useLocalStorage } from 'foxact/use-local-storage'

export const useMessages = () => useLocalStorage<Message[]>('n3p6/messages', [])
