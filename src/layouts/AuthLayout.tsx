import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] grid place-items-center font-['Instrument_Serif'] text-[20px]">
            N
          </div>
          <span className="text-[18px] tracking-tight text-[var(--ink)]">Nexandría</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-mono text-2xl font-semibold text-[var(--ink)] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-sm text-[var(--ink-2)] opacity-75">{subtitle}</p>
          )}
        </div>

        {/* Card */}
        <div className="bg-[var(--bg-2)] border border-[var(--line-strong)] rounded-2xl p-7">
          {children}
        </div>
      </div>
    </div>
  )
}
