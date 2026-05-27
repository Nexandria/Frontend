import { useState } from 'react';
import { HomeScreen, MapScreen, QRScreen, DiscoverScreen } from './PhoneScreens';

type Screen = 'home' | 'discover' | 'map' | 'qr';

const SCREENS: Record<Screen, React.ReactNode> = {
  home: <HomeScreen />,
  discover: <DiscoverScreen />,
  map: <MapScreen />,
  qr: <QRScreen />,
};

const SCREEN_LABELS: [Screen, string][] = [
  ['home', 'Inicio'],
  ['discover', 'Descubrir'],
  ['map', 'Sedes'],
  ['qr', 'Identidad'],
];

const SPEC_CARDS_LEFT = [
  {
    title: '142,800+ libros',
    sub: 'Buscá en toda la red',
    style: { top: 30, left: 20 },
    delay: '0s',
    iconBg: 'var(--ink)',
    iconColor: 'var(--gold)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>,
  },
  {
    title: '15 / 30 / 60 días',
    sub: 'Períodos configurables',
    style: { top: 280, left: 0 },
    delay: '1.5s',
    iconBg: 'var(--bg)',
    iconColor: 'var(--ink)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M7 4v4M17 4v4"/></svg>,
  },
  {
    title: 'Hábito de lectura',
    sub: 'Puntos · Niveles · Rachas',
    style: { top: 520, left: 30 },
    delay: '3s',
    iconBg: 'var(--accent)',
    iconColor: '#FBF8F1',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M1 12h6M17 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3"/></svg>,
  },
];

const SPEC_CARDS_RIGHT = [
  {
    title: 'La sede más cerca',
    sub: 'Disponibilidad en tiempo real',
    style: { top: 30, right: 20 },
    delay: '0.8s',
    iconBg: 'var(--bg)',
    iconColor: 'var(--ink)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
  {
    title: 'Reservá, retirá, leé',
    sub: 'Todo desde tu teléfono',
    style: { top: 280, right: 0 },
    delay: '2.2s',
    iconBg: 'var(--ink)',
    iconColor: '#FBF8F1',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></svg>,
  },
  {
    title: 'Compartí lecturas',
    sub: 'Reseñas y foros entre lectores',
    style: { top: 520, right: 30 },
    delay: '4s',
    iconBg: 'var(--bg)',
    iconColor: 'var(--ink)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>,
  },
];

function SpecCard({ title, sub, style, delay, iconBg, iconColor, icon }: {
  title: string; sub: string; style: React.CSSProperties; delay: string;
  iconBg: string; iconColor: string; icon: React.ReactNode;
}) {
  return (
    <div
      className="absolute bg-[var(--card)] border border-[var(--line)] rounded-[18px] px-4 py-3.5 flex gap-3 items-center animate-floaty"
      style={{ ...style, width: 240, animationDelay: delay, boxShadow: '0 14px 40px -20px rgba(26,22,18,0.18), 0 1px 0 rgba(255,255,255,0.6) inset' }}
    >
      <div className="w-[38px] h-[38px] rounded-[12px] grid place-items-center flex-shrink-0" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <div>
        <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">{title}</div>
        <div className="text-[11.5px] text-[var(--muted)] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState<Screen>('home');

  return (
    <section className="relative pt-16 pb-0">
      <div className="max-w-[1320px] mx-auto px-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[11.5px] tracking-[0.14em] uppercase text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          Plataforma open-source · Red de bibliotecas
        </div>

        <h1 className="font-['Instrument_Serif'] font-normal text-center w-full mt-5 leading-[0.96] tracking-[-0.025em] text-[var(--ink)]"
          style={{ fontSize: 'clamp(64px, 7.6vw, 124px)' }}>
          Tu próximo libro,<br />
          <span className="text-[rgba(26,22,18,0.35)]">a una</span>{' '}
          <em className="not-italic italic text-[var(--accent)]">búsqueda.</em>
        </h1>

        <p className="max-w-[560px] text-center text-[var(--ink-2)] text-[16.5px] leading-[1.55] mt-5">
          Encontrá cualquier libro de la red, reservalo desde el celular y retiralo en la sede más cercana. Sin filas, sin papeles, sin esperas — solo vos y tu próxima lectura.
        </p>
      </div>

      <div className="max-w-[1320px] mx-auto px-10">
        <div className="relative h-[720px] mt-10">
          {/* Left floating cards */}
          {SPEC_CARDS_LEFT.map(c => <SpecCard key={c.title} {...c} />)}

          {/* Left pills */}
          <div className="absolute animate-floaty-2 bg-[var(--card)] border border-[var(--line)] rounded-full px-3.5 py-2 flex items-center gap-2 text-[12.5px] font-medium"
            style={{ top: 160, left: 60, boxShadow: '0 8px 24px -12px rgba(26,22,18,0.18)' }}>
            <span className="w-[18px] h-[18px] rounded-full bg-[var(--accent)]" />
            <span>Devolución en cualquier sede</span>
          </div>
          <div className="absolute animate-floaty bg-[var(--ink)] text-[var(--bg-2)] rounded-full px-3.5 py-2 text-[12.5px] font-medium"
            style={{ top: 420, left: 80 }}>
            ★ Racha de 28 días
          </div>

          {/* Right floating cards */}
          {SPEC_CARDS_RIGHT.map(c => <SpecCard key={c.title} {...c} />)}

          {/* Right pills */}
          <div className="absolute animate-floaty-2 bg-[var(--accent)] text-white rounded-full px-3.5 py-2 text-[12.5px] font-medium"
            style={{ top: 160, right: 80 }}>
            Identidad DNI · QR personal
          </div>
          <div className="absolute animate-floaty-3 bg-[var(--card)] border border-[var(--line)] rounded-full px-3.5 py-2 flex items-center gap-2 text-[12.5px] font-medium"
            style={{ top: 420, right: 60 }}>
            <span className="w-[18px] h-[18px] rounded-full bg-[var(--ok)]" />
            <span>Hasta 3 préstamos activos</span>
          </div>

          {/* Phone */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[340px] h-[700px]"
            style={{ boxShadow: '0 0 0 12px #1F1A14, 0 60px 100px -40px rgba(26,22,18,0.45), 0 30px 60px -30px rgba(139,58,47,0.25)', borderRadius: 52 }}>
            <div className="relative w-full h-full bg-[#0F0C09] rounded-[52px] p-3"
              style={{ boxShadow: '0 0 0 1.5px rgba(255,255,255,0.06) inset' }}>
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[110px] h-7 bg-[#0F0C09] rounded-full z-10" />
              <div className="w-full h-full rounded-[40px] bg-[var(--bg-2)] overflow-hidden relative" key={active}>
                {SCREENS[active]}
              </div>
            </div>
          </div>

          {/* Screen switcher */}
          <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 flex gap-1.5 bg-[var(--card)] border border-[var(--line)] rounded-full p-1.5">
            {SCREEN_LABELS.map(([key, label]) => (
              <button key={key} onClick={() => setActive(key)}
                className="border-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors"
                style={{
                  background: active === key ? 'var(--ink)' : 'transparent',
                  color: active === key ? 'var(--bg-2)' : 'var(--ink-2)',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
