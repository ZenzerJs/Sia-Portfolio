import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed before/after comparator.
 *
 * Scrubs the `--reveal` custom property (0% → 100% of the container width)
 * as the section crosses the viewport. The before layer's clip-path is driven
 * by that property, so the split follows the scrollbar. Reduced-motion users
 * get the static 50/50 split set in CSS.
 */
export function initBeforeAfter(container: HTMLElement): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const tween = gsap.fromTo(
    container,
    { "--reveal": "12%" },
    {
      "--reveal": "88%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 55%",
        scrub: 1,
      },
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}