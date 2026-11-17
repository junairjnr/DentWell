import Link from "next/link";
import { clinic, whatsappHref } from "@/lib/clinic";
import { hoursSummary } from "@/lib/hours";
import type { Settings, Treatment } from "@/lib/types";
import { Mark } from "./mark";
import { Reveal } from "./motion";

export function Footer({ settings, treatments }: { settings: Settings; treatments: Treatment[] }) {
  const hours = hoursSummary(settings);
  return (
    <footer className="bg-ink text-wall">
      <Reveal className="mx-auto grid max-w-page gap-8 px-4 py-14 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <Mark />
            <span className="text-sm font-semibold tracking-[0.16em]">DENTWELL</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-wall/75">
            Dr. Shemina&apos;s super speciality dental clinic and root canal centre in Thalakkadathur, Tirur.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-wall/75">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/doctors">Doctors</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/book">Book</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Treatments</p>
          <ul className="mt-3 space-y-2 text-sm text-wall/75">
            {treatments.slice(0, 6).map((treatment) => (
              <li key={treatment.slug}>
                <Link href={`/treatments/${treatment.slug}`}>{treatment.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Hours</p>
          <ul className="mt-3 space-y-2 text-sm text-wall/75">
            {hours.map((line) => (
              <li key={line.label}>
                {line.label}: {line.value}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={clinic.mapSearch} className="text-gold">Google Maps</a>
            <a href={whatsappHref("Hello DENTWELL")} className="text-gold">WhatsApp</a>
            {clinic.phones.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`} className="text-wall/80">
                {phone.display}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-page px-4 py-5 text-xs text-wall/60 sm:px-6">
          © {new Date().getFullYear()} {clinic.short}. Photographs are from the clinic&apos;s public Google gallery.
          Instagram will be linked when the clinic shares the account.
        </p>
      </div>
    </footer>
  );
}
