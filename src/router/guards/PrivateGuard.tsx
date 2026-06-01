import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth, type Role } from '@/context/auth.context'

interface Props {
  /** If undefined, any authenticated user can access. */
  roles?: Role[]
  /** Where to redirect when unauthenticated. */
  redirectTo?: string
  /** Where to redirect when authenticated but role is insufficient. */
  unauthorizedTo?: string
}

/**
 * Blocks access when the user is NOT authenticated, or lacks the required role.
 * When redirecting to login, preserves the attempted location in `state.from`
 * so the login page can navigate back after a successful sign-in.
 */
export function PrivateGuard({
  roles,
  redirectTo = '/login',
  unauthorizedTo = '/unauthorized',
}: Props) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null
  if (!user) return <Navigate to={redirectTo} state={{ from: location }} replace />
  if (roles && !roles.includes(user.role)) return <Navigate to={unauthorizedTo} replace />
  return <Outlet />
}
