import type { Metadata } from "next";
import Image from "next/image";
import { DriftFrame, Reveal } from "@/components/site/motion";
import { Shell } from "@/components/site/shell";

export const metadata: Metadata = {
  title: "About the clinic",
  description: "Dr. Shemina's DENTWELL is a root canal centre on the first floor of OPS Tower, Thalakkadathur, Tirur.",
};

export default function AboutPage() {
  return (
    <Shell>
      <article className="mx-auto grid max-w-page items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <DriftFrame className="min-h-[22rem] rounded-[2rem]">
          <Image src="/clinic/logo-desk.jpg" alt="Two people in front of the gold DENTWELL tooth, holding an aligner box." fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
        </DriftFrame>
        <Reveal delay={0.08}>
          <h1 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">The clinic, in its own words and rooms.</h1>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#3f3832]">
            <p>
              Dr. Shemina&apos;s DENTWELL is a super speciality dental clinic and root canal centre at First Floor, OPS Tower, Parapputhadam, Thalakkadathur, Tirur, Malappuram, Kerala 676103. It sits opposite Thalakkadathur Jumah Mosque, above Federal Bank.
            </p>
            <p>
              The public description of the practice lists check-ups, cleaning, fillings, single-sitting and re-root canal treatment, crowns, implants, whitening, laser, smile design, and aligners. Patients writing on Google talk about a clean clinic, short waits, and doctors who explain the treatment.
            </p>
            <p>
              This website does not add years of experience, patient totals, or degrees that the clinic has not published. Those lines can be added when the clinic provides them.
            </p>
          </div>
        </Reveal>
      </article>
    </Shell>
  );
}
