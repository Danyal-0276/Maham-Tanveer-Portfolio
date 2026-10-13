"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ImagePreviewProps = {
  src: string | StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  fit?: "cover" | "contain";
  sizes?: string;
  eager?: boolean;
  aspectRatio?: string;
  tabIndex?: number;
  onOpenChange?: (open: boolean) => void;
};

export function ImagePreview({ src, alt, caption, className, fit = "contain", sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw", eager = false, aspectRatio, tabIndex, onOpenChange }: ImagePreviewProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button type="button" tabIndex={tabIndex} aria-label={`Enlarge: ${alt}`} className="group block w-full self-start text-left">
          <span style={aspectRatio ? { aspectRatio } : undefined} className={cn("art-frame relative block aspect-[4/3] overflow-hidden rounded-sm border border-navy/10 bg-cream-deep", className)}>
            <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} className={cn("transition-transform duration-700 ease-out group-hover:scale-[1.045]", fit === "cover" ? "object-cover" : "object-contain p-3")} />
            <span className="absolute bottom-3 right-3 rounded-full bg-navy/85 p-2 text-cream"><Expand size={16} aria-hidden="true" /></span>
          </span>
          {caption && <span className="mt-3 block text-sm leading-relaxed text-ink/75">{caption}</span>}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg">{alt}</DialogTitle>
        <div className="relative h-[min(60vh,40rem)] w-full">
          <Image src={src} alt={alt} fill sizes="(max-width: 960px) 92vw, 896px" className="object-contain" />
        </div>
        {caption && <p className="text-sm leading-relaxed text-ink/75">{caption}</p>}
      </DialogContent>
    </Dialog>
  );
}
