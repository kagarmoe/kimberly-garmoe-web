# kimberly-garmoe-web Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy kimberly-garmoe-web — a personal site with editorial dark design, full route scaffold, and MDX content layer at kimberlygarmoe.com.

**Architecture:** Next.js 15 App Router with custom Tailwind design system (dark editorial aesthetic) and shadcn/ui for utility components only. Content is MDX files in `content/` read by a typed `lib/content/` module; all pages statically generated at build time. No database, no auth, no API routes in this phase.

**Tech Stack:** Next.js 15, TypeScript strict, Tailwind CSS, shadcn/ui (utility only), next-mdx-remote, gray-matter, next/font/google, Vercel

---

## Task 1: Initialize Next.js project

**Files:**
- Create: project root (replaces current empty repo state)

**Step 1: Scaffold**

```bash
cd /Users/kimberlygarmoe/repos/kimberly-garmoe-web
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Answer prompts: yes to TypeScript, yes to Tailwind, yes to App Router, no src dir, `@/*` alias.

**Step 2: Verify it runs**

```bash
npm run dev
```

Visit http://localhost:3000. Should show the default Next.js page.

**Step 3: Remove boilerplate**

Delete `app/page.tsx` contents (keep the file), replace with:
```tsx
export default function Page() {
  return <main>kimberly-garmoe-web</main>
}
```

Remove `public/vercel.svg`, `public/next.svg`. Clear `app/globals.css` of all default styles (keep the file, wipe content).

**Step 4: Verify build**

```bash
npm run build
```

Expected: clean build, no errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "Initialize Next.js 15 project"
```

---

## Task 2: Set up Beads for work tracking

**Step 1: Initialize beads**

In Claude Code, run: `/beads init`

Follow prompts to set up the project workspace.

**Step 2: Create epics**

Create the following epics in beads:
- "Design system" — Tailwind config, fonts, grain, CSS variables
- "Core layout" — root layout, navigation
- "Landing page" — hero, positioning
- "About page" — narrative + résumé sections
- "Content layer" — MDX reading, typing, rendering
- "Blog" — index and post template
- "Projects" — index and project template  
- "Deployment" — GitHub push, Vercel connect, domain

**Step 3: Commit**

```bash
git add -A
git commit -m "Add beads workspace"
```

---

## Task 3: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install content dependencies**

```bash
npm install next-mdx-remote gray-matter
npm install --save-dev @types/mdx
```

**Step 2: Install shadcn/ui**

```bash
npx shadcn@latest init
```

Choose: Dark style, slate base color, yes to CSS variables.

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "Add content and UI dependencies"
```

---

## Task 4: Design system — Tailwind config and CSS variables

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Update tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ground: 'hsl(var(--ground) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'text-primary': 'hsl(var(--text) / <alpha-value>)',
        'text-muted': 'hsl(var(--text-muted) / <alpha-value>)',
        teal: 'hsl(var(--teal) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        display: ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        heading: ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.12em' }],
        body: ['clamp(0.9375rem, 1.5vw, 1.0625rem)', { lineHeight: '1.6' }],
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 2: Write globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ground: 210 35% 8%;
  --surface: 210 30% 12%;
  --accent: 38 85% 48%;
  --text: 38 15% 88%;
  --text-muted: 210 15% 55%;
  --teal: 200 55% 45%;
}

@layer base {
  html {
    background-color: hsl(var(--ground));
    color: hsl(var(--text));
  }

  body {
    font-family: var(--font-body);
    font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
    line-height: 1.6;
    position: relative;
  }

  /* Film grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    mix-blend-mode: screen;
  }

  a {
    color: hsl(var(--teal));
  }

  a:hover {
    color: hsl(var(--accent));
  }

  /* Section rule dividers */
  .section-rule {
    border-top: 1px solid hsl(var(--surface));
  }

  /* Thick accent rule */
  .accent-rule {
    border-top: 3px solid hsl(var(--accent));
  }
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "Add design system — Tailwind config and CSS variables"
```

---

## Task 5: Typography — load fonts

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Choose and load fonts**

Open https://fonts.google.com and compare these candidates side by side before choosing:

Display candidates (make the "precise, structured" argument):
- `JetBrains_Mono` — technical precision, strong at large sizes
- `IBM_Plex_Mono` — IBM heritage, authoritative
- `Fragment_Mono` — newer, distinctive

Body candidates (warm, humanist, readable at length):
- `Lora` — warm, editorial, literary
- `Source_Serif_4` — very readable, designed for long-form
- `Newsreader` — editorial, reading-focused

Pick one display + one body. Then update `app/layout.tsx`:

```tsx
import { JetBrains_Mono, Lora } from 'next/font/google'
// Replace with your chosen fonts above

const displayFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-display',
})

const bodyFont = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

**Step 2: Spot-check at large scale**

Add temporarily to `app/page.tsx`:
```tsx
<h1 className="font-display text-display">Kimberly Garmoe</h1>
<p className="font-body text-body">Knowledge systems as infrastructure.</p>
```

Run `npm run dev`, visit http://localhost:3000. Judge the pairing. Swap fonts if needed. When satisfied, remove the temporary test content.

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "Add typography — display and body fonts via next/font"
```

---

## Task 6: Navigation component

**Files:**
- Create: `components/navigation/Nav.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create Nav**

```tsx
// components/navigation/Nav.tsx
import Link from 'next/link'

const links = [
  { href: '/aboutme', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

export function Nav() {
  return (
    <nav className="flex justify-between items-center px-8 py-6 border-b border-surface">
      <Link
        href="/"
        className="font-display text-label uppercase tracking-widest text-text-primary no-underline hover:text-accent transition-colors"
      >
        Kimberly Garmoe
      </Link>
      <ul className="flex gap-8 list-none m-0 p-0">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-display text-label uppercase tracking-widest text-text-muted no-underline hover:text-text-primary transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**Step 2: Add to layout**

```tsx
// app/layout.tsx — add Nav inside body
import { Nav } from '@/components/navigation/Nav'

// inside <body>:
<Nav />
{children}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add components/navigation/Nav.tsx app/layout.tsx
git commit -m "Add navigation component"
```

---

## Task 7: Landing page hero

**Files:**
- Modify: `app/page.tsx`
- Create: `components/layout/Hero.tsx`
- Copy: `public/images/headshot.jpeg` (copy from repo root)

**Step 1: Copy headshot to public**

```bash
mkdir -p public/images
cp headshot.jpeg public/images/headshot.jpeg
```

**Step 2: Create Hero component**

```tsx
// components/layout/Hero.tsx
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-end px-8 pb-16 overflow-hidden">
      {/* Stronger grain on hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.08 }}
        aria-hidden
      />

      {/* Headshot — asymmetric right */}
      <div className="absolute right-8 top-16 w-64 md:w-80">
        <div className="relative">
          <div
            className="absolute inset-0 bg-accent"
            style={{ transform: 'translate(8px, 8px)' }}
          />
          <Image
            src="/images/headshot.jpeg"
            alt="Kimberly Garmoe"
            width={400}
            height={500}
            priority
            className="relative grayscale contrast-125 mix-blend-multiply"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Main text — flush left, poster layout */}
      <div className="relative z-10 max-w-3xl">
        {/* Eyebrow label */}
        <p className="font-display text-label uppercase text-text-muted mb-6">
          Seattle, WA
        </p>

        {/* Name — display scale, bleeds slightly */}
        <h1
          className="font-display text-display text-text-primary mb-8"
          style={{ marginLeft: '-0.03em' }} /* optical alignment */
        >
          Kimberly
          <br />
          Garmoe
        </h1>

        {/* Positioning sentence */}
        <p className="font-body text-xl text-text-muted max-w-xl leading-relaxed">
          Information architect building knowledge systems for AI —
          taxonomy, retrieval, and structure that scales.
        </p>

        {/* Rule */}
        <div className="mt-12 border-t border-surface w-full" />
      </div>
    </section>
  )
}
```

**Step 3: Update page.tsx**

```tsx
// app/page.tsx
import { Hero } from '@/components/layout/Hero'

