import { lazy, type ComponentType } from 'react'
import type { Role } from '@/context/auth.context'

// ─── Access types ────────────────────────────────────────────────────────────

export type RouteAccess =
  /** Visible to everyone, with or without session. */
  | { type: 'public' }
  /** Only accessible when NOT logged in (e.g. /login, /register). */
  | { type: 'guest-only'; redirectTo?: string }
  /** Requires authentication. Optionally restricted to specific roles.
   *  Pass multiple roles to share the route across them (e.g. ['ADMIN', 'USER']). */
  | { type: 'private'; roles?: Role[]; unauthorizedTo?: string }

export interface AppRoute {
  path: string
  element: ComponentType
  access: RouteAccess
}

// ─── Configuración de Rutas ───────────────────────────────────────────────────────

export const routes: AppRoute[] = [
  // ── Publicas ──────────────────────────────────────────────────────────────────
  {
    path: '/',
    element: lazy(() => import('@/pages/landing/Landing')),
    access: { type: 'public' },
  },

  // ── Solo para invitados (sin sesión) (redirige a '/' si ya ha iniciado sesión) ─────────────────────
  {
    path: '/login',
    element: lazy(() => import('@/pages/auth/Login')),
    access: { type: 'guest-only', redirectTo: '/' },
  },
  {
    path: '/signup',
    element: lazy(() => import('@/pages/auth/Signup')),
    access: { type: 'guest-only', redirectTo: '/' },
  },
  {
    path: '/recovery-password',
    element: lazy(() => import('@/pages/auth/Recovery')),
    access: { type: 'guest-only', redirectTo: '/' },
  },

  // ── Privadas: cualquier usuario autenticado ─────────────────────────────────────────
  // {
  //   path: '/home',
  //   element: lazy(() => import('@/features/home/pages/Home')),
  //   access: { type: 'private' },
  // },

  // ── Privadas: compartidas entre ROLES, entonces para ello lista ───────────────────────────────────
  // {
  //   path: '/dashboard',
  //   element: lazy(() => import('@/features/dashboard/pages/Dashboard')),
  //   access: { type: 'private', roles: ['ADMIN', 'USER'] },
  // },

  // ── Privadas: solo ADMIN ───────────────────────────────────────────────────────
  // {
  //   path: '/admin',
  //   element: lazy(() => import('@/features/admin/pages/Admin')),
  //   access: { type: 'private', roles: ['ADMIN'] },
  // },
]
