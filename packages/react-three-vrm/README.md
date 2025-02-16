# @n3p6/react-three-vrm

useful helpers for `@pixiv/three-vrm` to make your life easier.

## Usage

### Install

### Example

###### Vrm

```tsx
import { Vrm } from '@n3p6/react-three-vrm'

// https://vite.dev/guide/assets#explicit-url-imports
import vrmUrl from './assets/models/AvatarSample_A.vrm'

export const AvatarSampleA = () =>
  <Vrm src={vrmUrl} />
```

###### useVRM, useVRMA
```tsx
import { useVRM } from '@n3p6/react-three-vrm'
import { createVRMAnimationClip } from '@pixiv/three-vrm-animation'
import { useAnimations } from '@react-three/drei'

// https://vite.dev/guide/assets#explicit-url-imports
import vrmUrl from './assets/models/AvatarSample_A.vrm'
import vrmaUrl from './assets/motions/waiting.vrma'

export const AvatarSampleA = () => {
  const vrm = useVRM(vrmUrl)
  const vrma = useVRMA(vrmaUrl)

  const { actions, mixer } = useAnimations(
    [createVRMAnimationClip(vrma, vrm)],
    vrm.scene,
  )

  useEffect(() => {
    actions.Clip!.play()
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
    />
  )
}
```

# License

[MIT](../../LICENSE.md)
