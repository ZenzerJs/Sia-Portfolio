"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  accent: string;
  gradient: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    tag: "Discovery & Analysis",
    title: "Data & Audience Mapping",
    subtitle: "Understanding who we are speaking to and why it matters.",
    description:
      "Synthesising complex sectoral data, qualitative survey findings, and demographic research to pinpoint authentic audience insight gaps and community priorities.",
    deliverables: ["Audience Personas", "Data Audits", "Stakeholder Interviews", "Competitor Benchmarking"],
    accent: "#1E3A5F",
    gradient: "from-[#A8CBE8]/30 via-white to-white",
  },
  {
    number: "02",
    tag: "Creative Direction",
    title: "Narrative Architecture",
    subtitle: "Turning insights into clear, human-centred messages.",
    description:
      "Crafting multi-platform editorial messaging hierarchies that bridge academic research, policy frameworks, and grassroots creative culture without diluting substance.",
    deliverables: ["Brand Voice Guidelines", "Strategic Positioning", "Campaign Messaging", "Content Frameworks"],
    accent: "#C3C6E8",
    gradient: "from-[#C3C6E8]/30 via-white to-white",
  },
  {
    number: "03",
    tag: "Multi-Platform Rollout",
    title: "Visual & Digital Production",
    subtitle: "High-impact execution across print, video, and social.",
    description:
      "Directing 35mm analog photo documentation, video motion graphics, high-converting social campaigns, executive pitch presentations, and physical merchandise drops.",
    deliverables: ["35mm Event Coverage", "Motion Assets", "Pitch Decks", "Merchandise Design"],
    accent: "#EFAF8C",
    gradient: "from-[#EFAF8C]/30 via-white to-white",
  },
  {
    number: "04",
    tag: "Evaluation & Scale",
    title: "Mobilisation & Growth",
    subtitle: "Measuring resonance and scaling cross-institutional reach.",
    description:
      "Tracking cross-channel engagement KPIs, newsletter open rates, and community sentiment to continuously optimize future storytelling and institutional advocacy.",
    deliverables: ["Performance Analytics", "Post-Campaign Reporting", "Knowledge Hubs", "Community Adoption"],
    accent: "#8FB6D8",
    gradient: "from-[#8FB6D8]/30 via-white to-white",
  },
];

export function StrategicProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLImageElement>(null);
  const shape2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Staggered Process Cards Glide-in
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".process-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Parallax Floating Decorative Shapes
      if (shape1Ref.current && containerRef.current) {
        gsap.to(shape1Ref.current, {
          y: -60,
          rotate: 25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (shape2Ref.current && containerRef.current) {
        gsap.to(shape2Ref.current, {
          y: 50,
          rotate: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 px-6 md:px-12 max-w-[1380px] mx-auto overflow-hidden"
      id="process"
      aria-label="Strategic Process & Methodology"
    >
      {/* Ambient Floating Decorative Elements */}
      <img
        ref={shape1Ref}
        src="/assets/shape-star1.webp"
        alt=""
        className="absolute top-12 -right-8 w-20 h-20 md:w-28 md:h-28 opacity-40 pointer-events-none z-0"
        aria-hidden="true"
      />
      <img
        ref={shape2Ref}
        src="/assets/shape-circle2.webp"
        alt=""
        className="absolute bottom-16 -left-10 w-28 h-28 md:w-36 md:h-36 opacity-30 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-20 relative z-10">
        <span className="text-xs font-mono tracking-widest uppercase text-[#7C8AA0] block mb-3">
          Process · Strategy &amp; Execution
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#1E3A5F] leading-tight mb-4">
          How Ideas Turn Into Impact
        </h2>
        <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed">
          A proven four-stage methodology bridging research, creative direction, and measurable community engagement.
        </p>
      </div>

      {/* 4 Process Cards Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`process-card group relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b ${step.gradient} border border-slate-200/90 shadow-[0_10px_30px_rgba(30,58,95,0.04)] hover:shadow-[0_20px_40px_rgba(30,58,95,0.1)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between`}
          >
            <div>
              {/* Card Header: Step number & Tag */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 bg-white/90 px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                  {step.tag}
                </span>
                <span className="font-mono text-2xl font-medium text-[#1E3A5F]/40 group-hover:text-[#1E3A5F] transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-2xl text-[#1E3A5F] font-normal leading-snug mb-2">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-slate-500 mb-4 leading-relaxed">
                {step.subtitle}
              </p>
              <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            {/* Key Deliverables Pills */}
            <div className="pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Core Deliverables
              </span>
              <div className="flex flex-wrap gap-1.5">
                {step.deliverables.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/80 border border-slate-200 text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StrategicProcessSection;
