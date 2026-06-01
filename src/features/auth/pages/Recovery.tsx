import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { authClient } from '@/lib/auth-client'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Recovery() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (emailError) setEmailError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Ingresa un email válido')
      return
    }

    setStatus('loading')
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setStatus('error')
      setErrorMessage(error.message ?? 'No se pudo enviar el correo')
      return
    }
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <AuthLayout title="Revisa tu email">
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="w-11 h-11 rounded-full bg-[var(--ok)]/15 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10l4 4 8-8" stroke="var(--ok)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm text-[var(--ink-2)]">
            Enviamos un enlace de recuperación a{' '}
            <span className="font-mono text-[var(--ink)]">{email}</span>
          </p>
          <p className="text-xs text-[var(--ink-2)] opacity-60">
            Revisa también tu carpeta de spam.
          </p>
          <Link
            to="/login"
            className="mt-2 text-sm text-[var(--ink)] underline underline-offset-2"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </AuthLayout>
    )
  }

  if (status === 'error') {
    return (
      <AuthLayout title="Recuperar contraseña">
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="w-11 h-11 rounded-full bg-[var(--accent-2)]/15 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 6v4m0 4h.01" stroke="var(--accent-2)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="8" stroke="var(--accent-2)" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-sm text-[var(--accent-2)]">{errorMessage}</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm text-[var(--ink)] underline underline-offset-2 cursor-pointer"
          >
            Intentar de nuevo
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Te enviaremos un enlace para restablecer tu contraseña."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono text-[var(--ink-2)]">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {emailError && <p className="text-xs text-[var(--accent-2)]">{emailError}</p>}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-1 w-full h-[42px] rounded-xl bg-[var(--ink)] text-[var(--bg-2)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'loading' ? 'Enviando…' : 'Enviar enlace'}
        </button>

        <p className="text-center text-xs text-[var(--ink-2)] opacity-75">
          <Link to="/login" className="text-[var(--ink)] underline underline-offset-2">
            Volver al inicio de sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
