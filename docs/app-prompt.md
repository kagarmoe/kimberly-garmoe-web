kimberly-garmoe-web

Public umbrella website for kimberlygarmoe.com.

⸻

Overview

Build kimberly-garmoe-web as the public-facing web layer for all projects, writing, and portfolio content associated with kimberlygarmoe.com.

This repository is not a monorepo for all applications.

Instead, it serves as:

* personal/professional landing page
* publishing platform
* blog and essay system
* project registry
* public gateway to separately deployed applications

Applications such as Pursinator and Idle Chapters should live in their own repositories and deploy independently.

This repo should contain:

* public pages
* project writeups
* screenshots
* technical essays
* app landing pages
* navigation between projects

This repo should not contain:

* full application logic for independent products
* user databases
* game engines
* application-specific backend infrastructure

⸻

Primary Goals

The site should support:

* professional identity
* technical writing portfolio
* documentation engineering work
* AI/context engineering ideas
* knowledge systems exploration
* project showcases
* future experimentation

The structure should scale cleanly as additional projects are added over time.

⸻

Deployment Model

The site will deploy to:

kimberlygarmoe.com

using Vercel.

This repository is the primary/public domain project.

Other applications will deploy independently and may later be routed under the same domain using Vercel rewrites or proxy routing.

⸻

High-Level Architecture

Public Web Layer

Repository:

kimberly-garmoe-web

Responsibilities:

* landing page
* about page
* résumé-oriented content
* blog
* project pages
* screenshots/media
* essays and technical writing
* public navigation layer

⸻

Independent Application Repositories

Pursinator

Separate repository:

pursinator

Responsibilities:

* collection management app
* ranking/weeding workflows
* auth
* user state
* collection data
* application UI and logic

Potential future route:

kimberlygarmoe.com/pursinator

⸻

Idle Chapters

Separate repository:

idle-chapters

Responsibilities:

* cozy text RPG/game
* storylets
* game state
* procedural systems
* web UI
* backend/game logic

Potential future route:

kimberlygarmoe.com/idle-chapters

⸻

Public Route Structure

Create the following public routes:

/                       Landing page
/aboutme                About / résumé page
/blog                   Blog index
/blog/[slug]            Individual blog posts
/projects               Project index
/projects/[slug]        Individual project writeups

⸻

Project Placement Strategy

Pursinator and Idle Chapters should initially appear as project pages inside the public web repo.

Examples:

/projects/pursinator
/projects/idle-chapters

These pages should contain:

* overview
* screenshots/placeholders
* technical notes
* project goals
* status
* links to repositories
* links to live apps if available

The actual applications remain independent deployments.

Later, direct app routes may exist:

/pursinator
/idle-chapters

Those routes may eventually proxy to independent Vercel deployments.

For now:

* placeholders are acceptable
* redirects are acceptable
* links are acceptable

Do not tightly couple the application code to the umbrella site.

⸻

Recommended Tech Stack

Use:

* Next.js
* TypeScript
* App Router
* MDX or Markdown-based content
* Static generation where appropriate

The architecture should support gradual evolution into:

* dynamic pages
* auth
* API routes
* edge middleware
* richer content systems
* searchable project metadata

without requiring a framework migration later.

⸻

Suggested Repository Structure

app/
  page.tsx
  aboutme/
    page.tsx
  blog/
    page.tsx
    [slug]/
      page.tsx
  projects/
    page.tsx
    [slug]/
      page.tsx
components/
  layout/
  navigation/
  blog/
  projects/
  mdx/
content/
  blog/
  projects/
lib/
  content/
  metadata/
  utilities/
public/
  images/
    projects/
      pursinator/
      idle-chapters/
styles/

⸻

Content Strategy

The site should be content-first.

Use Markdown or MDX for:

* blog posts
* essays
* project writeups
* architecture notes
* technical explorations

Adding a new project should primarily involve:

1. adding content
2. adding screenshots/assets
3. optionally linking a live deployment

Avoid requiring major application refactors to publish new work.

⸻

Visual / UX Direction

The design should feel:

* calm
* clear
* systems-oriented
* readable
* durable
* thoughtful rather than trendy

Avoid:

* startup hype aesthetics
* excessive motion
* overly corporate portfolio language
* “personal brand” styling

The site should support an identity centered on:

* documentation engineering
* knowledge systems
* information architecture
* AI/context engineering
* data systems
* technical storytelling

⸻

Initial Project Entries

Pursinator

Slug:

/projects/pursinator

Description:

A collection-management and ranking application designed to help users evaluate what to keep, review, or sell.

Initially focused on handbags/purses, but conceptually broader:

* curation
* refinement
* ranking
* emotional preference mapping
* collection management

The project should be framed as a system for refinement and decision support rather than simple inventory tracking.

⸻

Idle Chapters

Slug:

/projects/idle-chapters

Description:

A cozy text-based RPG / interactive fiction system focused on:

* procedural storylets
* low-pressure exploration
* worldbuilding
* narrative systems
* constrained lexicons
* cozy gameplay structures

The web layer should eventually support:

* browser UI
* game interaction
* save state
* narrative progression

The project writeup should emphasize:

* narrative architecture
* schema-driven design
* systems thinking
* storytelling mechanics

⸻

Future Expansion

The architecture should support additional projects without structural redesign.

Possible future entries:

/projects/gt-wiki
/projects/doc-rule-graph
/projects/codelore
/projects/context-engineering

The umbrella site should scale naturally into:

* a publication platform
* a project archive
* a knowledge hub
* an application gateway

⸻

Authentication Strategy

Do not implement global auth yet.

Public content should remain accessible.

Authentication should generally live inside the independent application repos unless a future shared/private section is explicitly required.

Potential future auth models:

* magic links
* OAuth
* application-specific accounts
* protected preview environments

⸻

Key Architectural Principle

kimberly-garmoe-web = public publication layer
independent repos = actual products/applications

The umbrella site is the map of the work.

The individual repositories are the working systems themselves.