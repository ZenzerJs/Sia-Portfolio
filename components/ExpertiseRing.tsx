"use client";

import React from "react";
import { motion } from "framer-motion";

export function ExpertiseRing() {
  return (
    <section
      id="expertise"
      className="relative w-full py-24 md:py-36 flex items-center justify-center overflow-hidden bg-[#F0EFE9] text-[#3A4A16]"
    >
      <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#3A4A16]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#93DD89] border border-[#3A4A16]/30 shadow-sm" />
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#DAC6EB] border border-[#3A4A16]/30 shadow-sm" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FC6A00] border border-[#3A4A16]/30 shadow-sm" />
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#C1E4F7] border border-[#3A4A16]/30 shadow-sm" />
        </motion.div>

        <div className="absolute inset-8 rounded-full border border-dashed border-[#3A4A16]/15" />

        <div className="text-center z-10 select-none">
          <p className="font-serif text-3xl md:text-5xl leading-tight font-normal text-[#3A4A16]">
            My design
            <br />
            practice
          </p>
        </div>
      </div>
    </section>
  );
}
