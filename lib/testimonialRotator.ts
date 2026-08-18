import gsap from "gsap";

/**
 * Testimonials rotator ("Kind words").
 *
 * - Autoplays every 6s.
 * - Manual control: drag / swipe on the stage, previous/next buttons, dots.
 * - Autoplay pauses on hover, on focus, and while the user is dragging.
 * - Keyboard: arrow keys on the focused stage, plus the prev/next buttons.
 * - Loops cleanly (wrap-around crossfade, no snap back).
 * - Honors prefers-reduced-motion: no autoplay, no fades — instant swaps,
 *   manual browsing still works.
 */
export function initTestimonialRotator(): () => void {
  if (typeof window === "undefined") return () => {};

  const section = document.querySelector<HTMLElement>(".testimonials");
  if (!section) return () => {};

  const quotes = Array.from(section.querySelectorAll<HTMLElement>(".testimonial"));
  const dots = Array.from(section.querySelectorAll<HTMLElement>(".testimonials__dot"));
  const stage = section.querySelector<HTMLElement>(".testimonials__stage");
  const prevBtn = section.querySelector<HTMLButtonElement>("[data-testimonial-prev]");
  const nextBtn = section.querySelector<HTMLButtonElement>("[data-testimonial-next]");
  const counter = section.querySelector<HTMLElement>(".testimonials__counter-current");

  if (quotes.length < 2 || dots.length !== quotes.length || !stage) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = 0;
  let interval: ReturnType<typeof setInterval> | null = null;
  let paused = false;
  let dragging = false;
  let dragPointerId: number | null = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragDelta = 0;

  const render = () => {
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    if (counter) counter.textContent = String(index + 1);
  };

  const show = (next: number) => {
    const target = (next + quotes.length) % quotes.length;
    if (target === index) return;

    if (reduced) {
      // Reduced motion: swap instantly, no crossfade.
      quotes[index].classList.remove("is-active");
      index = target;
      quotes[index].classList.add("is-active");
      render();
      return;
    }

    gsap.to(quotes[index], { opacity: 0, duration: 0.45, ease: "power2.out" });
    gsap.to(quotes[target], {
      opacity: 1,
      duration: 0.65,
      ease: "power2.out",
      delay: 0.05,
    });
    quotes[index].classList.remove("is-active");
    index = target;
    quotes[index].classList.add("is-active");
    render();
  };

  const start = () => {
    stop();
    if (reduced) return; // reduced motion: never autoplay
    interval = setInterval(() => {
      if (!paused && !dragging) show(index + 1);
    }, 6000);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  // --- Drag / swipe ---------------------------------------------------------

  const onPointerDown = (e: PointerEvent) => {
    // Ignore non-primary pointers and drags that start on a control.
    if (e.pointerType !== "mouse" && e.pointerType !== "touch" && e.pointerType !== "pen") return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("button, a")) return;

    dragging = true;
    dragPointerId = e.pointerId;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragDelta = 0;
    stage.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== dragPointerId) return;
    dragDelta = e.clientX - dragStartX;
    // Subtle follow feedback while dragging (clamped).
    const clamped = Math.max(-90, Math.min(90, dragDelta));
    gsap.set(stage, { x: clamped, force3D: true });
  };

  const finishDrag = () => {
    if (!dragging) return;
    dragging = false;
    dragPointerId = null;

    // Settle the stage back smoothly (no snap back — eased return).
    gsap.to(stage, { x: 0, duration: 0.35, ease: "power2.out", force3D: true });

    const threshold = 48;
    if (dragDelta <= -threshold) show(index + 1);
    else if (dragDelta >= threshold) show(index - 1);

    dragDelta = 0;
    start(); // resume autoplay (timer reset) after manual interaction
  };

  const onPointerUp = (e: PointerEvent) => {
    if (e.pointerId !== dragPointerId) return;
    try {
      stage.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    finishDrag();
  };

  const onPointerCancel = (e: PointerEvent) => {
    if (e.pointerId !== dragPointerId) return;
    dragging = false;
    dragPointerId = null;
    dragDelta = 0;
    gsap.to(stage, { x: 0, duration: 0.3, ease: "power2.out" });
    start();
  };

  // --- Keyboard -------------------------------------------------------------

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      show(index + 1);
      start();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(index - 1);
      start();
    }
  };

  // --- Hover / focus pauses -------------------------------------------------

  const onMouseEnter = () => {
    paused = true;
  };
  const onMouseLeave = () => {
    paused = false;
  };
  const onFocusIn = () => {
    paused = true;
  };
  const onFocusOut = () => {
    paused = false;
  };

  // --- Wire up --------------------------------------------------------------

  const dotHandlers = dots.map((dot, i) => () => {
    show(i);
    start(); // reset the timer after manual selection
  });
  dots.forEach((dot, i) => dot.addEventListener("click", dotHandlers[i]));

  const onPrev = () => {
    show(index - 1);
    start();
  };
  const onNext = () => {
    show(index + 1);
    start();
  };
  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerCancel);
  stage.addEventListener("keydown", onKeyDown);

  section.addEventListener("mouseenter", onMouseEnter);
  section.addEventListener("mouseleave", onMouseLeave);
  section.addEventListener("focusin", onFocusIn);
  section.addEventListener("focusout", onFocusOut);

  render();
  start();

  return () => {
    stop();
    dots.forEach((dot, i) => dot.removeEventListener("click", dotHandlers[i]));
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    stage.removeEventListener("pointerdown", onPointerDown);
    stage.removeEventListener("pointermove", onPointerMove);
    stage.removeEventListener("pointerup", onPointerUp);
    stage.removeEventListener("pointercancel", onPointerCancel);
    stage.removeEventListener("keydown", onKeyDown);
    section.removeEventListener("mouseenter", onMouseEnter);
    section.removeEventListener("mouseleave", onMouseLeave);
    section.removeEventListener("focusin", onFocusIn);
    section.removeEventListener("focusout", onFocusOut);
    gsap.killTweensOf([quotes, stage]);
  };
}
