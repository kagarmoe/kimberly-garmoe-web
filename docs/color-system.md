# Color System

## Anchors

The palette derives from two images, in this order:

1. **The banner** (`public/images/banner.jpg`): cream and gold particles on
   the left resolving into connected network lines over deep teal-green on the
   right. It is the home hero and appears as a thin strip under the nav on
   every inner page.
2. **The headshot** (`public/images/headshot.jpeg`): mustard blazer, apricot
   hair, warm gray ground. It sits on the banner, so any color must coexist
   with both.

## Palette

Defined as Tailwind theme tokens in `app/globals.css`.

| Token | Value | Role |
|-------|-------|------|
| `--color-paper` | hsl(42 45% 87%) | Inner-page ground |
| `--color-ink` | hsl(178 35% 13%) | Nav bar, display type on paper, hero dark side |
| `--color-ink-muted` | hsl(178 20% 32%) | Secondary text on paper |
| `--color-gold` | hsl(40 70% 55%) | The single accent: signature italic, hover, active nav, list dashes |
| `--color-ochre` | hsl(38 65% 27%) | Small mono marks on paper where gold is too light (status labels, table keys); clears AA at label size |
| `--color-cream` | hsl(42 60% 94%) | Type on ink, headshot outline |
| `--color-line` | ink at 11% | Grid hairlines and dividers |

## Allowed combinations

| Foreground | Background | Use |
|-----------|-----------|-----|
| `ink` | `paper` | Body text, headings |
| `ink-muted` | `paper` | Secondary text, labels |
| `cream` | `ink` | Nav text, hero name and tagline |
| `gold` | `ink` | Hover, active nav, signature word |
| `ochre` | `paper` | Small mono labels |
| `ink` | `banner` (cream side) | Hero fragments, with a cream text halo |

Never put `gold` on `paper` for text smaller than heading size; it fails AA.
`ink-muted` is a real color, not `ink` at reduced opacity, so it stays
predictable over the grid hairlines.

## Type

| Token | Face | Job |
|-------|------|-----|
| `--font-display` | Bricolage Grotesque, 300 and 800 | Name, page titles, entry titles |
| `--font-body` | Geist | Body and UI |
| `--font-mono` | IBM Plex Mono | All small labels, dates, tags, fragments |
| `--font-signature` | Instrument Serif italic | Only the words "actually use." in the hero |

## Design decisions

- **Gold is the only accent.** It appears once per view at most: the
  signature word, a hover, an active underline. Restraint everywhere else is
  what makes it land.
- **Ink comes from the banner, not the old olive.** The teal-green reads as the
  same family as the retired olive nav but with more depth, and it ties the
  site to the LinkedIn banner.
- **The grid is visible.** Twelve hairline columns on inner pages, desktop
  only. The subject is ordering information, so the structure shows.
- **The fragments are the "messy" half.** Skewed monospace snippets over the
  cream side of the hero, animated once on load, hidden on mobile.
- **No royal blue.** Kept from the previous system. Navy was tried and
  rejected; it fights the warm side.

## Retired

The olive / mustard / cream sidebar system (2026-09) and its tokens
`ground`, `surface`, `olive`, `mustard`, `ochre`(old), `accent`,
`text-primary`, `text-muted`. See git history before the redesign spec in
`docs/superpowers/specs/2026-09-30-site-redesign-design.md`.
