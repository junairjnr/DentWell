"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function killTriggers(scope?: Element | string) {
  if (typeof window === "undefined") return;
  getGsap();
  ScrollTrigger.getAll().forEach((trigger) => {
    if (!scope) {
      trigger.kill();
      return;
    }
    const el = typeof scope === "string" ? document.querySelector(scope) : scope;
    if (el && trigger.trigger && el.contains(trigger.trigger as Node)) {
      trigger.kill();
    }
  });
}

export { gsap, ScrollTrigger };
