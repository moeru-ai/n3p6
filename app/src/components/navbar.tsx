import {
  Fullscreen,
  Text,
} from '@react-three/uikit'
import { Button } from '@react-three/uikit-default'
import { GithubIcon } from '@react-three/uikit-lucide'
import { IfInSessionMode, useXRStore } from '@react-three/xr'

export const Navbar = () => {
  const store = useXRStore()

  return (
    <IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
      <Fullscreen
        alignItems="flex-end"
        flexDirection="row"
        gap={8}
        justifyContent="center"
        paddingBottom={8}
        pointerEvents="listener"
      >
        <Button
          data-test-id="github"
          onClick={() => window.open('https://github.com/moeru-ai/n3p6', '_blank', 'noopener')}
          size="icon"
        >
          <GithubIcon height={16} width={16} />
        </Button>
        <Button
          data-test-id="enter-vr"
          onClick={() => void store.enterVR()}
        >
          <Text>Enter VR</Text>
        </Button>
        <Button
          data-test-id="enter-ar"
          onClick={() => void store.enterAR()}
        >
          <Text>Enter AR</Text>
        </Button>
      </Fullscreen>
    </IfInSessionMode>
  )
}
