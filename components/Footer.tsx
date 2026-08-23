"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { initThemeScroll } from "@/lib/themeScroll";
import { ConnectModal } from "@/components/ui/ConnectModal";

export function Footer() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  useEffect(() => {
    const cleanupTheme = initThemeScroll();
    return () => {
      cleanupTheme();
    };
  }, []);

  return (
    <>
      {/* Unified Midnight Blue Footer with 'Have a project in mind?' Callout */}
      <footer
        className="footer bg-[#112239] text-white pt-20 pb-10 px-6 md:px-12 relative z-20 border-t border-white/10"
        id="contact"
        data-cursor="contact"
      >
        <div className="max-w-[1380px] mx-auto">
          {/* Main Callout Banner Area */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 pb-14 border-b border-white/10">
            {/* Left Title & Monogram */}
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                <img
                  src="/assets/logo-monogram-light.png"
                  alt={siteConfig.legalName}
                  className="w-10 h-10 object-contain drop-shadow-md hover:scale-105 transition-transform"
                />
                <span className="text-xs font-mono tracking-widest uppercase text-white/60">
                  {siteConfig.person.fullName}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white font-normal leading-tight tracking-tight">
                Have a project in mind?
              </h2>
              <div className="h-[2px] w-14 bg-white/30 mt-4 mx-auto lg:mx-0" />
            </div>

            {/* Right Action & Quick Contact */}
            <div className="flex flex-col items-center lg:items-end gap-5">
              <button
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-[#112239] hover:bg-white/90 text-xs font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95 font-semibold"
                aria-label="Open contact and collaboration modal"
              >
                <span>LET&apos;S CONNECT</span>
                <span>→</span>
              </button>

              <div className="flex items-center gap-4 text-xs font-mono text-white/70">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{siteConfig.email}</span>
                </a>
                <span className="text-white/30">|</span>
                <a
                  href={siteConfig.socials.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.25 1.62 1.62 0 0 0 0-3.25Z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Secondary Link Pills */}
          <div className="py-8 flex flex-wrap justify-center lg:justify-start gap-3 border-b border-white/10">
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              Email Directly
            </a>
            <a
              href={siteConfig.socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              LinkedIn Profile
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              Download Résumé (PDF)
            </a>
            <a
              href={siteConfig.resumeDocxUrl}
              download
              className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              Download Résumé (DOCX)
            </a>
          </div>

          {/* Bottom Copyright & Location Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
            <p className="m-0">
              © {siteConfig.copyrightStartYear} {siteConfig.legalName}. All rights reserved.
            </p>
            <span>
              {siteConfig.location}
            </span>
          </div>
        </div>
      </footer>

      {/* Connect Pop-out Modal */}
      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}

export default Footer;
