# kimberly-garmoe-web Design

**Date:** 2026-05-06  
**Status:** Approved  
**Domain:** kimberlygarmoe.com (registered in Vercel)

---

## What this site is

Public-facing web layer for all projects, writing, and portfolio content associated with kimberlygarmoe.com. Not a monorepo — independent apps (Pursinator, Idle Chapters) live in separate repos and deploy separately. This site is the map of the work.

---

## Visual System

### Design truth

Kimberly builds structure inside complex, evolving systems — taxonomy, ontology, retrieval, cryptography. She came from library science and history; precision in service of access is the through-line. The LinkedIn fractal banner is the right metaphor for the work: complex systems with underlying order. The design should feel like revealed architecture, not a developer portfolio.

### Color

Built in HSL. One accent color used with conviction, not distributed as tint.

```
--ground:      hsl(210, 35%, 8%)     deep blue-teal (primary background)
--surface:     hsl(210, 30%, 12%)    cards, elevated surfaces
--accent:      hsl(38, 85%, 48%)     warm gold — appears sparingly, earns its place
--text:        hsl(38, 15%, 88%)     warm cream (not pure white)
--text-muted:  hsl(210, 15%, 55%)    teal-grey for secondary content
--teal:        hsl(200, 55%, 45%)    links, subtle highlights
```

Specific values subject to refinement against the actual dark ground in the browser.

### Typography

**Principle:** one display face that makes an argument, one body face that holds the ground. Audible contrast between them — different enough that the relationship is deliberate.

The display face should say "precise, structured, systematic" — a mono or technically-inflected face that is earned for someone who builds knowledge infrastructure, not ironic. The body face should be warmer and humanist — readable at length, providing real contrast to the display.

Specific typefaces chosen during implementation where they can be seen together. Loaded via `next/font/google`, exposed as CSS variables (`--font-display`, `--font-body`).

**Scale:**
- Display: `clamp(3.5rem, 10vw, 9rem)`, line-height `0.9`, tracking `-0.03em`
- Heading: `clamp(1.75rem, 4vw, 3.5rem)`, line-height `1.05`
- Label/eyebrow: `0.6875rem`, `letter-spacing: 0.12em`, uppercase
- Body: `clamp(0.9375rem, 1.5vw, 1.0625rem)`, line-height `1.6`

Energy comes from the gap between display and label — nothing mediating between them.

### Layout

Flush left throughout. No centered hero. Asymmetric.

Hero uses a poster layout: name in large display type, headshot positioned asymmetrically to the right, single positioning sentence below, thin horizontal rule at the bottom. One deliberate grid violation — the display name bleeds slightly past its column edge.

Interior pages use an editorial column grid: narrow left margin column for labels/dates/metadata (vertical type where appropriate), wide right content column.

Generous section spacing (`clamp(5rem, 12vw, 14rem)` between sections). Asymmetric padding — direction matters.

### Texture

Film grain on the dark ground via CSS SVG turbulence filter (`opacity: 0.04`, `mix-blend-mode: screen`) on `body::before`. Stronger grain on the hero surface (`opacity: 0.08`).

Horizontal rules between sections — no rounded cards with grey drop shadows. Shadows use color (teal hue), never `rgba(0,0,0,x)`.

### Headshot treatment

Duotone: `filter: grayscale(1) contrast(1.2)` with gold/accent background behind via `mix-blend-mode: multiply`. Connects the portrait to the palette; gives it materiality.

---

## Route Structure

| Route | Content | State |
|---|---|---|
| `/` | Hero (name + headshot + positioning sentence) + navigation into site areas | Real content |
| `/aboutme` | Narrative summary → résumé sections (Experience, Education, Skills, Certs) + PDF download | Real content |
| `/blog` | Post index | Placeholder (no fake posts) |
| `/blog/[slug]` | MDX post — title, date, body in editorial column layout | Placeholder |
| `/projects` | Project index — horizontal entries with rules | Two real entries |
| `/projects/[slug]` | MDX — overview, status, tech notes, screenshots, links | Placeholder content |

Initial project entries: **Pursinator** (`/projects/pursinator`) and **Idle Chapters** (`/projects/idle-chapters`).

---

## Component Architecture

### shadcn/ui (utility layer only)
- Navigation shell
- Future forms (contact, search)
- Utility primitives (sheet, dialog) as needed

### Custom Tailwind (all visual and layout)
- Hero component
- Editorial grid layout
- Typography system (CSS variables, scale)
- Headshot with duotone treatment
- Grain overlay (`body::before` pseudo-element)
- Section dividers (horizontal rules, not cards)
- Project entry component
- Blog post layout

### Content layer
- MDX files in `content/blog/` and `content/projects/`
- `lib/content/` reads and types frontmatter (title, date, slug, status, description)
- Static generation at build time — no database, no API
- Adding content = adding an MDX file

---

## Tech Stack

- Next.js 15, App Router, TypeScript strict mode
- Tailwind CSS
- shadcn/ui (utility components only)
- MDX for blog and project content
- `next/font/google` for typography
- Vercel deployment

---

## Deployment

- **Domain:** kimberlygarmoe.com (registered in Vercel)
- **CI:** Push to `main` → production. PR branches → preview deploys.
- **Sequence:** Push repo to GitHub → connect in Vercel → configure domain → deploy.

---

## Repository Structure

```
app/
  layout.tsx
  page.tsx
  aboutme/page.tsx
  blog/
    page.tsx
    [slug]/page.tsx
  projects/
    page.tsx
    [slug]/page.tsx
components/
  layout/
  navigation/
  blog/
  projects/
  ui/          ← shadcn/ui components
content/
  blog/
  projects/
    pursinator.mdx
    idle-chapters.mdx
lib/
  content/
  metadata/
public/
  images/
    headshot.jpeg
    projects/
docs/
  plans/
```

---

## Key Principle

`kimberly-garmoe-web` = public publication layer  
Independent repos = actual products/applications  
The umbrella site is the map of the work.
