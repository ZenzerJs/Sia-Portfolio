import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis Smooth Scroll Engine synchronized with GSAP ScrollTrigger
 */
export function initSmoothScroll(): { lenis: Lenis; cleanup: () => void } {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  const cleanup = () => {
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
  };

  return { lenis, cleanup };
}
