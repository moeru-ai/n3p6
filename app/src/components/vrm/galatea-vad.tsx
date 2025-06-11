import type { Message } from '@xsai/shared-chat'

import { toSystemMessage } from '@n3p6/ccc'
import { useXR } from '@react-three/xr'
import { useMicVAD, utils } from '@ricky0123/vad-react'
import { generateSpeech } from '@xsai/generate-speech'
import { generateText } from '@xsai/generate-text'
import { generateTranscription } from '@xsai/generate-transcription'
import { useDebouncedState } from 'foxact/use-debounced-state'
import { useEffect, useRef } from 'react'

import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'
import { useCharacterCard } from '~/hooks/use-character-card'
import { useMessages } from '~/hooks/use-messages'
import { useLLMProvider, useSTTProvider, useTTSProvider } from '~/hooks/use-providers'

export const GalateaVAD = () => {
  const [llmProvider] = useLLMProvider()
  const [sttProvider] = useSTTProvider()
  const [ttsProvider] = useTTSProvider()

  const mode = useXR(({ mode }) => mode)
  const [character] = useCharacterCard()

  const [msg, setMsg] = useMessages()
  const msgRef = useRef<Message[]>(msg)

  const setAudioBuffer = useSetAudioBuffer()
  const audioContext = useAudioContext()

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
    msgRef.current = msg
  }, [msg])

  useEffect(() => {
    if (!file || file === prevFile.current)
      return

    prevFile.current = file

    const processAudio = async () => {
      const { text: content } = await generateTranscription({ ...sttProvider, file })
      if (import.meta.env.DEV)
        console.warn('Transcription:', content)

      const { messages, text: input } = await generateText({
        ...llmProvider,
        messages: [
          ...(character
            ? [toSystemMessage(character, { mode, userName: 'User' })]
            : []),
          ...msgRef.current,
          { content, role: 'user' },
        ],
      })
      if (import.meta.env.DEV)
        console.warn('Response:', input)

      if (input != null) {
        setMsg(messages.slice(1))
        const arrayBuffer = await generateSpeech({ ...ttsProvider, input })
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        setAudioBuffer(audioBuffer)
      }
    }

    void processAudio()
  }, [file, llmProvider, sttProvider, ttsProvider, audioContext, character, mode, setMsg, setAudioBuffer])

  return null
}
