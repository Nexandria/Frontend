import { useState, useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthLayout } from '@/layouts/AuthLayout'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { authClient } from '@/lib/auth-client'

interface SignupForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

type Step = 'form' | 'otp'

const OTP_LENGTH = 6

function validate(form: SignupForm): FormErrors {
  const errors: FormErrors = {}
  if (form.username.trim().length < 3) errors.username = 'Mínimo 3 caracteres'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email inválido'
  if (form.password.length < 8) errors.password = 'Mínimo 8 caracteres'
  if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden'
  return errors
}

export default function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState<SignupForm>({ username: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [otpError, setOtpError] = useState('')

  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

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
    const { error } = await authClient.signUp.email({
      email: form.email,
      password: form.password,
      name: form.username,
      username: form.username,
      callbackURL: `${window.location.origin}/home`,
    })
    setIsLoading(false)

    if (error) {
      setErrors({ general: error.message ?? 'Error al crear la cuenta' })
      return
    }
    setStep('otp')
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setOtpError('')
    if (digit && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus()
  }

  function handleOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = [...otp]
    pasted.split('').forEach((ch, i) => { next[i] = ch })
    setOtp(next)
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) { setOtpError('Ingresa los 6 dígitos'); return }

    setIsLoading(true)
    const { error } = await authClient.emailOtp.verifyEmail({ email: form.email, otp: code })
    setIsLoading(false)

    if (error) { setOtpError(error.message ?? 'Código incorrecto'); return }
    navigate('/home')
  }

  function handleSocial(provider: 'google' | 'facebook') {
    authClient.signIn.social({ provider, callbackURL: `${window.location.origin}/home` })
  }

  if (step === 'otp') {
    return (
      <AuthLayout title="Verificar email" subtitle={`Ingresa el código que enviamos a ${form.email}`}>
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { otpRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => handleOtpKeyDown(i, e)}
                onPaste={handleOtpPaste}
                className="w-11 h-13 text-center text-xl font-mono border rounded-xl bg-transparent text-[var(--ink)] border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
            ))}
          </div>

          {otpError && <p className="text-[var(--accent-2)] text-sm text-center">{otpError}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[42px] rounded-xl bg-[var(--ink)] text-[var(--bg-2)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Verificando…' : 'Verificar código'}
          </button>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

        {errors.general && (
          <p className="text-sm text-[var(--accent-2)] bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/20 rounded-lg px-3 py-2">
            {errors.general}
          </p>
        )}

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono text-[var(--ink-2)]">Usuario</label>
          <input
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleField}
            placeholder="tunombre"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {errors.username && <p className="text-xs text-[var(--accent-2)]">{errors.username}</p>}
        </div>

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
          <label className="text-xs font-mono text-[var(--ink-2)]">Contraseña</label>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleField}
            placeholder="Mínimo 8 caracteres"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {errors.password && <p className="text-xs text-[var(--accent-2)]">{errors.password}</p>}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono text-[var(--ink-2)]">Confirmar contraseña</label>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleField}
            placeholder="Repite tu contraseña"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {errors.confirmPassword && <p className="text-xs text-[var(--accent-2)]">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 w-full h-[42px] rounded-xl bg-[var(--ink)] text-[var(--bg-2)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? 'Creando cuenta…' : 'Crear cuenta'}
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
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-[var(--ink)] underline underline-offset-2">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
