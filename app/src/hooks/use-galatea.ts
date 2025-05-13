import { useOrcustAutomaton } from '@n3p6/orcust-automaton'
import { useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useEffect } from 'react'

import { useAnimations } from '~/hooks/use-animation-collection'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const useGalatea = () => {
  const galateaVRM = useVRM(vrmUrl)
  const { actions } = useAnimations(galateaVRM)

  useVRMAutoBlink(galateaVRM, 5000)
  useVRMAutoLookAtDefaultCamera(galateaVRM)

  const [galateaRef, galateaEntity] = useOrcustAutomaton()

  useEffect(() => galateaEntity.setActions(actions))

  return {
    galateaEntity,
    galateaRef,
    galateaVRM,
  }
}
