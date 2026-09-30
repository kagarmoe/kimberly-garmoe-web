'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/aboutme', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 h-14 bg-ink text-cream flex items-center justify-between px-5 md:px-10"
    >
      <Link
        href="/"
        className="font-display font-bold text-lg tracking-tight no-underline hover:text-gold transition-colors"
      >
        Kimberly Garmoe
      </Link>

      <ul className="flex gap-5 md:gap-8 list-none m-0 p-0">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`label no-underline transition-colors hover:text-gold pb-1 border-b-2 ${
                  active ? 'border-gold text-gold' : 'border-transparent'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
