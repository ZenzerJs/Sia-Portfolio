"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InlineBadgeProps {
  id: string;
  href: string;
  title: string;
  imageSrc: string;
  label: string;
}

function InlineMediaBadge({ id, href, title, imageSrc, label }: InlineBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-20, 20], [12, -12]), {
    stiffness: 300,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-40, 40], [-15, 15]), {
    stiffness: 300,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.span
      className="inline-block align-middle mx-1.5 sm:mx-2.5 my-1"
      style={{ perspective: 600 }}
    >
      <Link
        href={href}
        id={id}
        title={title}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group inline-flex items-center justify-center rounded-full border border-[#1E3A5F] overflow-hidden select-none transition-all duration-300"
        style={{
          width: isHovered ? "clamp(5rem, 8.5vw, 8.5rem)" : "clamp(3.75rem, 6.5vw, 6.5rem)",
          height: "clamp(2rem, 3.2vw, 3.25rem)",
          backgroundColor: "#1E3A5F",
        }}
      >
        {/* Dynamic 3D Card Inner */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        >
          {/* Background Image with Hover Scale */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url('${imageSrc}')`,
            }}
            animate={{
              scale: isHovered ? 1.15 : 1.0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Dynamic Ambient Lighting & Color Sheen */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background:
                "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
            }}
            animate={{
              x: isHovered ? ["-120%", "120%"] : ["-150%", "150%"],
            }}
            transition={{
              duration: isHovered ? 1.2 : 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Radial Spotlight Tracking Mouse */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-full opacity-60 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${mouseX.get() + 50}% ${
                  mouseY.get() + 50
                }%, rgba(255,255,255,0.8), transparent 70%)`,
              }}
            />
          )}

          {/* Border Glow on Hover */}
          <div className="absolute inset-0 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <span className="sr-only">{label}</span>
        </motion.div>
      </Link>
    </motion.span>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 pt-32 pb-20 select-none text-[#1E3A5F]"
    >
      {/* Meta Top Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mb-8 text-xs md:text-sm font-mono opacity-80"
      >
        <span className="font-medium tracking-wide">Digital designer</span>
        <span className="hidden sm:inline opacity-40">•</span>
        <span className="opacity-70">Based in Calgary, Canada</span>
      </motion.div>

      {/* Floating Animated Ambient Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-[1700px] mx-auto">
        {/* Astrix Rotating Texture */}
        <motion.div
          className="absolute top-[18%] left-[12%] w-16 h-16 md:w-24 md:h-24 opacity-80"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border border-[#1E3A5F]/20 flex items-center justify-center">
            <span className="text-3xl text-[#1E3A5F] select-none">✱</span>
          </div>
        </motion.div>

        {/* Planet 1: Visual Design */}
        <motion.div
          className="absolute top-[28%] left-[5%] md:left-[10%] flex items-center gap-3 pointer-events-auto group cursor-pointer"
          animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-[#A9C6A4] to-[#A8CBE8] shadow-sm border border-[#1E3A5F]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xs md:text-sm font-mono bg-[#1E3A5F] text-[#F0EFE9] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Visual design
          </span>
        </motion.div>

        {/* Starburst Shape Top Right */}
        <motion.div
          className="absolute top-[20%] right-[10%] md:right-[15%] w-12 h-12 md:w-16 md:h-16 text-[#1E3A5F]/60"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 0 L60 38 L98 22 L72 50 L98 78 L60 62 L50 100 L40 62 L2 78 L28 50 L2 22 L40 38 Z" />
          </svg>
        </motion.div>

        {/* Planet 2: Interaction Design */}
        <motion.div
          className="absolute top-[45%] right-[6%] md:right-[12%] flex items-center gap-3 pointer-events-auto group cursor-pointer"
          animate={{ y: [0, 14, 0], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <span className="text-xs md:text-sm font-mono bg-[#1E3A5F] text-[#F0EFE9] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Interaction design
          </span>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#C3C6E8] to-[#EFAF8C] shadow-sm border border-[#1E3A5F]/10 transition-transform duration-300 group-hover:scale-110" />
        </motion.div>

        {/* Floating Leaf / Organic Form */}
        <motion.div
          className="absolute bottom-[20%] right-[18%] w-10 h-10 md:w-14 md:h-14 opacity-70"
          animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-tr-[50px] rounded-bl-[50px] bg-[#A9C6A4]/60 border border-[#1E3A5F]/20" />
        </motion.div>

        {/* Planet 3: UI/UX */}
        <motion.div
          className="absolute bottom-[15%] left-[15%] md:left-[22%] flex items-center gap-3 pointer-events-auto group cursor-pointer"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#A8CBE8] to-[#C3C6E8] shadow-sm border border-[#1E3A5F]/10 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xs md:text-sm font-mono bg-[#1E3A5F] text-[#F0EFE9] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            UI/UX
          </span>
        </motion.div>
      </div>

      {/* Main Content Hero */}
      <div className="relative z-10 max-w-5xl text-center mx-auto flex flex-col items-center">
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-[#1E3A5F]/30 text-xs md:text-sm font-medium tracking-wide uppercase bg-[#F1F0EA]/60 backdrop-blur-sm shadow-sm">
            Web design &amp; development
          </span>
        </motion.div>

        {/* Editorial Headline with Interactive Lighting Badges */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.14] tracking-tight font-normal"
        >
          I
          <InlineMediaBadge
            id="selfie"
            href="#about"
            title="About Myranda"
            imageSrc="/assets/asset 20.jpeg"
            label="About Myranda"
          />
          create living, breathing
          <br className="hidden sm:inline" />
          websites for brands
          <InlineMediaBadge
            id="website"
            href="#work"
            title="View Selected Work"
            imageSrc="/assets/asset 21.jpeg"
            label="View Selected Work"
          />
          that want
          <br className="hidden sm:inline" />
          to be felt, not just seen.
        </motion.h1>
      </div>
    </section>
  );
}
