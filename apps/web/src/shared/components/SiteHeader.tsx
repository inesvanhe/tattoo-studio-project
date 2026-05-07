import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Artists', href: '/artists' },
  { label: 'Tattoos', href: '/#portfolio' },
  { label: 'Termin buchen', href: '/#booking' },
]

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-line)] pb-5">
      <Link className="brand-mark" to="/" aria-label="HONEY | BEEZ ink Startseite">
        HONEY | BEEZ ink
      </Link>

      <nav aria-label="Hauptnavigation" className="hidden gap-6 text-sm text-[var(--color-muted)] sm:flex">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              [
                'transition hover:text-[var(--color-honey)]',
                isActive ? 'text-[var(--color-honey)]' : '',
              ]
                .filter(Boolean)
                .join(' ')
            }
            to={item.href}
            key={item.href}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
