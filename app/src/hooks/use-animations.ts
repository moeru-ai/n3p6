import type { AnimationAction, AnimationClip, Group } from 'three'

import { useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { AnimationMixer } from 'three'

interface Api {
  actions: Record<string, AnimationAction>
  clips: AnimationClip[]
  mixer: AnimationMixer
  names: string[]
  // ref: React.RefObject<null | Object3D | undefined>
}

export const useAnimations = (
  clips: AnimationClip[],
  scene: Group,
): Api => {
  const [root, setRoot] = useState(() => scene)
  const [mixer, setMixer] = useState(() => new AnimationMixer(root))

  useLayoutEffect(() => {
    setRoot(scene)

    setMixer(new AnimationMixer(root))
  }, [scene, root])

  // const lazyActions = useRef<Record<string, AnimationAction | undefined>>({})

  const api = useMemo<Api>(() => {
    const actions: Record<string, AnimationAction> = {}
    clips.forEach(clip =>
      Object.defineProperty(actions, clip.name, {
        configurable: true,
        enumerable: true,
        // get: () => (lazyActions.current[clip.name] || (lazyActions.current[clip.name] = mixer.clipAction(clip, root))),
        get: () => mixer.clipAction(clip, root),
      }),
    )
    return { actions, clips, mixer, names: clips.map(c => c.name) }
  }, [clips, mixer, root])

  useFrame((_, delta) => mixer.update(delta))

  useEffect(() => {
    return () => {
      // Clean up only when clips change, wipe out lazy actions and uncache clips
      // lazyActions.current = {}
      mixer.stopAllAction()
      // eslint-disable-next-line @masknet/type-no-force-cast-via-top-type
      Object.values(api.actions).forEach(action => mixer.uncacheAction(action as unknown as AnimationClip, root))
    }
  }, [clips, mixer, root, api.actions])

  return api
}
