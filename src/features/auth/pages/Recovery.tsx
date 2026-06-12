import { useState, useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthLayout } from '@/layouts/AuthLayout'
import { authClient } from '@/lib/auth-client'

type Step = 'email' | 'otp'

const OTP_LENGTH = 6

export default function Recovery() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // OTP step state
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpError, setOtpError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  // ── Step 1: send OTP ─────────────────────────────────────────────────────────

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (emailError) setEmailError('')
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Ingresa un email válido')
      return
    }

    setIsLoading(true)
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'forget-password',
    })
    setIsLoading(false)

    if (error) {
      setEmailError(error.message ?? 'No se pudo enviar el código')
      return
    }
    setStep('otp')
  }

  // ── Step 2: verify OTP + set new password ────────────────────────────────────

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

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) { setOtpError('Ingresa los 6 dígitos'); return }
    if (newPassword.length < 8) { setPasswordError('Mínimo 8 caracteres'); return }
    if (newPassword !== confirmPassword) { setPasswordError('Las contraseñas no coinciden'); return }

    setIsLoading(true)
    const { error } = await authClient.emailOtp.resetPassword({
      email,
      otp: code,
      password: newPassword,
    })
    setIsLoading(false)

    if (error) {
      setOtpError(error.message ?? 'Código incorrecto o expirado')
      return
    }
    navigate('/login')
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  if (step === 'otp') {
    return (
      <AuthLayout
        title="Restablecer contraseña"
        subtitle={`Ingresá el código de 6 dígitos que enviamos a ${email}`}
      >
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4" noValidate>

          {/* OTP inputs */}
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

          {/* New password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono text-[var(--ink-2)]">Nueva contraseña</label>
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={e => { setNewPassword(e.target.value); setPasswordError('') }}
              placeholder="Mínimo 8 caracteres"
              className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
            />
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono text-[var(--ink-2)]">Confirmá la contraseña</label>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setPasswordError('') }}
              placeholder="Repetí tu contraseña"
              className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
            />
            {passwordError && <p className="text-xs text-[var(--accent-2)]">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full h-[42px] rounded-xl bg-[var(--ink)] text-[var(--bg-2)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Restableciendo…' : 'Restablecer contraseña'}
          </button>

          <button
            type="button"
            onClick={() => setStep('email')}
            className="text-center text-xs text-[var(--ink-2)] opacity-75 underline underline-offset-2 cursor-pointer"
          >
            Reenviar código
          </button>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Te enviaremos un código de 6 dígitos para restablecer tu contraseña."
    >
      <form onSubmit={handleSendOtp} className="flex flex-col gap-4" noValidate>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono text-[var(--ink-2)]">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="tu@email.com"
            className="h-[42px] px-3 rounded-xl border bg-transparent text-[var(--ink)] text-sm placeholder:text-[var(--ink-2)]/40 focus:outline-none transition-colors border-[var(--line-strong)] focus:border-[var(--ink)]"
          />
          {emailError && <p className="text-xs text-[var(--accent-2)]">{emailError}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 w-full h-[42px] rounded-xl bg-[var(--ink)] text-[var(--bg-2)] text-sm font-medium hover:bg-[var(--accent-2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? 'Enviando…' : 'Enviar código'}
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
