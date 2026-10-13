import { ArrowUpRight } from "lucide-react";

const sections = [
  { id: "story", label: "Story" },
  { id: "work", label: "Experience" },
  { id: "impact", label: "Leadership" },
  { id: "recognition", label: "Certificates" },
  { id: "visual-journal", label: "Gallery" },
];

export function SiteNav() {
  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-navbar">
        <a href="#welcome" aria-label="Maham Tanveer — Home" className="nav-wordmark">
          <span className="nav-wordmark-name">maham<span aria-hidden="true" className="nav-wordmark-dot" /></span>
          <span className="nav-wordmark-caption">Tanveer · A story in motion</span>
        </a>
        <div className="nav-chapter-pill">
          {sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} className="nav-chapter-link"><span className="nav-chapter-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.label}</a>
          ))}
        </div>
        <a href="#contact" className="nav-contact">Let’s talk <ArrowUpRight size={19} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
