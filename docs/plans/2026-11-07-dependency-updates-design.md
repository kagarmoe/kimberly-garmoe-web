# Dependency updates without the person (devswamp-116)

Status: draft cycle 2, 2026-11-07. Ticket: devswamp-116 (epic devswamp-114).

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
it. Every Dependabot PR so far is a security bump (#9 vitest, #10 vite, #11
next, #12-#15, #20).

**Decision:** add `.github/dependabot.yml` with two ecosystems:

- `npm` at `/`, weekly. One group, `minor-and-patch`
  (`update-types: [minor, patch]`), so a week's non-major updates arrive as one
  PR, which `vuln-scan` merges when its checks pass.
- `github-actions` at `/`, monthly, for `actions/checkout@v4` and
  `actions/setup-node@v4` in `.github/workflows/`.
- Both with `cooldown: { default-days: 7 }`: a release must be a week old before
  a version update proposes it, which keeps a compromised release that is pulled
  within days out of the auto-merged path. GitHub's options reference: cooldown
  "Defines a cooldown period for dependency updates" and "is only available for
  version updates, not security updates", so security fixes still arrive at
  once.

Majors are not in the group, so each opens as its own PR. Groups default to
version updates (`applies-to` "When undefined, defaults to version updates",
same reference), so security updates keep arriving one per alert, as now.

The design does not use `ignore` to hold majors back: the reference marks
`ignore` as applying to security updates too and does not say `update-types` is
limited to version updates (it says so only for `allow`). An `ignore` on majors
could drop a security fix that needs a major.

**Accepted risk:** a compromised minor or patch older than the cooldown, whose
payload passes the tests and builds the preview, is merged and deployed without
the person, as security bumps already are today.

## Gap 2: a green major would be merged unattended

`mergeDependabotPrs` (oikos `extensions/models/github_pull_merge.ts`, the PR
filter at line 249 on origin/main) merges a PR when its author is
`dependabot[bot]`, its head is in the same repo and its checks pass; nothing in
it reads the update type or who wrote the commits. With version updates on, a
green Next.js or React major would be merged overnight and deployed.

**Decision:** version-update majors wait for the person, and the hold fails
closed. The skip, asked of oikos:

1. Reads every commit on the PR (`GET /repos/{r}/pulls/{n}/commits`), not only
   the head.
2. Merges only when **every** commit is authored by `dependabot[bot]`, each
   carries Dependabot's metadata block (`updated-dependencies:` … `...`), and no
   block says `update-type: version-update:semver-major`.
3. Otherwise holds the PR: a semver-major version update, a commit by anyone
   else (a pushed fix, a merge-style "Update branch"), or a block it cannot
   parse. A missing line never means merge.

A version update's block names its type
(`update-type:
version-update:semver-major` on kagarmoe/todo PR #1,
actions/checkout 4 to 7). A security update's block has no `update-type` line
(this repo's #10-#13 and #20: only `dependency-name`, `dependency-version`,
`dependency-type`), so a green security update, major or not, still merges. That
is accepted: a security fix that needs a major is rare, its checks and the
Vercel preview still gate it, and holding it would leave a known vulnerability
in production. This was observed while the repo had no `dependabot.yml`; the
first security PR after the file lands is read to confirm it still has no
`update-type`, and if it has one, the rule above holds that PR for the person
rather than merging it.

**Held PRs get their own outcome.** Today every PR `mergeDependabotPrs` does not
merge goes into `blocked`, which `vuln-scan` posts as `dependabot.merge_blocked`
with "Open a fix PR for each one left open … or close it" (`post-merges` step).
An agent following that would do the very upgrade reserved for the person. So a
held PR gets a separate outcome, `held-for-person`, kept out of `blocked`, with
its own post line: "waits for the person: read the upgrade notes and merge or
close". It is posted when it first appears and in the Monday summary, not every
night.

This is a change to oikos' extension and workflow, so it is asked of oikos; this
repo changes nothing there (devswamp's AGENTS.md, "Scope: devswamp and oikos").

## Order

1. Ask oikos for the skip and the `held-for-person` outcome (a message to the
   oikos session, or its ticket).
2. Before landing anything here, observe it: run `mergeDependabot` with `dryRun`
   on the host that runs `vuln-scan`, against kagarmoe/todo, whose PR #1 is an
   open semver-major version update. Land only if that run reports PR #1 as
   `held-for-person`. A message saying it is done is not enough.
3. Then land `.github/dependabot.yml` here (a change item).
4. If oikos declines the change, `dependabot.yml` does not land; the person
   decides whether to accept unattended majors or keep security-only updates.

## Left out

- A separate swamp workflow in this repo: `vuln-scan` already runs nightly on an
  always-on host and posts results; a second one would merge the same PRs twice.
- A schedule for held majors: they sit as open PRs and appear in `vuln-scan`'s
  posts until the person merges or closes them.
- `swamp-repo-upgrade` (oikos) is unaffected: it upgrades swamp, not npm.
