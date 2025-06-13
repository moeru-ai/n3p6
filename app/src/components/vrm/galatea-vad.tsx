import { useMicVAD, utils } from '@ricky0123/vad-react'
import { generateTranscription } from '@xsai/generate-transcription'
import { useDebouncedState } from 'foxact/use-debounced-state'
import { startTransition, useEffect, useRef } from 'react'

import { useChat } from '~/hooks/use-chat'
import { useSTTProvider } from '~/hooks/use-providers'

export const GalateaVAD = () => {
  const { send } = useChat()

  const [sttProvider] = useSTTProvider()

  const [file, setFile] = useDebouncedState<Blob | undefined>(undefined, 1000)
  const prevFile = useRef<Blob | undefined>(undefined)

  useMicVAD({
    model: 'v5',
    onSpeechEnd: (audio) => {
      if (import.meta.env.DEV)
        console.warn('onSpeechEnd')

      setFile(new Blob([utils.encodeWAV(audio)], { type: 'audio/wav' }))
    },
    onSpeechStart: () => import.meta.env.DEV && console.warn('onSpeechStart'),
    startOnLoad: true,
  })

  useEffect(() => {
    if (!file || file === prevFile.current)
      return

    prevFile.current = file

    startTransition(async () => {
      const { text: content } = await generateTranscription({ ...sttProvider, file })
      if (import.meta.env.DEV)
        console.warn('Transcription:', content)

      await send(content)
    })
  }, [send, file, sttProvider])

  return null
}
