'use client'

import { useEffect, useId, useRef } from 'react'

/** Draws a Mermaid diagram in the browser; mermaid loads only on pages that have one. */
export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  // mermaid.render needs an id that is valid in a CSS selector.
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  useEffect(() => {
    let cancelled = false
    import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' })
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
    <div ref={ref} data-mermaid className="not-prose my-8 overflow-x-auto">
      <pre>{chart}</pre>
    </div>
  )
}
