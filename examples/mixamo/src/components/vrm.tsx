import { createMixamoAnimationClip, useVRM } from '@n3p6/react-three-vrm'
import { useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const vrmUrl = 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const Vrm = () => {
  const vrm = useVRM(vrmUrl)
  const mixer = useRef<AnimationMixer>(null)

  const onDragover = useCallback((event: DragEvent) => {
    event.preventDefault()
  }, [])
  const onDrop = useCallback(async (event: DragEvent) => {
    event.preventDefault()

    const files = event.dataTransfer?.files
    if (!files)
      return

    const file = files[0]
    const blob = new Blob([file], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)

    vrm.humanoid.resetNormalizedPose()

    const loader = new FBXLoader()
    const fbx = await loader.loadAsync(url)
    const clip = createMixamoAnimationClip(fbx, vrm)

    mixer.current = new AnimationMixer(vrm.scene)
    mixer.current.clipAction(clip).play()
  }, [vrm, mixer])

  useEffect(() => {
    window.addEventListener('dragover', onDragover)
    // eslint-disable-next-line ts/no-misused-promises
    window.addEventListener('drop', onDrop)

    return () => {
      window.removeEventListener('dragover', onDragover)
      // eslint-disable-next-line ts/no-misused-promises
      window.removeEventListener('drop', onDrop)
    }
  }, [onDragover, onDrop])

  useFrame((_, delta) => {
    mixer.current?.update(delta)
    vrm.update(delta)
  })

  return (
    <primitive
      object={vrm.scene}
      position={[0, -1, 0]}
      rotation={[0, Math.PI, 0]}
      scale={1}
    />
  )
}
