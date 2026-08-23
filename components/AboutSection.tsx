"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";
import { CountUp } from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

const competencies = [
  "Strategic Communications",
  "Data Storytelling",
  "Digital Campaigns",
  "Research Knowledge Translation",
  "Creative Direction",
  "Cross-Border Collaboration",
];

const stats = [
  { end: 74, suffix: "K+", label: "Multi-Platform Reach", sublabel: "Across National Campaigns" },
  { end: 10, suffix: "+", label: "Cross-Institutional Projects", sublabel: "Canada, US & UK" },
  { end: 300, suffix: "+", label: "Creative Event Attendees", sublabel: "Showcase & Alumni Nights" },
];

export function AboutSection() {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLImageElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const ctx = gsap.context(() => {
      // 1. Continuous rotation for decorative ring behind portrait
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: 360,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }

      // 2. Scroll-triggered reveal for Portrait
      if (portraitRef.current && sectionRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.94, y: 30, rotate: 3 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: -2,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Scroll-triggered reveal for Content Column
      if (contentRef.current && sectionRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Scroll-triggered reveal for Stats
      if (statsRef.current && sectionRef.current) {
        const statCards = statsRef.current.querySelectorAll(".home-about__stat-card");
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5. Trigger ScrollTrigger.refresh() to ensure DOM offsets update cleanly
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="home-about section relative py-20 md:py-32 px-6 md:px-12 bg-white border-y border-slate-100 overflow-hidden"
      aria-label="About Shanesia Saha"
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,rgba(30,58,95,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="max-w-[1380px] mx-auto relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="w-2 h-2 rounded-full bg-[#1E3A5F]" aria-hidden="true" />
          <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-slate-500">
            About · Background &amp; Philosophy
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Portrait & Visual Identity */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Rotating Concentric Accent Ring */}
              <img
                ref={ringRef}
                src="/assets/asset 16.svg"
                alt=""
                className="absolute -top-10 -left-10 w-[125%] h-[125%] object-contain opacity-35 pointer-events-none -z-10 select-none will-change-transform"
                aria-hidden="true"
              />

              {/* Decorative Starburst Stamp */}
              <div
                className="absolute -top-4 -right-4 w-12 h-12 md:w-14 md:h-14 z-20 pointer-events-none select-none drop-shadow-md"
                aria-hidden="true"
              >
                <img
                  src="/assets/shape-star1.webp"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Tilted Portrait Frame */}
              <div
                ref={portraitRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 will-change-transform transition-transform duration-500 hover:rotate-0"
              >
                <img
                  src="/assets/headshots/shanesia-portrait.jpg"
                  alt="Shanesia Saha portrait"
                  className="w-full aspect-[4/5] object-cover object-center"
                  loading="lazy"
                />

                {/* Subtle bottom gradient label */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E3A5F]/90 via-[#1E3A5F]/50 to-transparent flex items-center justify-between text-white">
                  <div>
                    <span className="font-serif text-lg font-normal block leading-tight">
                      {siteConfig.person.fullName}
                    </span>
                    <span className="font-mono text-[11px] tracking-wider uppercase opacity-80">
                      {siteConfig.location}
                    </span>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    Open to Roles
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Narrative & Value Proposition */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#142A4A] leading-[1.15] tracking-tight">
              Connecting data, research, and community through human-centred storytelling.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              I am a digital communications strategist and creative director based in Toronto. With a multidisciplinary background bridging arts research, national policy initiatives, and creative event production, I translate complex qualitative and quantitative insights into compelling visual narratives that drive engagement.
            </p>

            <p className="text-sm sm:text-base text-slate-500 font-sans leading-relaxed">
              Having coordinated multi-platform campaigns at <strong>Mass Culture Canada</strong>, digital knowledge platforms for <strong>Parks Canada / Bridging Divides</strong>, and creative direction for <strong>CICU</strong>, I thrive at the intersection of analytical rigour and visual design.
            </p>

            {/* Competency Pill Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {competencies.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/60 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Credibility Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 mt-2"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="home-about__stat-card p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1E3A5F]">
                    {isMounted ? (
                      <CountUp end={stat.end} suffix={stat.suffix} duration={1.8} />
                    ) : (
                      `${stat.end}${stat.suffix}`
                    )}
                  </span>
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-700 mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[11px] font-sans text-slate-500 mt-0.5">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#work"
                className="px-6 py-3 rounded-full bg-[#1E3A5F] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#142A4A] transition-colors shadow-md flex items-center gap-2"
              >
                <span>Selected Work</span>
                <span aria-hidden="true">↓</span>
              </a>

              <Link
                href="/about"
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-800 text-xs font-mono tracking-widest uppercase hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <span>Full Career Story</span>
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="/assets/Shanesia_Saha_Resume_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono tracking-wider uppercase text-slate-500 hover:text-[#1E3A5F] underline underline-offset-4 transition-colors ml-auto"
              >
                Resume (PDF) ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
