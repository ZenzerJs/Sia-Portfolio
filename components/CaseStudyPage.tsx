"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initCaseStudyAnimations } from "@/lib/caseStudy";
import { getNextProject, getPreviousProject, type Project } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

function GalleryPlaceholder({ label, gradient }: { label: string; gradient?: string }) {
  return (
    <div
      className="gallery-placeholder"
      style={{
        background: gradient ?? "linear-gradient(135deg, var(--accent-sky) 0%, var(--accent-lilac) 100%)",
      }}
    >
      {label}
    </div>
  );
}

export function CaseStudyPage({ project }: { project: Project }) {
  const [activePhase, setActivePhase] = useState(0);

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
  }, []);

  const gradient = project.media.gradient ?? `linear-gradient(135deg, var(--accent-sky) 0%, var(--accent-lilac) 100%)`;

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main id="main-content" className="case-study-page">
        {/* Hero */}
        <section className="case-study-hero">
          <div className="case-study-hero__grid">
            <div className="case-study-hero__content">
              <span className="case-study-hero__tag">{project.tagline}</span>
              <h1 className="case-study-hero__title">{project.title}</h1>
              <p className="case-study-hero__description">{project.heroDescription}</p>
            </div>
            <div className="case-study-hero__meta">
              <ul className="case-study-hero__meta-list">
                <li className="case-study-hero__meta-row">
                  <span className="case-study-hero__meta-label">Role</span>
                  <span className="case-study-hero__meta-value">{project.role}</span>
                </li>
                <li className="case-study-hero__meta-row">
                  <span className="case-study-hero__meta-label">Timeline</span>
                  <span className="case-study-hero__meta-value">{project.timeline}</span>
                </li>
                <li className="case-study-hero__meta-row">
                  <span className="case-study-hero__meta-label">Tools</span>
                  <span className="case-study-hero__meta-value">{project.tools}</span>
                </li>
                <li className="case-study-hero__meta-row">
                  <span className="case-study-hero__meta-label">Client</span>
                  <span className="case-study-hero__meta-value">{project.client}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="case-study-hero__media">
            <div
              className="work-slider__media work-slider__media--placeholder"
              style={{ background: gradient }}
            >
              <span className="work-slider__placeholder-text">{project.name}</span>
            </div>
          </div>
        </section>

        {/* Before / after comparison (scroll-scrubbed) */}
        {project.beforeAfter && (
          <BeforeAfterSlider
            before={project.beforeAfter.before}
            after={project.beforeAfter.after}
            beforeLabel={project.beforeAfter.beforeLabel}
            afterLabel={project.beforeAfter.afterLabel}
          />
        )}

        {/* Context: client + problem */}
        <section className="case-study-context">
          <div className="case-study-context__grid">
            <div className="case-study-context__client">
              <p className="case-study-context__label">The client</p>
              <p>
                <span className="case-study-context__highlight">{project.client}</span>{" "}
                came to me wanting a digital presence that felt as considered as the
                work they do — something with clarity, warmth, and a point of view.
              </p>
            </div>
            <div className="case-study-context__client-image">
              <GalleryPlaceholder label={project.name} gradient={gradient} />
            </div>
            <p className="case-study-context__label case-study-context__label--problem">
              The problem
            </p>
            <div className="case-study-context__problem-text">
              <p className="case-study-context__problem-lead">
                “The old site didn&apos;t feel like us — it was quiet, generic, and
                didn&apos;t communicate the craft behind the work.”
              </p>
              <p>
                We needed to rebuild around the brand&apos;s real voice: a site that
                leads with story, moves with intent, and makes every visit feel
                authored rather than templated.
              </p>
            </div>
          </div>
        </section>

        {/* Design evolution */}
        <section className="case-study-evolution">
          <div className="case-study-evolution__grid">
            <h2 className="case-study-evolution__heading">Design evolution</h2>
            <p className="case-study-evolution__intro">
              The project moved through four phases, from first conversation to
              final build.
            </p>

            <div className="case-study-evolution__timeline">
              {project.phases.map((phase, index) => (
                <button
                  key={phase.id}
                  type="button"
                  className={`case-study-evolution__phase${
                    index === activePhase ? " is-active" : ""
                  }`}
                  data-phase={index + 1}
                  aria-selected={index === activePhase}
                  onClick={() => setActivePhase(index)}
                >
                  <span className="case-study-evolution__dot" />
                  <span className="case-study-evolution__phase-label">{phase.label}</span>
                </button>
              ))}
            </div>

            <div className="case-study-evolution__content">
              {project.phases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`case-study-evolution__phase-content${
                    index === activePhase ? " is-visible" : ""
                  }`}
                  data-phase={index + 1}
                >
                  <p className="case-study-evolution__phase-date">{phase.date}</p>
                  <h3 className="case-study-evolution__phase-title">{phase.title}</h3>
                  <p>{phase.description}</p>
                </div>
              ))}
            </div>

            <div className="case-study-evolution__media">
              <div className="case-study-evolution__screen" style={{ background: gradient }}>
                {project.detailVideo ? (
                  <video muted playsInline loop autoPlay src={project.detailVideo} />
                ) : (
                  <span className="case-study-evolution__screen-label">
                    {project.phases[activePhase].title}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="case-study-gallery" aria-label="Project gallery">
          <div className="case-study-gallery__item case-study-gallery__item--1">
            <GalleryPlaceholder label="01" gradient={gradient} />
          </div>
          <div className="case-study-gallery__item case-study-gallery__item--2">
            <GalleryPlaceholder label={project.name} gradient={gradient} />
          </div>
          <div className="case-study-gallery__item case-study-gallery__item--3">
            <GalleryPlaceholder label="03" gradient={gradient} />
          </div>
          <div className="case-study-gallery__item case-study-gallery__item--4">
            <GalleryPlaceholder label="04" gradient={gradient} />
          </div>
          <div className="case-study-gallery__item case-study-gallery__item--5">
            <GalleryPlaceholder label="05" gradient={gradient} />
          </div>
        </section>

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section className="case-study-results" aria-label="Results">
            <div className="case-study-results__grid">
              <h2 className="case-study-results__heading">The results</h2>
              {project.results.map((result) => (
                <div key={result.label} className="case-study-results__item">
                  <div className="case-study-results__value">{result.value}</div>
                  <div className="case-study-results__label">{result.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client quote */}
        {project.quote && (
          <section className="case-study-quote" aria-label="Client quote">
            <div className="case-study-quote__grid">
              <blockquote className="case-study-quote__text">
                “{project.quote.text}”
                <cite className="case-study-quote__author">{project.quote.author}</cite>
              </blockquote>
            </div>
          </section>
        )}

        {/* Next / previous projects */}
        <section className="next-projects">
          <Link href={`/work/${previousProject.slug}`} className="project-card">
            <div className="project-thumbnail">
              <GalleryPlaceholder label={previousProject.name} gradient={previousProject.media.gradient} />
            </div>
            <h3>← {previousProject.name}</h3>
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="project-card" style={{ textAlign: "right" }}>
            <div className="project-thumbnail">
              <GalleryPlaceholder label={nextProject.name} gradient={nextProject.media.gradient} />
            </div>
            <h3>{nextProject.name} →</h3>
          </Link>
        </section>

        <footer className="footer">
          <p>
            © {siteConfig.copyrightStartYear} {siteConfig.legalName}
          </p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </footer>
      </main>
    </>
  );
}

export default CaseStudyPage;
