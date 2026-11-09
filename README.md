# kimberlygarmoe.com

Kimberly Garmoe's personal site, at https://www.kimberlygarmoe.com: a
[Next.js](https://nextjs.org) app in TypeScript, deployed by Vercel.

## What is where

| Page               | Source                                                     |
| ------------------ | ---------------------------------------------------------- |
| `/`                | `app/page.tsx`                                             |
| `/aboutme`         | `app/aboutme/page.tsx` (experience, skills, languages)     |
| `/blog`            | `content/blog/<slug>.md` or `.mdx` (see below)             |
| `/projects`        | `content/projects/<slug>.mdx`                              |
| `/writing-samples` | `app/writing-samples/page.tsx` (links to published docs)   |

The navigation is `components/navigation/Nav.tsx`. A project's front matter
sets its links: `repo`, `live` and `docs` each show as a link on its page.

```yaml
---
title: Adored
description: One line for the index and the page header.
status: in-progress     # active | in-progress | planned | archived
tech: [Next.js, TypeScript]
repo: https://github.com/kagarmoe/adored
live: https://adored.kimberlygarmoe.com/
---
```

## Publishing a post

A post is `content/blog/<slug>.md` (plain Markdown) or `content/blog/<slug>.mdx`
(MDX, for JSX or raw HTML: a `.md` post drops raw HTML). Front matter:

```yaml
---
title: My post          # required
date: "2026-11-07"      # required, YYYY-MM-DD
description: One line for the index and the page header.
---
```

A post without a title or a valid date fails the build, so the Vercel check
blocks its pull request. `draft: true` does **not** hide a post yet: it
publishes like any other.

To publish:

```sh
git fetch origin
git switch -c post/my-post origin/main
# write content/blog/my-post.md
git add content/blog/my-post.md
git commit -m "Post: My post"
git push -u origin post/my-post
swamp workflow run publish-post --input slug=my-post --input 'title=My post'
```

Pushing makes the post public on GitHub before anything is merged. The workflow
opens the pull request to main (rerunning it opens no second one; to change the
post, commit and push to the same branch). CI and the Vercel preview check it;
merging deploys it to `https://www.kimberlygarmoe.com/blog/<slug>`. Production
health is checked by oikos' `vercel-health`.

The `github` instance reads `secrets/github-token`: a fine-grained token for
this repository only, with Pull requests read/write and Metadata read, and no
Contents write or Administration, so it can open a pull request but cannot merge
one.

## Developing

```sh
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm test        # vitest
npm run build
```

CI (`.github/workflows/test.yml`) runs lint and tests on every pull request.

## Shipping

`main` is PR-only. Merging to `main` deploys production on Vercel; every pull
request gets a Vercel preview. Agents' rules for this repo are in `AGENTS.md`.

Dependencies update through Dependabot (`.github/dependabot.yml`): minor and
patch updates arrive weekly as one grouped PR, which oikos' nightly `vuln-scan`
merges once its checks pass. Majors, and next, react and react-dom, wait for a
person to read the notes and merge or close them.

oikos also runs `vercel-health`, which checks that production is READY and was
built from `main`.
