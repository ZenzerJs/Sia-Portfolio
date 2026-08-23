"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  accent: string;
}

const capabilities: Capability[] = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 13v-2z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
    title: "COMMUNICATIONS",
    tagline: "Strategy & Sector Messaging",
    description: "Translating dense research and quantitative data into clear, audience-first narratives.",
    accent: "from-[#A8CBE8]/30",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    ),
    title: "DIGITAL CONTENT",
    tagline: "Social, Web & Multimedia",
    description: "Leading multi-platform content curation, digital accessibility audits, and LMS platform launches.",
    accent: "from-[#C3C6E8]/30",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
    title: "MARKETING",
    tagline: "Campaigns & Brand Storytelling",
    description: "Driving audience growth via segmented newsletters, KPI analytics, and live event promotions.",
    accent: "from-[#EFAF8C]/30",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "PROJECT COORDINATION",
    tagline: "Stakeholders & Partnerships",
    description: "Leading cross-institutional initiatives across higher ed, public sector, and international teams.",
    accent: "from-[#8FB6D8]/30",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1E3A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "CREATIVE STRATEGY",
    tagline: "Visual Media & Motion Design",
    description: "Directing 35mm film documentation, presentation design, and brand pitch architecture.",
    accent: "from-[#D4C3E8]/30",
  },
];

export function WhatIDoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".capability-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="what-i-do relative py-20 md:py-28 px-6 md:px-12 max-w-[1380px] mx-auto overflow-hidden"
      aria-label="Capabilities and Areas of Practice"
    >
      {/* Subtle Floating Ambient Shapes */}
      <img
        src="/assets/shape-star1.webp"
        alt=""
        className="absolute top-8 right-6 w-14 h-14 md:w-20 md:h-20 opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <img
        src="/assets/shape-circle2.webp"
        alt=""
        className="absolute -bottom-10 left-6 w-24 h-24 md:w-32 md:h-32 opacity-25 pointer-events-none"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-500 font-semibold">
            What I do
          </span>
          <div className="h-[1px] w-12 bg-slate-300" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] font-normal leading-[1.18] tracking-tight">
          A creative approach to communication and connection.
        </h2>
      </div>

      {/* 5-Column Personalized Practice Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10"
      >
        {capabilities.map((item, idx) => (
          <div
            key={idx}
            className={`capability-card group relative p-6 rounded-2xl bg-gradient-to-b ${item.accent} via-white to-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-mono text-xs font-bold tracking-wider text-[#1E3A5F] mb-1.5 uppercase leading-tight">
                {item.title}
              </h3>
              <p className="text-xs font-serif italic text-slate-500 mb-3 leading-snug">
                {item.tagline}
              </p>
              <p className="text-xs text-slate-600 font-sans leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatIDoSection;
