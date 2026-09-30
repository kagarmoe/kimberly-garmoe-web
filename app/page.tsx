import Link from 'next/link'
import { Hero } from '@/components/layout/Hero'

const pipeline = [
  { k: 'in', what: 'cryptography · identity · infrastructure automation · APIs · developer tooling', where: 'AWS, Chef' },
  { k: 'via', what: 'RAG · knowledge graphs · ontology · evaluation · agentic workflows', where: 'Spark, Databricks, local LLMs' },
  { k: 'out', what: 'knowledge that people and AI systems can actually use', where: 'customer solutions' },
]

const sections = [
  { href: '/aboutme', label: 'About', desc: 'The problem I like, and how I got here' },
  { href: '/blog', label: 'Writing', desc: 'Essays and technical notes' },
  { href: '/projects', label: 'Projects', desc: 'Pursinator, Idle Chapters, and others' },
]

export default function Page() {
  return (
    <main>
      <Hero />

      <section className="md:grid-lines px-5 md:px-10 py-12 md:py-16 border-b border-line">
        <table className="w-full font-mono text-[0.8rem] leading-relaxed text-ink">
          <tbody>
            {pipeline.map(({ k, what, where }) => (
              <tr key={k} className="align-top">
                <td className="pr-6 md:pr-10 py-1 text-ochre w-12">{k}</td>
                <td className="pr-6 md:pr-10 py-1">{what}</td>
                <td className="py-1 text-ink-muted whitespace-nowrap hidden sm:table-cell">{where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 px-5 md:px-10 py-4 md:py-8">
        {sections.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group block py-6 md:py-8 md:px-8 first:md:pl-0 border-b md:border-b-0 md:border-l border-line first:border-l-0 no-underline"
          >
            <p className="label text-ink group-hover:text-gold transition-colors mb-2">{label}</p>
            <p className="font-display font-extrabold text-2xl md:text-3xl leading-tight tracking-tight text-ink group-hover:text-gold transition-colors">{desc}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}
