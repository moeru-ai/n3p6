import { Container, Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, colors, Switch } from '@react-three/uikit-default'
import { BellRing, Check } from '@react-three/uikit-lucide'

const notifications = [
  {
    description: '1 hour ago',
    title: 'Your call has been confirmed.',
  },
  {
    description: '1 hour ago',
    title: 'You have a new message!',
  },
  {
    description: '2 hours ago',
    title: 'Your subscription is expiring soon!',
  },
]

export default () => (
  <Card width={380}>
    <CardHeader>
      <CardTitle>
        <Text>Notifications</Text>
      </CardTitle>
      <CardDescription>
        <Text>You have 3 unread messages.</Text>
      </CardDescription>
    </CardHeader>
    <CardContent flexDirection="column" gap={16}>
      <Container alignItems="center" borderRadius={6} borderWidth={1} flexDirection="row" gap={16} padding={16}>
        <BellRing />
        <Container flexDirection="column" gap={4}>
          <Text fontSize={14} lineHeight="100%">
            Push Notifications
          </Text>
          <Text color={colors.mutedForeground} fontSize={14} lineHeight={20}>
            Send notifications to device.
          </Text>
        </Container>
        <Switch />
      </Container>
      <Container flexDirection="column">
        {notifications.map((notification, index) => (
          <Container
            alignItems="flex-start"
            flexDirection="row"
            gap={17}
            key={index}
            marginBottom={index === notifications.length - 1 ? 0 : 16}
            paddingBottom={index === notifications.length - 1 ? 0 : 16}
          >
            <Container backgroundColor={0x0EA5E9} borderRadius={1000} height={8} transformTranslateY={4} width={8} />
            <Container flexDirection="column" gap={4}>
              <Text fontSize={14} lineHeight="100%">
                {notification.title}
              </Text>
              <Text color={colors.mutedForeground} fontSize={14} lineHeight={20}>
                {notification.description}
              </Text>
            </Container>
          </Container>
        ))}
      </Container>
    </CardContent>
    <CardFooter>
      <Button flexDirection="row" width="100%">
        <Check height={16} marginRight={8} width={16} />
        <Text>Mark all as read</Text>
      </Button>
    </CardFooter>
  </Card>
)
