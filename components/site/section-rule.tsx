"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { getGsap } from "@/lib/gsap";

export function SectionRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const { gsap } = getGsap();
    const line = node.querySelector("[data-rule]");
    if (!line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        },
      );
    }, node);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className={`mx-auto max-w-page px-4 sm:px-6 ${className ?? ""}`} aria-hidden>
      <div data-rule className="h-px origin-left bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
