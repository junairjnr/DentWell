"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Stethoscope } from "lucide-react";
import { Magnetic, Reveal } from "./motion";

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
  return (
    <section id="visit" className="relative overflow-hidden bg-charcoal text-wall">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sage/30 blur-3xl" />
      <div className="relative mx-auto max-w-page section-pad">
        <Reveal className="max-w-2xl">
          <h2 className="display-title text-wall">Start with a visit, or with the list.</h2>
          <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-wall/75 sm:mt-6">
            Choose a time online, or read the treatments first. Either path ends in the same calm
            room.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Reveal key={action.href} delay={index * 0.1} className="h-full">
                <Magnetic strength={0.12} className="h-full w-full">
                  <Link
                    href={action.href}
                    data-cursor="hover"
                    className={`group relative flex h-full min-h-[13rem] flex-col overflow-hidden rounded-[1.75rem] p-6 transition duration-500 sm:min-h-[15rem] sm:p-8 ${
                      action.primary
                        ? "lamp-ring bg-gold text-ink"
                        : "glass-panel text-wall hover:bg-wall/10"
                    }`}
                  >
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
                        action.primary ? "bg-ink/10 text-ink" : "bg-gold/20 text-gold"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="mt-8 flex items-start justify-between gap-3">
                      <span className="font-display text-2xl tracking-[-0.03em] sm:text-3xl">
                        {action.title}
                      </span>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition duration-300 group-hover:rotate-45" />
                    </span>
                    <span
                      className={`mt-3 max-w-[32ch] text-sm leading-relaxed ${
                        action.primary ? "text-ink/80" : "text-wall/70"
                      }`}
                    >
                      {action.text}
                    </span>
                  </Link>
                </Magnetic>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
