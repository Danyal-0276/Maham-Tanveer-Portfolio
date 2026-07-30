"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navChapters, profile } from "@/data/biography";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (open) {
        setHidden(false);
      } else if (y < 48) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const linkClass =
    "whitespace-nowrap rounded-full px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-cream/75 transition hover:bg-cream/10 hover:text-cream";

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 transition-transform duration-300 ease-out sm:bottom-5",
        hidden && !open ? "translate-y-[calc(100%+2rem)]" : "translate-y-0"
      )}
    >
      <div className="pointer-events-auto relative w-full max-w-4xl">
        <div
          className={cn(
            "relative mx-auto flex items-center gap-1.5 rounded-full border border-white/20 px-1.5 py-1 shadow-[0_10px_40px_rgba(15,23,42,0.3),inset_0_1px_0_rgba(255,255,255,0.22)]",
            "bg-navy/45 backdrop-blur-2xl supports-[backdrop-filter]:bg-navy/35",
            "before:pointer-events-none before:absolute before:inset-px before:rounded-full before:bg-gradient-to-b before:from-white/12 before:to-transparent before:opacity-80"
          )}
        >
          <a
            href="#welcome"
            className="relative z-10 flex shrink-0 items-center gap-1.5 rounded-full bg-cream/10 p-1 pr-2.5 ring-1 ring-white/15"
            aria-label="Home"
          >
            <Image
              src="/brand/mt-logo.png"
              alt=""
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
              priority
              unoptimized
            />
            <span className="hidden font-serif text-xs text-cream sm:inline">
              {profile.name.split(" ")[0]}
            </span>
          </a>

          <nav className="relative z-10 hidden min-w-0 flex-1 items-center justify-center gap-0 overflow-x-auto lg:flex">
            {navChapters
              .filter((c) => c.id !== "welcome" && c.id !== "contact")
              .slice(0, 7)
              .map((c) => (
                <a key={c.id} href={`#${c.id}`} className={linkClass}>
                  {c.label}
                </a>
              ))}
          </nav>

          <a
            href="#contact"
            className="relative z-10 ml-auto hidden rounded-full bg-gold px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-navy transition hover:bg-gold/90 sm:inline-flex"
          >
            Contact
          </a>

          <button
            type="button"
            className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-cream/10 text-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <div
          className={cn(
            "absolute bottom-[calc(100%+0.75rem)] left-0 right-0 overflow-hidden rounded-3xl border border-white/20 bg-navy/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-2xl lg:hidden",
            open ? "block" : "hidden"
          )}
        >
          <nav className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto">
            {navChapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-2xl px-4 py-3 text-sm text-cream/90 hover:bg-cream/10"
                onClick={() => setOpen(false)}
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
