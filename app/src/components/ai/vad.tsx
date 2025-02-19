import { Text } from '@react-three/drei'
import { useMicVAD } from '@ricky0123/vad-react'

export const Vad = () => {
  const vad = useMicVAD({
    model: 'v5',
    // eslint-disable-next-line no-console
    onSpeechEnd: () => console.log('VAD End'),
    // eslint-disable-next-line no-console
    onSpeechStart: () => console.log('VAD Start'),
    // eslint-disable-next-line no-console
    onVADMisfire: () => console.log('VAD Misfire'),
    startOnLoad: true,
  })

  return (
    <Text scale={0.1} visible={false}>{vad.userSpeaking}</Text>
  )
}
