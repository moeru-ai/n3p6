/* eslint-disable @masknet/no-timer */
import type { VRM } from '@pixiv/three-vrm'
import { useEffect } from 'react'

import { Object3D, Object3DEventMap } from 'three'

/** broken, WIP */
export const useVRMAutoLookAt = (vrm: VRM, target: Object3D<Object3DEventMap>) => {
  useEffect(() => {
    if (vrm.lookAt)
      vrm.lookAt.target = target
  }, [vrm.lookAt, target])
}

