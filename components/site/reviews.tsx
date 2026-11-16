"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { clinic } from "@/lib/clinic";
import type { Review } from "@/lib/types";
import { Reveal } from "./motion";

export function Reviews({ reviews }: { reviews: Review[] }) {
  const visible = reviews.filter((review) => review.visible);
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-slate text-wall" id="reviews">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="display-title max-w-xl">4.9 on Google, from 84 reviews.</h2>
          <a
            href={clinic.mapSearch}
            className="btn-press inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
          >
            Read all Google reviews
          </a>
        </Reveal>
        <div className="mt-6 flex items-center gap-1 text-gold" aria-label="4.9 out of 5">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.svg
              key={index}
              viewBox="0 0 20 20"
              className="h-5 w-5 fill-current sm:h-6 sm:w-6"
              aria-hidden="true"
              initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: reduce ? 0 : 0.4,
                delay: reduce ? 0 : 0.08 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <path d="M10 1.5 12.4 7l6.1.5-4.6 4 1.5 5.9L10 14.8 4.6 17.4 6.1 11.5 1.5 7.5 7.6 7 10 1.5Z" />
            </motion.svg>
          ))}
          <span className="ml-2 text-sm text-wall/80">Live listing, {clinic.ratingChecked}</span>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {visible.map((review, index) => (
            <Reveal
              key={review.id}
              as="article"
              delay={index * 0.08}
              className="rounded-[1.5rem] bg-white/[0.06] p-6 ring-1 ring-gold/25 sm:p-7"
            >
              <blockquote className="text-lg leading-relaxed text-wall sm:text-xl">
                “{review.quote}”
              </blockquote>
              <p className="mt-6 text-sm">
                <span className="block font-medium">{review.name}</span>
                <span className="mt-1 block text-wall/70">{review.source}</span>
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-wall/70">
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
