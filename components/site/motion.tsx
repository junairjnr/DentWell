"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const settle = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "-10% 0px" } as const;

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 1]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  lift = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  lift?: boolean;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      whileHover={lift && !reduce ? { y: -6, transition: { duration: 0.28, delay: 0, ease: settle } } : undefined}
      viewport={viewport}
      variants={{
        hidden: { opacity: 0, y, filter: reduce ? "none" : "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: settle },
        },
      }}
    >
      {children}
    </Comp>
  );
}

export function DriftFrame({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-0" style={{ y, scale: reduce ? 1 : 1.14 }}>
        {children}
      </motion.div>
    </div>
  );
}
