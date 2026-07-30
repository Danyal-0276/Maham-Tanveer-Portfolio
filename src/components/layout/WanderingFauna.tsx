"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Kind = "butterfly" | "dog" | "cat";

type Critter = {
  id: number;
  kind: Kind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  hue: number;
  facing: 1 | -1;
  bob: number;
  bobSpeed: number;
};

function Butterfly({ hue }: { hue: number }) {
  const color = `hsl(${hue} 42% 52%)`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <g className="fauna-wing fauna-wing-left" style={{ color }}>
        <path
          d="M30 32C30 32 16 8 6 14C-4 20 6 36 16 36C6 40 -2 50 8 54C18 58 30 36 30 36Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M26 28C20 18 12 18 10 22"
          stroke="#F8F5F2"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
      <g className="fauna-wing fauna-wing-right" style={{ color }}>
        <path
          d="M34 32C34 32 48 8 58 14C68 20 58 36 48 36C58 40 66 50 56 54C46 58 34 36 34 36Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M38 28C44 18 52 18 54 22"
          stroke="#F8F5F2"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
      <ellipse cx="32" cy="34" rx="2" ry="9" fill="#0F172A" />
      <circle cx="32" cy="23" r="2.2" fill="#0F172A" />
      <path
        d="M30 22C27 15 24 13 22 12M34 22C37 15 40 13 42 12"
        stroke="#0F172A"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="12" r="1.3" fill="#C8A96A" />
      <circle cx="42" cy="12" r="1.3" fill="#C8A96A" />
    </svg>
  );
}

function Dog() {
  return (
    <svg viewBox="0 0 96 48" className="h-full w-full" aria-hidden>
      <ellipse cx="48" cy="26" rx="22" ry="12" fill="#8B6914" />
      <ellipse cx="70" cy="20" rx="12" ry="10" fill="#A67C1A" />
      <ellipse cx="78" cy="16" rx="5" ry="3.5" fill="#6B4F10" />
      <path d="M62 12 L58 4 L66 10 Z" fill="#8B6914" />
      <path d="M68 11 L72 3 L74 11 Z" fill="#8B6914" />
      <circle cx="74" cy="18" r="1.4" fill="#0F172A" />
      <path
        d="M28 24 C18 8 8 14 14 26"
        stroke="#6B4F10"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <g className="fauna-leg fauna-leg-1">
        <rect x="34" y="34" width="4" height="10" rx="2" fill="#6B4F10" />
      </g>
      <g className="fauna-leg fauna-leg-2">
        <rect x="44" y="34" width="4" height="10" rx="2" fill="#5C440E" />
      </g>
      <g className="fauna-leg fauna-leg-3">
        <rect x="54" y="34" width="4" height="10" rx="2" fill="#6B4F10" />
      </g>
      <g className="fauna-leg fauna-leg-4">
        <rect x="62" y="34" width="4" height="10" rx="2" fill="#5C440E" />
      </g>
    </svg>
  );
}

function Cat() {
  return (
    <svg viewBox="0 0 96 48" className="h-full w-full" aria-hidden>
      <ellipse cx="46" cy="26" rx="20" ry="11" fill="#5B6472" />
      <ellipse cx="68" cy="20" rx="11" ry="9" fill="#6B7380" />
      <path d="M60 12 L56 2 L64 12 Z" fill="#5B6472" />
      <path d="M70 12 L74 2 L78 12 Z" fill="#5B6472" />
      <circle cx="72" cy="18" r="1.3" fill="#C8A96A" />
      <path
        d="M30 26 C20 10 10 18 16 28"
        stroke="#4A5260"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        className="fauna-tail"
      />
      <g className="fauna-leg fauna-leg-1">
        <rect x="34" y="33" width="3.5" height="11" rx="1.75" fill="#4A5260" />
      </g>
      <g className="fauna-leg fauna-leg-2">
        <rect x="42" y="33" width="3.5" height="11" rx="1.75" fill="#3D4450" />
      </g>
      <g className="fauna-leg fauna-leg-3">
        <rect x="52" y="33" width="3.5" height="11" rx="1.75" fill="#4A5260" />
      </g>
      <g className="fauna-leg fauna-leg-4">
        <rect x="60" y="33" width="3.5" height="11" rx="1.75" fill="#3D4450" />
      </g>
    </svg>
  );
}

