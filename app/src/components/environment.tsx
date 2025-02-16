import { Grid, Stars } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { isDarkMode } from '@react-three/uikit'
import { colors } from '@react-three/uikit-default'
import { IfInSessionMode } from '@react-three/xr'

export const Environment = () => {
  const intensity = isDarkMode.value ? 0.5 : 1

  return (
    <>
      <ambientLight intensity={intensity} />
      <RigidBody includeInvisible type="fixed">
        <mesh
          position={[0, 0, 0]}
          scale={[100, 0.1, 100]}
          visible={false}
        >
          <boxGeometry />
        </mesh>
      </RigidBody>
      <IfInSessionMode deny="immersive-ar">
        <Grid
          cellColor={colors.foreground.value}
          cellSize={3}
          cellThickness={1}
          fadeDistance={100}
          fadeStrength={5}
          infiniteGrid
          position={[0, 0, 0]}
          sectionSize={0}
        />
        <color args={[colors.background.value]} attach="background" />
        {isDarkMode.value && <Stars count={99} depth={99} fade />}
      </IfInSessionMode>
    </>
  )
}
