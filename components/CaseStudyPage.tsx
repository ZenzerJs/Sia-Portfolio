"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initCaseStudyAnimations } from "@/lib/caseStudy";
import { getNextProject, getPreviousProject, type Project } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { DeckViewerModal } from "@/components/ui/DeckViewerModal";

export function CaseStudyPage({ project }: { project: Project }) {
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
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
    const cleanupAnimations = initCaseStudyAnimations();

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
    const railItems = Array.from(root.querySelectorAll<HTMLElement>(".cs-rail-item"));
    if (phaseSections.length === 0 || railItems.length === 0) return;

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
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    phaseSections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [project.slug]);

  const gradient =
    project.media.gradient ??
    `linear-gradient(135deg, var(--accent-sky) 0%, var(--accent-lilac) 100%)`;

  const galleryImages = project.gallery?.length
    ? project.gallery.slice(0, 4)
    : project.slides?.slice(0, 4) ?? [];

  const phaseMedia = project.slides?.length ? project.slides : project.gallery ?? [];
  const contextImage = project.slides?.[1] ?? project.gallery?.[0];

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main
        id="main-content"
        className={`case-study-page case-study-page--${project.variant}`}
      >
        {/* ── Masthead ─────────────────────────────────────────────── */}
        <section className="cs-masthead">
          <div className="cs-masthead__content">
            <span className="cs-masthead__tag">{project.tagline}</span>
            <h1 className="cs-masthead__title">{project.title}</h1>
            <p className="cs-masthead__description">{project.heroDescription}</p>
          </div>
          <div className="cs-masthead__meta">
            <span className="cs-masthead__meta-accent" aria-hidden="true" />
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
        </section>

        {/* ── Hero media ───────────────────────────────────────────── */}
        <section className="cs-hero-media">
          <div className="cs-hero-media__frame">
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
              <img src={project.media.src} alt={project.title} className="cs-media-img" />
            ) : (
              <div className="cs-media-img cs-media-img--placeholder" style={{ background: gradient }}>
                <span>{project.name}</span>
              </div>
            )}

            {project.slides && project.slides.length > 0 && (
              <div className="cs-hero-media__action">
                <button
                  type="button"
                  onClick={() => setDeckModalOpen(true)}
                  className="cs-ghost-btn cs-ghost-btn--solid"
                >
                  Explore Full Presentation ({project.slides.length} Slides)
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            )}
          </div>
          <div className="cs-hero-media__caption">
            <span>{project.tagline}</span>
            <span>01 / {String(project.phases.length).padStart(2, "0")}</span>
          </div>
        </section>

        {/* ── Before / after comparison (optional) ─────────────────── */}
        {project.beforeAfter && (
          <BeforeAfterSlider
            before={project.beforeAfter.before}
            after={project.beforeAfter.after}
            beforeLabel={project.beforeAfter.beforeLabel}
            afterLabel={project.beforeAfter.afterLabel}
          />
        )}

        {/* ── Brief & strategy ─────────────────────────────────────── */}
        <section className="cs-brief">
          <div className="cs-brief__grid">
            <h2 className="cs-brief__heading">The Brief &amp; Strategy</h2>

            <div className="cs-brief__body">
              <div className="cs-brief__org">
                <span className="cs-brief__label">The Organisation</span>
                <p>
                  <span className="cs-brief__highlight">{project.client}</span>{" "}
                  {project.brief ??
                    "sought a refined communications and digital engagement strategy designed to make complex data, mission priorities, and creative storytelling immediately impactful and accessible."}
                </p>
              </div>

              <div className="cs-brief__org-image">
                {contextImage ? (
                  <img
                    src={contextImage}
                    alt={`${project.name} context visual`}
                    className="cs-media-img"
                  />
                ) : (
                  <div className="cs-media-img cs-media-img--placeholder" style={{ background: gradient }}>
                    <span>{project.name}</span>
                  </div>
                )}
              </div>

              <div className="cs-brief__objective">
                <span className="cs-brief__label">The Objective &amp; Approach</span>
                <p className="cs-brief__lead">
                  “{project.objective ??
                    "Transforming high-level research and institutional initiatives into audience-focused narratives that drive measurable engagement."}
                  ”
                </p>
                <p>
                  {project.heroDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Strategic evolution (sticky rail) ────────────────────── */}
        <section className="cs-evolution" ref={evolutionRef}>
          <div className="cs-evolution__header">
            <h2 className="cs-evolution__heading">Strategic Evolution</h2>
            <p className="cs-evolution__intro">
              The project moved through structured phases from initial research to final rollout and measurement.
            </p>
          </div>

          <div className="cs-evolution__grid">
            <div className="cs-evolution__rail">
              <nav aria-label="Project phases" className="cs-rail">
                {project.phases.map((phase, index) => (
                  <a
                    key={phase.id}
                    href={`#phase-${phase.id}`}
                    className={`cs-rail-item${index === activePhase ? " is-active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = evolutionRef.current?.querySelector(`#phase-${phase.id}`);
                      target?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span className="cs-rail-dot" aria-hidden="true" />
                    <span className="cs-rail-label">{phase.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="cs-evolution__content">
              {project.phases.map((phase, index) => (
                <div key={phase.id} id={`phase-${phase.id}`} className="cs-phase">
                  <div className="cs-phase__text">
                    <span className="cs-phase__date">{phase.date}</span>
                    <h3 className="cs-phase__title">{phase.title}</h3>
                    <p className="cs-phase__desc">{phase.description}</p>
                  </div>
                  <div className="cs-phase__media">
                    {project.detailVideo && index === 0 ? (
                      <video
                        src={project.detailVideo}
                        muted
                        playsInline
                        loop
                        autoPlay
                        className="cs-media-img"
                      />
                    ) : phaseMedia.length > 0 ? (
                      <img
                        src={phaseMedia[index % phaseMedia.length]}
                        alt={phase.title}
                        className="cs-media-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="cs-media-img cs-media-img--placeholder" style={{ background: gradient }}>
                        <span>{phase.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Selected outputs gallery ─────────────────────────────── */}
        {galleryImages.length > 0 && (
          <section className="cs-gallery" aria-label="Project visual gallery">
            <div className="cs-gallery__header">
              <h2>Selected Outputs</h2>
              <span>{project.categories.join(" · ")}</span>
            </div>
            <div className="cs-gallery__grid">
              {galleryImages.map((imgUrl, idx) => (
                <div key={idx} className={`cs-gallery__item cs-gallery__item--${idx + 1}`}>
                  <img
                    src={imgUrl}
                    alt={`${project.name} gallery image ${idx + 1}`}
                    className="cs-gallery__img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Impact metrics + quote ───────────────────────────────── */}
        {(project.results?.length || project.quote) && (
          <section className="cs-impact" aria-label="Results">
            {project.results && project.results.length > 0 && (
              <>
                <h2 className="cs-impact__heading">The Impact</h2>
                <div className="cs-impact__grid">
                  {project.results.map((result) => (
                    <div key={result.label} className="cs-impact__item">
                      <span className="cs-impact__value">{result.value}</span>
                      <span className="cs-impact__label">{result.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.quote && (
              <div className="cs-quote">
                <blockquote className="cs-quote__text">“{project.quote.text}”</blockquote>
                <cite className="cs-quote__author">— {project.quote.author}</cite>
              </div>
            )}
          </section>
        )}

        {/* ── Prev / next navigator ────────────────────────────────── */}
        <section className="cs-navigator">
          <Link href={`/work/${previousProject.slug}`} className="cs-nav-card cs-nav-card--prev">
            <span className="cs-nav-card__direction">
              <span aria-hidden="true">←</span> Previous
            </span>
            <span className="cs-nav-card__title">{previousProject.name}</span>
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="cs-nav-card cs-nav-card--next">
            <span className="cs-nav-card__direction">
              Next <span aria-hidden="true">→</span>
            </span>
            <span className="cs-nav-card__title">{nextProject.name}</span>
          </Link>
        </section>

        <footer className="footer">
          <p>
            © {siteConfig.copyrightStartYear} {siteConfig.legalName}
          </p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </footer>
      </main>

      {/* Slide Deck Modal */}
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
    </>
  );
}

export default CaseStudyPage;
