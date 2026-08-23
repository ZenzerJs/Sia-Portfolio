"use client";

import React, { useState, useEffect, useCallback } from "react";

interface DeckViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slides: string[];
  pdfUrl?: string;
  tagline?: string;
}

export function DeckViewerModal({
  isOpen,
  onClose,
  title,
  slides,
  pdfUrl,
  tagline,
}: DeckViewerModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, nextSlide, prevSlide]);

  if (!isOpen || slides.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 bg-[#142A4A]/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-white/20 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50/50">
          <div>
            {tagline && (
              <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] block">
                {tagline}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-serif text-[var(--text-dark)] leading-tight">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
              aria-label="Close presentation viewer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Slide Viewer */}
        <div className="relative flex-1 bg-[#142A4A] flex items-center justify-center p-4 min-h-[300px] md:min-h-[460px] select-none">
          <img
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1} of ${slides.length}`}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
          />

          {/* Prev/Next Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Slide Indicator Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex items-center gap-2 p-3 overflow-x-auto bg-gray-50 border-t border-gray-100 scrollbar-thin">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentSlide ? "border-[var(--text-dark)] scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={s} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeckViewerModal;
