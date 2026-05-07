import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-end px-8 pb-16 overflow-hidden">

      {/* Headshot — asymmetric right, duotone treatment */}
      <div className="absolute right-8 top-16 w-64 md:w-80">
        <div className="relative">
          <div
            className="absolute inset-0 bg-accent"
            style={{ transform: 'translate(8px, 8px)' }}
          />
          <Image
            src="/images/headshot.jpeg"
            alt="Kimberly Garmoe"
            width={400}
            height={500}
            priority
            className="relative grayscale contrast-125 mix-blend-multiply"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Main text — flush left, poster layout */}
      <div className="relative z-10 max-w-3xl">
        <p className="font-display text-label uppercase text-text-muted mb-6">
          Seattle, WA
        </p>

        <h1
          className="font-display text-display text-text-primary mb-8"
          style={{ marginLeft: '-0.03em' }}
        >
          Kimberly
          <br />
          Garmoe
        </h1>

        <p className="font-body text-xl text-text-muted max-w-xl leading-relaxed">
          Information architect building knowledge systems for AI —
          taxonomy, retrieval, and structure that scales.
        </p>

        <div className="mt-12 border-t border-surface w-full" />
      </div>
    </section>
  )
}
