"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Split element text into word spans for stagger reveals (Club SplitText alternative). */
export function splitWords(el: HTMLElement) {
  const text = el.textContent?.trim() ?? "";
  el.setAttribute("aria-label", text);
  el.innerHTML = text
    .split(/\s+/)
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden align-bottom"><span class="gsap-word inline-block will-change-transform">${word}&nbsp;</span></span>`
    )
    .join("");
  return el.querySelectorAll<HTMLElement>(".gsap-word");
}

export { gsap, ScrollTrigger };
