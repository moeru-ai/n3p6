import { createContextState } from 'foxact/context-state'

const [AudioBufferProvider, useAudioBuffer, useSetAudioBuffer] = createContextState<AudioBuffer | undefined>(undefined)

export { AudioBufferProvider, useAudioBuffer, useSetAudioBuffer }
