"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

interface DiskData {
  id: number;
  step: string;
  title: string;
  desc: string;
  gradient: string;
  offsetY: number;
}

const DISKS: DiskData[] = [
  {
    id: 4,
    step: "01",
    title: "Listen & define",
    desc: "Understanding your business, users, and real goals.",
    gradient: "conic-gradient(from 90deg, rgb(193, 228, 247) 0deg, rgb(218, 198, 235) 360deg)",
    offsetY: 0,
  },
  {
    id: 3,
    step: "02",
    title: "Strategy & plan",
    desc: "Turning insight into structure, flows, and priorities.",
    gradient: "conic-gradient(rgb(147, 221, 137) 0deg, rgb(252, 106, 0) 360deg)",
    offsetY: -100,
  },
  {
    id: 2,
    step: "03",
    title: "Design & refine",
    desc: "Visual language, UX, and iteration.",
    gradient: "conic-gradient(from 180deg, rgb(218, 198, 235) 0deg, rgb(147, 221, 137) 360deg)",
    offsetY: -200,
  },
  {
    id: 1,
    step: "04",
    title: "Build & test",
    desc: "WordPress, motion, and real-world use.",
    gradient: "conic-gradient(from 90deg, rgb(244, 103, 50) 0deg, rgb(218, 198, 235) 360deg)",
    offsetY: -300,
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full py-28 md:py-44 px-6 md:px-12 bg-[#F0EFE9] text-[#3A4A16] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl text-center max-w-3xl font-normal leading-[1.18] mb-20 md:mb-28"
        >
          Designing, building, and refining as one continuous process
        </motion.h2>

        <div className="relative w-full max-w-2xl min-h-[550px] md:min-h-[700px] flex flex-col items-center justify-center">
          {DISKS.map((disk, index) => (
            <motion.div
              key={disk.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.18,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="w-full flex flex-col md:flex-row items-center justify-between gap-6 my-4 p-6 md:p-8 rounded-2xl bg-[#F1F0EA]/80 backdrop-blur-md border border-[#3A4A16]/15 hover:border-[#3A4A16]/30 transition-all duration-300 shadow-sm"
            >
              <div className="relative w-48 h-20 md:w-56 md:h-24 shrink-0 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-[50%] shadow-lg border border-[#3A4A16]/20 transition-transform duration-500 hover:rotate-45"
                  style={{
                    background: disk.gradient,
                    transform: "perspective(400px) rotateX(45deg)",
                  }}
                />
                <span className="absolute font-mono text-xs font-bold text-[#3A4A16] px-2 py-0.5 rounded bg-white/70 backdrop-blur-sm">
                  STEP {disk.step}
                </span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-1">
                  {disk.title}
                </h3>
                <p className="text-sm md:text-base opacity-80 leading-relaxed font-sans">
                  {disk.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
