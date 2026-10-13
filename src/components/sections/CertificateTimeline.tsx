"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { certificates } from "@/data/biography";
import { ImagePreview } from "@/components/ui/ImagePreview";

// The conference without a recorded date stays outside the dated sequence.
const archive = [certificates[3], certificates[0], certificates[1], certificates[2], certificates[5], certificates[6], certificates[4]];

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CertificateTimeline() {
  const rail = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, () => true);
  const running = !paused && !hovered && !focused && !previewOpen && !reduced;

  useEffect(() => {
    const element = rail.current;
    if (!element || !running) return;
    let distance = 0;
    let visible = false;
    let position = element.scrollLeft;
    const measure = () => { distance = element.querySelector<HTMLOListElement>(".certificate-stops")?.offsetWidth ?? 0; };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    measure();
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(element);
    const tick = () => {
      if (!visible || document.hidden || !distance) return;
      position = (position + 26 * Math.min(gsap.ticker.deltaRatio(60), 3) / 60) % distance;
      element.scrollLeft = position;
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); resize.disconnect(); visibility.disconnect(); };
  }, [running]);

  return (
    <div className="certificate-archive mt-12">
      <svg className="certificate-flourish" viewBox="0 0 900 150" fill="none" aria-hidden="true">
        <path data-certificate-swirl d="M0 108C90 108 90 18 165 18S250 132 322 132 374 33 333 33 310 96 398 96 470 16 555 16 630 126 700 126 786 48 900 48" />
        <path d="M0 120C110 120 110 38 165 38S246 144 323 144 401 57 460 57 550 135 640 135 768 68 900 68" opacity=".35" />
      </svg>
      <div className="relative flex flex-wrap items-end justify-between gap-5">
        <div><p className="section-eyebrow">A collection of milestones</p><h3 className="mt-3 font-serif text-3xl text-navy">Campus & conference archive</h3><p id="certificate-rail-help" className="mt-3 text-sm text-ink/65">{reduced ? "Scroll sideways to explore; select any certificate to read it." : "A gentle journey through the years. Pause to explore, or select a certificate to read it."}</p></div>
        {!reduced && <button type="button" aria-label={paused ? "Play certificate animation" : "Pause certificate animation"} aria-controls="certificate-rail" onClick={() => setPaused((value) => !value)} className="certificate-motion-control">{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}{paused ? "Play" : "Pause"}</button>}
      </div>
      <div ref={rail} id="certificate-rail" role="region" aria-label="Certificate timeline" aria-describedby="certificate-rail-help" tabIndex={0} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)} className="certificate-rail certificate-marquee mt-7">
        <div className="certificate-loop">
        {(reduced ? [false] : [false, true]).map((duplicate) => <ol key={String(duplicate)} className="certificate-stops" aria-hidden={duplicate || undefined}>
          {archive.map((cert, index) => (
            <li key={cert.image} className="certificate-stop">
              <div className="certificate-date"><span className="certificate-dot" aria-hidden="true" /><span>{cert.date === "Conference participation" ? "Date not recorded" : cert.date}</span></div>
              <div className="certificate-ticket">
                <div className="mb-3 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.16em] text-ink/50"><span>Recognition</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
                <ImagePreview src={cert.image} alt={cert.title} className="aspect-[16/10] bg-white/70" sizes="260px" tabIndex={duplicate ? -1 : undefined} onOpenChange={setPreviewOpen} />
                <h4 className="mt-4 font-serif text-xl leading-tight text-navy">{cert.title.replace(/^Certificate of (Appreciation|Participation|Excellence): /, "")}</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">{cert.issuer}</p>
              </div>
            </li>
          ))}
        </ol>)}
        </div>
      </div>
    </div>
  );
}