function makeCritters(w: number, h: number, mobile: boolean): Critter[] {
  const butterflies = mobile ? 2 : 4;
  const runners = mobile ? 1 : 2;
  const list: Critter[] = [];
  let id = 0;

  for (let i = 0; i < butterflies; i++) {
    const facing: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
    list.push({
      id: id++,
      kind: "butterfly",
      x: Math.random() * w,
      y: h * (0.15 + Math.random() * 0.45),
      vx: facing * (40 + Math.random() * 55),
      vy: (Math.random() - 0.5) * 35,
      scale: 0.7 + Math.random() * 0.45,
      hue: 38 + Math.random() * 28,
      facing,
      bob: Math.random() * Math.PI * 2,
      bobSpeed: 1.6 + Math.random() * 1.4,
    });
  }

  for (let i = 0; i < runners; i++) {
    const kind: Kind = i % 2 === 0 ? "dog" : "cat";
    const facing: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
    list.push({
      id: id++,
      kind,
      x: Math.random() * w,
      y: h * (0.72 + Math.random() * 0.12),
      vx: facing * (90 + Math.random() * 70),
      vy: 0,
      scale: kind === "dog" ? 0.95 + Math.random() * 0.25 : 0.85 + Math.random() * 0.25,
      hue: 0,
      facing,
      bob: Math.random() * Math.PI * 2,
      bobSpeed: 10 + Math.random() * 4,
    });
  }

  return list;
}

export function WanderingFauna() {
  const layerRef = useRef<HTMLDivElement>(null);
  const crittersRef = useRef<Critter[]>([]);
  const nodeRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const w = window.innerWidth;
    const h = window.innerHeight;
    crittersRef.current = makeCritters(w, h, mobile);
    setReady(true);

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (const c of crittersRef.current) {
        if (c.kind === "butterfly") {
          c.bob += c.bobSpeed * dt;
          c.x += c.vx * dt;
          c.y += c.vy * dt + Math.sin(c.bob) * 28 * dt;

          // Gentle wander
          c.vx += (Math.random() - 0.5) * 40 * dt;
          c.vy += (Math.random() - 0.5) * 50 * dt;
          c.vx = Math.max(-90, Math.min(90, c.vx));
          c.vy = Math.max(-55, Math.min(55, c.vy));

          if (c.x < -60) c.x = width + 40;
          if (c.x > width + 60) c.x = -40;
          if (c.y < height * 0.08) {
            c.y = height * 0.08;
            c.vy = Math.abs(c.vy);
          }
          if (c.y > height * 0.62) {
            c.y = height * 0.62;
            c.vy = -Math.abs(c.vy);
          }
          c.facing = c.vx >= 0 ? 1 : -1;
        } else {
          c.bob += c.bobSpeed * dt;
          c.x += c.vx * dt;
          const ground = height * 0.78;
          c.y = ground + Math.sin(c.bob) * 3;

          if (c.x < -100) {
            c.x = width + 80;
            c.facing = -1;
            c.vx = -Math.abs(c.vx);
          }
          if (c.x > width + 100) {
            c.x = -80;
            c.facing = 1;
            c.vx = Math.abs(c.vx);
          }
        }

        const el = nodeRefs.current.get(c.id);
        if (el) {
          const runBob =
            c.kind === "butterfly" ? 0 : Math.sin(c.bob * 2) * 2;
          el.style.transform = `translate3d(${c.x}px, ${c.y + runBob}px, 0) scale(${c.facing * c.scale}, ${c.scale})`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      // Keep creatures inside new bounds softly
      for (const c of crittersRef.current) {
        c.x = Math.min(c.x, window.innerWidth);
        c.y = Math.min(c.y, window.innerHeight);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
      aria-hidden
    >
      {crittersRef.current.map((c) => (
        <div
          key={c.id}
          ref={(node) => {
            if (node) nodeRefs.current.set(c.id, node);
            else nodeRefs.current.delete(c.id);
          }}
          className={cn(
            "absolute left-0 top-0 will-change-transform",
            c.kind === "butterfly" && "fauna-butterfly h-10 w-10 opacity-80 sm:h-12 sm:w-12",
            c.kind === "dog" && "fauna-runner h-10 w-20 opacity-75 sm:h-12 sm:w-24",
            c.kind === "cat" && "fauna-runner h-9 w-[4.5rem] opacity-75 sm:h-11 sm:w-[5.5rem]"
          )}
          style={{
            transform: `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.facing * c.scale}, ${c.scale})`,
          }}
        >
          {c.kind === "butterfly" && <Butterfly hue={c.hue} />}
          {c.kind === "dog" && <Dog />}
          {c.kind === "cat" && <Cat />}
        </div>
      ))}
    </div>
  );
}
