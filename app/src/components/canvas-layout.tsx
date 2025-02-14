import type { PropsWithChildren } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitHandles } from '@react-three/handle'
import { Physics } from '@react-three/rapier'
import { setPreferredColorScheme } from '@react-three/uikit'
import { createXRStore, PointerEvents, XR } from '@react-three/xr'

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
    <Canvas>
      <PointerEvents />
      <OrbitHandles />
      <XR store={store}>
        <Physics>
          {children}
          <Environment />
        </Physics>
      </XR>
    </Canvas>
  )
}
