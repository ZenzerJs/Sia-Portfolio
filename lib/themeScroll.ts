import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dynamic Theme Inversion on Scroll for Contact Section
 *
 * As `#contact` enters the viewport the theme flips: page background and the
 * `--text-dark` / `--bg-light` design tokens are scrubbed to light-on-dark, so
 * every element that draws from a token (headings, paragraphs, borders, links,
 * cursor dot, footer) inverts together — no element is left dark-on-dark.
 */
export function initThemeScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  const contactSection = document.getElementById("contact");
  if (!contactSection) return () => {};

  const tween = gsap.to("body", {
    backgroundColor: "#112239",
    color: "#FFFFFF",
    "--text-dark": "#FFFFFF",
    "--bg-light": "#112239",
    "--text-muted": "rgba(255, 255, 255, 0.7)",
    ease: "none",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 40%",
      end: "top 10%",
      scrub: 0.3,
    },
  });

  // Also invert brand logos and monogram icons when entering contact dark theme
  const logoTween = gsap.to(".brand-logo, .brand", {
    filter: "brightness(0) invert(1)",
    ease: "none",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 40%",
      end: "top 10%",
      scrub: 0.3,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    logoTween.scrollTrigger?.kill();
    logoTween.kill();

    // If the scrub left <body> in a dark state (e.g. the visitor navigated away
    // while scrolled to #contact), restore the default light theme so the next
    // route doesn't inherit an inverted navy canvas and near-white text.
    resetBodyTheme();
  };
}

/**
 * Restore the default light theme on <body> and clear the brand-logo inversion
 * applied by `initThemeScroll`. Safe to call on any route; it only removes the
 * inline styles GSAP set, letting the stylesheet defaults (`:root` tokens) take
 * over again.
 */
export function resetBodyTheme(): void {
  if (typeof document === "undefined") return;

  const body = document.body;
  body.style.removeProperty("background-color");
  body.style.removeProperty("color");
  body.style.removeProperty("--text-dark");
  body.style.removeProperty("--bg-light");
  body.style.removeProperty("--text-muted");

  document
    .querySelectorAll<HTMLElement>(".brand-logo, .brand, .contact-monogram-img, .footer-monogram-img")
    .forEach((el) => el.style.removeProperty("filter"));
}