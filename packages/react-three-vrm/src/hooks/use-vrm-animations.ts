// import type { VRM } from '@pixiv/three-vrm'
// import type { VRMAnimation } from '@pixiv/three-vrm-animation'

// import { createVRMAnimationClip } from '@pixiv/three-vrm-animation'
// import { useAnimations } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'

// export const useVRMAnimations = (animations: VRMAnimation[], vrm: VRM) => {
//   const { mixer, ...results } = useAnimations(
//     animations.map(vrma => createVRMAnimationClip(vrma, vrm)),
//     vrm.scene,
//   )

//   useFrame((_, delta) => {
//     mixer.update(delta)
//     vrm.update(delta)
//   })

//   return { mixer, ...results }
// }
