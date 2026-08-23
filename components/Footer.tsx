"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";
import { ConnectModal } from "@/components/ui/ConnectModal";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        id="contact"
        data-cursor="contact"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-20"
      >
        {/* Deep Navy Card Container */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl sm:rounded-[32px] bg-[#112239] text-white border border-white/10 p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl transition-all duration-300"
        >
          {/* Ambient Decorative Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-radial from-[#1E3A5F]/60 via-[#2A4B7C]/30 to-transparent blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-radial from-[#F2A15C]/15 to-transparent blur-2xl"
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-6 sm:top-8 sm:right-12 h-7 w-7 sm:h-8 sm:w-8 text-[#E8A87C]/80 animate-pulse"
            viewBox="0 0 40 40"
            fill="currentColor"
          >
            <path d="M20 0 L23 16 L40 20 L23 24 L20 40 L17 24 L0 20 L17 16 Z" />
          </svg>

          <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-white/60">
                Get in touch
              </span>
              <div className="h-px w-10 bg-white/20" />
            </div>

            {/* Main Headline & Primary CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
                  Have a project in mind?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 self-start sm:self-auto rounded-full bg-white text-[#112239] px-7 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-white/90 hover:scale-105 active:scale-95"
                aria-label="Open contact modal"
              >
                <span>Let&apos;s connect</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>
            </div>

            {/* Direct Email Display */}
            <div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-sm sm:text-base text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors inline-block"
              >
                {siteConfig.email}
              </a>
            </div>

            <hr className="border-white/15 my-0" />

            {/* Action Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#112239] hover:border-white"
              >
                Email Directly
              </a>
              <a
                href={siteConfig.socials.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#112239] hover:border-white"
              >
                LinkedIn Profile
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#112239] hover:border-white"
              >
                Résumé (PDF) ↗
              </a>
              <a
                href={siteConfig.resumeDocxUrl}
                download
                className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#112239] hover:border-white"
              >
                Résumé (DOCX) ↗
              </a>
              <Link
                href="/work"
                className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#112239] hover:border-white"
              >
                Explore Work
              </Link>
            </div>

            <hr className="border-white/15 my-0" />

            {/* Bottom Copyright & Location Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] sm:text-xs text-white/50 pt-1">
              <p className="m-0">&copy; {siteConfig.copyrightStartYear} {siteConfig.legalName}. All rights reserved.</p>
              <p className="m-0 text-white/60">London, United Kingdom &middot; Toronto, Canada</p>
            </div>
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
