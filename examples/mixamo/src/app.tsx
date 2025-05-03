import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { VRM } from './components/vrm'

export const App = () => (
  <Canvas
    camera={{ position: [0, 1.75, 1.75] }}
    gl={{ localClippingEnabled: true }}
    style={{ flexGrow: 1, width: '100%' }}
  >
    <VRM />
    <ambientLight intensity={1.5} />
    <Sky azimuth={0.25} distance={450000} inclination={0} sunPosition={[0, 1, 0]} />
    <OrbitControls />
  </Canvas>
)
