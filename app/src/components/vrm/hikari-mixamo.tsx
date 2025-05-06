import { useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'

import { useMixamoAnimations } from '~/hooks/use-mixamo-animations'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const HikariMixamo = () => {
  const vrm = useVRM(vrmUrl)
  const clips = useMixamoAnimations(vrm)
  const { actions, names } = useAnimations(clips, vrm.scene)

  useVRMAutoBlink(vrm, 5000)
  useVRMAutoLookAtDefaultCamera(vrm)

  useEffect(() => {
    let index = 0

    // eslint-disable-next-line @masknet/no-timer
    const loop = setInterval(() => {
      Object.values(actions)[index]?.stop()
      console.warn('Stopped:', names[index])

      if (index === 5)
        index = 0
      else
        index++

      Object.values(actions)[index]?.reset().play()
      console.warn('Playing:', names[index])
    }, 5000)

    return () => {
      // eslint-disable-next-line @masknet/no-timer
      clearInterval(loop)
    }
  }, [actions, names])

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
