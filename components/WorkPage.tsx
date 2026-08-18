"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { CursorDot } from "./CursorDot";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { initCursor } from "@/lib/cursor";
import { initWorkSlider } from "@/lib/workSlider";
import { projects } from "@/lib/projects";

export function WorkPage() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const { lenis, cleanup: cleanupScroll } = initSmoothScroll();
    const cleanupCursor = initCursor();
    const cleanupSlider = initWorkSlider(lenis);

    return () => {
      cleanupScroll();
      cleanupCursor();
      cleanupSlider();
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <CursorDot />

      <main id="main-content" className="work-page">
        {/* Intro */}
        <section className="work-intro">
          <div className="work-intro__container">
            <h1 className="work-intro__heading">Selected work</h1>
            <p className="work-intro__description">
              Websites for brands that want to be felt, not just seen — from
              copywriters to healthcare platforms.
            </p>
          </div>
        </section>

        {/* Slider */}
        <section className="work-slider" aria-label="Featured projects">
          <div className="work-slider__laptop">
            <div className="work-slider__media-container">
              {projects.map((project, index) =>
                project.media.type === "video" ? (
                  <video
                    key={project.slug}
                    className="work-slider__media"
                    data-project={index + 1}
                    preload="auto"
                    muted
                    playsInline
                    loop
                    autoPlay
                    src={project.media.src}
                  />
                ) : (
                  <div
                    key={project.slug}
                    className="work-slider__media work-slider__media--placeholder"
                    data-project={index + 1}
                    style={{ background: project.media.gradient }}
                  >
                    <span className="work-slider__placeholder-text">{project.name}</span>
                  </div>
                )
              )}
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
                  <h2 className="work-slider__title">{project.title}</h2>
                  <div className="work-slider__meta">
                    {project.categories.map((category) => (
                      <span key={category} className="work-slider__tag">
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className="work-slider__description">{project.description}</p>
                  <Link href={`/work/${project.slug}`} className="work-slider__button">
                    View case study →
                  </Link>
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

        {/* Footer contact */}
        <footer className="footer" id="contact">
          <p>© 2026 Marimba. Designs</p>
          <a href="mailto:hello@marimba.design">hello@marimba.design</a>
        </footer>
      </main>
    </>
  );
}

export default WorkPage;
