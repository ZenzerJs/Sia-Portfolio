// components/SocialCampaignViewer.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SOCIAL_POSTS, type SocialPost } from '@/data/socialPosts';

export function SocialCampaignViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const activePost: SocialPost = SOCIAL_POSTS[currentIndex];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + SOCIAL_POSTS.length) % SOCIAL_POSTS.length);
  }, []);

  // Keyboard navigation: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const verticalScrollVariants = {
    enter: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? 140 : -140,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? -140 : 140,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: {
        y: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    }),
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4">
      
      {/* Clean Header Controls: Title & Direct Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                activePost.platform === 'linkedin'
                  ? 'bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20'
                  : 'bg-pink-50 text-pink-700 border border-pink-200'
              }`}
            >
              {activePost.platform}
            </span>
            <span className="text-xs font-mono text-slate-500 font-medium">
              {activePost.organization}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#1E3A5F] font-normal tracking-tight">
            {activePost.title}
          </h2>
        </div>

        {/* Stepper Navigation */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-slate-500 font-medium tracking-wider" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Post </span>
            {String(currentIndex + 1).padStart(2, '0')} / {String(SOCIAL_POSTS.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous campaign post"
            className="p-2.5 rounded-full bg-white border border-slate-200 hover:border-[#1E3A5F] hover:bg-slate-50 text-[#1E3A5F] transition-all cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next campaign post"
            className="p-2.5 rounded-full bg-white border border-slate-200 hover:border-[#1E3A5F] hover:bg-slate-50 text-[#1E3A5F] transition-all cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
          >
            →
          </button>

          <a
            href={activePost.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#1E3A5F] hover:bg-[#152842] text-white text-xs font-mono tracking-wider transition-all shadow-xs ml-1"
          >
            <span>Open Post</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Main Full-Screen Frame with Spring Slide Swap Animation */}
      <div className="relative w-full rounded-3xl bg-white border border-slate-200/90 shadow-md p-4 sm:p-8 min-h-[580px] sm:min-h-[680px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activePost.id}
            custom={direction}
            variants={verticalScrollVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex justify-center items-center"
          >
            <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
              <iframe
                src={activePost.embedUrl}
                title={activePost.title}
                className="w-full border-0 rounded-2xl min-h-[520px] sm:min-h-[580px]"
                style={{ height: `${Math.min(activePost.aspectRatioHeight || 600, 680)}px` }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Clean Bottom Indicator */}
      <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 px-2">
        <span className="hidden sm:inline">Use Arrow keys ← → to browse</span>
        <span className="ml-auto">{activePost.topicTag}</span>
      </div>

    </div>
  );
}

export default SocialCampaignViewer;
