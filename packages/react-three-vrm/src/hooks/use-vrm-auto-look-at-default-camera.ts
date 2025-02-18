import type { VRM } from '@pixiv/three-vrm'

import { useFrame } from '@react-three/fiber'
import { useSingleton } from 'foxact/use-singleton'
import { Object3D } from 'three'

export const useVRMAutoLookAtDefaultCamera = (vrm: VRM) => {
  const target = useSingleton(() => new Object3D())

  if (vrm.lookAt)
    // eslint-disable-next-line react-compiler/react-compiler
    vrm.lookAt.target = target.current

  useFrame(({ camera }, delta) => {
    target.current.position.set(
      camera.position.x,
      camera.position.y,
      camera.position.z,
    )

    if (vrm.lookAt)
      vrm.lookAt.update(delta)
  })
}
