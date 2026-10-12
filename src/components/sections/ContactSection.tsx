"use client";

import { ChapterOrnament } from "@/components/layout/ChapterOrnament";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/biography";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "draft" | "error" | "invalid">(
    "idle"
  );

  const hasFormService = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!name || !email || !message) {
      setStatus("invalid");
      return;
    }
    if (data.get("website")) return;

    if (!key) {
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${body}`;
      setStatus("draft");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        signal: AbortSignal.timeout(15000),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          name,
          email,
          message,
          subject: `Portfolio inquiry from ${name}`,
        }),
      });
      const result = await res.json();
      if (!res.ok || result.success !== true) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad bg-navy text-cream">
      <ChapterOrnament variant="flower" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <SectionShell preset="rise">
          <div
            data-motion-target
            className="relative aspect-[4/5] overflow-hidden bg-navy sm:aspect-[5/4] lg:aspect-auto lg:min-h-[32rem]"
          >
            <Image
              src="/media/portrait/graduation-02.jpg"
              alt="Maham Tanveer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
          </div>
        </SectionShell>

        <SectionShell preset="slideRight" delay={0.1} splitHeading>
          <div data-motion-target>
            <p className="section-eyebrow !text-gold">Contact</p>
            <h2
              data-motion-heading
              className="mt-3 font-serif text-4xl sm:text-5xl"
            >
              Let&apos;s continue the conversation
            </h2>
            <p className="mt-4 text-cream/70">
              For teaching, collaboration, or professional opportunities. Reach
              out directly or send a note below.
            </p>

            {!hasFormService && <p className="mt-4 text-sm leading-relaxed text-cream/65">This form opens a draft in your email app. Review it there and send it to complete your enquiry.</p>}
            <form onSubmit={onSubmit} className="mt-8 space-y-4" onChange={() => { if (status !== "sending") setStatus("idle"); }}>
              <div className="hidden" aria-hidden="true"><label htmlFor="website">Leave this empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-cream/85">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  required
                  placeholder="Your name"
                  className="w-full border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-cream/85">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-cream/85">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={5000}
                  required
                  rows={5}
                  placeholder="Your message"
                  className="w-full resize-y border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-gold"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : hasFormService ? "Send message" : "Open email draft"}
              </Button>
              <div role="status" aria-live="polite">
              {status === "draft" && <p className="text-sm text-gold">Your email app was requested. Please send the draft there. If it did not open, email {profile.email} directly.</p>}
              {status === "invalid" && <p className="text-sm text-red-300">Please enter your name, email, and a message.</p>}
              {status === "sent" && (
                <p className="text-sm text-gold">
                  Thank you. Your message has been submitted.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-300">
                  Something went wrong. Please email {profile.email} directly.
                </p>
              )}
              </div>
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
                <span className="inline-flex h-4 w-4 items-center justify-center text-[0.65rem] font-bold tracking-tight">
                  in
                </span>
                {profile.linkedinLabel}
              </a>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {profile.location}
              </p>
            </div>
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
