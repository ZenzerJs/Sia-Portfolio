import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-pinned work slider.
 *
 * Each project media is revealed with a clip-path "curtain" while the counter,
 * content block, and pagination dots transition in sync. The slider is pinned
 * for `totalProjects * 100vh` of scroll, scrubbed so scrolling drives the loop.
 */
export function initWorkSlider(lenis?: Lenis): () => void {
  if (typeof window === "undefined") return () => {};

  const slider = document.querySelector<HTMLElement>(".work-slider");
  if (!slider) return () => {};

  const mediaEls = gsap.utils.toArray<HTMLElement>(".work-slider__media");
  const contentEls = gsap.utils.toArray<HTMLElement>(".work-slider__content");
  const counterEls = gsap.utils.toArray<HTMLElement>(".work-slider__counter-current");
  const dots = gsap.utils.toArray<HTMLElement>(".work-slider__dot");
  const backdropEls = gsap.utils.toArray<HTMLElement>(".work-slider__backdrop-item");

  const total = mediaEls.length;
  if (!total) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Initial states -------------------------------------------------------
  backdropEls.forEach((bg, index) => {
    gsap.set(bg, {
      opacity: index === 0 ? 1 : 0,
      scale: index === 0 ? 1 : 1.08,
      visibility: index === 0 ? "visible" : "hidden",
    });
  });

  mediaEls.forEach((media, index) => {
    gsap.set(media, {
      clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      scale: 1,
      zIndex: index + 1,
      visibility: "visible",
    });
  });

  contentEls.forEach((content, index) => {
    gsap.set(content, {
      opacity: index === 0 ? 1 : 0,
      visibility: index === 0 ? "visible" : "hidden",
      zIndex: index === 0 ? 10 : 1,
      pointerEvents: index === 0 ? "auto" : "none",
      y: 0,
    });
  });

  counterEls.forEach((counter, index) => {
    gsap.set(counter, {
      opacity: index === 0 ? 1 : 0,
      visibility: index === 0 ? "visible" : "hidden",
    });
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === 0);
    dot.style.setProperty("--fill-height", "0%");
  });

  const applyDotProgress = (progress: number) => {
    const adjusted = Math.max(0, progress * total);
    const currentIndex = Math.min(Math.floor(adjusted), total - 1);
    const indexProgress = adjusted - currentIndex;
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("is-active");
        dot.style.setProperty("--fill-height", `${Math.min(indexProgress * 100, 100)}%`);
      } else {
        dot.classList.remove("is-active");
        dot.style.setProperty("--fill-height", index < currentIndex ? "100%" : "0%");
      }
    });
  };

  // ---- Pinned scrubbed timeline --------------------------------------------
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: slider,
      start: "top top",
      end: () => "+=" + total * 100 + "%",
      pin: true,
      scrub: reduced ? 0 : 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyDotProgress(self.progress),
    },
  });

  if (!reduced) {
    // Hold the first slide, then cycle 1→2, 2→3, 3→4.
    for (let i = 0; i < total - 1; i++) {
      const pos = i + 1;
      const next = i + 1;

      // Backdrop transition
      if (backdropEls[i] && backdropEls[next]) {
        tl.to(backdropEls[i], { opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.inOut" }, pos);
        tl.set(backdropEls[i], { visibility: "hidden" }, pos + 0.8);
        tl.set(backdropEls[next], { visibility: "visible" }, pos);
        tl.fromTo(backdropEls[next], { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" }, pos);
      }

      // Media curtain reveal + settle.
      tl.to(mediaEls[next], { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, pos);
      tl.fromTo(mediaEls[next], { scale: 1.04 }, { scale: 1, duration: 1, ease: "power2.inOut" }, pos);

      // Counter crossfade.
      tl.to(counterEls[i], { opacity: 0, duration: 0.3, ease: "power2.in" }, pos);
      tl.set(counterEls[i], { visibility: "hidden" }, pos + 0.3);
      tl.set(counterEls[next], { visibility: "visible" }, pos + 0.3);
      tl.to(counterEls[next], { opacity: 1, duration: 0.3, ease: "power2.out" }, pos + 0.3);

      // Content block swap.
      tl.to(contentEls[i], { opacity: 0, y: -15, duration: 0.4, ease: "power2.in" }, pos);
      tl.set(contentEls[i], { visibility: "hidden", pointerEvents: "none", zIndex: 1 }, pos + 0.4);
      tl.set(contentEls[next], { visibility: "visible", zIndex: 10, y: 30 }, pos + 0.3);
      tl.to(contentEls[next], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, pos + 0.4);
      tl.set(contentEls[next], { pointerEvents: "auto" }, pos + 0.4);
    }
  }

  // ---- Pagination dot click navigation -------------------------------------
  const clickHandlers: Array<() => void> = [];
  dots.forEach((dot, index) => {
    const handler = () => {
      const st = tl.scrollTrigger;
      if (!st) return;
      const targetY = st.start + index * window.innerHeight;
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    };
    dot.addEventListener("click", handler);
    clickHandlers.push(handler);
  });

  return () => {
    dots.forEach((dot, index) => dot.removeEventListener("click", clickHandlers[index]));
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
