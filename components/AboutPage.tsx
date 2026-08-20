"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { ConnectModal } from "@/components/ui/ConnectModal";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { siteConfig } from "@/lib/siteConfig";
import { CountUp } from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    role: "Project Coordinator",
    company: "Mass Culture Canada",
    period: "Dec 2024 — Apr 2025",
    desc: "Developed multi-platform content strategies, newsletters and data-driven campaigns across LinkedIn, Facebook, X and Instagram. Coordinated a U.S. university partnership, translating brand research into an adopted communications strategy. Led the launch of the Data Narrative for the Arts platform, defined KPIs, analysed performance and managed concurrent projects, schedules and approvals.",
  },
  {
    role: "Digital Communications Assistant",
    company: "Government of Canada — Parks Canada",
    period: "Jun 2022 — Dec 2022",
    desc: "Served as a liaison between researchers, Communications/IT and the Bridging Divides community, translating stakeholder needs into platform requirements. Supported the design, development and launch of a centralised LMS website for academic research and digital seminars, conducting content audits and usability testing to improve accessibility and navigation. Coordinated timelines, feedback, quality control and platform updates while supporting launch promotion through email marketing.",
  },
  {
    role: "Communications & Digital Content Creator",
    company: "Toronto Metropolitan University — Bridging Divides",
    period: "Aug 2023 — Apr 2024",
    desc: "Led digital content coordination for Parks Canada’s agency-wide Microsoft 365 transition, ensuring clear, consistent and compliant communications. Developed training and onboarding materials, including infographics, tutorial videos and presentations, while collaborating cross-functionally to support digital adoption. Designed and maintained SharePoint knowledge hubs, conducted content audits and analysed user behaviour to improve resource accessibility, discoverability and workflow efficiency.",
  },
  {
    role: "VP Marketing & Creative Director",
    company: "Creative Industries Course Union (CICU)",
    period: "2023 — 2025",
    desc: "Led marketing and creative communications for a 300+ student community, developing promotional campaigns, visual branding, social media content and event communications. Directed digital and print creative, while producing live event photography and visual content for showcases, workshops and community initiatives.",
  },
];

const stats = [
  { end: 74, suffix: "K+", label: "MULTIPLE Campaign Reach" },
  { end: 10, suffix: "+", label: "Cross-Institutional Projects" },
  { end: 300, suffix: "+", label: "Showcase Event Attendees" },
];

