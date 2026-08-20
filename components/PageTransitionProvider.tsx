"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resetBodyTheme } from "@/lib/themeScroll";
import { resetScrollToTop } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Curtain slide overlay coordinator for route-to-route navigation.
 *
 * On every pathname change (except the first render) the dark-green curtain
 * slides up from the bottom to cover the viewport, then continues up to reveal
 * the freshly-mounted page. Scroll is reset to the top and any #hash target is
 * scrolled into view once the curtain clears.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const curtain = curtainRef.current;
    if (!curtain) return;

    // Any page that scrubbed <body> to a dark theme (the home contact section)
    // must be reset here as well, so the incoming route starts on a clean light
    // canvas instead of inheriting the previous page's navy background.
    resetBodyTheme();

    // Reset scroll state immediately for the incoming page.
    resetScrollToTop();

    // Establish a clean baseline: the stylesheet's `transform: translateY(100%)`
    // is parsed by GSAP as a percentage `y`, which would otherwise stack on top
    // of the `yPercent` tweens below and double-translate the curtain. Pinning
    // `y: 0` to an explicit pixel value keeps the whole timeline in `yPercent`.
    gsap.set(curtain, { y: 0, yPercent: 100, autoAlpha: 1, force3D: true });
    const tl = gsap.timeline({
      onComplete: () => {
        resetScrollToTop();
        gsap.set(curtain, { y: 0, yPercent: 100, autoAlpha: 0 });
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
        // Honor any #hash target on the destination page.
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          requestAnimationFrame(() => {
            const el = document.getElementById(hash.slice(1));
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        }
      },
    });
    tl.to(curtain, {
      yPercent: 0,
      duration: 0.6,
      ease: "power3.out",
      force3D: true,
    }).to(curtain, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
      force3D: true,
      delay: 0.15,
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      {children}
      <div ref={curtainRef} className="page-transition-curtain" aria-hidden="true" />
    </>
  );
}

export default PageTransitionProvider;
