import Link from 'next/link'

const links = [
  { href: '/aboutme', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

export function Nav() {
  return (
    <nav className="flex justify-between items-center px-8 py-6 border-b border-surface">
      <Link
        href="/"
        className="font-display text-label uppercase tracking-widest text-text-primary no-underline hover:text-accent transition-colors"
      >
        Kimberly Garmoe
      </Link>
      <ul className="flex gap-8 list-none m-0 p-0">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-display text-label uppercase tracking-widest text-text-muted no-underline hover:text-text-primary transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
