import { Navigate, Outlet } from 'react-router-dom'
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
 * `roles` accepts multiple values — any matching role grants access.
 */
export function PrivateGuard({
  roles,
  redirectTo = '/login',
  unauthorizedTo = '/unauthorized',
}: Props) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null
  if (!user) return <Navigate to={redirectTo} replace />
  if (roles && !roles.includes(user.role)) return <Navigate to={unauthorizedTo} replace />
  return <Outlet />
}
