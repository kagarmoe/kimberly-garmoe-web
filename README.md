This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
