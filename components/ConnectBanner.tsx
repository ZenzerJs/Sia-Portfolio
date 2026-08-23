"use client";

import React from "react";
import { siteConfig } from "@/lib/siteConfig";

interface ConnectBannerProps {
  onOpenConnect: () => void;
}

export function ConnectBanner({ onOpenConnect }: ConnectBannerProps) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1380px] mx-auto">
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-r from-[#FCE7F3]/40 via-[#EEF2FF]/60 to-[#E0E7FF]/50 border border-indigo-100/60 shadow-sm">
        {/* Ambient Gradient Blobs */}
        <div
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-gradient-to-br from-pink-300/30 via-purple-300/20 to-transparent blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-gradient-to-tl from-indigo-300/30 via-sky-300/20 to-transparent blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative Floating Starbursts */}
        <img
          src="/assets/shape-astrix.svg"
          alt=""
          className="absolute top-8 left-8 w-8 h-8 md:w-10 md:h-10 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <img
          src="/assets/shape-star1.webp"
          alt=""
          className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 opacity-70 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Title */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1E3A5F] font-normal leading-tight tracking-tight">
              Have a project
              <br className="hidden sm:inline" />
              {" "}in mind?
            </h2>
            <div className="h-[2px] w-14 bg-[#1E3A5F]/20 mt-4 mx-auto md:mx-0" />
          </div>

          {/* Right Action & Links */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <button
              type="button"
              onClick={onOpenConnect}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#1E3A5F] text-white hover:bg-[#142A4A] text-xs font-mono tracking-widest uppercase shadow-lg shadow-[#1E3A5F]/20 transition-all hover:scale-105 active:scale-95"
            >
              <span className="font-semibold">LET&apos;S CONNECT</span>
              <span>→</span>
            </button>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors"
              >
                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{siteConfig.email}</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={siteConfig.socials.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.25 1.62 1.62 0 0 0 0-3.25Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectBanner;
