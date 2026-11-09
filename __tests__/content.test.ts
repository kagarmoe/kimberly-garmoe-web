import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  getAllPosts,
  getPost,
  getAllProjects,
  getProject,
  loadPosts,
} from '@/lib/content'

describe('getAllPosts', () => {
  it('returns an array of posts', () => {
    const posts = getAllPosts()
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it('returns posts sorted by date descending', () => {
    const posts = getAllPosts()
    for (let i = 1; i < posts.length; i++) {
      expect(
        new Date(posts[i - 1].date).getTime(),
      ).toBeGreaterThanOrEqual(new Date(posts[i].date).getTime())
    }
  })

  it('returns posts with required fields', () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect(typeof post.slug).toBe('string')
      expect(typeof post.title).toBe('string')
      expect(typeof post.description).toBe('string')
      expect(typeof post.date).toBe('string')
      expect(typeof post.content).toBe('string')
    }
  })
})

describe('getPost', () => {
  it('returns the post with the matching slug', () => {
    const post = getPost('hello')
    expect(post).toBeDefined()
    expect(post?.slug).toBe('hello')
    expect(post?.title).toBe('Hello')
    expect(post?.description).toBe('First post placeholder.')
    expect(post?.date).toBe('2026-05-06')
    expect(post?.content).toContain('Content here.')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getPost('does-not-exist')).toBeUndefined()
  })
})

describe('getAllProjects', () => {
  it('returns an array of projects', () => {
    const projects = getAllProjects()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('includes adored and idle-chapters', () => {
    const slugs = getAllProjects().map(p => p.slug)
    expect(slugs).toContain('adored')
    expect(slugs).toContain('idle-chapters')
  })

  it('returns projects with required fields', () => {
    const projects = getAllProjects()
    for (const project of projects) {
      expect(typeof project.slug).toBe('string')
      expect(typeof project.title).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(typeof project.status).toBe('string')
      expect(typeof project.content).toBe('string')
    }
  })
})

describe('getProject', () => {
  it('returns the project with the matching slug', () => {
    const project = getProject('adored')
    expect(project).toBeDefined()
    expect(project?.slug).toBe('adored')
    expect(project?.title).toBe('Adored')
    expect(project?.status).toBe('in-progress')
    expect(project?.tech).toEqual(['Next.js', 'TypeScript', 'PostgreSQL'])
    expect(project?.docs).toBe('https://kagarmoe.github.io/adored/')
    expect(project?.content).toContain('## Overview')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProject('does-not-exist')).toBeUndefined()
  })
})

describe('loadPosts (devswamp-175)', () => {
  const dirWith = (files: Record<string, string>) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-'))
    for (const [name, raw] of Object.entries(files)) {
      fs.writeFileSync(path.join(dir, name), raw)
    }
    return dir
  }
  const post = (front: string, body = 'Body.') => `---\n${front}\n---\n\n${body}\n`

  it('reads plain .md posts as well as .mdx, keeping each format', () => {
    const posts = loadPosts(
      dirWith({
        'a.md': post('title: A\ndate: "2026-11-01"', 'Uses { and < freely.'),
        'b.mdx': post('title: B\ndate: "2026-11-02"'),
        'notes.txt': 'ignored',
      }),
    )
    expect(posts.map(p => [p.slug, p.format])).toEqual([
      ['b', 'mdx'],
      ['a', 'md'],
    ])
  })

  it('fails on a slug present as both .md and .mdx', () => {
    const dir = dirWith({
      'a.md': post('title: A\ndate: "2026-11-01"'),
      'a.mdx': post('title: A\ndate: "2026-11-01"'),
    })
    expect(() => loadPosts(dir)).toThrow(/a\.md and a\.mdx/)
  })

  it('fails on a post without a title or a valid date, so the build fails', () => {
    expect(() =>
      loadPosts(dirWith({ 'x.md': post('date: "2026-11-01"') })),
    ).toThrow(/x\.md: title is required/)
    expect(() =>
      loadPosts(dirWith({ 'y.md': post('title: Y') })),
    ).toThrow(/y\.md: date must be YYYY-MM-DD/)
    expect(() =>
      loadPosts(dirWith({ 'z.md': post('title: Z\ndate: "soon"') })),
    ).toThrow(/z\.md: date must be YYYY-MM-DD/)
    // devswamp-177: an impossible date fails instead of rolling over to March.
    expect(() =>
      loadPosts(dirWith({ 'feb.md': post('title: F\ndate: "2026-02-30"') })),
    ).toThrow(/feb\.md: date must be YYYY-MM-DD/)
    // devswamp-178: unquoted, YAML rolls it over before the loader sees it.
    expect(() =>
      loadPosts(dirWith({ 'feb2.md': post('title: F\ndate: 2026-02-30') })),
    ).toThrow(/feb2\.md: date must be YYYY-MM-DD/)
  })

  it('accepts a valid unquoted date', () => {
    const [p] = loadPosts(
      dirWith({ 'nov.md': post('title: N\ndate: 2026-11-01') }),
    )
    expect(p.date).toBe('2026-11-01')
  })
})
