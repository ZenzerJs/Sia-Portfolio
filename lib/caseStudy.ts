import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Case study page motion: staggered fade-up reveals for the masthead, hero
 * media, brief, evolution phases, gallery, and navigator cards.
 */
export function initCaseStudyAnimations(): () => void {
  if (typeof window === "undefined") return () => {};

  const page = document.querySelector(".case-study-page");
  if (!page) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const cleanups: Array<() => void> = [];

  const reveal = (
    targets: string | Element,
    vars: gsap.TweenVars = {},
    trigger?: string | Element,
    start = "top 80%"
  ) => {
    const tween = gsap.from(targets, {
      opacity: 0,
      y: 36,
      duration: 0.9,
      ease: "power2.out",
      ...vars,
      scrollTrigger: {
        trigger: trigger ?? targets,
        start,
        toggleActions: "play none none none",
      },
    });
    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  };

  reveal(".cs-masthead__content", { y: 40 }, ".cs-masthead");
  reveal(".cs-masthead__meta", { y: 40, delay: 0.1 }, ".cs-masthead");
  reveal(".cs-hero-media__frame", { y: 60, scale: 0.98 }, ".cs-hero-media", "top 85%");
  reveal(".cs-brief__grid", { y: 40 }, ".cs-brief", "top 70%");
  reveal(".cs-evolution__header", { y: 30 }, ".cs-evolution", "top 70%");

  gsap.utils.toArray<HTMLElement>(".cs-phase").forEach((item, index) => {
    reveal(item, { y: 40, delay: 0.06 * index }, ".cs-evolution__content", "top 75%");
  });

  gsap.utils.toArray<HTMLElement>(".cs-gallery__item").forEach((item, index) => {
    reveal(item, { y: 30, delay: 0.08 * index }, ".cs-gallery", "top 75%");
  });

  gsap.utils.toArray<HTMLElement>(".cs-nav-card").forEach((card, index) => {
    reveal(card, { y: 40, delay: 0.1 * index }, ".cs-navigator", "top 85%");
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
