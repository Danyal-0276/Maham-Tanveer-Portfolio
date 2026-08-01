"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { gallery } from "@/data/biography";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/gsap";
import { SectionShell } from "@/components/layout/SectionShell";

const ENTRANCES = [
  { x: -48, y: 32, rotate: -5, scale: 0.94 },
  { x: 52, y: 28, rotate: 5, scale: 0.93 },
  { x: 0, y: 56, rotate: -3, scale: 0.95 },
  { x: -36, y: -28, rotate: 4, scale: 0.94 },
  { x: 40, y: 48, rotate: -6, scale: 0.92 },
  { x: -28, y: 52, rotate: 3, scale: 0.95 },
] as const;

export function GallerySection() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current || reduced) return;

      const items = gsap.utils.toArray<HTMLElement>(
        rootRef.current.querySelectorAll("[data-gallery-item]")
      );

      items.forEach((item, i) => {
        const entrance = ENTRANCES[i % ENTRANCES.length]!;
        const media = item.querySelector("[data-gallery-media]");
        const caption = item.querySelector("[data-gallery-caption]");

        gsap.set(item, { autoAlpha: 0 });
        if (media) {
          gsap.set(media, {
            x: entrance.x,
            y: entrance.y,
            rotate: entrance.rotate,
            scale: entrance.scale,
            transformOrigin: "50% 50%",
          });
        }
        if (caption) gsap.set(caption, { autoAlpha: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: (i % 3) * 0.05,
        });

        tl.to(item, { autoAlpha: 1, duration: 0.01 }, 0);
        if (media) {
          tl.to(
            media,
            {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            0
          );
        }
        if (caption) {
          tl.to(
            caption,
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.25
          );
        }
      });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section
      id="gallery"
      ref={rootRef}
      className="section-pad overflow-x-clip bg-cream-deep/40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionShell preset="rise" splitHeading>
          <div data-motion-target>
            <p className="section-eyebrow">Gallery</p>
            <h2
              data-motion-heading
              className="mt-3 font-serif text-4xl text-navy sm:text-5xl"
            >
              Moments that linger
            </h2>
            <p className="mt-4 max-w-2xl text-ink/75">
              Graduation, campus, and the atmosphere of a life in motion. Each
              image a quiet caption in the biography.
            </p>
          </div>
        </SectionShell>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((item, i) => (
            <div
              key={item.src}
              data-gallery-item
              className="mb-4 break-inside-avoid"
              style={
                reduced
                  ? undefined
                  : { opacity: 0, visibility: "hidden" as const }
              }
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="group w-full text-left">
                    <figure className="overflow-hidden">
                      <div
                        data-gallery-media
                        className="relative w-full overflow-hidden will-change-transform"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={1000}
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                          priority={i < 3}
                        />
                      </div>
                      <figcaption
                        data-gallery-caption
                        className="mt-2 font-serif text-sm italic text-ink/70"
                      >
                        {item.caption}
                      </figcaption>
                    </figure>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="sr-only">{item.alt}</DialogTitle>
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                  <p className="font-serif text-lg italic text-navy">
                    {item.caption}
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
