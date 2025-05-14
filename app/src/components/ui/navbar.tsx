import {
  Container,
  Fullscreen,
  Text,
} from '@react-three/uikit'
import { Button, Defaults, Input } from '@react-three/uikit-default'
import { SendIcon, SettingsIcon } from '@react-three/uikit-lucide'
import { IfInSessionMode, useXRStore } from '@react-three/xr'
import { useState } from 'react'

import { useNavigate } from '~/router'

import { ToggleColorSchemeButton } from './toggle-color-scheme-button'

export const Navbar = () => {
  const store = useXRStore()
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  return (
    <IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
      <Defaults>
        <Fullscreen
          alignItems="flex-end"
          gap={8}
          justifyContent="center"
          padding={8}
          pointerEvents="listener"
        >
          <Container flexDirection="column" gap={8} lg={{ flexDirection: 'row' }}>
            <Container gap={8} justifyContent="center">
              <Input
                marginX="auto"
                maxWidth={284}
                onValueChange={value => setValue(value)}
                placeholder="Write a message..."
                value={value}
              />
              <Button
                data-test-id="send-message"
                onClick={() => setValue('')}
                size="icon"
                variant="secondary"
              >
                <SendIcon height={16} width={16} />
              </Button>
            </Container>
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
      </Defaults>
    </IfInSessionMode>
  )
}
