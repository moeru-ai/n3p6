import { useOrcustAutomaton } from '@n3p6/orcust-automaton'
import { useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useEffect } from 'react'

import { useAnimationCollection } from '~/hooks/use-animation-collection'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const useGalatea = () => {
  const galateaVRM = useVRM(vrmUrl)
  const clips = useAnimationCollection(galateaVRM)
  const { actions } = useAnimations(clips, galateaVRM.scene)

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
