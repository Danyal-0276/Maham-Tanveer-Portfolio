"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/biography";

export function HeroSection() {
  const revealRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [firstName, ...rest] = profile.name.split(" ");
  return (
    <section id="welcome" className="relative min-h-svh overflow-hidden bg-[#1a100c] text-cream"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || revealed || !revealRef.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        revealRef.current.style.setProperty("--spot-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        revealRef.current.style.setProperty("--spot-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        revealRef.current.style.setProperty("--spot-size", "24%");
      }}
      onPointerLeave={() => revealRef.current?.style.setProperty("--spot-size", "0%")}
    >
      <Image src="/media/hero/butterfly-portrait.png" alt="Portrait of Maham Tanveer" fill preload sizes="100vw" className="object-cover object-[center_18%]" />
      <div ref={revealRef} aria-hidden="true" className="hero-spotlight absolute inset-0" style={{ clipPath: revealed ? "inset(0)" : undefined }}>
        <Image src="/media/hero/butterfly-graduation.png" alt="" fill sizes="100vw" className="object-cover object-[center_18%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a100c] via-[#1a100c]/30 to-[#1a100c]/60" />
      <div className="relative mx-auto flex min-h-svh max-w-[100rem] flex-col justify-between px-6 pb-28 pt-8 sm:px-10 sm:pt-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="max-w-xs text-xs leading-relaxed tracking-wide text-cream/85">Stories that teach, lead, and connect across classrooms and continents.</p>
          <button type="button" aria-pressed={revealed} onClick={() => setRevealed((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-cream/35 bg-navy/40 px-4 py-2 text-xs text-cream backdrop-blur-sm"><GraduationCap size={16} aria-hidden="true" />{revealed ? "View original portrait" : "View graduation portrait"}</button>
        </div>
        <div className="mx-auto w-full max-w-6xl pt-40 text-center sm:pt-48">
          <p className="font-serif text-2xl italic text-cream/90">Hi, I am</p>
          <h1 className="mt-3 font-serif text-[clamp(4rem,17vw,11rem)] leading-[0.9] tracking-tight">{firstName}<span className="mt-4 block text-[clamp(1.5rem,5vw,3rem)] tracking-[0.18em] text-gold">{rest.join(" ")}</span></h1>
          <div className="mt-10 grid gap-5 border-t border-cream/25 pt-6 text-left sm:grid-cols-[1fr_1.3fr_auto] sm:items-center sm:gap-8">
            <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.14em]">Educator · Researcher · Project Management</p>
            <p className="max-w-xl text-sm leading-relaxed text-cream/85">{profile.shortBio}</p>
            <Button asChild size="lg" variant="gold"><a href="#who-i-am">Explore my story <ArrowDown size={16} aria-hidden="true" /></a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
