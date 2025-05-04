import {
  Container,
  Fullscreen,
  Text,
} from '@react-three/uikit'
import { Button, Defaults, Input } from '@react-three/uikit-default'
import { GithubIcon, MoonIcon, SendIcon, SettingsIcon, SunIcon } from '@react-three/uikit-lucide'
import { IfInSessionMode, useXRStore } from '@react-three/xr'
import { useState } from 'react'

import { useIsDarkValue, useToggleIsDark } from '~/hooks/use-is-dark'
import { useNavigate } from '~/router'

const NavbarThemeIcon = ({ isDark }: { isDark: boolean }) => isDark
  ? <SunIcon height={16} width={16} />
  : <MoonIcon height={16} width={16} />

export const Navbar = () => {
  const store = useXRStore()
  const navigate = useNavigate()
  const isDark = useIsDarkValue()
  const toggleIsDark = useToggleIsDark()
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
                <Text>Enter AR</Text>
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
              <Button
                data-test-id="toggle-color-scheme"
                onClick={() => toggleIsDark()}
                size="icon"
                variant="secondary"
              >
                <NavbarThemeIcon isDark={isDark} />
              </Button>
              <Button
                data-test-id="github"
                onClick={() => window.open('https://github.com/moeru-ai/n3p6', '_blank', 'noopener')}
                size="icon"
                variant="secondary"
              >
                <GithubIcon height={16} width={16} />
              </Button>
            </Container>
          </Container>
        </Fullscreen>
      </Defaults>
    </IfInSessionMode>
  )
}
