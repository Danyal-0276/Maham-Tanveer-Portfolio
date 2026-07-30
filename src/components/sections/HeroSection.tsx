"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/biography";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ");

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || !revealRef.current) return;
      if (prefersReducedMotion()) return;

      const reveal = revealRef.current;
      gsap.set(reveal, {
        "--x": "50%",
        "--y": "42%",
        "--size": "0%",
      });

      const xTo = gsap.quickTo(reveal, "--x", {
        duration: 0.55,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(reveal, "--y", {
        duration: 0.55,
        ease: "power3.out",
      });
      const sizeTo = gsap.quickTo(reveal, "--size", {
        duration: 0.45,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        const rect = sectionRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        xTo(`${x}%`);
        yTo(`${y}%`);
        sizeTo("22%");
      };

      const onEnter = () => sizeTo("22%");
      const onLeave = () => sizeTo("0%");

      const el = sectionRef.current;
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#1a100c] text-cream"
    >
      {/* Base portrait (no cap) */}
      <div className="absolute inset-0">
        <Image
          src="/media/hero/butterfly-portrait.png"
          alt="Maham Tanveer with butterfly light across her face"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
      </div>

      {/* Reveal portrait (graduation cap) — cursor spotlight */}
      <div
        ref={revealRef}
        className="hero-reveal absolute inset-0 z-[1]"
        aria-hidden
      >
        <Image
          src="/media/hero/butterfly-graduation.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#1a100c] via-[#1a100c]/25 to-[#1a100c]/50" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#1a100c]/65 via-transparent to-[#1a100c]/40" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 z-[3] border border-cream/10 sm:inset-8"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-5 top-5 z-[3] text-cream/35 sm:left-7 sm:top-7"
      >
        +
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 z-[3] text-cream/35 sm:right-7 sm:top-7"
      >
        +
      </span>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-4 pb-28 pt-8 sm:px-8 sm:pb-32 sm:pt-10">
        <div className="flex items-start justify-between gap-4">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[10rem] text-[0.65rem] uppercase tracking-[0.2em] text-cream/55"
          >
            Move to reveal
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex max-w-[14rem] items-start gap-2 text-right text-xs leading-relaxed text-cream/75 sm:max-w-xs sm:text-sm"
          >
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Stories that teach, lead, and connect across classrooms and
            continents.
          </motion.p>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-end text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-xl italic text-cream/85 sm:text-2xl md:text-3xl"
          >
            Hi, I am
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 font-serif text-[clamp(3.75rem,18vw,11rem)] leading-[0.85] tracking-tight text-cream"
          >
            {firstName}
          </motion.h1>
          {lastName && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-2 font-serif text-2xl tracking-[0.18em] text-gold sm:text-3xl md:text-4xl"
            >
              {lastName}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-10 grid w-full max-w-6xl gap-6 border-t border-cream/15 pt-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end sm:gap-8"
        >
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream">
              Educator · Researcher · Project Management
            </p>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
            {profile.shortBio}
          </p>
          <div className="sm:justify-self-end">
            <Button asChild size="lg" variant="gold">
              <a href="#education">Explore My Story</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
