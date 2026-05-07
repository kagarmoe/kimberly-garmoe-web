# Color System

## Palette

The palette is anchored to the headshot: mustard blazer, warm olive tones, cream ground.

| Token | Value | Role |
|-------|-------|------|
| `--color-ground` | hsl(38, 30%, 91%) | Page background |
| `--color-surface` | hsl(38, 22%, 82%) | Dividers, borders |
| `--color-olive` | hsl(85, 50%, 18%) | Sidebar background |
| `--color-mustard` | hsl(40, 80%, 50%) | Accent, decoration |
| `--color-ochre` | hsl(38, 70%, 50%) | Nav hover |
| `--color-cream` | hsl(40, 45%, 96%) | Text on dark backgrounds |
| `--color-text-primary` | hsl(20, 22%, 9%) | Body text |
| `--color-text-muted` | hsl(20, 12%, 40%) | Secondary text, labels |
| `--color-accent` | hsl(40, 80%, 50%) | Alias for mustard; inner page headers |

## Headshot anchors

These are fixed — the palette derives from them, not the other way around:

- **Mustard blazer** → `--color-mustard` hsl(40, 80%, 50%)
- **Apricot hair** → warm golden-orange, approx hsl(28–33°, 80%, 68%); echoes the mustard blazer at lighter value

Any new color must coexist with these. The headshot is always present on the homepage; inner pages inherit the system.

## Allowed combinations

| Foreground | Background | Use |
|-----------|-----------|-----|
| `text-primary` | `ground` | Body text |
| `text-muted` | `ground` | Labels, secondary |
| `cream` | `olive` | Nav text |
| `ochre` | `olive` | Nav hover |
| `mustard` | `ground` | Accent borders, washes |
| `text-primary` | `surface` | Cards, dividers |

Never put `text-muted` on `surface` — contrast drops below AA.

## Design decisions

- **No royal blue.** Navy was tried and rejected — it fights the warm palette.
- **Olive, not forest green.** Yellow-leaning (hsl 85°) to stay warm-side; forest green at hsl 140° read as Christmas paired with mustard.
- **Mustard is structural, not decorative.** It appears in section header washes (`bg-accent/8`), borders, and hover states — enough presence that the hover color references something already visible.
- **Ochre for nav hover** (hsl 38°, slightly darker than mustard) — a warm pop against the dark olive sidebar rather than a stark jump to a different hue.

## Cyclic scheme (reference)

If the palette ever needs extending, the 8-step cyclic scheme anchored to mustard (45° intervals, saturation 0.6, lightness +0.13 from anchor) gives these harmonics:

| Hue | Hex | Name |
|-----|-----|------|
| 40° | `#E5B75B` | Amber |
| 85° | `#ACE55B` | Yellow-green |
| 130° | `#5BE572` | Green |
| 175° | `#5BE5DA` | Turquoise |
| 220° | `#5B89E5` | Cornflower blue |
| 265° | `#955BE5` | Medium purple |
| 310° | `#E55BCE` | Orchid |
| 355° | `#E55B67` | Soft red |

Names cross-referenced against CSS named colors (MDN). Turquoise and Cornflower blue are near-exact matches; the others are closest approximations.

## Seasonal palette context

This palette sits in **Warm Spring** — warm, clear, moderately saturated. That seasonal frame rules out:

- Cool hues (blue-violet, icy tones) — fight the warm ground
- Muted/dusty colors — feel heavy against the cream and mustard
- High-contrast darks beyond `text-primary` — break the lightness register

When extending: stay in the 20–130° hue band for warm additions, or pull from the cyclic scheme above with justification for why the hue earns a role.
