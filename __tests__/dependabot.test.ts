import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'

// oikos' vuln-scan merges green Dependabot PRs unattended; what it holds for the
// person depends on how this file groups updates (devswamp-162).
type Update = {
  'package-ecosystem': string
  'open-pull-requests-limit'?: number
  ignore?: unknown
  groups?: Record<string, { patterns?: string[]; 'update-types'?: string[] }>
}

const raw = fs.readFileSync(path.join(process.cwd(), '.github/dependabot.yml'), 'utf8')
const config = matter(`---\n${raw}\n---\n`).data as { updates: Update[] }
const npm = config.updates.find((u) => u['package-ecosystem'] === 'npm')!

describe('.github/dependabot.yml', () => {
  it('groups the framework first, so its updates never join the auto-merged group', () => {
    const [first, ...rest] = Object.entries(npm.groups ?? {})
    expect(first).toEqual(['framework', { patterns: ['next', 'react', 'react-dom'] }])
    expect(rest).toEqual([['minor-and-patch', { 'update-types': ['minor', 'patch'] }]])
  })

  it('never uses ignore, which would also drop security fixes', () => {
    expect(config.updates.every((u) => u.ignore === undefined)).toBe(true)
  })

  it('leaves room above the default 5 open PRs for held majors', () => {
    expect(npm['open-pull-requests-limit']).toBe(10)
  })
})
