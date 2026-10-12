"use client";

import { useState } from "react";
import { gallery } from "@/data/biography";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 9;

export function GallerySection() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = gallery.slice(0, visibleCount);
  return (
    <section id="gallery" className="section-pad border-t border-navy/10 bg-cream-deep/40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-eyebrow">Gallery</p>
            <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">Moments that linger</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/75">Graduation, friendship, campus life, and the places along the way. Select any photograph for a closer look.</p>
          </div>
          <p role="status" className="text-sm text-ink/60">Showing {visible.length} of {gallery.length} images</p>
        </div>
        <div id="gallery-images" className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <ImagePreview key={item.src} src={item.src} alt={item.alt} caption={item.caption}
              className="aspect-[4/5]" fit={item.src.includes("/experience/") ? "contain" : "cover"} eager={i < 3} />
          ))}
        </div>
        {visibleCount < gallery.length && (
          <div className="mt-12 text-center">
            <Button type="button" variant="outline" aria-controls="gallery-images" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, gallery.length))}>Show more photographs</Button>
          </div>
        )}
      </div>
    </section>
  );
}
