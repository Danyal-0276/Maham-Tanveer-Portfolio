"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

/** Keeps native scrolling reliable; clears any leftover modal lock styles. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.style.pointerEvents = "";
  }, []);

  return <>{children}</>;
}
