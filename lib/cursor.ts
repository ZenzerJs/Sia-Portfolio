/**
 * Magnetic Cursor Engine with Lerp Physics and Dynamic Hover Hit-Testing
 */
export function initCursor(): () => void {
  if (typeof window === "undefined") return () => {};

  const dot = document.getElementById("cursor-dot");
  if (!dot) return () => {};

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let isHoveringWork = false;
  let isPressed = false;
  let animationFrameId: number;

  const isSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isSafari) {
    dot.classList.add("is-safari");
  }

  const onMouseMove = (e: MouseEvent) => {
    targetX = e.clientX;
    targetY = e.clientY;
  };

  const onMouseDown = () => {
    isPressed = true;
    dot.classList.add("is-pressed");
  };

  const onMouseUp = () => {
    isPressed = false;
    dot.classList.remove("is-pressed");
  };

  const onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const workElement = target.closest("#work, [data-cursor='work'], .work__laptop");
    if (workElement && !isHoveringWork) {
      isHoveringWork = true;
      dot.classList.add("is-work-hover");
      document.body.classList.add("is-work-cursor-active");
    } else if (!workElement && isHoveringWork) {
      isHoveringWork = false;
      dot.classList.remove("is-work-hover");
      document.body.classList.remove("is-work-cursor-active");
    }
  };

  const loop = () => {
    // Lerp factor 0.18 for signature smooth organic cursor follow
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;

    dot.style.left = `${currentX.toFixed(2)}px`;
    dot.style.top = `${currentY.toFixed(2)}px`;

    animationFrameId = requestAnimationFrame(loop);
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mouseover", onMouseOver, { passive: true });

  animationFrameId = requestAnimationFrame(loop);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mouseover", onMouseOver);
    cancelAnimationFrame(animationFrameId);
  };
}
