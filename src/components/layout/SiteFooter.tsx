import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/biography";

const links = [
  { id: "story", label: "The story" },
  { id: "work", label: "Experience" },
  { id: "impact", label: "Leadership" },
  { id: "recognition", label: "Certificates" },
  { id: "visual-journal", label: "Visual journal" },
];

export function SiteFooter() {
  return (
    <footer id="site-footer" className="editorial-footer">
      <div className="footer-inner">
        <div className="footer-opening">
          <div>
            <p className="section-eyebrow">Stay connected</p>
            <h2 className="footer-heading">Let’s stay in touch<span className="text-gold">.</span></h2>
            <a href={`mailto:${profile.email}`} className="footer-email"><Mail size={17} aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
          <div className="footer-links-block">
            <nav aria-label="Footer navigation"><p className="footer-small-label">Explore</p><div className="footer-links">{links.map((link) => <a key={link.id} href={`#${link.id}`}>{link.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div></nav>
            <div><p className="footer-small-label">Elsewhere</p><a className="footer-social" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a><p className="mt-5 max-w-40 text-xs leading-relaxed text-ink/65">{profile.location}</p></div>
          </div>
        </div>
        <div className="footer-colophon">
          <div className="flex items-center gap-3"><span className="footer-monogram" aria-hidden="true">MT</span><p>© {new Date().getFullYear()} {profile.name}</p></div>
          <a href="#welcome" className="footer-back">Back to the beginning <span><ArrowUp size={16} aria-hidden="true" /></span></a>
        </div>
      </div>
    </footer>
  );
}
