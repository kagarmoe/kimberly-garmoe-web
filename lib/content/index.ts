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

function parsePost(slug: string, file: string, raw: string): Post {
  const { data, content, matter: frontMatter } = matter(raw)
  // A post that would render wrong fails the build instead (devswamp-175).
  if (typeof data.title !== 'string' || !data.title.trim()) {
    throw new Error(`content/blog/${file}: title is required`)
  }
  // YAML turns an unquoted date into a Date and rolls 2026-02-30 over to March,
  // so check the date as written (devswamp-178).
  const date = data.date instanceof Date
    ? (frontMatter.match(/^date:\s*(\S+)\s*$/m)?.[1] ?? '')
    : String(data.date ?? '')
  // Round-tripping rejects dates Date.parse rolls over, such as 2026-02-30.
  const parsed = Date.parse(date)
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsed) ||
    new Date(parsed).toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`content/blog/${file}: date must be YYYY-MM-DD`)
  }
  return {
    slug,
    title: data.title,
    description: String(data.description ?? ''),
    date,
    content,
    format: file.endsWith('.md') ? 'md' : 'mdx',
    draft: Boolean(data.draft),
  }
}

/** Every post in `dir`, `.md` or `.mdx`, newest first; fails on a slug in both formats. */
export function loadPosts(dir: string): Post[] {
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => /\.mdx?$/.test(f))
  const seen = new Map<string, string>()
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '')
    const other = seen.get(slug)
    if (other) {
      const [md, mdx] = [other, file].sort()
      throw new Error(`content/blog: ${md} and ${mdx} are the same post; keep one`)
    }
    seen.set(slug, file)
  }
  return files
    .map(file =>
      parsePost(file.replace(/\.mdx?$/, ''), file, fs.readFileSync(path.join(dir, file), 'utf8')),
    )
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
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
    docs: data.docs ? String(data.docs) : undefined,
    draft: Boolean(data.draft),
  }
}

export function getAllPosts(): Post[] {
  return loadPosts(path.join(CONTENT_ROOT, 'blog'))
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
