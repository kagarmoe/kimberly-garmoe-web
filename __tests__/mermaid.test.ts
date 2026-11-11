import { compileMDX } from 'next-mdx-remote/rsc'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { mdxComponents } from '@/components/blog/mdx'
import { mermaidConfig } from '@/components/blog/Mermaid'

// Posts draw diagrams with plain ```mermaid fences, as GitHub does (devswamp-196).
const render = async (source: string, format: 'md' | 'mdx') => {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { mdxOptions: { format } },
  })
  return renderToStaticMarkup(content)
}

const post = [
  '```mermaid',
  'flowchart LR',
  '  a --> b',
  '```',
  '',
  '```ts',
  'const x = 1',
  '```',
].join('\n')

describe('mermaid fences in posts', () => {
  for (const format of ['md', 'mdx'] as const) {
    it(`renders a mermaid fence as a diagram and leaves other code alone (${format})`, async () => {
      const html = await render(post, format)
      expect(html).toMatch(/<div[^>]*data-mermaid[^>]*>/)
      expect(html).toContain('flowchart LR')
      expect(html).toMatch(/<pre><code class="language-ts">const x = 1/)
    })
  }

  // cr-196-1: otherwise a broken diagram leaves mermaid's error graphic under the footer.
  it('keeps mermaid from drawing its error graphic into the page', () => {
    expect(mermaidConfig.suppressErrorRendering).toBe(true)
  })

  // cr-196-2: otherwise mermaid shrinks a wide diagram to the column and its labels become unreadable.
  it('draws diagrams at their natural size', () => {
    expect(mermaidConfig.flowchart.useMaxWidth).toBe(false)
  })

  // cr-196-4 (devswamp-199): without titleColor, subgraph titles were a navy outside the palette.
  it('colors subgraph titles from the palette', () => {
    expect(mermaidConfig.themeVariables.titleColor).toBe('#416261')
  })

  // cr-196-5 (devswamp-199): a wide diagram scrolls sideways; keyboard-only readers need focus to scroll it.
  it('makes the diagram card a focusable, labelled region', async () => {
    const html = await render(post, 'md')
    const card = html.match(/<div[^>]*data-mermaid[^>]*>/)?.[0] ?? ''
    expect(card).toContain('tabindex="0"')
    expect(card).toContain('role="region"')
    expect(card).toMatch(/aria-label="[^"]+"/)
  })
})
