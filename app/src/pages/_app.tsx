import { EntityManagerProvider, ObstaclesProvider } from '@n3p6/react-three-yuka'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { setPreferredColorScheme } from '@react-three/uikit'
import { Defaults } from '@react-three/uikit-default'
import { noEvents } from '@react-three/xr'
import { ComposeContextProvider } from 'foxact/compose-context-provider'
import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router'

import { AudioBufferProvider } from '~/context/audio-buffer'
import { AudioContextProvider } from '~/context/audio-context'
import { MemuClientProvider } from '~/context/memu-client'
import { useIsDarkValue } from '~/hooks/use-is-dark'

const contexts = [
  <Defaults key="uikit-default" />,
  <EntityManagerProvider key="entity-manager" />,
  <ObstaclesProvider key="obstacles" />,
  <AudioBufferProvider key="audio-buffer" />,
  <AudioContextProvider key="audio-context" />,
  <MemuClientProvider key="memu-client" />,
]

const AppLayout = () => {
  const isDark = useIsDarkValue()

  useEffect(() => setPreferredColorScheme(isDark ? 'dark' : 'light'), [isDark])

  return (
    <>
      <Loader />
      <Canvas
        events={noEvents}
        gl={{ localClippingEnabled: true }}
        style={{ flexGrow: 1, width: '100%' }}
      >
        <ComposeContextProvider contexts={contexts}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </ComposeContextProvider>
      </Canvas>
    </>
  )
}

export default AppLayout
