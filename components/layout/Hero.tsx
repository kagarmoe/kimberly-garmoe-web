import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-mustard/12 md:bg-transparent">

      {/* Tinted right-half panel — desktop only; mobile uses the section bg */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-mustard/12" />

      {/* Top strip — location + role */}
      <div className="relative z-10 flex flex-col gap-1 md:flex-row md:justify-between md:items-baseline px-6 md:px-10 pt-8 md:pt-10 border-b border-surface pb-4">
        <p className="font-display text-label uppercase tracking-widest text-text-muted">
          Seattle, WA
        </p>
        <p className="font-body text-sm italic text-text-primary">
          Information Architect · Knowledge Systems
        </p>
      </div>

      {/* Main composition */}
      <div className="relative z-10 flex flex-col md:grid md:grid-cols-[1fr_auto] md:items-start px-6 md:px-10 pt-8 md:pt-10 gap-8 md:gap-10">

        {/* Left: enormous italic name */}
        <div className="order-2 md:order-1">
          <h1
            className="font-display text-display text-text-primary leading-none"
            style={{ marginLeft: '-0.04em' }}
          >
            Kimberly
            <br />
            Garmoe
          </h1>

          {/* Tagline below name, offset */}
          <p className="font-body text-xl text-text-muted mt-8 max-w-sm leading-relaxed ml-1">
            Building knowledge systems for AI —
            taxonomy, retrieval, and structure that scales.
          </p>

          {/* Decorative rule */}
          <div className="mt-10 w-12 border-t-2 border-mustard" />
        </div>

        {/* Right: photo with layered offset — small + right-aligned on mobile, full size on desktop */}
        <div className="order-1 md:order-2 self-end md:self-auto relative mt-0 md:mt-4">
          <div
            className="absolute bg-mustard/25"
            style={{ inset: 0, transform: 'translate(8px, 8px)' }}
          />
          <Image
            src="/images/headshot.jpeg"
            alt="Kimberly Garmoe"
            width={340}
            height={420}
            priority
            sizes="(max-width: 768px) 144px, 340px"
            className="relative block w-36 h-44 md:w-[340px] md:h-[420px]"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 8%',
            }}
          />
        </div>

      </div>

      {/* Bottom strip — nav echoes on mobile */}
      <nav aria-label="Mobile navigation" className="relative z-10 mt-12 md:mt-auto px-6 md:px-10 py-8 border-t border-surface flex gap-8 md:hidden">
        <Link href="/aboutme" className="font-display text-label uppercase tracking-widest text-text-muted">About</Link>
        <Link href="/blog" className="font-display text-label uppercase tracking-widest text-text-muted">Writing</Link>
        <Link href="/projects" className="font-display text-label uppercase tracking-widest text-text-muted">Projects</Link>
      </nav>

    </section>
  )
}
