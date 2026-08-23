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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        const footer = footerRef.current;
        const headlines = footer.querySelectorAll(".footer-headline");
        const subtexts = footer.querySelectorAll(".footer-subtext");
        const eyebrows = footer.querySelectorAll(".footer-eyebrow");
        const dividers = footer.querySelectorAll(".footer-divider");
        const pills = footer.querySelectorAll(".footer-pill");
        const ctaBtn = footer.querySelector(".footer-cta");
        const ambients = footer.querySelectorAll(".footer-ambient");
        const monogram = footer.querySelector(".footer-monogram");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            end: "top 25%",
            scrub: 0.5,
          },
        });

        // 1. Background color transition from off-white #FAF9F6 to deep navy #112239
        tl.fromTo(
          footer,
          { backgroundColor: "#FAF9F6" },
          { backgroundColor: "#112239", ease: "none" },
          0
        );

        // 2. Headlines transition from navy to pure white
        tl.fromTo(
          headlines,
          { color: "#112239" },
          { color: "#FFFFFF", ease: "none" },
          0
        );

        // 3. Eyebrows & subtexts
        tl.fromTo(
          eyebrows,
          { color: "#64748B" },
          { color: "rgba(255, 255, 255, 0.65)", ease: "none" },
          0
        );

        tl.fromTo(
          subtexts,
          { color: "#475569" },
          { color: "rgba(255, 255, 255, 0.8)", ease: "none" },
          0
        );

        // 4. Dividers
        tl.fromTo(
          dividers,
          { borderColor: "rgba(15, 23, 42, 0.12)" },
          { borderColor: "rgba(255, 255, 255, 0.15)", ease: "none" },
          0
        );

        // 5. Action Pills
        tl.fromTo(
          pills,
          {
            borderColor: "rgba(15, 23, 42, 0.18)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            color: "#112239",
          },
          {
            borderColor: "rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "#FFFFFF",
            ease: "none",
          },
          0
        );

        // 6. Primary CTA Button (Navy-on-light -> White-on-navy)
        if (ctaBtn) {
          tl.fromTo(
            ctaBtn,
            {
              backgroundColor: "#112239",
              color: "#FAF9F6",
            },
            {
              backgroundColor: "#FFFFFF",
              color: "#112239",
              ease: "none",
            },
            0
          );
        }

        // 7. Ambient Glows & Accents fade in
        tl.fromTo(
          ambients,
          { opacity: 0 },
          { opacity: 1, ease: "none" },
          0
        );

        // 8. Monogram inversion if needed
        if (monogram) {
          tl.fromTo(
            monogram,
            { filter: "brightness(0.2)" },
            { filter: "brightness(1)", ease: "none" },
            0
          );
        }
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Full-bleed Footer Section with dynamic scroll color transition */}
      <footer
        ref={footerRef}
        id="contact"
        data-cursor="contact"
        className="w-full relative z-20 border-t footer-divider overflow-hidden"
        style={{ backgroundColor: "#FAF9F6" }}
      >
        {/* Ambient Decorative Accents (glows in when dark) */}
        <div
          aria-hidden="true"
          className="footer-ambient pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-radial from-[#1E3A5F]/60 via-[#2A4B7C]/25 to-transparent blur-3xl opacity-0"
        />
        <div
          aria-hidden="true"
          className="footer-ambient pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-radial from-[#F2A15C]/20 to-transparent blur-2xl opacity-0"
        />
        <svg
          aria-hidden="true"
          className="footer-ambient pointer-events-none absolute top-8 right-6 sm:top-12 sm:right-16 h-7 w-7 sm:h-8 sm:w-8 text-[#E8A87C] animate-pulse opacity-0"
          viewBox="0 0 40 40"
          fill="currentColor"
        >
          <path d="M20 0 L23 16 L40 20 L23 24 L20 40 L17 24 L0 20 L17 16 Z" />
        </svg>

        <div
          ref={containerRef}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10 flex flex-col gap-8 sm:gap-10"
        >
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3">
            <span className="footer-eyebrow font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
              Get in touch
            </span>
            <div className="footer-divider h-px w-10 border-t border-slate-300" />
          </div>

          {/* Main Headline & Primary CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8">
            <div className="max-w-xl">
              <h2 className="footer-headline font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#112239] leading-[1.15] tracking-tight">
                Have a project in mind?
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setConnectModalOpen(true)}
              className="footer-cta inline-flex items-center justify-center gap-2.5 self-start sm:self-auto rounded-full bg-[#112239] text-[#FAF9F6] px-7 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-semibold uppercase tracking-wider shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
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
              className="footer-subtext font-mono text-sm sm:text-base text-slate-700 hover:underline underline-offset-4 transition-colors inline-block"
            >
              {siteConfig.email}
            </a>
          </div>

          <hr className="footer-divider border-t border-slate-200/80 my-0" />

          {/* Action Pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="footer-pill rounded-full border border-slate-300/80 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#112239] backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              Email Directly
            </a>
            <a
              href={siteConfig.socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-pill rounded-full border border-slate-300/80 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#112239] backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              LinkedIn Profile
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="footer-pill rounded-full border border-slate-300/80 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#112239] backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              Résumé (PDF) ↗
            </a>
            <a
              href={siteConfig.resumeDocxUrl}
              download
              className="footer-pill rounded-full border border-slate-300/80 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#112239] backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              Résumé (DOCX) ↗
            </a>
            <Link
              href="/work"
              className="footer-pill rounded-full border border-slate-300/80 bg-white/60 px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#112239] backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              Explore Work
            </Link>
          </div>

          <hr className="footer-divider border-t border-slate-200/80 my-0" />

          {/* Bottom Copyright & Location Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] sm:text-xs pt-1">
            <p className="footer-eyebrow m-0 text-slate-400">
              &copy; {siteConfig.copyrightStartYear} {siteConfig.legalName}. All rights reserved.
            </p>
            <p className="footer-subtext m-0 text-slate-500">
              London, United Kingdom &middot; Toronto, Canada
            </p>
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