export default function Page() {
  return (
    <main>
      <Hero />
      {/* Navigation links into site areas */}
      <section className="px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-surface">
        {[
          { href: '/aboutme', label: 'About', desc: 'Background, experience, résumé' },
          { href: '/blog', label: 'Writing', desc: 'Essays and technical notes' },
          { href: '/projects', label: 'Projects', desc: 'Pursinator, Idle Chapters, and others' },
        ].map(({ href, label, desc }) => (
          <a
            key={href}
            href={href}
            className="block px-0 py-8 md:px-8 border-b md:border-b-0 md:border-l border-surface first:border-l-0 group no-underline"
          >
            <p className="font-display text-label uppercase text-text-muted mb-2 group-hover:text-accent transition-colors">
              {label}
            </p>
            <p className="font-body text-body text-text-muted">{desc}</p>
          </a>
        ))}
      </section>
    </main>
  )
}
```

**Step 4: Run dev and review**

```bash
npm run dev
```

Visit http://localhost:3000. Check: large name, asymmetric headshot with duotone treatment, grain visible, navigation links below. Adjust sizing, spacing, or layout as needed to match the design intent — the code above is a starting point, not a prescription.

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add app/page.tsx components/layout/Hero.tsx public/images/headshot.jpeg
git commit -m "Add landing page hero"
```

---

## Task 8: Content layer — lib/content

**Files:**
- Create: `lib/content/index.ts`
- Create: `lib/content/types.ts`

**Step 1: Create content types**

```ts
// lib/content/types.ts
export type PostFrontmatter = {
  title: string
  date: string         // ISO string: "2026-05-06"
  description: string
  draft?: boolean
}

export type ProjectFrontmatter = {
  title: string
  description: string
  status: 'active' | 'in-progress' | 'planned' | 'archived'
  tech?: string[]
  repo?: string
  live?: string
  draft?: boolean
}

export type Post = PostFrontmatter & {
  slug: string
  content: string
}

export type Project = ProjectFrontmatter & {
  slug: string
  content: string
}
```

**Step 2: Create content reader**

```ts
// lib/content/index.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter, Project, ProjectFrontmatter } from './types'

const contentDir = path.join(process.cwd(), 'content')

function readDir(dir: string): string[] {
  const full = path.join(contentDir, dir)
  if (!fs.existsSync(full)) return []
  return fs.readdirSync(full).filter(f => f.endsWith('.mdx'))
}

function readFile(dir: string, filename: string) {
  const full = path.join(contentDir, dir, filename)
  const raw = fs.readFileSync(full, 'utf-8')
  return matter(raw)
}

export function getAllPosts(): Post[] {
  return readDir('blog')
    .map(filename => {
      const { data, content } = readFile('blog', filename)
      const frontmatter = data as PostFrontmatter
      if (frontmatter.draft) return null
      return {
        ...frontmatter,
        slug: filename.replace('.mdx', ''),
        content,
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as Post[]
}

export function getPost(slug: string): Post | null {
  const filename = `${slug}.mdx`
  try {
    const { data, content } = readFile('blog', filename)
    return { ...(data as PostFrontmatter), slug, content }
  } catch {
    return null
  }
}

export function getAllProjects(): Project[] {
  return readDir('projects')
    .map(filename => {
      const { data, content } = readFile('projects', filename)
      const frontmatter = data as ProjectFrontmatter
      if (frontmatter.draft) return null
      return {
        ...frontmatter,
        slug: filename.replace('.mdx', ''),
        content,
      }
    })
    .filter(Boolean) as Project[]
}

export function getProject(slug: string): Project | null {
  const filename = `${slug}.mdx`
  try {
    const { data, content } = readFile('projects', filename)
    return { ...(data as ProjectFrontmatter), slug, content }
  } catch {
    return null
  }
}
```

**Step 3: Create content directories**

```bash
mkdir -p content/blog content/projects
```

**Step 4: Add a test MDX file to verify parsing**

```bash
cat > content/blog/hello.mdx << 'EOF'
---
title: Hello
date: "2026-05-06"
description: First post placeholder.
draft: true
---

Content here.
EOF
```

**Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 6: Verify build**

```bash
npm run build
```

**Step 7: Commit**

```bash
git add lib/ content/
git commit -m "Add content layer — typed MDX reader for blog and projects"
```

---

## Task 9: Project MDX files

**Files:**
- Create: `content/projects/pursinator.mdx`
- Create: `content/projects/idle-chapters.mdx`

**Step 1: Create pursinator.mdx**

