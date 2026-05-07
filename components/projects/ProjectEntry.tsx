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
    <article className="py-10 border-b border-surface">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
        <div>
          <p className="font-display text-label uppercase text-text-muted">
            {statusLabel[project.status]}
          </p>
          {project.tech && (
            <p className="font-display text-label text-text-muted mt-2 normal-case tracking-normal">
              {project.tech.join(', ')}
            </p>
          )}
        </div>
        <div>
          <h2 className="font-display text-heading text-text-primary mb-3">
            <Link
              href={`/projects/${project.slug}`}
              className="no-underline hover:text-accent transition-colors"
            >
              {project.title}
            </Link>
          </h2>
          <p className="font-body text-body text-text-muted">{project.description}</p>
        </div>
      </div>
    </article>
  )
}
