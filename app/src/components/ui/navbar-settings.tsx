import { Button, colors, Dialog, DialogContent, DialogTrigger } from '@react-three/uikit-default'
import { SettingsIcon } from '@react-three/uikit-lucide'

import { Settings } from '~/components/ui/settings'

export const NavbarSettings = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="icon"
          variant="secondary"
        >
          <SettingsIcon height={16} width={16} />
        </Button>
      </DialogTrigger>
      <DialogContent backgroundColor={colors.muted} maxWidth={1024 + 40} padding={0}>
        <Settings />
      </DialogContent>
    </Dialog>
  )
}
