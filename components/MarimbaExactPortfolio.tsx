"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { initCursor } from "@/lib/cursor";
import { initHeroExplode } from "@/lib/heroExplode";
import { initOrbitEngine } from "@/lib/orbitEngine";
import { initThemeScroll } from "@/lib/themeScroll";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initTestimonialRotator } from "@/lib/testimonialRotator";
import { ToolMarquee } from "@/components/ToolMarquee";
import { MacbookLaptop } from "@/components/MacbookLaptop";
import { siteConfig } from "@/lib/siteConfig";
import { DualScramble } from "@/components/ui/DualScramble";
import { AccordionGallery, type AccordionGalleryItem } from "@/components/AccordionGallery";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { DeckViewerModal } from "@/components/ui/DeckViewerModal";
import { ConnectModal } from "@/components/ui/ConnectModal";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { AboutSection } from "@/components/AboutSection";
import { StrategicProcessSection } from "@/components/StrategicProcessSection";
import { ConnectBanner } from "@/components/ConnectBanner";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/projects";

const showcaseGalleryItems: AccordionGalleryItem[] = [
  {
    image: "/assets/cicu/events/001152030003.jpg",
    label: "35mm Analog Documentation · Showcase Night",
    alt: "Showcase 35mm film capture",
  },
  {
    image: "/assets/cicu/showcase/showcase-slide-1.jpg",
    label: "Creative Industries Annual Showcase Campaign",
    alt: "Creative Industries Showcase Campaign",
  },
  {
    image: "/assets/cicu/events/IMG_1071.JPG",
    label: "Creative Community & Student Creators",
    alt: "Live Event & Student Community",
  },
  {
    image: "/assets/cicu/events/001152030008.jpg",
    label: "Live Exhibition Floor · The Creative School",
    alt: "Student Artist Showcase",
  },
  {
    image: "/assets/cicu/showcase/showcase-post-1.jpg",
    label: "Digital Teaser & Speaker Announcement",
    alt: "Social Campaign Visual",
  },
  {
    image: "/assets/cicu/events/IMG_1082.JPG",
    label: "Alum Networking & Industry Floor",
    alt: "Networking & Alum Gathering",
  },
  {
    image: "/assets/cicu/merch/cicu-merch.jpg",
    label: "Sold-Out Student Merchandise Collection",
    alt: "CICU Merch Line",
  },
  {
    image: "/assets/cicu/events/001152030023.jpg",
    label: "Event Atmosphere & Candid Moments",
    alt: "Film Photography Capture",
  },
];

