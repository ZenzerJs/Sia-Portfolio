"use client";

import React from "react";

interface Capability {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  bgAccent: string;
}

const capabilities: Capability[] = [
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 13v-2z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
    title: "COMMUNICATIONS",
    subtitle: "Strategy &\nContent Development",
    accentColor: "text-[#185ABD]",
    bgAccent: "group-hover:bg-[#185ABD]/10 group-hover:text-[#185ABD]",
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    ),
    title: "DIGITAL CONTENT",
    subtitle: "Social Media,\nWeb & Multimedia",
    accentColor: "text-[#7D2AE8]",
    bgAccent: "group-hover:bg-[#7D2AE8]/10 group-hover:text-[#7D2AE8]",
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
    title: "MARKETING",
    subtitle: "Campaigns &\nBrand Storytelling",
    accentColor: "text-[#E11D48]",
    bgAccent: "group-hover:bg-[#E11D48]/10 group-hover:text-[#E11D48]",
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "PROJECT COORDINATION",
    subtitle: "Planning &\nStakeholder Engagement",
    accentColor: "text-[#059669]",
    bgAccent: "group-hover:bg-[#059669]/10 group-hover:text-[#059669]",
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "CREATIVE STRATEGY",
    subtitle: "Ideas · Research ·\nImpact",
    accentColor: "text-[#D97706]",
    bgAccent: "group-hover:bg-[#D97706]/10 group-hover:text-[#D97706]",
  },
];

export function WhatIDoSection() {
  return (
    <section
      id="process"
      className="what-i-do py-20 md:py-32 px-6 md:px-12 max-w-[1380px] mx-auto border-t border-slate-200/80"
      aria-label="What I do - Areas of Practice"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Headline */}
        <div className="lg:col-span-4 pr-0 lg:pr-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-widest uppercase text-slate-500 font-semibold">
              What I do
            </span>
            <div className="h-[1px] w-12 bg-slate-300" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#1E3A5F] font-normal leading-[1.16] tracking-tight">
            A creative approach to communication and connection.
          </h2>
        </div>

        {/* Right 5-Column Clean Hairline Capabilities Strip with 2x Scaled Icons */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center px-3 py-6 sm:py-4 rounded-2xl transition-all duration-300 hover:bg-slate-50/80 cursor-default"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-5 text-slate-400 bg-slate-100/70 border border-slate-200/60 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-md ${item.bgAccent}`}
              >
                {item.icon}
              </div>
              <h3 className="font-mono text-xs sm:text-[13px] font-bold tracking-wider text-[#1E3A5F] mb-2 leading-snug uppercase transition-colors group-hover:text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-snug whitespace-pre-line group-hover:text-slate-700 transition-colors">
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
