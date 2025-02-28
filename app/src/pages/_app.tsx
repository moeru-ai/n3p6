import { Canvas } from '@react-three/fiber'
import { setPreferredColorScheme } from '@react-three/uikit'
import { noEvents } from '@react-three/xr'
import { Outlet } from 'react-router'

// eslint-disable-next-line @masknet/no-top-level
setPreferredColorScheme('system')

const AppLayout = () => (
  <Canvas
    camera={{ position: [0, 1.75, 1.75] }}
    events={noEvents}
    gl={{ localClippingEnabled: true }}
    style={{ flexGrow: 1, width: '100%' }}
  >
    <Outlet />
  </Canvas>
)

export default AppLayout
