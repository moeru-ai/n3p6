import type { PropsWithChildren } from 'react'

import { Stats } from '@react-three/drei'
import { OrbitHandles } from '@react-three/handle'
import { Physics } from '@react-three/rapier'
import { createXRStore, PointerEvents, XR } from '@react-three/xr'

import { Vad } from './ai/vad'
import { Player } from './characters/player'
import { Environment } from './environment'
import { Navbar } from './ui/navbar'

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
    <>
      {import.meta.env.DEV && <Stats />}
      <PointerEvents />
      <OrbitHandles />
      <XR store={store}>
        <Vad />
        <Physics
          debug={import.meta.env.DEV}
          gravity={[0, -9.81, 0]}
        >
          <Player />
          {children}
          <Environment />
        </Physics>
        <Navbar />
      </XR>
    </>
  )
}
