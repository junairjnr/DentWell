"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function AutoVideo({
  src,
  label,
  className,
  poster,
}: {
  src: string;
  label: string;
  className?: string;
  poster?: string;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (reduce) {
      video.pause();
      return;
    }
    void video.play().catch(() => undefined);
  }, [reduce]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduce}
      preload="auto"
      aria-label={label}
    />
  );
}
