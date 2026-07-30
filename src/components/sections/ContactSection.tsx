"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/biography";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!key) {
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          name,
          email,
          message,
          subject: `Portfolio inquiry from ${name}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <FadeIn>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:min-h-[32rem]">
            <Image
              src="/media/portrait/graduation-02.jpg"
              alt="Maham Tanveer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="section-eyebrow !text-gold">Contact</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Let&apos;s continue the conversation
          </h2>
          <p className="mt-4 text-cream/70">
            For teaching, collaboration, or professional opportunities—reach out
            directly or send a note below.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Your message"
                className="w-full resize-y border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
            </div>
            <Button type="submit" variant="gold" size="lg" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
            {status === "sent" && (
              <p className="text-sm text-gold">Thank you—your message is on its way.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-300">
                Something went wrong. Please email {profile.email} directly.
              </p>
            )}
          </form>

          <div className="mt-10 grid gap-3 border-t border-cream/15 pt-8 text-sm text-cream/80">
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
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold"
            >
              <Linkedin className="h-4 w-4" /> {profile.linkedinLabel}
            </a>
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {profile.location}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
