// components/TestimonialCarousel.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Shanesia possesses an extraordinary talent for translating dense research data and institutional goals into human-centred stories that captivate and convert.',
    author: 'Mass Culture Canada',
    title: 'Project Leadership'
  },
  {
    quote: 'From conceptualising multi-platform campaigns to coordinating cross-institutional teams, she brings rigorous project management and immense creative spark to every initiative.',
    author: 'Toronto Metropolitan University',
    title: 'Academic Project Director'
  },
  {
    quote: 'Her campaign strategy for our showcase brought record engagement across all digital channels. She doesn\'t just manage communications—she elevates the entire brand.',
    author: 'Creative Industries Course Union (CICU)',
    title: 'Leadership Team'
  }
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
      x: shouldReduceMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 24 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 80 : -80,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 24 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="section testimonials py-20 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-serif text-[var(--text-dark)]">
          Kind words
        </h2>
        
        {/* Navigation & Controls */}
        <div className="flex items-center gap-3">
          {/* Single accessible live region */}
          <span className="text-sm font-mono text-neutral-500" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Testimonial </span>
            {index + 1} of {TESTIMONIALS.length}
          </span>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="p-2.5 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="p-2.5 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative min-h-[220px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.figure
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between"
          >
            <blockquote className="text-xl md:text-2xl font-serif text-neutral-800 leading-relaxed">
              “{TESTIMONIALS[index].quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-neutral-600 font-sans">
              <strong className="text-neutral-900 font-medium">{TESTIMONIALS[index].author}</strong> — {TESTIMONIALS[index].title}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
