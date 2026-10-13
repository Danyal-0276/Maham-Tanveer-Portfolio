"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { gallery } from "@/data/biography";
import { galleryMedia } from "@/data/gallery-media";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/lib/gsap";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { Button } from "@/components/ui/button";
import { ChapterOrnament } from "@/components/layout/ChapterOrnament";

const categories = [
  "All moments",
  "Graduation",
  "Campus",
  "Community",
  "Everyday",
];

export function GallerySection() {
  const root = useRef<HTMLElement>(null);
  const [category, setCategory] = useState("All moments");
  const [compact, setCompact] = useState(false);
  const [limit, setLimit] = useState(12);
  const filtered = gallery.filter(
    (item) =>
      category === "All moments" ||
      galleryMedia[item.src].category === category,
  );
  const visible = filtered.slice(0, limit);
  const { contextSafe } = useGSAP(
    () => {
      registerGsap();
      gsap.registerPlugin(Flip);
      if (prefersReducedMotion()) return;
      ScrollTrigger.batch(
        root.current!.querySelectorAll("[data-gallery-item]"),
        {
          start: "top 98%",
          once: true,
          interval: 0.08,
          onEnter: (cards) =>
            gsap.fromTo(
              cards,
              { y: 35, opacity: 0.5 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
            ),
        },
      );
    },
    { scope: root },
  );

  function rearrange(update: () => void) {
    contextSafe(() => {
      const items = root.current!.querySelectorAll("[data-gallery-item]");
      if (prefersReducedMotion()) {
        flushSync(update);
        return;
      }
      Flip.killFlipsOf(items, true);
      gsap.killTweensOf(items);
      gsap.set(items, { clearProps: "transform,opacity" });
      const state = Flip.getState(items);
      flushSync(update);
      Flip.from(state, {
        targets: root.current!.querySelectorAll("[data-gallery-item]"),
        duration: 0.75,
        ease: "power3.inOut",
        scale: true,
        stagger: 0.025,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, y: 28, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.035,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
          ),
        onComplete: () => ScrollTrigger.refresh(),
      });
    })();
  }

  return (
    <section
      id="gallery"
      ref={root}
      className="section-pad border-t border-navy/10 bg-cream-deep/40"
    >
      <ChapterOrnament variant="flower" />
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-eyebrow">A visual journal</p>
            <h2 className="mt-3 font-serif text-4xl text-navy sm:text-6xl">
              Little moments. Lasting stories.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/75">
              A collection of milestones, people, and places. Follow a thread,
              change the view, or pause on a photograph.
            </p>
          </div>
          <p
            role="status"
            className="text-xs uppercase tracking-[0.12em] text-ink/60"
          >
            {visible.length} / {filtered.length} moments
          </p>
        </div>
        <div className="gallery-toolbar mt-10 flex flex-wrap items-center justify-between gap-5 border-y border-navy/10 py-4">
          <div
            role="group"
            aria-label="Filter photographs"
            className="flex flex-wrap gap-2"
          >
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                onClick={() =>
                  rearrange(() => {
                    setCategory(name);
                    setLimit(12);
                  })
                }
                className={`gallery-filter ${category === name ? "is-active" : ""}`}
              >
                {name}
              </button>
            ))}
          </div>
          <div
            role="group"
            aria-label="Gallery density"
            className="flex gap-1 rounded-full border border-navy/15 p-1"
          >
            {[false, true].map((value) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={compact === value}
                onClick={() => rearrange(() => setCompact(value))}
                className={`rounded-full px-3 py-1.5 text-xs transition ${compact === value ? "bg-navy text-cream" : "text-navy"}`}
              >
                {value ? "Compact" : "Spacious"}
              </button>
            ))}
          </div>
        </div>
        <div
          id="gallery-images"
          className={`gallery-masonry mt-8 ${compact ? "is-compact" : ""}`}
        >
          {visible.map((item) => {
            const media = galleryMedia[item.src];
            return (
              <div
                key={item.src}
                data-gallery-item
                data-flip-id={item.src}
                className="gallery-masonry-item"
              >
                <ImagePreview
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  aspectRatio={`${media.width} / ${media.height}`}
                  fit="cover"
                  sizes={
                    compact
                      ? "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
                      : "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  }
                />
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.17em] text-ink/45">
                  {media.category}
                </p>
              </div>
            );
          })}
        </div>
        {limit < filtered.length && (
          <div className="mt-10 text-center">
            <Button
              type="button"
              variant="outline"
              aria-controls="gallery-images"
              onClick={() => rearrange(() => setLimit((count) => count + 12))}
            >
              Discover more moments
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
