"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { testimonials } from "@/data/biography";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionShell preset="rise" splitHeading>
          <div data-motion-target>
            <p className="section-eyebrow">Testimonials</p>
            <h2
              data-motion-heading
              className="mt-3 font-serif text-4xl text-navy sm:text-5xl"
            >
              Voices to come
            </h2>
            <p className="mt-4 max-w-2xl text-ink/75">
              Placeholder frames for a principal, professor, and supervisor,
              awaiting authentic quotes.
            </p>
          </div>
        </SectionShell>

        <SectionShell className="mt-12" staggerChildren childPreset="rise">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.role}
                data-motion-child
                className="flex h-full flex-col border border-dashed border-navy/20 bg-cream-deep/30 p-6"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-gold">
                  {t.role}
                  {t.placeholder ? " · Placeholder" : ""}
                </p>
                <p className="mt-5 flex-1 font-serif text-xl leading-relaxed text-ink/70 italic">
                  “{t.quote}”
                </p>
              </blockquote>
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
