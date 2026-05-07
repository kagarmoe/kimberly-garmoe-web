import Image from 'next/image'

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[3fr_2fr] min-h-[80vh] overflow-hidden">

      {/* Left: text, vertically centered */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-16">
        <p className="font-display text-label uppercase text-text-muted mb-6 tracking-widest">
          Seattle, WA
        </p>

        <h1
          className="font-display text-display text-text-primary mb-8 leading-none"
          style={{ marginLeft: '-0.02em' }}
        >
          Kimberly
          <br />
          Garmoe
        </h1>

        <p className="font-body text-xl text-text-muted max-w-sm leading-relaxed">
          Information architect building knowledge systems for AI —
          taxonomy, retrieval, and structure that scales.
        </p>

        <div className="mt-12 border-t border-surface w-24" />
      </div>

      {/* Right: natural photo fills the column */}
      <div className="relative hidden md:block">
        <Image
          src="/images/headshot.jpeg"
          alt="Kimberly Garmoe"
          fill
          priority
          className="object-cover object-top"
          style={{ display: 'block' }}
        />
      </div>

    </section>
  )
}
