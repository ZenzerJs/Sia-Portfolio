"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

/**
 * 3D CSS MacBook Pro built from pure HTML/CSS elements (lid, Apple logo,
 * screen, keyboard, base, screws) — the portfolio showreel plays inside the
 * laptop screen. Automatically opens when scrolled into view from above or
 * below, and closes when leaving the viewport.
 */
export function MacbookLaptop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    const lid = lidRef.current;
    if (!root || !lid) return;

    // Automatically open when becoming visible from above or below, and close when exiting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          lid.classList.toggle("is-open", entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="work__macbook cursor-pointer select-none"
      ref={rootRef}
      onClick={() => router.push("/work")}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") router.push("/work");
      }}
      aria-label="Explore Selected Work"
    >
      <div className="macbook-scene">
        <div className="laptop">
          <div className="lid" ref={lidRef}>
            <div className="top">
              <svg
                id="apple"
                viewBox="0 0 128 128"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M118.667 93.913c-2.985 6.653-4.421 9.626-8.267 15.519-5.364 8.226-12.928 18.469-22.309 18.545-8.327.09-10.474-5.457-21.778-5.389-11.304.06-13.661 5.494-22.002 5.411-9.374-.083-16.541-9.325-21.905-17.551C7.399 87.463 5.82 60.481 15.074 46.128c6.583-10.191 16.967-16.151 26.723-16.151 9.928 0 16.174 5.479 24.396 5.479 7.975 0 12.83-5.494 24.314-5.494 8.693 0 17.903 4.764 24.456 12.983-21.486 11.846-18.007 42.711 3.704 50.968zM81.799 20.78C85.974 15.391 89.138 7.775 87.994 0c-6.823.474-14.798 4.839-19.451 10.529-4.242 5.155-7.728 12.825-6.367 20.268 7.459.234 15.157-4.237 19.623-10.017z"
                  fill="#fff"
                />
              </svg>
            </div>

            <div className="facet front"></div>
            <div className="facet back"></div>
            <div className="facet left"></div>
            <div className="facet right"></div>

            <span className="corner fl"></span>
            <span className="corner bl"></span>
            <span className="corner ll"></span>
            <span className="corner rl"></span>

            <div className="inner">
              <span className="camera"></span>

              <Link
                href="/work"
                className="screen block relative cursor-pointer"
                aria-label="Selected work showreel"
              >
                <video
                  className="work__laptop-video pointer-events-none"
                  preload="auto"
                  muted
                  playsInline
                  loop
                  autoPlay
                  aria-label={siteConfig.showreel.title}
                  src={siteConfig.showreel.src}
                />
              </Link>

              <div className="text">MacBook Pro</div>
            </div>
          </div>

          <div className="base">
            <span className="hinges"></span>

            <span className="speakers left"></span>
            <span className="speakers right"></span>

            <div className="keyboard-container">
              <div className="keyboard">
                <div className="keyboard-row thin">
                  {Array.from({ length: 14 }, (_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                </div>

                <div className="keyboard-row">
                  {Array.from({ length: 14 }, (_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                </div>

                <div className="keyboard-row">
                  <div className="key caps"></div>
                  {Array.from({ length: 11 }, (_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                  <div className="key enter"></div>
                </div>

                <div className="keyboard-row">
                  <div className="key shift left"></div>
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                  <div className="key shift right"></div>
                </div>

                <div className="keyboard-row">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                  <div className="key space"></div>
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                  <div className="key arrows">
                    <span className="up"></span>
                    <span className="down"></span>
                    <span className="left"></span>
                    <span className="right"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="trackpad"></div>

            <div className="notch"></div>

            <div className="screws">
              {/* Left side */}
              <i className="screw rl"></i>
              <i className="screw ml"></i>
              <i className="screw fl"></i>

              {/* Front side */}
              <i className="screw fml"></i>
              <i className="screw fmr"></i>

              {/* Rear side */}
              <i className="screw rml"></i>
              <i className="screw rmr"></i>

              {/* Right side */}
              <i className="screw rr"></i>
              <i className="screw mr"></i>
              <i className="screw fr"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacbookLaptop;
