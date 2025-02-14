import { Routes } from '@generouted/react-router/lazy'
import { Loader } from '@react-three/drei'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'

// eslint-disable-next-line @masknet/no-top-level
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
    <Loader />
  </StrictMode>,
)
