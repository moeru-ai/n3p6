# @n3p6/react-three-yuka

<!-- automd:badges color="black" bundlephobia -->

[![npm version](https://img.shields.io/npm/v/@n3p6/react-three-yuka?color=black)](https://npmjs.com/package/@n3p6/react-three-yuka)
[![npm downloads](https://img.shields.io/npm/dm/@n3p6/react-three-yuka?color=black)](https://npm.chart.dev/@n3p6/react-three-yuka)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@n3p6/react-three-yuka?color=black)](https://bundlephobia.com/package/@n3p6/react-three-yuka)

<!-- /automd -->

useful helpers for `yuka` to make your life easier.

## Usage

### Install

<!-- automd:pm-install auto=false -->

```sh
# npm
npm install @n3p6/react-three-yuka

# yarn
yarn add @n3p6/react-three-yuka

# pnpm
pnpm install @n3p6/react-three-yuka

# bun
bun install @n3p6/react-three-yuka

# deno
deno install @n3p6/react-three-yuka
```

<!-- /automd -->

### Example

###### EntityManager

```tsx
import { EntityManager } from '@n3p6/react-three-yuka'
import { Outlet } from 'react-router'

export const Layout = () => (
  <EntityManager>
    <Outlet />
  </EntityManager>
)
```

###### useEntityManager

```tsx
import { useEntityManager } from '@n3p6/react-three-yuka'
import { useEffect } from 'react'
import { GameEntity, SeekBehavior, Vehicle } from 'yuka'

export const Behavior = () => {
  const entityManager = useEntityManager()

  useEffect(() => {
    const player = entityManager.entities.find(item => item instanceof GameEntity)
    const vehicle = entityManager.entities.find(item => item instanceof Vehicle)
    vehicle.steering.add(new SeekBehavior(player.position))
  })

  return null
}
```

###### useGameEntity

```tsx
import { useGameEntity } from '@n3p6/react-three-yuka'
import { useEffect } from 'react'
import { GameEntity } from 'yuka'

export const Cube = () => {
  const [ref, entity] = useGameEntity(GameEntity)
  const inner = useRef()

  useEffect(() => {
    entity.steering.add(/* behavior */)

    return () => {
      entity.steering.remove(/* behavior */)
    }
  }, [entity])
  useFrame(() => (inner.current.rotation.x = inner.current.rotation.y += 0.01))

  return (
    <group ref={ref}>
      <mesh ref={inner}>
        <cubeBufferGeometry />
        <meshPhysicalMaterial color="hotpink" roughness={0.6} thickness={1} transmission={1} />
      </mesh>
    </group>
  )
}
```

# License

[MIT](../../LICENSE.md)
