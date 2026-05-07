import { getAllPosts } from '@/lib/content'
import { PostEntry } from '@/components/blog/PostEntry'

export const metadata = {
  title: 'Writing',
  description: 'Essays and technical notes by Kimberly Garmoe.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      <div className="mb-16 border-t-[3px] border-accent pt-6 bg-accent/8 -mx-8 px-8">
        <p className="font-display text-label uppercase text-text-muted mb-4">Writing</p>
        <h1 className="font-display text-heading text-text-primary">Essays & Notes</h1>
      </div>
      {posts.length === 0 ? (
        <p className="font-body text-body text-text-muted">Writing forthcoming.</p>
      ) : (
        <div>
          {posts.map(post => (
            <PostEntry key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
