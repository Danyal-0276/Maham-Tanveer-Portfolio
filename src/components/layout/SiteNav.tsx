"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { navChapters } from "@/data/biography";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function SiteNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3">
      <nav aria-label="Main navigation" className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-cream/20 bg-navy/95 p-1.5 text-cream shadow-lg backdrop-blur-xl">
        <a href="#welcome" aria-label="Home" className="rounded-full p-1.5">
          <Image src="/brand/mt-logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
        </a>
        <div className="hidden items-center sm:flex">
          {[{ id: "who-i-am", label: "About" }, { id: "education", label: "Education" }, { id: "experience", label: "Experience" }, { id: "gallery", label: "Gallery" }].map((item) => (
            <a key={item.id} href={`#${item.id}`} className="rounded-full px-3 py-2 text-xs transition hover:bg-cream/10">{item.label}</a>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-cream/10"><Menu size={16} aria-hidden="true" />Chapters</button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogTitle>Explore the story</DialogTitle>
            <nav aria-label="All chapters" className="grid gap-2 sm:grid-cols-2">
              {navChapters.map((chapter, i) => (
                <DialogClose asChild key={chapter.id}>
                  <a href={`#${chapter.id}`} className="flex items-center gap-3 rounded-sm border border-navy/10 px-4 py-3 text-sm text-navy transition hover:bg-cream-deep"><span className="text-xs text-ink/45">{String(i + 1).padStart(2, "0")}</span>{chapter.label}</a>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
        <a href="#contact" className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-navy transition hover:bg-gold/90">Contact</a>
      </nav>
    </header>
  );
}
