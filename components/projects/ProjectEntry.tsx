import Link from 'next/link'
import type { Project } from '@/lib/content/types'

const statusLabel: Record<Project['status'], string> = {
  active: 'Active',
  'in-progress': 'In progress',
  planned: 'Planned',
  archived: 'Archived',
}

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="py-8 md:py-10 border-b border-line">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-3 md:gap-16">
        <div className="font-mono text-[0.8rem] leading-relaxed">
          <p className="label text-ochre">{statusLabel[project.status]}</p>
          {project.tech && <p className="text-ink-muted mt-1">{project.tech.join(', ')}</p>}
        </div>
        <div>
          <h2 className="font-display font-extrabold text-heading text-ink mb-3">
            <Link href={`/projects/${project.slug}`} className="no-underline hover:text-gold transition-colors">
              {project.title}
            </Link>
          </h2>
          <p className="text-ink-muted max-w-prose">{project.description}</p>
        </div>
      </div>
    </article>
  )
}
