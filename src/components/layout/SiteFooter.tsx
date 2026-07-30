import Image from "next/image";
import { profile } from "@/data/biography";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 bg-navy pb-16 text-cream sm:pb-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/mt-logo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            unoptimized
          />
          <div className="text-left">
            <p className="font-serif text-xl">{profile.name}</p>
            <p className="text-sm text-cream/70">Digital biography</p>
          </div>
        </div>
        <p className="text-xs text-cream/45">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
