import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fully remove the loader curtain from the page (pointer-events + layout). */
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
}

/** Restore the loader so a re-mount (e.g. React StrictMode) can animate it again. */
function restoreLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "";
}

/**
 * Phase A: Loader & Page Entrance Sequence
 * Phase B: Continuous Idle Spin Loops
 */
export function initHeroExplode(onComplete?: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  // Accessibility: users who prefer reduced motion get the content instantly —
  // no loader bar, curtain, blur, or shape explosion. Scroll-driven effects are
  // still staged afterwards so the page behaves the same once you scroll.
  const hasHash = typeof window !== "undefined" && Boolean(window.location.hash && window.location.hash.length > 1);
  const alreadyVisited = typeof window !== "undefined" && Boolean(sessionStorage.getItem("visited_home"));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || hasHash || alreadyVisited) {
    document.body.classList.remove("is-loading");
    hideLoader();
    gsap.set([".site-header", ".site-header__location", ".hero-content"], { clearProps: "all" });
    gsap.set(".hero-background", { opacity: 1 });
    ScrollTrigger.refresh();
    if (onComplete) onComplete();
    return () => {
      restoreLoader();
    };
  }

  sessionStorage.setItem("visited_home", "true");

  document.body.classList.add("is-loading");

  const masterTl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove("is-loading");
      hideLoader();
      gsap.set(".hero-content", { clearProps: "all" });
      gsap.set(".hero-background", { opacity: 1 });
      ScrollTrigger.refresh();
      if (onComplete) onComplete();
    },
  });

  // 1. Loader Bar Fill
  masterTl.fromTo(
    ".loader-progress-bar",
    { scaleX: 0 },
    { scaleX: 1, duration: 1.0, ease: "power3.inOut" }
  );
  masterTl.to(
    ".loader-box",
    { opacity: 0, y: -15, duration: 0.35, ease: "power2.in" },
    "+=0.1"
  );

  // 2. Curtain Exit
  masterTl.to(
    "#loader",
    {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
    },
    "-=0.1"
  );

  // 3. Hero Text & Header Intro
  masterTl.fromTo(
    ".site-header, .site-header__location",
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    "-=0.6"
  );

  masterTl.fromTo(
    ".hero-content",
    { opacity: 0, y: 35, filter: "blur(10px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
    "-=0.6"
  );

  // 4. Shape "Pop" Sequence — each shape emerges from behind the hero headline
  //    (the viewport center) and settles outward into its layout position,
  //    rather than flying in from the edges of the screen.
  const shapeIds = [
    "#shape-circle-left",
    "#shape-astrix",
    "#shape-starburst",
    "#shape-circle-right",
    "#shape-leaf",
    "#shape-astrix-2",
    "#shape-circle-bottom",
  ];

  // Both asterisks (✱) spin in 3D while being thrown out. Every other shape
  // (circles, starburst, leaf) keeps its regular pop: it scales out from the
  // center with no spin. `rz` stays null for the asterisks because they run
  // their own continuous z-spin loops (Phase B below) and must not be
  // double-driven.
  const spinConfigs: Record<
    string,
    { rx: number; ry: number; rz: number | null }
  > = {
    "#shape-astrix": { rx: 220, ry: -220, rz: null },
    "#shape-astrix-2": { rx: -220, ry: 200, rz: null },
  };

  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  shapeIds.forEach((id, i) => {
    const el = document.querySelector<HTMLElement>(id);
    if (!el) return;

    // Measure the shape's final layout position, then offset it back to the
    // viewport center and collapse it to a point so it pops outward from
    // behind the headline instead of sliding in from off-screen.
    const rect = el.getBoundingClientRect();
    const fromCenterX = viewportCenterX - (rect.left + rect.width / 2);
    const fromCenterY = viewportCenterY - (rect.top + rect.height / 2);

    const spin = spinConfigs[id] ?? null;

    gsap.set(el, {
      x: fromCenterX,
      y: fromCenterY,
      scale: 0,
      opacity: 0,
      ...(spin
        ? {
            rotationX: spin.rx,
            rotationY: spin.ry,
            ...(spin.rz != null ? { rotation: spin.rz } : {}),
          }
        : {}),
      transformOrigin: "50% 50%",
    });

    masterTl.to(
      el,
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        ...(spin
          ? {
              rotationX: 0,
              rotationY: 0,
              ...(spin.rz != null ? { rotation: 360 } : {}),
            }
          : {}),
        duration: 1.1,
        ease: "power4.out",
      },
      `-=${1.0 - i * 0.06}`
    );
  });

  // Phase B: Continuous Idle Spin Loops — both asterisks keep slowly turning
  // (in opposite directions) after the entrance so the spin never fully stops.
  const astrixTween = gsap.to("#shape-astrix", {
    rotation: 360,
    duration: 24,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%",
  });

  const astrix2Tween = gsap.to("#shape-astrix-2", {
    rotation: -360,
    duration: 32,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%",
  });

  return () => {
    masterTl.kill();
    astrixTween.kill();
    astrix2Tween.kill();

    // Safety: if the timeline is interrupted (StrictMode re-mount, fast
    // navigation), make sure the loader, header, and hero content are never
    // left stuck in their hidden "from" states.
    document.body.classList.remove("is-loading");
    restoreLoader();
    gsap.set([".hero-content", ".site-header", ".site-header__location"], {
      clearProps: "all",
    });
  };
}