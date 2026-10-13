import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MastersSection } from "@/components/sections/MastersSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WhoIAmSection } from "@/components/sections/WhoIAmSection";
import { AnimalWelfareSection } from "@/components/sections/AnimalWelfareSection";
import { AlumniSection } from "@/components/sections/AlumniSection";

import { StoryRibbon } from "@/components/layout/StoryRibbon";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StoryRibbon />
      <div id="story" className="story-group">
        <WhoIAmSection />
        <EducationSection />
        <MastersSection />
        <AlumniSection />
      </div>
      <div id="work" className="story-group">
        <ExperienceSection />
        <SkillsSection />
      </div>
      <div id="impact" className="story-group">
        <AnimalWelfareSection />
        <LeadershipSection />
      </div>
      <div id="recognition" className="story-group">
        <CertificatesSection />
      </div>
      <div id="visual-journal" className="story-group">
        <GallerySection />
      </div>
      <ContactSection />
    </>
  );
}
