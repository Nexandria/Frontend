import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, twoFactorClient, usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  // VITE_AUTH_URL is the server origin (e.g. http://localhost:3000).
  // Better Auth appends /api/auth automatically — do NOT include it here.
  baseURL: import.meta.env.VITE_AUTH_URL ?? 'http://localhost:3000',
  plugins: [
    emailOTPClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = '/two-factor'
      },
    }),
    usernameClient(),
  ],
})
