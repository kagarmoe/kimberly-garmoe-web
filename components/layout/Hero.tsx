import Image from 'next/image'
import { FlowLines } from './FlowLines'

const fragments = `kms.rotate(key) ?? rfc5280
  identity ⇄ trust boundary
    #fips-140 / hsm / pkcs11
  spark.read.parquet("raw/")
    "how does it actually work?"
      →`

export function Hero() {
  return (
    // Desktop height tracks the banner's own ratio (18:7 ≈ 2.57) so the image is barely scaled.
    <section className="relative overflow-hidden bg-ink text-cream min-h-[calc(100svh-3.5rem)] md:min-h-0 md:aspect-[18/7]">
      <Image
        src="/images/banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <FlowLines />
      {/* Legibility overlay: light from the bottom on mobile, none on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent md:hidden" />

      {/* Raw fragments over the messy side — desktop only */}
      <pre
        aria-hidden="true"
        className="fragments hidden md:block absolute left-10 top-16 m-0 font-mono text-[0.8rem] leading-relaxed tracking-wide text-ink origin-top-left"
      >
        {fragments}
      </pre>

      {/* Mobile: flow layout. Desktop: absolutely placed composition inside a full-bleed wrapper. */}
      <div className="relative z-10 flex flex-col gap-8 px-5 pt-10 pb-12 md:absolute md:inset-0 md:block md:p-0">

        <div className="md:absolute md:right-10 md:top-14 md:text-right">
          <h1 className="font-display font-extrabold text-display text-cream">
            Kimberly
            <br />
            Garmoe
          </h1>
          <p className="label text-cream mt-6 md:mt-8 whitespace-pre-line">
            {'Technical knowledge systems\nAI agents & developer infrastructure\nCustomer solutions'}
          </p>
        </div>

        <div className="relative w-[60%] max-w-[260px] aspect-[34/42] outline outline-8 outline-cream md:absolute md:left-[24%] md:top-[20%] md:w-[22%] md:max-w-none">
          <Image
            src="/images/headshot.jpeg"
            alt="Kimberly Garmoe"
            fill
            priority
            sizes="(max-width: 768px) 60vw, 22vw"
            className="object-cover object-[center_8%]"
          />
        </div>

        <p className="text-cream text-lg leading-snug max-w-sm md:max-w-md md:absolute md:right-10 md:bottom-10 md:text-right">
          Turning messy technical information into knowledge people and AI systems can{' '}
          <em className="font-signature not-italic text-gold text-[1.15em]">actually use.</em>
        </p>
      </div>
    </section>
  )
}
