"use client";

import React, { useEffect, useRef, type CSSProperties } from "react";
import { initBeforeAfter } from "@/lib/beforeAfter";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}

/**
 * Scroll-scrubbed before/after comparator (see lib/beforeAfter.ts).
 * The divider follows the scrollbar; reduced-motion shows a static split.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cleanup = initBeforeAfter(el);
    return cleanup;
  }, []);

  return (
    <section className="case-study-compare" aria-label="Before and after comparison">
      <div className="case-study-compare__grid">
        <div
          ref={ref}
          className="before-after"
          style={{ "--reveal": "50%" } as CSSProperties}
        >
          <div
            className="before-after__layer before-after__after"
            style={{ background: after }}
          />
          <div
            className="before-after__layer before-after__before"
            style={{
              background: before,
              clipPath: "inset(0 calc(100% - var(--reveal)) 0 0)",
            }}
          />
          <div className="before-after__divider" aria-hidden="true" />
          <span className="before-after__label before-after__label--before">
            {beforeLabel}
          </span>
          <span className="before-after__label before-after__label--after">
            {afterLabel}
          </span>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSlider;