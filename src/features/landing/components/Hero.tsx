import { useState } from 'react';
import { HomeScreen, MapScreen, QRScreen, DiscoverScreen } from './PhoneScreens';
import { Iphone } from '../../../components/iphone';

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
    title: 'Variedad de libros',
    sub: '-',
    posClass: 'top-[30px] left-[20px]',
    delayClass: '[animation-delay:0s]',
    iconBgClass: 'bg-[var(--ink)]',
    iconColorClass: 'text-[var(--gold)]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>,
  },
  {
    title: 'Notificaciones',
    sub: '-',
    posClass: 'top-[280px] left-0',
    delayClass: '[animation-delay:1.5s]',
    iconBgClass: 'bg-[var(--bg)]',
    iconColorClass: 'text-[var(--ink)]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M7 4v4M17 4v4"/></svg>,
  },
  {
    title: 'Busqueda',
    sub: 'busqueda global',
    posClass: 'top-[520px] left-[30px]',
    delayClass: '[animation-delay:3s]',
    iconBgClass: 'bg-[var(--accent)]',
    iconColorClass: 'text-[#FBF8F1]',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M1 12h6M17 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3"/></svg>,
  },
];

const SPEC_CARDS_RIGHT = [
  {
    title: 'Categorias',
    sub: '-',
    posClass: 'top-[30px] right-[20px]',
    delayClass: '[animation-delay:0.8s]',
    iconBgClass: 'bg-[var(--bg)]',
    iconColorClass: 'text-[var(--ink)]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
  {
    title: 'QR personal',
    sub: 'data del qr',
    posClass: 'top-[280px] right-0',
    delayClass: '[animation-delay:2.2s]',
    iconBgClass: 'bg-[var(--ink)]',
    iconColorClass: 'text-[#FBF8F1]',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></svg>,
  },
  {
    title: 'Foro',
    sub: 'data del foro',
    posClass: 'top-[520px] right-[30px]',
    delayClass: '[animation-delay:4s]',
    iconBgClass: 'bg-[var(--bg)]',
    iconColorClass: 'text-[var(--ink)]',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>,
  },
];

function SpecCard({ title, sub, posClass, delayClass, iconBgClass, iconColorClass, icon }: {
  title: string; sub: string; posClass: string; delayClass: string;
  iconBgClass: string; iconColorClass: string; icon: React.ReactNode;
}) {
  return (
    <div
      className={`absolute bg-[var(--card)] border border-[var(--line)] rounded-[18px] px-4 py-3.5 flex gap-3 items-center animate-floaty w-[240px] shadow-[0_14px_40px_-20px_rgba(26,22,18,0.18),0_1px_0_rgba(255,255,255,0.06)_inset] ${posClass} ${delayClass}`}
    >
      <div className={`w-[38px] h-[38px] rounded-[12px] grid place-items-center flex-shrink-0 ${iconBgClass} ${iconColorClass}`}>
        {icon}
      </div>
      <div>
        <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">{title}</div>
        <div className="text-[11.5px] text-[var(--ink-2)] mt-0.5 opacity-60">{sub}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState<Screen>('home');

  return (
    <section className="relative pt-16 pb-0">
      <div className="max-w-[1320px] mx-auto px-10 flex flex-col items-center">
        <h1
          className="font-['Instrument_Serif'] font-normal text-center w-full leading-[0.96] tracking-[-0.025em] text-[var(--ink)] text-[clamp(64px,7.6vw,124px)]"
        >
          Tu próximo libro,<br />
          <span className="text-[rgba(26,22,18,0.35)] dark:text-[rgba(246,242,233,0.35)]">a una</span>{' '}
          <em className="not-italic italic text-[var(--accent)]">búsqueda.</em>
        </h1>

        <p className="max-w-[560px] text-center text-[var(--ink-2)] text-[16.5px] leading-[1.55] mt-5">
          Encontrá cualquier libro de la red, reservalo desde el celular y retiralo en tu sede preferida. Sin filas, sin papeles, sin esperas = solo vos y tu próxima lectura.
        </p>

        {/*
          Badge ubicado DEBAJO del título y subtítulo.
          Decisión: colocarlo encima del H1 interrumpía la jerarquía visual —
          el ojo leía metadata antes que el mensaje principal. Aquí actúa como
          cierre informativo de la sección de texto, como si firmara el claim,
          antes de que empiece la zona del teléfono.
        */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mt-6 rounded-full bg-[var(--card)] border border-[var(--line)] text-[11px] tracking-[0.14em] uppercase text-[var(--ink-2)] opacity-60 dark:opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          Red de bibliotecas de CABA
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-10">
        <div className="relative h-[720px] mt-10">
          {/* Left floating cards */}
          {SPEC_CARDS_LEFT.map(c => <SpecCard key={c.title} {...c} />)}

          {/* Left pills */}
          <div className="absolute animate-floaty-2 bg-[var(--card)] border border-[var(--line)] rounded-full px-3.5 py-2 flex items-center gap-2 text-[12.5px] font-medium text-[var(--ink)] top-[160px] left-[60px] shadow-[0_8px_24px_-12px_rgba(26,22,18,0.18)]">
            <span className="w-[18px] h-[18px] rounded-full bg-[var(--accent)]" />
            <span>-</span>
          </div>
          <div className="absolute animate-floaty bg-[var(--ink)] text-[var(--bg-2)] rounded-full px-3.5 py-2 text-[12.5px] font-medium top-[420px] left-[80px]">
            ★ Rachas
          </div>

          {/* Right floating cards */}
          {SPEC_CARDS_RIGHT.map(c => <SpecCard key={c.title} {...c} />)}

          {/* Right pills */}
          <div className="absolute animate-floaty-2 bg-[var(--accent)] text-white rounded-full px-3.5 py-2 text-[12.5px] font-medium top-[160px] right-[80px]">
            -
          </div>
          <div className="absolute animate-floaty-3 bg-[var(--card)] border border-[var(--line)] rounded-full px-3.5 py-2 flex items-center gap-2 text-[12.5px] font-medium text-[var(--ink)] top-[420px] right-[60px]">
            <span className="w-[18px] h-[18px] rounded-full bg-[var(--ok)]" />
            <span>Hasta 3 préstamos</span>
          </div>

          {/* Phone — el switcher vive dentro del área de pantalla como overlay */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[340px] rounded-[54px]">
            <Iphone>
              {/*
              <div className="relative w-full h-full bg-[var(--bg-2)]">
                <div key={active} className="w-full h-full">
                  {SCREENS[active]}
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex gap-1 bg-[var(--card)] border border-[var(--line)] rounded-full p-1 z-10">
                  {SCREEN_LABELS.map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setActive(key)}
                      className={`flex-1 border-0 py-1.5 rounded-full text-[10px] font-medium cursor-pointer transition-colors ${
                        active === key
                          ? 'bg-[var(--ink)] text-[var(--bg-2)]'
                          : 'bg-transparent text-[var(--ink-2)]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>*/}
            </Iphone>
          </div>
        </div>
      </div>
    </section>
  );
}
