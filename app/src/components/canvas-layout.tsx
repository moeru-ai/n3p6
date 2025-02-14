import type { PropsWithChildren } from 'react'

import { Canvas } from '@react-three/fiber'
import { setPreferredColorScheme } from '@react-three/uikit'
import { createXRStore, XR } from '@react-three/xr'

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
      <XR store={store}>
        {children}
        <Environment />
      </XR>
    </Canvas>
  )
}
