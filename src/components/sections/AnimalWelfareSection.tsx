import { animalWelfare } from "@/data/biography";
import { ImagePreview } from "@/components/ui/ImagePreview";
import vicePresident from "../../../public/media/features/paws-and-claws-vice-president.png";

export function AnimalWelfareSection() {
  return (
    <section id="animal-welfare" className="section-pad bg-[#e7ece5]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <ImagePreview src={vicePresident} alt="Maham Tanveer — Vice President of Paws and Claws Animal Welfare Society" className="aspect-[531/671] bg-white" sizes="(max-width: 1024px) 90vw, 40vw" />
        <div>
          <p className="section-eyebrow !text-accent">Animal welfare & student leadership</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">Paws and Claws Animal Welfare Society</h2>
          <p className="mt-5 text-xl font-medium text-accent">{animalWelfare.title}</p>
          <p className="mt-2 text-sm text-ink/65">{animalWelfare.place} · {animalWelfare.dates}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">Building a kinder campus, and bringing students together around the care and protection of animals.</p>
          <ul className="mt-6 list-disc space-y-3 pl-5 leading-relaxed text-ink/75">{animalWelfare.points.map((point) => <li key={point}>{point}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
