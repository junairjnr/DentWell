"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import { Reveal } from "./motion";

export function Gallery({ items }: { items: GalleryItem[] }) {
  const visible = items.filter((item) => item.visible);
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="gallery" className="bg-paper">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">The clinic, as it is.</h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            Photographs from the clinic&apos;s public Google gallery. A clinical software screen that
            showed a patient name was left out.
          </p>
        </Reveal>
        <div className="mt-10 columns-1 gap-3 sm:mt-12 sm:columns-2 sm:gap-4 lg:columns-3">
          {visible.map((item, index) => (
            <Reveal key={item.id} y={16} delay={(index % 3) * 0.05} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="group block w-full overflow-hidden rounded-[1.25rem] bg-wall text-left shadow-lift"
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  height={700}
                  className="h-auto w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </span>
              <span className="block px-4 py-3 text-sm text-[#3f3832]">{item.caption}</span>
            </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={open.caption}
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-wall text-ink"
              aria-label="Close photograph"
              onClick={() => setOpen(null)}
            >
              <X className="h-4 w-4" />
            </button>
            <motion.figure
              className="max-h-[88vh] max-w-5xl"
              onClick={(event) => event.stopPropagation()}
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={open.src} alt={open.alt} width={1400} height={900} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-wall">{open.caption}</figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
