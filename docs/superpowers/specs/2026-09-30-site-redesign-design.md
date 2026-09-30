# Site redesign: messy in, usable out

Date: 2026-09-30
Status: approved direction; sections 2–5 are defaults chosen after "make it so"

## Brief

The current site reads as traditional and bookish (serif everywhere, olive
sidebar, cream washes). The new positioning is a practitioner who turns messy
technical information into knowledge that people and AI systems can actually
use, aiming at customer-facing technical roles. The design must feel
contemporary and must not look like the default portfolio.

Anchor asset: the LinkedIn banner (`public/images/banner.png`). It depicts the
positioning literally: loose gold particles on the cream side resolve into
connected network lines on the deep teal side. The palette derives from it.

Content and page set stay: home, about, writing (blog), projects.

## 1. Tokens

Colors (Tailwind `@theme` in `app/globals.css`):

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `hsl(42 45% 87%)` | Inner-page ground |
| `--color-ink` | `hsl(178 35% 13%)` | Nav bar, display type on paper, hero dark side |
| `--color-ink-muted` | `hsl(178 20% 32%)` | Secondary text on paper (a color, not opacity) |
| `--color-gold` | `hsl(40 70% 55%)` | Single accent: signature italic, hover, rules, offsets |
| `--color-ochre` | `hsl(38 65% 40%)` | Small marks on paper where gold is too light |
| `--color-cream` | `hsl(42 60% 94%)` | Type on ink |
| `--color-line` | `hsl(178 35% 13% / 0.16)` | Grid hairlines and dividers |

Old tokens (`ground`, `surface`, `olive`, `mustard`, `accent`,
`text-primary`, `text-muted`) are removed, not aliased.

Type, via `next/font/google`:

- `--font-display`: Bricolage Grotesque, weights 300 and 800, optical sizing on.
- `--font-body`: Geist, weights 400 and 500.
- `--font-mono`: IBM Plex Mono, weights 400 and 500.

Fraunces and Lora are removed.

Scale (clamped, as today):

- display: `clamp(4.5rem, 13vw, 12rem)`, line-height 0.86, tracking -0.045em
- heading: `clamp(2.5rem, 7vw, 5.5rem)`, line-height 0.9, tracking -0.04em
- subtitle: 0.55 of heading, weight 300
- body: `clamp(0.9375rem, 1.5vw, 1.0625rem)`, line-height 1.55
- label: 0.6875rem, tracking 0.08em, uppercase, mono

## 2. Structure

Nav (all breakpoints): an ink bar across the top, 56px tall. Left: name in
display 700 in cream. Right: About, Writing, Projects as mono labels, gold on
hover, gold underline on the active route. The fixed olive sidebar and the
`md:pl-48` body offset are removed. The skip link stays.

Home hero: full-viewport-height section with the banner as background
(`next/image`, `fill`, `priority`). Over it:

- Top left: five lines of skewed mono fragments (`rotate(-3deg)`, ink, 85%
  opacity). Hidden below `md`.
- Headshot: 26% width on desktop, cream 8px outline, positioned to bridge the
  seam between the cream and teal halves.
- Right: name in display 800, cream, right-aligned, two lines.
- Under the name: the three-line title in mono, cream.
- Bottom right: tagline in body, cream, with "actually use." in Instrument
  Serif italic gold. Instrument Serif is the one exception to the three-face
  rule and is used only here. If it proves fussy, drop the italic.

Below the hero: a paper section with the in / via / out table (mono, three
rows) and the three section links (About, Writing, Projects) as today but
restyled: mono label, body description, left hairline separators.

Inner pages: ink nav, then a 14px strip of the banner (`object-position`
centered, `object-fit: cover`) so every page remembers the hero, then paper
ground. The twelve-column grid shows as vertical hairlines via a repeating
linear gradient on `main`, capped at the content max width. Page header: title
in display 800 ink, subtitle in display 300 ink-muted, an ink hairline rule.
Content keeps the current label-column / content-column grid
(`md:grid-cols-[1fr_3fr]`), labels in mono.

About: body copy replaced with the new positioning text (the five paragraphs
provided), followed by Experience, Education, Skills, Certifications as today.
The "Open to" label says "Customer-facing technical roles."

Writing and Projects lists: each entry is a row with the mono meta column
(date or status, tags) and the title in display 800 at heading size, body
description below. Hairline between rows. Gold hover on the title.

Post and project pages: same header pattern, prose in Geist via
`@tailwindcss/typography` with headings mapped to display 800 ink and links
underlined in gold.

## 3. Motion

Minimal and content-related only:

- Fragments fade in and settle from a slightly larger skew over 600ms on
  load.
- Nav and list titles: color transition to gold on hover, 150ms.
- Everything is disabled under `prefers-reduced-motion: reduce`.

No scroll-driven effects, no parallax, no floating shapes.

## 4. Mobile

- Nav: the same ink bar, name left, three mono links right. They fit at 360px
  at label size, so no hamburger.
- Hero: still uses the banner as background with an ink overlay gradient from
  the bottom for legibility. Stack order: name (smaller, left-aligned), title,
  headshot at 60% width with cream outline, tagline. Fragments hidden.
- Inner pages: grid hairlines hidden below `md`; label column stacks above
  content as today.
- Mobile nav duplicate inside the hero is removed since the top bar is always
  present.

## 5. Assets, docs, and accessibility

- `public/images/banner.png` is added from the Downloads file, converted to
  JPEG at quality 82 to keep it under 400KB. The original is 2170x725.
- `docs/color-system.md` is rewritten for the new palette and its anchors
  (banner first, headshot second). The "no royal blue" decision is kept as
  history; the olive decisions are retired.
- Contrast: cream on ink and ink on paper both clear AA for body text. Gold is
  used only for large text, hover states, and decoration, never for body copy.
- Headshot alt text stays "Kimberly Garmoe". Banner is decorative, `alt=""`.
- Skip link, `aria-label` on nav, and the explicit viewport export are kept.

## Out of scope

- Dark mode toggle. The site is one theme.
- New pages or content beyond the About rewrite.
- Analytics events, PostHog, or contact form.

## Verification

- `npm run build` succeeds.
- Playwright screenshots at 1440 and 390 wide for home, about, projects,
  writing, compared by eye against the approved mockup.
- Axe check on home and about for contrast and landmark regressions.
- The existing deploy-check and link-check continue to pass after merge.
