import Image from "next/image";
import { masters } from "@/data/biography";

export function MastersSection() {
  return (
    <section id="masters" className="section-pad relative overflow-hidden bg-navy text-cream">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="section-eyebrow">The next chapter · Currently pursuing</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{masters.title}</h2>
          <p className="mt-4 text-xl text-cream/85">{masters.institution}</p>
          <p className="mt-2 text-sm leading-relaxed text-cream/65">{masters.campus}</p>
          <p className="mt-5 text-sm leading-relaxed text-gold">Started {masters.started} · {masters.pathway}<br />Expected graduation · {masters.expected}</p>
          <p className="mt-6 leading-relaxed text-cream/80">{masters.blurb}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">{masters.focus.map((focus) => <li key={focus} className="border border-cream/15 p-4 text-sm leading-relaxed text-cream/85">{focus}</li>)}</ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image src={masters.image} alt="University of Sunderland campus" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
