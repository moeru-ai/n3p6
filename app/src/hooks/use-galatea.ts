import { OrcustAutomaton } from '@n3p6/orcust-automaton'
import { useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useGameEntity } from '@n3p6/react-three-yuka'

import { useModelStore } from '~/hooks/use-model-store'

export const useGalatea = () => {
  const { model } = useModelStore()
  const galateaVRM = useVRM(model)

  useVRMAutoBlink(galateaVRM, 5000)
  useVRMAutoLookAtDefaultCamera(galateaVRM)

  const [galateaRef, galateaEntity] = useGameEntity(OrcustAutomaton)

  return {
    galateaEntity,
    galateaRef,
    galateaVRM,
  }
}
