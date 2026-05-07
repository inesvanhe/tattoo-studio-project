const navItems = [
  { label: 'Artists', href: '#artists' },
  { label: 'Tattoos', href: '#portfolio' },
  { label: 'Termin buchen', href: '#booking' },
]

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-line)] pb-5">
      <a className="brand-mark" href="#top" aria-label="HONEY | BEEZ ink Startseite">
        HONEY | BEEZ ink
      </a>

      <nav aria-label="Hauptnavigation" className="hidden gap-6 text-sm text-[var(--color-muted)] sm:flex">
        {navItems.map((item) => (
          <a className="transition hover:text-[var(--color-honey)]" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