```mdx
---
title: Pursinator
description: A collection-management and ranking application for evaluating what to keep, review, or sell.
status: in-progress
tech: [Next.js, TypeScript, PostgreSQL]
repo: https://github.com/kagarmoe/pursinator
draft: false
---

## Overview

Pursinator is a collection management system designed to help users evaluate and refine what they own. Initially focused on handbags and accessories, the underlying model is broader: a system for curation, ranking, and preference mapping across any collection.

The core problem it solves is not inventory — it's decision support. What stays? What goes? What deserves a closer look?

## What it does

- Tracks items in a collection with rich metadata
- Provides ranking and comparison workflows
- Maps emotional and practical preference signals
- Supports weeding decisions with structured criteria

## Status

In progress. Core data model and ranking logic under development.

## Technical notes

Separate deployment from kimberly-garmoe-web. Auth, user state, and collection data live in the pursinator repo. This page is the public-facing project writeup.
```

**Step 2: Create idle-chapters.mdx**

```mdx
---
title: Idle Chapters
description: A cozy text-based RPG and interactive fiction system built on procedural storylets and narrative architecture.
status: planned
tech: [TypeScript, Next.js]
repo: https://github.com/kagarmoe/idle-chapters
draft: false
---

## Overview

Idle Chapters is a cozy text RPG focused on low-pressure exploration, worldbuilding, and narrative systems. It is built around the storylet model: small, self-contained narrative units that compose into larger experiences based on player state.

## Design principles

- Constrained lexicons — deliberate, specific vocabulary for each world
- Schema-driven narrative — story content as structured data, not prose scripts
- Cozy gameplay structures — no failure states, no time pressure
- Procedural composition — storylets assemble into coherent arcs

## Status

Planned. Narrative architecture and schema design in early stages.

## Technical notes

Separate deployment from kimberly-garmoe-web. Game state, storylet engine, and web UI will live in the idle-chapters repo.
```

**Step 3: Verify parsing**

Run a quick check:
```bash
node -e "
const {getAllProjects} = require('./lib/content/index.ts')
" 
```

(This won't run directly without ts-node, but `npm run build` will catch type errors.)

```bash
npm run build
```

**Step 4: Commit**

```bash
git add content/projects/
git commit -m "Add project MDX files — Pursinator and Idle Chapters"
```

---

## Task 10: Projects index page

**Files:**
- Create: `app/projects/page.tsx`
- Create: `components/projects/ProjectEntry.tsx`

**Step 1: Create ProjectEntry component**

```tsx
// components/projects/ProjectEntry.tsx
import Link from 'next/link'
import type { Project } from '@/lib/content/types'

const statusLabel: Record<Project['status'], string> = {
  active: 'Active',
  'in-progress': 'In progress',
  planned: 'Planned',
  archived: 'Archived',
}

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="py-10 border-b border-surface">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
        {/* Left margin column */}
        <div>
          <p className="font-display text-label uppercase text-text-muted">
            {statusLabel[project.status]}
          </p>
          {project.tech && (
            <p className="font-display text-label text-text-muted mt-2 normal-case tracking-normal">
              {project.tech.join(', ')}
            </p>
          )}
        </div>
        {/* Content column */}
        <div>
          <h2 className="font-display text-heading text-text-primary mb-3">
            <Link
              href={`/projects/${project.slug}`}
              className="no-underline hover:text-accent transition-colors"
            >
              {project.title}
            </Link>
          </h2>
          <p className="font-body text-body text-text-muted">{project.description}</p>
        </div>
      </div>
    </article>
  )
}
```

**Step 2: Create projects index page**

```tsx
// app/projects/page.tsx
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
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add app/projects/page.tsx components/projects/
git commit -m "Add projects index page"
```

---

## Task 11: Individual project page

**Files:**
- Create: `app/projects/[slug]/page.tsx`

**Step 1: Create project page with MDX rendering**

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProject } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Kimberly Garmoe`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16 border-t-[3px] border-accent pt-6">
        <p className="font-display text-label uppercase text-text-muted mb-4">
          {project.status}
        </p>
        <h1 className="font-display text-heading text-text-primary mb-4">
          {project.title}
        </h1>
        <p className="font-body text-xl text-text-muted">{project.description}</p>
      </div>

      {/* MDX content */}
      <div className="prose prose-invert max-w-none font-body">
        <MDXRemote source={project.content} />
      </div>

      {/* Links */}
      {(project.repo || project.live) && (
        <div className="mt-16 pt-8 border-t border-surface flex gap-8">
          {project.repo && (
            <a href={project.repo} className="font-display text-label uppercase">
              Repository ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} className="font-display text-label uppercase">
              Live ↗
            </a>
          )}
        </div>
      )}
    </main>
  )
}
```

