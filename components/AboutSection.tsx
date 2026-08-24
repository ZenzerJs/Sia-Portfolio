"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-triggered reveal for Polaroid Collage
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

      // 2. Scroll-triggered reveal for Text Content
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
      className="home-about section relative py-20 md:py-32 px-6 md:px-12 bg-white/60 backdrop-blur-sm border-y border-slate-200/80 overflow-hidden"
      aria-label="About Shanesia Saha"
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,rgba(30,58,95,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="max-w-[1380px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline, Bio & Action Buttons */}
          <div ref={contentRef} className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-[#1E3A5F]/80">
                Communications · Marketing · Digital Media · Project Coordination
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-[#1E3A5F] mb-6">
              Hi, I&apos;m Shanesia!
            </h2>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
              Strategic storytelling, creative content, and digital communication that connects.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-8">
              I work at the intersection of communications, marketing, and digital media building authentic engagement for public sector, higher education, and non-profit organisations through intentional strategy and storytelling. Over the past few years I&apos;ve grown audience engagement through data-driven content strategy, translated complex information into clear, audience-first messaging, and led cross-institutional projects in fast-paced, deadline-driven environments.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="px-8 py-3.5 rounded-full bg-[#1E3A5F] text-white hover:bg-[#142A4A] text-xs font-mono tracking-widest uppercase shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <span>VIEW MY WORK</span>
                <span className="ml-2">→</span>
              </a>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-full bg-white border border-slate-300 text-[#1E3A5F] hover:bg-slate-50 text-xs font-mono tracking-widest uppercase transition-all hover:scale-105 shadow-sm"
              >
                <span>ABOUT ME</span>
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Featured Organizations & Experience Logos */}
            <div className="pt-8 mt-8 border-t border-slate-200/80 w-full">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-4">
                Organizations &amp; Experience
              </span>
              <div className="flex flex-wrap items-center gap-7 sm:gap-10">
                <img
                  src="/assets/logos/mass-culture.png"
                  alt="Mass Culture Canada"
                  className="h-12 sm:h-14 w-auto object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
                />
                <img
                  src="/assets/logos/cicu.png"
                  alt="Creative Industries Course Union"
                  className="h-12 sm:h-14 w-auto object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
                />
                <img
                  src="/assets/logos/tmu.jpg"
                  alt="Toronto Metropolitan University"
                  className="h-11 sm:h-12 w-auto object-contain rounded-sm filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
                />
                <img
                  src="/assets/logos/parks-canada.jpg"
                  alt="Parks Canada"
                  className="h-12 sm:h-14 w-auto object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Layer Polaroid & Washi-Tape Collage */}
          <div ref={visualsRef} className="lg:col-span-6 relative flex justify-center items-center min-h-[460px] sm:min-h-[520px]">
            {/* Ambient Gradient Glows Behind Collage */}
            <div
              className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-br from-pink-200/40 via-purple-200/30 to-transparent blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-gradient-to-tl from-sky-200/40 via-indigo-200/30 to-transparent blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating Shapes */}
            <img
              src="/assets/shape-leaf1.webp"
              alt=""
              className="absolute top-2 right-4 w-12 h-12 sm:w-16 sm:h-16 opacity-60 pointer-events-none z-10"
              aria-hidden="true"
            />
            <img
              src="/assets/shape-star1.webp"
              alt=""
              className="absolute -bottom-4 left-6 w-12 h-12 sm:w-14 sm:h-14 opacity-80 pointer-events-none z-30"
              aria-hidden="true"
            />

            {/* Center Main Portrait with Washi Tape */}
            <div className="relative z-20 w-64 sm:w-76 md:w-80 rounded-2xl bg-white p-2 shadow-2xl transition-transform duration-500 hover:scale-105">
              <div className="washi-tape" />
              <div className="rounded-xl overflow-hidden aspect-[4/5] bg-slate-100">
                <img
                  src="/assets/headshots/shanesia-primary.jpg"
                  alt="Shanesia Saha portrait"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Top-Right Polaroid: London Design Museum (Tilted) */}
            <div className="polaroid-frame absolute -top-4 right-0 sm:right-4 w-36 sm:w-44 rotate-[6deg] z-10 hover:z-30">
              <div className="overflow-hidden aspect-[4/5] bg-slate-100 rounded-sm mb-1.5">
                <img
                  src="/assets/headshots/design-museum-london.jpg"
                  alt="London Design Museum"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom-Right Polaroid: Cafe Lifestyle (Tilted) */}
            <div className="polaroid-frame absolute -bottom-6 right-2 sm:right-8 w-36 sm:w-44 rotate-[-4deg] z-20 hover:z-30">
              <div className="overflow-hidden aspect-[4/5] bg-slate-100 rounded-sm mb-1.5">
                <img
                  src="/assets/headshots/shanesia-cafe-lifestyle.jpg"
                  alt="Shanesia Saha cafe lifestyle"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom-Left Taped Memo Card with Keywords & Starburst */}
            <div className="taped-memo absolute -bottom-4 left-0 sm:left-4 w-44 sm:w-52 p-4 rounded-xl rotate-[-3deg] z-30 shadow-xl hover:rotate-0 transition-transform duration-300">
              <div className="washi-tape !w-16 !-top-2.5" />
              <div className="flex items-end justify-between">
                <div className="space-y-1 font-serif text-base sm:text-lg text-[#1E3A5F] leading-tight">
                  <p className="m-0">Storytelling</p>
                  <p className="m-0">Strategy</p>
                  <p className="m-0">Design</p>
                  <p className="m-0">Connection</p>
                </div>
                <img
                  src="/assets/shape-astrix.svg"
                  alt=""
                  className="w-8 h-8 opacity-80"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
