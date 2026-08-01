"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { experience } from "@/data/biography";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  splitWords,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  const count = experience.length;

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current || !pinRef.current || reduced) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        rootRef.current.querySelectorAll("[data-exp-panel]")
      );
      const images = gsap.utils.toArray<HTMLElement>(
        rootRef.current.querySelectorAll("[data-exp-image]")
      );
      const numbers = gsap.utils.toArray<HTMLElement>(
        rootRef.current.querySelectorAll("[data-exp-num]")
      );
      const ticks = gsap.utils.toArray<HTMLElement>(
        rootRef.current.querySelectorAll("[data-exp-tick]")
      );

      if (!panels.length || panels.length !== count) return;

      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(images, { autoAlpha: 0, scale: 1.1 });
      gsap.set(numbers, { autoAlpha: 0, yPercent: 35 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      gsap.set(numbers[0], { autoAlpha: 1, yPercent: 0 });
      if (ticks[0]) {
        gsap.set(ticks[0], { backgroundColor: "#C8A96A", scaleY: 1.55 });
      }

      const heading = rootRef.current.querySelector("[data-exp-heading]");
      if (heading instanceof HTMLElement) {
        const words = splitWords(heading);
        gsap.from(words, {
          yPercent: 70,
          opacity: 0,
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: pinRef.current, start: "top 80%" },
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () =>
            `+=${Math.max(panels.length, 1) * window.innerHeight * 0.7}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            duration: Math.max(panels.length - 1, 1),
          },
          0
        );
      }

      panels.forEach((_, i) => {
        if (i === 0) return;
        const at = i;

        tl.to(
          images[i - 1],
          { autoAlpha: 0, scale: 0.96, duration: 0.55, ease: "power2.inOut" },
          at
        );
        tl.fromTo(
          images[i],
          { autoAlpha: 0, scale: 1.06 },
          { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.inOut" },
          at
        );

        tl.to(
          numbers[i - 1],
          { autoAlpha: 0, yPercent: -24, duration: 0.28, ease: "power2.in" },
          at
        );
        tl.fromTo(
          numbers[i],
          { autoAlpha: 0, yPercent: 28 },
          { autoAlpha: 1, yPercent: 0, duration: 0.35, ease: "power2.out" },
          at + 0.05
        );

        tl.to(
          panels[i - 1],
          { autoAlpha: 0, y: -16, duration: 0.28, ease: "power2.in" },
          at
        );
        tl.fromTo(
          panels[i],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
          at + 0.06
        );

        if (ticks[i - 1]) {
          tl.to(
            ticks[i - 1],
            {
              backgroundColor: "rgba(200,169,106,0.25)",
              scaleY: 1,
              duration: 0.25,
            },
            at
          );
        }
        if (ticks[i]) {
          tl.to(
            ticks[i],
            { backgroundColor: "#C8A96A", scaleY: 1.55, duration: 0.25 },
            at
          );
        }
      });
    },
    { scope: rootRef, dependencies: [reduced, count], revertOnUpdate: true }
  );

  if (reduced) {
    return (
      <section id="experience" className="section-pad bg-cream">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <p className="section-eyebrow">Professional Experience</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">
              Roles that shaped practice
            </h2>
          </div>
          {experience.map((job) => (
            <article key={`${job.org}-${job.dates}`}>
              <p className="text-sm uppercase tracking-[0.14em] text-gold">
                {job.dates}
              </p>
              <h3 className="mt-1 font-serif text-2xl text-navy">{job.role}</h3>
              <p className="text-ink/75">
                {job.org} · {job.location}
              </p>
              <ul className="mt-3 space-y-1 text-ink/70">
                {job.responsibilities.map((r) => (
                  <li key={r}>· {r}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={rootRef}
      className="relative bg-navy text-cream"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          {experience.map((job, i) => (
            <div
              key={`${job.org}-bg`}
              data-exp-image
              className={cn(
                "absolute inset-0",
                job.imageFit === "contain" && job.imageBg === "dark" && "bg-navy",
                job.imageFit === "contain" && job.imageBg === "light" && "bg-cream"
              )}
              style={{ zIndex: i }}
            >
              <Image
                src={job.image}
                alt=""
                fill
                sizes="100vw"
                className={cn(
                  job.imageFit === "contain"
                    ? job.imageBg === "light"
                      ? "object-contain p-10 sm:p-16"
                      : "object-contain p-16 sm:p-24"
                    : "object-cover"
                )}
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
            </div>
          ))}
        </div>

        <div className="absolute left-4 right-4 top-6 z-10 mx-auto flex max-w-7xl items-center gap-4 sm:left-6 sm:right-6 sm:top-8">
          <div className="flex gap-1.5">
            {experience.map((job) => (
              <span
                key={`${job.org}-tick`}
                data-exp-tick
                className="h-8 w-1 origin-top rounded-full bg-gold/25"
              />
            ))}
          </div>
          <div className="h-px flex-1 overflow-hidden bg-cream/15">
            <div
              ref={progressRef}
              className="h-full origin-left bg-gold"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <p className="hidden text-[0.65rem] uppercase tracking-[0.18em] text-cream/50 sm:block">
            Scroll the theatre · {String(count).padStart(2, "0")} roles
          </p>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-12">
          <div className="relative h-[7rem] sm:h-[9.5rem]">
            {experience.map((job, i) => (
              <p
                key={`${job.org}-num`}
                data-exp-num
                className="absolute left-0 top-0 font-serif text-[clamp(4.5rem,14vw,9.5rem)] leading-none text-gold"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </p>
            ))}
          </div>

          <div className="relative min-h-[18rem] sm:min-h-[20rem]">
            <p className="section-eyebrow !text-gold">Professional Experience</p>
            <h2
              data-exp-heading
              className="mt-2 font-serif text-3xl text-cream sm:text-4xl"
            >
              Roles that shaped practice
            </h2>

            {experience.map((job) => (
              <div
                key={`${job.org}-${job.dates}`}
                data-exp-panel
                className="absolute inset-x-0 top-24 sm:top-28"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-gold">
                  {job.dates}
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight text-cream sm:text-5xl">
                  {job.role}
                </h3>
                <p className="mt-2 text-lg text-cream/80">
                  {job.org} · {job.location}
                </p>
                <ul className="mt-5 max-w-xl space-y-2 text-sm leading-relaxed text-cream/70 sm:text-base">
                  {job.responsibilities.slice(0, 3).map((r) => (
                    <li key={r}>· {r}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="border border-cream/20 bg-cream/5 px-3 py-1 text-[0.7rem] tracking-wide text-cream/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
