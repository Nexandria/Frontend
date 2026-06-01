interface SocialButtonsProps {
  onGoogle: () => void
  onFacebook: () => void
  isLoading?: boolean
}

export function SocialButtons({ onGoogle, onFacebook, isLoading }: SocialButtonsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={onGoogle}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 w-full h-[42px] rounded-xl border border-[var(--line-strong)] bg-transparent text-[var(--ink)] text-sm font-medium hover:bg-[var(--line)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
        </svg>
        Continuar con Google
      </button>

      <button
        type="button"
        onClick={onFacebook}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 w-full h-[42px] rounded-xl border border-[var(--line-strong)] bg-transparent text-[var(--ink)] text-sm font-medium hover:bg-[var(--line)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M18 9a9 9 0 1 0-10.406 8.892V11.61H5.309V9h2.285V7.017c0-2.255 1.343-3.502 3.4-3.502.985 0 2.015.176 2.015.176v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.61h-2.097v6.282A9.003 9.003 0 0 0 18 9Z" fill="#1877F2"/>
          <path d="M12.504 11.61 12.903 9h-2.496V7.312c0-.712.349-1.406 1.467-1.406h1.135V3.691S11.979 3.515 10.994 3.515c-2.057 0-3.4 1.247-3.4 3.502V9H5.309v2.61h2.285v6.282a9.066 9.066 0 0 0 2.812 0V11.61h2.098Z" fill="white"/>
        </svg>
        Continuar con Facebook
      </button>
    </div>
  )
}
