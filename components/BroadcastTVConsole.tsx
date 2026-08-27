// components/BroadcastTVConsole.tsx
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SOCIAL_POSTS, type SocialPost, type Platform } from '@/data/socialPosts';

export function BroadcastTVConsole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPowered, setIsPowered] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all');

  const activePost: SocialPost = SOCIAL_POSTS[currentIndex];

  const { contextSafe } = useGSAP({ scope: containerRef });

  // 1. Authentic CRT Power Down / Up Timeline
  const togglePower = contextSafe(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const tl = gsap.timeline();

    if (isPowered) {
      // CRT Power Down: compress vertically, snap horizontally, fade out
      tl.to(screen, {
        scaleY: 0.005,
        filter: 'brightness(3) contrast(2)',
        duration: 0.18,
        ease: 'power4.inOut',
      })
      .to(screen, {
        scaleX: 0,
        filter: 'brightness(5)',
        duration: 0.14,
        ease: 'power3.in',
      })
      .set(screen, {
        opacity: 0,
        onComplete: () => setIsPowered(false),
      });
    } else {
      // CRT Power Up: horizontal slit expands, vertical elastic pop
      setIsPowered(true);
      tl.set(screen, { opacity: 1, scaleX: 0.005, scaleY: 0.005, filter: 'brightness(4)' })
        .to(screen, {
          scaleX: 1,
          duration: 0.15,
          ease: 'power3.out',
        })
        .to(screen, {
          scaleY: 1,
          filter: 'brightness(1) contrast(1)',
          duration: 0.24,
          ease: 'elastic.out(1, 0.5)',
        });
    }
  });

  // 2. Rotary Dial Click & Screen Static Flicker
  const switchChannel = contextSafe((nextIdx: number, direction: 'next' | 'prev' = 'next') => {
    if (!isPowered) {
      // Auto-power on when changing channel if off
      togglePower();
    }

    const targetIdx = (nextIdx + SOCIAL_POSTS.length) % SOCIAL_POSTS.length;
    setCurrentIndex(targetIdx);

    // Tactile rotary knob spin with mechanical overshoot
    if (dialRef.current) {
      const rot = direction === 'next' ? '+=45' : '-=45';
      gsap.to(dialRef.current, {
        rotation: rot,
        duration: 0.3,
        ease: 'back.out(2)',
      });
    }

    // Screen static color / brightness flicker
    if (screenRef.current) {
      gsap.fromTo(
        screenRef.current,
        { filter: 'hue-rotate(90deg) brightness(1.9) contrast(1.5)' },
        { filter: 'hue-rotate(0deg) brightness(1) contrast(1)', duration: 0.28, ease: 'power2.out' }
      );
    }
  });

  const nextChannel = useCallback(() => switchChannel(currentIndex + 1, 'next'), [currentIndex, switchChannel]);
  const prevChannel = useCallback(() => switchChannel(currentIndex - 1, 'prev'), [currentIndex, switchChannel]);

  // Keyboard navigation: ArrowUp/Right for next, ArrowDown/Left for prev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextChannel();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        prevChannel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextChannel, prevChannel]);

  const filteredPosts = SOCIAL_POSTS.filter((post) => {
    if (filterPlatform === 'all') return true;
    return post.platform === filterPlatform;
  });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4 py-8 select-none">
      {/* Outer Studio Chassis Frame */}
      <div className="relative bg-gradient-to-b from-[#24272c] via-[#1a1c20] to-[#121316] rounded-3xl sm:rounded-[40px] p-4 sm:p-7 md:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-[#33373d]">
        
        {/* Chassis Top Branding & Speaker Grill */}
        <div className="flex items-center justify-between pb-4 mb-3 border-b border-neutral-800/80 px-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600/90 shadow-[0_0_8px_#ef4444]" />
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                REC ON AIR
              </span>
            </div>
            <span className="text-neutral-600 text-xs">|</span>
            <span className="text-xs font-mono tracking-wider text-neutral-300 font-medium">
              BROADCAST MONITOR // SM-2025
            </span>
          </div>

          {/* Speaker Vent Grill Slots */}
          <div className="hidden sm:flex items-center gap-1.5 opacity-60">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-1 rounded-full bg-neutral-900 border-b border-neutral-700/50" />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              NTSC / 60Hz
            </span>
          </div>
        </div>

        {/* Main TV Bezel & Screen Tube Area */}
        <div className="relative bg-neutral-950 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-2 border-neutral-800 shadow-inner">
          
          {/* CRT Screen Display Container */}
          <div
            ref={screenRef}
            className={`relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#050608] rounded-xl overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] transition-colors ${
              !isPowered ? 'bg-black' : ''
            }`}
          >
            {/* OSD (On-Screen Display) Top Bar */}
            <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs sm:text-sm font-bold tracking-wider">
                  CH {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-mono text-emerald-300/80 tracking-wide uppercase hidden sm:inline">
                  [{activePost.platform.toUpperCase()}] {activePost.topicTag}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400/90">
                <span className="hidden sm:inline opacity-75">{activePost.organization}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Embed Tube Frame (Interactive Iframe Area) */}
            {isPowered ? (
              <div className="w-full h-full pt-12 pb-14 px-2 sm:px-4 overflow-y-auto overscroll-contain flex flex-col items-center justify-start">
                <div className="w-full max-w-lg bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 shadow-xl my-auto">
                  <iframe
                    src={activePost.embedUrl}
                    title={activePost.title}
                    className="w-full border-0 rounded-lg min-h-[450px] sm:min-h-[500px]"
                    style={{ height: `${Math.min(activePost.aspectRatioHeight || 600, 620)}px` }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              /* Standby / Powered Off View */
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-black">
                <div className="w-3 h-3 rounded-full bg-neutral-800 mb-3" />
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
                  MONITOR STANDBY // PRESS POWER
                </p>
              </div>
            )}

            {/* OSD Bottom Info Overlay */}
            {isPowered && (
              <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <div className="flex flex-col text-left max-w-[70%]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {activePost.organization} · {activePost.topicTag}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white truncate font-sans">
                    {activePost.title}
                  </span>
                </div>

                <a
                  href={activePost.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono tracking-wider transition-colors border border-white/20 cursor-pointer pointer-events-auto"
                >
                  <span>Open Post</span>
                  <span>↗</span>
                </a>
              </div>
            )}

            {/* CRT Phosphor Scanlines Overlay (STRICTLY pointer-events-none) */}
            <div
              className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-40"
              aria-hidden="true"
            />

            {/* CRT Glass Curvature Glare Overlay (STRICTLY pointer-events-none) */}
            <div
              className="absolute inset-0 z-20 pointer-events-none rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.45)_100%)] mix-blend-overlay"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Console Control Deck (Dials, Buttons, TV Guide) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
          
          {/* Left: Power Toggle + Indicators */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePower}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-md ${
                isPowered
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                  : 'bg-red-950/60 hover:bg-red-900/80 text-red-300 border-red-800'
              }`}
              aria-label={isPowered ? 'Power off monitor' : 'Power on monitor'}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isPowered
                    ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                    : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                }`}
              />
              <span>{isPowered ? 'POWER ON' : 'STANDBY'}</span>
            </button>

            {/* TV Guide Toggle */}
            <button
              type="button"
              onClick={() => setGuideOpen((prev) => !prev)}
              className={`px-3.5 py-2.5 rounded-xl border font-mono text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                guideOpen
                  ? 'bg-emerald-900/60 border-emerald-600 text-emerald-300'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 border-neutral-700 text-neutral-300'
              }`}
            >
              📺 TV GUIDE {guideOpen ? '▲' : '▼'}
            </button>
          </div>

          {/* Center: Keyboard Navigation Hints */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <span className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">←</span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">→</span>
            <span>Use Arrow Keys to Switch Channels</span>
          </div>

          {/* Right: Rotary Tuning Knob & Stepper Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevChannel}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 font-mono text-xs transition-colors cursor-pointer"
              aria-label="Previous channel"
            >
              CH -
            </button>

            {/* Tactile Rotary Channel Dial */}
            <div
              ref={dialRef}
              onClick={nextChannel}
              title="Click dial to advance channel"
              className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 border-2 border-neutral-600 flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-transform"
            >
              {/* Dial Notch Indicator */}
              <div className="w-1 h-3.5 bg-red-500 rounded-full -translate-y-2.5 shadow-[0_0_4px_#ef4444]" />
              {/* Center Cap */}
              <div className="absolute w-4 h-4 rounded-full bg-neutral-950 border border-neutral-700" />
            </div>

            <button
              type="button"
              onClick={nextChannel}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 font-mono text-xs transition-colors cursor-pointer"
              aria-label="Next channel"
            >
              CH +
            </button>
          </div>
        </div>

        {/* Expandable TV Guide Drawer */}
        {guideOpen && (
          <div className="mt-6 pt-5 border-t border-neutral-800 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  Channel Directory ({filteredPosts.length})
                </span>
              </div>

              {/* Platform Filters */}
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setFilterPlatform('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    filterPlatform === 'all'
                      ? 'bg-neutral-200 text-neutral-900 font-semibold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  All (13)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPlatform('linkedin')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    filterPlatform === 'linkedin'
                      ? 'bg-[#0077B5] text-white font-semibold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  LinkedIn (10)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPlatform('instagram')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    filterPlatform === 'instagram'
                      ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Instagram (3)
                </button>
              </div>
            </div>

            {/* Channel List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {filteredPosts.map((post) => {
                const actualIndex = SOCIAL_POSTS.findIndex((p) => p.id === post.id);
                const isCurrent = actualIndex === currentIndex;

                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => {
                      switchChannel(actualIndex, actualIndex > currentIndex ? 'next' : 'prev');
                    }}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-neutral-800 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                        : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">
                        CH {String(actualIndex + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                        post.platform === 'instagram'
                          ? 'bg-pink-950 text-pink-300 border border-pink-800/60'
                          : 'bg-sky-950 text-sky-300 border border-sky-800/60'
                      }`}>
                        {post.platform}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 font-medium line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <span className="text-[10px] font-mono text-neutral-500 truncate block mt-1">
                      {post.topicTag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default BroadcastTVConsole;
