export function Marquee() {
  const text = 'Tu próxima lectura te espera · Nexandría · Tu próxima lectura te espera · Nexandría · Tu próxima lectura te espera · Nexandría · ';
  return (
    <section className="bg-[var(--ink)] text-[var(--bg-2)] py-20 overflow-hidden whitespace-nowrap relative">
      <div className="inline-flex gap-[60px] animate-marquee font-['Instrument_Serif']" style={{ fontSize: 'clamp(64px, 8vw, 140px)', lineHeight: 1 }}>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </section>
  );
}

const FOOTER_LINKS = [
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--bg-2)] pt-20 pb-8" id="docs">
      <div className="max-w-[1320px] mx-auto px-10">
        <div className="grid gap-8" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
          <div>
            <div className="font-['Instrument_Serif'] text-[40px] leading-none tracking-[-0.02em]">Nexandría</div>
            <p className="text-[rgba(246,242,233,0.6)] text-[13.5px] mt-2 max-w-[280px] leading-[1.5]">
              Conectando la red bibliotecaria con vos.
            </p>
          </div>
          {FOOTER_LINKS.map(col => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.16em] uppercase text-[rgba(246,242,233,0.5)] mb-4 font-medium">{col.title}</h4>
              {col.links.map(link => (
                <a key={link} href="#" className="block py-1.5 text-[rgba(246,242,233,0.78)] text-[14px] no-underline hover:text-[var(--gold)] transition-colors">{link}</a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[rgba(246,242,233,0.1)] flex justify-between text-[12px] text-[rgba(246,242,233,0.5)]">
          <div>© 2026 Nexandría</div>
          <div>Escuela Técnica N21 Fragata Libertad</div>
        </div>
      </div>
    </footer>
  );
}
