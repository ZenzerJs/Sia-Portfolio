"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { initCursor } from "@/lib/cursor";
import { initHeroExplode } from "@/lib/heroExplode";
import { initOrbitEngine } from "@/lib/orbitEngine";
import { initProcessStack } from "@/lib/processStack";
import { initThemeScroll } from "@/lib/themeScroll";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initTestimonialRotator } from "@/lib/testimonialRotator";
import { ToolMarquee } from "@/components/ToolMarquee";
import { MacbookLaptop } from "@/components/MacbookLaptop";
import { siteConfig } from "@/lib/siteConfig";
import { DualScramble } from "@/components/ui/DualScramble";
import { ScaleSlider } from "@/components/ui/ScaleSlider";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { DeckViewerModal } from "@/components/ui/DeckViewerModal";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/lib/projects";

const showcasePhotos = [
  {
    src: "/assets/cicu/events/001152030003.jpg",
    alt: "Showcase 35mm film capture",
    caption: "35mm Analog Documentation · Showcase Night",
  },
  {
    src: "/assets/cicu/showcase/showcase-slide-1.jpg",
    alt: "Creative Industries Showcase Campaign",
    caption: "Creative Industries Annual Showcase Campaign",
  },
  {
    src: "/assets/cicu/events/IMG_1071.JPG",
    alt: "Live Event & Student Community",
    caption: "Creative Community & Student Creators",
  },
  {
    src: "/assets/cicu/events/001152030008.jpg",
    alt: "Student Artist Showcase",
    caption: "Live Exhibition Floor · The Creative School",
  },
  {
    src: "/assets/cicu/showcase/showcase-post-1.jpg",
    alt: "Social Campaign Visual",
    caption: "Digital Teaser & Speaker Announcement",
  },
  {
    src: "/assets/cicu/events/IMG_1082.JPG",
    alt: "Networking & Alum Gathering",
    caption: "Alum Networking & Industry Floor",
  },
  {
    src: "/assets/cicu/merch/cicu-merch.jpg",
    alt: "CICU Merch Line",
    caption: "Sold-Out Student Merchandise Collection",
  },
  {
    src: "/assets/cicu/events/001152030023.jpg",
    alt: "Film Photography Capture",
    caption: "Event Atmosphere & Candid Moments",
  },
];

