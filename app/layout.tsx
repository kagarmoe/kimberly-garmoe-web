import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/navigation/Nav";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const bodyFont = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const signatureFont = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Kimberly Garmoe',
    template: '%s — Kimberly Garmoe',
  },
  description: 'Turning messy technical information into knowledge people and AI systems can actually use. Technical knowledge systems, AI agents and developer infrastructure, customer solutions.',
  metadataBase: new URL('https://kimberlygarmoe.com'),
  openGraph: {
    siteName: 'Kimberly Garmoe',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} ${signatureFont.variable} antialiased`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-ink label focus:no-underline"
        >
          Skip to main content
        </a>
        <Nav />
        <div id="main-content">
          {children}
        </div>
        <Script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WMQCM997"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
