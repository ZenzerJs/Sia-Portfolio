"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { resetScrollToTop } from "@/lib/smoothScroll";

const pageNavItems = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/work", label: "Work", match: (p: string) => p === "/work" || p.startsWith("/work/") },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/#contact", label: "Contact", match: () => false },
];

const homeNavItems = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/work", label: "Work", match: () => false },
  { href: "#campaigns", label: "Campaigns", match: () => false },
  { href: "/about", label: "About", match: () => false },
  { href: "#contact", label: "Contact", match: () => false },
];

export function SiteHeader({ homeSections = false }: { homeSections?: boolean }) {
  const pathname = usePathname();
  const navItems = homeSections ? homeNavItems : pageNavItems;

  return (
    <header className={`site-header${homeSections ? " site-header--home" : ""}`}>
      <div className="site-header__container header-container">
        <div className="site-header__brand brand">
          <Link
            href="/"
            onClick={() => {
              if (pathname === "/") {
                resetScrollToTop();
              }
            }}
            aria-label={`${siteConfig.person.fullName} — home`}
            className="site-header__brand-link flex flex-row items-center gap-3 md:gap-3.5 group whitespace-nowrap"
          >
            <img
              src="/assets/logo-monogram-navy.png"
              alt=""
              className="h-8 sm:h-10 md:h-12 w-auto max-h-[48px] object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-dark)] leading-none inline-block">
              {siteConfig.person.fullName}
            </span>
          </Link>
        </div>

        <nav
          className={`site-nav${homeSections ? " navigation" : ""}`}
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (item.href.startsWith("/") && item.href !== pathname) {
                    resetScrollToTop();
                  }
                }}
                className={`nav-link${isActive ? " nav-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
