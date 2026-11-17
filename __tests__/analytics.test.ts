import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// devswamp-219: Google Analytics / Tag Manager (GTM-WMQCM997)
const layout = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8')

describe('Google Analytics & Tag Manager', () => {
  it('loads Google Tag Manager script with container id GTM-WMQCM997', () => {
    expect(layout).toContain('https://www.googletagmanager.com/gtm.js?id=GTM-WMQCM997')
  })

  it('initializes dataLayer and gtag function', () => {
    expect(layout).toContain('window.dataLayer = window.dataLayer || [];')
    expect(layout).toContain('function gtag(){dataLayer.push(arguments);}')
    expect(layout).toContain("gtag('js', new Date());")
  })
})
