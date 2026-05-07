import type { Metadata } from "next";
import { Playfair_Display, Fraunces, Bodoni_Moda, Cardo, Sorts_Mill_Goudy, Lora } from "next/font/google";
import { Nav } from "@/components/navigation/Nav";
import "./globals.css";

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const sortsMillGoudy = Sorts_Mill_Goudy({
  variable: "--font-goudy",
  subsets: ["latin"],
  weight: ["400"],
});

const bodyFont = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: 'Kimberly Garmoe',
    template: '%s — Kimberly Garmoe',
  },
  description: 'Information architect building knowledge systems for AI. Technical writing, taxonomy, retrieval.',
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
  const allFontVars = [
    playfair.variable,
    fraunces.variable,
    bodoni.variable,
    cardo.variable,
    sortsMillGoudy.variable,
    bodyFont.variable,
    // Default display to Playfair for the live site
    "--font-display-current: var(--font-playfair)",
  ].join(' ');

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${fraunces.variable} ${bodoni.variable} ${cardo.variable} ${sortsMillGoudy.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="md:pl-48">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-forest focus:text-cream focus:font-display focus:text-label focus:uppercase focus:tracking-widest focus:no-underline"
        >
          Skip to main content
        </a>
        <Nav />
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
