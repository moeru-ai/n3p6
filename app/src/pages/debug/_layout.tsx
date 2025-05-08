import { Outlet } from 'react-router'

import { Stage } from '~/components/stage'

const Layout = () => (
  <Stage>
    <Outlet />
  </Stage>
)

export default Layout
