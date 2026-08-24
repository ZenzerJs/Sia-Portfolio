"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { resetScrollToTop } from "@/lib/smoothScroll";

const pageNavItems = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/work", label: "Work", match: (p: string) => p === "/work" || p.startsWith("/work/") },
  { href: "/contact", label: "Contact", match: (p: string) => p === "/contact" },
];

const homeNavItems = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/work", label: "Work", match: (p: string) => p.startsWith("/work") },
  { href: "/contact", label: "Contact", match: (p: string) => p === "/contact" },
];

export function SiteHeader({ homeSections = false }: { homeSections?: boolean }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = homeSections ? homeNavItems : pageNavItems;

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (href.includes("#")) {
      const hash = href.slice(href.indexOf("#"));
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", hash);
      }
    } else if (href.startsWith("/") && href !== pathname) {
      resetScrollToTop();
    }
  };

  return (
    <>
      <header className={`site-header${homeSections ? " site-header--home" : ""}`}>
        <div className="site-header__container header-container">
          <div className="site-header__brand brand">
            <Link
              href="/"
              onClick={() => {
                setMobileMenuOpen(false);
                if (pathname === "/") {
                  resetScrollToTop();
                }
              }}
              aria-label={`${siteConfig.person.fullName} — home`}
              className="site-header__brand-link font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-dark)] leading-none select-none hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              {siteConfig.person.fullName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`site-nav${homeSections ? " navigation" : ""} hidden md:flex`}
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const isActive = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`nav-link${isActive ? " nav-link--active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors z-50 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9999] md:hidden bg-[#0A1628]/60 backdrop-blur-md transition-opacity animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-[82vw] max-w-sm h-full bg-[#FAF9F6] border-l border-slate-200/80 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
                <span className="font-serif text-xl font-bold text-[#1E3A5F]">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive = item.match(pathname);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-[#1E3A5F] text-white shadow-md font-semibold"
                          : "text-[#1E3A5F] hover:bg-slate-100"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <a
                href={siteConfig.resumeUrl}
                download
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-300 text-xs font-mono tracking-wider uppercase text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span>Download Résumé (PDF)</span>
                <span>↓</span>
              </a>
              <a
                href={siteConfig.socials.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E3A5F] text-white text-xs font-mono tracking-wider uppercase hover:bg-[#142A4A] transition-colors shadow-sm"
              >
                <span>LinkedIn Profile</span>
                <span>↗</span>
              </a>
              <div className="text-center pt-2 text-[10px] font-mono text-slate-400">
                London, UK · Toronto, CA
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteHeader;
