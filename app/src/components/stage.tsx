import type { PropsWithChildren } from 'react'

import { OrbitControls, Stats } from '@react-three/drei'
// import { OrbitHandles } from '@react-three/handle'
import { Physics } from '@react-three/rapier'
import { createXRStore, PointerEvents, XR } from '@react-three/xr'

import { Vad } from '~/components/ai/vad'
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
    <>
      {import.meta.env.DEV && <Stats />}
      <PointerEvents />
      {/* <OrbitHandles /> */}
      <OrbitControls />
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
