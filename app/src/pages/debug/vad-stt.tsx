import { Text } from '@react-three/drei'
import { useMicVAD, utils } from '@ricky0123/vad-react'
import { generateTranscription } from '@xsai/generate-transcription'
import { useEffect, useState } from 'react'

import { useSTTProvider } from '~/hooks/use-providers'

const DebugVadStt = () => {
  const [sttProvider] = useSTTProvider()
  const [file, setFile] = useState<Blob>()
  const [text, setText] = useState('')

  useMicVAD({
    onSpeechEnd: (audio) => {
      console.warn('onSpeechEnd')

      setFile(new Blob([utils.encodeWAV(audio)], { type: 'audio/wav' }))
    },
    onSpeechStart: () => console.warn('onSpeechStart'),
    startOnLoad: true,
  })

  useEffect(() => {
    if (!file)
      return

    const getTranscription = async () => {
      const { text } = await generateTranscription({ ...sttProvider, file })

      console.warn('Transcription:', text)
      setText(text)
    }

    void getTranscription()
  }, [file, sttProvider])

  return (
    <Text>{text}</Text>
  )
}

export default DebugVadStt
