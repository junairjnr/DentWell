"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { AutoVideo } from "./auto-video";
import { Reveal } from "./motion";
import { getGsap } from "@/lib/gsap";

const chapters = [
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
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const root = pinRef.current;
    const image = imageRef.current;
    const panels = panelsRef.current;
    if (!root || !image || !panels) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const panelEls = gsap.utils.toArray<HTMLElement>("[data-about-panel]", panels);
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${Math.max(panels.scrollHeight - window.innerHeight * 0.2, window.innerHeight)}`,
        pin: image,
        pinSpacing: false,
        scrub: true,
      });
      panelEls.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          { opacity: 0.25, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 70%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
        if (index > 0) {
          gsap.to(image.querySelector("img"), {
            scale: 1 + index * 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="bg-cream-wash" id="about">
      <div ref={pinRef} className="mx-auto max-w-page section-pad lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div
          ref={imageRef}
          className="photo-frame relative mb-10 aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:mb-0 lg:min-h-[85vh] lg:aspect-auto"
        >
          <Image
            src="/clinic/waiting.jpg"
            alt="Waiting area at DENTWELL"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
        </div>

        <div ref={panelsRef} className="flex flex-col gap-16 lg:gap-28 lg:py-10">
          <Reveal>
            <h2 className="display-title text-ink">How a visit usually goes.</h2>
            <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#3f3832]">
              Demo storytelling for now — listen, look, then treat. Nothing is decided from a form
              alone.
            </p>
          </Reveal>
          {chapters.map((chapter) => (
            <div key={chapter.title} data-about-panel className="max-w-md">
              <h3 className="font-display text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
                {chapter.title}
              </h3>
              <span aria-hidden className="mt-4 block h-px w-12 bg-gold" />
              <p className="mt-4 text-[16px] leading-relaxed text-[#3f3832]">{chapter.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-page items-center gap-8 px-4 pb-16 sm:gap-10 sm:px-6 sm:pb-24 lg:grid-cols-2 lg:gap-14 lg:pb-32">
        <Reveal>
          <h2 className="display-title text-ink">A consultation, before anything else.</h2>
          <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#3f3832]">
            If you are unsure what the tooth needs, start here. The dentist looks, explains, and only
            then says what the visit should be.
          </p>
          <Link
            href="/book?treatment=Dental%20Consultation"
            data-cursor="hover"
            className="btn-press mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink shadow-glow hover:bg-[#d4b36a] sm:w-auto"
          >
            Book a consultation
          </Link>
        </Reveal>
        <Reveal delay={0.08} className="photo-frame overflow-hidden rounded-[1.75rem] bg-charcoal">
          <div className="relative overflow-hidden">
            <AutoVideo
              className="aspect-video w-full origin-top-left scale-[1.18] object-cover"
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
