import { isValidElement, type ComponentProps } from 'react'
import { Mermaid } from './Mermaid'

type Code = { className?: string; children?: unknown }

// MDX renders a ```mermaid fence as <pre><code className="language-mermaid">.
function mermaidSource(children: unknown): string | undefined {
  if (!isValidElement<Code>(children)) return undefined
  const { className, children: code } = children.props
  return className?.split(' ').includes('language-mermaid') && typeof code === 'string'
    ? code
    : undefined
}

/** Components for post bodies: a ```mermaid fence draws its diagram. */
export const mdxComponents = {
  pre: (props: ComponentProps<'pre'>) => {
    const chart = mermaidSource(props.children)
    return chart ? <Mermaid chart={chart} /> : <pre {...props} />
  },
}
