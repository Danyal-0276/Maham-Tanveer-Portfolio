"use client";

import { FadeIn } from "@/components/layout/FadeIn";
import { skills } from "@/data/biography";

export function SkillsSection() {
  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto max-w-5xl text-center">
        <FadeIn>
          <p className="section-eyebrow">Skills</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Craft in motion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/75">
            Capabilities shaped by classrooms, newsrooms, campaigns, and
            postgraduate project study, presented as living tags, not meters.
          </p>
        </FadeIn>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <FadeIn key={skill} delay={i * 0.03}>
              <span className="inline-block border border-navy/15 bg-cream px-5 py-2.5 text-sm text-navy transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_0_24px_rgba(200,169,106,0.35)]">
                {skill}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
