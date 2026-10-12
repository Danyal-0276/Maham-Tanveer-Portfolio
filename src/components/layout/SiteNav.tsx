"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { useRef } from "react";
import { navChapters } from "@/data/biography";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function SiteNav() {
  const pendingChapter = useRef<string | null>(null);

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-navbar">
        <a href="#welcome" aria-label="Maham Tanveer — Home" className="nav-wordmark">
          <span className="nav-wordmark-name">maham<span aria-hidden="true" className="nav-wordmark-dot" /></span>
          <span className="nav-wordmark-caption">Tanveer · A story in motion</span>
        </a>
        <div className="nav-chapter-pill">
          {[{ id: "who-i-am", label: "About" }, { id: "education", label: "Education" }, { id: "experience", label: "Experience" }, { id: "gallery", label: "Gallery" }].map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className="nav-chapter-link"><span className="nav-chapter-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{item.label}</a>
          ))}
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" aria-label="Chapters" className="nav-chapter-link nav-menu"><Menu size={17} aria-hidden="true" /><span>Chapters</span></button>
          </DialogTrigger>
          <DialogContent className="max-w-xl" onCloseAutoFocus={(event) => {
            const id = pendingChapter.current;
            if (!id) return;
            event.preventDefault();
            pendingChapter.current = null;
            requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
          }}>
            <DialogTitle>Explore the story</DialogTitle>
            <nav aria-label="All chapters" className="grid gap-2 sm:grid-cols-2">
              {navChapters.map((chapter, i) => (
                <DialogClose asChild key={chapter.id}>
                  <a href={`#${chapter.id}`} onClick={() => { pendingChapter.current = chapter.id; }} className="flex items-center gap-3 rounded-sm border border-navy/10 px-4 py-3 text-sm text-navy transition hover:bg-cream-deep"><span className="text-xs text-ink/45">{String(i + 1).padStart(2, "0")}</span>{chapter.label}</a>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
        </div>
        <a href="#contact" className="nav-contact">Let’s talk <ArrowUpRight size={19} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
