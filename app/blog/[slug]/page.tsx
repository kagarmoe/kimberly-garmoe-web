import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16 mb-16">
        <div>
          <time
            dateTime={post.date}
            className="font-display text-label uppercase text-text-muted"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <div className="border-t-[3px] border-accent pt-6">
          <h1 className="font-display text-heading text-text-primary mb-4">
            {post.title}
          </h1>
          <p className="font-body text-xl text-text-muted">{post.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
        <div />
        <div className="prose max-w-none font-body">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </main>
  )
}
