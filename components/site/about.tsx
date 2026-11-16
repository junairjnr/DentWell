import Image from "next/image";
import Link from "next/link";
import { AutoVideo } from "./auto-video";
import { DriftFrame, Reveal } from "./motion";

export function About() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-page items-center gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <DriftFrame className="photo-frame aspect-[4/3] rounded-[1.5rem] sm:aspect-auto sm:min-h-[28rem] sm:rounded-[2rem] lg:min-h-[34rem]">
          <Image
            src="/clinic/waiting.jpg"
            alt="Waiting area at DENTWELL, with a walnut table, pale oak desk, and fluted wall."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </DriftFrame>
        <Reveal delay={0.08}>
          <h2 className="display-title text-ink">A bright room above Federal Bank.</h2>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#3f3832]">
            <p>
              DENTWELL is Dr. Shemina&apos;s clinic on the first floor of OPS Tower, Parapputhadam,
              opposite Thalakkadathur Jumah Mosque. The practice is built around root canal care, and
              the same rooms are used for the rest of the treatment list.
            </p>
            <p>
              The rooms are the ones in these photographs: white fluted walls, pale oak, a gold tooth
              mark, and an operating light over the chair. Patients on Google mention the cleanliness,
              the staff, and that treatment is explained before it starts.
            </p>
            <p>
              Come for a consultation if you are unsure what you need. The dentist decides the
              treatment after looking, not from a form on this website.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-page items-center gap-6 px-4 pb-16 sm:gap-8 sm:px-6 sm:pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:pb-28">
        <Reveal>
          <h2 className="text-balance text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">
            A consultation, before anything else.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#3f3832]">
            If you are unsure what the tooth needs, start here. The dentist looks, explains, and only
            then says what the visit should be.
          </p>
          <Link
            href="/book?treatment=Dental%20Consultation"
            className="btn-press mt-6 inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a]"
          >
            Book a consultation
          </Link>
        </Reveal>
        <Reveal
          delay={0.08}
          className="photo-frame overflow-hidden bg-slate max-sm:-mx-4 sm:rounded-[1.75rem]"
        >
          <div className="relative overflow-hidden">
            <AutoVideo
              className="aspect-video w-full origin-top-left scale-[1.2] object-cover"
              src="/clinic/consulting.mp4"
              poster="/clinic/care.jpg"
              label="A clinician talking with a patient."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
