/* eslint-disable @masknet/no-top-level */
import type { ThreeElement } from '@react-three/fiber'
import type { ColorRepresentation, Group } from 'three'

import { useImperativeHandle, useRef } from 'react'
import { PlaneGeometry } from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const plane1 = new PlaneGeometry()
plane1.translate(0, 0, 0.5)
const plane2 = new PlaneGeometry()
plane2.rotateY(Math.PI)
plane2.translate(0, 0, -0.5)
const twoPlanes = mergeGeometries([plane1, plane2])

// https://github.com/pmndrs/viverse/blob/ddb946a8b621e0d85637fa1bbdae5dfa764fd717/packages/react/src/material.tsx
export const TransparentPrototypeBox = ({ ref, ...props }: ThreeElement<typeof Group> & { color?: ColorRepresentation } & { ref?: React.RefObject<Group | null> }) => {
  const internalRef = useRef<Group>(null)

  useImperativeHandle(ref, () => internalRef.current!, [])

  return (
    <group {...props} ref={internalRef}>
      <mesh castShadow geometry={twoPlanes} receiveShadow rotation-x={Math.PI / 2} visible={false} />
      <mesh castShadow geometry={twoPlanes} receiveShadow rotation-y={Math.PI / 2} visible={false} />
      <mesh castShadow geometry={twoPlanes} receiveShadow visible={false} />
    </group>
  )
}
