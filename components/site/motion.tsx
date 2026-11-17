"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import { getGsap, killTriggers } from "@/lib/gsap";

const settle = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "-12% 0px" } as const;

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
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
      whileHover={lift && !reduce ? { y: -8, transition: { duration: 0.3, delay: 0, ease: settle } } : undefined}
      viewport={viewport}
      variants={{
        hidden: { opacity: 0, y, filter: reduce ? "none" : "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: reduce ? 0 : 0.75, delay: reduce ? 0 : delay, ease: settle },
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
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["10%", "-10%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-0" style={{ y, scale: reduce ? 1 : 1.16 }}>
        {children}
      </motion.div>
    </div>
  );
}

export function SplitWords({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08 + index * 0.06, ease: settle }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const { gsap } = getGsap();
    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(node, { x: x * strength, y: y * strength, duration: 0.35, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    };
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, strength]);

  return (
    <div ref={ref} className={`magnetic-hit will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function CustomCursor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const move = (event: MouseEvent) => {
      gsap.to(el, { x: event.clientX, y: event.clientY, duration: 0.18, ease: "power3.out" });
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const hit = target?.closest("a,button,[data-cursor='hover']");
      el.classList.toggle("is-hover", Boolean(hit));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduce]);

  if (reduce) return null;
  return <div ref={ref} className="custom-cursor motion-safe-only hidden lg:block" aria-hidden />;
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export function GsapScope({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return () => {
      if (ref.current) killTriggers(ref.current);
    };
  }, []);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
