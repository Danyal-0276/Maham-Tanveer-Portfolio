"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { InfiniteGallery } from "@/components/ui/InfiniteGallery";
import { gallery } from "@/data/biography";
import { prefersReducedMotion } from "@/lib/gsap";
import { SectionShell } from "@/components/layout/SectionShell";

export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  const images = useMemo(
    () =>
      gallery.map((item) => ({
        src: item.src,
        alt: item.alt,
        caption: item.caption,
      })),
    []
  );

  const active = openIndex !== null ? gallery[openIndex] : null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-24">
        <SectionShell preset="rise" splitHeading>
          <div
            data-motion-target
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="section-eyebrow">Gallery</p>
              <h2
                data-motion-heading
                className="mt-3 font-serif text-4xl text-navy sm:text-5xl"
              >
                Moments that linger
              </h2>
              <p className="mt-4 max-w-xl text-ink/75">
                An endless field of memory. Drag to wander, pinch or Ctrl+scroll
                to deepen, click a frame to open it.
              </p>
            </div>
            {!reduced && (
              <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                Drag · Pinch / Ctrl+scroll · Click
              </p>
            )}
          </div>
        </SectionShell>
      </div>

      {reduced ? (
        <div className="mx-auto mt-12 max-w-7xl columns-1 gap-4 px-4 pb-20 sm:columns-2 sm:px-6 lg:columns-3">
          {gallery.map((item) => (
            <button
              key={item.src}
              type="button"
              className="mb-4 break-inside-avoid text-left"
              onClick={() =>
                setOpenIndex(gallery.findIndex((g) => g.src === item.src))
              }
            >
              <figure>
                <div className="relative overflow-hidden border border-navy/10">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={1000}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 font-serif text-sm italic text-ink/70">
                  {item.caption}
                </figcaption>
              </figure>
            </button>
          ))}
        </div>
      ) : (
        <div className="relative mt-10 h-[min(78vh,52rem)] w-full border-y border-navy/10">
          <InfiniteGallery
            images={images}
            density={5}
            imageWidth={168}
            imageHeight={214}
            rounded={0}
            dragSpeed={18}
            driftAmount={9}
            friction={11}
            backgroundColor="#efe8df"
            onSelect={(_, index) => setOpenIndex(index)}
          />
          {/* Soft vignette so the canvas settles into the page */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 42%, rgba(248,245,242,0.55) 78%, rgba(248,245,242,0.92) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream to-transparent" />
        </div>
      )}

      <div className="h-16 sm:h-20" aria-hidden />

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent>
          {active && (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <div className="relative aspect-[4/5] w-full bg-cream-deep">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <p className="font-serif text-lg italic text-navy">
                {active.caption}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
