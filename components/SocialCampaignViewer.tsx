// components/SocialCampaignViewer.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SOCIAL_POSTS, type SocialPost } from '@/data/socialPosts';

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LinkedIn"
    >
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        d="M7.4 9H5V17H7.4V9ZM6.2 5.5C5.4 5.5 4.8 6.1 4.8 6.9C4.8 7.7 5.4 8.3 6.2 8.3C7 8.3 7.6 7.7 7.6 6.9C7.6 6.1 7 5.5 6.2 5.5ZM19 12.3C19 9.8 17.7 8.8 15.9 8.8C14.5 8.8 13.8 9.6 13.5 10.2V9H11.1C11.1 9.7 11.1 17 11.1 17H13.5V12.5C13.5 12.3 13.5 12 13.6 11.8C13.8 11.3 14.3 10.8 15 10.8C16 10.8 16.4 11.6 16.4 12.7V17H18.9L19 12.3Z"
        fill="white"
      />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Instagram"
    >
      <defs>
        <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5.5" fill="url(#igGradient)" />
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
    </svg>
  );
}

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
      y: shouldReduceMotion ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.45, ease: 'easeOut' as const },
        scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
    exit: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: {
        y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.35, ease: 'easeIn' as const },
        scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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
              className="inline-flex items-center justify-center shrink-0 shadow-2xs rounded-md overflow-hidden"
              title={activePost.platform === 'linkedin' ? 'LinkedIn' : 'Instagram'}
            >
              {activePost.platform === 'linkedin' ? (
                <LinkedInIcon className="w-5 h-5 rounded-md" />
              ) : (
                <InstagramIcon className="w-5 h-5 rounded-md" />
              )}
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
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
