// components/HeroShowreelGSAP.tsx
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroShowreelGSAP() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 0.8,
          pin: true,
        },
      });

      tl.to(headlineRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.4,
      })
      .fromTo(
        mockupRef.current,
        { scale: 1.12, borderRadius: '0px' },
        { scale: 0.92, borderRadius: '24px', duration: 1, ease: 'power2.out' },
        0
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      data-cursor="work"
      aria-label="Selected Work Showreel"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 px-4"
    >
      <div ref={headlineRef} className="text-center mb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">Selected Work</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mt-1">Showreel</h2>
      </div>

      <div
        ref={mockupRef}
        className="relative w-full max-w-4xl aspect-[16/10] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3 bg-neutral-950"
      >
        <div className="relative w-full h-full overflow-hidden rounded-lg bg-black">
          <video
            src="/assets/cicu/showcase/showcase-reel.mp4"
            poster="/assets/cicu/showcase/showcase-slide-1.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-neutral-700 rounded-full" />
      </div>
    </section>
  );
}

export default HeroShowreelGSAP;
