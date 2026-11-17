"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { getGsap } from "@/lib/gsap";
import { Reveal } from "./motion";

const stories = [
  {
    src: "/clinic/operatory.jpg",
    title: "The chair under soft light",
    text: "The treatment room patients describe when they talk about the visit feeling calm.",
  },
  {
    src: "/clinic/waiting.jpg",
    title: "The waiting room you enter first",
    text: "Pale oak, fluted walls, and the gold mark — the same room as the photographs.",
  },
  {
    src: "/clinic/care.jpg",
    title: "Care that is explained",
    text: "Google reviews keep returning to the same point: the procedure was explained before it began.",
  },
];

export function StackedStories() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, scale: 0.94, opacity: 0.35 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-page section-pad">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">Rooms, stacked in memory.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#3f3832]">
            Three stills from the clinic — the same places patients walk through before treatment.
          </p>
        </Reveal>
        <div ref={rootRef} className="relative mt-12 space-y-8 lg:mt-16 lg:space-y-0 lg:min-h-[220vh]">
          {stories.map((story, index) => (
            <article
              key={story.src}
              data-stack-card
              className={`overflow-hidden rounded-[1.75rem] bg-wall shadow-depth lg:sticky lg:top-[14vh] ${
                index === 0 ? "" : "lg:mt-8"
              }`}
              style={{ zIndex: index + 1 }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[58vh]">
                  <Image src={story.src} alt={story.title} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gold">0{index + 1}</p>
                  <h3 className="mt-4 font-display text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
                    {story.title}
                  </h3>
                  <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[#3f3832]">
                    {story.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
