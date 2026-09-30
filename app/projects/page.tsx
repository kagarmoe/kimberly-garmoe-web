import { getAllProjects } from '@/lib/content'
import { ProjectEntry } from '@/components/projects/ProjectEntry'
import { Page, PageHeader } from '@/components/layout/PageHeader'

export const metadata = {
  title: 'Projects',
  description: 'Projects and applications by Kimberly Garmoe.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <Page>
        <PageHeader eyebrow="Projects" title="Work" subtitle="Things built to find out how they actually work." />
        <div>
          {projects.map(project => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
    </Page>
  )
}
