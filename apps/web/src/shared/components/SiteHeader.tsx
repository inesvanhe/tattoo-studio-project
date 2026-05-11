import { Link, NavLink } from 'react-router-dom'

import honeyBeezLogo from '../../assets/brand/honey-beez-bw-logo.png'

const navItems = [
  { label: 'Artists', href: '/artists' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Termin buchen', href: '/booking' },
]

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-line)] pb-5">
      <Link className="brand-mark" to="/" aria-label="HONEY | BEEZ ink Startseite">
        <img src={honeyBeezLogo} alt="HONEY | BEEZ ink" />
      </Link>

      <nav aria-label="Hauptnavigation" className="hidden gap-6 font-mono text-sm font-medium uppercase tracking-[0.08em] text-[rgba(245,245,240,0.68)] sm:flex">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              [
                'transition hover:text-[var(--color-neon-honey)]',
                isActive ? 'text-[var(--color-neon-honey)]' : '',
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
