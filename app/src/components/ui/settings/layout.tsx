import type { PropsWithChildren, ReactNode } from 'react'

import { Container, Text } from '@react-three/uikit'
import { Button, Card, colors, Separator } from '@react-three/uikit-default'
import { ExternalLinkIcon, GithubIcon, PanelLeftIcon } from '@react-three/uikit-lucide'
import { useXR } from '@react-three/xr'
import { useState } from 'react'

import { ToggleColorSchemeButton } from '~/components/ui/toggle-color-scheme-button'

export interface SettingsLayoutProps {
  sidebar: ReactNode
  title?: string
}

export const SettingsLayout = ({ children, sidebar, title }: PropsWithChildren<SettingsLayoutProps>) => {
  const [sidebarDisplay, setSidebarDisplay] = useState<'flex' | 'none'>('flex')

  const { mode } = useXR()

  const panelMaxWidth = sidebarDisplay === 'flex' ? 768 : 1024

  return (
    <Container flexDirection="row" flexGrow={1} gap={12} height="100%" maxHeight={768} maxWidth={1024} padding={12} width="100%">
      <Container display={sidebarDisplay} flexDirection="column" flexGrow={1} gap={4} maxWidth={256} paddingY={8}>
        <Button
          gap={8}
          hover={{ backgroundColor: colors.card }}
          justifyContent="flex-start"
          variant="ghost"
        >
          <Text fontWeight={600}>moeChat by Moeru AI</Text>
        </Button>
        <Button disabled justifyContent="flex-start" marginBottom={-8} variant="ghost">
          <Text fontSize={12} fontWeight={600}>Settings</Text>
        </Button>
        {sidebar}
        <Container flexGrow={1} />
        <Button disabled justifyContent="flex-start" marginBottom={-8} variant="ghost">
          <Text fontSize={12} fontWeight={600}>Extra</Text>
        </Button>
        {/* eslint-disable-next-line @masknet/jsx-no-logical */}
        {import.meta.env.PROD && mode === 'inline' && (
          <Button
            data-test-id="oculus-open-url"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => window.open(`https://www.oculus.com/open_url/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener')}
            variant="ghost"
          >
            <ExternalLinkIcon height={16} width={16} />
            <Text>Open in Meta Quest</Text>
          </Button>
        )}
        <Button
          data-test-id="github"
          gap={8}
          hover={{ backgroundColor: colors.card }}
          justifyContent="flex-start"
          onClick={() => window.open('https://github.com/moeru-ai/chat', '_blank', 'noopener')}
          variant="ghost"
        >
          <GithubIcon height={16} width={16} />
          <Text>GitHub</Text>
        </Button>
      </Container>
      <Card flexGrow={1} marginLeft="auto" maxWidth={panelMaxWidth} width="100%">
        <Container gap={8} height={60} padding={8}>
          <Button
            data-test-id="toggle-sidebar"
            onClick={() => setSidebarDisplay(display => display === 'none' ? 'flex' : 'none')}
            size="icon"
            variant="ghost"
          >
            <PanelLeftIcon height={16} width={16} />
          </Button>
          <Text fontWeight={600}>{title}</Text>
          <Container marginLeft="auto">
            <ToggleColorSchemeButton variant="ghost" />
          </Container>
        </Container>
        <Separator />
        {children}
      </Card>
    </Container>
  )
}
