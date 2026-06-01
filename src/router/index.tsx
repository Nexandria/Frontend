import { BrowserRouter } from 'react-router'
import { Suspense } from 'react'
import { AppRoutes } from './routes.config'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
