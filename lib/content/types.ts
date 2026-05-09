export type Post = {
  slug: string
  title: string
  description: string
  date: string
  content: string
  draft?: boolean
}

export type ProjectStatus = 'active' | 'in-progress' | 'planned' | 'archived'

export type Project = {
  slug: string
  title: string
  description: string
  status: ProjectStatus
  content: string
  tech?: string[]
  repo?: string
  live?: string
  draft?: boolean
}
