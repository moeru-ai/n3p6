# @n3p6/react-three-yuka

useful helpers for `yuka` to make your life easier.

## Usage

### Install

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

###### InitRecastNavigation (./recast-navigation)

Call the functions of recast-navigation under this component.

```tsx
import { InitRecastNavigation } from '@n3p6/react-three-yuka/recast-navigation'
import { Outlet } from 'react-router'

export const Layout = () => (
  <InitRecastNavigation>
    <Outlet />
  </InitRecastNavigation>
)
```

###### toYukaNavMesh (./recast-navigation)

```ts
import type { Mesh } from 'three'
import type { NavMesh } from 'yuka'

import { toYukaNavMesh } from '@n3p6/react-three-yuka/recast-navigation'
import { threeToSoloNavMesh } from '@recast-navigation/three'

const meshes: Mesh[] = [/* ... */]

const { navMesh } = threeToSoloNavMesh(meshes, { /* config */})

const yukaNavMesh: NavMesh = toYukaNavMesh(navMesh!)
```

# License

[MIT](../../LICENSE.md)
