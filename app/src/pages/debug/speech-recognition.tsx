import { useSpeechRecognition } from '@n3p6/use-speech-recognition'
import { Container, Root, Text } from '@react-three/uikit'
import { Button } from '@react-three/uikit-default'
import { useEffect } from 'react'

const DebugSpeechRecognition = () => {
  const { isFinal, isListening, isSupported, result, start, stop } = useSpeechRecognition({
    // interimResults: false,
    lang: navigator.language,
  })

  useEffect(() => console.warn(result), [result])

  return (
    <group position={[0, 1, 0]}>
      <Root>
        <Container flexDirection="column" gap={4}>
          <Text>
            isSupported:
            {isSupported}
          </Text>
          <Text>
            isListening:
            {isListening}
          </Text>
          <Text>
            isFinal:
            {isFinal}
          </Text>
          <Text>
            result:
            {result}
          </Text>
          <Button
            data-test-id="speech-recognition-start"
            onClick={start}
          >
            <Text>Start</Text>
          </Button>
          <Button
            data-test-id="speech-recognition-stop"
            onClick={stop}
            variant="destructive"
          >
            <Text>Stop</Text>
          </Button>
        </Container>
      </Root>
    </group>
  )
}

export default DebugSpeechRecognition
