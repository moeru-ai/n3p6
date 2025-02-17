/* eslint-disable @masknet/no-timer */
import type { VRM } from '@pixiv/three-vrm'

import { useEffect, useState } from 'react'

export const useVRMAutoBlink = (vrm: VRM, duration: number) => {
  // 0~100
  // 0: open eyes
  // 100: close eyes
  const [blink, setBlink] = useState(0)

  useEffect(() => {
    const blinkInterval = setInterval(async () => {
      for (const value of [25, 50, 75, 100, 75, 50, 25, 0]) {
        await new Promise(r => setTimeout(r, 1))
        setBlink(value)
      }
    }, duration)

    return () => clearInterval(blinkInterval)
  })

  useEffect(() => {
    if (!vrm.expressionManager)
      return

    vrm.expressionManager.setValue('blink', blink / 100)
  }, [vrm.expressionManager, blink])
}
