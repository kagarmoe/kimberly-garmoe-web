/**
 * Flow lines with beads travelling along them, laid over the banner.
 * The viewBox matches the banner's pixel size and uses `slice`, so the paths
 * crop exactly like the image underneath (object-cover). Pure SVG + SMIL, no JS.
 * Lines start green on the cream side and turn gold behind the headshot.
 * Hidden under prefers-reduced-motion via the .flow-lines rule in globals.css.
 */
const paths = [
  'M-40,300 C260,230 520,420 820,350 S1320,230 1960,290',
  'M-40,390 C320,320 600,520 900,430 S1420,380 1960,430',
  'M-40,470 C300,400 640,600 980,510 S1500,470 1960,520',
]

// ponytail: three fixed curves eyeballed against the banner, not traced.
// Swap for traced paths if the image ever changes.
const beads = [
  { path: 0, dur: '16s', begin: '0s', r: 6 },
  { path: 0, dur: '16s', begin: '-9s', r: 10 },
  { path: 1, dur: '21s', begin: '-4s', r: 6.5 },
  { path: 1, dur: '21s', begin: '-14s', r: 4.5 },
  { path: 2, dur: '25s', begin: '-2s', r: 5 },
  { path: 2, dur: '25s', begin: '-15s', r: 9 },
]

// Headshot sits at roughly x=460–885 in banner coordinates; the green→gold
// crossfade spans that band so the change happens behind it.
const stops = [
  { offset: '0%', color: 'hsl(165 35% 40%)' },
  { offset: '24%', color: 'hsl(165 35% 40%)' },
  { offset: '46%', color: 'var(--color-gold)' },
  { offset: '100%', color: 'var(--color-gold)' },
]

export function FlowLines() {
  return (
    <svg
      aria-hidden="true"
      className="flow-lines absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1920 641"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="flow-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1920" y2="0">
          {stops.map(s => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
        </linearGradient>
        <filter id="bead-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((d, i) => (
        <path key={i} id={`flow-${i}`} d={d} fill="none" stroke="url(#flow-grad)" strokeWidth="1.75" opacity="0.7" />
      ))}

      {beads.map(({ path, dur, begin, r }, i) => (
        <circle key={i} r={r} fill="var(--color-gold)" filter="url(#bead-glow)">
          <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto">
            <mpath href={`#flow-${path}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  )
}
