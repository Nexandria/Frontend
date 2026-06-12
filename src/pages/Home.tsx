import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/auth.context'

export default function Home() {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await logout()
      navigate('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg)] text-[var(--ink)]">
      <div className="max-w-lg w-full rounded-3xl border border-[var(--line-strong)] bg-[var(--bg-2)]/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-semibold mb-3">Bienvenido{user ? `, ${user.name}` : ''}</h1>
        <p className="text-sm text-[var(--ink-2)] mb-6">
          Esta es tu página de inicio privada. Desde aquí puedes cerrar sesión para volver a la pantalla de login.
        </p>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full h-[44px] rounded-xl bg-[var(--ink)] text-[var(--bg)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
        </button>
      </div>
    </main>
  )
}
