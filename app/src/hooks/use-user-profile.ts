import { useLocalStorage } from 'foxact/use-local-storage'

export const useUserProfile = () => useLocalStorage<{
  description: string
  name: string
}>('n3p6/user-profile', {
  description: '',
  name: 'User',
})
