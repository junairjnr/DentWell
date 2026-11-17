"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Pause, Play } from "lucide-react";
import { Magnetic, SplitWords } from "./motion";

const slides = [
  { src: "/clinic/operatory.jpg", alt: "Treatment room at DENTWELL" },
  { src: "/clinic/waiting.jpg", alt: "Waiting area at DENTWELL" },
  { src: "/clinic/logo-desk.jpg", alt: "At the DENTWELL logo wall" },
  { src: "/clinic/care.jpg", alt: "Care in the dental chair" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"video" | "stills">("video");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.2]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-12%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "video") return;
    video.muted = true;
    if (reduce) {
      video.pause();
      setPaused(true);
      return;
    }
    void video.play().then(() => setPaused(false)).catch(() => {
      setMode("stills");
      setPaused(true);
    });
  }, [reduce, mode]);

  useEffect(() => {
    if (mode !== "stills" || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [mode, reduce]);

  function togglePlay() {
    if (mode === "stills") {
      setMode("video");
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-wall"
    >
      <motion.div className="absolute inset-0" style={{ y: mediaY, scale: mediaScale }}>
        {mode === "video" ? (
          <video
            ref={videoRef}
            className="absolute left-0 top-0 h-full w-full origin-top-left scale-[1.28] object-cover"
            src="/clinic/hero.mp4"
            poster="/clinic/operatory.jpg"
            muted
            loop
            playsInline
            autoPlay={!reduce}
            preload="auto"
            aria-label="The DENTWELL clinic rooms."
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].src}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 1.04 }}
              transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={slides[index].src} alt={slides[index].alt} fill priority className="object-cover" sizes="100vw" />
            </motion.div>
          </AnimatePresence>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/35 to-charcoal/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/30"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ivory via-ivory/35 to-transparent"
        />
      </motion.div>

      <div className="absolute bottom-5 left-4 z-20 flex items-center gap-3 sm:bottom-8 sm:left-8">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-lift backdrop-blur-sm transition hover:bg-gold"
          aria-label={paused || mode === "stills" ? "Play the clinic film" : "Pause the clinic film"}
          data-cursor="hover"
        >
          {paused || mode === "stills" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
        {mode === "stills" ? (
          <div className="flex gap-2 rounded-full bg-ivory/85 px-3 py-2 backdrop-blur-sm">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show ${slide.alt}`}
                data-cursor="hover"
                className={`h-1.5 rounded-full transition ${i === index ? "w-7 bg-gold" : "w-2.5 bg-ink/25"}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-page flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:justify-center lg:pb-24 lg:pt-28"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <div className="max-w-3xl">
          <p className="mb-5 text-[12px] font-semibold tracking-[0.22em] text-gold sm:text-[13px]">
            DENTWELL · THALAKKADATHUR
          </p>
          <SplitWords
            as="h1"
            text="Exceptional care under the operatory light."
            className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-wall"
          />
          <motion.p
            className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-wall/85 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.55, duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Root canal centre and dental clinic — calm rooms, clear plans, and a time held only for
            you.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.7, duration: reduce ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <Link
                href="/book"
                data-cursor="hover"
                className="btn-press inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-medium text-ink shadow-glow hover:bg-[#d4b36a]"
              >
                Book an appointment
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/treatments"
                data-cursor="hover"
                className="btn-press inline-flex h-12 items-center justify-center rounded-full border border-wall/35 bg-wall/10 px-6 text-sm font-medium text-wall backdrop-blur-sm hover:bg-wall/20"
              >
                Explore treatments
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {!reduce ? (
          <a
            href="#visit"
            className="motion-safe-only absolute bottom-6 right-4 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-wall/70 sm:bottom-10 sm:right-8"
            data-cursor="hover"
          >
            SCROLL
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </a>
        ) : null}
      </motion.div>
    </section>
  );
}
