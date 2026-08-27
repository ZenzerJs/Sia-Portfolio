// components/HeroShowreelScroll.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function HeroShowreelScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Top-level hook extractions (satisfies React Rules of Hooks)
  const scaleValue = useTransform(scrollYProgress, [0, 0.8], [1.04, 0.9]);
  const yValue = useTransform(scrollYProgress, [0, 0.8], ['0%', '-4%']);
  const headlineOpacityValue = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const borderRadiusValue = useTransform(scrollYProgress, [0, 0.8], ['0px', '20px']);

  const scale = shouldReduceMotion ? 1 : scaleValue;
  const y = shouldReduceMotion ? '0%' : yValue;
  const headlineOpacity = shouldReduceMotion ? 1 : headlineOpacityValue;
  const borderRadius = shouldReduceMotion ? '12px' : borderRadiusValue;

  return (
    <section ref={containerRef} id="work" aria-label="Selected Work Showreel" className="relative h-[180vh] w-full" data-cursor="work">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        
        {/* Headline */}
        <motion.div 
          style={{ opacity: headlineOpacity }}
          className="text-center mb-6"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Showreel</span>
          <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mt-1">Selected Work</h2>
        </motion.div>

        {/* MacBook Mockup Frame */}
        <motion.div 
          style={{ scale, y }}
          className="relative w-full max-w-4xl aspect-[16/10] bg-neutral-950 rounded-2xl p-2 sm:p-3.5 shadow-2xl border border-neutral-800/80"
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg bg-black">
            <motion.video
              style={{ borderRadius }}
              src="/assets/cicu/showcase/showcase-reel.mp4"
              poster="/assets/cicu/showcase/showcase-slide-1.jpg"
              autoPlay={!shouldReduceMotion}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Laptop Base Indicator */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-neutral-700 rounded-full" />
        </motion.div>

      </div>
    </section>
  );
}

export default HeroShowreelScroll;
