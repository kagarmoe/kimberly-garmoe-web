# Publish blog posts from Markdown (devswamp-117)

Status: draft cycle 1, 2026-11-07. Ticket: devswamp-117 (kimberly-garmoe-web
epic, devswamp-114).

## What the person asked

The goal: "we need to get KGW set up to publish blog posts from markdown." Then:
"Just get the entire pipeline to 'probably works, we will know with new keys'"
(2026-11-07). The person's answers that same day:

- **Where posts are written:** in the repo, published by pull request: "Write
  `content/blog/<slug>.md` in the KGW repo; a swamp workflow opens the PR, CI
  and the Vercel preview check it, merging to main deploys to production."
- **First version:** plain `.md` as well as `.mdx`. Hiding drafts, RSS, and tags
  and images were offered and not chosen.

## What exists

- **Routes:** `/blog` lists posts (`app/blog/page.tsx`) and `/blog/<slug>`
  renders one (`app/blog/[slug]/page.tsx`) with `next-mdx-remote`'s `MDXRemote`.
- **Loader:** `lib/content/index.ts`. `readMdxDir` reads only files ending in
  `.mdx` (`.filter(file => file.endsWith('.mdx'))`). `parsePost` takes `title`,
  `description`, `date` and `draft` from the front matter, with gray-matter.
  Nothing filters on `draft`: `getAllPosts` returns every post, so
  `content/blog/hello.mdx` (`draft: true`) is listed today.
- **Checks:** CI runs `npm run lint` and `npm test` (vitest, `__tests__/`) on
  every pull request and every push to main (`.github/workflows/test.yml`). A
  link check runs after production deploys (`.github/workflows/link-check.yml`).
  The Vercel project deploys main to production and builds a preview for each
  pull request. KGW's classic branch protection on main requires the `Vercel`
  status check, strict and enforced for admins, with 0 approvals
  (`gh api repos/kagarmoe/kimberly-garmoe-web/branches/main/protection`,
  2026-11-07).
- **swamp:** KGW holds Vercel project, deployments and drain models, read with
  `vault.get("secrets", "vercel-token")`
  (`models/@swamp/vercel/projects/projects/kimberlygarmoe-project.yaml`). The
  `deploy-check` workflow asserts that the latest deployment is a READY
  production deploy (`workflows/workflow-deploy-check.yaml`). KGW has no GitHub
  or git behavior instances.

## What it decides

### 1. Plain Markdown posts

- **Loader:** `readMdxDir` also reads `.md` files and keeps each post's
  `format`, `md` or `mdx`, on the `Post` type (`lib/content/types.ts`). If a
  slug exists as both `.md` and `.mdx`, loading fails with an error naming both
  files, so a build can't quietly pick one.
- **Rendering:** the post page passes
  `options={{ mdxOptions: { format: post.format } }}` to `MDXRemote`.
  `next-mdx-remote` 6.0.0 passes `mdxOptions` through to `@mdx-js/mdx`, which
  takes `format: "md" | "mdx"`
  (`node_modules/next-mdx-remote/dist/types.d.ts:15`,
  `node_modules/@mdx-js/mdx/lib/core.d.ts:48`). A plain `.md` post with `<` or
  `{` therefore renders as Markdown and doesn't fail MDX compilation.
- **Tests (vitest, beside `__tests__/content.test.ts`):**
  - a `.md` post loads with `format: "md"`;
  - a slug that exists as both `.md` and `.mdx` fails;
  - a `.md` post containing `{` and `<` renders.

### 2. A swamp `publish-post` workflow

A swamp workflow in KGW, `publish-post`, takes the input `slug`. It runs from
the person's clone, after they have written `content/blog/<slug>.md` (or `.mdx`)
on main.

1. **Branch** `post/<slug>`, with `@swamp/git` `branch`.
2. **Commit** only that post's file, with `@swamp/git` `commit`, message
   `Post: <title>`.
3. **Push** the branch, with `@swamp/git` `push`.
4. **Open the pull request** to main, with `@dataverket/github` `openPr` and
   `dryRun: false`. It finds an open pull request first, so a rerun opens no
   second one.

CI and the Vercel preview then run on the pull request. Merging is the person's,
and it deploys to production. Afterwards the person (or an agent, on request)
runs `deploy-check`.

This needs two new instances in KGW, pulled with `swamp extension pull`, as the
Vercel ones were:

- `git`, an `@swamp/git` instance on the clone, using the person's existing git
  credentials;
- `github`, an `@dataverket/github` instance with `owner: kagarmoe` and
  `token: ${{ vault.get("secrets", "github-token") }}`.

devswamp-115 (make it idiomatic swamp) is landing in parallel and decides how
KGW holds its extensions. These two instances follow what 115 lands.

### 3. What "probably works" means here, and what proves it

Without new keys, the build proves:

- the loader and rendering, by tests in CI;
- that the workflow validates (`swamp workflow validate publish-post`);
- that the steps are wired correctly, by a run with `openPr`'s `dryRun: true`.

The first real publish needs:

- the GitHub token in `secrets/github-token`, which the person is supplying;
- a working `secrets/vercel-token` for `deploy-check`, which the person expects
  to rotate.

## Out of scope

- Hiding drafts, RSS, tags and images, which the person did not choose. Because
  of that, `draft: true` still publishes, as it does today, including
  `hello.mdx`. The README says so, so a draft is not merged by mistake.
- Merging posts automatically: a post reaches production only through the
  person's merge.
- devswamp-161's baseline on KGW (ProtectMain and merge settings) changes
  nothing here. A post's pull request is squash-merged like every other change.

## Risks it accepts

- **`draft: true` is ignored** until a later change adds draft hiding (above).
- **A post can be malformed.** A post with bad front matter fails `next build`,
  so the Vercel preview check fails and the pull request can't be merged while
  that check is required.
