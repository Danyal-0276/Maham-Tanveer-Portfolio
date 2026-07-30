import { FadeIn } from "@/components/layout/FadeIn";
import { testimonials } from "@/data/biography";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="section-eyebrow">Testimonials</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Voices to come
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Placeholder frames for a principal, professor, and supervisor—
            awaiting authentic quotes.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.role} delay={i * 0.08}>
              <blockquote className="flex h-full flex-col border border-dashed border-navy/20 bg-cream-deep/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-gold">
                  {t.role}
                  {t.placeholder ? " · Placeholder" : ""}
                </p>
                <p className="mt-5 flex-1 font-serif text-xl leading-relaxed text-ink/70 italic">
                  “{t.quote}”
                </p>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
