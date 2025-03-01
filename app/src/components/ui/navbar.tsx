import {
  Container,
  Fullscreen,
  Text,
} from '@react-three/uikit'
import { Button, Defaults, Input } from '@react-three/uikit-default'
import { GithubIcon } from '@react-three/uikit-lucide'
import { IfInSessionMode, useXRStore } from '@react-three/xr'

export const Navbar = () => {
  const store = useXRStore()

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
            <Input maxWidth={256} placeholder="Send message..." />
            <Container gap={8} justifyContent="center">
              <Button
                data-test-id="github"
                onClick={() => window.open('https://github.com/moeru-ai/n3p6', '_blank', 'noopener')}
                size="icon"
                variant="secondary"
              >
                <GithubIcon height={16} width={16} />
              </Button>
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
            </Container>
          </Container>
        </Fullscreen>
      </Defaults>
    </IfInSessionMode>
  )
}
