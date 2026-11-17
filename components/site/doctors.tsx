import type { Doctor } from "@/lib/types";
import { Reveal } from "./motion";

export function Doctors({ doctors }: { doctors: Doctor[] }) {
  const visible = doctors.filter((doctor) => doctor.visible);
  return (
    <section className="bg-paper" id="doctors">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">Our doctors.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            The doctors listed here are named on the clinic&apos;s public Google reviews. Portraits and
            degrees are added only when the clinic publishes them from the admin desk.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {visible.map((doctor, index) => (
            <Reveal
              key={doctor.id}
              as="article"
              lift
              delay={index * 0.08}
              className="rounded-[1.5rem] bg-wall p-6 shadow-lift sm:rounded-[1.75rem] sm:p-8 lg:p-9"
            >
              <p
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-3xl font-medium tracking-[-0.04em] text-gold-deep sm:h-16 sm:w-16 sm:text-4xl"
                aria-hidden="true"
              >
                {doctor.name.replace("Dr. ", "").slice(0, 1)}
              </p>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.03em] sm:mt-6 sm:text-2xl">
                {doctor.name}
              </h3>
              <p className="mt-1 text-sm text-[#5c534c]">{doctor.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#3f3832] sm:mt-5">{doctor.qualifications}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3f3832] sm:mt-4">{doctor.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
