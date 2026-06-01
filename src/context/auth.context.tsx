import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

export type Role = 'USER' | 'ADMIN'

export interface AuthUser {
  id: string
  email: string
  role: Role
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

// ─── DEV_OVERRIDE ─────────────────────────────────────────────────────────────
// Set VITE_DEV_ROLE=USER or VITE_DEV_ROLE=ADMIN to bypass real auth in dev.
const DEV_ROLE = import.meta.env.VITE_DEV_ROLE as Role | undefined

const DEV_USER: AuthUser | null =
  import.meta.env.DEV && DEV_ROLE
    ? { id: 'dev', email: 'dev@local', role: DEV_ROLE }
    : null

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (DEV_USER) {
      setUser(DEV_USER)
      setIsLoading(false)
      return
    }
    try {
      const stored = localStorage.getItem(USER_KEY)
      if (stored) setUser(JSON.parse(stored) as AuthUser)
    } catch {
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  function login(newUser: AuthUser, token: string) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
