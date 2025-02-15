import { VRMLoaderPlugin } from '@pixiv/three-vrm'
// import { VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation'
import { useGLTF } from '@react-three/drei'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'

import vrmURL from '../../../assets/models/Hikari_SummerDress.vrm?url'

// eslint-disable-next-line @masknet/no-top-level
useGLTF.preload(vrmURL)

export const Hikari = () => {
  const gltf = useGLTF(vrmURL, false, false, (loader) => {
    // eslint-disable-next-line ts/no-unsafe-argument, ts/no-unsafe-return
    loader = loader.register(parser => new VRMLoaderPlugin(parser as any) as any)
    // loader = loader.register(parser => new VRMAnimationLoaderPlugin(parser as any) as any)

    return loader
  })

  return (
    <RigidBody colliders={false}>
      <CapsuleCollider args={[2.5, 1]} position={[0, -1.5, 0]} />
      <primitive
        object={gltf.scene}
        position={[0, -5, 0]}
        rotation={[0, Math.PI, 0]}
        scale={5}
      />
    </RigidBody>
  )
}
