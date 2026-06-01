import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { authClient } from '@/lib/auth-client'

interface LoginForm {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

function validate(form: LoginForm): FormErrors {
  const errors: FormErrors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email inválido'
  if (!form.password) errors.password = 'Ingresa tu contraseña'
  return errors
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  function handleField(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setIsLoading(true)
    const { error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
      callbackURL: `${window.location.origin}/home`,
    })
    setIsLoading(false)

    if (error) {
      setErrors({ general: error.message ?? 'Email o contraseña incorrectos' })
      return
    }
    navigate('/home')
  }

  function handleSocial(provider: 'google' | 'facebook') {
    authClient.signIn.social({ provider, callbackURL: `${window.location.origin}/home` })
  }

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

        {errors.general && (
          <p className="text-sm text-[var(--accent-2)] bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/20 rounded-lg px-3 py-2">
            {errors.general}
          </p>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono text-[var(--ink-2)]">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleField}
            placeholder="tu@email.com"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {errors.email && <p className="text-xs text-[var(--accent-2)]">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-[var(--ink-2)]">Contraseña</label>
            <Link
              to="/recovery"
              className="text-xs text-[var(--ink-2)] opacity-75 hover:opacity-100 underline underline-offset-2 transition-opacity"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleField}
            placeholder="Tu contraseña"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {errors.password && <p className="text-xs text-[var(--accent-2)]">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 w-full h-[42px] rounded-xl bg-[var(--ink)] text-[var(--bg-2)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-[var(--line-strong)]" />
          <span className="text-xs text-[var(--ink-2)] opacity-60">o continuar con</span>
          <div className="flex-1 h-px bg-[var(--line-strong)]" />
        </div>

        <SocialButtons
          onGoogle={() => handleSocial('google')}
          onFacebook={() => handleSocial('facebook')}
          isLoading={isLoading}
        />

        <p className="text-center text-xs text-[var(--ink-2)] opacity-75 mt-1">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="text-[var(--ink)] underline underline-offset-2">
            Crear cuenta
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
