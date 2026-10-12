import { ChapterOrnament } from "@/components/layout/ChapterOrnament";
import { certificates, featuredCertificate } from "@/data/biography";
import { ImagePreview } from "@/components/ui/ImagePreview";

export function CertificatesSection() {
  return (
    <section id="certificates" className="section-pad border-t border-navy/10 bg-cream">
      <ChapterOrnament variant="compass" />
      <div className="mx-auto max-w-7xl">
        <p className="section-eyebrow">Certifications</p>
        <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">Recognition along the way</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">Professional learning, creative practice, and contributions to university life. Select a certificate to read it in full.</p>
        <div className="mt-12 grid items-center gap-8 rounded-sm border border-navy/10 bg-cream-deep/40 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          <ImagePreview src={featuredCertificate.image} alt={`${featuredCertificate.title} — ${featuredCertificate.documentTitle}`} sizes="(max-width: 1024px) 85vw, 40vw" />
          <div>
            <p className="section-eyebrow">Featured certificate · {featuredCertificate.issuerShort}</p>
            <h3 className="mt-3 font-serif text-3xl text-navy">{featuredCertificate.title}</h3>
            <p className="mt-2 text-sm text-ink/65">{featuredCertificate.issuer} · {featuredCertificate.date}</p>
            <p className="mt-5 leading-relaxed text-ink/75">A professional short course in contemporary digital journalism, completed through the LUMS Centre for Continuing Education Studies.</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/75">{featuredCertificate.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <a href="https://ces.lums.edu.pk/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm text-navy underline underline-offset-4">About LUMS CES</a>
          </div>
        </div>
        <h3 className="mt-14 font-serif text-3xl text-navy">Campus & conference archive</h3>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert.image}>
              <ImagePreview src={cert.image} alt={cert.title} className="aspect-[4/3]" />
              <h4 className="mt-3 font-serif text-xl text-navy">{cert.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{cert.issuer} · {cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
