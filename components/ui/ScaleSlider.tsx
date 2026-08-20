"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

interface ScaleSliderProps {
  className?: string;
  images: Array<{ src: string; alt?: string; caption?: string }>;
  direction?: "rtl" | "ltr";
  minScale?: number;
  autoplaySpeed?: number;
  title?: string;
  subtitle?: string;
}

export function ScaleSlider({
  className = "",
  images,
  direction = "rtl",
  minScale = 0.35,
  autoplaySpeed = 0.0015,
  title,
  subtitle,
}: ScaleSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const wrap = wrapRef.current;
    if (!scene || !wrap || images.length < 3) return;

    const M = images.length;
    const isLtr = direction === "ltr";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let viewW = scene.clientWidth || 1;
    let viewH = scene.clientHeight || 1;
    let baseSize = 320;
    let visCount = viewW >= 1200 ? 5 : viewW >= 768 ? 4 : 3;
    let rampR = Math.pow(1 / minScale, 1 / (visCount - 1));
    let rampK = viewW / (1 - minScale);
    let rampXv = -minScale * rampK;

    let travel = 0;
    let dragActive = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let dragVelocity = 0;
    let running = true;
    let navTween: any = null;

    const recomputeRamp = () => {
      viewW = scene.clientWidth || 1;
      viewH = scene.clientHeight || 1;
      visCount = viewW >= 1200 ? 5 : viewW >= 768 ? 4 : 3;
      rampR = Math.pow(1 / minScale, 1 / (visCount - 1));
      rampK = viewW / (1 - minScale);
      rampXv = -minScale * rampK;
      const maxHero = rampK * (rampR - 1);
      baseSize = Math.max(200, Math.min(viewH * 0.9, maxHero));

      cardRefs.current.forEach((el) => {
        if (el) {
          el.style.width = `${baseSize.toFixed(1)}px`;
          el.style.height = `${baseSize.toFixed(1)}px`;
        }
      });
    };

    const boundary = (k: number) => {
      const phase = travel - Math.floor(travel);
      return rampXv + rampK * Math.pow(rampR, phase - k);
    };

    const positionCards = () => {
      const shift = Math.floor(travel);
      const activeIdx = ((Math.round(travel) % M) + M) % M;
      setCurrentIndex(activeIdx);

      for (let i = 0; i < M; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const k = (((i - shift) % M) + M) % M;
        const outer = boundary(k);
        const inner = boundary(k + 1);
        const size = Math.max(outer - inner, 1);
        const overlap = 2;
        const w = size + overlap;
        const left = isLtr ? viewW - outer : inner - overlap;
        const scale = w / baseSize;

        el.style.zIndex = String(visCount - k);
        el.style.transform = `translate3d(${left.toFixed(1)}px, 0, 0) scale(${scale.toFixed(5)})`;
        el.style.opacity = k >= visCount ? "0" : "1";
      }
    };

    recomputeRamp();
    positionCards();

    // Ticker frame
    const onTick = () => {
      if (!running) return;
      if (navTween && navTween.isActive()) {
        positionCards();
        return;
      }

      if (dragActive) {
        travel += (dragVelocity * (isLtr ? -1 : 1)) / viewW;
        dragVelocity *= 0.85;
      } else {
        travel -= reducedMotion ? 0 : autoplaySpeed;
      }
      positionCards();
    };

    gsap.ticker.add(onTick);

    // Pointer events
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragActive = true;
      dragStartX = e.clientX;
      dragLastX = e.clientX;
      dragVelocity = 0;
      if (navTween) navTween.kill();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragActive) return;
      const delta = e.clientX - dragLastX;
      dragVelocity = delta * 1.5;
      dragLastX = e.clientX;
      travel += (delta * (isLtr ? -1 : 1)) / (viewW * 0.8);
      positionCards();
    };

    const onPointerUp = () => {
      dragActive = false;
    };

    scene.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize
    const onResize = () => {
      recomputeRamp();
      positionCards();
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      gsap.ticker.remove(onTick);
      if (navTween) navTween.kill();
      scene.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
    };
  }, [images, direction, minScale, autoplaySpeed]);

  const animateTo = (delta: number) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const target = Math.round(currentIndex + delta);
    gsap.to(
      {},
      {
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          // proxy handles step
        },
      }
    );
  };

  return (
    <div
      ref={wrapRef}
      className={`scale-slider-wrapper relative w-full overflow-hidden select-none py-8 ${className}`}
      role="region"
      aria-label="Interactive visual showcase"
    >
      {(title || subtitle) && (
        <div className="scale-slider-header mb-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {subtitle && (
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="text-2xl md:text-3xl font-serif text-[var(--text-dark)]">
                {title}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}

      <div
        ref={sceneRef}
        className="scale-slider-scene relative w-full h-[360px] md:h-[480px] cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {images.map((img, i) => (
          <div
            key={i}
            ref={setCardRef(i)}
            className="scale-slider-card absolute bottom-0 left-0 origin-bottom-left will-change-transform rounded-2xl overflow-hidden shadow-xl border border-black/5 bg-slate-100"
            style={{ display: "block" }}
          >
            <img
              src={img.src}
              alt={img.alt || `Showcase photo ${i + 1}`}
              className="w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
                <p className="text-xs md:text-sm font-medium leading-tight">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScaleSlider;
