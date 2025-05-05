import { Canvas } from '@react-three/fiber'
import { setPreferredColorScheme } from '@react-three/uikit'
import { noEvents } from '@react-three/xr'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import { useIsDarkValue } from '~/hooks/use-is-dark'

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
      <Outlet />
    </Canvas>
  )
}

export default AppLayout
