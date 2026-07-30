"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/biography";

export function HeroSection() {
  return (
    <section
      id="welcome"
      className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden"
    >
      <div className="hero-glow absolute inset-0" />
      <div className="particle-field pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <p className="section-eyebrow mb-4">A digital biography</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-navy sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <ul className="mt-8 space-y-2 border-l border-gold/60 pl-5">
            {profile.titles.map((t) => (
              <li key={t} className="text-lg text-ink/90 sm:text-xl">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink/80">
            {profile.shortBio}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <a href="#journey">Explore My Journey</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
            <Image
              src="/media/hero/graduation.jpg"
              alt="Maham Tanveer in graduation attire"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
