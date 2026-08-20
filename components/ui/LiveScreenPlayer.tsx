"use client";

import React, { useState, useEffect } from "react";
import { type Project } from "@/lib/projects";

interface LiveScreenPlayerProps {
  project: Project;
  isActive: boolean;
  onOpenDeck?: () => void;
}

export function LiveScreenPlayer({
  project,
  isActive,
  onOpenDeck,
}: LiveScreenPlayerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = project.slides || [];
  const hasSlides = slides.length > 1;

  // Auto-advance slides smoothly every 3.2 seconds when active
  useEffect(() => {
    if (!isActive || !hasSlides) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isActive, hasSlides, slides.length]);

  return (
    /* Native macOS Application Window Frame with Strict Containment */
    <div className="w-full h-full flex flex-col bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-2xl rounded-2xl border border-slate-300/80 dark:border-slate-700/80 shadow-[0_20px_60px_rgba(15,23,42,0.16)] overflow-hidden transition-all duration-500 group">
      {/* macOS Frosted Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] dark:from-[#283548] dark:to-[#1E293B] border-b border-slate-300/70 dark:border-slate-700/60 z-20 flex-shrink-0 select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block"></span>
        </div>

        {/* macOS App Header / File Tag */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/70 dark:bg-black/20 border border-slate-200/80 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-200 shadow-sm">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          </svg>
          <span className="font-medium truncate max-w-[180px] sm:max-w-[300px]">
            {project.name} — Preview.app
          </span>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2">
          {hasSlides && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-mint)] animate-pulse"></span>
              <span>
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>
          )}
          {project.media.type === "video" && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-coral)] animate-ping"></span>
              <span>HD Video</span>
            </div>
          )}
        </div>
      </div>

      {/* macOS Window Canvas with Equal Inset Margins on All 4 Sides */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-5 sm:p-7 md:p-9 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#0F172A] dark:via-[#0B1220] dark:to-[#070D18]">
        {/* If Project has Slides */}
        {hasSlides ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Ambient Blurred Background Glow */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-110 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url(${slides[currentSlideIndex]})` }}
            />

            {/* Inset Slide Frame with Guaranteed Equal Margins on All Sides */}
            <div className="relative z-10 w-full h-full max-h-[82%] max-w-[88%] flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-slate-200/90 dark:border-white/15 bg-white">
              <img
                src={slides[currentSlideIndex]}
                alt={`${project.name} Slide ${currentSlideIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-500 will-change-transform"
              />
            </div>

            {/* Manual Slide Controls on Hover */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/85 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                }}
                className="text-white/80 hover:text-white text-xs px-2 py-0.5"
                aria-label="Previous slide"
              >
                ◀
              </button>
              <span className="text-[10px] font-mono text-white/90">
                {currentSlideIndex + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
                }}
                className="text-white/80 hover:text-white text-xs px-2 py-0.5"
                aria-label="Next slide"
              >
                ▶
              </button>
              {onOpenDeck && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDeck();
                  }}
                  className="ml-2 text-[10px] font-mono uppercase bg-white/20 hover:bg-white/40 text-white px-2 py-0.5 rounded"
                >
                  Expand ↗
                </button>
              )}
            </div>
          </div>
        ) : project.media.type === "video" ? (
          /* Video Showcase with Inset Bounds */
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative z-10 w-full h-full max-h-[82%] max-w-[88%] flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-slate-200/90 dark:border-white/15 bg-black">
              <video
                src={project.media.src}
                muted
                playsInline
                loop
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : project.media.src ? (
          /* Single Image / Poster Showcase with Inset Bounds */
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${project.media.src})` }}
            />
            <div className="relative z-10 w-full h-full max-h-[82%] max-w-[88%] flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-slate-200/90 dark:border-white/15 bg-white">
              <img
                src={project.media.src}
                alt={project.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : (
          /* Gradient Placeholder */
          <div
            className="w-full h-full flex items-center justify-center font-serif text-slate-800 dark:text-white/90 text-2xl"
            style={{ background: project.media.gradient }}
          >
            {project.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveScreenPlayer;
