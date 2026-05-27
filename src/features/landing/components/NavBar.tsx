import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--line)]"
      style={{ background: 'color-mix(in oklab, var(--bg) 82%, transparent)', backdropFilter: 'blur(14px) saturate(140%)' }}>
      <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-between h-[72px]">
        <a href="#" className="flex items-center gap-2.5 text-[18px] tracking-tight no-underline text-[var(--ink)]">
          <div className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] grid place-items-center font-['Instrument_Serif'] text-[20px]">N</div>
          <span>Nexandría</span>
        </a>

        <div className="flex gap-7 text-sm text-[var(--ink-2)]">
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Buscar Libros</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Sedes</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Descubrir</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Comunidad</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Descargar</Link>
        </div>

        <div className="flex gap-2.5">
          <button className="h-[38px] px-4 rounded-full border border-[var(--line-strong)] bg-transparent text-[var(--ink)] text-[13.5px] font-medium cursor-pointer hover:bg-[var(--ink)] hover:text-[var(--bg-2)] transition-colors">
            Iniciar sesión
          </button>
          <button className="h-[38px] px-4 rounded-full bg-[var(--ink)] text-[var(--bg-2)] text-[13.5px] font-medium cursor-pointer hover:bg-[var(--accent)] transition-colors">
            Descargar app
          </button>
        </div>
      </div>
    </nav>
  );
}
