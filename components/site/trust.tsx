import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { clinic, whatsappHref } from "@/lib/clinic";
import { hoursSummary } from "@/lib/hours";
import type { Settings } from "@/lib/types";
import { Reveal } from "./motion";

export function Trust({ settings }: { settings: Settings }) {
  const hours = hoursSummary(settings);
  return (
    <section className="border-b border-ink/10 bg-wall/80">
      <div className="mx-auto grid max-w-page gap-4 px-4 py-8 sm:gap-5 sm:px-6 sm:py-12 lg:grid-cols-3 lg:gap-6">
        <Reveal className="rounded-[1.5rem] bg-paper p-5 shadow-lift sm:p-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-deep">
              <MapPin className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-base font-medium tracking-[-0.02em] text-ink sm:text-lg">{clinic.landmark}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3f3832]">
                First floor, OPS Tower, Parapputhadam, Thalakkadathur.
              </p>
              <a
                href={clinic.directions}
                className="mt-4 inline-flex text-sm font-medium text-gold-deep transition hover:text-ink"
              >
                Get directions
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-[1.5rem] bg-paper p-5 shadow-lift sm:p-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-deep">
              <Clock3 className="h-4 w-4" aria-hidden />
            </span>
            <ul className="space-y-2 text-sm leading-relaxed text-[#3f3832]">
              {hours.map((line) => (
                <li key={line.label}>
                  <span className="font-medium text-ink">{line.label}.</span> {line.value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="rounded-[1.5rem] bg-slate p-5 text-wall shadow-lift sm:p-6">
          <div className="flex flex-col gap-3">
            <Link
              href="/book"
              className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
            >
              Book an appointment
            </Link>
            <a
              href={whatsappHref("Hello DENTWELL, I would like to ask about an appointment.")}
              className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-wall/25 px-5 text-sm font-medium text-wall hover:bg-wall/10"
            >
              WhatsApp the clinic
            </a>
            <a
              href={`tel:${clinic.phones[0].tel}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-wall/90"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {clinic.phones[0].display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
