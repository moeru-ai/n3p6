export interface GLTF {
  nodes: {
    name: string
  }[]
}

export interface GLTFExtensions {
  extensions: {
    VRMC_vrm_animation: {
      humanoid: {
        humanBones: Record<string, { node: number }>
      }
      specVersion: '1.0'
    }
  }
  extensionsUsed: ['VRMC_vrm_animation']
}
