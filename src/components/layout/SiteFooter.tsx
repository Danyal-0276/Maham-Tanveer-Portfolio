import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/biography";

export function SiteFooter() {
  return (
    <footer className="border-t border-navy/10 bg-navy pb-28 text-cream sm:pb-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/mt-logo.png"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
            unoptimized
          />
          <div>
            <p className="font-serif text-2xl">{profile.name}</p>
            <p className="text-sm text-cream/70">Digital biography</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-cream/80">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 hover:text-gold"
          >
            <Mail className="h-4 w-4" /> {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 hover:text-gold"
          >
            <Phone className="h-4 w-4" /> {profile.phone}
          </a>
          <p className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
