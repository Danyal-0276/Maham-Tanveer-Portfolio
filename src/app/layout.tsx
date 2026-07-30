import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LoadingReveal } from "@/components/layout/LoadingReveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { profile } from "@/data/biography";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahamtanveer.vercel.app"),
  title: `${profile.name} — Educator · Researcher · Project Management`,
  description: profile.shortBio,
  openGraph: {
    title: `${profile.name} — Digital Biography`,
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
        <SmoothScroll>
          <LoadingReveal />
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
