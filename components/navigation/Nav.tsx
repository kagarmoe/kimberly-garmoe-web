import Link from 'next/link'

const links = [
  { href: '/aboutme', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

export function Nav() {
  return (
    <nav aria-label="Primary navigation" className="hidden md:flex fixed left-0 top-0 h-screen w-48 bg-olive flex-col px-7 py-10 z-50">
      <Link
        href="/"
        className="font-display text-2xl text-cream leading-snug no-underline hover:text-ochre transition-colors"
      >
        Kimberly<br />Garmoe
      </Link>

      <div className="mt-8 border-t border-cream/20" />

      <ul className="flex flex-col gap-5 list-none m-0 p-0 mt-auto pb-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-display text-sm uppercase tracking-widest text-cream no-underline hover:text-ochre transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
