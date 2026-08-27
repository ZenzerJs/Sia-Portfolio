// components/SocialCampaignViewer.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_POSTS, type SocialPost, type Platform } from '@/data/socialPosts';

export function SocialCampaignViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePlatformFilter, setActivePlatformFilter] = useState<Platform | 'all'>('all');

  const filteredPosts = SOCIAL_POSTS.filter((post) => {
    if (activePlatformFilter === 'all') return true;
    return post.platform === activePlatformFilter;
  });

  const activePost: SocialPost = SOCIAL_POSTS[currentIndex] || SOCIAL_POSTS[0];

  const paginate = useCallback((direction: number) => {
    setCurrentIndex((prev) => (prev + direction + SOCIAL_POSTS.length) % SOCIAL_POSTS.length);
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      
      {/* Top Filter Rail & Stepper Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-200/80">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActivePlatformFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activePlatformFilter === 'all'
                ? 'bg-[#1E3A5F] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Campaigns ({SOCIAL_POSTS.length})
          </button>

          <button
            type="button"
            onClick={() => setActivePlatformFilter('linkedin')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activePlatformFilter === 'linkedin'
                ? 'bg-[#0077B5] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            Mass Culture · LinkedIn (10)
          </button>

          <button
            type="button"
            onClick={() => setActivePlatformFilter('instagram')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activePlatformFilter === 'instagram'
                ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            CICU · Instagram (3)
          </button>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-xs font-mono text-slate-500 font-medium" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Post </span>
            {String(currentIndex + 1).padStart(2, '0')} / {String(SOCIAL_POSTS.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous campaign post"
            className="p-2.5 rounded-full bg-white border border-slate-200 hover:border-[#1E3A5F] hover:bg-slate-50 text-[#1E3A5F] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E3A5F] shadow-xs active:scale-95"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next campaign post"
            className="p-2.5 rounded-full bg-white border border-slate-200 hover:border-[#1E3A5F] hover:bg-slate-50 text-[#1E3A5F] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E3A5F] shadow-xs active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Full-Screen Display Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden transition-shadow hover:shadow-lg">
        
        {/* Post Metadata Header Strip */}
        <div className="p-5 sm:p-7 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
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
              <span className="text-slate-300">·</span>
              <span className="text-[11px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {activePost.topicTag}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif text-[#1E3A5F] font-normal leading-snug">
              {activePost.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={activePost.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3A5F] hover:bg-[#152842] text-white text-xs font-mono tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              <span>View on {activePost.platform === 'linkedin' ? 'LinkedIn' : 'Instagram'}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Full Viewport Embed Frame */}
        <div className="p-4 sm:p-8 bg-[#FBF9F5]/60 flex flex-col items-center justify-center min-h-[580px] sm:min-h-[660px]">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-2 sm:p-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePost.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full flex justify-center"
              >
                <iframe
                  src={activePost.embedUrl}
                  title={activePost.title}
                  className="w-full border-0 rounded-xl min-h-[500px] sm:min-h-[560px]"
                  style={{ height: `${Math.min(activePost.aspectRatioHeight || 600, 680)}px` }}
                  loading="lazy"
                  allowFullScreen
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Keyboard Hints & Footer Indicator */}
        <div className="py-3 px-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">←</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">→</span>
            <span>Use Left &amp; Right Arrow Keys to Navigate</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span>Post {currentIndex + 1} of {SOCIAL_POSTS.length}</span>
          </div>
        </div>
      </div>

      {/* Directory Strip: Quick Direct Jump */}
      <div className="mt-8">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3">
          All Posts ({filteredPosts.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPosts.map((post) => {
            const actualIndex = SOCIAL_POSTS.findIndex((p) => p.id === post.id);
            const isSelected = actualIndex === currentIndex;

            return (
              <button
                key={post.id}
                type="button"
                onClick={() => setCurrentIndex(actualIndex)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1E3A5F] ring-2 ring-[#1E3A5F]/15 shadow-sm'
                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#1E3A5F]">
                    {String(actualIndex + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      post.platform === 'linkedin'
                        ? 'bg-[#0077B5]/10 text-[#0077B5]'
                        : 'bg-pink-50 text-pink-700'
                    }`}
                  >
                    {post.platform}
                  </span>
                </div>

                <p className="text-xs text-slate-800 font-medium line-clamp-2 leading-snug">
                  {post.title}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                  <span className="truncate">{post.topicTag}</span>
                  <span className="opacity-75">{post.organization.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SocialCampaignViewer;
