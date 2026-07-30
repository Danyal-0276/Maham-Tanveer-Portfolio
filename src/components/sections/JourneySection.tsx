"use client";

import { FadeIn } from "@/components/layout/FadeIn";
import { timeline } from "@/data/biography";

export function JourneySection() {
  return (
    <section id="journey" className="section-pad">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="section-eyebrow">My Journey</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Milestones along the path
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Scroll through the chapters that shaped her—from fine arts and
            literature to teaching, welfare leadership, and a Master’s abroad.
          </p>
        </FadeIn>

        <ol className="relative mt-14 space-y-0 border-l border-gold/50 pl-8 sm:pl-10">
          {timeline.map((item, i) => (
            <FadeIn key={`${item.year}-${item.title}`} delay={i * 0.04}>
              <li className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-cream sm:-left-[2.65rem]" />
                <p className="font-serif text-2xl text-gold sm:text-3xl">
                  {item.year}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-ink/75">
                  {item.detail}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
