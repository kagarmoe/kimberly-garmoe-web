import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProject } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      <div className="mb-16 border-t-[3px] border-accent pt-6 bg-accent/8 -mx-8 px-8">
        <p className="font-display text-label uppercase text-text-muted mb-4">
          {project.status}
        </p>
        <h1 className="font-display text-heading text-text-primary mb-4">
          {project.title}
        </h1>
        <p className="font-body text-xl text-text-muted">{project.description}</p>
      </div>

      <div className="prose max-w-none font-body">
        <MDXRemote source={project.content} />
      </div>

      {(project.repo || project.live) && (
        <div className="mt-16 pt-8 border-t border-surface flex gap-8">
          {project.repo && (
            <a href={project.repo} className="font-display text-label uppercase">
              Repository ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} className="font-display text-label uppercase">
              Live ↗
            </a>
          )}
        </div>
      )}
    </main>
  )
}
