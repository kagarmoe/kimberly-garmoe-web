import Link from 'next/link'
import type { Post } from '@/lib/content/types'

export function PostEntry({ post }: { post: Post }) {
  return (
    <article className="py-8 md:py-10 border-b border-line">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-3 md:gap-16">
        <time dateTime={post.date} className="font-mono text-[0.8rem] text-ink-muted">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </time>
        <div>
          <h2 className="font-display font-extrabold text-heading text-ink mb-3">
            <Link href={`/blog/${post.slug}`} className="no-underline hover:text-gold transition-colors">
              {post.title}
            </Link>
          </h2>
          <p className="text-ink-muted max-w-prose">{post.description}</p>
        </div>
      </div>
    </article>
  )
}