**Step 2: Install Tailwind typography plugin for MDX prose**

```bash
npm install @tailwindcss/typography
```

Add to `tailwind.config.ts` plugins:
```ts
plugins: [require('@tailwindcss/typography')],
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add app/projects/ components/ tailwind.config.ts
git commit -m "Add individual project page with MDX rendering"
```

---

## Task 12: Blog index page

**Files:**
- Create: `app/blog/page.tsx`
- Create: `components/blog/PostEntry.tsx`

**Step 1: Create PostEntry component**

```tsx
// components/blog/PostEntry.tsx
import Link from 'next/link'
import type { Post } from '@/lib/content/types'

export function PostEntry({ post }: { post: Post }) {
  return (
    <article className="py-10 border-b border-surface">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
        <div>
          <time
            dateTime={post.date}
            className="font-display text-label uppercase text-text-muted"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </time>
        </div>
        <div>
          <h2 className="font-display text-heading text-text-primary mb-3">
            <Link
              href={`/blog/${post.slug}`}
              className="no-underline hover:text-accent transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <p className="font-body text-body text-text-muted">{post.description}</p>
        </div>
      </div>
    </article>
  )
}
```

**Step 2: Create blog index page**

```tsx
// app/blog/page.tsx
import { getAllPosts } from '@/lib/content'
import { PostEntry } from '@/components/blog/PostEntry'

export const metadata = {
  title: 'Writing — Kimberly Garmoe',
  description: 'Essays and technical notes by Kimberly Garmoe.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      <div className="mb-16 border-t-[3px] border-accent pt-6">
        <p className="font-display text-label uppercase text-text-muted mb-4">Writing</p>
        <h1 className="font-display text-heading text-text-primary">Essays & Notes</h1>
      </div>
      {posts.length === 0 ? (
        <p className="font-body text-body text-text-muted">Writing forthcoming.</p>
      ) : (
        <div>
          {posts.map(post => (
            <PostEntry key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add app/blog/page.tsx components/blog/
git commit -m "Add blog index page"
```

---

## Task 13: Individual blog post page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Create blog post page**

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Kimberly Garmoe`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">
      {/* Editorial column grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16 mb-16">
        {/* Left margin */}
        <div>
          <time
            dateTime={post.date}
            className="font-display text-label uppercase text-text-muted"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        {/* Heading */}
        <div className="border-t-[3px] border-accent pt-6">
          <h1 className="font-display text-heading text-text-primary mb-4">
            {post.title}
          </h1>
          <p className="font-body text-xl text-text-muted">{post.description}</p>
        </div>
      </div>

      {/* MDX content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
        <div /> {/* empty margin column */}
        <div className="prose prose-invert max-w-none font-body">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </main>
  )
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add app/blog/[slug]/
git commit -m "Add individual blog post page with editorial column layout"
```

---

## Task 14: About page

**Files:**
- Create: `app/aboutme/page.tsx`

The content below is drawn from the LinkedIn PDF. Edit the prose to match your voice — the LinkedIn export is a starting point, not final copy.

**Step 1: Create about page**

