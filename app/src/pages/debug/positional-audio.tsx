import { Container, Root, Text } from '@react-three/uikit'
import { Button, Input } from '@react-three/uikit-default'
import { generateSpeech } from '@xsai/generate-speech'
import { useState, useTransition } from 'react'

import { Galatea } from '~/components/vrm/galatea'
import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'
import { useTTSProvider } from '~/hooks/use-providers'

const DebugPositionalAudio = () => {
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState<string>('')
  const [ttsProvider] = useTTSProvider()
  const setAudioBuffer = useSetAudioBuffer()
  const audioContext = useAudioContext()

  const handleSubmit = async () =>
    startTransition(async () => {
      const arrayBuffer = await generateSpeech({
        ...ttsProvider,
        input: value,
      })

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

      // https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-after-await-as-a-transition
      startTransition(() => {
        setAudioBuffer(audioBuffer)
        setValue('')
      })
    })

  return (
    <>
      <Galatea />
      <group position={[0, 1, 0]}>
        <Root>
          <Container flexDirection="column" gap={4}>
            <Input
              data-test-id="debug-input"
              disabled={isPending}
              onValueChange={value => setValue(value)}
              placeholder="Write a message..."
              value={value}
              width={200}
            />
            <Button
              data-test-id="debug-button"
              disabled={isPending}
              // eslint-disable-next-line ts/no-misused-promises
              onClick={handleSubmit}
              variant="secondary"
            >
              <Text>Submit</Text>
            </Button>
          </Container>
        </Root>
      </group>
    </>
  )
}

export default DebugPositionalAudio
