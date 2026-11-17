"use client";

import Link from "next/link";
import { clinic, whatsappHref } from "@/lib/clinic";
import { hoursSummary } from "@/lib/hours";
import type { Settings, Treatment } from "@/lib/types";
import { Mark } from "./mark";
import { Reveal } from "./motion";

export function Footer({ settings, treatments }: { settings: Settings; treatments: Treatment[] }) {
  const hours = hoursSummary(settings);
  return (
    <footer className="relative overflow-hidden bg-charcoal text-wall">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
      />
      <Reveal className="relative mx-auto grid max-w-page gap-10 section-pad sm:grid-cols-2 md:grid-cols-4 md:gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Mark />
            <span className="text-sm font-semibold tracking-[0.18em]">DENTWELL</span>
          </div>
          <p className="mt-5 font-display text-2xl leading-snug tracking-[-0.02em] text-wall sm:text-3xl">
            Care that feels considered.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-wall/70">
            Dr. Shemina&apos;s super speciality dental clinic and root canal centre in
            Thalakkadathur, Tirur.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-wall/55">{clinic.address}</p>
          <p className="mt-1 text-xs text-wall/55">{clinic.landmark}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Visit</p>
          <ul className="mt-4 space-y-2.5 text-sm text-wall/75">
            <li>
              <Link href="/about" className="transition hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="transition hover:text-gold">
                Doctors
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="transition hover:text-gold">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="transition hover:text-gold">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-gold">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/book" className="transition hover:text-gold">
                Book
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Treatments</p>
          <ul className="mt-4 space-y-2.5 text-sm text-wall/75">
            {treatments.slice(0, 6).map((treatment) => (
              <li key={treatment.slug}>
                <Link href={`/treatments/${treatment.slug}`} className="transition hover:text-gold">
                  {treatment.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Hours</p>
          <ul className="mt-4 space-y-2.5 text-sm text-wall/75">
            {hours.map((line) => (
              <li key={line.label}>
                {line.label}: {line.value}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a href={clinic.mapSearch} className="text-gold transition hover:text-[#d4b36a]">
              Google Maps
            </a>
            <a
              href={whatsappHref("Hello DENTWELL")}
              className="text-gold transition hover:text-[#d4b36a]"
            >
              WhatsApp
            </a>
            {clinic.phones.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`} className="text-wall/80 hover:text-wall">
                {phone.display}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="border-t border-wall/10">
        <p className="mx-auto max-w-page px-4 py-5 text-xs text-wall/55 sm:px-6">
          © {new Date().getFullYear()} {clinic.short}. Photographs are from the clinic&apos;s public
          Google gallery. Instagram will be linked when the clinic shares the account.
        </p>
      </div>
    </footer>
  );
}
