/* eslint-disable @masknet/jsx-no-logical */

import { Text } from '@react-three/uikit'
import { Button, colors } from '@react-three/uikit-default'
import { BellRingIcon, CableIcon } from '@react-three/uikit-lucide'
import { useMemo, useState } from 'react'

import { SettingsLayout } from './layout'
import { SettingsNotifications } from './pages/notifications'
import { SettingsProviders } from './pages/providers'

export const Settings = () => {
  const [currentPage, setCurrentPage] = useState('providers')
  const title = useMemo(() => currentPage.charAt(0).toUpperCase() + currentPage.slice(1), [currentPage])

  return (
    <SettingsLayout
      sidebar={(
        <>
          <Button
            backgroundColor={currentPage === 'providers' ? colors.card : undefined}
            data-test-id="sidebar-providers"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('providers')}
            variant="secondary"
          >
            <CableIcon height={16} width={16} />
            <Text>Providers</Text>
          </Button>
          <Button
            backgroundColor={currentPage === 'notifications' ? colors.card : undefined}
            data-test-id="sidebar-notifications"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('notifications')}
            variant="secondary"
          >
            <BellRingIcon height={16} width={16} />
            <Text>Notifications</Text>
          </Button>
        </>
      )}
      title={title}
    >
      <SettingsProviders display={currentPage === 'providers' ? 'flex' : 'none'} />
      <SettingsNotifications display={currentPage === 'notifications' ? 'flex' : 'none'} />
    </SettingsLayout>
  )
}
