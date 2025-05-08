import { useVRM, useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useEffect } from 'react'

import appearingUrl from '~/assets/motions/vroid-hub/appearing.vrma?url'
import likedUrl from '~/assets/motions/vroid-hub/liked.vrma?url'
import waitingUrl from '~/assets/motions/vroid-hub/waiting.vrma?url'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const HikariVrma = () => {
  const vrm = useVRM(vrmUrl)
  const appearing = useVRMAnimation(appearingUrl, vrm, 'appearing')
  const waiting = useVRMAnimation(waitingUrl, vrm, 'waiting')
  const liked = useVRMAnimation(likedUrl, vrm, 'liked')

  const { actions, names } = useAnimations([appearing, waiting, liked], vrm.scene)

  useEffect(() => {
    let index: 0 | 1 | 2 = 0

    // eslint-disable-next-line @masknet/no-timer
    const loop = setInterval(() => {
      Object.values(actions)[index]?.stop()
      console.warn('Stopped:', names[index])

      if (index === 2)
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

  return (
    <primitive
      object={vrm.scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={1.05}
    />
  )
}
