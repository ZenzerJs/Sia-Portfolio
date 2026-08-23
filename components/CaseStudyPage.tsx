"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { Footer } from "./Footer";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initCaseStudyAnimations } from "@/lib/caseStudy";
import { getNextProject, getPreviousProject, type Project, type OutputItem } from "@/lib/projects";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { DeckViewerModal } from "@/components/ui/DeckViewerModal";

export function CaseStudyPage({ project }: { project: Project }) {
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const evolutionRef = useRef<HTMLElement>(null);

  const nextProject = getNextProject(project.slug);
  const previousProject = getPreviousProject(project.slug);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const { cleanup: cleanupScroll } = initSmoothScroll();
    const cleanupCursor = initCursor();
    const cleanupAnimations = initCaseStudyAnimations(mainRef.current);

    return () => {
      cleanupScroll();
      cleanupCursor();
      cleanupAnimations();
    };
  }, [project.slug]);

  // Sticky rail — highlight the phase currently centered in the viewport.
  useEffect(() => {
    const root = evolutionRef.current;
    if (!root) return;
    const phaseSections = Array.from(root.querySelectorAll<HTMLElement>(".cs-phase"));
    if (phaseSections.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActivePhase(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = phaseSections.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActivePhase(index);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    phaseSections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [project.slug]);

  const gradient =
    project.media.gradient ??
    `linear-gradient(135deg, ${project.accent} 0%, var(--cs-navy) 100%)`;

  const outputs: OutputItem[] =
    project.outputs && project.outputs.length > 0
      ? project.outputs
      : project.gallery && project.gallery.length > 0
      ? project.gallery.slice(0, 4).map((img, idx) => ({
          title: `Project Output 0${idx + 1}`,
          category: project.categories[idx % project.categories.length] ?? "Deliverable",
          image: img,
        }))
      : project.slides && project.slides.length > 0
      ? project.slides.slice(1, 5).map((img, idx) => ({
          title: `Presentation Slide 0${idx + 2}`,
          category: "Campaign Strategy",
          image: img,
        }))
      : [];

  const contextImage =
    project.slides?.[1] ?? project.gallery?.[0] ?? project.media.src;

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main
        ref={mainRef}
        id="main-content"
        className={`case-study-page case-study-page--${project.variant} editorial-grid`}
      >
        {/* ── 1. Project Masthead ───────────────────────────────────────── */}
        <header className="cs-masthead">
          <div className="cs-masthead__content">
            <span className="cs-masthead__tag">{project.tagline}</span>
            <h1 className="cs-masthead__title">{project.title}</h1>
            <p className="cs-masthead__description">{project.heroDescription}</p>

            {(project.challenge || project.strategy) && (
              <div className="cs-masthead__challenge-strategy">
                {project.challenge && (
                  <div className="cs-masthead__cs-box">
                    <span className="cs-masthead__cs-title">The Challenge</span>
                    <p className="cs-masthead__cs-desc">{project.challenge}</p>
                  </div>
                )}
                {project.strategy && (
                  <div className="cs-masthead__cs-box">
                    <span className="cs-masthead__cs-title">The Strategy</span>
                    <p className="cs-masthead__cs-desc">{project.strategy}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="cs-masthead__meta">
            <span
              className="cs-masthead__meta-accent"
              style={{ backgroundColor: project.accent }}
              aria-hidden="true"
            />
            <div className="cs-masthead__meta-row">
              <span className="cs-masthead__meta-label">Role</span>
              <span className="cs-masthead__meta-value">{project.role}</span>
            </div>
            <div className="cs-masthead__meta-row">
              <span className="cs-masthead__meta-label">Timeline</span>
              <span className="cs-masthead__meta-value">{project.timeline}</span>
            </div>
            <div className="cs-masthead__meta-row">
              <span className="cs-masthead__meta-label">Tools</span>
              <span className="cs-masthead__meta-value">{project.tools}</span>
            </div>
            <div className="cs-masthead__meta-row">
              <span className="cs-masthead__meta-label">Client</span>
              <span className="cs-masthead__meta-value">{project.client}</span>
            </div>
          </div>
        </header>

        {/* ── 2. Hero Media & Interactive Presentation Action ─────────── */}
        <section className="cs-hero-media" aria-label="Hero visual presentation">
          <div className="cs-hero-media__frame group">
            {project.media.type === "video" ? (
              <video
                src={project.media.src}
                muted
                playsInline
                loop
                autoPlay
                className="cs-media-img"
              />
            ) : project.media.src ? (
              <img
                src={project.media.src}
                alt={project.media.alt ?? project.title}
                className="cs-media-img group-hover:scale-[1.02]"
              />
            ) : (
              <div
                className="cs-media-img cs-media-img--placeholder"
                style={{ background: gradient }}
              >
                <span>{project.name}</span>
              </div>
            )}

            {project.slides && project.slides.length > 0 && (
              <div className="cs-hero-media__action">
                <button
                  type="button"
                  onClick={() => setDeckModalOpen(true)}
                  className="cs-ghost-btn cs-ghost-btn--solid flex items-center gap-2 shadow-lg"
                  aria-label={`Explore full presentation deck (${project.slides.length} slides)`}
                >
                  <span>Explore Full Presentation ({project.slides.length} Slides)</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            )}
          </div>

          <div className="cs-hero-media__caption">
            <span>{project.tagline}</span>
            <span>
              01 // {String(project.phases.length > 0 ? project.phases.length : 4).padStart(2, "0")}
            </span>
          </div>
        </section>

        {/* ── 3. Before / After Comparison Slider (optional) ─────────── */}
        {project.beforeAfter && (
          <section className="case-study-compare border-b border-grid-line">
            <BeforeAfterSlider
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              beforeLabel={project.beforeAfter.beforeLabel}
              afterLabel={project.beforeAfter.afterLabel}
            />
          </section>
        )}

        {/* ── 4. Project Brief & Strategic Approach ───────────────────── */}
        <section className="cs-brief" aria-label="Project brief and strategic approach">
          <div className="cs-brief__grid">
            <h2 className="cs-brief__heading">The Brief &amp; Strategy</h2>

            <div className="cs-brief__body">
              <div className="cs-brief__row">
                <div className="cs-brief__org">
                  <span className="cs-brief__label">The Organisation</span>
                  <p>
                    <span className="cs-brief__highlight">{project.client}</span>{" "}
                    {project.brief ??
                      "sought a refined communications and digital engagement strategy designed to make complex data, mission priorities, and creative storytelling immediately impactful and accessible."}
                  </p>
                </div>

                <div
                  className="cs-brief__org-image cursor-pointer group"
                  onClick={() => contextImage && setPreviewImage(contextImage)}
                  title="Click to expand image"
                >
                  {contextImage ? (
                    <img
                      src={contextImage}
                      alt={`${project.name} context visual`}
                      className="cs-media-img group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="cs-media-img cs-media-img--placeholder"
                      style={{ background: gradient }}
                    >
                      <span>{project.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="cs-brief__row">
                <div className="cs-brief__objective md:col-span-2">
                  <span className="cs-brief__label">The Objective &amp; Approach</span>
                  <p className="cs-brief__lead">
                    “
                    {project.objective ??
                      "Transforming high-level research and institutional initiatives into audience-focused narratives that drive measurable engagement."}
                    ”
                  </p>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Strategic Evolution (Sticky Process Rail) ─────────────── */}
        <section
          className="cs-evolution"
          ref={evolutionRef}
          aria-label="Strategic evolution and process timeline"
        >
          <div className="cs-evolution__header">
            <h2 className="cs-evolution__heading">Strategic Evolution</h2>
            <p className="cs-evolution__intro">
              The project progressed across structured phases from initial research and audience analysis to multi-platform rollout and measurable impact.
            </p>
          </div>

          <div className="cs-evolution__grid">
            {/* Sticky Left Rail */}
            <div className="cs-evolution__rail">
              <nav aria-label="Project phases" className="cs-rail">
                {project.phases.map((phase, index) => (
                  <a
                    key={phase.id}
                    href={`#${phase.id}`}
                    className={`cs-rail-item${index === activePhase ? " is-active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = evolutionRef.current?.querySelector(`#${phase.id}`);
                      target?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span
                      className="cs-rail-dot"
                      style={
                        index === activePhase
                          ? { backgroundColor: project.accent, borderColor: project.accent }
                          : undefined
                      }
                      aria-hidden="true"
                    />
                    <span className="cs-rail-label">{phase.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Scrolling Right Phases */}
            <div className="cs-evolution__content">
              {project.phases.map((phase, index) => {
                const phaseImg =
                  phase.image ??
                  (project.slides && project.slides.length > index
                    ? project.slides[index]
                    : project.gallery && project.gallery.length > index
                    ? project.gallery[index]
                    : undefined);

                return (
                  <div key={phase.id} id={phase.id} className="cs-phase">
                    <div className="cs-phase__text">
                      <span
                        className="cs-phase__date"
                        style={{ color: project.accent }}
                      >
                        {phase.date}
                      </span>
                      <h3 className="cs-phase__title">{phase.title}</h3>
                      <p className="cs-phase__desc">{phase.description}</p>
                    </div>

                    <div
                      className={`cs-phase__media group cursor-pointer ${
                        phase.rotation ?? (index % 2 === 0 ? "rotate-1" : "-rotate-1")
                      } hover:rotate-0 transition-transform duration-500`}
                      onClick={() => phaseImg && setPreviewImage(phaseImg)}
                      title="Click to enlarge"
                    >
                      {project.detailVideo && index === 0 ? (
                        <video
                          src={project.detailVideo}
                          muted
                          playsInline
                          loop
                          autoPlay
                          className="cs-media-img"
                        />
                      ) : phaseImg ? (
                        <img
                          src={phaseImg}
                          alt={phase.title}
                          className="cs-media-img group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="cs-media-img cs-media-img--placeholder"
                          style={{ background: gradient }}
                        >
                          <span>{phase.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Curated Outputs & Multi-Channel Rollout ───────────────── */}
        {outputs.length > 0 && (
          <section className="cs-gallery" aria-label="Project deliverables and outputs">
            <div className="cs-gallery__header">
              <h2>Selected Outputs</h2>
              <span>{project.categories.join(" · ")}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {outputs.map((item, idx) => (
                <div
                  key={idx}
                  className="cs-output__card group"
                  onClick={() => setPreviewImage(item.image)}
                >
                  <div className="cs-output__media">
                    <img
                      src={item.image}
                      alt={item.alt ?? item.title}
                      className="cs-media-img"
                      loading="lazy"
                    />
                    <div className="cs-output__overlay">
                      <span className="text-white text-lg font-serif tracking-wider">
                        Enlarge Preview ↗
                      </span>
                    </div>
                  </div>
                  <div className="cs-output__info">
                    <div>
                      <h3 className="cs-output__title">{item.title}</h3>
                      {item.category && (
                        <span className="cs-output__category">{item.category}</span>
                      )}
                    </div>
                    <div className="cs-output__btn" aria-hidden="true">
                      ↗
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 7. Impact Metrics & Testimonial Quote ────────────────────── */}
        {(project.results?.length || project.quote) && (
          <section className="cs-impact" aria-label="Measurable project impact">
            <h2 className="cs-impact__heading">The Impact</h2>

            {project.results && project.results.length > 0 && (
              <div className="cs-impact__grid">
                {project.results.map((result, idx) => (
                  <div key={idx} className="cs-impact__item">
                    <span
                      className="cs-impact__value"
                      style={{ color: project.accent }}
                    >
                      {result.value}
                    </span>
                    <span className="cs-impact__label">{result.label}</span>
                    {result.sublabel && (
                      <span className="cs-impact__sublabel">{result.sublabel}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {project.quote && (
              <div className="cs-quote">
                <blockquote className="cs-quote__text">“{project.quote.text}”</blockquote>
                <cite className="cs-quote__author">
                  — {project.quote.author}
                  {project.quote.role ? `, ${project.quote.role}` : ""}
                </cite>
              </div>
            )}
          </section>
        )}

        {/* ── 8. Previous / Next Project Navigator ─────────────────────── */}
        <section className="cs-navigator" aria-label="Next and previous project navigation">
          <Link
            href={`/work/${previousProject.slug}`}
            className="cs-nav-card cs-nav-card--prev group"
          >
            <span className="cs-nav-card__direction">
              <span aria-hidden="true">←</span> Previous Project
            </span>
            <span className="cs-nav-card__title">{previousProject.name}</span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="cs-nav-card cs-nav-card--next group"
          >
            <span className="cs-nav-card__direction">
              Next Project <span aria-hidden="true">→</span>
            </span>
            <span className="cs-nav-card__title">{nextProject.name}</span>
          </Link>
        </section>
      </main>

      {/* Standardized Architectural Footer */}
      <Footer />

      {/* Slide Deck Modal Viewer */}
      {deckModalOpen && project.slides && (
        <DeckViewerModal
          isOpen={true}
          onClose={() => setDeckModalOpen(false)}
          title={project.title}
          tagline={project.tagline}
          slides={project.slides}
          pdfUrl={project.deckPdf}
        />
      )}

      {/* Image Lightbox Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white p-2 border border-grid-line shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/80 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-black transition-colors"
              aria-label="Close image preview"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Expanded preview"
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CaseStudyPage;

