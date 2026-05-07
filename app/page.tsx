import { Hero } from '@/components/layout/Hero'

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-surface">
        {[
          { href: '/aboutme', label: 'About', desc: 'Background, experience, résumé' },
          { href: '/blog', label: 'Writing', desc: 'Essays and technical notes' },
          { href: '/projects', label: 'Projects', desc: 'Pursinator, Idle Chapters, and others' },
        ].map(({ href, label, desc }) => (
          <a
            key={href}
            href={href}
            className="block px-0 py-8 md:px-8 border-b md:border-b-0 md:border-l border-surface first:border-l-0 group no-underline"
          >
            <p className="font-display text-label uppercase text-text-muted mb-2 group-hover:text-accent transition-colors">
              {label}
            </p>
            <p className="font-body text-body text-text-muted">{desc}</p>
          </a>
        ))}
      </section>
    </main>
  )
}
