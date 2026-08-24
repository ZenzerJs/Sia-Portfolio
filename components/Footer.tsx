"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";
import { ConnectModal } from "@/components/ui/ConnectModal";

export function Footer() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const blueSlideRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !footerWrapRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create scroll-driven timeline scrubbed from when footer enters to bottom of document
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerWrapRef.current,
          start: "top 88%",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // 1. Blue slide-up animation (curtain sliding up from 100% down to 0%)
      if (blueSlideRef.current) {
        tl.fromTo(
          blueSlideRef.current,
          { yPercent: 100, opacity: 0.8 },
          { yPercent: 0, opacity: 1, ease: "power1.out" },
          0
        );
      }

      // 2. Monogram brightness/invert transition from dark navy to crisp white
      if (monogramRef.current) {
        tl.fromTo(
          monogramRef.current,
          { filter: "brightness(1) invert(0)" },
          { filter: "brightness(0) invert(1)", ease: "power1.out" },
          0
        );
      }

      // 3. Heading color transition from deep navy to crisp white
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { color: "#1E3A5F" },
          { color: "#FFFFFF", ease: "power1.out" },
          0
        );
      }

      // 4. Contact info text transition from dark slate to white
      if (infoRef.current) {
        tl.fromTo(
          infoRef.current,
          { color: "#4A5568" },
          { color: "rgba(255, 255, 255, 0.95)", ease: "power1.out" },
          0
        );
      }

      // 5. CTA Button transition (Navy bg / White text -> Glowing White bg / Navy text)
      if (ctaBtnRef.current) {
        tl.fromTo(
          ctaBtnRef.current,
          {
            backgroundColor: "#1E3A5F",
            color: "#FFFFFF",
            boxShadow: "0 4px 15px rgba(30, 58, 95, 0.2)",
          },
          {
            backgroundColor: "#FFFFFF",
            color: "#112239",
            boxShadow: "0 0 35px rgba(255, 255, 255, 0.4)",
            ease: "power1.out",
          },
          0
        );
      }

      // 6. Action Pills transition (Navy borders -> Frosted white borders & white text)
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll(".footer-pill");
        tl.fromTo(
          pills,
          {
            borderColor: "rgba(30, 58, 95, 0.25)",
            color: "#1E3A5F",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
          {
            borderColor: "rgba(255, 255, 255, 0.35)",
            color: "#FFFFFF",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            ease: "power1.out",
          },
          0
        );
      }

      // 7. Bottom bar text and border transition
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          {
            borderTopColor: "rgba(30, 58, 95, 0.12)",
            color: "#718096",
          },
          {
            borderTopColor: "rgba(255, 255, 255, 0.12)",
            color: "rgba(255, 255, 255, 0.75)",
            ease: "power1.out",
          },
          0
        );
      }
    }, footerWrapRef);

    // Refresh ScrollTrigger after DOM has fully stabilized
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={footerWrapRef}
        className="footer-master-wrap relative overflow-hidden bg-[#FAF9F6] border-t border-slate-200/80 z-20"
        id="contact"
        data-cursor="contact"
      >
        {/* Sliding Navy Blue Layer */}
        <div
          ref={blueSlideRef}
          className="pointer-events-none absolute inset-0 w-full h-full bg-[#112239] will-change-transform z-0"
          aria-hidden="true"
        />

        {/* Contact Section Content */}
        <section className="contact py-20 md:py-28 px-6 relative z-10">
          <div className="contact__container max-w-2xl mx-auto text-center">
            {/* Monogram */}
            <div className="flex justify-center mb-6">
              <img
                ref={monogramRef}
                src="/assets/logo-monogram.png"
                alt={siteConfig.legalName}
                className="contact-monogram-img w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Headline */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-5xl font-serif text-[#1E3A5F] mb-4 tracking-tight"
            >
              Let&apos;s collaborate
            </h2>

            {/* Metadata / Info */}
            <div
              ref={infoRef}
              className="contact__info space-y-1 mb-6 text-slate-700"
            >
              <p className="text-base font-medium">{siteConfig.person.fullName}</p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:underline transition-all font-sans"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-xs font-mono opacity-80 mt-1">
                {siteConfig.location}
              </p>
            </div>

            {/* Get In Touch Button */}
            <div className="mt-6 mb-8 text-center">
              <button
                ref={ctaBtnRef}
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1E3A5F] text-white text-xs font-mono tracking-widest uppercase shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer font-semibold"
                aria-label="Open contact and collaboration pop-out modal"
              >
                <span>Get in Touch</span>
                <span>↗</span>
              </button>
            </div>

            {/* Links / Action Pills */}
            <div
              ref={pillsRef}
              className="contact__links flex flex-wrap justify-center gap-3"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="footer-pill px-5 py-2 rounded-full border border-[#1E3A5F]/25 text-[#1E3A5F] text-xs font-mono tracking-wider uppercase backdrop-blur-sm transition-all hover:scale-105 hover:!border-white hover:!bg-white hover:!text-[#112239]"
              >
                Email
              </a>
              <a
                href={siteConfig.socials.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-pill px-5 py-2 rounded-full border border-[#1E3A5F]/25 text-[#1E3A5F] text-xs font-mono tracking-wider uppercase backdrop-blur-sm transition-all hover:scale-105 hover:!border-white hover:!bg-white hover:!text-[#112239]"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="footer-pill px-5 py-2 rounded-full border border-[#1E3A5F]/25 text-[#1E3A5F] text-xs font-mono tracking-wider uppercase backdrop-blur-sm transition-all hover:scale-105 hover:!border-white hover:!bg-white hover:!text-[#112239]"
              >
                Résumé (PDF)
              </a>
              <a
                href={siteConfig.resumeDocxUrl}
                download
                className="footer-pill px-5 py-2 rounded-full border border-[#1E3A5F]/25 text-[#1E3A5F] text-xs font-mono tracking-wider uppercase backdrop-blur-sm transition-all hover:scale-105 hover:!border-white hover:!bg-white hover:!text-[#112239]"
              >
                Résumé (DOCX)
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Standardized Bar */}
        <footer
          ref={bottomBarRef}
          className="footer flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 py-6 border-t border-slate-200/80 relative z-10 gap-3 text-xs"
        >
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-monogram-light.png"
              alt=""
              className="footer-monogram-img w-6 h-6 object-contain opacity-90"
            />
            <p className="m-0 text-inherit">
              © {siteConfig.copyrightStartYear} {siteConfig.legalName}. All rights reserved.
            </p>
          </div>
          <span className="font-mono text-inherit opacity-80">
            {siteConfig.location}
          </span>
        </footer>
      </div>

      {/* Connect Pop-out Modal */}
      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}

export default Footer;
