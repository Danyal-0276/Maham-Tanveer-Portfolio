import { ChapterOrnament } from "@/components/layout/ChapterOrnament";
import { ImagePreview } from "@/components/ui/ImagePreview";
import reflection from "../../../public/media/features/ucp-alumni-reflection.png";

export function AlumniSection() {
  return (
    <section id="alumni-reflection" className="section-pad bg-cream-deep/40">
      <ChapterOrnament variant="orbit" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-eyebrow">UCP spotlight · Global Leader</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">From UCP to a global chapter</h2>
          <p className="mt-4 leading-relaxed text-ink/75">Featured by the University of Central Punjab as a Global Leader, Maham shares how her English Language & Literature degree shaped her thinking and opened a path to postgraduate study in the United Kingdom.</p>
        </div>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ImagePreview src={reflection} alt="Maham Tanveer — UCP Global Leader feature, Class of 2024" className="aspect-[997/717] bg-white" sizes="(max-width: 1024px) 90vw, 60vw" />
          <div>
            <blockquote className="border-l-2 border-gold pl-6">
              <p className="font-serif text-2xl leading-relaxed text-navy">“That same foundation carried through when I applied to Sunderland.”</p>
              <footer className="mt-4 text-sm text-ink/65">Maham Tanveer · UCP Faculty of Languages & Literature, Class of 2024</footer>
            </blockquote>
            <p className="mt-6 text-sm leading-relaxed text-ink/75">The UCP feature celebrates the journey from close reading and critical thinking to an MSc in Project Management at the University of Sunderland, supported by two scholarships.</p>
            <dl className="mt-6 space-y-4 border-t border-navy/10 pt-6">
              <div><dt className="text-sm text-ink/65">International Scholarship</dt><dd className="mt-1 font-serif text-3xl text-navy">£900</dd></div>
              <div><dt className="text-sm text-ink/65">Global Leaders Scholarship</dt><dd className="mt-1 font-serif text-3xl text-navy">£3,600</dd></div>
            </dl>
          </div>
        </div>
        <details className="mt-8 border-t border-navy/10 pt-5">
          <summary className="cursor-pointer font-medium text-navy">Read the full reflection</summary>
          <blockquote className="mt-4 max-w-4xl leading-relaxed text-ink/80">University of Central Punjab shaped the way I think and work far more than I expected when I first walked in as an undergraduate. I didn&apos;t walk away with just knowledge of literature. I was trained early on to look closely at both language and text and to pull an argument apart before I trusted it. My professors had a habit of asking &quot;why&quot; one more time than felt comfortable, and that pushed me to reason things through properly and explain myself clearly, something I didn&apos;t fully appreciate the value of until I needed it outside a classroom. That same foundation carried through when I applied to Sunderland. I was awarded two scholarships towards my MSc: an International Scholarship of £900 and a Global Leaders Scholarship of £3,600.</blockquote>
        </details>
      </div>
    </section>
  );
}
