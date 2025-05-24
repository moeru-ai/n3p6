---
title: useVRMAnimation
---

A convenience hook that uses `useLoader`, `GLTFLoader` and `VRMAnimationLoaderPlugin`.

```tsx
import { useVRM, useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'

export const AvatarSampleA = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useVRMAnimation(vrmaUrl, vrm)
  const { actions } = useAnimations([animation], vrm.scene)

  useEffect(() => actions.Clip!.play(), [actions])

  return (
    <primitive
      object={vrm.scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}
```

You can also preload a model:

```tsx
import { useVRMAnimation } from '@n3p6/react-three-vrm'

useVRMAnimation.preload(vrmaUrl)
```
