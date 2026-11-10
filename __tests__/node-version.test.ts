import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'

// Vercel builds and runs on package.json's engines.node; CI tests on test.yml's
// node-version. If they drift, tests pass on one Node and production runs another
// (devswamp-195). @types/node follows the same major, so a Dependabot bump past
// the runtime fails here instead of being merged.
const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), 'utf8')
const pkg = JSON.parse(read('package.json'))
const workflow = matter(`---\n${read('.github/workflows/test.yml')}\n---\n`).data
const ciNode = String(
  workflow.jobs.test.steps.find((s: { uses?: string }) => s.uses?.startsWith('actions/setup-node'))
    .with['node-version'],
)
const major = (range: string) => range.match(/\d+/)?.[0]

describe('Node version', () => {
  it('is 24 in CI', () => {
    expect(ciNode).toBe('24')
  })

  it('is the same major for Vercel (engines.node) as in CI', () => {
    expect(pkg.engines.node).toBe(`${ciNode}.x`)
  })

  it('has @types/node on the runtime major', () => {
    expect(major(pkg.devDependencies['@types/node'])).toBe(ciNode)
  })
})
