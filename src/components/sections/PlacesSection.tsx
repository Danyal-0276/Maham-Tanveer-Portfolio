"use client";

import { useState } from "react";
import { FadeIn } from "@/components/layout/FadeIn";
import { places } from "@/data/biography";
import { cn } from "@/lib/utils";

export function PlacesSection() {
  const [active, setActive] = useState(places[0]);

  return (
    <section id="places" className="section-pad bg-cream-deep/40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="section-eyebrow">Places</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Where the story unfolded
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            From Lahore to the North East of England—click a pin to reveal each
            chapter of place.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <div className="relative aspect-[16/10] overflow-hidden border border-navy/10 bg-gradient-to-br from-cream via-cream-deep to-[#d9e2ec]">
              <svg
                viewBox="0 0 100 70"
                className="h-full w-full"
                aria-hidden
              >
                <path
                  d="M8 45 C 20 30, 35 25, 48 38 C 58 48, 70 42, 88 28"
                  fill="none"
                  stroke="#C8A96A"
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1.2"
                  opacity="0.7"
                />
              </svg>
              {places.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition",
                    active.id === p.id
                      ? "h-4 w-4 bg-accent ring-4 ring-gold/40"
                      : "h-3 w-3 bg-navy/70 hover:bg-gold"
                  )}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={p.name}
                />
              ))}
              <div className="pointer-events-none absolute bottom-3 left-3 text-[0.65rem] uppercase tracking-[0.16em] text-navy/40">
                Stylized journey map
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center border border-navy/10 bg-cream p-8">
              <p className="section-eyebrow">Selected</p>
              <h3 className="mt-3 font-serif text-3xl text-navy">
                {active.name}
              </h3>
              <p className="mt-4 leading-relaxed text-ink/75">{active.detail}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {places.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(p)}
                    className={cn(
                      "px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition",
                      active.id === p.id
                        ? "bg-navy text-cream"
                        : "border border-navy/15 text-navy hover:border-gold"
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
