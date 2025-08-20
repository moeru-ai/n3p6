import { useLocalStorage } from 'foxact/use-local-storage'

export const useMemuProvider = () => useLocalStorage<{
  apiKey: string
  baseURL: string
}>('n3p6/providers/memory', {
  apiKey: '',
  baseURL: '',
})
