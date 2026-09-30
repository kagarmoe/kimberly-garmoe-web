import { getAllPosts } from '@/lib/content'
import { PostEntry } from '@/components/blog/PostEntry'
import { Page, PageHeader } from '@/components/layout/PageHeader'

export const metadata = {
  title: 'Writing',
  description: 'Essays and technical notes by Kimberly Garmoe.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <Page>
        <PageHeader eyebrow="Writing" title="Essays & Notes" subtitle="On knowledge systems, retrieval, and making things usable." />
        {posts.length === 0 ? (
          <p className="text-ink-muted">Writing forthcoming.</p>
        ) : (
          <div>
            {posts.map(post => (
              <PostEntry key={post.slug} post={post} />
            ))}
          </div>
        )}
    </Page>
  )
}
