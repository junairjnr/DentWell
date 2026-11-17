"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Magnetic, ScrollProgress } from "./motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { clinic, whatsappHref } from "@/lib/clinic";
import { useUi } from "@/lib/store";
import { Mark } from "./mark";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Treatments", "/treatments"],
  ["Doctors", "/doctors"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const { menuOpen, setMenuOpen } = useUi();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={reduce ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        solid || menuOpen
          ? "bg-wall/95 shadow-header backdrop-blur-md"
          : "bg-wall/80 backdrop-blur-md"
      }`}
    >
      <ScrollProgress />
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-1 px-3 sm:h-[4.5rem] sm:gap-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <Mark />
          <span className="leading-none">
            <span className="block text-[13px] font-semibold tracking-[0.18em] text-ink">
              DENTWELL
            </span>
            <span className="mt-1 block text-[10px] tracking-wide text-[#5c534c]">
              Dr. Shemina
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              data-cursor="hover"
              className="text-sm text-[#3f3832] transition hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={whatsappHref("Hello DENTWELL, I would like to ask about an appointment.")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:bg-ink/5"
            aria-label="WhatsApp the clinic"
            data-cursor="hover"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Magnetic strength={0.2}>
            <Link
              href="/book"
              data-cursor="hover"
              className="btn-press inline-flex h-10 items-center rounded-full bg-gold px-2.5 text-sm font-medium text-ink shadow-glow hover:bg-[#d4b36a] sm:px-4"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book appointment</span>
            </Link>
          </Magnetic>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-wall lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-2xl px-3 py-3 text-base text-ink hover:bg-ink/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-gold text-sm font-medium text-ink"
              >
                Book appointment
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export function headerOffset() {
  return clinic.short;
}
