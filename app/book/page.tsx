import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/wizard";
import { Reveal } from "@/components/site/motion";
import { Shell } from "@/components/site/shell";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "Request a time at Dr. Shemina's DENTWELL in Thalakkadathur. Open slots come from the clinic's calendar.",
};

export default function BookPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <h1 className="max-w-xl text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Book a time that stays yours.</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#3f3832]">
            Pick a treatment, a date the clinic is open, and a time nobody else is holding. The request waits as pending until the clinic confirms it.
          </p>
        </Reveal>
        <div className="mt-10">
          <Suspense fallback={<p className="text-sm text-[#5c534c]">Opening the calendar…</p>}>
            <BookingWizard />
          </Suspense>
        </div>
      </div>
    </Shell>
  );
}
