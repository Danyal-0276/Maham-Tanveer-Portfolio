"use client";

import { ChapterOrnament } from "@/components/layout/ChapterOrnament";
import { skills } from "@/data/biography";

export function SkillsSection() {
  return (
    <section id="skills" className="section-pad">
      <ChapterOrnament variant="flower" />
      <div className="mx-auto max-w-5xl text-center">
        <div>
          <div data-motion-target>
            <p className="section-eyebrow">Skills</p>
            <h2
              data-motion-heading
              className="mt-3 font-serif text-4xl text-navy sm:text-5xl"
            >
              Skills built through practice
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/75">
              Capabilities shaped by classrooms, newsrooms, campaigns, and
              postgraduate project study.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                data-motion-child
                className="inline-block border border-navy/15 bg-cream px-5 py-2.5 text-sm text-navy transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_0_24px_rgba(200,169,106,0.35)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