export function MarimbaExactPortfolio() {
  const [activeDeck, setActiveDeck] = useState<{
    title: string;
    tagline?: string;
    slides: string[];
    pdfUrl?: string;
  } | null>(null);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const showreel = document.querySelector(".work__laptop-video") as HTMLVideoElement | null;
      if (showreel) showreel.pause();
    }

    const { lenis, cleanup: cleanupScroll } = initSmoothScroll();
    lenis.stop();

    const cleanupCursor = initCursor();

    let cleanupStaged: (() => void) | null = null;
    const cleanupHero = initHeroExplode(() => {
      lenis.start();
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const target = document.querySelector<HTMLElement>(hash);
        if (target) {
          setTimeout(() => {
            lenis.scrollTo(target, { immediate: false, duration: 1.0 });
          }, 60);
        } else {
          lenis.scrollTo(0, { immediate: true });
        }
      } else {
        lenis.scrollTo(0, { immediate: true });
      }

      const cleanupOrbit = initOrbitEngine();
      const cleanupTheme = initThemeScroll();
      const cleanupTestimonials = initTestimonialRotator();
      cleanupStaged = () => {
        cleanupOrbit();
        cleanupTheme();
        cleanupTestimonials();
      };
    });

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const target = document.querySelector<HTMLElement>(hash);
        if (target) {
          lenis.scrollTo(target, { immediate: false, duration: 1.0 });
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".navigation .nav-link")
    );
    const sectionIds = ["home", "about-teaser", "work", "gallery", "process", "testimonials", "contact"];
    const updateActiveNav = () => {
      let current = "home";
      const probe = window.innerHeight * 0.4;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      navLinks.forEach((link) => {
        const href = link.getAttribute("href") ?? "";
        const isActive = href === `#${current}` || (current === "home" && href === "/");
        link.classList.toggle("nav-link--active", isActive);
        link.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    const navSwipe = document.querySelector<HTMLElement>("nav-swipe");
    let swiping = false;
    const handleNavClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        ".navigation .nav-link"
      );
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const targetSelector = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null;
      if (!targetSelector) return;
      e.preventDefault();
      e.stopPropagation();
      const target = document.querySelector<HTMLElement>(targetSelector);
      if (!target || swiping) return;
      swiping = true;

      const swipeEl = document.querySelector<HTMLElement>(".nav-swipe");
      if (!swipeEl) {
        lenis.scrollTo(target, { duration: 1.2 });
        swiping = false;
        return;
      }

      gsap.killTweensOf(swipeEl);
      gsap.set(swipeEl, { y: 0, yPercent: 101 });
      const tl = gsap.timeline({
        onComplete: () => {
          swiping = false;
        },
        onInterrupt: () => {
          swiping = false;
        },
      });
      tl.to(swipeEl, { yPercent: 0, duration: 0.5, ease: "power3.inOut" })
        .add(() => {
          try {
            lenis.scrollTo(target, { immediate: true });
            history.replaceState(null, "", targetSelector);
          } catch {}
        })
        .to(
          swipeEl,
          {
            yPercent: -101,
            duration: 0.6,
            ease: "power3.inOut",
            clearProps: "transform",
          },
          "+=0.1"
        );
    };
    document.addEventListener("click", handleNavClick, { capture: true });

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleNavClick, { capture: true });
      cleanupScroll();
      cleanupCursor();
      cleanupHero();
      if (cleanupStaged) cleanupStaged();
    };
  }, []);

  return (
    <>
      {/* Fullscreen Loader Curtain */}
      <div className="loader" id="loader" aria-hidden="true">
        <div className="loader-inner flex items-center justify-center">
          <div className="loader-box text-center flex flex-col items-center">
            <div className="shiny-monogram-container mb-5">
              <div className="shiny-monogram" />
            </div>
            <h1 className="loader-name font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-4">
              {siteConfig.person.fullName}
            </h1>
            <div className="loader-track w-48 sm:w-64 h-[3px] bg-white/20 rounded-full overflow-hidden mx-auto mb-3">
              <div className="loader-progress-bar w-full h-full bg-gradient-to-r from-[#A8CBE8] via-[#C3C6E8] to-[#8FB6D8] origin-left scale-x-0"></div>
            </div>
            <div className="loader-subtitle text-[11px] font-mono tracking-widest uppercase text-white/70">
              {siteConfig.location}
            </div>
          </div>
        </div>
      </div>

      {/* Curtain swipe overlay */}
      <div className="nav-swipe" aria-hidden="true"></div>

      {/* Magnetic Cursor Dot */}
      <div id="cursor-dot" className="cursor-dot" aria-hidden="true">
        <div className="cursor-dot__inner" aria-hidden="true">
          <svg
            className="cursor-dot__arrow"
            viewBox="0 0 45 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.6466 13.3979C32.8541 13.3979 25.712 9.10371 22.228 1.00019"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M43.6466 13.398C32.8541 13.3979 25.712 17.6922 22.228 25.7957"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M42.8208 13.398L1 13.3979"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="cursor-dot__label">Explore</div>
        </div>
      </div>

      {/* Shared responsive top navigation */}
      <SiteHeader homeSections />

      {/* Main Content */}
      <main id="main-content">
        {/* 1. Hero Section: Editorial Split Layout with Polaroid & Washi-Tape Collage */}
        <section className="hero relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden" id="home">
          {/* Ambient Background Glows & Marimba Floating Shapes */}
          <div className="hero-background">
            <div className="shape shape-astrix" id="shape-astrix" style={{ inset: "15% auto auto 10%" }}>
              <img src="/assets/shape-astrix.svg" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-left" id="shape-circle-left" style={{ inset: "8% auto auto -6%" }}>
              <img src="/assets/shape-circle1.webp" alt="" className="shape-img" />
            </div>

            <div className="shape shape-starburst" id="shape-starburst" style={{ inset: "auto auto 12% 44%" }}>
              <img src="/assets/shape-star1.webp" alt="" className="shape-img" />
            </div>

            <div className="shape shape-leaf" id="shape-leaf" style={{ inset: "45% 2% auto auto" }}>
              <img src="/assets/shape-leaf1.webp" alt="" className="shape-img" />
            </div>

            <div className="shape shape-astrix shape-astrix--lg" id="shape-astrix-2" style={{ inset: "auto 8% 8% auto" }}>
              <img src="/assets/shape-astrix-2.svg" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-bottom" id="shape-circle-bottom" style={{ inset: "auto auto -15% 45%" }}>
              <img src="/assets/shape-circle3.webp" alt="" className="shape-img" />
            </div>
          </div>

          <div className="max-w-[1380px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
            {/* Left Column: Headline & Action Buttons */}
            <div className="lg:col-span-6 flex flex-col items-start text-left hero-content !max-w-none !p-0">
              <div className="hero-tag mb-6">
                <span className="pill-button !bg-white/80 !backdrop-blur-sm !border-[#1E3A5F]/20 text-xs font-mono tracking-wider uppercase text-[#1E3A5F]">
                  Communications · Marketing · Digital Media · Project Coordination
                </span>
              </div>
              <h1 className="hero-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.12] tracking-tight text-[#1E3A5F] mb-6">
                Turning ideas into meaningful digital experiences.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-xl mb-8">
                Strategic storytelling, creative content, and digital communication that connects.
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
            </div>

            {/* Right Column: Multi-Layer Polaroid & Washi-Tape Collage */}
            <div className="lg:col-span-6 relative flex justify-center items-center min-h-[460px] sm:min-h-[520px]">
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

              {/* Top-Right Polaroid: Toronto Skyline (Tilted) */}
              <div className="polaroid-frame absolute -top-4 right-0 sm:right-4 w-36 sm:w-44 rotate-[6deg] z-10 hover:z-30">
                <div className="overflow-hidden aspect-[4/5] bg-slate-100 rounded-sm mb-1.5">
                  <img
                    src="/assets/headshots/IMG_1421.jpeg"
                    alt="Toronto Skyline"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom-Right Polaroid: Workspace & Matcha (Tilted) */}
              <div className="polaroid-frame absolute -bottom-6 right-2 sm:right-8 w-36 sm:w-44 rotate-[-4deg] z-20 hover:z-30">
                <div className="overflow-hidden aspect-[4/5] bg-slate-100 rounded-sm mb-1.5">
                  <img
                    src="/assets/headshots/IMG_2650.jpeg"
                    alt="Creative Workspace"
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
        </section>

        {/* 2. What I Do: 5-Pillar Core Capabilities */}
        <WhatIDoSection />

        {/* 3. Editorial About Teaser Section */}
        <AboutSection />

        {/* 4. Work Showcase — 3D MacBook with Motion Reels */}
        <section className="section py-16 md:py-24" id="work" data-cursor="work">
          <div className="section-content">
            <div className="text-center mb-12">
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-3">
                Showreel
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-dark)]">
                Selected Work
              </h2>
            </div>
            <MacbookLaptop />
          </div>
        </section>

        {/* 5. Running Tool Marquee with Key Skills Monospace Label */}
        <div className="my-16 md:my-24 py-4 w-full">
          <ToolMarquee />
        </div>

        {/* 6. AccordionGallery: 35mm Analog Photography (Clean full-bleed without caption subheadings) */}
        <section className="section py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto" id="gallery">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-dark)]">
              Event &amp; Showcase Photography
            </h2>
          </div>
          <AccordionGallery
            items={showcaseGalleryItems}
            defaultIndex={1}
            height={480}
            expandRatio={0.46}
            trigger="hover"
            showLabels={false}
          />
        </section>

        {/* 7. Process Disks: Strategic Process & Methodology */}
        <StrategicProcessSection />

        {/* 8. Testimonials */}
        <section className="section testimonials" id="testimonials" aria-label="Kind words">
          <div className="testimonials__inner">
            <h2 className="testimonials__heading">Kind words</h2>
            <div
              className="testimonials__stage"
              role="group"
              aria-roledescription="carousel"
              aria-label="Client testimonials"
              tabIndex={0}
            >
              {siteConfig.testimonials.map((testimonial, i) => (
                <figure
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${siteConfig.testimonials.length}`}
                  className={`testimonial${i === 0 ? " is-active" : ""}`}
                >
                  <blockquote className="testimonial__quote">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="testimonial__author">
                    {testimonial.author}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="testimonials__controls">
              <button
                type="button"
                className="testimonials__nav"
                data-testimonial-prev
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path
                    d="M15 4.5 7.5 12 15 19.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="testimonials__counter" aria-live="polite">
                <span className="testimonials__counter-current">1</span>
                <span className="testimonials__counter-sep" aria-hidden="true">
                  /{" "}
                </span>
                <span className="testimonials__counter-total">
                  {siteConfig.testimonials.length}
                </span>
              </span>
              <button
                type="button"
                className="testimonials__nav"
                data-testimonial-next
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path
                    d="M9 4.5 16.5 12 9 19.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="testimonials__dots">
              {siteConfig.testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`testimonials__dot${i === 0 ? " is-active" : ""}`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 9. Pre-Footer Connect Callout Banner */}
        <ConnectBanner onOpenConnect={() => setConnectModalOpen(true)} />
      </main>

      {/* Standardized Contact & Blue Scroll Theme Footer */}
      <Footer />

      {/* Slide Deck Modal Viewer */}
      {activeDeck && (
        <DeckViewerModal
          isOpen={true}
          onClose={() => setActiveDeck(null)}
          title={activeDeck.title}
          tagline={activeDeck.tagline}
          slides={activeDeck.slides}
        />
      )}

      {/* Connect Pop-out Modal */}
      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}

export default MarimbaExactPortfolio;

