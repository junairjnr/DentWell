"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Treatment } from "@/lib/types";
import { Reveal } from "./motion";
import { getGsap } from "@/lib/gsap";

export function Treatments({ treatments }: { treatments: Treatment[] }) {
  const reduce = useReducedMotion();
  const [lead, ...rest] = treatments;
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !lead) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const amount = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: rail,
          start: "top top",
          end: () => `+=${amount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, rail);
    return () => ctx.revert();
  }, [reduce, lead, rest.length]);

  useEffect(() => {
    if (reduce || !lead) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const sticky = stickyRef.current;
    if (!sticky) return;
    const { gsap } = getGsap();
    const lines = gsap.utils.toArray<HTMLElement>("[data-root-line]", sticky);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sticky,
            start: "top top",
            end: "+=140%",
            scrub: true,
            pin: true,
          },
        },
      );
    }, sticky);
    return () => ctx.revert();
  }, [reduce, lead]);

  if (!lead) return null;

  const cards = [lead, ...rest];

  return (
    <section className="bg-wall" id="treatments">
      <div className="mx-auto max-w-page section-pad pb-8 sm:pb-10">
        <Reveal className="max-w-2xl">
          <h2 className="display-title">Root canal, and the care around it.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#3f3832]">
            Thirteen treatments are listed. Each one starts with an examination. Learn more, or book
            that treatment and the clinic will confirm the time.
          </p>
        </Reveal>
      </div>

      {/* Mobile / tablet grid */}
      <div className="mx-auto grid max-w-page grid-cols-2 gap-3 px-4 pb-16 sm:gap-4 sm:px-6 lg:hidden">
        {cards.map((treatment, index) => (
          <Reveal
            key={treatment.slug}
            as="article"
            delay={(index % 4) * 0.05}
            className="overflow-hidden rounded-[1.25rem] bg-paper shadow-lift"
          >
            <div className="relative h-28 sm:h-40">
              <Image src={treatment.image} alt={treatment.imageAlt} fill className="object-cover" sizes="50vw" />
            </div>
            <div className="p-3 sm:p-5">
              <h3 className="text-sm font-medium leading-snug tracking-[-0.02em] sm:text-lg">
                {treatment.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-[#3f3832]">{treatment.summary}</p>
              <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:gap-4">
                <Link href={`/treatments/${treatment.slug}`} className="font-medium text-gold-deep">
                  Learn more
                </Link>
                <Link href={`/book?treatment=${encodeURIComponent(treatment.name)}`} className="font-medium text-ink">
                  Book
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Desktop horizontal gallery */}
      <div ref={railRef} className="relative hidden overflow-hidden lg:block">
        <div ref={trackRef} className="horizon-track px-8 py-10">
          {cards.map((treatment) => (
            <article
              key={treatment.slug}
              className="group relative h-[70vh] w-[28rem] shrink-0 overflow-hidden rounded-[2rem] bg-charcoal text-wall shadow-depth"
            >
              <Image
                src={treatment.image}
                alt={treatment.imageAlt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="28rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-3xl tracking-[-0.03em]">{treatment.name}</h3>
                <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-wall/80">{treatment.summary}</p>
                <div className="mt-6 flex gap-4 text-sm">
                  <Link href={`/treatments/${treatment.slug}`} className="font-medium text-gold" data-cursor="hover">
                    Learn more
                  </Link>
                  <Link
                    href={`/book?treatment=${encodeURIComponent(treatment.name)}`}
                    className="font-medium text-wall"
                    data-cursor="hover"
                  >
                    Book treatment
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Sticky root canal highlight */}
      <div ref={stickyRef} className="relative hidden min-h-[100vh] bg-sage-band lg:block">
        <div className="mx-auto grid max-w-page grid-cols-2 items-center gap-16 px-6 py-24">
          <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src={lead.image} alt={lead.imageAlt} fill className="object-cover" sizes="40vw" />
          </div>
          <div className="space-y-10">
            <p data-root-line className="font-display text-5xl tracking-[-0.04em] text-ink">
              {lead.name}
            </p>
            <p data-root-line className="max-w-[34ch] text-lg leading-relaxed text-[#3f3832]">
              {lead.summary}
            </p>
            <p data-root-line className="max-w-[36ch] text-[16px] leading-relaxed text-[#3f3832]">
              {lead.detail}
            </p>
            <div data-root-line className="flex gap-3">
              <Link
                href={`/treatments/${lead.slug}`}
                className="btn-press inline-flex h-12 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink"
                data-cursor="hover"
              >
                Learn more
              </Link>
              <Link
                href={`/book?treatment=${encodeURIComponent(lead.name)}`}
                className="btn-press inline-flex h-12 items-center rounded-full border border-ink/15 px-5 text-sm font-medium"
                data-cursor="hover"
              >
                Book treatment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile root canal highlight */}
      <div className="bg-sage-band px-4 py-16 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-page">
          <div className="photo-frame relative mb-8 aspect-[4/3] overflow-hidden rounded-[1.5rem]">
            <Image src={lead.image} alt={lead.imageAlt} fill className="object-cover" sizes="100vw" />
          </div>
          <h3 className="font-display text-3xl tracking-[-0.03em] text-ink">{lead.name}</h3>
          <p className="mt-4 text-[16px] leading-relaxed text-[#3f3832]">{lead.summary}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/treatments/${lead.slug}`}
              className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink"
            >
              Learn more
            </Link>
            <Link
              href={`/book?treatment=${encodeURIComponent(lead.name)}`}
              className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium"
            >
              Book treatment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
