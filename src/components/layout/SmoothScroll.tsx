"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap";

/** Smooth scrolling via Lenis, bridged to GSAP ScrollTrigger. Tuned for snappy response. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.style.pointerEvents = "";

    if (prefersReducedMotion()) return;

    registerGsap();

    const lenis = new Lenis({
      lerp: 0.16,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.05,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}
