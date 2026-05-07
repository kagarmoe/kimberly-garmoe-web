import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Font Comparison' }

const fonts = [
  { label: 'Playfair Display', var: '--font-playfair' },
  { label: 'Fraunces',         var: '--font-fraunces' },
  { label: 'Bodoni Moda',      var: '--font-bodoni' },
  { label: 'Cardo',            var: '--font-cardo' },
  { label: 'Sorts Mill Goudy', var: '--font-goudy' },
]

export default function ComparePage() {
  return (
    <main className="py-16 px-10">
      <p className="font-body text-sm uppercase tracking-widest text-text-muted mb-16">
        Font comparison — same layout, display only
      </p>
      <div className="space-y-0">
        {fonts.map(({ label, var: cssVar }, i) => (
          <div
            key={label}
            className="grid grid-cols-[180px_1fr] items-center border-t border-surface py-10"
            style={{ borderTopWidth: i === 0 ? '3px' : '1px', borderTopColor: i === 0 ? 'var(--color-terracotta)' : undefined }}
          >
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-text-muted">{label}</p>
            </div>
            <div style={{ fontFamily: `var(${cssVar}), serif` }}>
              <p
                className="text-text-primary leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  letterSpacing: '-0.02em',
                  fontFamily: `var(${cssVar}), serif`,
                }}
              >
                Kimberly
                <br />
                Garmoe
              </p>
              <p
                className="text-text-muted mt-4 max-w-sm"
                style={{ fontFamily: `var(${cssVar}), serif`, fontSize: '1.1rem' }}
              >
                Building knowledge systems for AI — taxonomy, retrieval, and structure that scales.
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
