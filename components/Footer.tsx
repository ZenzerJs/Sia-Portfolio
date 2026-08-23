"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { ConnectModal } from "@/components/ui/ConnectModal";

export function Footer() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  return (
    <>
      <footer id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Outer Card Container */}
        <div className="relative overflow-hidden rounded-3xl bg-[#F8F7F5] border border-neutral-200/80 p-8 sm:p-12 lg:p-16 transition-shadow duration-300 hover:shadow-sm">
          {/* Ambient Decorative Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-radial from-[#F2A15C]/25 to-transparent blur-2xl"
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-12 sm:right-24 h-8 w-8 text-[#C9A24A]/70 animate-pulse"
            viewBox="0 0 40 40"
            fill="currentColor"
          >
            <path d="M20 0 L23 16 L40 20 L23 24 L20 40 L17 24 L0 20 L17 16 Z" />
          </svg>

          <div className="relative z-10 flex flex-col gap-8">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">
                Get in touch
              </span>
              <div className="h-px w-8 bg-neutral-300" />
            </div>

            {/* Main Headline & Primary CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#1E2A4D] max-w-lg leading-tight">
                Have a project in mind?
              </h2>
              <button
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-full bg-[#1E2A4D] px-7 py-3 font-mono text-xs uppercase tracking-wider text-[#F8F7F5] transition-all duration-200 hover:bg-[#33436E] hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <span>Let&apos;s connect</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>
            </div>

            {/* Direct Email Display */}
            <div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-sm text-[#3C445E] hover:text-[#1E2A4D] hover:underline underline-offset-4 transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <hr className="border-neutral-200" />

            {/* Action Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-full border border-neutral-300 bg-white/50 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#1E2A4D] backdrop-blur-sm transition-all duration-150 hover:bg-neutral-100 hover:border-neutral-400"
              >
                Email Directly
              </a>
              <a
                href={siteConfig.socials.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 bg-white/50 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#1E2A4D] backdrop-blur-sm transition-all duration-150 hover:bg-neutral-100 hover:border-neutral-400"
              >
                LinkedIn Profile
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="rounded-full border border-neutral-300 bg-white/50 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#1E2A4D] backdrop-blur-sm transition-all duration-150 hover:bg-neutral-100 hover:border-neutral-400"
              >
                Résumé (PDF) ↗
              </a>
              <a
                href={siteConfig.resumeDocxUrl}
                download
                className="rounded-full border border-neutral-300 bg-white/50 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#1E2A4D] backdrop-blur-sm transition-all duration-150 hover:bg-neutral-100 hover:border-neutral-400"
              >
                Résumé (DOCX) ↗
              </a>
              <Link
                href="/work"
                className="rounded-full border border-neutral-300 bg-white/50 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#1E2A4D] backdrop-blur-sm transition-all duration-150 hover:bg-neutral-100 hover:border-neutral-400"
              >
                Explore Work
              </Link>
            </div>

            <hr className="border-neutral-200" />

            {/* Bottom Copyright & Location Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-neutral-400">
              <p>&copy; {siteConfig.copyrightStartYear} {siteConfig.legalName}. All rights reserved.</p>
              <p className="text-neutral-500">London, United Kingdom &middot; Toronto, Canada</p>
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
