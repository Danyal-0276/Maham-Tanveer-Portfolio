import { ChapterOrnament } from "@/components/layout/ChapterOrnament";
import Image from "next/image";
import { experience } from "@/data/biography";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-pad bg-cream">
      <ChapterOrnament variant="flower" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Professional experience</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">Roles that shaped practice</h2>
          <p className="mt-4 leading-relaxed text-ink/75">From literacy instruction and newsroom research to service and community outreach.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {experience.map((job) => (
            <article key={job.org} className="overflow-hidden rounded-sm border border-navy/10 bg-white/50">
              <div className={`relative h-52 sm:h-60 ${job.imageBg === "dark" ? "bg-navy" : "bg-cream-deep"}`}>
                <Image src={job.image} alt={job.org} fill sizes="(max-width: 1024px) 90vw, 45vw" className={job.imageFit === "contain" ? "object-contain p-8" : "object-cover"} />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.12em] text-ink/65">{job.dates}</p>
                <h3 className="mt-3 font-serif text-3xl text-navy">{job.role}</h3>
                <p className="mt-2 font-medium text-ink/80">{job.org} · {job.location}</p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/75">
                  {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full border border-navy/10 px-3 py-1 text-xs text-navy">{skill}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
