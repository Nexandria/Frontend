import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/context/auth.context'

interface Props {
  redirectTo?: string
}

/**
 * Blocks access when the user IS authenticated.
 * Use for pages like /login, /register.
 */
export function GuestGuard({ redirectTo = '/' }: Props) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null
  if (user) return <Navigate to={redirectTo} replace />
  return <Outlet />
}
