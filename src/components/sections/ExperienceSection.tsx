import Image from "next/image";
import { FadeIn } from "@/components/layout/FadeIn";
import { experience } from "@/data/biography";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="section-eyebrow">Professional Experience</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Roles that shaped practice
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Teaching, journalism research, service, and UK workplace experience, 
            told as chapters rather than a résumé dump.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-16">
          {experience.map((job, i) => {
            const reverse = i % 2 === 1;
            return (
              <FadeIn key={`${job.org}-${job.dates}`} delay={0.05}>
                <article
                  className={cn(
                    "grid items-center gap-8 lg:grid-cols-2 lg:gap-12",
                    reverse && "lg:[&>*:first-child]:order-2"
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-[5/4] overflow-hidden",
                      job.imageFit === "contain"
                        ? job.imageBg === "dark"
                          ? "bg-navy"
                          : "bg-cream"
                        : "bg-cream-deep"
                    )}
                  >
                    <Image
                      src={job.image}
                      alt={job.org}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={cn(
                        "transition duration-700 hover:scale-[1.03]",
                        job.imageFit === "contain"
                          ? "object-contain p-8"
                          : "object-cover"
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.14em] text-gold">
                      {job.dates}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl text-navy">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-lg text-ink/80">
                      {job.org} · {job.location}
                    </p>
                    <ul className="mt-6 space-y-2 text-ink/75">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="leading-relaxed">
                          · {r}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <span
                          key={s}
                          className="border border-navy/15 bg-cream-deep/60 px-3 py-1 text-xs tracking-wide text-navy"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