export function AboutPage() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const ringRef = useRef<HTMLImageElement>(null);
  const burstRef = useRef<HTMLImageElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const introSectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const { cleanup: cleanupScroll } = initSmoothScroll();
    const cleanupCursor = initCursor();

    const ctx = gsap.context(() => {
      // 1. Hero Entrance: Blur-to-sharp & upward glide
      if (heroHeadingRef.current) {
        gsap.fromTo(
          heroHeadingRef.current,
          { filter: "blur(25px)", y: 30, opacity: 0 },
          { filter: "blur(0px)", y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
        );
      }

      // 2. Hero Scroll Compression: Centered scaling as user scrolls
      if (heroSectionRef.current && heroHeadingRef.current) {
        const isMobile = window.innerWidth < 768;
        gsap.to(heroHeadingRef.current, {
          scale: isMobile ? 0.88 : 0.8,
          y: -15,
          transformOrigin: "center center",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // 3. Infinite continuous rotation on decorative ring behind portrait
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: 360,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      // 4. Starburst shape reveal on scroll
      if (burstRef.current) {
        gsap.fromTo(
          burstRef.current,
          { opacity: 0, scale: 0.8, rotate: -15 },
          {
            opacity: 0.6,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: burstRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Tilting portrait reveal on scroll
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { rotate: 4, opacity: 0, scale: 0.95, y: 30 },
          {
            rotate: -2.5,
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5. Elastic overshoot on metric stat cards
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll(".about-stat-card");
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 6. Experience items horizontal glide-in
      if (experienceRef.current) {
        const expCards = experienceRef.current.querySelectorAll(".about-experience-card");
        gsap.fromTo(
          expCards,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 7. Core values stagger
      if (valuesRef.current) {
        const valueParas = valuesRef.current.querySelectorAll("p");
        gsap.fromTo(
          valueParas,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      cleanupScroll();
      cleanupCursor();
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main id="main-content" className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 relative z-10">
        {/* Editorial Hero Statement (Centered Big Hero) */}
        <section
          ref={heroSectionRef}
          className="about-hero min-h-[70vh] flex flex-col justify-center items-center text-center py-16 relative border-b border-gray-100/70 mb-12 will-change-transform"
        >
          <div className="max-w-4xl mx-auto text-center relative">
            <span className="text-xs font-mono tracking-widest uppercase text-[#718096] block mb-4 text-center">
              Editorial Statement
            </span>
            <h1
              ref={heroHeadingRef}
              className="about-hero__heading font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.14] tracking-tight text-[#1E3A5F] text-center mx-auto will-change-transform"
            >
              Connecting ideas, data, and people through intentional communication.
            </h1>
          </div>
        </section>

        {/* Intro Section: Portrait + Bio + Metrics */}
        <section
          className="about-bio-section py-8 md:py-12 border-b border-gray-100 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
            {/* Portrait Image Column with Continuous Spin Ring & Dynamic Tilt */}
            <div className="md:col-span-5 lg:col-span-4 relative flex justify-center md:justify-start">
              <div className="relative group max-w-sm w-full">
                <div
                  ref={portraitRef}
                  className="relative z-10 overflow-hidden rounded-2xl border border-[#1E3A5F]/15 shadow-xl bg-white transition-transform duration-500 hover:!rotate-0 group-hover:scale-[1.02] group-hover:shadow-2xl"
                >
                  <img
                    src="/assets/headshots/shanesia-primary.jpg"
                    alt={siteConfig.person.portraitAlt}
                    className="w-full h-auto aspect-[3/4] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Decorative Continuous Rotating Ring */}
                <img
                  ref={ringRef}
                  src="/assets/shape-circle2.webp"
                  alt=""
                  className="absolute -top-6 -left-6 w-20 h-20 md:w-28 md:h-28 opacity-40 pointer-events-none z-0"
                  aria-hidden="true"
                />
                {/* Decorative Starburst */}
                <img
                  ref={burstRef}
                  src="/assets/shape-star1.webp"
                  alt=""
                  className="absolute -bottom-6 -right-6 w-16 h-16 md:w-20 md:h-20 opacity-50 pointer-events-none z-20"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Text Bio Column */}
            <div className="md:col-span-7 lg:col-span-8 lg:pl-4">
              <span className="text-xs font-mono tracking-widest uppercase text-[#718096] block mb-2">
                About Me
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[#1E3A5F] mb-6 tracking-tight">
                Hi, I&apos;m {siteConfig.person.firstName}.
              </h2>

              <div className="space-y-5 text-base md:text-lg text-[#4A5568] font-light leading-relaxed">
                <p>
                  I work at the intersection of communications, marketing, and digital media building authentic
                  engagement for public sector, higher education, and non-profit organisations through intentional
                  strategy and storytelling.
                </p>
                <p>
                  Over the past few years I&apos;ve grown audience engagement through data-driven content strategy,
                  translated complex information into clear, audience-first messaging, and led cross-institutional
                  projects in fast-paced, deadline-driven environments.
                </p>
              </div>

              {/* Key Metrics with Elastic Bounce */}
              <div
                ref={statsRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-gray-100"
              >
                {stats.map((stat, idx) => (
                  <div key={idx} className="about-stat-card space-y-1">
                    <div className="font-serif text-3xl md:text-4xl text-[#1E3A5F] font-semibold">
                      <CountUp end={stat.end} decimals={0} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#718096]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience with Staggered Slide-In */}
        <section className="py-12 md:py-16 border-b border-gray-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 lg:col-span-3">
              <h2 className="font-serif text-2xl md:text-3xl text-[#1E3A5F] md:sticky md:top-28">
                Professional Experience
              </h2>
            </div>
            <div ref={experienceRef} className="md:col-span-8 lg:col-span-9 space-y-12">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="about-experience-card border-b border-gray-100/60 pb-10 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h3 className="text-xl font-serif font-medium text-[#1E3A5F]">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono text-[#718096] uppercase tracking-wider">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#1E3A5F]/80 uppercase tracking-widest mb-3">
                    {item.company}
                  </p>
                  <p className="text-sm md:text-base text-[#4A5568] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Credentials */}
        <section className="py-12 md:py-16 border-b border-gray-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 lg:col-span-3">
              <h2 className="font-serif text-2xl md:text-3xl text-[#1E3A5F] md:sticky md:top-28">
                Education &amp; Credentials
              </h2>
            </div>
            <div className="md:col-span-8 lg:col-span-9 space-y-10">
              {siteConfig.education.map((entry, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#1E3A5F]">
                    {entry.school}
                  </h3>
                  <p className="text-sm md:text-base text-[#4A5568]">
                    {entry.degree}
                  </p>
                  <p className="text-xs font-mono text-[#718096] uppercase tracking-wider">
                    {entry.period} {entry.note ? `· ${entry.note}` : ""}
                  </p>
                </div>
              ))}

              {/* Key Competencies */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#1E3A5F] mb-4">
                  Key Competencies
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {siteConfig.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-xs font-medium text-[#4A5568] border border-gray-200 rounded-full bg-white/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-[#1E3A5F] cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Button */}
              <div className="pt-4">
                <a
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono tracking-widest uppercase text-[#1E3A5F] border border-[#1E3A5F] rounded-full hover:bg-[#1E3A5F] hover:text-white transition-all duration-300 hover:shadow-lg"
                  href={siteConfig.resumeUrl}
                  download
                >
                  <span>Download Complete Résumé (PDF)</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-12 md:py-16 border-b border-gray-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 lg:col-span-3">
              <h2 className="font-serif text-2xl md:text-3xl text-[#1E3A5F] md:sticky md:top-28">
                Core Values
              </h2>
            </div>
            <div className="md:col-span-8 lg:col-span-9 space-y-6 text-sm md:text-base text-[#4A5568] leading-relaxed">
              <p>
                <strong className="text-[#1E3A5F] font-semibold">Data with Heart</strong> — Numbers only make an impact when they connect with people.
                I believe in translating analytics and research into empathetic narratives that inspire action.
              </p>
              <p>
                <strong className="text-[#1E3A5F] font-semibold">Cross-Institutional Collaboration</strong> — The best outcomes happen when diverse perspectives
                unite. Having coordinated projects across Canada, the US, and the UK, I thrive in bridging multidisciplinary teams.
              </p>
              <p>
                <strong className="text-[#1E3A5F] font-semibold">Craft &amp; Accessibility</strong> — From typography and visual balance to WCAG compliance,
                I ensure every deliverable is both beautiful and accessible to all audiences.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 text-center" id="contact">
          <span className="text-xs font-mono uppercase tracking-widest text-[#718096] block mb-3">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1E3A5F] mb-6">
            Let&apos;s connect
          </h2>
          <a
            className="text-lg md:text-xl font-mono text-[#4A5568] hover:text-[#1E3A5F] transition-colors border-b border-transparent hover:border-[#1E3A5F] pb-1 inline-block mb-8"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>

          <div className="mb-10">
            <button
              type="button"
              onClick={() => setConnectModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1E3A5F] text-white hover:bg-[#2A4D7A] text-xs font-mono tracking-widest uppercase transition-all shadow-md hover:scale-105"
              aria-label="Open contact and collaboration pop-out modal"
            >
              <span>Open Connect Pop-out</span>
              <span>↗</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {Object.values(siteConfig.socials).map((social) => (
              <a
                key={social.href}
                className="px-5 py-2 text-xs font-mono tracking-wider text-[#4A5568] border border-gray-200 rounded-full hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all bg-white hover:shadow-sm"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>

        {/* Sub-page Footer */}
        <footer className="pt-16 mt-16 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-monogram-navy.png"
              alt=""
              className="w-6 h-6 object-contain opacity-80"
            />
            <p className="m-0 text-xs font-mono text-[#718096]">
              © {siteConfig.copyrightStartYear} {siteConfig.legalName}
            </p>
          </div>
          <span className="text-xs font-mono text-[#718096]">
            London, UK · Toronto, CA
          </span>
        </footer>
      </main>

      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}

export default AboutPage;
