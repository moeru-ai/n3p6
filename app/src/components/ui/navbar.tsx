import {
  Container,
  Fullscreen,
  Text,
} from '@react-three/uikit'
import { Button } from '@react-three/uikit-default'
import { SettingsIcon } from '@react-three/uikit-lucide'
import { IfInSessionMode, useXRStore } from '@react-three/xr'

import { useNavigate } from '~/router'

import { NavbarChat } from './navbar-chat'
import { ToggleColorSchemeButton } from './toggle-color-scheme-button'

export const Navbar = () => {
  const store = useXRStore()
  const navigate = useNavigate()

  return (
    <IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
      <Fullscreen
        alignItems="flex-end"
        gap={8}
        justifyContent="center"
        padding={8}
        pointerEvents="listener"
      >
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
            <Button
              data-test-id="settings"
              // eslint-disable-next-line ts/no-misused-promises
              onClick={async () => navigate('/settings')}
              size="icon"
              variant="secondary"
            >
              <SettingsIcon height={16} width={16} />
            </Button>
            <ToggleColorSchemeButton variant="secondary" />
          </Container>
        </Container>
      </Fullscreen>
    </IfInSessionMode>
  )
}
