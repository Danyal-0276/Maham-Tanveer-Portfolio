"use client";

import type { gsap as GsapNS } from "gsap";

export type MotionPreset =
  | "rise"
  | "slideLeft"
  | "slideRight"
  | "scaleSoft"
  | "clipWipe"
  | "floatIn";

export type MotionFrom = {
  autoAlpha?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  clipPath?: string;
};

export type MotionPresetConfig = {
  from: MotionFrom;
  duration: number;
  ease: string;
  stagger?: number;
};

/** Snappy editorial presets — short travel, quick settle. */
export const MOTION_PRESETS: Record<MotionPreset, MotionPresetConfig> = {
  rise: {
    from: { autoAlpha: 0, y: 28 },
    duration: 0.45,
    ease: "power2.out",
    stagger: 0.04,
  },
  slideLeft: {
    from: { autoAlpha: 0, x: -32 },
    duration: 0.42,
    ease: "power2.out",
    stagger: 0.05,
  },
  slideRight: {
    from: { autoAlpha: 0, x: 32 },
    duration: 0.42,
    ease: "power2.out",
    stagger: 0.05,
  },
  scaleSoft: {
    from: { autoAlpha: 0, scale: 0.96, y: 16 },
    duration: 0.48,
    ease: "power2.out",
    stagger: 0.04,
  },
  clipWipe: {
    from: {
      autoAlpha: 0,
      clipPath: "inset(6% 10% 6% 10%)",
      scale: 1.02,
    },
    duration: 0.55,
    ease: "power2.out",
  },
  floatIn: {
    from: { autoAlpha: 0, y: 14, scale: 0.97 },
    duration: 0.35,
    ease: "power2.out",
    stagger: 0.025,
  },
};

export const DEFAULT_SCROLL_START = "top 88%";

type AnimateOpts = {
  delay?: number;
  stagger?: number;
  scrollTrigger?: object | false;
};

/** Apply a preset "from" state then animate to clear transforms. */
export function animatePreset(
  gsapApi: typeof GsapNS,
  targets: HTMLElement | Element | HTMLElement[] | NodeListOf<Element> | string,
  preset: MotionPreset,
  opts?: AnimateOpts
) {
  const config = MOTION_PRESETS[preset];

  return gsapApi.fromTo(
    targets,
    { ...config.from },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      clipPath: preset === "clipWipe" ? "inset(0% 0% 0% 0%)" : undefined,
      duration: config.duration,
      ease: config.ease,
      delay: opts?.delay ?? 0,
      stagger: opts?.stagger ?? config.stagger ?? 0,
      overwrite: "auto",
      scrollTrigger:
        opts?.scrollTrigger === false
          ? undefined
          : (opts?.scrollTrigger ?? {
              start: DEFAULT_SCROLL_START,
              toggleActions: "play none none none",
            }),
    }
  );
}
