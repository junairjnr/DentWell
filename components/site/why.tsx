import { Reveal } from "./motion";

const points = [
  {
    title: "A root canal centre",
    text: "The practice is named for it. Single-sitting and retreatment are discussed only after the tooth is examined.",
  },
  {
    title: "The room you can see",
    text: "Fluted walls, pale oak, and the gold mark are the actual clinic, not a stock interior.",
  },
  {
    title: "Named in reviews",
    text: "Google reviews mention Dr. Shemina and Dr. Arshad Mohammed A, and a staff that explains the visit.",
  },
  {
    title: "Clear next steps",
    text: "Book online, message on WhatsApp, or call. Place details stay in the footer until you update this page.",
  },
  {
    title: "A time that is held",
    text: "The calendar only offers slots the clinic has opened, and a pending booking keeps that slot for you.",
  },
  {
    title: "Open into the evening",
    text: "Monday to Saturday the listing says 9:00 AM to 7:30 PM. Sunday is 10:00 AM to 1:00 PM, and the admin can change it.",
  },
];

export function Why() {
  return (
    <section className="bg-sage-band">
      <div className="mx-auto max-w-page section-pad">
        <Reveal>
          <h2 className="display-title max-w-xl text-ink">Why people come upstairs.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {points.map((point, index) => (
            <Reveal as="li" key={point.title} delay={(index % 3) * 0.07}>
              <h3 className="font-display text-xl tracking-[-0.02em] text-ink sm:text-2xl">
                {point.title}
              </h3>
              <span aria-hidden className="mt-4 block h-px w-10 bg-gold" />
              <p className="mt-3 text-sm leading-relaxed text-[#3f3832]">{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
