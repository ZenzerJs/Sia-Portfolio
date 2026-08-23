import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Case study page animations:
 * Context-safe staggered reveals for the masthead, hero media, brief,
 * evolution phases, curated gallery, and navigation.
 */
export function initCaseStudyAnimations(container?: HTMLElement | null): () => void {
  if (typeof window === "undefined") return () => {};

  const page = container ?? document.querySelector<HTMLElement>(".case-study-page");
  if (!page) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const ctx = gsap.context(() => {
    // 1. Masthead entrance (fires immediately on mount)
    const mastheadContent = page.querySelector(".cs-masthead__content");
    const mastheadMeta = page.querySelector(".cs-masthead__meta");

    if (mastheadContent) {
      gsap.fromTo(
        mastheadContent,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    }
    if (mastheadMeta) {
      gsap.fromTo(
        mastheadMeta,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power2.out" }
      );
    }

    // 2. Hero media reveal
    const heroFrame = page.querySelector(".cs-hero-media__frame");
    if (heroFrame) {
      gsap.fromTo(
        heroFrame,
        { opacity: 0, scale: 0.98, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroFrame,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 3. Brief & Strategy reveal
    const briefGrid = page.querySelector(".cs-brief__grid");
    if (briefGrid) {
      gsap.fromTo(
        briefGrid,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: briefGrid,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 4. Strategic Evolution phases
    const phaseItems = page.querySelectorAll<HTMLElement>(".cs-phase");
    phaseItems.forEach((phase, index) => {
      gsap.fromTo(
        phase,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: (index % 2) * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: phase,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 5. Outputs & Gallery cards
    const outputCards = page.querySelectorAll<HTMLElement>(".cs-output__card, .cs-gallery__item");
    outputCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: (index % 3) * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 6. Impact section
    const impactSection = page.querySelector(".cs-impact");
    if (impactSection) {
      gsap.fromTo(
        impactSection,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: impactSection,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 7. Navigation cards
    const navCards = page.querySelectorAll<HTMLElement>(".cs-nav-card");
    navCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Force refresh triggers once layout settles
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, page);

  return () => {
    ctx.revert();
  };
}

