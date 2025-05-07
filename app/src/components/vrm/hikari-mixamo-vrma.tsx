import { useVRM, useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'

import walkUrl from '~/assets/motions/walk.vrma?url'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const HikariMixamoVrma = () => {
  const vrm = useVRM(vrmUrl)
  const walk = useVRMAnimation(walkUrl, vrm, 'walk')

  const { actions } = useAnimations([walk], vrm.scene)

  useEffect(() => {
    actions.walk?.reset().play()

    return () => {
      actions.walk?.stop()
    }
  }, [actions])

  useFrame((_, delta) => vrm.update(delta))

  return (
    <primitive
      object={vrm.scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={1.05}
    />
  )
}
