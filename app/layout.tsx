import type { Metadata } from "next";
import { JetBrains_Mono, Lora } from "next/font/google";
import { Nav } from "@/components/navigation/Nav";
import "./globals.css";

const displayFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const bodyFont = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kimberly Garmoe",
  description: "Information architect building knowledge systems for AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
