"use client";

import React from "react";

interface Capability {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const capabilities: Capability[] = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 13v-2z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
    title: "COMMUNICATIONS",
    subtitle: "Strategy &\nContent Development",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    ),
    title: "DIGITAL CONTENT",
    subtitle: "Social Media,\nWeb & Multimedia",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
    title: "MARKETING",
    subtitle: "Campaigns &\nBrand Storytelling",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "PROJECT COORDINATION",
    subtitle: "Planning &\nStakeholder Engagement",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "CREATIVE STRATEGY",
    subtitle: "Ideas - Research -\nImpact",
  },
];

export function WhatIDoSection() {
  return (
    <section
      id="process"
      className="what-i-do py-20 md:py-28 px-6 md:px-12 max-w-[1380px] mx-auto border-t border-slate-200/80"
      aria-label="What I do - Areas of Practice"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Headline */}
        <div className="lg:col-span-4 pr-0 lg:pr-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-widest uppercase text-slate-500 font-semibold">
              What I do
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#1E3A5F] font-normal leading-[1.18] tracking-tight">
            A creative approach to communication and connection.
          </h2>
        </div>

        {/* Right 5-Column Clean Hairline Capabilities Strip */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-2 py-4 sm:py-2 group hover:bg-slate-50/60 rounded-xl transition-all duration-300"
            >
              <div className="mb-4 transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-mono text-[11px] font-bold tracking-wider text-[#1E3A5F] mb-2 leading-snug uppercase">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-sans leading-snug whitespace-pre-line">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatIDoSection;
