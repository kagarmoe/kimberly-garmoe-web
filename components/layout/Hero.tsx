import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Terracotta panel — right half background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-terracotta/12" />

      {/* Top strip — location + role */}
      <div className="relative z-10 flex justify-between items-baseline px-10 pt-10 border-b border-surface pb-4">
        <p className="font-display text-label uppercase tracking-widest text-text-muted">
          Seattle, WA
        </p>
        <p className="font-body text-sm italic text-text-primary">
          Information Architect · Knowledge Systems
        </p>
      </div>

      {/* Main composition */}
      <div className="relative z-10 grid grid-cols-[1fr_auto] items-start px-10 pt-10 gap-10">

        {/* Left: enormous italic name */}
        <div>
          <h1
            className="font-display italic text-display text-text-primary leading-none"
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
          <div className="mt-10 w-12 border-t-2 border-terracotta" />
        </div>

        {/* Right: photo with layered offset */}
        <div className="relative mt-4">
          <div
            className="absolute bg-terracotta/25"
            style={{ inset: 0, transform: 'translate(10px, 10px)' }}
          />
          <Image
            src="/images/headshot.jpeg"
            alt="Kimberly Garmoe"
            width={340}
            height={420}
            priority
            className="relative block"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 8%',
              height: '420px',
              width: '340px',
            }}
          />
        </div>

      </div>

      {/* Bottom strip — nav echoes on mobile */}
      <nav aria-label="Mobile navigation" className="relative z-10 mt-auto px-10 py-8 border-t border-surface flex gap-8 md:hidden">
        <a href="/aboutme" className="font-display text-label uppercase tracking-widest text-text-muted">About</a>
        <a href="/blog" className="font-display text-label uppercase tracking-widest text-text-muted">Writing</a>
        <a href="/projects" className="font-display text-label uppercase tracking-widest text-text-muted">Projects</a>
      </nav>

    </section>
  )
}
