"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function ButterflyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Left wing */}
      <path
        d="M30 32C30 32 18 10 8 14C-2 18 6 34 14 36C6 38 -1 48 8 52C18 56 30 34 30 34"
        fill="currentColor"
        fillOpacity="0.88"
      />
      {/* Right wing */}
      <path
        d="M34 32C34 32 46 10 56 14C66 18 58 34 50 36C58 38 65 48 56 52C46 56 34 34 34 34"
        fill="currentColor"
        fillOpacity="0.88"
      />
      {/* Wing accents */}
      <path
        d="M28 28C22 18 14 18 12 22C10 26 16 32 22 32"
        stroke="#F8F5F2"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <path
        d="M36 28C42 18 50 18 52 22C54 26 48 32 42 32"
        stroke="#F8F5F2"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      {/* Body */}
      <ellipse cx="32" cy="33" rx="2.2" ry="10" fill="#0F172A" />
      <circle cx="32" cy="22" r="2.4" fill="#0F172A" />
      {/* Antennae */}
      <path
        d="M30 21C27 14 24 12 22 11"
        stroke="#0F172A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M34 21C37 14 40 12 42 11"
        stroke="#0F172A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="11" r="1.4" fill="#C8A96A" />
      <circle cx="42" cy="11" r="1.4" fill="#C8A96A" />
    </svg>
  );
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    gsap.set([cursor, trail], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
    });

    const xCursor = gsap.quickTo(cursor, "x", {
      duration: 0.14,
      ease: "power3.out",
    });
    const yCursor = gsap.quickTo(cursor, "y", {
      duration: 0.14,
      ease: "power3.out",
    });
    const xTrail = gsap.quickTo(trail, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yTrail = gsap.quickTo(trail, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      if (!document.documentElement.classList.contains("has-custom-cursor")) {
        document.documentElement.classList.add("has-custom-cursor");
      }
      setVisible(true);
      xCursor(e.clientX);
      yCursor(e.clientY);
      xTrail(e.clientX);
      yTrail(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setHovering(
        Boolean(
          target.closest(
            "a, button, [role='button'], input, textarea, label, summary"
          )
        )
      );
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        onLeaveWindow
      );
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999]",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
    >
      {/* Soft gold trail ring */}
      <div
        ref={trailRef}
        className="absolute left-0 top-0 will-change-transform"
      >
        <div
          className={cn(
            "rounded-full border border-gold/45 transition-all duration-300 ease-out",
            hovering ? "h-14 w-14 bg-gold/10" : "h-10 w-10 bg-gold/5"
          )}
        />
      </div>

      {/* Butterfly cursor */}
      <div
        ref={cursorRef}
        className="absolute left-0 top-0 will-change-transform"
      >
        <div
          className={cn(
            "origin-center transition-transform duration-300 ease-out",
            hovering ? "scale-125 -rotate-6" : "scale-100 rotate-0"
          )}
        >
          <div className="animate-[butterfly-flutter_2.4s_ease-in-out_infinite] text-gold">
            <ButterflyIcon className="h-7 w-7 drop-shadow-[0_2px_8px_rgba(200,169,106,0.45)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
