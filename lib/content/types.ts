export type Post = {
  slug: string
  title: string
  description: string
  date: string
  content: string
  /** md renders as plain Markdown (raw HTML dropped); mdx allows JSX. */
  format: 'md' | 'mdx'
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
  docs?: string
  draft?: boolean
}
