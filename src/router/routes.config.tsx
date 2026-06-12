import { lazy } from 'react'
import { Routes, Route } from 'react-router'
import { GuestGuard } from './guards/GuestGuard'
import { PrivateGuard } from './guards/PrivateGuard'
import { RoleRouter } from './guards/RoleRouter'

// ─── Lazy pages ───────────────────────────────────────────────────────────────

// Públicas
const Landing  = lazy(() => import('@/pages/landing/Landing'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Solo invitados
const Login    = lazy(() => import('@/pages/auth/Login'))
const Signup   = lazy(() => import('@/pages/auth/Signup'))
const Recovery = lazy(() => import('@/pages/auth/Recovery'))

// Configuración (por rol)
const UserSettings  = lazy(() => import('@/pages/settings/UserSettings'))
const AdminSettings = lazy(() => import('@/pages/settings/AdminSettings'))
const Home = lazy(() => import('@/pages/Home'))

// ─── Route tree ───────────────────────────────────────────────────────────────

export function AppRoutes() {
  return (
    <Routes>

      {/* ── Públicas ──────────────────────────────────────────────────────── */}
      <Route path="/" element={<Landing />} />

      {/* ── Solo invitados (redirige a /home si ya tiene sesión) ───────────── */}
      <Route element={<GuestGuard redirectTo="/home" />}>
        <Route path="/login"    element={<Login />} />
        <Route path="/signup"   element={<Signup />} />
        <Route path="/recovery" element={<Recovery />} />
      </Route>

      {/* ── Privadas: cualquier usuario autenticado ────────────────────────── */}
      <Route element={<PrivateGuard />}>
        <Route path="/home" element={<Home />} />

        {/* Configuración: página diferente según rol */}
        <Route
          path="/settings"
          element={
            <RoleRouter
              pages={{
                USER:  <UserSettings />,
                ADMIN: <AdminSettings />,
              }}
            />
          }
        />
      </Route>

      {/* ── Privadas: solo ADMIN ───────────────────────────────────────────── */}
      {/* <Route element={<PrivateGuard roles={['ADMIN']} />}>
        <Route path="/admin" element={<Admin />} />
      </Route> */}

      {/* ── Privadas: compartidas entre roles ─────────────────────────────── */}
      {/* <Route element={<PrivateGuard roles={['ADMIN', 'USER']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route> */}

      {/* ── 404 ───────────────────────────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}
