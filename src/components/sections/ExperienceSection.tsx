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
          <p className="mt-4 leading-relaxed text-ink/75">A journey through classrooms, newsrooms, and communities. Each role adds a new perspective to the work that follows.</p>
        </div>
        <div className="experience-timeline mt-14 sm:mt-20">
          <div className="experience-track" aria-hidden="true"><div data-timeline-progress className="experience-track-fill" /></div>
          <ol className="space-y-10 sm:space-y-14">
          {[...experience].reverse().map((job, index) => (
            <li key={job.org} className="experience-stop">
              <div className="experience-date">
                <p className="text-xs font-medium uppercase leading-relaxed tracking-[0.12em] text-ink/70">{job.dates}</p>
                <p className="mt-2 text-xs text-ink/50">{job.location}</p>
              </div>
              <span className="experience-marker" data-timeline-marker aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <article className="experience-card">
                <div className="experience-card-heading">
                  <div>
                    {index === experience.length - 1 && <p className="mb-3 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />The current chapter</p>}
                    <h3 className="font-serif text-3xl leading-tight text-navy sm:text-4xl">{job.role}</h3>
                    <p className="mt-3 text-sm font-medium text-ink/75">{job.org}</p>
                  </div>
                  <div className={`experience-image ${job.imageBg === "dark" ? "bg-navy" : "bg-cream-deep"}`}>
                    <Image src={job.image} alt={job.org} fill sizes="(max-width: 639px) 76px, 120px" className={job.imageFit === "contain" ? "object-contain p-3" : "object-cover"} />
                  </div>
                </div>
                <ul className="experience-responsibilities mt-6 space-y-3 border-t border-navy/10 pt-6 text-sm leading-relaxed text-ink/75">
                  {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-[0.65rem] text-navy">{skill}</span>)}</div>
              </article>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
