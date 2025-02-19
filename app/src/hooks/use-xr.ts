import { useXR } from '@react-three/xr'

/**
 *
 * @returns boolean
 * @see {@link https://developers.meta.com/horizon/documentation/web/webxr-keyboard#checking-for-system-keyboard-support}
 * @example
 * ```ts
 * import { useXRSessionSystemKeyboardSupported } from '@n3p6/app'
 *
 * const isSystemKeyboardSupported: boolean = useXRSessionSystemKeyboardSupported()
 * ```
 */
export const useXRSessionSystemKeyboardSupported = () => useXR(({ session }) => session?.isSystemKeyboardSupported ?? false)
