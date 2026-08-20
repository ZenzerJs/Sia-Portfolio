import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function resetScrollToTop() {
  if (typeof window === "undefined") return;
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const activeLenis = (window as unknown as { __activeLenis?: Lenis }).__activeLenis;
  if (activeLenis) {
    try {
      activeLenis.scrollTo(0, { immediate: true });
    } catch {}
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
}

/**
 * Lenis Smooth Scroll Engine synchronized with GSAP ScrollTrigger
 */
export function initSmoothScroll(): { lenis: Lenis; cleanup: () => void } {
  if (typeof window === "undefined") {
    return { lenis: null as unknown as Lenis, cleanup: () => {} };
  }

  // Ensure scroll is at 0 before starting smooth scroll on the incoming route
  resetScrollToTop();

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });

  (window as unknown as { __activeLenis?: Lenis }).__activeLenis = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  const cleanup = () => {
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
    if ((window as unknown as { __activeLenis?: Lenis }).__activeLenis === lenis) {
      delete (window as unknown as { __activeLenis?: Lenis }).__activeLenis;
    }
  };

  return { lenis, cleanup };
}
