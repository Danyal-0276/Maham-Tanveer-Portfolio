"use client";

import { useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import {
  animatePreset,
  MOTION_PRESETS,
  type MotionPreset,
  DEFAULT_SCROLL_START,
} from "@/lib/section-motion";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  splitWords,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  /** Enter preset for the shell itself */
  preset?: MotionPreset;
  /** Animate [data-motion-child] children with stagger instead of the shell */
  staggerChildren?: boolean;
  /** Child preset when staggerChildren is true */
  childPreset?: MotionPreset;
  /** Split [data-motion-heading] into words and reveal */
  splitHeading?: boolean;
  delay?: number;
};

/**
 * Applies a scroll-triggered enter choreography to wrapped content.
 * No-ops under prefers-reduced-motion.
 */
export function SectionShell({
  children,
  className,
  preset = "rise",
  staggerChildren = false,
  childPreset,
  splitHeading = false,
  delay = 0,
}: SectionShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current || reduced) return;

      const root = rootRef.current;

      if (splitHeading) {
        const heading = root.querySelector("[data-motion-heading]");
        if (heading instanceof HTMLElement) {
          const words = splitWords(heading);
          gsap.from(words, {
            yPercent: 80,
            opacity: 0,
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out",
            delay,
            scrollTrigger: {
              trigger: heading,
              start: DEFAULT_SCROLL_START,
              toggleActions: "play none none none",
            },
          });
        }
      }

      if (staggerChildren) {
        const kids = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-motion-child]")
        );
        if (kids.length) {
          kids.forEach((kid, i) => {
            const dir = kid.dataset.enter;
            const presetForChild: MotionPreset =
              dir === "right"
                ? "slideRight"
                : dir === "left"
                  ? "slideLeft"
                  : (childPreset ?? preset);
            animatePreset(gsap, kid, presetForChild, {
              delay: delay + i * (MOTION_PRESETS[presetForChild].stagger ?? 0.08),
              stagger: 0,
              scrollTrigger: {
                trigger: root,
                start: DEFAULT_SCROLL_START,
                toggleActions: "play none none none",
              },
            });
          });
        }
        return;
      }

      const target =
        (root.querySelector("[data-motion-target]") as HTMLElement | null) ??
        root;

      animatePreset(gsap, target, preset, {
        delay,
        stagger: 0,
        scrollTrigger: {
          trigger: root,
          start: DEFAULT_SCROLL_START,
          toggleActions: "play none none none",
        },
      });
    },
    {
      scope: rootRef,
      dependencies: [
        reduced,
        preset,
        staggerChildren,
        childPreset,
        splitHeading,
        delay,
      ],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={rootRef}
      className={cn(className)}
      data-section-motion={preset}
    >
      {children}
    </div>
  );
}
