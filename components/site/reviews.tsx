"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinic } from "@/lib/clinic";
import type { Review } from "@/lib/types";
import { Reveal } from "./motion";

export function Reviews({ reviews }: { reviews: Review[] }) {
  const visible = reviews.filter((review) => review.visible);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || visible.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % visible.length), 5600);
    return () => window.clearInterval(id);
  }, [reduce, visible.length]);

  const current = visible[index];
  if (!current) return null;

  return (
    <section className="relative overflow-hidden bg-charcoal text-wall" id="reviews">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-page section-pad">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="display-title max-w-xl text-wall">4.9 on Google, from 84 reviews.</h2>
          <a
            href={clinic.mapSearch}
            data-cursor="hover"
            className="btn-press inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
          >
            Read all Google reviews
          </a>
        </Reveal>

        <div className="relative mt-12 min-h-[14rem] sm:min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              className="max-w-3xl"
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-[clamp(1.6rem,3.5vw,2.75rem)] leading-[1.2] tracking-[-0.03em] text-wall">
                “{current.quote}”
              </p>
              <footer className="mt-8 text-sm">
                <span className="font-medium text-gold">{current.name}</span>
                <span className="mt-1 block text-wall/65">{current.source}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              data-cursor="hover"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-wall/25 text-wall hover:bg-wall/10"
              onClick={() => setIndex((i) => (i - 1 + visible.length) % visible.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              data-cursor="hover"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-wall/25 text-wall hover:bg-wall/10"
              onClick={() => setIndex((i) => (i + 1) % visible.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="ml-3 flex gap-2">
              {visible.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  className={`h-1.5 rounded-full transition ${i === index ? "w-8 bg-gold" : "w-3 bg-wall/30"}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-wall/65">
          These three lines are the ones shown in Google&apos;s review summary for this clinic.{" "}
          <Link href="/reviews" className="underline decoration-gold/60 underline-offset-4">
            More on the reviews page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
