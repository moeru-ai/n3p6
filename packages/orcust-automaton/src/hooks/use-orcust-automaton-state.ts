import { useSyncExternalStore } from 'react'

import type { OrcustAutomaton } from '../entities/orcust-automaton'

export const useOrcustAutomatonState = (orcustAutomaton: OrcustAutomaton) => {
  const subscribe = (onStoreChange: () => void) => {
    orcustAutomaton.subscribe(onStoreChange)
    return () => orcustAutomaton.unsubscribe()
  }

  const getSnapshot = () =>
    orcustAutomaton.steering.behaviors[0].active

  return useSyncExternalStore(subscribe, getSnapshot)
}
