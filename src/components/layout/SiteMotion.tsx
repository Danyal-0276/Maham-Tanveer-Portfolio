"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

export function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    registerGsap();
    gsap.registerPlugin(SplitText);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];
      const hero = root.current?.querySelector("h1");
      if (hero) {
        const split = SplitText.create(hero, { type: "words,chars", aria: "auto", mask: "words" });
        splits.push(split);
        gsap.from(split.chars, { yPercent: 115, rotateX: -70, opacity: 0, stagger: 0.045, duration: 1.25, delay: 0.12, ease: "expo.out", clearProps: "transform,opacity" });
      }
      root.current?.querySelectorAll("h2").forEach((heading) => {
        const split = SplitText.create(heading, {
          type: "words", aria: "auto", mask: "words", autoSplit: true,
          onSplit: (self) => gsap.from(self.words, {
            yPercent: 110, rotate: 3, opacity: 0, stagger: 0.045, duration: 0.85, ease: "power4.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: heading, start: "top 94%", once: true },
          }),
        });
        splits.push(split);
      });
      const cards = [...(root.current?.querySelectorAll("article, .art-frame, [data-motion-child]") ?? [])].filter((el) => !el.closest("#gallery"));
      // Animate at entry; never conceal every offscreen card in advance.
      ScrollTrigger.batch(cards, {
        start: "top 96%", once: true, interval: 0.08,
        onEnter: (batch) => gsap.fromTo(batch, { y: 42, opacity: 0.35, rotate: 0.7 }, { y: 0, opacity: 1, rotate: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity" }),
      });
      root.current?.querySelectorAll(".chapter-ornament").forEach((art) => {
        const section = art.closest("section");
        gsap.fromTo(art.querySelector("[data-ornament-ring]"), { rotation: -25 }, { rotation: 100, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 } });
        art.querySelectorAll<SVGPathElement>("[data-draw-line]").forEach((path) => {
          const length = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", scrollTrigger: { trigger: section, start: "top 85%", once: true } });
        });
      });
      gsap.fromTo("[data-hero-portrait]", { scale: 1.03, yPercent: 0 }, { scale: 1.14, yPercent: 6, ease: "none", scrollTrigger: { trigger: "#welcome", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to("[data-ribbon-track]", { xPercent: -50, duration: 40, repeat: -1, ease: "none" });
      root.current?.querySelectorAll<SVGPathElement>("[data-certificate-swirl]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", scrollTrigger: { trigger: ".certificate-archive", start: "top 85%", once: true } });
      });
      gsap.fromTo("[data-timeline-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".experience-timeline", start: "top 65%", end: "bottom 65%", scrub: 0.6 } });
      root.current?.querySelectorAll("[data-timeline-marker]").forEach((marker) => {
        gsap.from(marker, { scale: 0.6, opacity: 0.3, duration: 0.65, ease: "back.out(1.5)", clearProps: "transform,opacity", scrollTrigger: { trigger: marker, start: "top 85%", once: true } });
      });
      gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.15 } });
      return () => splits.forEach((split) => split.revert());
    });
    let refreshFrame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); cancelAnimationFrame(refreshFrame); media.revert(); };
  }, { scope: root });

  return <div ref={root} className="motion-scene">{children}<div ref={progress} aria-hidden="true" className="reading-progress" /></div>;
}
