import type { JSX, PropsWithChildren } from 'react'
import type { Group } from 'three'

import { useFrame, useThree } from '@react-three/fiber'
import { Root } from '@react-three/uikit'
import { colors } from '@react-three/uikit-default'
import { useXRInputSourceState } from '@react-three/xr'
import { useDebouncedState } from 'foxact/use-debounced-state'
import { useMemo, useRef } from 'react'
import { Vector3 } from 'three'

import { Settings } from '~/components/ui/settings'

export const FloatingMenu = ({ children, ...props }: PropsWithChildren<JSX.IntrinsicElements['group']>) => {
  const menuRef = useRef<Group>(null)
  const { camera } = useThree()

  const localPosition = useMemo(() => new Vector3(), [])

  useFrame(() => {
    if (!menuRef.current || props.visible === false)
      return

    localPosition.set(0, 0, -1)
    menuRef.current.position.copy(localPosition.applyMatrix4(camera.matrixWorld))
    menuRef.current.lookAt(camera.position)
  })

  return (
    <group ref={menuRef} {...props}>
      {children}
    </group>
  )
}

const DebugMenu = () => {
  const [visible, setVisible] = useDebouncedState(true, 100)

  const controllerLeft = useXRInputSourceState('controller', 'left')
  const controllerRight = useXRInputSourceState('controller', 'right')

  useFrame(() => {
    if (controllerLeft?.gamepad['y-button']?.state === 'pressed' || controllerRight?.gamepad['b-button']?.state === 'pressed')
      setVisible(!visible)
  })

  return (
    <FloatingMenu visible={visible}>
      <Root
        alignItems="center"
        backgroundColor={colors.muted}
        borderRadius={12}
        height={768}
        justifyContent="center"
        pixelSize={0.0015}
        width={1024}
      >
        <Settings />
      </Root>
    </FloatingMenu>
  )
}

export default DebugMenu
