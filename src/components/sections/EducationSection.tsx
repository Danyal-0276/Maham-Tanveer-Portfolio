import Image from "next/image";
import { FadeIn } from "@/components/layout/FadeIn";
import { education } from "@/data/biography";

export function EducationSection() {
  return (
    <section id="education" className="section-pad bg-navy text-cream">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="section-eyebrow !text-gold">Education</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            University records
          </h2>
          <p className="mt-4 max-w-2xl text-cream/70">
            Formal study across Lahore and Sunderland—each chapter deepening
            craft, curiosity, and professional readiness.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {education.map((ed, i) => (
            <FadeIn key={ed.id} delay={i * 0.08}>
              <article className="group relative overflow-hidden border border-cream/15 bg-navy transition duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={ed.image}
                    alt={ed.institution}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                </div>
                <div className="relative space-y-3 p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">
                    {ed.status}
                  </p>
                  <h3 className="font-serif text-2xl leading-snug">
                    {ed.degree}
                  </h3>
                  <p className="font-medium text-cream/90">{ed.institution}</p>
                  <p className="text-sm text-cream/60">
                    {ed.campus} · {ed.duration}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-cream/10 pt-4 text-sm text-cream/75">
                    {ed.highlights.map((h) => (
                      <li key={h}>· {h}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
