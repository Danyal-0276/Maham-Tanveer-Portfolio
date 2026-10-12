import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteMotion } from "@/components/layout/SiteMotion";
import { profile } from "@/data/biography";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maham-tanveer-portfolio.vercel.app"),
  title: `${profile.name}, Educator · Researcher · Project Management`,
  description: profile.shortBio,
  openGraph: {
    title: `${profile.name}, Digital Biography`,
    description: profile.shortBio,
    type: "website",
    images: [{ url: "/media/hero/graduation.jpg" }],
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
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <main id="main-content" className="flex-1"><SiteMotion>{children}</SiteMotion></main>
        <SiteFooter />
        <SiteNav />
      </body>
    </html>
  );
}
