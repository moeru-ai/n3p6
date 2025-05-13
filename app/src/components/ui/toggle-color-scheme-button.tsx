import type { ButtonProperties } from '@react-three/uikit-default'

import { Button } from '@react-three/uikit-default'
import { MoonIcon, SunIcon } from '@react-three/uikit-lucide'

import { useIsDarkValue, useToggleIsDark } from '~/hooks/use-is-dark'

const NavbarThemeIcon = ({ isDark }: { isDark: boolean }) => isDark
  ? <SunIcon height={16} width={16} />
  : <MoonIcon height={16} width={16} />

export const ToggleColorSchemeButton = (props?: ButtonProperties) => {
  const isDark = useIsDarkValue()
  const toggleIsDark = useToggleIsDark()

  return (
    <Button
      data-test-id="toggle-color-scheme"
      onClick={() => toggleIsDark()}
      size="icon"
      {...props}
    >
      <NavbarThemeIcon isDark={isDark} />
    </Button>
  )
}
