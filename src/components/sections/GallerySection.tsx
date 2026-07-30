"use client";

import Image from "next/image";
import { FadeIn } from "@/components/layout/FadeIn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { gallery } from "@/data/biography";

export function GallerySection() {
  return (
    <section id="gallery" className="section-pad bg-cream-deep/40">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="section-eyebrow">Gallery</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Moments that linger
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Graduation, campus, and the atmosphere of a life in motion—each
            image a quiet caption in the biography.
          </p>
        </FadeIn>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((item, i) => (
            <FadeIn key={item.src} delay={(i % 6) * 0.04} className="mb-4 break-inside-avoid">
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="group w-full text-left">
                    <figure className="overflow-hidden">
                      <div className="relative w-full overflow-hidden">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={1000}
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="mt-2 font-serif text-sm italic text-ink/70">
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
