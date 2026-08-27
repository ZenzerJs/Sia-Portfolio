// components/TestimonialCarousel.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Shanesia possesses an extraordinary talent for translating dense research data and institutional goals into human-centred stories that captivate and convert.',
    author: 'Mass Culture Canada',
    title: 'Project Leadership',
  },
  {
    quote:
      'From conceptualising multi-platform campaigns to coordinating cross-institutional teams, she brings rigorous project management and immense creative spark to every initiative.',
    author: 'Toronto Metropolitan University',
    title: 'Academic Project Director',
  },
  {
    quote:
      'Her campaign strategy for our showcase brought record engagement across all digital channels. She doesn’t just manage communications—she elevates the entire brand.',
    author: 'Creative Industries Course Union (CICU)',
    title: 'Leadership Team',
  },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 60 : -60,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 60 : -60,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full py-20 sm:py-28 px-6 sm:px-10 bg-[var(--bg-light)] relative z-10 border-t border-slate-200/60"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Full-width balanced header */}
        <div className="w-full flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1E3A5F] tracking-tight font-normal"
          >
            Kind words
          </h2>

          {/* Stepper Navigation & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="text-xs font-mono text-slate-500 font-medium tracking-wider"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">Testimonial </span>
              {String(index + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-[#1E3A5F] bg-white text-[#1E3A5F] hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-[#1E3A5F] bg-white text-[#1E3A5F] hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Quote Stage */}
        <div className="relative min-h-[220px] sm:min-h-[190px] w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.figure
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col justify-between"
            >
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-[#1E3A5F] leading-relaxed tracking-tight font-normal">
                “{TESTIMONIALS[index].quote}”
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 text-sm font-sans">
                <div className="w-8 h-[2px] bg-[#1E3A5F]/30" aria-hidden="true" />
                <strong className="text-[#1E3A5F] font-semibold text-base sm:text-lg tracking-tight">
                  {TESTIMONIALS[index].author}
                </strong>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-mono text-xs sm:text-sm">
                  {TESTIMONIALS[index].title}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Interactive Indicator Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === index ? 'w-8 bg-[#1E3A5F]' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
