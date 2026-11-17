import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/motion";
import { Shell } from "@/components/site/shell";

export const metadata: Metadata = {
  title: "About the clinic",
  description: "About Dr. Shemina's DENTWELL — demo copy you can update later.",
};

export default function AboutPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:py-16">
        <Reveal className="max-w-2xl">
          <h1 className="display-title">About DENTWELL.</h1>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#3f3832]">
            <p>
              Demo page for now. Replace this text when you are ready. DENTWELL is Dr. Shemina&apos;s
              dental clinic and root canal centre. The public listing mentions check-ups, cleaning,
              fillings, single-sitting and re-root canal treatment, crowns, implants, whitening,
              laser, smile design, and aligners.
            </p>
            <p>
              Patients writing on Google talk about a clean clinic, short waits, and doctors who
              explain the treatment. Degrees and years in practice are not invented here.
            </p>
            <p>
              Place details live in the footer for this demo. You can move or expand them later.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
            >
              Book an appointment
            </Link>
            <Link
              href="/treatments"
              className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium hover:bg-ink/5"
            >
              View treatments
            </Link>
          </div>
        </Reveal>
      </article>
    </Shell>
  );
}
