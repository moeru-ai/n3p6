import type { PropsWithChildren } from 'react'

import { Stats } from '@react-three/drei'
import { BvhPhysicsWorld } from '@react-three/viverse'
import { createXRStore, PointerEvents, XR } from '@react-three/xr'

import { Environment } from '~/components/environment'
import { Navbar } from '~/components/ui/navbar'
import { Player } from '~/components/xr/player'

export const Stage = ({ children }: PropsWithChildren) => {
  const store = createXRStore({
    emulate: import.meta.env.DEV
      ? {
          primaryInputMode: 'hand',
          type: 'metaQuest3',
        }
      : false,
  })

  return (
    <BvhPhysicsWorld>
      {import.meta.env.DEV && <Stats />}
      <PointerEvents />
      <XR store={store}>
        <Player />
        {children}
        <Environment />
        <Navbar />
      </XR>
    </BvhPhysicsWorld>
  )
}
