import { EntityManagerProvider, ObstaclesProvider } from '@n3p6/react-three-yuka'
import { Canvas } from '@react-three/fiber'
import { setPreferredColorScheme } from '@react-three/uikit'
import { noEvents } from '@react-three/xr'
import { ComposeContextProvider } from 'foxact/compose-context-provider'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { MeshProvider } from '~/context/mesh'
import { useIsDarkValue } from '~/hooks/use-is-dark'

const contexts = [
  <EntityManagerProvider key="entity-manager" />,
  <ObstaclesProvider key="obstacles" />,
  <MeshProvider key="mesh" />,
]

const AppLayout = () => {
  const { pathname } = useLocation()
  const events = pathname.includes('settings') ? undefined : noEvents
  const isDark = useIsDarkValue()

  useEffect(() => setPreferredColorScheme(isDark ? 'dark' : 'light'), [isDark])

  return (
    <Canvas
      camera={{ position: [0, 1.75, 3.5] }}
      events={events}
      gl={{ localClippingEnabled: true }}
      style={{ flexGrow: 1, width: '100%' }}
    >
      <ComposeContextProvider contexts={contexts}>
        <Outlet />
      </ComposeContextProvider>
    </Canvas>
  )
}

export default AppLayout
