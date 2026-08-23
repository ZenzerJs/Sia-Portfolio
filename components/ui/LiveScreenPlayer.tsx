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
    /* Native macOS Application Window Frame with macOS Light Mode Aesthetic */
    <div className="w-full h-full flex flex-col bg-[#F5F5F7] rounded-2xl border border-[#D1D1D6] shadow-[0_20px_60px_rgba(15,23,42,0.14)] overflow-hidden transition-all duration-500 group">
      {/* macOS Light Mode Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#E8E8EC] border-b border-[#D1D1D6] z-20 flex-shrink-0 select-none">
        {/* macOS Traffic Lights with Authentic Stroke Borders */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block"></span>
        </div>

        {/* macOS App Header / File Tag */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/80 border border-[#D1D1D6] text-[11px] font-mono text-[#1D1D1F] shadow-sm">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          </svg>
          <span className="font-medium truncate max-w-[180px] sm:max-w-[320px]">
            {project.name} — Preview.app
          </span>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2">
          {hasSlides && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-[#D1D1D6] text-[#1D1D1F] text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>
          )}
          {project.media.type === "video" && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-[#D1D1D6] text-[#1D1D1F] text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-ping"></span>
              <span>HD Video</span>
            </div>
          )}
        </div>
      </div>

      {/* macOS Window Canvas (Expanded Scale & Maximized Visibility) */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-4 bg-[#F5F5F7]">
        {/* If Project has Slides */}
        {hasSlides ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Ambient Blurred Background Glow */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-105 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url(${slides[currentSlideIndex]})` }}
            />

            {/* Inset Slide Frame Maximizing Canvas Area */}
            <div className="relative z-10 w-full h-full max-h-[94%] max-w-[96%] flex items-center justify-center rounded-lg overflow-hidden shadow-md border border-[#D1D1D6] bg-white">
              <img
                src={slides[currentSlideIndex]}
                alt={`${project.name} Slide ${currentSlideIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-500 will-change-transform"
              />
            </div>

            {/* Manual Slide Controls on Hover */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#1D1D1F] border border-slate-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                }}
                className="text-slate-600 hover:text-slate-900 text-xs px-2 py-0.5 transition-colors"
                aria-label="Previous slide"
              >
                ◀
              </button>
              <span className="text-[11px] font-mono font-medium text-slate-800">
                {currentSlideIndex + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
                }}
                className="text-slate-600 hover:text-slate-900 text-xs px-2 py-0.5 transition-colors"
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
                  className="ml-2 text-[10px] font-mono uppercase bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]/90 px-2.5 py-0.5 rounded shadow-sm transition-colors"
                >
                  Expand ↗
                </button>
              )}
            </div>
          </div>
        ) : project.media.type === "video" ? (
          /* Video Showcase with Inset Bounds */
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative z-10 w-full h-full max-h-[94%] max-w-[96%] flex items-center justify-center rounded-lg overflow-hidden shadow-md border border-[#D1D1D6] bg-black">
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
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-105 pointer-events-none"
              style={{ backgroundImage: `url(${project.media.src})` }}
            />
            <div className="relative z-10 w-full h-full max-h-[94%] max-w-[96%] flex items-center justify-center rounded-lg overflow-hidden shadow-md border border-[#D1D1D6] bg-white">
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
            className="w-full h-full flex items-center justify-center font-serif text-slate-800 text-2xl"
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
