import { clinic, whatsappHref } from "@/lib/clinic";
import { hoursSummary } from "@/lib/hours";
import type { Settings } from "@/lib/types";
import Link from "next/link";
import { Reveal } from "./motion";

export function ContactBand({ settings }: { settings: Settings }) {
  const hours = hoursSummary(settings);
  return (
    <section className="bg-wall" id="contact">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-stretch lg:gap-14 lg:py-28">
        <Reveal className="flex flex-col">
          <h2 className="display-title">Talk to the clinic.</h2>
          <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            Demo contact block — call, WhatsApp, or book a time. Full place details stay in the
            footer for now.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-ink">Phone</p>
              <ul className="mt-3 space-y-2 text-sm">
                {clinic.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
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

          <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
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
          y={24}
          delay={0.08}
          className="photo-frame min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-paper sm:min-h-[22rem] sm:rounded-[1.75rem] lg:min-h-full"
        >
          <iframe
            title="Map showing DENTWELL"
            src={clinic.mapEmbed}
            className="h-full min-h-[18rem] w-full border-0 sm:min-h-[22rem] lg:min-h-[28rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
