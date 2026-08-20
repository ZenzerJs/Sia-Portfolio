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
      {/* Contact Section — Theme Scrubs to Midnight Blue on Scroll */}
      <section className="contact" id="contact" data-cursor="contact">
        <div className="contact__container">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/logo-monogram-navy.png"
              alt={siteConfig.legalName}
              className="contact-monogram-img w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif">Let&apos;s collaborate</h2>
          <div className="contact__info">
            <p>{siteConfig.person.fullName}</p>
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p className="text-xs font-mono opacity-70 mt-1">{siteConfig.location}</p>
          </div>
          <div className="mt-6 mb-8 text-center">
            <button
              type="button"
              onClick={() => setConnectModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#112239] hover:bg-white/90 text-xs font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all hover:scale-105"
              aria-label="Open contact and collaboration pop-out modal"
            >
              <span className="font-semibold">Get in Touch</span>
              <span>↗</span>
            </button>
          </div>
          <div className="contact__links">
            {Object.values(siteConfig.socials).map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:!bg-white hover:!text-[#112239]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Standardized Bottom Footer */}
      <footer className="footer flex items-center justify-between border-t border-white/10">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo-monogram-navy.png"
            alt=""
            className="footer-monogram-img w-6 h-6 object-contain opacity-80"
          />
          <p className="m-0">
            © {siteConfig.copyrightStartYear} {siteConfig.legalName}
          </p>
        </div>
        <span className="text-xs font-mono opacity-60">
          London, UK · Toronto, CA
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

