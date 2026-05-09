import { describe, expect, it } from 'vitest'
import {
  getAllPosts,
  getPost,
  getAllProjects,
  getProject,
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

  it('includes pursinator and idle-chapters', () => {
    const slugs = getAllProjects().map(p => p.slug)
    expect(slugs).toContain('pursinator')
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
    const project = getProject('pursinator')
    expect(project).toBeDefined()
    expect(project?.slug).toBe('pursinator')
    expect(project?.title).toBe('Pursinator')
    expect(project?.status).toBe('in-progress')
    expect(project?.tech).toEqual(['Next.js', 'TypeScript', 'PostgreSQL'])
    expect(project?.repo).toBe('https://github.com/kagarmoe/pursinator')
    expect(project?.content).toContain('## Overview')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProject('does-not-exist')).toBeUndefined()
  })
})
