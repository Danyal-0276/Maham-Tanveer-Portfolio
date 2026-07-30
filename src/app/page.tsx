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

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoIAmSection />
      <EducationSection />
      <ExperienceSection />
      <LeadershipSection />
      <CertificatesSection />
      <GallerySection />
      <MastersSection />
      <SkillsSection />
      <PlacesSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
