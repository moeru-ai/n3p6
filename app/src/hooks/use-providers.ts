import { useLocalStorage } from 'foxact/use-local-storage'

export const useLLMProvider = () => useLocalStorage<{
  apiKey: string
  baseURL: string
  model: string
}>('n3p6/providers/llm', {
  apiKey: '',
  baseURL: 'http://localhost:11434/v1/',
  model: '',
})

export const useTTSProvider = () => useLocalStorage<{
  apiKey: string
  baseURL: string
  model: string
  voice: string
}>('n3p6/providers/tts', {
  apiKey: '',
  baseURL: '',
  model: '',
  voice: '',
})
