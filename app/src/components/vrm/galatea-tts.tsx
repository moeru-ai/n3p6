import type { PositionalAudio } from 'three'

import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AudioListener } from 'three'

import { useAudioBuffer } from '~/context/audio-buffer'

export const GalateaTTS = () => {
  const { camera } = useThree()
  const sound = useRef<PositionalAudio>(null)
  const listener = useMemo(() => new AudioListener(), [])
  const audioBuffer = useAudioBuffer()

  useEffect(() => {
    const _sound = sound.current

    if (_sound && audioBuffer) {
      _sound.setBuffer(audioBuffer)
      // _sound.setRefDistance(1)
      _sound.setLoop(false)
      _sound.play()
    }

    return () => {
      if (!_sound)
        return

      _sound.stop()
      _sound.clear()
    }
  }, [sound, audioBuffer])

  useEffect(() => {
    camera.add(listener)

    return () => {
      camera.remove(listener)
    }
  }, [camera, listener])

  return <positionalAudio args={[listener]} ref={sound} />
}
