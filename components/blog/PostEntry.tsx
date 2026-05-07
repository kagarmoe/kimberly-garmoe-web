import Link from 'next/link'
import type { Post } from '@/lib/content/types'

export function PostEntry({ post }: { post: Post }) {
  return (
    <article className="py-10 border-b border-surface">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
        <div>
          <time
            dateTime={post.date}
            className="font-display text-label uppercase text-text-muted"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </time>
        </div>
        <div>
          <h2 className="font-display text-heading text-text-primary mb-3">
            <Link
              href={`/blog/${post.slug}`}
              className="no-underline hover:text-accent transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <p className="font-body text-body text-text-muted">{post.description}</p>
        </div>
      </div>
    </article>
  )
}
