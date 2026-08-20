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
    backgroundColor: "#142A4A",
    color: "#FFFFFF",
    "--text-dark": "#FFFFFF",
    "--bg-light": "#1E3A5F",
    ease: "none",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 50%",
      end: "top+=40% 50%",
      scrub: 0.6,
    },
  });

  // Also invert brand logo brightness when entering contact dark theme
  const brandLogoTween = gsap.to(".brand-logo, .brand", {
    filter: "brightness(0) invert(1)",
    ease: "none",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 50%",
      end: "top+=40% 50%",
      scrub: 0.6,
    },
  });

  // Fade out ambient aurora & window light when transitioning into bottom navy section
  const auroraFadeTween = gsap.to(".aurora-glow-container", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 70%",
      end: "top 40%",
      scrub: 0.6,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    brandLogoTween.scrollTrigger?.kill();
    brandLogoTween.kill();
    auroraFadeTween.scrollTrigger?.kill();
    auroraFadeTween.kill();

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

  document
    .querySelectorAll<HTMLElement>(".brand-logo, .brand")
    .forEach((el) => el.style.removeProperty("filter"));

  document
    .querySelectorAll<HTMLElement>(".aurora-glow-container")
    .forEach((el) => el.style.removeProperty("opacity"));
}