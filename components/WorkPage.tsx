"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { Footer } from "./Footer";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initWorkSlider } from "@/lib/workSlider";
import { projects } from "@/lib/projects";
import { DeckViewerModal } from "@/components/ui/DeckViewerModal";
import { LiveScreenPlayer } from "@/components/ui/LiveScreenPlayer";

gsap.registerPlugin(ScrollTrigger);

export function WorkPage() {
  const [activeDeck, setActiveDeck] = useState<{
    title: string;
    tagline?: string;
    slides: string[];
    pdfUrl?: string;
  } | null>(null);

  const workHeroRef = useRef<HTMLElement>(null);
  const workContainerRef = useRef<HTMLDivElement>(null);
  const workHeadingRef = useRef<HTMLHeadingElement>(null);
  const workDescRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const { lenis, cleanup: cleanupScroll } = initSmoothScroll();
    const cleanupCursor = initCursor();
    const cleanupSlider = initWorkSlider(lenis);

    const ctx = gsap.context(() => {
      // 1. Entrance blur-to-sharp & rise
      if (workHeadingRef.current) {
        gsap.fromTo(
          workHeadingRef.current,
          { filter: "blur(25px)", y: 40, opacity: 0 },
          { filter: "blur(0px)", y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
        );
      }
      if (workDescRef.current) {
        gsap.fromTo(
          workDescRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, delay: 0.2, ease: "power2.out" }
        );
      }

      // 2. Scroll compression: Zoom entire container down symmetrically in exact center
      if (workHeroRef.current && workContainerRef.current) {
        const isMobile = window.innerWidth < 768;
        gsap.to(workContainerRef.current, {
          scale: isMobile ? 0.82 : 0.75,
          y: -20,
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: workHeroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    });

    return () => {
      ctx.revert();
      cleanupScroll();
      cleanupCursor();
      cleanupSlider();
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main id="main-content" className="work-page relative overflow-hidden">
        {/* Intro Section: Full-height Big Hero on Entrance */}
        <section
          ref={workHeroRef}
          className="work-intro min-h-[75vh] flex flex-col justify-center items-center text-center pt-32 pb-16 relative z-10 w-full"
        >
          <div
            ref={workContainerRef}
            className="work-intro__container w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center will-change-transform"
          >
            <span className="text-sm font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-3 text-center">
              Portfolio
            </span>
            <h1
              ref={workHeadingRef}
              className="work-intro__heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[var(--text-dark)] mb-4 text-center w-full leading-none"
            >
              My Work
            </h1>
            <p
              ref={workDescRef}
              className="work-intro__description text-base md:text-lg text-gray-600 max-w-2xl text-center mx-auto leading-relaxed"
            >
              A collection of brand strategy, digital campaigns, and communications projects.
            </p>
          </div>
        </section>

        {/* Slider Showcase with Live Studio Screen Player */}
        <section className="work-slider relative z-10" aria-label="Featured projects">
          {/* Dynamic Ambient Background Slider Stack */}
          <div className="work-slider__backdrop-container absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="work-slider__backdrop-item absolute inset-0 will-change-transform will-change-opacity"
                data-project={index + 1}
              >
                <div
                  className="absolute inset-0 opacity-40 mix-blend-multiply"
                  style={{
                    background: `radial-gradient(ellipse at 35% 50%, ${project.accent}66 0%, ${project.accent}25 45%, transparent 75%)`,
                  }}
                />
                <div
                  className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: project.accent }}
                />
                <div
                  className="absolute -bottom-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-3xl opacity-25"
                  style={{ backgroundColor: project.accent }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,58,95,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
              </div>
            ))}
          </div>

          <div className="work-slider__laptop shadow-2xl relative z-10">
            <div className="work-slider__media-container">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="work-slider__media overflow-hidden"
                  data-project={index + 1}
                >
                  <LiveScreenPlayer
                    project={project}
                    isActive={true}
                    onOpenDeck={
                      project.slides && project.slides.length > 0
                        ? () =>
                            setActiveDeck({
                              title: project.title,
                              tagline: project.tagline,
                              slides: project.slides!,
                            })
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="work-slider__content-wrapper">
            <div className="work-slider__counter-fixed" aria-hidden="true">
              <div className="work-slider__counter-current-wrapper">
                {projects.map((project, index) => (
                  <span
                    key={project.slug}
                    className="work-slider__counter-current"
                    data-project={index + 1}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
              <span className="work-slider__counter-separator">/</span>
              <span className="work-slider__counter-total">
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="work-slider__stage">
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="work-slider__content"
                  data-project={index + 1}
                >
                  <h2 className="work-slider__title font-serif">{project.title}</h2>
                  <div className="work-slider__meta">
                    {project.categories.map((category) => (
                      <span key={category} className="work-slider__tag">
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Project In-Page Meta Details */}
                  <div className="grid grid-cols-3 gap-2 my-3 text-[11px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider block text-[9px]">Role</span>
                      <span className="font-medium text-slate-800 truncate block">{project.role}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider block text-[9px]">Timeline</span>
                      <span className="font-medium text-slate-800 truncate block">{project.timeline}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider block text-[9px]">Client / Scope</span>
                      <span className="font-medium text-slate-800 truncate block">{project.client}</span>
                    </div>
                  </div>

                  <p className="work-slider__description text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    {project.slides && project.slides.length > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDeck({
                            title: project.title,
                            tagline: project.tagline,
                            slides: project.slides!,
                          })
                        }
                        className="work-slider__button inline-flex items-center gap-1.5"
                      >
                        <span>Open Presentation Deck ({project.slides.length} Slides)</span>
                        <span>↗</span>
                      </button>
                    ) : (
                      <span className="px-4 py-2 rounded-full bg-[#1E3A5F] text-white text-xs font-mono tracking-wider uppercase">
                        Interactive Showcase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="work-slider__pagination" role="tablist" aria-label="Project navigation">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                className="work-slider__dot"
                data-index={index}
                type="button"
                aria-label={`Go to project ${index + 1}: ${project.title}`}
              />
            ))}
          </div>
        </section>
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
    </>
  );
}

export default WorkPage;
