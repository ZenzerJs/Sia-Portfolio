import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Case study page motion: staggered fade-up reveals for the hero, context,
 * gallery, evolution, and next-project cards.
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
    start = "top 75%"
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

  reveal(".case-study-hero__grid", { y: 40 }, ".case-study-hero");
  reveal(".case-study-hero__media", { y: 60, scale: 0.97 }, ".case-study-hero__media", "top 80%");
  reveal(".case-study-context__grid", { y: 40 }, ".case-study-context", "top 70%");
  reveal(".case-study-evolution__grid", { y: 30 }, ".case-study-evolution", "top 70%");
  reveal(".case-study-evolution__media", { y: 50 }, ".case-study-evolution__media", "top 80%");

  gsap.utils.toArray<HTMLElement>(".case-study-gallery__item").forEach((item, index) => {
    reveal(item, { y: 30, delay: 0.08 * index }, ".case-study-gallery", "top 70%");
  });

  gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
    reveal(card, { y: 40, delay: 0.1 * index }, ".next-projects", "top 80%");
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
