import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { GuestGuard } from './guards/GuestGuard'
import { PrivateGuard } from './guards/PrivateGuard'
import { routes, type AppRoute, type RouteAccess } from './routes.config'
import type { Role } from '@/context/auth.context'

// ─── Internal grouping ────────────────────────────────────────────────────────
// Routes are defined flat (one entry per path) but grouped here by their
// access signature so we create the minimum number of guard wrappers.

type GroupKey = string

function accessKey(access: RouteAccess): GroupKey {
  if (access.type === 'public') return 'public'
  if (access.type === 'guest-only') return `guest:${access.redirectTo ?? '/'}`
  const roles = access.roles ? [...access.roles].sort().join(',') : '*'
  return `private:${roles}:${access.unauthorizedTo ?? '/unauthorized'}`
}

interface GuardedGroup {
  access: RouteAccess
  routes: AppRoute[]
}

function groupRoutes(appRoutes: AppRoute[]): GuardedGroup[] {
  const map = new Map<GroupKey, GuardedGroup>()
  for (const route of appRoutes) {
    const key = accessKey(route.access)
    if (!map.has(key)) map.set(key, { access: route.access, routes: [] })
    map.get(key)!.routes.push(route)
  }
  return Array.from(map.values())
}

function buildRouteObjects(groups: GuardedGroup[]) {
  return groups.flatMap(({ access, routes: groupRoutes }) => {
    const children = groupRoutes.map(r => ({
      path: r.path,
      element: <r.element />,
    }))

    if (access.type === 'public') return children

    if (access.type === 'guest-only')
      return [{ element: <GuestGuard redirectTo={access.redirectTo} />, children }]

    // private
    return [
      {
        element: (
          <PrivateGuard
            roles={access.roles as Role[] | undefined}
            unauthorizedTo={access.unauthorizedTo}
          />
        ),
        children,
      },
    ]
  })
}

// ─── Router ───────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    ),
    children: buildRouteObjects(groupRoutes(routes)),
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
