"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import WebGL AuroraBlur to preserve SSR performance
const AuroraBlur = dynamic(() => import("@/components/ui/aurora-blur"), {
  ssr: false,
});

/**
 * Ambient Atmospheric Aurora & Window Shadow Glow
 * Uses custom pastel gradient tones (Morning Glow / Soft Bloom / Deep Horizon)
 * and atmospheric sunlight projection from /assets/asset 20.jpeg behind content.
 */
export function AuroraGlow() {
  return (
    <div
      className="aurora-glow-container fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* 1. WebGL Dynamic Aurora Shader (Interactive Canvas) */}
      <div className="absolute inset-0 z-[1] opacity-80">
        <AuroraBlur
          speed={0.7}
          bloomIntensity={1.4}
          noiseScale={2.8}
          movementX={-0.6}
          movementY={-1.2}
          verticalFade={0.3}
          brightness={0.98}
          saturation={1.12}
          opacity={0.55}
          showWindowShadow={false}
        />
      </div>

      {/* 2. Atmospheric Window Blinds Sunlight Shadow Projection (asset 20.jpeg) */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-multiply opacity-30 transition-opacity duration-700"
        style={{
          backgroundImage: `url('/assets/asset 20.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          filter: "contrast(1.2) brightness(1.05)",
        }}
      />

      {/* 3. Layered Ambient Gradient Orbs (Morning Glow, Soft Bloom, Deep Horizon) */}
      {/* Top-left Morning Glow orb */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,181,216,0.38)_0%,rgba(255,209,160,0.32)_45%,rgba(160,196,255,0.25)_75%,transparent_100%)] blur-[80px] animate-aurora-slow z-[0]"
      />

      {/* Mid-right Deep Horizon orb */}
      <div
        className="absolute top-[28%] -right-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(160,196,255,0.40)_0%,rgba(255,181,216,0.30)_40%,rgba(255,209,160,0.28)_70%,transparent_100%)] blur-[90px] animate-aurora-reverse z-[0]"
      />

      {/* Bottom-left Soft Bloom orb */}
      <div
        className="absolute -bottom-[10%] -left-[12%] w-[68vw] h-[68vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,209,160,0.35)_0%,rgba(255,181,216,0.28)_50%,rgba(160,196,255,0.30)_80%,transparent_100%)] blur-[100px] animate-aurora-drift z-[0]"
      />
    </div>
  );
}

export default AuroraGlow;
