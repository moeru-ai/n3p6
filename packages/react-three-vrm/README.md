# @n3p6/react-three-vrm

<!-- automd:badges color="black" bundlephobia -->

[![npm version](https://img.shields.io/npm/v/@n3p6/react-three-vrm?color=black)](https://npmjs.com/package/@n3p6/react-three-vrm)
[![npm downloads](https://img.shields.io/npm/dm/@n3p6/react-three-vrm?color=black)](https://npm.chart.dev/@n3p6/react-three-vrm)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@n3p6/react-three-vrm?color=black)](https://bundlephobia.com/package/@n3p6/react-three-vrm)

<!-- /automd -->

useful helpers for `@pixiv/three-vrm` to make your life easier.

## Usage

### Install

<!-- automd:pm-install auto=false -->

```sh
# npm
npm install @n3p6/react-three-vrm

# yarn
yarn add @n3p6/react-three-vrm

# pnpm
pnpm install @n3p6/react-three-vrm

# bun
bun install @n3p6/react-three-vrm

# deno
deno install @n3p6/react-three-vrm
```

<!-- /automd -->

### Example

###### Vrm

```tsx
import { Vrm } from '@n3p6/react-three-vrm'

// https://vite.dev/guide/assets#explicit-url-imports
import vrmUrl from './assets/models/AvatarSample_A.vrm'

export const AvatarSampleA = () =>
  <Vrm src={vrmUrl} />
```

###### useVRM & useVRMAnimation
```tsx
import { useVRM, useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'

// https://vite.dev/guide/assets#explicit-url-imports
import vrmUrl from './assets/models/AvatarSample_A.vrm'
import animationUrl from './assets/motions/waiting.vrma'

export const AvatarSampleA = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useVRMAnimation(animationUrl, vrm)
  const { actions } = useAnimations([animation], vrm.scene,)

  useEffect(() => {
    actions.Clip!.play()
  }, [actions])

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
