import type { ReactNode } from 'react'

import Logo from '@/assets/logo.svg?react'

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
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <Logo className="text-8xl text-[var(--ink)]" />
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
