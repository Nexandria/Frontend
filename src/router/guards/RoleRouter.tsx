import { Navigate } from 'react-router'
import { useAuth, type Role } from '@/context/auth.context'
import type { ReactElement } from 'react'

interface Props {
  /** Map of role → JSX element (lazy page). Only the matching role is rendered. */
  pages: Partial<Record<Role, ReactElement>>
  /** Where to redirect when the user's role has no matching page. */
  unauthorizedTo?: string
}

/**
 * Renders the page that corresponds to the authenticated user's role.
 * Each role can receive a different lazy-loaded page on the same route path.
 *
 * Must always be used inside a <PrivateGuard> — authentication is assumed.
 */
export function RoleRouter({ pages, unauthorizedTo = '/unauthorized' }: Props) {
  const { user } = useAuth()

  // user is guaranteed by PrivateGuard; this handles accidental direct use
  if (!user) return <Navigate to="/login" replace />

  return pages[user.role] ?? <Navigate to={unauthorizedTo} replace />
}
