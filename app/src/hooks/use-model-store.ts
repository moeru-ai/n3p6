import type { StateStorage } from 'zustand/middleware'

import { del, get, set } from 'idb-keyval'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<null | string> =>
    await get(name) ?? null,
  removeItem: async (name: string): Promise<void> =>
    del(name),
  setItem: async (name: string, value: string): Promise<void> =>
    set(name, value),
}

interface ModelState {
  model: string
  resetModel: () => void
  setModel: (model: string) => void
}

const defaultModel = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

export const useModelStore = create<ModelState>()(
  persist(
    set => ({
      model: defaultModel,
      resetModel: () => set({ model: defaultModel }),
      setModel: (model: string) => set({ model }),
    }),
    {
      name: 'n3p6-use-model-store',
      storage: createJSONStorage(() => idbStorage),
    },
  ),
)
