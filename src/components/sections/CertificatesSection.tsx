"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { certificates, featuredCertificate } from "@/data/biography";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  splitWords,
} from "@/lib/gsap";
import { FadeIn } from "@/components/layout/FadeIn";

export function CertificatesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);
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

      const featured = rootRef.current.querySelector("[data-lums-feature]");
      if (featured) {
        gsap.from(featured, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: featured, start: "top 78%" },
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
          trigger: rootRef.current.querySelector("[data-cert-archive]"),
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
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true }
  );

  const active = openIndex !== null ? certificates[openIndex] : null;

  return (
    <section id="certificates" ref={rootRef} className="relative bg-cream">
      {/* Featured LUMS certificate — separate from campus archive */}
      <div className="section-pad border-b border-navy/10">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="section-eyebrow">Certifications</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl text-navy sm:text-5xl">
              Recognition held up to the light
            </h2>
          </FadeIn>

          <div
            data-lums-feature
            className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
          >
            <button
              type="button"
              onClick={() => setFeaturedOpen(true)}
              className="group relative overflow-hidden border border-navy/15 bg-cream-deep text-left shadow-[0_28px_70px_rgba(15,23,42,0.1)] outline-none transition duration-500 hover:-translate-y-1 hover:border-gold/50"
              aria-label={`View ${featuredCertificate.title} certificate`}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                <Image
                  src={featuredCertificate.image}
                  alt={`${featuredCertificate.documentTitle} — ${featuredCertificate.title}, ${featuredCertificate.issuerShort}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain object-center p-4 sm:p-6"
                  priority
                />
              </div>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-navy/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-cream opacity-0 transition group-hover:opacity-100">
                View full size
                <ExternalLink className="size-3" aria-hidden />
              </span>
            </button>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">
                Featured · External institute
              </p>
              <p className="mt-3 text-sm font-medium tracking-wide text-navy/55">
                {featuredCertificate.issuerShort} ·{" "}
                {featuredCertificate.department}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
                {featuredCertificate.title}
              </h3>
              <p className="mt-1 text-lg text-ink/60">
                {featuredCertificate.documentTitle}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-gold">
                {featuredCertificate.dateLabel}
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75">
                {featuredCertificate.summary}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-navy/10 pt-6 text-sm text-ink/70">
                {featuredCertificate.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-ink/45">
                {featuredCertificate.issuer} · {featuredCertificate.date}
              </p>
              <a
                href="https://ces.lums.edu.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-navy underline-offset-4 transition hover:text-gold hover:underline"
              >
                About LUMS CES
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Campus & conference archive */}
      {reduced ? (
        <div className="section-pad">
          <p className="section-eyebrow">Campus & conference archive</p>
          <h3 className="mt-3 font-serif text-3xl text-navy">
            University recognitions
          </h3>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((cert, i) => (
              <button
                key={cert.title}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden border border-navy/10 bg-cream-deep">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                <p className="mt-2 font-serif text-lg text-navy">{cert.title}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          data-cert-archive
          className="relative overflow-hidden"
        >
          <div className="flex min-h-svh flex-col justify-center py-16">
            <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between gap-6 px-4 sm:px-6">
              <div>
                <p className="section-eyebrow">Campus & conference archive</p>
                <h3
                  data-cert-heading
                  className="mt-3 max-w-2xl font-serif text-3xl text-navy sm:text-5xl"
                >
                  University recognitions
                </h3>
                <p className="mt-4 max-w-xl text-ink/70">
                  Workshops, volunteering, and conference stewardship from the
                  University of Central Punjab years. Scroll to move through the
                  archive.
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
                  <span className="pointer-events-none absolute -top-7 left-0 font-serif text-5xl text-navy/8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative aspect-[3/4] overflow-hidden border border-navy/10 bg-cream-deep shadow-[0_28px_70px_rgba(15,23,42,0.14)]">
                    <div data-cert-media className="absolute inset-0">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="352px"
                        className="object-contain object-center p-4"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
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
        </div>
      )}

      <Dialog open={featuredOpen} onOpenChange={setFeaturedOpen}>
        <DialogContent className="max-w-4xl">
          <DialogTitle>
            {featuredCertificate.documentTitle} — {featuredCertificate.title}
          </DialogTitle>
          <p className="text-sm text-ink/70">
            {featuredCertificate.issuer} · {featuredCertificate.department} ·{" "}
            {featuredCertificate.date}
          </p>
          <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden bg-cream-deep">
            <Image
              src={featuredCertificate.image}
              alt={featuredCertificate.title}
              fill
              sizes="90vw"
              className="object-contain p-2"
            />
          </div>
        </DialogContent>
      </Dialog>

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
              <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden bg-cream-deep">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  className="object-contain p-2"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
