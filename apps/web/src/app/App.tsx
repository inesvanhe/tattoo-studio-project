export function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/15 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ffc105]">
            HONEY | BEEZ ink
          </p>
          <nav aria-label="Primary navigation" className="hidden gap-6 text-sm text-neutral-300 sm:flex">
            <a className="transition hover:text-[#ffc105]" href="#artists">
              Artists
            </a>
            <a className="transition hover:text-[#ffc105]" href="#portfolio">
              Portfolio
            </a>
            <a className="transition hover:text-[#ffc105]" href="#booking">
              Termin buchen
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#ffc105]">
              Blackwork / Neo-Traditional / Lowrider Energy
            </p>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl lg:text-8xl">
              Ink with attitude.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300">
              Blackwork und Neo-Traditional Tattoos fuer Menschen, die Stil,
              Szene und klare Linien feiern.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                className="border border-[#ffc105] bg-[#ffc105] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white hover:border-white"
                href="#booking"
              >
                Anfrage starten
              </a>
              <a
                className="border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#ffc105] hover:text-[#ffc105]"
                href="#portfolio"
              >
                Portfolio ansehen
              </a>
            </div>
          </section>

          <aside className="border border-white/15 bg-white/[0.03] p-6 shadow-2xl shadow-black/40">
            <div className="aspect-[4/5] border border-[#ffc105]/60 bg-[radial-gradient(circle_at_30%_20%,rgba(255,193,5,0.26),transparent_30%),linear-gradient(145deg,#18181b,#050505)] p-6">
              <div className="flex h-full flex-col justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-300">
                  HONEY | BEEZ ink
                </p>
                <div>
                  <p className="text-6xl font-black text-[#ffc105]">HB</p>
                  <p className="mt-3 text-xl font-black uppercase leading-tight">
                    Blackwork / Neo-Traditional
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="grid gap-4 border-t border-white/15 pt-5 text-sm text-neutral-400 sm:grid-cols-3">
          <p id="artists">Artist profiles planned</p>
          <p id="portfolio">Portfolio gallery planned</p>
          <p id="booking">Terminbuchung geplant</p>
        </footer>
      </section>
    </main>
  )
}
