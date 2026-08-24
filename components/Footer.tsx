"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { ConnectModal } from "@/components/ui/ConnectModal";

export function Footer() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  return (
    <>
      {/* Contact Section — Authentic Midnight Blue Palette & Layout */}
      <section
        className="contact bg-[#112239] text-white py-20 md:py-28 px-6 relative z-20 border-t border-white/10"
        id="contact"
        data-cursor="contact"
      >
        <div className="contact__container max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/logo-monogram-light.png"
              alt={siteConfig.legalName}
              className="contact-monogram-img w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md hover:scale-105 transition-transform"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
            Let&apos;s collaborate
          </h2>
          <div className="contact__info space-y-1 mb-6 text-white/90">
            <p className="text-base font-medium">{siteConfig.person.fullName}</p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-white hover:underline transition-all"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="text-xs font-mono text-white/60 mt-1">
              {siteConfig.location}
            </p>
          </div>
          <div className="mt-6 mb-8 text-center">
            <button
              type="button"
              onClick={() => setConnectModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#112239] hover:bg-white/90 text-xs font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all hover:scale-105 active:scale-95 cursor-pointer font-semibold"
              aria-label="Open contact and collaboration pop-out modal"
            >
              <span>Get in Touch</span>
              <span>↗</span>
            </button>
          </div>
          <div className="contact__links flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-5 py-2 rounded-full border border-white/30 text-white text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              Email
            </a>
            <a
              href={siteConfig.socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/30 text-white text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="px-5 py-2 rounded-full border border-white/30 text-white text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              Résumé (PDF)
            </a>
            <a
              href={siteConfig.resumeDocxUrl}
              download
              className="px-5 py-2 rounded-full border border-white/30 text-white text-xs font-mono tracking-wider uppercase hover:bg-white hover:text-[#112239] transition-all"
            >
              Résumé (DOCX)
            </a>
          </div>
        </div>
      </section>

      {/* Standardized Bottom Footer */}
      <footer className="footer bg-[#112239] text-white/70 flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 py-6 border-t border-white/10 relative z-20 gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo-monogram-light.png"
            alt=""
            className="footer-monogram-img w-6 h-6 object-contain opacity-90"
          />
          <p className="m-0 text-xs text-white/80">
            © {siteConfig.copyrightStartYear} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
        <span className="text-xs font-mono text-white/60">
          {siteConfig.location}
        </span>
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
