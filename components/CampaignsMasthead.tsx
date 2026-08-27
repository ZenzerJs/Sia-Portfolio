// components/CampaignsMasthead.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function CampaignsMasthead() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Signature Work & About page entrance: blur-to-sharp & upward rise
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { filter: 'blur(25px)', y: 35, opacity: 0 },
          { filter: 'blur(0px)', y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
      }

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, delay: 0.2, ease: 'power2.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 text-center mb-6 sm:mb-8 relative z-10">
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1E3A5F] tracking-tight mb-3 font-normal"
        style={{
          textShadow:
            '0 2px 4px rgba(30, 58, 95, 0.08), 0 8px 24px rgba(30, 58, 95, 0.12)',
        }}
      >
        Social Campaigns &amp; Research Translation
      </h1>

      <p
        ref={descRef}
        className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans"
      >
        Campaign strategy, digital assets, and research translation for{' '}
        <strong className="text-[#1E3A5F] font-medium">Mass Culture Canada</strong> and{' '}
        <strong className="text-[#1E3A5F] font-medium">Creative Industries Course Union (CICU)</strong>.
      </p>
    </section>
  );
}

export default CampaignsMasthead;
