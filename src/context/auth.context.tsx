import { createContext, useContext, type ReactNode } from 'react'
import { authClient } from '@/lib/auth-client'

export type Role = 'USER' | 'ADMIN'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: Role
  emailVerified: boolean
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── DEV_OVERRIDE ─────────────────────────────────────────────────────────────
// Set VITE_DEV_ROLE=USER or VITE_DEV_ROLE=ADMIN to bypass real auth in dev.
const DEV_ROLE = import.meta.env.VITE_DEV_ROLE as Role | undefined

const DEV_USER: AuthUser | null =
  import.meta.env.DEV && DEV_ROLE
    ? { id: 'dev', email: 'dev@local', name: 'Dev', role: DEV_ROLE, emailVerified: true }
    : null

export function AuthProvider({ children }: { children: ReactNode }) {
  // Better Auth manages the session via HttpOnly cookies — no localStorage needed.
  // useSession() re-validates on mount and keeps state in sync with the server.
  const { data: session, isPending } = authClient.useSession()

  const isLoading = DEV_USER ? false : isPending

  const user: AuthUser | null = DEV_USER ?? (session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: ((session.user as { role?: string }).role as Role) ?? 'USER',
        emailVerified: session.user.emailVerified,
      }
    : null)

  async function logout() {
    await authClient.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
