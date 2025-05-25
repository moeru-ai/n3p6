import type { VRM } from '@pixiv/three-vrm'

import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export const useVRMAutoLookAtDefaultCamera = (vrm: VRM) => {
  const camera = useThree(({ camera }) => camera)

  useEffect(() => {
    if (vrm.lookAt)
      // eslint-disable-next-line react-compiler/react-compiler
      vrm.lookAt.target = camera

    return () => {
      if (vrm.lookAt)
        vrm.lookAt.target = null
    }
  }, [vrm, camera])
}
