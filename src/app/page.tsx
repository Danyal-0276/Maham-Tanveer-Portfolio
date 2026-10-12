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
import { WhoIAmSection } from "@/components/sections/WhoIAmSection";
import { AnimalWelfareSection } from "@/components/sections/AnimalWelfareSection";
import { AlumniSection } from "@/components/sections/AlumniSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoIAmSection />
      <EducationSection />
      <MastersSection />
      <AlumniSection />
      <ExperienceSection />
      <AnimalWelfareSection />
      <LeadershipSection />
      <SkillsSection />
      <CertificatesSection />
      <PlacesSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
