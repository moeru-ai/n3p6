import type { VRM } from '@pixiv/three-vrm'
import type { Profile } from 'wlipsync'

import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import useSWR from 'swr'
import { createWLipSyncNode } from 'wlipsync'

import profile from '~/assets/lip-sync/profile.json' with { type: 'json' }
import { useAudioContext } from '~/context/audio-context'

// https://github.com/mrxz/wLipSync/blob/c3bc4b321dc7e1ca333d75f7aa1e9e746cbbb23a/example/index.js#L50-L66
const lipSyncMap = {
  A: 'aa',
  E: 'ee',
  I: 'ih',
  O: 'oh',
  U: 'ou',
}

export const useLipSync = (audioBufferSource: AudioBufferSourceNode, vrm: VRM) => {
  const audioContext = useAudioContext()

  const { data: lipSyncNode } = useSWR('wlipsync/createWLipSyncNode', async () => createWLipSyncNode(audioContext, profile as Profile))

  useEffect(() => {
    if (lipSyncNode)
      audioBufferSource.connect(lipSyncNode)

    return () => {
      audioBufferSource.disconnect()
    }
  }, [audioBufferSource, lipSyncNode])

  useFrame(() => {
    if (lipSyncNode) {
      for (const key of Object.keys(lipSyncNode.weights)) {
        const weight = lipSyncNode.weights[key] * lipSyncNode.volume
        vrm.expressionManager?.setValue(lipSyncMap[key as keyof typeof lipSyncMap], weight)
      }
    }
  })
}
