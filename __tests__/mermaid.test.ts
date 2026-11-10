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
})
