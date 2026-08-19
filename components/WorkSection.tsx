"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8]);

  return (
    <section
      id="work"
      ref={containerRef}
      data-cursor="work"
      className="relative w-full py-20 md:py-36 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-[#FFFFFF] text-[#1E3A5F] cursor-pointer"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mb-12"
        >
          <span className="text-xs md:text-sm font-mono tracking-wider uppercase opacity-70 mb-3 block">
            Featured Case Studies
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight">
            Crafting digital experiences shaped around each brand
          </h2>
        </motion.div>

        <motion.div
          style={{ scale, opacity }}
          className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl bg-[#0E0E0E] p-3 md:p-6 shadow-2xl border border-[#1E3A5F]/20 flex items-center justify-center group overflow-hidden"
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <video
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              loop
              playsInline
              src="https://marimba.design/assets/showReel_1-opt.mp4"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />
            <div className="absolute inset-0 bg-[#1E3A5F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-sm font-mono bg-[#1E3A5F] text-[#FFFFFF] px-4 py-2 rounded-full shadow-lg">
                Click to explore case studies →
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
