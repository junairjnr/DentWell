"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";

const DOCK_KEY = "dentwell_hero_dock_dismissed";

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [dockOpen, setDockOpen] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setDockOpen(localStorage.getItem(DOCK_KEY) !== "1");
    } catch {
      setDockOpen(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (reduce) {
      video.pause();
      setPaused(true);
      return;
    }
    void video.play().then(() => setPaused(false)).catch(() => setPaused(true));
  }, [reduce]);

  function togglePlay() {
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

  function dismissDock() {
    setDockOpen(false);
    try {
      localStorage.setItem(DOCK_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
  }

  const showDock = dockOpen === true;

  return (
    <section className="relative isolate min-h-[72svh] bg-slate sm:min-h-[78svh] lg:min-h-[100svh]">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute left-0 top-0 h-full w-full origin-top-left scale-[1.34] object-cover"
          src="/clinic/hero.mp4"
          poster="/clinic/operatory.jpg"
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="auto"
          aria-label="The DENTWELL reception and treatment room."
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-wall via-wall/80 to-transparent transition-opacity duration-500 lg:from-wall/95 lg:via-wall/55 ${
            showDock ? "h-[42%] opacity-100" : "h-[18%] opacity-40"
          }`}
        />
      </div>

      <div className="absolute bottom-3 left-3 z-20 sm:bottom-5 sm:left-5 lg:bottom-8 lg:left-8">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-wall backdrop-blur-sm transition hover:bg-ink/85"
          aria-label={paused ? "Play the clinic film" : "Pause the clinic film"}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>

      {!showDock ? (
        <h1 className="sr-only">Dr. Shemina&apos;s DENTWELL Super Speciality Dental Clinic &amp; Root Canal Centre</h1>
      ) : null}

      <div className="relative z-10 flex min-h-[72svh] items-end px-4 pb-6 pt-24 sm:min-h-[78svh] sm:px-6 sm:pb-8 lg:min-h-[100svh] lg:px-8 lg:pb-12">
        <AnimatePresence>
          {showDock ? (
            <motion.div
              key="hero-dock"
              role="dialog"
              aria-label="Clinic introduction"
              className="lamp-ring relative w-full max-w-page rounded-[1.5rem] bg-wall/95 px-5 py-5 backdrop-blur-sm sm:rounded-[1.75rem] sm:px-8 sm:py-6 lg:ml-auto lg:max-w-lg lg:px-9 lg:py-8"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={dismissDock}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/5 hover:text-ink sm:right-4 sm:top-4"
                aria-label="Close introduction"
              >
                <X className="h-4 w-4" />
              </button>

              <h1 className="pr-10 text-[13px] font-semibold tracking-[0.18em] text-ink">DENTWELL</h1>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[#3f3832] sm:text-base">
                Root canal centre and dental clinic on the first floor of OPS Tower, Thalakkadathur.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium text-ink transition hover:bg-[#d4b36a]"
                >
                  Book an appointment
                </Link>
                <Link
                  href="/treatments"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  Explore treatments
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
