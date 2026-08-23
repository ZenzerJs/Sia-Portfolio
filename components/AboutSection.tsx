"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    tag: "Data Narrative & Research",
    title: "Translating Complex Sector Data",
    description: "Transforming dense research and quantitative indicators into clear visual stories and adoption campaigns that reached 74K+ national audiences.",
    accentBg: "bg-[#A8CBE8]/20",
    accentBorder: "border-[#A8CBE8]/40",
    accentText: "text-[#1E3A5F]",
    dotColor: "bg-[#A8CBE8]",
  },
  {
    number: "02",
    tag: "Global Strategy & Innovation",
    title: "High-Stakes Campaign Frameworks",
    description: "Architecting international fan engagement strategies and digital sustainability ecosystems (FIFA World Cup 2026 Global Runner-Up & Mastercard).",
    accentBg: "bg-[#C3C6E8]/20",
    accentBorder: "border-[#C3C6E8]/40",
    accentText: "text-[#1E3A5F]",
    dotColor: "bg-[#C3C6E8]",
  },
  {
    number: "03",
    tag: "Creative Direction & Culture",
    title: "Event Production & Visual Media",
    description: "Leading creative direction, visual branding, analog photography, and multi-channel marketing for 300+ attendee creative industry showcases.",
    accentBg: "bg-[#EFAF8C]/20",
    accentBorder: "border-[#EFAF8C]/40",
    accentText: "text-[#1E3A5F]",
    dotColor: "bg-[#EFAF8C]",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingShape1Ref = useRef<HTMLImageElement>(null);
  const floatingShape2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle ambient floating animation on Marimba gradient shapes
      if (floatingShape1Ref.current) {
        gsap.to(floatingShape1Ref.current, {
          y: -12,
          rotation: 8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (floatingShape2Ref.current) {
        gsap.to(floatingShape2Ref.current, {
          y: 10,
          rotation: -10,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Scroll-triggered reveal for Visual Studio Collage
      if (visualsRef.current && sectionRef.current) {
        gsap.fromTo(
          visualsRef.current,
          { opacity: 0, scale: 0.95, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Scroll-triggered reveal for Content & Pillars
      if (contentRef.current && sectionRef.current) {
        const pillarCards = contentRef.current.querySelectorAll(".teaser-pillar-card");
        gsap.fromTo(
          pillarCards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Ensure ScrollTrigger offsets recalculate cleanly
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
      id="about-teaser"
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
        <div className="flex items-center justify-between gap-4 mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8FB6D8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1E3A5F]" />
            </span>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-slate-500">
              About · Story &amp; Capabilities
            </span>
          </div>

          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#1E3A5F] hover:text-[#142A4A] hover:underline underline-offset-4 transition-colors font-medium"
          >
            <span>About Me</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Collage Layering (Using authentic brand shapes & color assets) */}
          <div ref={visualsRef} className="lg:col-span-5 relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px]">
              {/* Floating Asset 1: Gradient Sphere (Lilac/Sky) */}
              <img
                ref={floatingShape1Ref}
                src="/assets/shape-circle2.webp"
                alt=""
                className="absolute -top-10 -right-6 w-24 h-24 md:w-32 md:h-32 object-contain pointer-events-none z-20 opacity-80 drop-shadow-md"
                aria-hidden="true"
              />

              {/* Floating Asset 2: Golden Starburst */}
              <img
                ref={floatingShape2Ref}
                src="/assets/shape-star1.webp"
                alt=""
                className="absolute -bottom-6 -left-6 w-16 h-16 md:w-20 md:h-20 object-contain pointer-events-none z-30 drop-shadow-lg"
                aria-hidden="true"
              />

              {/* Secondary Overlapping Card: Top-Left Straightened Creative Portrait */}
              <div className="absolute -top-6 -left-6 sm:-left-10 w-28 sm:w-36 rounded-2xl p-1.5 bg-white shadow-xl z-20 border border-slate-200/90 transition-transform duration-300">
                <div className="rounded-xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src="/assets/headshots/shanesia-cafe.jpg"
                    alt="Shanesia Saha creative portrait"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Primary Card: Portrait Frame with Gradient Border */}
              <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-[#A8CBE8] via-[#C3C6E8] to-[#EFAF8C] shadow-2xl z-10">
                <div className="rounded-[22px] overflow-hidden bg-white">
                  <div className="relative">
                    <img
                      src="/assets/headshots/shanesia-portrait.jpg"
                      alt="Shanesia Saha working at desk"
                      className="w-full aspect-[4/5] object-cover object-center"
                      loading="lazy"
                    />

                    {/* Top-Right "Open for Roles" Status Pill */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/80 flex items-center gap-2 z-20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-medium tracking-wider uppercase text-[#1E3A5F]">
                        Open for Roles
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Bottom Meta Bar — Clean Unobscured Name */}
                  <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-serif text-lg sm:text-xl text-[#1E3A5F] block font-medium leading-tight">
                        {siteConfig.person.fullName}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-[#A8CBE8]/20 text-[#1E3A5F] border border-[#A8CBE8]/50 font-medium shrink-0">
                      Strategy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 3 Core Practice Pillars */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#7C8AA0] block mb-2">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#142A4A] leading-[1.15] tracking-tight mb-4">
                Hi, I&apos;m Shanesia
              </h2>
              <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                I work at the intersection of communications, marketing, and digital media building authentic engagement for public sector, higher education, and non-profit organisations through intentional strategy and storytelling. Over the past few years I&apos;ve grown audience engagement through data-driven content strategy, translated complex information into clear, audience-first messaging, and led cross-institutional projects in fast-paced, deadline-driven environments.
              </p>
            </div>

            {/* 3 Core Practice Pillars */}
            <div className="space-y-3 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`teaser-pillar-card p-4 sm:p-5 rounded-2xl ${pillar.accentBg} border ${pillar.accentBorder} transition-all duration-300 hover:translate-x-1 hover:shadow-sm flex items-start gap-4`}
                >
                  <span className="font-mono text-xs font-bold text-[#1E3A5F] mt-0.5 opacity-60">
                    {pillar.number}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${pillar.dotColor}`} />
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-slate-700">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-[#142A4A] font-medium leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-[#1E3A5F] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#142A4A] transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
              >
                <span>About Me</span>
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#work"
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-mono tracking-widest uppercase hover:bg-slate-50 transition-colors flex items-center gap-2 font-medium"
              >
                <span>Selected Work</span>
                <span aria-hidden="true">↓</span>
              </a>

              <a
                href="#campaigns"
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-mono tracking-widest uppercase hover:bg-slate-50 transition-colors flex items-center gap-2 font-medium"
              >
                <span>Case Studies</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