export function MarimbaExactPortfolio() {
  const [activeDeck, setActiveDeck] = useState<{
    title: string;
    tagline?: string;
    slides: string[];
    pdfUrl?: string;
  } | null>(null);

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
      lenis.scrollTo(0, { immediate: true });

      const cleanupOrbit = initOrbitEngine();
      const cleanupProcess = initProcessStack();
      const cleanupTheme = initThemeScroll();
      const cleanupTestimonials = initTestimonialRotator();
      cleanupStaged = () => {
        cleanupOrbit();
        cleanupProcess();
        cleanupTheme();
        cleanupTestimonials();
      };
    });

    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".navigation .nav-link")
    );
    const sectionIds = ["home", "work", "campaigns", "process", "contact"];
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
      if (!href.startsWith("#")) return;
      e.preventDefault();
      e.stopPropagation();
      const target = document.querySelector<HTMLElement>(href);
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
            history.replaceState(null, "", href);
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
      document.removeEventListener("click", handleNavClick, { capture: true });
      cleanupScroll();
      cleanupCursor();
      cleanupHero();
      if (cleanupStaged) cleanupStaged();
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Fullscreen Loader Curtain */}
      <div className="loader" id="loader" aria-hidden="true">
        <div className="loader-inner">
          <div className="loader-box text-center">
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
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-background">
            <div className="shape shape-astrix" id="shape-astrix" style={{ inset: "20% auto auto 23%" }}>
              <img src="/assets/shape-astrix.svg" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-left" id="shape-circle-left" style={{ inset: "12% auto auto -8%" }}>
              <img src="/assets/shape-circle1.webp" alt="" className="shape-img" />
              <span className="shape-label">
                Digital <br /> Strategy
              </span>
            </div>

            <div className="shape shape-starburst" id="shape-starburst" style={{ inset: "23% auto auto 3%" }}>
              <img src="/assets/shape-star1.webp" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-right" id="shape-circle-right" style={{ inset: "10% -12% auto auto" }}>
              <img src="/assets/shape-circle2.webp" alt="" className="shape-img" />
              <span className="shape-label">
                Data Storytelling<br />&amp; Campaigns
              </span>
            </div>

            <div className="shape shape-leaf" id="shape-leaf" style={{ inset: "40% 0% auto auto" }}>
              <img src="/assets/shape-leaf1.webp" alt="" className="shape-img" />
            </div>

            <div className="shape shape-astrix shape-astrix--lg" id="shape-astrix-2" style={{ inset: "auto 15% 10% auto" }}>
              <img src="/assets/shape-astrix-2.svg" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-bottom" id="shape-circle-bottom" style={{ inset: "auto auto -20% 50%" }}>
              <img src="/assets/shape-circle3.webp" alt="" className="shape-img" />
              <span className="shape-label">Project Coordination</span>
            </div>
          </div>

          <div className="expertise-ring" aria-hidden="true">
            <div className="expertise-field" aria-hidden="true"></div>
            <div className="expertise-field-lines" aria-hidden="true">
              <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="140"
                  y="168"
                  width="520"
                  height="464"
                  rx="120"
                  transform="rotate(14 400 400)"
                  stroke="rgba(30, 58, 95, 0.16)"
                  strokeWidth="1.5"
                />
                <rect
                  x="172"
                  y="132"
                  width="456"
                  height="536"
                  rx="120"
                  transform="rotate(-16 400 400)"
                  stroke="rgba(30, 58, 95, 0.1)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="400"
                  cy="400"
                  r="292"
                  stroke="rgba(30, 58, 95, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                />
                <path
                  d="M400 108v72M400 620v72M108 400h72M620 400h72"
                  stroke="rgba(30, 58, 95, 0.12)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="272" cy="232" r="7" fill="var(--accent-mint)" fillOpacity="0.55" />
                <circle cx="560" cy="300" r="5" fill="var(--accent-lilac)" fillOpacity="0.7" />
                <circle cx="512" cy="548" r="8" fill="var(--accent-sky)" fillOpacity="0.6" />
                <circle cx="288" cy="560" r="4.5" fill="var(--accent-amber)" fillOpacity="0.35" />
              </svg>
            </div>
          </div>

          <div className="expertise-center-text" aria-hidden="true">
            Strategic<br />Communications
          </div>

          <div className="hero-content">
            <div className="hero-tag">
              <span className="pill-button">
                <DualScramble text="Communications · Marketing · Project Coordination" trigger="load" duration={0.9} />
              </span>
            </div>
            <h1 className="hero-headline">
              Connecting data, research, and community
              <br className="hidden md:block" />
              through strategic storytelling and digital media.
            </h1>
          </div>
        </section>

        {/* Orbit Runway */}
        <section className="section" id="expertise">
          <div className="section-content"></div>
        </section>

        {/* Work Showcase — 3D MacBook with Motion Reels */}
        <section className="section" id="work" data-cursor="work">
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
            <div className="text-center mt-10">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-dark)] text-white text-xs font-mono tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                <span>View All Projects</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ScaleSlider: Event Photography & Visual Highlights */}
        <section className="section bg-slate-50/50 py-20 md:py-28" id="gallery">
          <ScaleSlider
            images={showcasePhotos}
            title="Event & Showcase Photography"
            subtitle="35mm Film · Digital"
            minScale={0.35}
            autoplaySpeed={0.0012}
          />
        </section>

        {/* Bento Grid: Featured Campaigns & Presentation Decks */}
        <section className="section py-24 md:py-32 px-4 md:px-8" id="campaigns">
          <div className="max-w-7xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-3">
              Strategic Campaigns
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-dark)]">
              Impact Through Storytelling
            </h2>
          </div>

          <BentoGrid>
            {/* Mass Culture DNA */}
            <BentoGridItem
              title="Mass Culture DNA"
              description="Arts data → visual narratives. 74K+ reach."
              tag="Arts & Research"
              href="/work/mass-culture-dna"
              header={
                <div
                  className="aspect-[16/10] bg-slate-100 relative group/card cursor-pointer overflow-hidden rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDeck({
                      title: "Mass Culture Canada: DNA Initiative",
                      tagline: "Brenau University Presentation · Research Priorities",
                      slides: [
                        "/assets/decks/slides/mass-culture-slide-1.jpg",
                        "/assets/decks/slides/mass-culture-slide-3.jpg",
                        "/assets/decks/slides/mass-culture-slide-4.jpg",
                        "/assets/decks/slides/mass-culture-slide-5.jpg",
                        "/assets/decks/slides/mass-culture-slide-8.jpg",
                        "/assets/decks/slides/river-clyde-slide-1.jpg",
                      ],
                      pdfUrl: "/assets/decks/mass-culture-slide-deck.pdf",
                    });
                  }}
                >
                  <img
                    src="/assets/decks/slides/mass-culture-slide-1.jpg"
                    alt="Mass Culture Presentation Deck"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono tracking-wider uppercase">
                    Preview Deck ↗
                  </div>
                </div>
              }
            />

            {/* FIFA 2026 Challenge */}
            <BentoGridItem
              title="FIFA 2026 Challenge"
              description="Multicultural fan engagement. Global runner-up."
              tag="Hackathon Runner-Up"
              href="/work/fifa-2026-challenge"
              header={
                <div
                  className="aspect-[16/10] bg-slate-100 relative group/card cursor-pointer overflow-hidden rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDeck({
                      title: "FIFA World Cup 2026: Our Neighbourhood, Your Nation",
                      tagline: "Global Hackathon Challenge · Fan Engagement Pitch",
                      slides: [
                        "/assets/decks/slides/fifa-slide-1.jpg",
                        "/assets/decks/slides/fifa-slide-2.jpg",
                        "/assets/decks/slides/fifa-slide-5.jpg",
                        "/assets/decks/slides/fifa-slide-7.jpg",
                        "/assets/decks/slides/fifa-slide-10.jpg",
                        "/assets/decks/slides/fifa-slide-15.jpg",
                      ],
                      pdfUrl: "/assets/decks/fifa-2026-slide-deck.pdf",
                    });
                  }}
                >
                  <img
                    src="/assets/decks/slides/fifa-slide-1.jpg"
                    alt="FIFA World Cup 2026 Pitch Deck"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono tracking-wider uppercase">
                    Preview Deck ↗
                  </div>
                </div>
              }
            />

            {/* Mastercard Sustainable Rebrand */}
            <BentoGridItem
              title="Mastercard Eco-Rebrand"
              description="Sustainable brand identity. Multi-channel rollout."
              tag="Brand Strategy"
              href="/work/mastercard-sustainability"
              header={
                <div
                  className="aspect-[16/10] bg-slate-100 relative group/card cursor-pointer overflow-hidden rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDeck({
                      title: "Mastercard: Sustainable Rebranding Campaign",
                      tagline: "RTA The Creative School · Brand Guidelines",
                      slides: [
                        "/assets/decks/slides/mastercard-slide-1.jpg",
                        "/assets/decks/slides/mastercard-slide-3.jpg",
                        "/assets/decks/slides/mastercard-slide-4.jpg",
                        "/assets/decks/slides/mastercard-slide-6.jpg",
                        "/assets/decks/slides/mastercard-slide-8.jpg",
                      ],
                      pdfUrl: "/assets/decks/rta-mastercard-slide-deck.pdf",
                    });
                  }}
                >
                  <img
                    src="/assets/decks/slides/mastercard-slide-1.jpg"
                    alt="Mastercard Rebrand Deck"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono tracking-wider uppercase">
                    Preview Deck ↗
                  </div>
                </div>
              }
            />
          </BentoGrid>
        </section>

        {/* 3D Process Stack Section */}
        <section className="section process" id="process">
          <div className="section-content process__content">
            <h2 className="process__headline">
              Research, strategy, and creative execution as one continuous process
            </h2>
            <div className="process__stack">
              <div className="process__disks">
                {/* Disk 4 */}
                <div className="process__disk" data-disk="4">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Listen &amp; Audit</h3>
                    <p className="process__disk-label-text">
                      Stakeholder interviews, content audits, and audience research.
                    </p>
                  </div>
                </div>

                {/* Disk 3 */}
                <div className="process__disk" data-disk="3">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Strategy &amp; Framework</h3>
                    <p className="process__disk-label-text">
                      Multi-channel campaign structures, messaging pillars, and KPI setting.
                    </p>
                  </div>
                </div>

                {/* Disk 2 */}
                <div className="process__disk" data-disk="2">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Creative Direction</h3>
                    <p className="process__disk-label-text">
                      Visual language, copywriting, motion design, and deck production.
                    </p>
                  </div>
                </div>

                {/* Disk 1 */}
                <div className="process__disk" data-disk="1">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Coordinate &amp; Measure</h3>
                    <p className="process__disk-label-text">
                      Stakeholder alignment, cross-platform rollout, and performance optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools marquee divider — software + AI tools */}
        <ToolMarquee />

        {/* Testimonials */}
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

        {/* Contact Section */}
        <section className="section" id="contact">
          <div className="section-content">
            <h2>Let&apos;s collaborate</h2>
            <div className="contact__info">
              <p>{siteConfig.person.fullName}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
              <p className="text-xs font-mono text-white/60 mt-1">{siteConfig.location}</p>
            </div>
            <div className="contact__links">
              {Object.values(siteConfig.socials).map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>
            © {siteConfig.copyrightStartYear} {siteConfig.legalName}
          </p>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            London, UK · Toronto, CA
          </span>
        </footer>
      </main>

      {/* Slide Deck Modal Viewer */}
      {activeDeck && (
        <DeckViewerModal
          isOpen={true}
          onClose={() => setActiveDeck(null)}
          title={activeDeck.title}
          tagline={activeDeck.tagline}
          slides={activeDeck.slides}
          pdfUrl={activeDeck.pdfUrl}
        />
      )}
    </>
  );
}

export default MarimbaExactPortfolio;
