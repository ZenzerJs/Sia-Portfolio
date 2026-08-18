"use client";

import React from "react";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-44 px-6 md:px-12 bg-[#F0EFE9] text-[#3A4A16] border-t border-[#3A4A16]/10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal mb-8 leading-tight"
        >
          Let&apos;s work together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl font-sans opacity-80 max-w-2xl mb-12 leading-relaxed"
        >
          I&apos;m always looking for new projects and collaborations. If you have
          a project in mind, or just want to say hello, please get in touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-14 flex flex-col items-center gap-2"
        >
          <span className="text-sm font-mono opacity-60">Myranda Wicks</span>
          <a
            href="mailto:hello@marimba.design"
            className="font-serif text-2xl sm:text-4xl text-[#3A4A16] hover:opacity-75 transition-opacity underline decoration-1 underline-offset-8"
          >
            hello@marimba.design
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm md:text-base font-medium tracking-wide"
        >
          <a
            href="https://www.instagram.com/marimba.design/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/myrandawicks/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://www.behance.net/marimba-designs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
          >
            Behance
          </a>
        </motion.div>
      </div>
    </section>
  );
}
