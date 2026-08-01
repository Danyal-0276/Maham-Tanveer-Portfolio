"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { masters } from "@/data/biography";

export function MastersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="masters"
      className="section-pad relative overflow-hidden bg-navy text-cream"
    >
      <div className="absolute inset-0 opacity-30">
        <Image
          src={masters.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <SectionShell preset="scaleSoft" splitHeading>
          <div data-motion-target>
            <p className="section-eyebrow !text-gold">Currently Pursuing</p>
            <h2
              data-motion-heading
              className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl"
            >
              {masters.title}
            </h2>
            <p className="mt-3 text-xl text-cream/85">
              {masters.institution} · {masters.campus}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-gold">
              Started {masters.started} · {masters.pathway} · Expected{" "}
              {masters.expected}
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cream/80">
              {masters.blurb}
            </p>
          </div>
        </SectionShell>

        <div ref={ref} className="mt-10">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-sm uppercase tracking-[0.14em] text-cream/60">
              Progress
            </span>
            <span className="font-serif text-3xl text-gold">
              {masters.progress}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-cream/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold to-accent"
              initial={{ width: 0 }}
              animate={{ width: inView ? `${masters.progress}%` : 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="mt-3 text-sm text-cream/60">
            Expected graduation · {masters.expected}
          </p>
        </div>

        <SectionShell
          className="mt-10"
          staggerChildren
          childPreset="floatIn"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {masters.focus.map((f) => (
              <li
                key={f}
                data-motion-child
                className="border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream/85 backdrop-blur-sm"
              >
                {f}
              </li>
            ))}
          </ul>
        </SectionShell>
      </div>
    </section>
  );
}
