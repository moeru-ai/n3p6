import type { PropsWithChildren } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitHandles } from '@react-three/handle'
import { Physics } from '@react-three/rapier'
import { setPreferredColorScheme } from '@react-three/uikit'
import { createXRStore, PointerEvents, XR } from '@react-three/xr'

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
      camera={{ position: [0, 0, 0.65] }}
      gl={{ localClippingEnabled: true }}
      style={{ flexGrow: 1, width: '100%' }}
    >
      <PointerEvents />
      <OrbitHandles />
      <XR store={store}>
        <Physics debug gravity={[0, -9.81, 0]}>
          <Player />
          {children}
          <Environment />
        </Physics>
      </XR>
    </Canvas>
  )
}