```tsx
// app/aboutme/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Kimberly Garmoe',
  description: 'Information architect and technical writer focused on knowledge systems for AI.',
}

const experience = [
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Senior Technical Writer',
    period: 'October 2022 – January 2026',
    location: 'Seattle, WA',
    description: [
      'Documented cryptographic and identity infrastructure used in regulated and high-assurance environments, with a focus on key management, signing, encryption, and trust boundaries.',
      'Began in the Protocols, Libraries & Algorithms group, documenting cryptographic libraries, Cryptographic Computing, and FIPS-related material.',
      'Later covered AWS Secrets Manager, Key Management Service, Payment Cryptography, CloudHSM, Certificate Manager, and Private Certificate Authority.',
      'Led taxonomy and information architecture work for cryptography and technical content teams, designing durable structures for complex, evolving systems.',
      'Built AI-assisted editing tools to enforce clarity, correctness, and consistency at scale.',
    ],
  },
  {
    company: 'Tecton',
    role: 'Senior Technical Writer',
    period: 'April 2022 – July 2022',
    location: 'United States',
    description: [
      'Individual contributor for machine learning feature store documentation.',
      'Collaborated with UX to create short, readable UI content.',
      'Improved documentation design, architecture, and delivery.',
    ],
  },
  {
    company: 'Chef Software',
    role: 'Manager, Technical Writing → Sr. Technical Writer',
    period: 'December 2016 – March 2022',
    location: 'Seattle, WA',
    description: [
      'Led the consolidation of product documentation from several microsites into a single website while maintaining source files in separate GitHub repositories.',
      'Managed a global team in a rapidly changing environment.',
      'The consolidated site featured federated search and automation for reference material — ensuring content stayed current, correct, and complete.',
    ],
  },
  {
    company: 'The Seattle Public Library',
    role: 'Reference Librarian',
    period: 'May 2015 – February 2016',
    location: 'Seattle, WA',
    description: [
      'Identified and interpreted user needs; provided reference, readers\' advisory, computer, database, and referral services.',
    ],
  },
  {
    company: 'UCLA',
    role: 'Collections Development Assistant & Instructor',
    period: '1998 – 2010',
    location: 'Los Angeles, CA',
    description: [
      'Applied subject matter expertise and analysis of metadata and circulation data to large-scale purchasing decisions at a research-one academic library.',
      'Developed and taught courses in history and the humanities, including From Gutenberg to Google: Media Revolutions in Comparative Perspectives.',
      'Conducted research, grant writing, and translation work in English, German, and Dutch.',
    ],
  },
]

const education = [
  { school: 'University of British Columbia', degree: 'MLIS — Library & Information Science', years: '2012–2014' },
  { school: 'University of California, Los Angeles', degree: 'MA, CPhil (ABD) — European History', years: '' },
  { school: 'Coding Dojo', degree: 'Full Stack Developer', years: '' },
  { school: 'Seattle University', degree: 'BA — History', years: '' },
]

const skills = ['Knowledge Management', 'Taxonomy & Ontology', 'Information Architecture', 'Technical Writing', 'BigTable', 'Apache Kafka', 'Python', 'JavaScript', 'Ruby']
const languages = ['English (native)', 'German (professional working)', 'Dutch (reading)']
const certifications = [
  'Advanced Programming in Python',
  'Professional Librarian\'s Life Certificate',
  'Certificate in Python Programming',
]

export default function AboutPage() {
  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">

      {/* Narrative summary */}
      <section className="mb-20">
        <div className="border-t-[3px] border-accent pt-6 mb-8">
          <p className="font-display text-label uppercase text-text-muted mb-4">About</p>
          <h1 className="font-display text-heading text-text-primary">Kimberly Garmoe</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div>
            <p className="font-display text-label uppercase text-text-muted">Seattle, WA</p>
            <p className="font-display text-label uppercase text-text-muted mt-2">
              <a href="mailto:kimberly.garmoe@gmail.com" className="hover:text-accent transition-colors">
                Contact
              </a>
            </p>
            <p className="font-display text-label uppercase text-text-muted mt-2">
              <a href="https://linkedin.com/in/kimberlygarmoe" className="hover:text-accent transition-colors">
                LinkedIn ↗
              </a>
            </p>
            <p className="font-display text-label uppercase text-text-muted mt-2">
              <a href="https://github.com/kagarmoe" className="hover:text-accent transition-colors">
                GitHub ↗
              </a>
            </p>
          </div>
          <div className="font-body text-body text-text-muted space-y-4">
            <p>
              I'm an information architect expanding into knowledge systems for AI, with a foundation
              in taxonomy and structured content, refreshed by my MLIS background, and current work
              focused on ontology, retrieval, graphs, and knowledge-centered AI systems.
            </p>
            <p>
              My background spans complex technical domains, including security, cryptography, payments,
              and identity systems. I'm particularly strong in information architecture, taxonomy, and
              content governance for environments where clarity, correctness, and long-term
              maintainability matter.
            </p>
            <p>
              I'm interested in the structures AI systems need in order to retrieve, reason over, and
              use knowledge well. This next phase of my work connects information architecture with
              ontology, retrieval, graphs, and RAG. I'm motivated by work that treats documentation
              and knowledge structures as infrastructure: precise, resilient, and designed to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Experience</p>
        </div>
        <div className="space-y-16">
          {experience.map(({ company, role, period, location, description }) => (
            <div key={company} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
              <div>
                <p className="font-display text-label uppercase text-text-muted leading-relaxed">
                  {period}
                </p>
                <p className="font-display text-label text-text-muted mt-1 normal-case tracking-normal">
                  {location}
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl text-text-primary mb-1">{company}</h2>
                <p className="font-display text-label uppercase text-text-muted mb-4">{role}</p>
                <ul className="font-body text-body text-text-muted space-y-2 list-none p-0">
                  {description.map((item, i) => (
                    <li key={i} className="before:content-['—'] before:mr-2 before:text-text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Education</p>
        </div>
        <div className="space-y-8">
          {education.map(({ school, degree, years }) => (
            <div key={school} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
              <div>
                {years && (
                  <p className="font-display text-label uppercase text-text-muted">{years}</p>
                )}
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary mb-1">{school}</h3>
                <p className="font-display text-label text-text-muted normal-case tracking-normal">{degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Languages */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Skills & Languages</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div>
            <p className="font-display text-label uppercase text-text-muted">Technical</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <span
                key={skill}
                className="font-display text-label uppercase text-text-muted border border-surface px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16 mt-8">
          <div>
            <p className="font-display text-label uppercase text-text-muted">Languages</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map(lang => (
              <span key={lang} className="font-body text-body text-text-muted">{lang}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Certifications</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div />
          <ul className="font-body text-body text-text-muted space-y-2 list-none p-0">
            {certifications.map(cert => (
              <li key={cert} className="before:content-['—'] before:mr-2 before:text-text-muted">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  )
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Run dev and review at length**

```bash
npm run dev
```

Visit http://localhost:3000/aboutme. Read through fully. Edit prose for voice — the LinkedIn export is source material, not final copy. Pay attention to the editorial column grid alignment and section rule dividers.

**Step 4: Commit**

```bash
git add app/aboutme/
git commit -m "Add about page with narrative summary and résumé sections"
```

---

## Task 15: Root layout metadata

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Add site metadata**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Kimberly Garmoe',
    template: '%s — Kimberly Garmoe',
  },
  description: 'Information architect building knowledge systems for AI. Technical writing, taxonomy, retrieval.',
  metadataBase: new URL('https://kimberlygarmoe.com'),
  openGraph: {
    siteName: 'Kimberly Garmoe',
    locale: 'en_US',
  },
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "Add site metadata"
```

