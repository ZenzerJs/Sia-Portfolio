"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-[#F0EFE9] text-[#3A4A16] border-t border-[#3A4A16]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs md:text-sm font-mono opacity-80">
      <p>© 2026 Marimba. Designs</p>

      <div className="flex items-center gap-6">
        <a
          href="https://www.csswinner.com/details/marimbadesigns-portfolio-website/19149"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 transition-opacity"
        >
          <span className="px-3 py-1 rounded border border-[#3A4A16]/30 text-xs">
            CSS Winner 2026
          </span>
        </a>

        <a
          href="https://www.awwwards.com/sites/marimba-designs-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 transition-opacity"
        >
          <span className="px-3 py-1 rounded bg-[#020202] text-white text-xs">
            Awwwards Site of the Day
          </span>
        </a>
      </div>
    </footer>
  );
}
