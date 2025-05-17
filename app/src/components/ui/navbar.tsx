import {
  Container,
  Fullscreen,
  Text,
} from '@react-three/uikit'
import { Button, DialogAnchor } from '@react-three/uikit-default'
import { IfInSessionMode, useXRStore } from '@react-three/xr'

import { NavbarChat } from './navbar-chat'
import { NavbarSettings } from './navbar-settings'
import { ToggleColorSchemeButton } from './toggle-color-scheme-button'

export const Navbar = () => {
  const store = useXRStore()

  return (
    <IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
      <Fullscreen
        alignItems="flex-end"
        gap={8}
        justifyContent="center"
        padding={8}
        pointerEvents="listener"
      >
        <DialogAnchor>
          <Container flexDirection="column" gap={8} lg={{ flexDirection: 'row' }}>
            <NavbarChat />
            <Container gap={8} justifyContent="center">
              <Button
                data-test-id="enter-vr"
                onClick={() => void store.enterVR()}
                variant="secondary"
              >
                <Text>Enter VR</Text>
              </Button>
              <Button
                data-test-id="enter-ar"
                onClick={() => void store.enterAR()}
                variant="secondary"
              >
                <Text>Enter MR</Text>
              </Button>
              <NavbarSettings />
              <ToggleColorSchemeButton variant="secondary" />
            </Container>
          </Container>
        </DialogAnchor>
      </Fullscreen>
    </IfInSessionMode>
  )
}
