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
  // The footer is already self-contained with its dedicated #112239 background.
  // We keep body theme clean on the linen canvas so previous sections (Kind words / Testimonials)
  // never flash blue prematurely.
  resetBodyTheme();
  return () => {
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