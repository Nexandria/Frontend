export function SpecsGrid() {
  return (
    <section className="py-[100px]" id="sedes">
      <div className="max-w-[1320px] mx-auto px-10">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <div className="inline-block text-[11.5px] tracking-[0.16em] uppercase text-[var(--muted)] mb-3.5">Cómo funciona</div>
          <h2 className="font-['Instrument_Serif'] font-normal leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
            style={{ fontSize: 'clamp(40px, 4.6vw, 64px)' }}>
            Una app. Toda la <em className="italic text-[var(--accent)]">red</em>. Cero filas.
          </h2>
          <p className="mt-4 text-[var(--muted)] text-[16px] leading-[1.55]">
            Buscás un libro, lo encontrás, lo reservás. Te avisamos cuándo está listo. Lo retirás en la sede que más te quede a mano.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Tile 1 — Dark, span 7 */}
          <div className="col-span-7 bg-[var(--ink)] text-[var(--bg-2)] rounded-[22px] p-7 relative overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="font-['Instrument_Serif'] italic text-[13px] text-[var(--gold)]">01 / Sedes cerca tuyo</div>
            <h3 className="font-['Instrument_Serif'] text-[28px] leading-[1.05] tracking-[-0.015em] mt-4 mb-2">
              Encontrá tu libro<br/>en la biblioteca más cercana.
            </h3>
            <p className="text-[rgba(246,242,233,0.6)] text-[14px] leading-[1.55]">
              Mapa interactivo con todas las bibliotecas adheridas. Tocá un pin y mirá qué libros están disponibles ahí mismo.
            </p>
            <div className="mt-5 relative rounded-[22px] overflow-hidden aspect-video"
              style={{ background: 'radial-gradient(1200px 480px at 30% 20%, rgba(139,58,47,0.18), transparent 60%), radial-gradient(800px 400px at 80% 80%, rgba(201,163,90,0.12), transparent 60%), #1F1A14' }}>
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(246,242,233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(246,242,233,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              {[{t:'30%',l:'24%'},{t:'55%',l:'58%',gold:true},{t:'70%',l:'34%'},{t:'42%',l:'76%'},{t:'22%',l:'62%'}].map((p, i) => (
                <div key={i} className="absolute w-4 h-4 rounded-full"
                  style={{ top: p.t, left: p.l, background: p.gold ? 'var(--gold)' : 'var(--accent-2)', boxShadow: p.gold ? '0 0 0 4px rgba(201,163,90,0.25), 0 0 0 12px rgba(201,163,90,0.1)' : '0 0 0 4px rgba(184,88,66,0.25), 0 0 0 12px rgba(184,88,66,0.1)' }} />
              ))}
              <div className="absolute top-5 left-5 font-['Instrument_Serif'] text-[28px] text-[var(--bg-2)]">Sedes cerca tuyo</div>
              <div className="absolute top-[60px] left-5 text-[12px] text-[rgba(246,242,233,0.6)]">14 a menos de 5 km · 8 abiertas ahora</div>
            </div>
          </div>

          {/* Tile 2 — span 5 */}
          <div className="col-span-5 bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-7 hover:-translate-y-1 transition-transform">
            <div className="font-['Instrument_Serif'] italic text-[13px] text-[var(--accent)]">02 / Reservas instantáneas</div>
            <h3 className="font-['Instrument_Serif'] text-[28px] leading-[1.05] tracking-[-0.015em] mt-4 mb-2">Tu libro, esperándote.</h3>
            <p className="text-[var(--muted)] text-[14px] leading-[1.55]">
              Reservá desde el celular y recibí una notificación cuando esté listo. Pasás, mostrás tu QR y te lo llevás.
            </p>
            <div className="mt-6 p-4 bg-[var(--bg)] rounded-[14px] border border-dashed border-[var(--line-strong)]">
              <div className="text-[10px] tracking-[0.14em] uppercase text-[var(--muted)]">Estado de la reserva</div>
              <div className="font-['Instrument_Serif'] text-[18px] mt-1.5 tracking-[-0.01em]">Rayuela · listo para retirar</div>
              <div className="flex gap-2 mt-2.5 items-center">
                <div className="w-2 h-2 rounded-full bg-[var(--ok)]" />
                <span className="text-[12px] text-[var(--ink-2)]">Biblioteca Belgrano · hasta el viernes</span>
              </div>
            </div>
          </div>

          {/* Tiles 3,4,5 — span 4 each */}
          {[
            { n: '03 / Identidad QR', t: 'Tu carnet, en una pantalla.', d: 'Un solo escaneo de DNI y listo. Tu QR personal funciona en cualquier sede de la red. Sin trámites, sin papeles, sin renovaciones.' },
            { n: '04 / Plazos a medida', t: 'Vos elegís cuánto tiempo.', d: '15, 30 o 60 días para libros. Recordatorios automáticos antes del vencimiento — nunca más una multa por olvido.' },
            { n: '05 / Hasta 3 a la vez', t: 'Más libros, menos viajes.', d: 'Llevate hasta tres préstamos activos. Devolvé en cualquier sede de la red, no necesariamente donde retiraste.' },
          ].map(tile => (
            <div key={tile.n} className="col-span-4 bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-7 hover:-translate-y-1 transition-transform">
              <div className="font-['Instrument_Serif'] italic text-[13px] text-[var(--accent)]">{tile.n}</div>
              <h3 className="font-['Instrument_Serif'] text-[28px] leading-[1.05] tracking-[-0.015em] mt-4 mb-2">{tile.t}</h3>
              <p className="text-[var(--muted)] text-[14px] leading-[1.55]">{tile.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
