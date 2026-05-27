import { useState } from 'react';

const TABS = [
  {
    n: '01', title: 'Préstamos en cualquier formato',
    desc: 'Desde la app o presencial con QR. El bibliotecario escanea el ítem y el QR del lector; el préstamo queda asociado automáticamente. Sin papel.',
  },
  {
    n: '02', title: 'Descubrimiento por scroll',
    desc: 'Un feed continuo de libros recomendados según tu historial, autores favoritos y novedades de la red.',
  },
  {
    n: '03', title: 'Reseñas multidimensionales',
    desc: 'Estrellas de 0.5 a 5 más facetas: largo, interés, valor aportado, releerías. Más rico que un rating simple.',
  },
  {
    n: '04', title: 'Foro moderado en dos capas',
    desc: 'Filtro automático + moderación comunitaria con reportes. Pensado para incluir bibliotecas escolares con menores.',
  },
  {
    n: '05', title: 'Puntos, niveles y rachas',
    desc: 'Cada devolución con reseña suma puntos. Tabla de top 10 lectores. Racha activa mientras haya un préstamo cada 5 días.',
  },
];

function VisualQR() {
  const cells = [0,1,2,3,4,6,7,9,10,14,16,19,20,22,24,27,29,30,31,32,33,34,37,40,42,44,46,49,51,53,55,57,60,63,65,68,70,72,75,78,80,82,84,87,89,90,91,92,93,94,96,99];
  return (
    <div className="text-center">
      <div className="text-[11px] tracking-[0.14em] uppercase text-[var(--muted)]">Préstamo en sede · Belgrano</div>
      <div className="font-['Instrument_Serif'] text-[30px] mt-2 tracking-[-0.02em]">Martín Acosta</div>
      <div className="text-[13px] text-[var(--muted)] mt-0.5">DNI 38.421.992 · Lector nivel 7</div>
      <div className="w-[180px] h-[180px] mx-auto my-6 bg-[var(--ink)] rounded-[18px] p-4 grid" style={{ gridTemplateColumns: 'repeat(10,1fr)', gap: 3 }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <i key={i} className="rounded-[1px]" style={{ background: cells.includes(i) ? 'var(--bg-2)' : 'transparent' }} />
        ))}
      </div>
      <div className="inline-flex gap-2 px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--bg-2)] text-[13px]">
        ◉ Escaneando ejemplar…
      </div>
    </div>
  );
}

