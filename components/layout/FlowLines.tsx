/**
 * Gold flow lines with beads travelling along them, laid over the banner.
 * The viewBox matches the banner's pixel size and uses `slice`, so the paths
 * crop exactly like the image underneath (object-cover). Pure SVG + SMIL, no JS.
 * Beads start green on the cream side and turn gold as they pass the headshot.
 * Hidden under prefers-reduced-motion via the .flow-lines rule in globals.css.
 */

// Right-hand tails avoid the title block (x > 1450, y 480–560) so beads never
// sit behind the small mono text. Path 2 threads the gap between name and title.
const paths = [
  'M-40,300 C260,230 520,420 820,350 S1320,230 1960,290',
  'M-40,390 C320,320 600,520 900,430 S1420,380 1960,420',
  'M-40,470 C300,400 640,600 980,510 S1500,455 1960,450',
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

const green = 'hsl(165 35% 40%)'
const gold = 'hsl(40 70% 55%)'
// Paths run left to right at roughly constant speed, so time ≈ x. The
// headshot spans about 24%–46% of the width; the colour crossfades there.
const colorKeyTimes = '0;0.24;0.46;1'
const colorValues = `${green};${green};${gold};${gold}`

export function FlowLines() {
  return (
    <svg
      aria-hidden="true"
      className="flow-lines absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1920 641"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="bead-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((d, i) => (
        <path key={i} id={`flow-${i}`} d={d} fill="none" stroke={gold} strokeWidth="1.75" opacity="0.6" />
      ))}

      {beads.map(({ path, dur, begin, r }, i) => (
        <circle key={i} r={r} fill={green} filter="url(#bead-glow)">
          <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto">
            <mpath href={`#flow-${path}`} />
          </animateMotion>
          <animate
            attributeName="fill"
            values={colorValues}
            keyTimes={colorKeyTimes}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}
