import Image from 'next/image'

/** Thin full-bleed strip of the banner under the nav, so inner pages remember the hero. */
export function BannerStrip() {
  return (
    <div className="relative h-3.5" aria-hidden="true">
      <Image src="/images/banner.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_40%]" />
    </div>
  )
}

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <header className="mb-10 md:mb-14 pb-6 border-b border-ink">
      {eyebrow && <p className="label text-ink-muted mb-3">{eyebrow}</p>}
      <h1 className="font-display font-extrabold text-heading text-ink">{title}</h1>
      {subtitle && (
        <p className="font-display font-light text-title text-ink-muted mt-2">{subtitle}</p>
      )}
    </header>
  )
}

/** Inner-page frame: banner strip, then padded content column on the grid. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="md:grid-lines">
      <BannerStrip />
      <div className="px-5 md:px-10 py-12 md:py-16 max-w-6xl">{children}</div>
    </main>
  )
}
