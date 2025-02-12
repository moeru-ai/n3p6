import { Grid, Stars } from '@react-three/drei'
import { isDarkMode } from '@react-three/uikit'
import { colors } from '@react-three/uikit-default'
import { IfInSessionMode } from '@react-three/xr'

export const Environment = () => (
  <IfInSessionMode deny="immersive-ar">
    <Grid
      cellColor={colors.foreground.value}
      cellSize={3}
      cellThickness={1}
      fadeDistance={100}
      fadeStrength={5}
      infiniteGrid
      position={[0, -5, 0]}
      sectionSize={0}
    />
    <ambientLight intensity={0.1} />
    <color args={[colors.background.value]} attach="background" />
    {isDarkMode.value && <Stars count={99} depth={99} fade />}
  </IfInSessionMode>
)
