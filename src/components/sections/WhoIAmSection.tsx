import Image from "next/image";
import { FadeIn } from "@/components/layout/FadeIn";
import { profile } from "@/data/biography";

export function WhoIAmSection() {
  return (
    <section id="who-i-am" className="section-pad bg-cream-deep/40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <FadeIn>
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
            <Image
              src="/media/portrait/lecture-hall.jpg"
              alt="Maham in an academic setting"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-center scale-[0.9]"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="section-eyebrow">Who I Am</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            A story of language, teaching, and purposeful leadership
          </h2>
          <div className="gold-rule mt-6" />
          <p className="mt-8 text-lg leading-relaxed text-ink/85">
            {profile.bio}
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink/75">
            Fluent in English and a native Urdu speaker, she brings clarity,
            empathy, and organization to classrooms, campaigns, conferences, and
            now postgraduate project management study in the United Kingdom.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
