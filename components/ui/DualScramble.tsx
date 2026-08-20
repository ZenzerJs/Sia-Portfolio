"use client";

import React, { useEffect, useRef, useState } from "react";

interface DualScrambleProps {
  text: string;
  className?: string;
  trigger?: "scroll" | "hover" | "load";
  duration?: number;
  chars?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function DualScramble({
  text,
  className = "",
  trigger = "load",
  duration = 0.8,
  chars = DEFAULT_CHARS,
  as: Component = "span",
}: DualScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  const runScramble = () => {
    if (isScrambling) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    setIsScrambling(true);
    const length = text.length;
    const startTime = performance.now();
    const totalMs = duration * 1000;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      const revealedCount = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          result += text[i];
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    requestAnimationFrame(frame);
  };

  useEffect(() => {
    if (trigger === "load") {
      const timer = setTimeout(runScramble, 100);
      return () => clearTimeout(timer);
    } else if (trigger === "scroll") {
      const el = elementRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              runScramble();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [text, trigger]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      runScramble();
    }
  };

  return (
    <Component
      // @ts-ignore
      ref={elementRef}
      className={`dual-scramble-text inline-block transition-colors ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
}

export default DualScramble;
