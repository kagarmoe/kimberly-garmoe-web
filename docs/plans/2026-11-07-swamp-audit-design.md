# Swamp audit: making this repo idiomatic swamp (devswamp-115)

Status: draft, 2026-11-07. Ticket: devswamp-115 (epic devswamp-114). Audited at
`b46c3e9` (main). Output, as the ticket asks: findings, then the changes, which
land through devswamp's change factory.

## What is here

- `.swamp.yaml`: swamp `20261106.235013.0` (current: oikos' daily
  `swamp-repo-upgrade` keeps it so, #16-#19, #22), tools `[claude]`, no
  `defaultVault`.
- One vault, `secrets` (`local_encryption`,
  `vaults/local_encryption/1da926b6-....yaml`), with
  `base_dir: /Users/kimberlygarmoe/repos/kimberly-garmoe-web`.
- Three behavior instances on pulled `@swamp/vercel` types, all reading
  `vault.get("secrets", "vercel-token")`:
  `models/@swamp/vercel/projects/projects/kimberlygarmoe-project.yaml`,
  `.../deployments/deployments/kimberlygarmoe-deployments.yaml`,
  `.../drains/drains/kimberlygarmoe-log-drain.yaml` (adopted drain
  `drn_WA8ur8cHQtsxvzEQ`, "Axiom Log Drain").
- One local extension, `extensions/models/vercel-drains-list.ts`, adding `list`
  to `@swamp/vercel/drains/drains`.
- One workflow, `workflows/workflow-deploy-check.yaml`: refresh the project,
  then assert the latest deployment is READY and production.
- CI in GitHub Actions: `test.yml` (`npm run lint`, `npm test` on push to main
  and on PRs) and `link-check.yml` (`linkinator` on a successful production
  deployment).
- `AGENTS.md` holds only Next.js' agent note; `CLAUDE.md` is swamp's managed
  section plus `@AGENTS.md`.

## Findings

**F1. The pulled Vercel extensions are behind.**
`swamp extension outdated --repo-dir <repo>` (2026-11-07): projects
`2026.09.29.1` → `2026.11.07.1`, deployments `2026.09.25.1` → `2026.10.28.1`,
drains `2026.08.03.3` → `2026.10.23.2`. The ticket asks for them current with
`swamp extension update`; nothing here updates them (oikos' upgrade runs
`swamp repo upgrade` only: `oikos/extensions/models/swamp_install.ts:139`).

**F2. Most of the Vercel behaviors duplicate oikos.** oikos holds this site's
project, deployment, domains, env and alias instances
(`oikos/models/@swamp/vercel/.../vp-kimberly-garmoe-web.yaml`,
`vercel-deploy-kimberly-garmoe-web.yaml`, ...), and its daily `vercel-health`
asserts what `deploy-check` asserts, plus that production was built from main
(`oikos/workflows/workflow-vercel-health.yaml:48-75`). Nothing in this repo runs
`deploy-check` or reads the two instances; the only mention is a past spec
(`git grep`: `docs/superpowers/specs/2026-09-30-site-redesign-design.md:144`).
devswamp's AGENTS.md says app delivery lives in oikos for now ("Scope: devswamp
and oikos"). Two copies of the same project record drift apart.

**F3. The local drains extension reaches into pulled internals.**
`vercel-drains-list.ts:5` imports
`../../.swamp/pulled-extensions/@swamp/vercel/drains/models/_lib/vercel.ts`, a
gitignored path (`.gitignore`: `.swamp/`) that exists only after a pull and
whose shape the extension's author may change in any update, F1 included. Its
`list` was the one-time way to find the drain to adopt; the adoption is done
(the instance's `methods.adopt.arguments.id`). The drain is the one Vercel
resource oikos does not hold (`grep -rln drain oikos/models/@swamp/vercel`:
none).

**F4. Session artifacts are committed.** `.playwright-mcp/` (7 pages and
screenshots, May 2026) was committed in `054d066`, `ec06bb6` and `e6e62c2`
before `.gitignore` gained `.playwright-mcp/`, so git still tracks them.

**F5. The vault's key path is the main checkout's.** `base_dir` is an absolute
path to `~/repos/kimberly-garmoe-web`. Worktrees on this Mac resolve to that
checkout's key, so it works here; a clone elsewhere (another host, CI) has no
key at that path. Only the drain instance needs the vault once F2 is done.

**F6. Agents have no repo rules.** `AGENTS.md` says nothing about how this repo
is checked (`npm run lint`, `npm test`, the link check), that delivery and
dependency merges run from oikos (`vercel-health`, `vercel-production`,
`vuln-scan`), or that main is not protected (`gh api .../rulesets`: `[]`).

**Checked and fine:** swamp itself is current; workflows use `data.latest()`,
not the deprecated `model.` paths (rule 4); CI stays in GitHub Actions, which is
the PR gate `vuln-scan` and `vercel-production` rely on, not a shell wrapper
around something swamp covers (rules 1, 2, 10); `.gitignore`'s swamp section is
swamp-managed (`gitignoreManaged: true`).

## Decisions

1. **Update the pulled extensions** (F1): `swamp extension update`, then run
   each instance's read method and `deploy-check`'s replacement (below) to see
   they still work.
2. **Retire the duplicates** (F2): delete `deploy-check`,
   `kimberlygarmoe-project` and `kimberlygarmoe-deployments`; oikos'
   `vercel-health` is the one health check. The site's redesign spec line keeps
   its history; nothing else refers to them.
3. **Drop the drains extension, keep the drain** (F3): delete
   `vercel-drains-list.ts`; the adopted drain instance stays here until oikos
   holds it (asked of oikos with the epic's other delivery questions, not done
   here).
4. **Untrack the session artifacts** (F4): `git rm -r --cached .playwright-mcp`.
5. **Vault** (F5): leave as is. It has one consumer, on this Mac; moving the
   drain to oikos would remove it. Recorded, not changed.
6. **AGENTS.md** (F6): a short "This repo" section below the Next.js note:
   checks (`npm run lint`, `npm test`, link check in CI), delivery and
   dependency merges in oikos, worktrees for changes.

All of 1-4 and 6 are one change item, filed as a follow-up of devswamp-115.
Protecting main (F6) is devswamp-131's, not this ticket's.

## Left out

- Adding `codex` or `pi` to `tools`: nobody asked; everything starts off.
- Moving CI into swamp workflows: Actions is the gate other automation relies
  on; a second runner would duplicate it.
- Moving app delivery from oikos to here: undecided by the person (devswamp
  AGENTS.md).
