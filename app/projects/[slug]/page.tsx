import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProject } from '@/lib/content'
import { Page, PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <Page>
        <PageHeader eyebrow={project.status} title={project.title} subtitle={project.description} />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div className="font-mono text-[0.8rem] text-ink-muted leading-relaxed">
            {project.tech && <p>{project.tech.join(', ')}</p>}
            {(project.repo || project.live) && (
              <ul className="list-none m-0 p-0 mt-4 space-y-1">
                {project.repo && <li><a href={project.repo}>Repository ↗</a></li>}
                {project.live && <li><a href={project.live}>Live ↗</a></li>}
              </ul>
            )}
          </div>
          <div className="prose max-w-prose">
            <MDXRemote source={project.content} />
          </div>
        </div>
    </Page>
  )
}
