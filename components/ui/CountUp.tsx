"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  separator?: string;
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  separator = ",",
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const startTime = performance.now();
            const totalMs = duration * 1000;

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / totalMs, 1);
              // Ease-out expo
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = start + (end - start) * easeProgress;

              setValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setValue(end);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, start, duration]);

  const formatted =
    prefix +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  return (
    <span ref={elementRef} className={`tabular-nums font-mono ${className}`}>
      {formatted}
    </span>
  );
}

export default CountUp;