function VisualDiscover() {
  return (
    <div className="p-6 w-full">
      {[
        { t: 'Rayuela', a: 'Julio Cortázar', score: 4.8, color: '#8B3A2F' },
        { t: 'Ficciones', a: 'J. L. Borges', score: 4.9, color: '#1A1612' },
        { t: 'Pedro Páramo', a: 'Juan Rulfo', score: 4.7, color: '#C9A35A' },
      ].map((b, i) => (
        <div key={i} className="flex gap-3.5 p-3.5 rounded-[14px] bg-[var(--bg)] mb-2.5 border border-[var(--line)]">
          <div className="w-[60px] h-[84px] rounded-[4px] flex-shrink-0" style={{ background: b.color }} />
          <div className="flex-1">
            <div className="font-['Instrument_Serif'] text-[20px] tracking-[-0.01em]">{b.t}</div>
            <div className="text-[12px] text-[var(--muted)] mt-0.5">{b.a}</div>
            <div className="mt-2 text-[12px] text-[var(--accent)]">★ {b.score} <span className="text-[var(--muted)]">· 2.418 lecturas</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualReviews() {
  const dims: [string, number, string][] = [['Largo', 70, 'Justo'], ['Interesante', 92, 'Muy alto'], ['Valor aportado', 84, 'Alto'], ['Lo volverías a leer', 100, 'Sí']];
  return (
    <div className="p-8 w-full">
      <div className="font-['Instrument_Serif'] text-[24px] tracking-[-0.015em]">Rayuela</div>
      <div className="text-[12px] text-[var(--muted)] mt-1">Tu reseña</div>
      <div className="flex gap-1 mt-4 text-[24px] text-[var(--accent)]">★★★★<span className="opacity-40">★</span></div>
      <div className="mt-5 flex flex-col gap-3.5">
        {dims.map(([k, v, l]) => (
          <div key={k}>
            <div className="flex justify-between text-[12px] mb-1.5">
              <span className="text-[var(--ink)]">{k}</span>
              <span className="text-[var(--muted)]">{l}</span>
            </div>
            <div className="h-1 bg-[var(--bg)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualForum() {
  const posts = [
    { u: 'Lucía R.', lv: 9, t: '¿Por dónde empezar con Cortázar?', v: 184, c: 42 },
    { u: 'Mateo P.', lv: 5, t: 'Hilo: mejores traducciones de Dostoyevski al español', v: 97, c: 28 },
    { u: 'Sofía L.', lv: 12, t: 'Club de lectura · Octubre · Pedro Páramo', v: 243, c: 67, pin: true },
  ];
  return (
    <div className="p-6 w-full flex flex-col gap-3">
      {posts.map((p, i) => (
        <div key={i} className={`p-3.5 rounded-[14px] ${p.pin ? 'bg-[var(--ink)] text-[var(--bg-2)]' : 'bg-[var(--bg)] border border-[var(--line)]'}`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center text-[11px] opacity-70">
              <span>{p.u}</span>
              <span className="px-1.5 py-0.5 rounded-[4px] text-[10px]" style={{ background: p.pin ? 'var(--gold)' : 'var(--accent)', color: p.pin ? 'var(--ink)' : 'var(--bg-2)' }}>Nv. {p.lv}</span>
              {p.pin && <span className="text-[10px]">📌 Destacado</span>}
            </div>
            <div className="flex gap-2.5 text-[11px] opacity-70">
              <span>↑ {p.v}</span><span>💬 {p.c}</span>
            </div>
          </div>
          <div className="font-['Instrument_Serif'] text-[18px] mt-2 tracking-[-0.01em]">{p.t}</div>
        </div>
      ))}
    </div>
  );
}

function VisualGamify() {
  return (
    <div className="p-8 w-full text-center">
      <div className="font-['Instrument_Serif'] text-[14px] text-[var(--muted)] tracking-[0.14em] uppercase">Tu racha</div>
      <div className="font-['Instrument_Serif'] text-[88px] leading-none mt-2 text-[var(--accent)] tracking-[-0.03em]">28</div>
      <div className="text-[13px] text-[var(--muted)]">días consecutivos</div>
      <div className="flex justify-center flex-wrap gap-1 mt-6 max-w-[280px] mx-auto">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="w-[18px] h-[18px] rounded-[4px] border border-[var(--line)]" style={{ background: i < 28 ? 'var(--accent)' : 'var(--bg)' }} />
        ))}
      </div>
      <div className="mt-6 px-5 py-3.5 bg-[var(--bg)] rounded-[14px] inline-flex gap-2.5 items-center">
        <div className="w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--gold)] grid place-items-center font-['Instrument_Serif'] text-[14px]">7</div>
        <div className="text-left">
          <div className="text-[12px] text-[var(--muted)]">Próximo nivel</div>
          <div className="text-[13px]"><b>Lector 8</b> · 240 / 320 pts</div>
        </div>
      </div>
    </div>
  );
}

const VISUALS = [VisualQR, VisualDiscover, VisualReviews, VisualForum, VisualGamify];

export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const Visual = VISUALS[active];

  return (
    <section className="py-[100px] bg-[var(--bg-2)]" id="social">
      <div className="max-w-[1320px] mx-auto px-10">
        <div className="mb-14">
          <div className="text-[11.5px] tracking-[0.16em] uppercase text-[var(--muted)] mb-3.5">Capas funcionales</div>
          <h2 className="font-['Instrument_Serif'] font-normal leading-[1.02] tracking-[-0.02em] max-w-[780px]"
            style={{ fontSize: 'clamp(40px, 4.6vw, 64px)' }}>
            Una sola app. <em className="italic text-[var(--accent)]">Cinco</em> sistemas pensados para convivir.
          </h2>
        </div>

        <div className="grid gap-16" style={{ gridTemplateColumns: '1.05fr 1fr' }}>
          <div className="flex flex-col gap-1">
            {TABS.map((tab, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`border text-left px-5 py-4 rounded-[16px] cursor-pointer transition-colors flex gap-4 items-start ${active === i ? 'bg-[var(--card)] border-[var(--line)]' : 'bg-transparent border-transparent hover:bg-[var(--card)]'}`}>
                <span className="font-['Instrument_Serif'] italic text-[var(--accent)] text-[13px] w-6 flex-shrink-0 pt-0.5">{tab.n}</span>
                <span className="flex-1">
                  <span className="block font-['Instrument_Serif'] text-[22px] tracking-[-0.015em] leading-[1.1]">{tab.title}</span>
                  <span className={`text-[var(--muted)] text-[13.5px] leading-[1.55] mt-1.5 block overflow-hidden transition-all duration-300 ${active === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {tab.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-[28px] bg-[var(--card)] border border-[var(--line)] overflow-hidden grid place-items-center" style={{ aspectRatio: '4/5' }}>
            <Visual />
          </div>
        </div>
      </div>
    </section>
  );
}
