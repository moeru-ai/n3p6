import { useLocalStorage } from 'foxact/use-local-storage'

export const useMemuProvider = () => useLocalStorage<{
  agentId: string
  apiKey: string
  baseURL: string
  userId: string
}>('n3p6/providers/memory', {
  agentId: '',
  apiKey: '',
  baseURL: '',
  userId: '',
})