---

## Task 16: Deploy to Vercel

**Step 1: Push to GitHub**

Create the GitHub repo if not yet done (via GitHub UI or `gh` CLI):
```bash
gh repo create kimberly-garmoe-web --public --source=. --push
```

Or if repo already exists:
```bash
git remote add origin https://github.com/kagarmoe/kimberly-garmoe-web.git
git push -u origin main
```

**Step 2: Connect Vercel**

Use the `vercel:deploy` skill for this step. It will:
- Connect the GitHub repo to Vercel
- Configure the kimberlygarmoe.com domain (already registered in Vercel)
- Trigger the first production deploy

**Step 3: Verify production**

Visit https://kimberlygarmoe.com. Check:
- Landing page loads with correct fonts and grain
- Navigation works across all routes
- /aboutme renders the full résumé content
- /projects shows Pursinator and Idle Chapters
- /blog shows "Writing forthcoming."
- `next build` output matches what's deployed (no build-only warnings)

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "Fix production issues"
git push
```

---

## Verification checklist before calling this done

- [ ] `npm run build` passes clean (no TypeScript errors, no missing imports)
- [ ] `npx tsc --noEmit` passes clean
- [ ] All 6 routes load in the browser without errors
- [ ] Film grain visible on dark background
- [ ] Editorial column grid aligned on /aboutme and /blog/[slug]
- [ ] Display font renders at large scale in hero
- [ ] Headshot duotone treatment visible
- [ ] Deployed to kimberlygarmoe.com
- [ ] Preview deploys work on PR branches
