import { Container, Fullscreen, Text } from '@react-three/uikit'
import { Button, colors, Defaults, Separator } from '@react-three/uikit-default'
import { Outlet, useLocation, useNavigate } from 'react-router'

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
  <Fullscreen backgroundColor={colors.background}>
    <Defaults>
      <Container
        flexDirection="column"
        height="100%"
        overflow="scroll"
        padding={32}
        width="100%"
      >
        <Text fontSize={24} fontWeight={600}>Settings</Text>
        <Text color={colors.mutedForeground}>Manage your account settings and set e-mail preferences.</Text>
        <Separator marginY={24} />
        <Container
          flexDirection="column"
          gap={32}
          lg={{ flexDirection: 'row' }}
        >
          <SettingsSidebar />
          <Container flexDirection="column">
            <Outlet />
          </Container>
        </Container>
      </Container>
    </Defaults>
  </Fullscreen>
)

export default SettingsLayout
