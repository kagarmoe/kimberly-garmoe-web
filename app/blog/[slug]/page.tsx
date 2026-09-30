import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost } from '@/lib/content'
import { Page, PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Page>
        <PageHeader eyebrow={date} title={post.title} subtitle={post.description} />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div />
          <div className="prose max-w-prose">
            <MDXRemote source={post.content} />
          </div>
        </div>
    </Page>
  )
}
