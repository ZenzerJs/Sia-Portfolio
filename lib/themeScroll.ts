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
    color: "#F0EFE9",
    "--text-dark": "#F0EFE9",
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

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    brandLogoTween.scrollTrigger?.kill();
    brandLogoTween.kill();
  };
}