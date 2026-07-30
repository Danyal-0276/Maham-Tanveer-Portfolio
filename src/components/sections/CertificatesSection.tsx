"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "@/components/layout/FadeIn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { certificates } from "@/data/biography";

export function CertificatesSection() {
  const [active, setActive] = useState<(typeof certificates)[number] | null>(
    null
  );

  return (
    <section id="certificates" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="section-eyebrow">Certifications</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Recognition & credentials
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Hover to preview, click for a fullscreen glass lightbox. Certificates
            as lived milestones, not attachments.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <FadeIn key={`${cert.title}-${i}`} delay={i * 0.04}>
              <Dialog
                onOpenChange={(open) => !open && setActive(null)}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group w-full text-left"
                    onClick={() => setActive(cert)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden border border-navy/10 bg-cream-deep/40 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                        <p className="line-clamp-2 font-serif text-lg leading-snug">
                          {cert.title}
                        </p>
                        <p className="mt-1 text-xs text-cream/70">{cert.date}</p>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>{cert.title}</DialogTitle>
                  <p className="text-sm text-ink/70">
                    {cert.issuer} · {cert.date}
                  </p>
                  <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden bg-navy/5">
                    <Image
                      src={(active ?? cert).image}
                      alt={cert.title}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
