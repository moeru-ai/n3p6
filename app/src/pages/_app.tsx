import { EntityManagerProvider } from '@n3p6/react-three-yuka'
import { Canvas } from '@react-three/fiber'
import { setPreferredColorScheme } from '@react-three/uikit'
import { noEvents } from '@react-three/xr'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { Stage } from '~/components/stage'
import { useIsDarkValue } from '~/hooks/use-is-dark'

const AppLayout = () => {
  const { pathname } = useLocation()
  const events = pathname.includes('settings') ? undefined : noEvents
  const isDark = useIsDarkValue()

  useEffect(() => setPreferredColorScheme(isDark ? 'dark' : 'light'), [isDark])

  return (
    <EntityManagerProvider>
      <Canvas
        camera={{ position: [0, 1.75, 3.5] }}
        events={events}
        gl={{ localClippingEnabled: true }}
        style={{ flexGrow: 1, width: '100%' }}
      >
        <Stage>
          <Outlet />
        </Stage>
      </Canvas>
    </EntityManagerProvider>
  )
}

export default AppLayout
