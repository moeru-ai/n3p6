import type { PropsWithChildren } from 'react'

import { Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { OrbitHandles } from '@react-three/handle'
import { Physics } from '@react-three/rapier'
import { setPreferredColorScheme } from '@react-three/uikit'
import { createXRStore, noEvents, PointerEvents, XR } from '@react-three/xr'

import { Vad } from './ai/vad'
import { Player } from './characters/player'
import { Environment } from './environment'

// eslint-disable-next-line @masknet/no-top-level
setPreferredColorScheme('system')

export const CanvasLayout = ({ children }: PropsWithChildren) => {
  const store = createXRStore({
    emulate: import.meta.env.DEV
      ? {
          primaryInputMode: 'hand',
          type: 'metaQuest3',
        }
      : false,
  })

  return (
    <Canvas
      camera={{ position: [0, 1.75, 1.75] }}
      events={noEvents}
      gl={{ localClippingEnabled: true }}
      style={{ flexGrow: 1, width: '100%' }}
    >
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
      </XR>
    </Canvas>
  )
}
