"use client";

import React, { useState, useEffect } from "react";

interface FeatureDialogProps {
  label: string;
  title: string;
  description: string;
  tileImage: string;
  stats?: Array<{ num: string; label: string }>;
  listItems?: string[];
  deckPdf?: string;
  onOpenDeck?: () => void;
  actionLabel?: string;
  className?: string;
}

export function FeatureDialog({
  label,
  title,
  description,
  tileImage,
  stats,
  listItems,
  deckPdf,
  onOpenDeck,
  actionLabel = "Explore Presentation",
  className = "",
}: FeatureDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      {/* Preview Card Tile */}
      <div
        className={`group relative rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 ${className}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)] bg-slate-100 px-3 py-1 rounded-full">
              {label}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[var(--text-dark)] group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <h4 className="text-xl md:text-2xl font-serif text-[var(--text-dark)] mb-2 group-hover:text-[var(--accent-mint)] transition-colors">
            {title}
          </h4>
          <p className="text-xs md:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-6 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
          <img
            src={tileImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Expanded Modal Sheet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 bg-[#142A4A]/80 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 animate-scaleUp">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-slate-50">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] block">
                  {label}
                </span>
                <h3 className="text-2xl font-serif text-[var(--text-dark)]">{title}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-200/70 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Close dialog"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <img src={tileImage} alt={title} className="w-full h-full object-cover" />
              </div>

              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{description}</p>

              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {stats.map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-xl md:text-2xl font-mono font-semibold text-[var(--text-dark)]">
                        {s.num}
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {listItems && listItems.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">
                    Key Highlights
                  </h5>
                  <ul className="space-y-2">
                    {listItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
                        <span className="text-[var(--accent-mint)] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                {onOpenDeck && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenDeck();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[var(--text-dark)] text-white text-xs font-mono tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    {actionLabel}
                  </button>
                )}
                {deckPdf && (
                  <a
                    href={deckPdf}
                    download
                    className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-mono tracking-wider uppercase hover:bg-gray-50 transition-colors"
                  >
                    Download Slide Deck
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeatureDialog;
