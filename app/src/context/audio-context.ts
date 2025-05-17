import { createContextState } from 'foxact/context-state'

const [AudioContextProvider, useAudioContext] = createContextState(new AudioContext({ latencyHint: 'interactive' }))

export { AudioContextProvider, useAudioContext }
