import { useVRM } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useEffect, useState } from 'react'

import { useAnimationCollection } from '~/hooks/use-animation-collection'

const toggleState = (state: 'idle' | 'walk') =>
  state === 'idle' ? 'walk' : 'idle'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

const DebugAnimations = () => {
  const vrm = useVRM(vrmUrl)
  const clips = useAnimationCollection(vrm)
  const { actions } = useAnimations(clips, vrm.scene)

  const [state, setState] = useState<'idle' | 'walk'>('walk')

  useEffect(() => {
    actions.idle!.reset().play()

    // eslint-disable-next-line @masknet/no-timer
    const interval = setInterval(() => {
      console.warn('State:', state)

      actions[state]!
        .reset()
        .crossFadeFrom(actions[toggleState(state)]!, 1)
        .play()

      setState(state => state === 'idle' ? 'walk' : 'idle')
    }, 5000)

    return () => {
      // eslint-disable-next-line @masknet/no-timer
      clearInterval(interval)
    }
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

export default DebugAnimations
