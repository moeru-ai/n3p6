import { Text } from '@react-three/drei'
import { useMicVAD, utils } from '@ricky0123/vad-react'
import { generateTranscription } from '@xsai/generate-transcription'
import { startTransition, useEffect, useState } from 'react'

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

    startTransition(async () => {
      const { text } = await generateTranscription({ ...sttProvider, file })

      if (import.meta.env.DEV)
        // eslint-disable-next-line no-console
        console.log('Transcription:', text)

      setText(text)
    })
  }, [file, sttProvider])

  return (
    <Text>{text}</Text>
  )
}

export default DebugVadStt
