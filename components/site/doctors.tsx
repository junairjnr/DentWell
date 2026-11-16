import type { Doctor } from "@/lib/types";
import { Reveal } from "./motion";

export function Doctors({ doctors }: { doctors: Doctor[] }) {
  const visible = doctors.filter((doctor) => doctor.visible);
  return (
    <section className="bg-paper" id="doctors">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <Reveal>
          <h2 className="display-title max-w-xl">The clinicians patients name.</h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#3f3832]">
            Two names appear in the clinic&apos;s public Google reviews. Portraits and degrees are not
            on that listing, so they are not invented here. The clinic can add them from the admin desk.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {visible.map((doctor, index) => (
            <Reveal
              key={doctor.id}
              as="article"
              lift
              delay={index * 0.08}
              className="rounded-[1.75rem] bg-wall p-7 shadow-lift sm:p-9"
            >
              <p
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-4xl font-medium tracking-[-0.04em] text-gold-deep"
                aria-hidden="true"
              >
                {doctor.name.replace("Dr. ", "").slice(0, 1)}
              </p>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{doctor.name}</h3>
              <p className="mt-1 text-sm text-[#5c534c]">{doctor.role}</p>
              <p className="mt-5 text-sm leading-relaxed text-[#3f3832]">{doctor.qualifications}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#3f3832]">{doctor.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
