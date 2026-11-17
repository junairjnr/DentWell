import Link from "next/link";
import { AutoVideo } from "./auto-video";
import { Reveal } from "./motion";

const visitSteps = [
  {
    title: "Say what hurts",
    text: "Tell the clinic what you feel, how long it has lasted, and any past treatment on that tooth.",
  },
  {
    title: "Look first",
    text: "The dentist examines the tooth and explains what they see before naming a treatment.",
  },
  {
    title: "Agree the plan",
    text: "You hear the options in plain language, then book the visit that fits the plan.",
  },
];

export function About() {
  return (
    <section className="bg-paper" id="about">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="display-title text-ink">How a visit usually goes.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            Demo copy for now — you can replace this later. The idea is simple: listen, look, then
            treat. Nothing is decided from a form alone.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {visitSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.08}
              className="rounded-[1.5rem] bg-wall p-6 shadow-lift sm:p-7"
            >
              <p className="text-3xl font-medium tracking-[-0.04em] text-gold-deep" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3f3832]">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-page items-center gap-8 px-4 pb-16 sm:gap-10 sm:px-6 sm:pb-20 lg:grid-cols-2 lg:gap-14 lg:pb-28">
        <Reveal>
          <h2 className="display-title text-ink">A consultation, before anything else.</h2>
          <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#3f3832] sm:mt-6">
            If you are unsure what the tooth needs, start here. The dentist looks, explains, and only
            then says what the visit should be.
          </p>
          <Link
            href="/book?treatment=Dental%20Consultation"
            className="btn-press mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-[#d4b36a] sm:w-auto"
          >
            Book a consultation
          </Link>
        </Reveal>
        <Reveal
          delay={0.08}
          className="photo-frame overflow-hidden rounded-[1.5rem] bg-slate sm:rounded-[1.75rem]"
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
