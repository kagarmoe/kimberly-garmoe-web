import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { Nav } from "@/components/navigation/Nav";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="md:pl-48">
        <Nav />
        {children}
      </body>
    </html>
  );
}
