"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navChapters, profile } from "@/data/biography";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-[0.7rem] uppercase tracking-[0.14em] text-navy/70 transition hover:text-navy";

  return (
    <header className="sticky top-0 z-40 border-b border-navy/8 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#welcome" className="flex items-center gap-3">
          <Image
            src="/brand/mt-logo.png"
            alt="Maham Tanveer monogram"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/50"
            priority
          />
          <span className="hidden font-serif text-xl text-navy sm:block">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-5">
          {navChapters.slice(0, 8).map((c) => (
            <a key={c.id} href={`#${c.id}`} className={linkClass}>
              {c.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-accent px-3 py-2 text-[0.7rem] uppercase tracking-[0.14em] text-cream"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy/15 text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-navy/8 bg-cream lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          {navChapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-md px-3 py-2 text-sm text-navy hover:bg-cream-deep"
              onClick={() => setOpen(false)}
            >
              {c.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
