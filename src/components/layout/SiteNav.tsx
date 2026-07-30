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
    "whitespace-nowrap rounded-full px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-cream/75 transition hover:bg-cream/10 hover:text-cream";

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 transition-transform duration-300 ease-out sm:bottom-6",
        hidden && !open ? "translate-y-[calc(100%+2rem)]" : "translate-y-0"
      )}
    >
      <div className="pointer-events-auto relative w-full max-w-5xl">
        <div
          className={cn(
            "relative mx-auto flex items-center gap-2 rounded-full border border-white/20 px-2 py-2 shadow-[0_12px_50px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]",
            "bg-navy/45 backdrop-blur-2xl supports-[backdrop-filter]:bg-navy/35",
            "before:pointer-events-none before:absolute before:inset-px before:rounded-full before:bg-gradient-to-b before:from-white/15 before:to-transparent before:opacity-80"
          )}
        >
          <a
            href="#welcome"
            className="relative z-10 flex shrink-0 items-center gap-2 rounded-full bg-cream/10 p-1.5 pr-3 ring-1 ring-white/15"
            aria-label="Home"
          >
            <Image
              src="/brand/mt-logo.png"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              priority
              unoptimized
            />
            <span className="hidden font-serif text-sm text-cream sm:inline">
              {profile.name.split(" ")[0]}
            </span>
          </a>

          <nav className="relative z-10 hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto lg:flex">
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
            className="relative z-10 ml-auto hidden rounded-full bg-gold px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.14em] text-navy transition hover:bg-gold/90 sm:inline-flex"
          >
            Contact
          </a>

          <button
            type="button"
            className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-cream/10 text-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
