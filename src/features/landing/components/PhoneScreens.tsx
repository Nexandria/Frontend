function StatusBar() {
  return (
    <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[12px] font-semibold text-[var(--ink)]">
      <span>9:41</span>
      <div className="flex gap-1 items-center opacity-85">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <path d="M1 8h2v3H1zm4-2h2v5H5zm4-3h2v8H9zm4-3h2v11h-2z"/>
        </svg>
        <svg viewBox="0 0 24 12" fill="none" width="20" height="12">
          <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" strokeOpacity="0.5"/>
          <rect x="2" y="2" width="14" height="8" rx="1.5" fill="currentColor"/>
          <rect x="21" y="4" width="2" height="4" rx="1" fill="currentColor" fillOpacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <>
      <StatusBar />
      <div className="flex flex-col px-4 pt-4 pb-14 h-[calc(100%-36px)]">
        <div className="font-['Instrument_Serif'] text-[24px] leading-[1.05] tracking-[-0.02em]">
          <span className="block font-['Geist'] text-[11px] text-[var(--muted)] tracking-[0.02em] uppercase mb-0.5">Hola,</span>
          Martín
        </div>

        <div className="mt-3.5 h-10 rounded-[14px] bg-[var(--card)] border border-[var(--line)] flex items-center gap-2 px-3 text-[var(--muted)] text-[13px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>
          </svg>
          <span>Buscar título, autor o ISBN…</span>
        </div>

        <div className="mt-3.5 rounded-[20px] p-3.5 bg-[var(--ink)] text-[var(--bg-2)] relative overflow-hidden">
          <div className="text-[10.5px] tracking-[0.14em] uppercase opacity-60">Préstamo activo · 12 días</div>
          <div className="font-['Instrument_Serif'] text-[22px] leading-[1.1] mt-1">Rayuela</div>
          <div className="text-[11.5px] opacity-70 mt-1">Julio Cortázar · Sede Belgrano</div>
          <div className="mt-3.5 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[62%] bg-[var(--accent-2)] rounded-full" />
          </div>
          <div className="flex justify-between mt-1.5 text-[10.5px] opacity-70">
            <span>página 234 / 376</span><span>62%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2.5">
          {[['Racha', '28 días'], ['Nivel', 'Lector 7']].map(([k, v]) => (
            <div key={k} className="bg-[var(--card)] border border-[var(--line)] rounded-[14px] px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{k}</div>
              <div className="font-['Instrument_Serif'] text-[22px] mt-0.5">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto mb-1 flex justify-around items-center h-14 rounded-[18px] bg-[var(--card)] border border-[var(--line)] px-2">
          {[true, false, false, false].map((active, i) => (
            <div key={i} className={`w-9 h-9 rounded-[12px] grid place-items-center ${active ? 'bg-[var(--ink)] text-[var(--bg-2)]' : 'text-[var(--muted)]'}`}>
              {i === 0 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>}
              {i === 1 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>}
              {i === 2 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>}
              {i === 3 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function MapScreen() {
  return (
    <>
      <StatusBar />
      <div className="flex flex-col px-4 pt-3 pb-14 h-[calc(100%-36px)]">
        <div className="flex justify-between items-center">
          <div className="font-['Instrument_Serif'] text-[20px]">Sedes de la red</div>
          <div className="text-[11px] text-[var(--muted)]">14 cerca</div>
        </div>
        <div className="mt-3.5 flex-1 rounded-[16px] relative overflow-hidden min-h-0" style={{ background: 'linear-gradient(180deg,#EFEAE0,#E6E0D2)' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
            <path d="M0,80 Q60,60 120,90 T240,100 L300,120" stroke="rgba(26,22,18,0.12)" strokeWidth="1"/>
            <path d="M-10,180 Q80,200 160,170 T300,200" stroke="rgba(26,22,18,0.10)" strokeWidth="1"/>
            <path d="M40,0 L70,200 L60,400" stroke="rgba(26,22,18,0.08)" strokeWidth="1"/>
            <path d="M200,0 L180,180 L220,400" stroke="rgba(26,22,18,0.08)" strokeWidth="1"/>
            <circle cx="120" cy="140" r="6" fill="#8B3A2F"/>
            <circle cx="120" cy="140" r="14" fill="#8B3A2F" fillOpacity="0.18"/>
            <circle cx="200" cy="220" r="5" fill="#1A1612"/>
            <circle cx="80" cy="260" r="5" fill="#1A1612"/>
            <circle cx="220" cy="100" r="5" fill="#1A1612"/>
            <circle cx="150" cy="320" r="5" fill="#1A1612"/>
          </svg>
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[var(--card)] rounded-[12px] px-3 py-2.5 border border-[var(--line)]">
            <div className="text-[10px] tracking-[0.1em] uppercase text-[var(--muted)]">Más cercana · 0.8 km</div>
            <div className="font-['Instrument_Serif'] text-[18px] mt-0.5">Biblioteca Belgrano</div>
            <div className="text-[11px] text-[var(--muted)] mt-0.5">Disponible · 12 ejemplares</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function QRScreen() {
  const pattern = [1,1,1,1,1,0,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,0,1,1,0,1,1,0,1,1,0,1,1];
  return (
    <>
      <StatusBar />
      <div className="flex flex-col items-center justify-center px-4 pb-14 h-[calc(100%-36px)]">
        <div className="text-center mt-2">
          <div className="text-[10px] tracking-[0.14em] uppercase text-[var(--muted)]">Mi identidad</div>
          <div className="font-['Instrument_Serif'] text-[22px] mt-1.5">Martín Acosta</div>
          <div className="text-[11.5px] text-[var(--muted)] mt-0.5">DNI verificado · 38.421.992</div>
        </div>
        <div className="w-[160px] h-[160px] my-5 bg-[var(--ink)] rounded-[14px] p-3 grid" style={{ gridTemplateColumns: 'repeat(8,1fr)', gap: '3px' }}>
          {pattern.map((on, i) => (
            <i key={i} className="rounded-[1px]" style={{ background: on ? 'var(--bg-2)' : 'transparent' }} />
          ))}
        </div>
        <p className="text-center text-[11px] text-[var(--muted)] max-w-[200px] leading-relaxed">
          Mostrá este código al bibliotecario para registrar tu préstamo.
        </p>
        <div className="flex gap-1.5 mt-3.5">
          <div className="px-3 py-1.5 rounded-full bg-[var(--ink)] text-[var(--bg-2)] text-[11px]">3 préstamos activos</div>
          <div className="px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[11px]">Nivel 7</div>
        </div>
      </div>
    </>
  );
}

export function DiscoverScreen() {
  const books = [
    { t: 'Cien años de soledad', a: 'G. García Márquez', tag: 'Realismo mágico', s: 4.8, bg: 'linear-gradient(135deg,#8B3A2F,#5A2620)', dark: true },
    { t: 'Ficciones', a: 'J. L. Borges', tag: 'Cuento', s: 4.9, bg: 'linear-gradient(135deg,#1A1612,#3A3128)', dark: false },
    { t: 'Pedro Páramo', a: 'Juan Rulfo', tag: 'Novela', s: 4.7, bg: 'linear-gradient(135deg,#C9A35A,#8A6E33)', dark: false },
  ];
  return (
    <>
      <StatusBar />
      <div className="flex flex-col px-4 pt-3 pb-14 h-[calc(100%-36px)]">
        <div className="flex justify-between items-baseline">
          <div className="font-['Instrument_Serif'] text-[22px]">Descubrir</div>
          <span className="text-[11px] text-[var(--muted)]">Para vos</span>
        </div>
        <div className="mt-3 flex flex-col gap-2.5 flex-1 overflow-hidden">
          {books.map((b, i) => (
            <div key={i} className={`flex gap-2.5 p-2.5 rounded-[14px] border ${i === 0 ? 'bg-[var(--ink)] text-[var(--bg-2)] border-transparent' : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)]'}`}>
              <div className="w-14 h-[78px] rounded-[6px] flex-shrink-0" style={{ background: b.bg }} />
              <div className="flex-1 min-w-0">
                <div className="text-[9px] tracking-[0.12em] uppercase opacity-60">{b.tag}</div>
                <div className="font-['Instrument_Serif'] text-[16px] mt-0.5 leading-[1.1]">{b.t}</div>
                <div className="text-[11px] opacity-70 mt-0.5">{b.a}</div>
                <div className="flex gap-1.5 items-center mt-1.5">
                  <span className={`text-[11px] ${i === 0 ? 'text-[var(--gold)]' : 'text-[var(--accent)]'}`}>★ {b.s}</span>
                  <span className="text-[10px] opacity-50">· 2,418 lecturas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
