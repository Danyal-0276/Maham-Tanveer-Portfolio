import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MastersSection } from "@/components/sections/MastersSection";
import { PlacesSection } from "@/components/sections/PlacesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhoIAmSection } from "@/components/sections/WhoIAmSection";
import { MorphBoundary } from "@/components/layout/MorphBoundary";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoIAmSection />

      {/* Cream → navy education */}
      <MorphBoundary
        variant="wipeDown"
        fromColor="#f8f5f2"
        toColor="#0f172a"
        length={0.22}
      />
      <EducationSection />

      {/* Into experience theatre */}
      <MorphBoundary
        variant="insetExpand"
        fromColor="#0f172a"
        toColor="#0f172a"
        length={0.2}
      />
      <ExperienceSection />

      <LeadershipSection />

      {/* Soft gold-edge into certificates */}
      <MorphBoundary
        variant="goldEdge"
        fromColor="#efe8df"
        toColor="#f8f5f2"
        length={0.2}
      />
      <CertificatesSection />

      <GallerySection />

      {/* Gallery cream → masters navy */}
      <MorphBoundary
        variant="scaleMerge"
        fromColor="#efe8df"
        toColor="#0f172a"
        length={0.24}
      />
      <MastersSection />

      <SkillsSection />
      <PlacesSection />

      {/* Light rise chain into closing chapters */}
      <MorphBoundary
        variant="wipeUp"
        fromColor="#efe8df"
        toColor="#f8f5f2"
        length={0.18}
      />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
