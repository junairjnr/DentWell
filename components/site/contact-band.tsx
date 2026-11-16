import { clinic, whatsappHref } from "@/lib/clinic";
import { hoursSummary } from "@/lib/hours";
import type { Settings } from "@/lib/types";
import Link from "next/link";
import { Reveal } from "./motion";

export function ContactBand({ settings }: { settings: Settings }) {
  const hours = hoursSummary(settings);
  return (
    <section className="bg-wall" id="contact">
      <div className="mx-auto grid max-w-page gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <Reveal>
          <h2 className="display-title">Come to OPS Tower.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#3f3832]">{clinic.address}</p>
          <p className="mt-2 text-sm text-[#5c534c]">{clinic.landmark}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {clinic.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="font-medium text-ink transition hover:text-gold-deep">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-1 text-sm text-[#3f3832]">
            {hours.map((line) => (
              <li key={line.label}>
                <span className="text-ink">{line.label}.</span> {line.value}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappHref("Hello DENTWELL, I would like to visit the clinic.")}
              className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
            >
              WhatsApp
            </a>
            <a
              href={clinic.directions}
              className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium hover:bg-ink/5"
            >
              Directions
            </a>
            <Link
              href="/book"
              className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-slate px-5 text-sm font-medium text-wall hover:bg-slate/90"
            >
              Book appointment
            </Link>
          </div>
        </Reveal>
        <Reveal
          y={32}
          delay={0.08}
          className="photo-frame overflow-hidden rounded-[1.5rem] bg-paper sm:rounded-[1.75rem]"
        >
          <iframe
            title="Map showing DENTWELL at OPS Tower, Thalakkadathur"
            src={clinic.mapEmbed}
            className="h-[20rem] w-full border-0 sm:h-[28rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
