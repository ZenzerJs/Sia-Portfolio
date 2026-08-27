// components/FloatingBadge.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

export interface FloatingBadgeProps {
  label: string;
  depthFactor?: number;
  className?: string;
}

export function FloatingBadge({ label, depthFactor = 18, className = '' }: FloatingBadgeProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const moveX = useTransform(springX, (val) => (shouldReduceMotion ? 0 : val * depthFactor));
  const moveY = useTransform(springY, (val) => (shouldReduceMotion ? 0 : val * depthFactor));

  useEffect(() => {
    // Disable listeners on touch/coarse devices or when reduced motion is preferred
    if (shouldReduceMotion || typeof window === 'undefined') return;
    
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <motion.div
      style={{ x: moveX, y: moveY }}
      className={`px-4 py-2 rounded-full backdrop-blur-md bg-white/85 border border-neutral-200/90 shadow-sm text-sm font-medium text-neutral-800 pointer-events-none select-none ${className}`}
    >
      {label}
    </motion.div>
  );
}

export default FloatingBadge;
