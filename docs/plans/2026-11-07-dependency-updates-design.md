# Dependency updates without the person (devswamp-116)

Status: draft, 2026-11-07. Ticket: devswamp-116 (epic devswamp-114).

## What the ticket asked, and what changed since

devswamp-116 (filed 2026-11-06) asked how this site's dependency PRs get checked
and merged without the person, which still need the person (majors, framework),
and where that runs, without duplicating oikos' `vuln-scan` and
`swamp-repo-upgrade`.

The merge half was built in oikos the same night. oikos PR #84 (`65e1bf0`,
2026-11-06 20:07 PT, "vuln-scan merges green Dependabot PRs itself (ops-49)")
made the nightly `vuln-scan` merge each open Dependabot PR once every check that
ran on it passes again, for kimberly-garmoe-web among others; a merge to main
deploys production here, so the checks, including the Vercel preview, are the
gate (`oikos/workflows/workflow-vuln-scan.yaml`, `description`). Its first run
merged the four PRs the ticket named or followed: #12, #13, #14 (2026-11-07
02:52-02:55Z) and #20 (03:01Z); #15 was closed for our own fix PR #21
(`gh pr list --repo kagarmoe/kimberly-garmoe-web --state all`).

So nothing new runs anywhere for the merge itself. Two gaps are left.

## Gap 1: only security updates arrive

The repo has Dependabot security updates on
(`gh api repos/kagarmoe/kimberly-garmoe-web/automated-security-fixes`:
`{"enabled":true}`) and no `.github/dependabot.yml` (`git ls-files .github`:
only `workflows/link-check.yml` and `workflows/test.yml`). Without that file
Dependabot opens no version updates: a dependency moves only when an alert names
it. Every Dependabot PR so far is a security bump (#10 vite, #11 next, #12-#15,
#20).

**Decision:** add `.github/dependabot.yml` with two ecosystems:

- `npm` at `/`, weekly. One group, `minor-and-patch`
  (`update-types: [minor, patch]`), so a week's non-major updates arrive as one
  PR, which `vuln-scan` merges when its checks pass.
- `github-actions` at `/`, monthly, for `actions/checkout@v4` and
  `actions/setup-node@v4` in `.github/workflows/`.

Majors are not in the group, so each opens as its own PR. Groups default to
version updates (`applies-to` "When undefined, defaults to version updates",
GitHub's Dependabot options reference), so security updates keep arriving one
per alert, as now.

The design does not use `ignore` to hold majors back: GitHub's options reference
marks `ignore` as applying to security updates too and does not say
`update-types` is limited to version updates (it says so only for `allow`). An
`ignore` on majors could drop a security fix that needs a major.

## Gap 2: a green major would be merged unattended

`mergeDependabot` (`oikos/extensions/models/github_pull_merge.ts`) merges any
green PR from `dependabot[bot]` (line 174); nothing in it reads the update type.
With version updates on, a green Next.js or React major would be merged
overnight and deployed to production.

**Decision:** version-update majors wait for the person. A version update's
commit message names its update type in Dependabot's metadata block, for example
`update-type: version-update:semver-major` on kagarmoe/todo PR #1
(actions/checkout 4 to 7). `mergeDependabot` skips a PR whose commit message
says `version-update:semver-major` and lists it under "left open" in the Discord
post, as it already does for PRs it cannot merge. The person merges those, after
reading the framework's upgrade notes (this repo's AGENTS.md: "This is NOT the
Next.js you know").

Security updates carry no `update-type` line (this repo's PR #13: only
`dependency-name`, `dependency-version`, `dependency-type`), so they keep
merging when green, majors included. That is accepted: a security fix that needs
a major is rare, its checks and the Vercel preview still gate it, and holding it
would leave a known vulnerability in production.

That skip is a change to oikos' extension, so it is asked of oikos; this repo
changes nothing there (AGENTS.md "Scope: devswamp and oikos").

## Order

1. Ask oikos for the `semver-major` skip in `mergeDependabot` (a message to the
   oikos session, or its ticket).
2. When oikos confirms it, land `.github/dependabot.yml` here (a change item).
   If oikos declines, land it with the `ignore` of majors and accept the risk
   above, stated in the file's comment.

## Left out

- A separate swamp workflow in this repo: `vuln-scan` already runs nightly on an
  always-on host and posts results; a second one would merge the same PRs twice.
- A schedule for majors: they sit as open PRs and appear in `vuln-scan`'s posts
  until the person merges or closes them.
- `swamp-repo-upgrade` (oikos) is unaffected: it upgrades swamp, not npm.
