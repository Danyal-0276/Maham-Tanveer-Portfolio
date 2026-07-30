"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/biography";

export function LoadingReveal() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 200 : 1400;
    const t = window.setTimeout(() => setShow(false), ms);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5"
          >
            <Image
              src="/brand/mt-logo.png"
              alt="MT monogram"
              width={120}
              height={120}
              className="h-24 w-24 rounded-full object-cover ring-1 ring-gold/40"
              priority
            />
            <p className="font-serif text-3xl tracking-wide text-cream sm:text-4xl">
              {profile.name}
            </p>
            <div className="gold-rule" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
