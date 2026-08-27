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
      y: shouldReduceMotion ? 0 : dir > 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(8px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        y: { type: 'spring', stiffness: 240, damping: 26 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir < 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(8px)',
      transition: {
        y: { type: 'spring', stiffness: 240, damping: 26 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full py-24 sm:py-32 px-6 sm:px-10 bg-[var(--bg-light)] relative z-10 border-t border-slate-200/60"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Centered Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1E3A5F] tracking-tight font-normal"
          >
            Kind words
          </h2>
        </div>

        {/* Center-Aligned Poem / Verse Stage */}
        <div className="relative min-h-[220px] sm:min-h-[190px] w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.figure
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-3xl mx-auto flex flex-col items-center text-center"
            >
              {/* Poem verse format */}
              <blockquote className="text-2xl sm:text-3xl md:text-[34px] font-serif text-[#1E3A5F] leading-[1.6] tracking-tight font-normal text-center max-w-2xl sm:max-w-3xl">
                “{TESTIMONIALS[index].quote}”
              </blockquote>

              {/* Centered Attribution */}
              <figcaption className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-1.5 text-center">
                <div className="w-10 h-[1.5px] bg-[#1E3A5F]/25 mb-1" aria-hidden="true" />
                <strong className="text-[#1E3A5F] font-semibold text-base sm:text-lg tracking-tight">
                  {TESTIMONIALS[index].author}
                </strong>
                <span className="text-slate-500 font-mono text-xs sm:text-sm tracking-wider">
                  {TESTIMONIALS[index].title}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Centered Stepper Controls & Dots */}
        <div className="mt-12 sm:mt-14 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#1E3A5F] bg-white text-[#1E3A5F] hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
            >
              ←
            </button>

            <span
              className="text-xs font-mono text-slate-500 font-medium tracking-widest px-2"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">Testimonial </span>
              {String(index + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#1E3A5F] bg-white text-[#1E3A5F] hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
            >
              →
            </button>
          </div>

          {/* Centered Navigation Indicator Pills */}
          <div className="flex items-center justify-center gap-2">
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
      </div>
    </section>
  );
}

export default TestimonialCarousel;
