import { createLocalStorageState } from 'foxact/create-local-storage-state'
import { useCallback } from 'react'

const [useIsDark, useIsDarkValue] = createLocalStorageState(
  'n3p6/is-dark',
  window.matchMedia('(prefers-color-scheme: dark)').matches,
)

const useToggleIsDark = () => {
  const [,setIsDark] = useIsDark()

  return useCallback(() => setIsDark(prevIsDark => !prevIsDark), [setIsDark])
}

export { useIsDark, useIsDarkValue, useToggleIsDark }
