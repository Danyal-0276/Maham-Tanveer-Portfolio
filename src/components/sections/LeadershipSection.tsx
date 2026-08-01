"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { leadership } from "@/data/biography";

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="section-pad relative overflow-hidden bg-cream-deep/50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cpath fill='%230F172A' d='M40 8c-6 10-18 14-18 28a18 18 0 0036 0c0-14-12-18-18-28zm-8 52c-4 2-8 6-8 12h32c0-6-4-10-8-12-4 4-8 4-16 0z'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionShell preset="slideRight" splitHeading>
          <div data-motion-target>
            <p className="section-eyebrow">Leadership</p>
            <h2
              data-motion-heading
              className="mt-3 font-serif text-4xl text-navy sm:text-5xl"
            >
              Service beyond the classroom
            </h2>
            <p className="mt-4 max-w-2xl text-ink/75">
              Animal welfare, conference stewardship, and student leadership:
              achievements told as chapters of responsibility.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          className="mt-14"
          staggerChildren
          childPreset="slideRight"
        >
          <div className="grid gap-8 md:grid-cols-3">
            {leadership.map((item) => (
              <article
                key={item.org}
                data-motion-child
                className="h-full border border-navy/10 bg-cream/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-gold/40"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-gold">
                  {item.dates}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 font-medium text-ink">{item.org}</p>
                <p className="text-sm text-ink/60">{item.place}</p>
                <ul className="mt-5 space-y-2 border-t border-navy/10 pt-5 text-sm leading-relaxed text-ink/75">
                  {item.points.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
