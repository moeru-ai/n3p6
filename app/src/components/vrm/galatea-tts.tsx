import type { VRM } from '@pixiv/three-vrm'
import type { PositionalAudio } from 'three'

import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AudioListener } from 'three'

import { useAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'
import { useLipSync } from '~/hooks/use-lip-sync'

export const GalateaTTS = ({ vrm }: { vrm: VRM }) => {
  const { camera } = useThree()
  const sound = useRef<PositionalAudio>(null)
  const listener = useMemo(() => new AudioListener(), [])
  const audioBuffer = useAudioBuffer()
  const audioContext = useAudioContext()
  const audioBufferSource = useMemo(() => {
    const audioBufferSource = audioContext.createBufferSource()
    audioBufferSource.buffer = audioBuffer ?? null
    return audioBufferSource
  }, [audioContext, audioBuffer])

  useLipSync(audioBufferSource, vrm)

  useEffect(() => {
    const _sound = sound.current

    if (_sound && audioBuffer) {
      _sound.setBuffer(audioBuffer)
      // _sound.setRefDistance(1)
      _sound.setLoop(false)
      _sound.play()
      audioBufferSource.start()
    }

    return () => {
      try {
        audioBufferSource.stop()
      }
      catch {}

      if (_sound) {
        _sound.stop()
        _sound.clear()
      }
    }
  }, [sound, audioBuffer, audioBufferSource])

  useEffect(() => {
    camera.add(listener)

    return () => {
      camera.remove(listener)
    }
  }, [camera, listener])

  return <positionalAudio args={[listener]} ref={sound} />
}
