import { Link } from 'react-router';
import nexandriaLogo from '../../../assets/nexandria-logo.svg';

export function NavBar() {

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--line)]"
      style={{ background: 'color-mix(in oklab, var(--bg) 82%, transparent)', backdropFilter: 'blur(14px) saturate(140%)' }}>
      <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-between h-[72px]">
        <a href="#" className="flex items-center no-underline">
          <img
            src={nexandriaLogo}
            alt="Nexandría"
            className="h-9 w-auto dark:invert"
          />
        </a>

        <div className="flex gap-7 text-sm text-[var(--ink-2)]">
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Buscar Libros</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Sedes</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Descubrir</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Comunidad</Link>
          <Link to='/' className="opacity-75 hover:opacity-100 transition-opacity no-underline text-[var(--ink-2)]">Descargar</Link>
        </div>

        <div className="flex gap-2.5">
          <Link to='/login' className="h-[38px] px-5 rounded-full border border-[var(--line-strong)] bg-transparent text-[var(--ink)] text-[13.5px] font-medium cursor-pointer transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--bg-2)] hover:shadow-md hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center">
            Iniciar sesión
          </Link>
          <Link to='/' className="h-[38px] px-5 rounded-full bg-[var(--ink)] text-[var(--bg-2)] text-[13.5px] font-medium cursor-pointer shadow-sm transition-all duration-200 hover:bg-[var(--accent)] hover:shadow-lg hover:scale-[1.04] active:scale-[0.97] flex items-center justify-center">
            Descargar app
          </Link>
        </div>
      </div>
    </nav>
  );
}
