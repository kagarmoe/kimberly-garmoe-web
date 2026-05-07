import Image from 'next/image'

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[3fr_2fr] min-h-[80vh]">

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

      {/* Right: portrait, contained and face-focused */}
      <div className="hidden md:flex items-center justify-center px-8 py-16">
        <div className="relative w-64 h-80 overflow-hidden">
          <Image
            src="/images/headshot.jpeg"
            alt="Kimberly Garmoe"
            fill
            priority
            sizes="(max-width: 768px) 0px, 256px"
            className="object-cover"
            style={{ objectPosition: 'center 10%' }}
          />
        </div>
      </div>

    </section>
  )
}
