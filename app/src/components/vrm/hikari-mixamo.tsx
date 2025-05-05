import { useMixamoAnimation, useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'

import fbxUrl from '~/assets/motions/mixamo/Standing Idle.fbx?url'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)
// eslint-disable-next-line @masknet/no-top-level
useMixamoAnimation.preload(fbxUrl)

export const HikariMixamo = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useMixamoAnimation(fbxUrl, vrm)
  const { actions, mixer } = useAnimations(
    [animation],
    vrm.scene,
  )

  useVRMAutoBlink(vrm, 5000)
  useVRMAutoLookAtDefaultCamera(vrm)

  useEffect(() => {
    actions.vrmAnimation!.reset().play()
  }, [actions])

  useFrame((_, delta) => {
    mixer.update(delta)
    vrm.update(delta)
  })

  return (
    <primitive
      object={vrm.scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={1.05}
    />
  )
}
