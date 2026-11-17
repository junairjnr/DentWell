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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="gallery" className="bg-cream-wash">
      <div className="mx-auto max-w-page section-pad">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">The clinic, as it is.</h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#3f3832]">
            Photographs from the clinic&apos;s public Google gallery. A clinical software screen that
            showed a patient name was left out.
          </p>
        </Reveal>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((item, index) => (
            <Reveal
              key={item.id}
              y={20}
              delay={(index % 3) * 0.06}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpen(item)}
                data-cursor="hover"
                className="group block w-full overflow-hidden rounded-[1.35rem] bg-wall text-left shadow-lift"
              >
                <span className="relative block overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={900}
                    height={700}
                    className="h-auto w-full object-cover transition duration-700 ease-settle group-hover:scale-[1.06]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm"
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
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink"
              aria-label="Close photograph"
              onClick={() => setOpen(null)}
            >
              <X className="h-4 w-4" />
            </button>
            <motion.figure
              className="max-h-[88vh] max-w-5xl"
              onClick={(event) => event.stopPropagation()}
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={open.src}
                alt={open.alt}
                width={1400}
                height={900}
                className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-depth"
              />
              <figcaption className="mt-4 text-center text-sm text-wall">{open.caption}</figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
