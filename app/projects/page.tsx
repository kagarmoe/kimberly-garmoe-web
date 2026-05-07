import { getAllProjects } from '@/lib/content'
import { ProjectEntry } from '@/components/projects/ProjectEntry'

export const metadata = {
  title: 'Projects — Kimberly Garmoe',
  description: 'Projects and applications by Kimberly Garmoe.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      <div className="mb-16 border-t-[3px] border-accent pt-6">
        <p className="font-display text-label uppercase text-text-muted mb-4">Projects</p>
        <h1 className="font-display text-heading text-text-primary">Work</h1>
      </div>
      <div>
        {projects.map(project => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
    </main>
  )
}
