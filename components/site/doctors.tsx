"use client";

import type { Doctor } from "@/lib/types";
import { Reveal } from "./motion";

export function Doctors({ doctors }: { doctors: Doctor[] }) {
  const visible = doctors.filter((doctor) => doctor.visible);
  return (
    <section className="bg-paper" id="doctors">
      <div className="mx-auto max-w-page section-pad">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">Our doctors.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            The doctors listed here are named on the clinic&apos;s public Google reviews. Portraits and
            degrees are added only when the clinic publishes them from the admin desk.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-8">
          {visible.map((doctor, index) => (
            <Reveal
              key={doctor.id}
              as="article"
              lift
              delay={index * 0.1}
              className="group relative overflow-hidden rounded-[2rem] bg-wall p-8 shadow-lift sm:p-10"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sage/60 blur-2xl transition duration-700 group-hover:scale-125"
              />
              <p
                className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 font-display text-4xl tracking-[-0.04em] text-gold-deep"
                aria-hidden
              >
                {doctor.name.replace("Dr. ", "").slice(0, 1)}
              </p>
              <h3 className="relative mt-8 font-display text-3xl tracking-[-0.03em] text-ink">
                {doctor.name}
              </h3>
              <p className="relative mt-2 text-sm text-[#5c534c]">{doctor.role}</p>
              <p className="relative mt-5 text-sm leading-relaxed text-[#3f3832]">{doctor.qualifications}</p>
              <p className="relative mt-4 text-[15px] leading-relaxed text-[#3f3832]">{doctor.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
