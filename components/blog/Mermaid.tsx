'use client'

import { useEffect, useId, useRef } from 'react'

// The site palette (app/globals.css, docs/color-system.md) as hex: mermaid's
// theme engine computes shades from these, so it needs plain colors, not var().
const palette = {
  paper: '#EDE4CF',
  cream: '#F9F3E7',
  ink: '#162D2C',
  inkMuted: '#416261',
}

export const mermaidConfig = {
  startOnLoad: false,
  securityLevel: 'strict',
  // Without this a broken diagram leaves mermaid's error graphic under the footer.
  suppressErrorRendering: true,
  theme: 'base',
  themeVariables: {
    fontFamily: 'var(--font-geist), sans-serif',
    fontSize: '15px',
    background: palette.paper,
    primaryColor: palette.cream,
    primaryTextColor: palette.ink,
    primaryBorderColor: palette.ink,
    lineColor: palette.inkMuted,
    textColor: palette.ink,
    clusterBkg: palette.paper,
    clusterBorder: palette.inkMuted,
    edgeLabelBackground: palette.paper,
    tertiaryColor: palette.paper,
  },
  // Natural size, never shrunk to the column: the card scrolls a wide diagram instead.
  flowchart: { curve: 'basis', padding: 14, useMaxWidth: false },
} as const

/** Draws a Mermaid diagram in the browser; mermaid loads only on pages that have one. */
export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  // mermaid.render needs an id that is valid in a CSS selector.
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  useEffect(() => {
    let cancelled = false
    import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize(mermaidConfig)
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled && ref.current) ref.current.innerHTML = svg
      })
      // The diagram's source stays on the page if it cannot be drawn.
      .catch(error => console.error('mermaid:', error))
    return () => {
      cancelled = true
    }
  }, [chart, id])

  return (
    <div ref={ref} data-mermaid className="not-prose my-10">
      <pre>{chart}</pre>
    </div>
  )
}
