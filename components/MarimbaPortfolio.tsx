"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CustomCursor } from "./CustomCursor";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { ExpertiseRing } from "./ExpertiseRing";
import { WorkSection } from "./WorkSection";
import { ProcessSection } from "./ProcessSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { BlindsLightingOverlay } from "./BlindsLightingOverlay";

export function MarimbaPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3 Primary Section Background Color Shifts
  // 1. Hero / Intro (0.0 - 0.33): Warm Linen #F0EFE9
  // 2. Work Showcase (0.33 - 0.66): Organic Sage Green #DCE7D6
  // 3. Process / Contact (0.66 - 1.0): Lavender Mist #EAE3F2 -> Warm Linen #F0EFE9
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#F0EFE9", // Section 1: Hero Linen
      "#EAF1E4", // Section 1 -> 2 transition
      "#DCE7D6", // Section 2: Work Sage
      "#EAE3F2", // Section 3: Process Lavender
      "#F0EFE9", // Return: Contact Warm Linen
    ]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-screen w-full text-[#1E3A5F] selection:bg-[#1E3A5F] selection:text-[#F0EFE9] font-sans antialiased overflow-x-hidden transition-colors duration-700 ease-out"
    >
      {/* Blinds Window Shadow Lighting Overlay */}
      <BlindsLightingOverlay scrollYProgress={scrollYProgress} />

      {/* Custom Spring Physics Cursor */}
      <CustomCursor />

      {/* Fixed Header */}
      <Header />

      {/* Main Page Flow */}
      <main id="main-content" className="relative z-10 w-full">
        <HeroSection />
        <ExpertiseRing />
        <WorkSection />
        <ProcessSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}

export default MarimbaPortfolio;
