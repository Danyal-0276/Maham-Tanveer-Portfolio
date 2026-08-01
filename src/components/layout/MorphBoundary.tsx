"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type MorphVariant =
  | "wipeDown"
  | "wipeUp"
  | "insetExpand"
  | "goldEdge"
  | "scaleMerge";

type MorphBoundaryProps = {
  /** Target fill color of the wipe (CSS color or token-friendly hex) */
  toColor: string;
  /** Starting fill behind the morph */
  fromColor?: string;
  variant?: MorphVariant;
  /** Scroll distance as viewport fraction, e.g. 0.5 = 50vh */
  length?: number;
  className?: string;
  label?: string;
};

/**
 * Short scrubbed morph/wipe between chapters.
 * Keeps pin duration short so it merges mood without trapping scroll.
 */
export function MorphBoundary({
  toColor,
  fromColor = "transparent",
  variant = "wipeDown",
  length = 0.28,
  className,
  label,
}: MorphBoundaryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false
  );

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current || !panelRef.current || reduced) return;

      const panel = panelRef.current;
      const startClip =
        variant === "wipeDown"
          ? "inset(0% 0% 100% 0%)"
          : variant === "wipeUp"
            ? "inset(100% 0% 0% 0%)"
            : variant === "insetExpand"
              ? "inset(12% 20% 12% 20%)"
              : variant === "goldEdge"
                ? "inset(0% 100% 0% 0%)"
                : "inset(12% 12% 12% 12%)";

      gsap.set(panel, {
        clipPath: startClip,
        scale: variant === "scaleMerge" ? 1.06 : 1,
        autoAlpha: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: () => `+=${window.innerHeight * length}`,
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        panel,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "none",
          duration: 1,
        },
        0
      );

      if (variant === "goldEdge") {
        tl.fromTo(
          panel,
          { boxShadow: "inset -3px 0 0 0 rgba(200,169,106,0)" },
          {
            boxShadow: "inset -3px 0 0 0 rgba(200,169,106,0.7)",
            ease: "none",
            duration: 0.35,
          },
          0
        );
      }
    },
    {
      scope: rootRef,
      dependencies: [reduced, variant, length, toColor],
      revertOnUpdate: true,
    }
  );

  if (reduced) {
    return (
      <div
        className={cn("h-4 w-full", className)}
        style={{ background: toColor }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative h-[14vh] w-full overflow-hidden sm:h-[16vh]",
        className
      )}
      aria-hidden
      data-morph-boundary={variant}
    >
      <div className="absolute inset-0" style={{ background: fromColor }} />
      <div
        ref={panelRef}
        className="absolute inset-0 will-change-transform"
        style={{ background: toColor }}
      />
      {label ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[0.6rem] uppercase tracking-[0.2em] text-gold/50">
          {label}
        </span>
      ) : null}
    </div>
  );
}
