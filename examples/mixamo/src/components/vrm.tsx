import { useMixamoAnimation, useVRM } from '@n3p6/react-three-vrm'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'

import fbxUrl from '../assets/motions/mixamo/Standing Idle.fbx?url'

// import fbxUrl from '~/assets/motions/mixamo/Standing Idle.fbx?url'

const vrmUrl = 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const VRM = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useMixamoAnimation(fbxUrl, vrm)

  const mixer = useRef<AnimationMixer>(null)

  useEffect(() => {
    const mixerTmp = new AnimationMixer(vrm.scene)
    mixer.current = mixerTmp

    const action = mixer.current.clipAction(animation)

    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5).stop()
    }
  }, [animation, mixer, vrm.scene])

  useFrame((_, delta) => {
    if (mixer.current)
      mixer.current.update(delta)

    vrm.update(delta)
  })

  return (
    <primitive
      object={vrm.scene}
      position={[0, -1, 0]}
      rotation={[0, Math.PI, 0]}
      scale={1}
    />
  )
}
