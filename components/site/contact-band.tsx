"use client";

import Link from "next/link";
import { clinic, whatsappHref } from "@/lib/clinic";
import { hoursSummary } from "@/lib/hours";
import type { Settings } from "@/lib/types";
import { Magnetic, Reveal } from "./motion";

export function ContactBand({ settings }: { settings: Settings }) {
  const hours = hoursSummary(settings);
  return (
    <section className="relative overflow-hidden bg-cream-wash" id="contact">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-page gap-10 section-pad sm:gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <Reveal className="flex flex-col">
          <h2 className="display-title">Talk to the clinic.</h2>
          <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            Call, WhatsApp, or book a time online. Place details stay in the footer until you update
            this page from the admin desk.
          </p>

          <div className="mt-10 grid gap-6 rounded-[1.75rem] bg-wall/80 p-6 shadow-lift backdrop-blur-sm sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-sm font-medium text-ink">Phone</p>
              <ul className="mt-3 space-y-2 text-sm">
                {clinic.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      data-cursor="hover"
                      className="font-medium text-[#3f3832] transition hover:text-gold-deep"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Hours</p>
              <ul className="mt-3 space-y-2 text-sm text-[#3f3832]">
                {hours.map((line) => (
                  <li key={line.label}>
                    <span className="font-medium text-ink">{line.label}.</span> {line.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row sm:flex-wrap">
            <Magnetic>
              <a
                href={whatsappHref("Hello DENTWELL, I would like to visit the clinic.")}
                data-cursor="hover"
                className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-medium text-ink shadow-glow hover:bg-[#d4b36a]"
              >
                WhatsApp
              </a>
            </Magnetic>
            <a
              href={clinic.directions}
              data-cursor="hover"
              className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-wall/60 px-6 text-sm font-medium backdrop-blur-sm hover:bg-ink/5"
            >
              Directions
            </a>
            <Magnetic>
              <Link
                href="/book"
                data-cursor="hover"
                className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-charcoal px-6 text-sm font-medium text-wall hover:bg-charcoal/90"
              >
                Book appointment
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal
          y={24}
          delay={0.08}
          className="photo-frame relative min-h-[18rem] overflow-hidden rounded-[1.75rem] bg-paper sm:min-h-[22rem] lg:min-h-full"
        >
          <iframe
            title="Map showing DENTWELL"
            src={clinic.mapEmbed}
            className="h-full min-h-[18rem] w-full border-0 sm:min-h-[22rem] lg:min-h-[28rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal/10 to-transparent"
          />
        </Reveal>
      </div>
    </section>
  );
}
