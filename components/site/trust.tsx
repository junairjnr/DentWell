"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Stethoscope } from "lucide-react";
import { Reveal } from "./motion";

const actions = [
  {
    href: "/book",
    title: "Book an appointment",
    text: "Pick a treatment, a day, and a time the clinic can confirm.",
    icon: CalendarDays,
    primary: true,
  },
  {
    href: "/treatments",
    title: "View treatments",
    text: "Root canal care and the full list around it, explained first.",
    icon: Stethoscope,
    primary: false,
  },
];

export function Trust() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-slate text-wall">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="display-title text-wall">Start with a visit, or with the list.</h2>
          <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-wall/80 sm:mt-6">
            Choose a time online, or read the treatments first. Either path ends at the same calm
            room in Thalakkadathur.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Reveal key={action.href} delay={index * 0.08} className="h-full">
                <Link
                  href={action.href}
                  className={`group relative flex h-full min-h-[12rem] flex-col overflow-hidden rounded-[1.5rem] p-6 transition duration-300 sm:min-h-[14rem] sm:rounded-[1.75rem] sm:p-8 ${
                    action.primary
                      ? "lamp-ring bg-gold text-ink"
                      : "bg-wall/5 ring-1 ring-wall/15 hover:bg-wall/10"
                  }`}
                >
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12 ${
                      action.primary ? "bg-ink/10 text-ink" : "bg-gold/20 text-gold"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="mt-6 flex items-start justify-between gap-3 sm:mt-8">
                    <span className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                      {action.title}
                    </span>
                    <motion.span
                      aria-hidden
                      className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        action.primary ? "bg-ink/10" : "bg-wall/10"
                      }`}
                      whileHover={reduce ? undefined : { rotate: 45 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span
                    className={`mt-3 max-w-[32ch] text-sm leading-relaxed ${
                      action.primary ? "text-ink/80" : "text-wall/75"
                    }`}
                  >
                    {action.text}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.16}
          className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-5"
        >
          <Link
            href="/book?treatment=Dental%20Consultation"
            className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-wall/25 px-5 text-sm font-medium text-wall transition hover:bg-wall/10"
          >
            Book a consultation
          </Link>
          <Link
            href="/gallery"
            className="inline-flex h-12 items-center justify-center text-sm font-medium text-gold transition hover:text-wall"
          >
            See the clinic rooms
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
