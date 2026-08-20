"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

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
  { href: "#process", label: "Process", match: () => false },
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
            aria-label={`${siteConfig.person.fullName} — home`}
            className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[var(--text-dark)]"
          >
            {siteConfig.person.fullName}
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
