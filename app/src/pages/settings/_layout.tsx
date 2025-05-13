import { Container, Fullscreen, Text } from '@react-three/uikit'
import { Button, Card, colors, Defaults, Separator } from '@react-three/uikit-default'
import { PanelLeftIcon } from '@react-three/uikit-lucide'
import { Outlet, useLocation, useNavigate } from 'react-router'

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
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const buttonVariant = (href: string) =>
    pathname === href ? 'secondary' : 'ghost'

  return (
    <Container gap={8} lg={{ flexDirection: 'column' }}>
      {sidebar.map(item => (
        <Button
          data-test-id="sidebar-link"
          justifyContent="flex-start"
          key={item.href}
          lg={{ minWidth: 192 }}
          // eslint-disable-next-line ts/no-misused-promises
          onClick={async () => navigate(item.href)}
          variant={buttonVariant(item.href)}
        >
          <Text>{item.title}</Text>
        </Button>
      ))}
    </Container>
  )
}

const SettingsLayout = () => (
  <Defaults>
    <Fullscreen
      backgroundColor={colors.muted}
      flexDirection="row"
      height="100%"
      overflow="scroll"
      padding={12}
      width="100%"
    >
      <Container flexDirection="column">
        <Button variant="ghost">
          <Text fontWeight={600}>N3P6 by Moeru AI</Text>
        </Button>
        <Container
          flexDirection="column"
          gap={32}
          lg={{ flexDirection: 'row' }}
        >
          <SettingsSidebar />
        </Container>
      </Container>
      <Card flexGrow={1} marginLeft="auto" maxWidth={1440}>
        <Container gap={8} maxHeight={60} padding={8}>
          <Button size="icon" variant="ghost">
            <PanelLeftIcon height={16} width={16} />
          </Button>
          <Text fontWeight={600}>Test</Text>
          <Container marginLeft="auto">
            <ToggleColorSchemeButton variant="ghost" />
          </Container>
        </Container>
        <Separator />
        <Container padding={16}>
          <Outlet />
        </Container>
      </Card>
    </Fullscreen>
  </Defaults>
)

export default SettingsLayout
