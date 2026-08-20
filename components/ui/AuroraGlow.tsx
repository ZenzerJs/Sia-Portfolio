"use client";

import React from "react";

/**
 * Ambient Aurora Glow — a subtle, ethereal multi-color atmospheric glow
 * that sits fixed behind page content, adding organic depth and elegance
 * to the off-white canvas.
 */
export function AuroraGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top-left soft sky/lilac aurora orb */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-br from-[#A8CBE8]/22 via-[#C3C6E8]/18 to-transparent blur-[90px] animate-aurora-slow"
      />

      {/* Center-right soft peach/coral glow orb */}
      <div
        className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-[#EFD0B4]/20 via-[#EFAF8C]/12 to-transparent blur-[100px] animate-aurora-reverse"
      />

      {/* Bottom-left soft mint/sky glow orb */}
      <div
        className="absolute -bottom-[10%] -left-[12%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full bg-gradient-to-tr from-[#8FB6D8]/20 via-[#A8CBE8]/14 to-transparent blur-[110px] animate-aurora-drift"
      />

      {/* Subtle ambient radial fill */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(195,198,232,0.08),transparent_70%)]"
      />
    </div>
  );
}

export default AuroraGlow;
