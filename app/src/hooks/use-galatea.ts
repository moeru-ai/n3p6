import { OrcustAutomaton } from '@n3p6/orcust-automaton'
import { useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useGameEntity } from '@n3p6/react-three-yuka'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const useGalatea = () => {
  const galateaVRM = useVRM(vrmUrl)

  useVRMAutoBlink(galateaVRM, 5000)
  useVRMAutoLookAtDefaultCamera(galateaVRM)

  const [galateaRef, galateaEntity] = useGameEntity(OrcustAutomaton)

  return {
    galateaEntity,
    galateaRef,
    galateaVRM,
  }
}
