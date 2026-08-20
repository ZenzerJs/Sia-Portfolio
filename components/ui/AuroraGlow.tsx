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
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. WebGL Dynamic Aurora Shader */}
      <div className="absolute inset-0 z-[1] opacity-75">
        <AuroraBlur
          speed={0.65}
          bloomIntensity={1.2}
          noiseScale={2.6}
          movementX={-0.6}
          movementY={-1.2}
          verticalFade={0.3}
          brightness={0.96}
          saturation={1.08}
          opacity={0.48}
          showWindowShadow={true}
          windowShadowOpacity={0.20}
        />
      </div>

      {/* 2. Layered CSS Ambient Glow Orbs (Morning Glow, Soft Bloom, Deep Horizon) */}
      <div
        className="absolute -top-[12%] -left-[8%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-[#FFB5D8]/20 via-[#FFD1A0]/16 to-transparent blur-[95px] animate-aurora-slow z-[0]"
      />

      <div
        className="absolute top-[32%] -right-[12%] w-[58vw] h-[58vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-[#A0C4FF]/22 via-[#FFD1A0]/15 to-transparent blur-[105px] animate-aurora-reverse z-[0]"
      />

      <div
        className="absolute -bottom-[8%] -left-[10%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-[#A0C4FF]/20 via-[#FFB5D8]/14 to-transparent blur-[115px] animate-aurora-drift z-[0]"
      />
    </div>
  );
}

export default AuroraGlow;
