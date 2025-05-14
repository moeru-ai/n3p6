import type { PropsWithChildren } from 'react'

import { OrbitControls, Stats } from '@react-three/drei'
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
    <>
      {import.meta.env.DEV && <Stats />}
      <PointerEvents />
      <OrbitControls />
      <XR store={store}>
        <Player />
        {children}
        <Environment />
        <Navbar />
      </XR>
    </>
  )
}
