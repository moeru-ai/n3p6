/// <reference types="dom-speech-recognition" />

import { useCallback, useMemo, useState } from 'react'

export interface UseSpeechRecognitionOptions {
  /** @default `true` */
  continuous?: SpeechRecognition['continuous']
  /** @default `true` */
  interimResults?: SpeechRecognition['interimResults']
  /** @default `en-US` */
  lang?: SpeechRecognition['lang']
  /** @default `1` */
  maxAlternatives?: SpeechRecognition['maxAlternatives']
}

export const useSpeechRecognition = (options: UseSpeechRecognitionOptions = {}) => {
  const isSupported = useMemo(() => 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window, [])
  const [isFinal, setIsFinal] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [result, setResult] = useState<string>()
  const [error, setError] = useState<SpeechRecognitionErrorEvent>()

  const speechRecognition = useMemo(() => {
    if (!isSupported)
      return

    // eslint-disable-next-line ts/strict-boolean-expressions
    const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

    speechRecognition.continuous = options.continuous ?? true
    speechRecognition.interimResults = options.interimResults ?? true
    speechRecognition.lang = options.lang ?? 'en-US'
    speechRecognition.maxAlternatives = options.maxAlternatives ?? 1

    speechRecognition.onstart = () => {
      setIsListening(true)
      setIsFinal(false)
    }

    speechRecognition.onresult = (event) => {
      const currentResult = event.results[event.resultIndex]
      const { transcript } = currentResult[0]

      setIsFinal(currentResult.isFinal)
      setResult(transcript)
      setError(undefined)
    }

    speechRecognition.onerror = error =>
      setError(error)

    speechRecognition.onend = () =>
      setIsListening(false)

    return speechRecognition
  }, [options, isSupported])

  const start = useCallback(() => speechRecognition?.start(), [speechRecognition])
  const stop = useCallback(() => speechRecognition?.stop(), [speechRecognition])
  const toggle = useCallback(() => {
    if (isListening)
      speechRecognition?.stop()
    else
      speechRecognition?.start()
  }, [speechRecognition, isListening])

  return {
    error,
    isFinal,
    isListening,
    isSupported,
    result,
    start,
    stop,
    toggle,
  }
}
