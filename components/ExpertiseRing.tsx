"use client";

import React from "react";
import { motion } from "framer-motion";

export function ExpertiseRing() {
  return (
    <section
      id="expertise"
      className="relative w-full py-24 md:py-36 flex items-center justify-center overflow-hidden bg-[#FFFFFF] text-[#1E3A5F]"
    >
      <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#1E3A5F]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#A9C6A4] border border-[#1E3A5F]/30 shadow-sm" />
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#C3C6E8] border border-[#1E3A5F]/30 shadow-sm" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E0AE62] border border-[#1E3A5F]/30 shadow-sm" />
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#A8CBE8] border border-[#1E3A5F]/30 shadow-sm" />
        </motion.div>

        <div className="absolute inset-8 rounded-full border border-dashed border-[#1E3A5F]/15" />

        <div className="text-center z-10 select-none">
          <p className="font-serif text-3xl md:text-5xl leading-tight font-normal text-[#1E3A5F]">
            My design
            <br />
            practice
          </p>
        </div>
      </div>
    </section>
  );
}
