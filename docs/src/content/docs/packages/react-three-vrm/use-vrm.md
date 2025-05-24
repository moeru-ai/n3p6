---
title: useVRM
---

A convenience hook that uses `useLoader`, `GLTFLoader` and `VRMLoaderPlugin`.

```tsx
import { useVRM } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'

export const AvatarSampleA = () => {
  const vrm = useVRM(url)

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
import { useVRM } from '@n3p6/react-three-vrm'

useVRM.preload(url)
```
