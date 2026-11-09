<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# This repo

- **Checks:** `npm run lint` and `npm test` (vitest), run by CI
  (`.github/workflows/test.yml`) on every PR; `link-check.yml` checks the live
  site after a production deploy.
- **Changes:** made in a worktree and landed by PR. `main` is PR-only (ruleset
  ProtectMain).
- **Run from oikos, not here:** `vercel-production` (promote or roll back),
  `vercel-health` (production is READY and built from main),
  `vercel-inventory` (env and domains), `vuln-scan` (merges green Dependabot
  PRs; holds majors and next/react/react-dom for the person) and
  `swamp-repo-upgrade` (daily swamp upgrade PRs). Why delivery lives there:
  devswamp `AGENTS.md`, "Scope: devswamp and oikos".
- **Here:** the adopted Vercel log drain (`kimberlygarmoe-log-drain`), the
  `github` instance (`@dataverket/github`) and the `publish-post` workflow.
