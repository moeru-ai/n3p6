import { useSyncExternalStore } from 'react'

import type { OrcustAutomatonFSM } from '../entities/orcust-automaton-fsm'

export const useOrcustAutomatonState = (orcustAutomaton: OrcustAutomatonFSM) => {
  const subscribe = (onStoreChange: () => void) => {
    orcustAutomaton.subscribe(onStoreChange)

    return () => orcustAutomaton.unsubscribe()
  }

  const getSnapshot = () =>
    orcustAutomaton.steering.behaviors[0].active

  return useSyncExternalStore(subscribe, getSnapshot)
}
