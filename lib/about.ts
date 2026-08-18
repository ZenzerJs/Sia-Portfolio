import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * About page motion: hero heading zoom + staggered scroll reveals for the
 * portrait collage, stats, experience, interests, and contact sections.
 */
export function initAboutAnimations(): () => void {
  if (typeof window === "undefined") return () => {};

  const page = document.querySelector(".about-page");
  if (!page) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hero = document.querySelector<HTMLElement>(".about-hero");
  const heading = document.querySelector<HTMLElement>(".about-hero__heading");

  if (reduced) {
    return () => {};
  }

  const cleanups: Array<() => void> = [];

  // Entrance: hero fades up, heading de-blurs.
  // A subtle 1.15x start keeps the settle-zoom feel while the full headline
  // stays readable on screen (2.5x previously sliced the text at the
  // viewport edges, badly on mobile).
  if (hero && heading) {
    const startScale = window.innerWidth <= 768 ? 1 : 1.15;
    gsap.set(heading, { transformOrigin: "center center", scale: startScale });
    const intro = gsap.timeline();
    intro
      .fromTo(hero, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power1.inOut" }, 0)
      .fromTo(
        heading,
        { y: 90, filter: "blur(28px)" },
        { y: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
        0
      );
    cleanups.push(() => intro.kill());

    // Scroll zoom: heading settles from its entrance scale to 1x as the
    // hero scrolls away.
    const zoom = gsap.to(heading, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    cleanups.push(() => {
      zoom.scrollTrigger?.kill();
      zoom.kill();
    });
  }

  const reveal = (
    targets: string | Element,
    vars: gsap.TweenVars = {},
    trigger?: string | Element,
    start = "top 75%"
  ) => {
    const tween = gsap.from(targets, {
      opacity: 0,
      y: 30,
      duration: 0.8,
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

  reveal(".about-intro__image-selfie-2", { y: 40, rotate: 6, scale: 0.95 }, ".about-intro");
  reveal(".about-intro__image-shape-burst", { scale: 0.9, x: -20 }, ".about-intro", "top 70%");
  reveal(".about-intro__title", { x: 30 }, ".about-intro__title");
  gsap.utils.toArray<HTMLElement>(".about-intro__text p").forEach((p, i) => {
    reveal(p, { y: 20, delay: 0.08 * i }, ".about-intro__text", "top 70%");
  });
  gsap.utils.toArray<HTMLElement>(".about-intro__stat").forEach((stat, i) => {
    reveal(stat, { y: 34, ease: "back.out(1.2)", delay: 0.15 * i }, ".about-intro__stats");
  });
  reveal(".about-experience__heading", { y: 30 }, ".about-experience__heading");
  gsap.utils.toArray<HTMLElement>(".about-experience__item").forEach((item, i) => {
    reveal(item, { x: -20, delay: 0.05 * i }, ".about-experience__grid", "top 70%");
  });
  reveal(".about-interests__heading", { y: 30 }, ".about-interests__heading");
  gsap.utils.toArray<HTMLElement>(".about-interests__content p").forEach((p, i) => {
    reveal(p, { x: -15, delay: 0.05 * i }, ".about-interests__content", "top 75%");
  });
  reveal(".about-contact__heading", { y: 30 }, ".about-contact__heading");
  reveal(".about-contact__content", { y: 20 }, ".about-contact__content", "top 75%");

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
