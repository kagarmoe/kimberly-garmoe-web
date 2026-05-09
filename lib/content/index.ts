import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Post, Project, ProjectStatus } from './types'

export type { Post, Project, ProjectStatus } from './types'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

function readMdxDir(subdir: string): { slug: string; raw: string }[] {
  const dir = path.join(CONTENT_ROOT, subdir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
      raw: fs.readFileSync(path.join(dir, file), 'utf8'),
    }))
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw)
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: normalizeDate(data.date),
    content,
    draft: Boolean(data.draft),
  }
}

function parseProject(slug: string, raw: string): Project {
  const { data, content } = matter(raw)
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    status: (data.status ?? 'planned') as ProjectStatus,
    content,
    tech: Array.isArray(data.tech) ? data.tech.map(String) : undefined,
    repo: data.repo ? String(data.repo) : undefined,
    live: data.live ? String(data.live) : undefined,
    draft: Boolean(data.draft),
  }
}

export function getAllPosts(): Post[] {
  return readMdxDir('blog')
    .map(({ slug, raw }) => parsePost(slug, raw))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return readMdxDir('projects')
    .map(({ slug, raw }) => parseProject(slug, raw))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find(p => p.slug === slug)
}
