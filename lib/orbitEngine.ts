import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Phase C: Real-Time Trigonometric Orbit Engine (Scroll-Driven with Ambient Handoff)
 * Shapes converge into orbit on scroll while Hero content remains permanently visible on the Hero section.
 */
export function initOrbitEngine(): () => void {
  if (typeof window === "undefined") return () => {};

  if (window.innerWidth <= 768) {
    return () => {};
  }

  // Accessibility: with reduced motion the hero content crossfades on scroll
  // (opacity only — no blur/drift), and autonomous ambient rotation is skipped.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const heroBackground = document.querySelector(".hero-background") as HTMLElement | null;
  const heroContent = document.querySelector(".hero-content") as HTMLElement | null;
  const headerCenter = document.querySelector(".header-center") as HTMLElement | null;
  const expertiseSection = document.querySelector("#expertise") as HTMLElement | null;
  const expertiseRing = document.querySelector(".expertise-ring") as HTMLElement | null;
  const expertiseCenterText = document.querySelector(".expertise-center-text") as HTMLElement | null;

  const circleLeft = document.getElementById("shape-circle-left");
  const circleRight = document.getElementById("shape-circle-right");
  const circleBottom = document.getElementById("shape-circle-bottom");

  const labelLeft = circleLeft?.querySelector(".shape-label") as HTMLElement | null;
  const labelRight = circleRight?.querySelector(".shape-label") as HTMLElement | null;
  const labelBottom = circleBottom?.querySelector(".shape-label") as HTMLElement | null;

  if (!heroBackground || !expertiseSection || !circleLeft || !circleRight || !circleBottom) {
    return () => {};
  }

  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  let orbitRadius = Math.min(window.innerWidth * 0.25, window.innerHeight * 0.28, 260);

  // Capture un-transformed base offsets
  const leftBaseRect = circleLeft.getBoundingClientRect();
  const rightBaseRect = circleRight.getBoundingClientRect();
  const bottomBaseRect = circleBottom.getBoundingClientRect();

  const leftStartCenterX = leftBaseRect.left + leftBaseRect.width / 2;
  const leftStartCenterY = leftBaseRect.top + leftBaseRect.height / 2;
  const leftStartAngle = Math.atan2(leftStartCenterY - centerY, leftStartCenterX - centerX);
  const leftStartDist = Math.hypot(leftStartCenterX - centerX, leftStartCenterY - centerY);

  const rightStartCenterX = rightBaseRect.left + rightBaseRect.width / 2;
  const rightStartCenterY = rightBaseRect.top + rightBaseRect.height / 2;
  const rightStartAngle = Math.atan2(rightStartCenterY - centerY, rightStartCenterX - centerX);
  const rightStartDist = Math.hypot(rightStartCenterX - centerX, rightStartCenterY - centerY);

  const bottomStartCenterX = bottomBaseRect.left + bottomBaseRect.width / 2;
  const bottomStartCenterY = bottomBaseRect.top + bottomBaseRect.height / 2;
  const bottomStartAngle = Math.atan2(bottomStartCenterY - centerY, bottomStartCenterX - centerX);
  const bottomStartDist = Math.hypot(bottomStartCenterX - centerX, bottomStartCenterY - centerY);

  // 120-degree locked angles
  const baseLockedAngle = -Math.PI * 0.85;
  const targetAngleLeft = baseLockedAngle;
  const targetAngleRight = baseLockedAngle + (2 * Math.PI) / 3;
  const targetAngleBottom = baseLockedAngle + (4 * Math.PI) / 3;

  const applyTrigTransform = (progress: number, ambientExtraAngle: number = 0) => {
    const t = Math.max(0, Math.min(1, progress));

    // 0. Hero text + header meta fade/drift down as scrolling begins — mirrors
    //    the original site's scrubbed heroContent tween over the first ~20%.
    if (heroContent) {
      const fadeT = Math.max(0, Math.min(t / 0.2, 1));
      const eased = 1 - Math.pow(1 - fadeT, 2); // power1.out
      if (prefersReducedMotion) {
        // Reduced motion: fade only, no positional/blur movement.
        gsap.set(heroContent, { opacity: 1 - eased, y: 0, filter: "none" });
      } else {
        gsap.set(heroContent, {
          opacity: 1 - eased,
          y: 100 * eased,
          filter: eased > 0 ? `blur(${(20 * eased).toFixed(2)}px)` : "none",
        });
      }
    }

    // Header tag + location leave with the hero content (same fade/blur/drift).
    if (headerCenter) {
      const fadeT = Math.max(0, Math.min(t / 0.2, 1));
      const eased = 1 - Math.pow(1 - fadeT, 2); // power1.out
      if (prefersReducedMotion) {
        gsap.set(headerCenter, { opacity: 1 - eased, y: 0, filter: "none" });
      } else {
        gsap.set(headerCenter, {
          opacity: 1 - eased,
          y: 60 * eased,
          filter: eased > 0 ? `blur(${(10 * eased).toFixed(2)}px)` : "none",
        });
      }
    }

    // 1. Shapes Convergence & Orbit
    // [0.0 -> 0.20]: Resting explosion layout
    // [0.20 -> 0.55]: Smoothly blend into locked 120-deg ring
    // [0.55 -> 0.85]: 120-deg orbital rotation
    let spacingBlend = 0;
    if (t > 0.20) {
      spacingBlend = Math.min((t - 0.20) / 0.35, 1);
    }
    const easedSpacing = Math.pow(spacingBlend, 2);

    const orbitTurns = 0.6 * (2 * Math.PI);
    const orbitAngle = (t > 0.55 ? ((t - 0.55) / 0.30) * orbitTurns : 0) + ambientExtraAngle;

    const angleL = (1 - easedSpacing) * leftStartAngle + easedSpacing * (targetAngleLeft + orbitAngle);
    const angleR = (1 - easedSpacing) * rightStartAngle + easedSpacing * (targetAngleRight + orbitAngle);
    const angleB = (1 - easedSpacing) * bottomStartAngle + easedSpacing * (targetAngleBottom + orbitAngle);

    const distL = (1 - easedSpacing) * leftStartDist + easedSpacing * orbitRadius;
    const distR = (1 - easedSpacing) * rightStartDist + easedSpacing * orbitRadius;
    const distB = (1 - easedSpacing) * bottomStartDist + easedSpacing * orbitRadius;

    const curXL = centerX + Math.cos(angleL) * distL - leftStartCenterX;
    const curYL = centerY + Math.sin(angleL) * distL - leftStartCenterY;

    const curXR = centerX + Math.cos(angleR) * distR - rightStartCenterX;
    const curYR = centerY + Math.sin(angleR) * distR - rightStartCenterY;

    const curXB = centerX + Math.cos(angleB) * distB - bottomStartCenterX;
    const curYB = centerY + Math.sin(angleB) * distB - bottomStartCenterY;

    // Circle axial spin
    const spinProgress = Math.max(0, (t - 0.30) / 0.55);
    const spinL = spinProgress * 300;
    const spinR = spinProgress * 270;
    const spinB = spinProgress * 140;

    gsap.set(circleLeft, { x: curXL, y: curYL, rotation: spinL });
    gsap.set(circleRight, { x: curXR, y: curYR, rotation: spinR });
    gsap.set(circleBottom, { x: curXB, y: curYB, rotation: spinB });

    // 1b. "My design practice" ring stays centered behind its label. The
    //     blurred gradient glow + line-work no longer track the orbiting
    //     assets, so the outline sits exactly behind the centered text.
    if (expertiseRing) {
      gsap.set(expertiseRing, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
      });
    }

    // 2. Label Counter-Rotation & Opacity
    const labelOpacity = Math.max(0, Math.min(1, (t - 0.40) * 3.5));
    if (labelLeft) gsap.set(labelLeft, { rotation: -spinL, opacity: labelOpacity });
    if (labelRight) gsap.set(labelRight, { rotation: -spinR, opacity: labelOpacity });
    if (labelBottom) gsap.set(labelBottom, { rotation: -spinB, opacity: labelOpacity });

    // 3. Secondary shapes disperse on scroll (astrix mirrors the original
    //    site: it drifts up and grows while the hero content leaves)
    const disperseP = Math.max(0, (t - 0.15) / 0.5);
    gsap.set("#shape-starburst", { x: -disperseP * 160, y: -disperseP * 50, opacity: 1 - disperseP * 1.5 });
    gsap.set("#shape-leaf", { x: disperseP * 200, rotation: -180 + disperseP * 90, opacity: 1 - disperseP * 1.5 });
    gsap.set("#shape-astrix-2", { x: disperseP * 140, y: disperseP * 120, opacity: 1 - disperseP * 1.5 });
    gsap.set("#shape-astrix", {
      x: -20 * disperseP,
      y: -400 * disperseP,
      scale: 1 + 0.5 * disperseP,
      opacity: 1 - disperseP * 1.5,
    });

    // 4. Expertise Ring Fades In on Scroll ([0.35 -> 0.65])
    const setRingOpacity = (value: string) => {
      if (expertiseRing) expertiseRing.style.opacity = value;
      if (expertiseCenterText) expertiseCenterText.style.opacity = value;
    };
    if (expertiseRing || expertiseCenterText) {
      if (t < 0.35) {
        setRingOpacity("0");
      } else if (t < 0.65) {
        const ringP = (t - 0.35) / 0.30;
        setRingOpacity(ringP.toFixed(3));
      } else if (t < 0.85) {
        setRingOpacity("1");
      } else {
        const exitP = (t - 0.85) / 0.15;
        setRingOpacity((1 - exitP).toFixed(3));
      }
    }

    // 5. Hero Background Fade Out on Exit (Fully completes before the bottom)
    if (t > 0.72) {
      const raw = Math.min(1, (t - 0.72) / 0.18);
      const easedDecay = 1 - Math.pow(1 - raw, 1.5);
      heroBackground.style.opacity = Math.max(0, 1 - easedDecay).toFixed(3);
    } else {
      heroBackground.style.opacity = "1";
    }
  };

  const st = ScrollTrigger.create({
    trigger: "#home",
    start: "top top",
    end: "bottom top",
    pin: heroBackground,
    pinSpacing: false,
    anticipatePin: 1,
    scrub: 1,
    onUpdate: (self) => {
      applyTrigTransform(self.progress, 0);
    },
    onLeave: () => {
      // Once the scroll leaves the hero zone hold the fully-scrubbed end state
      applyTrigTransform(1, 0);
    },
  });

  // Set initial 0 progress state
  applyTrigTransform(0, 0);

  const onResize = () => {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
    orbitRadius = Math.min(window.innerWidth * 0.25, window.innerHeight * 0.28, 260);
    ScrollTrigger.refresh();
  };

  window.addEventListener("resize", onResize);

  return () => {
    st.kill();
    window.removeEventListener("resize", onResize);
  };
}
