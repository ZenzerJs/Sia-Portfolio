"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface BlindsLightingOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export function BlindsLightingOverlay({ scrollYProgress }: BlindsLightingOverlayProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll parallax: sunlight angle shifts across the 3 sections
  const lightY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-6%", "-12%"]);
  const lightScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.08, 1.04]);
  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.55, 0.7, 0.65, 0.55]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Window Blinds Shadow Texture Layer */}
      <motion.div
        style={{
          y: lightY,
          scale: lightScale,
          opacity: lightOpacity,
          x: springMouseX,
          backgroundImage: "url('/assets/blinds-lighting.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          mixBlendMode: "multiply",
        }}
        className="absolute -inset-12 bg-cover bg-center mix-blend-multiply opacity-60 transition-opacity duration-700"
      />

      {/* Secondary Soft Light Diffuser */}
      <motion.div
        style={{ opacity: lightOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/5 pointer-events-none mix-blend-soft-light"
      />
    </div>
  );
}

export default BlindsLightingOverlay;
