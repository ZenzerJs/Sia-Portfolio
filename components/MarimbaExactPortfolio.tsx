"use client";

import React, { useEffect } from "react";
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

export function MarimbaExactPortfolio() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Pause the auto-playing showreel for vestibular safety when the user
    // prefers reduced motion (WCAG 2.2.2 — no uninterrupted motion > 5s).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const showreel = document.querySelector(".work__laptop-video") as HTMLVideoElement | null;
      if (showreel) showreel.pause();
    }

    // 1. Initialize Lenis Smooth Scroll
    const { lenis, cleanup: cleanupScroll } = initSmoothScroll();

    // Lock scrolling until the entrance animation finishes — scrolling
    // mid-loader makes the staged ScrollTrigger pin/scrub measurements
    // desync, which breaks the orbit/process effects once you do scroll.
    lenis.stop();

    // 2. Initialize Magnetic Cursor
    const cleanupCursor = initCursor();

    // 3. Initialize Loader and Hero Entrance Timeline.
    //    (Scroll-driven effects are staged until the entrance completes so the
    //    pin/scrub triggers measure the final layout.)
    let cleanupStaged: (() => void) | null = null;
    const cleanupHero = initHeroExplode(() => {
      // Entrance finished: unlock scrolling and reset to the top before the
      // scroll-driven effects start measuring.
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

    // Scroll-spy: keep the top-right nav in sync with the current section so
    // the active item stays visually distinct after clicking / scrolling.
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".navigation .nav-link")
    );
    const sectionIds = ["home", "work", "process", "contact"];
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

    // 5. Right-side nav: green curtain swipe transition. The #212E02 overlay
    //    (same green as the bottom-of-page theme) swipes up from below the
    //    viewport to cover the page, the view jumps to the target section, then
    //    the curtain keeps swiping up and out the top to reveal it.
    const navSwipe = document.querySelector<HTMLElement>(".nav-swipe");
    let swiping = false;
    const handleNavClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        ".navigation .nav-link"
      );
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("#")) return; // "/" navigates normally
      // Handled in the capture phase before Next Link's own onClick fires, and
      // we stop propagation so the page cannot scroll to the section before the
      // green curtain covers it.
      e.preventDefault();
      e.stopPropagation();
      const target = document.querySelector<HTMLElement>(href);
      if (!target || swiping) return;
      swiping = true;

      // Fallback (no overlay in DOM): smooth-scroll directly.
      if (!navSwipe) {
        lenis.scrollTo(target, { duration: 1.2 });
        swiping = false;
        return;
      }

      // Bulletproof sequence: cover -> jump to section -> reveal. A single
      // timeline guarantees the reveal always runs (even if a step errors or
      // the tween is interrupted), so the overlay can never get stuck covering
      // the page as a green screen.
      gsap.killTweensOf(navSwipe);
      // Establish a clean baseline: the stylesheet's `transform: translateY(-101%)`
      // is parsed by GSAP as a percentage `y`, which stacks on top of the
      // `yPercent` tweens below (so the cover tween never actually covers).
      // Pinning `y: 0` keeps the whole sequence in `yPercent`. Start the
      // curtain below the viewport so it swipes up to cover, then swipes up
      // again to reveal the jumped-to section.
      gsap.set(navSwipe, { y: 0, yPercent: 101 });
      const tl = gsap.timeline({
        onComplete: () => {
          swiping = false;
        },
        onInterrupt: () => {
          swiping = false;
        },
      });
      tl.to(navSwipe, { yPercent: 0, duration: 0.5, ease: "power3.inOut" })
        .add(() => {
          try {
            lenis.scrollTo(target, { immediate: true });
            history.replaceState(null, "", href);
          } catch {
            // Never let a scroll error block the reveal.
          }
        })
        .to(
          navSwipe,
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
          <div className="loader-logo">
            <img
              src="/assets/logo.svg"
              alt="marimba. designs"
              className="loader-logo-outline"
            />
            <div className="loader-logo-fill" aria-hidden="true">
              <span className="loader-logo-fill-bar"></span>
            </div>
          </div>
          <div className="loader-text">Digital designer</div>
        </div>
      </div>

      {/* Window Blinds Shadow Overlay */}
      <div className="blinds-overlay" id="blinds-overlay"></div>

      {/* Green curtain swipe overlay (animated by the right-side nav clicks) */}
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
              stroke="#F0EFE9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M43.6466 13.398C32.8541 13.3979 25.712 17.6922 22.228 25.7957"
              stroke="#F0EFE9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M42.8208 13.398L1 13.3979"
              stroke="#F0EFE9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="cursor-dot__label">View work</div>
        </div>
      </div>

      {/* Fixed Header */}
      <header className="header">
        <div className="header-container">
          <div className="brand">
            <img src="/assets/logo.svg" alt="marimba. designs" className="brand-logo" />
          </div>

          <div className="header-center">
            <span className="header-tag">{siteConfig.role}</span>
            <span className="header-location">{siteConfig.location}</span>
          </div>

          <nav className="navigation">
            <Link href="/" className="nav-link nav-link--active">
              Home
            </Link>
            <Link href="#work" className="nav-link">
              Work
            </Link>
            <Link href="#process" className="nav-link">
              Process
            </Link>
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section with Pinned Trigonometric Orbit Background */}
        <section className="hero" id="home">
          <div className="hero-background">
            <div className="shape shape-astrix" id="shape-astrix" style={{ inset: "20% auto auto 23%" }}>
              <img src="/assets/shape-astrix.svg" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-left" id="shape-circle-left" style={{ inset: "12% auto auto -8%" }}>
              <img src="/assets/shape-circle1.webp" alt="" className="shape-img" />
              <span className="shape-label">
                Visual <br /> design
              </span>
            </div>

            <div className="shape shape-starburst" id="shape-starburst" style={{ inset: "23% auto auto 3%" }}>
              <img src="/assets/shape-star1.webp" alt="" className="shape-img" />
            </div>

            <div className="shape shape-circle-right" id="shape-circle-right" style={{ inset: "10% -12% auto auto" }}>
              <img src="/assets/shape-circle2.webp" alt="" className="shape-img" />
              <span className="shape-label">
                Interaction<br />design
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
              <span className="shape-label">UI/UX</span>
            </div>
          </div>

          <div className="expertise-ring" aria-hidden="true">
            {/* Soft gradient mesh + grain field, layered behind the orbit shapes */}
            <div className="expertise-field" aria-hidden="true"></div>
            {/* Editorial line-work — layered geometric field, not a flat ring */}
            <div className="expertise-field-lines" aria-hidden="true">
              <svg
                viewBox="0 0 800 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="140"
                  y="168"
                  width="520"
                  height="464"
                  rx="120"
                  transform="rotate(14 400 400)"
                  stroke="rgba(58, 74, 22, 0.16)"
                  strokeWidth="1.5"
                />
                <rect
                  x="172"
                  y="132"
                  width="456"
                  height="536"
                  rx="120"
                  transform="rotate(-16 400 400)"
                  stroke="rgba(58, 74, 22, 0.1)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="400"
                  cy="400"
                  r="292"
                  stroke="rgba(58, 74, 22, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                />
                <path
                  d="M400 108v72M400 620v72M108 400h72M620 400h72"
                  stroke="rgba(58, 74, 22, 0.12)"
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

          {/* "My design practice" label sits above the field but stays clear of
              the orbit shapes (shapes paint above the field, below this text). */}
          <div className="expertise-center-text" aria-hidden="true">
            My design<br />practice
          </div>

          <div className="hero-content">
            <div className="hero-tag">
              <span className="pill-button">Web design &amp; development</span>
            </div>
            <h1 className="hero-headline">
              I create living, breathing
              <br />
              websites for brands that want
              <br />
              to be felt, not just seen.
            </h1>
          </div>
        </section>

        {/* Expertise Section (Orbit Runway) */}
        <section className="section" id="expertise">
          <div className="section-content"></div>
        </section>

        {/* Work Showcase — 3D CSS MacBook Pro with the showreel on its screen */}
        <section className="section" id="work" data-cursor="work">
          <div className="section-content">
            <MacbookLaptop />
          </div>
        </section>

        {/* 3D Process Conic Gradient Stack Section */}
        <section className="section process" id="process">
          <div className="section-content process__content">
            <h2 className="process__headline">
              Designing, building, and refining as one continuous process
            </h2>
            <div className="process__stack">
              <div className="process__disks">
                {/* Disk 4 */}
                <div className="process__disk" data-disk="4">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Listen &amp; define</h3>
                    <p className="process__disk-label-text">
                      Understanding your business, users, and real goals.
                    </p>
                  </div>
                </div>

                {/* Disk 3 */}
                <div className="process__disk" data-disk="3">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Strategy &amp; plan</h3>
                    <p className="process__disk-label-text">
                      Turning insight into structure, flows, and priorities.
                    </p>
                  </div>
                </div>

                {/* Disk 2 */}
                <div className="process__disk" data-disk="2">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Design &amp; refine</h3>
                    <p className="process__disk-label-text">
                      Visual language, UX, and iteration.
                    </p>
                  </div>
                </div>

                {/* Disk 1 */}
                <div className="process__disk" data-disk="1">
                  <div className="process__disk-graphic" aria-hidden="true">
                    <div className="disk-gradient"></div>
                  </div>
                  <div className="process__disk-label">
                    <h3 className="process__disk-label-headline">Build &amp; test</h3>
                    <p className="process__disk-label-text">
                      WordPress, motion, and real-world use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools marquee divider — software + AI tool icons */}
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

        {/* Contact Section with Theme Inversion */}
        <section className="section" id="contact">
          <div className="section-content">
            <h2>Let&apos;s work together</h2>
            <p>
              I&apos;m always looking for new projects and collaborations. If you have a
              project in mind, or just want to say hello, please get in touch.
            </p>
            <div className="contact__info">
              <p>{siteConfig.person.fullName}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
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
          <a
            href={siteConfig.awards.cssWinner.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/sotd-white-2.png"
              alt={siteConfig.awards.cssWinner.label}
              className="css-winner-logo"
              style={{ width: "125px", height: "auto" }}
            />
          </a>
        </footer>
      </main>
    </>
  );
}

export default MarimbaExactPortfolio;
