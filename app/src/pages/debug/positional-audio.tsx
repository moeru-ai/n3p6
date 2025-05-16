import { Container, Root, Text } from '@react-three/uikit'
import { Button, Input } from '@react-three/uikit-default'
import { generateSpeech } from '@xsai/generate-speech'
import { useMemo, useState } from 'react'

import { Galatea } from '~/components/vrm/galatea'
import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useTTSProvider } from '~/hooks/use-providers'

const DebugPositionalAudio = () => {
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState<string>('')
  const [ttsProvider] = useTTSProvider()
  const setAudioBuffer = useSetAudioBuffer()

  const audioContext = useMemo(() => new AudioContext({ latencyHint: 'interactive' }), [])

  const handleSubmit = async () => {
    setDisabled(true)

    const arrayBuffer = await generateSpeech({
      ...ttsProvider,
      input: value,
    })

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    setAudioBuffer(audioBuffer)
    setValue('')
    setDisabled(false)
  }

  return (
    <>
      <Galatea />
      <group position={[0, 1, 0]}>
        <Root>
          <Container flexDirection="column" gap={4}>
            <Input
              data-test-id="debug-input"
              disabled={disabled}
              onValueChange={value => setValue(value)}
              placeholder="Write a message..."
              value={value}
              width={200}
            />
            <Button
              data-test-id="debug-button"
              disabled={disabled}
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
