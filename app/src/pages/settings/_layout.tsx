import { Container, Fullscreen, Text } from '@react-three/uikit'
import { Button, Card, colors, Defaults, Separator } from '@react-three/uikit-default'
import { ChevronLeftIcon, PanelLeftIcon } from '@react-three/uikit-lucide'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { ToggleColorSchemeButton } from '~/components/ui/toggle-color-scheme-button'

const sidebar: {
  href: string
  title: string
}[] = [{
  href: '/settings',
  title: 'Providers',
  // }, {
  //   href: '/settings/memory',
  //   title: 'Memory',
}]

const SettingsSidebar = () => {
  // const { pathname } = useLocation()
  const navigate = useNavigate()

  // const buttonVariant = (href: string) =>
  //   pathname === href ? 'secondary' : 'ghost'

  return (
    <Container gap={8} lg={{ flexDirection: 'column' }}>
      {sidebar.map(item => (
        <Button
          data-test-id="sidebar-link"
          hover={{ backgroundColor: colors.card }}
          justifyContent="flex-start"
          key={item.href}
          // eslint-disable-next-line ts/no-misused-promises
          onClick={async () => navigate(item.href)}
          variant="secondary"
        >
          <Text>{item.title}</Text>
        </Button>
      ))}
    </Container>
  )
}

const SettingsLayout = () => {
  const [sidebarDisplay, setSidebarDisplay] = useState<'flex' | 'none'>('flex')
  const navigate = useNavigate()

  const panelMaxWidth = sidebarDisplay === 'flex' ? 768 : 1024

  return (
    <Defaults>
      <Fullscreen
        alignItems="center"
        backgroundColor={colors.muted}
        justifyContent="center"
      >
        <Container flexDirection="row" flexGrow={1} gap={12} height="100%" maxHeight={768} maxWidth={1024} padding={12} width="100%">
          <Container display={sidebarDisplay} flexDirection="column" flexGrow={1} gap={8} maxWidth={256} paddingY={8}>
            <Button
              data-test-id="return-to-home"
              gap={8}
              hover={{ backgroundColor: colors.card }}
              justifyContent="flex-start"
              // eslint-disable-next-line sonarjs/void-use
              onClick={() => void navigate('/')}
              variant="ghost"
            >
              <ChevronLeftIcon height={16} width={16} />
              <Text fontWeight={600}>N3P6 by Moeru AI</Text>
            </Button>
            <SettingsSidebar />
          </Container>
          <Card flexGrow={1} marginLeft="auto" maxWidth={panelMaxWidth}>
            <Container gap={8} maxHeight={60} padding={8}>
              <Button
                data-test-id="toggle-sidebar"
                onClick={() => setSidebarDisplay(display => display === 'none' ? 'flex' : 'none')}
                size="icon"
                variant="ghost"
              >
                <PanelLeftIcon height={16} width={16} />
              </Button>
              <Text fontWeight={600}>Providers</Text>
              <Container marginLeft="auto">
                <ToggleColorSchemeButton variant="ghost" />
              </Container>
            </Container>
            <Separator />
            <Container flexDirection="column" gap={8} maxHeight={708} overflow="scroll" padding={16} width="100%">
              <Outlet />
            </Container>
          </Card>
        </Container>
      </Fullscreen>
    </Defaults>
  )
}

export default SettingsLayout
