"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { certificates } from "@/data/biography";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  splitWords,
} from "@/lib/gsap";

export function CertificatesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current || !trackRef.current || reduced) return;

      const heading = rootRef.current.querySelector("[data-cert-heading]");
      if (heading instanceof HTMLElement) {
        const words = splitWords(heading);
        gsap.from(words, {
          yPercent: 120,
          opacity: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 82%" },
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        rootRef.current.querySelectorAll("[data-cert-card]")
      );

      const getScrollAmount = () => {
        const track = trackRef.current!;
        return -(track.scrollWidth - window.innerWidth + 48);
      };

      const proxy = { n: 0 };

      gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () =>
            `+=${Math.abs(getScrollAmount()) + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              cards.length - 1,
              Math.floor(self.progress * cards.length)
            );
            if (proxy.n !== idx) {
              proxy.n = idx;
              if (indexRef.current) {
                indexRef.current.textContent = String(idx + 1).padStart(2, "0");
              }
              cards.forEach((card, i) => {
                gsap.to(card, {
                  opacity: i === idx ? 1 : 0.45,
                  scale: i === idx ? 1 : 0.94,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            }
          },
        },
      });

      cards.forEach((card) => {
        const media = card.querySelector("[data-cert-media]");

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: px * 16,
            rotateX: -py * 12,
            transformPerspective: 1000,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (media) {
            gsap.to(media, {
              x: px * 18,
              y: py * 14,
              scale: 1.08,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (media) {
            gsap.to(media, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: rootRef }
  );

  const active = openIndex !== null ? certificates[openIndex] : null;

  if (reduced) {
    return (
      <section id="certificates" className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <button
              key={cert.title}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-navy/10">
                <Image src={cert.image} alt={cert.title} fill className="object-cover" />
              </div>
              <p className="mt-2 font-serif text-lg text-navy">{cert.title}</p>
            </button>
          ))}
        </div>
        <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
          <DialogContent>
            {active && (
              <>
                <DialogTitle>{active.title}</DialogTitle>
                <div className="relative mt-2 aspect-[4/3]">
                  <Image src={active.image} alt={active.title} fill className="object-contain" />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  return (
    <section
      id="certificates"
      ref={rootRef}
      className="relative overflow-hidden bg-cream"
    >
      <div className="flex min-h-[100svh] flex-col justify-center py-16">
        <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between gap-6 px-4 sm:px-6">
          <div>
            <p className="section-eyebrow">Certifications</p>
            <h2
              data-cert-heading
              className="mt-3 max-w-3xl font-serif text-4xl text-navy sm:text-6xl"
            >
              Recognition held up to the light
            </h2>
            <p className="mt-4 max-w-xl text-ink/70">
              Vertical scroll drives a horizontal archive. Hover for depth.
              Click to open.
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-navy/40">
              Active
            </p>
            <p className="font-serif text-5xl text-gold">
              <span ref={indexRef}>01</span>
              <span className="text-2xl text-navy/30">
                /{String(certificates.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex w-max gap-6 px-4 will-change-transform sm:gap-8 sm:px-10"
          style={{ perspective: "1400px" }}
        >
          {certificates.map((cert, i) => (
            <button
              key={`${cert.title}-${i}`}
              type="button"
              data-cert-card
              onClick={() => setOpenIndex(i)}
              className="group relative w-[min(78vw,22rem)] shrink-0 text-left outline-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="pointer-events-none absolute -top-7 left-0 font-serif text-5xl text-navy/[0.08]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative aspect-[3/4] overflow-hidden border border-navy/10 bg-cream-deep shadow-[0_28px_70px_rgba(15,23,42,0.14)]">
                <div data-cert-media className="absolute inset-0">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="352px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                    {cert.date}
                  </p>
                  <p className="mt-2 font-serif text-xl leading-snug">
                    {cert.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs text-cream/65">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </button>
          ))}
          <div className="w-10 shrink-0 sm:w-24" aria-hidden />
        </div>
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent>
          {active && (
            <>
              <DialogTitle>{active.title}</DialogTitle>
              <p className="text-sm text-ink/70">
                {active.issuer} · {active.date}
              </p>
              <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden bg-navy/5">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
