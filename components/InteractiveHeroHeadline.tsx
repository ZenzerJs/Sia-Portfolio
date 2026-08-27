// components/InteractiveHeroHeadline.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export function InteractiveHeroHeadline() {
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physical spring damping
  const springX = useSpring(mouseX, { stiffness: 130, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 130, damping: 20 });

  // 3D Perspective Tilt & Magnetic Shift driven by cursor position
  const rotateX = useTransform(springY, (val) => (shouldReduceMotion ? 0 : -val * 12));
  const rotateY = useTransform(springX, (val) => (shouldReduceMotion ? 0 : val * 14));
  const moveX = useTransform(springX, (val) => (shouldReduceMotion ? 0 : val * 10));
  const moveY = useTransform(springY, (val) => (shouldReduceMotion ? 0 : val * 8));

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized coordinates from -0.5 to 0.5 relative to viewport center
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <motion.h1
      style={{
        rotateX,
        rotateY,
        x: moveX,
        y: moveY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="hero-headline font-normal leading-[1.14] text-center max-w-4xl mx-auto will-change-transform select-none cursor-default transition-shadow"
    >
      Connecting data, research, and community
      <br className="hidden sm:inline" />
      {' '}through strategic storytelling
      <br className="hidden sm:inline" />
      {' '}and digital media.
    </motion.h1>
  );
}

export default InteractiveHeroHeadline;
