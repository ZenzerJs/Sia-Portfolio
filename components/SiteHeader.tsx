"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/work", label: "Work", match: (p: string) => p === "/work" || p.startsWith("/work/") },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/#contact", label: "Contact", match: () => false },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand">
          <Link href="/" aria-label="marimba. designs — home">
            <img src="/assets/logo.svg" alt="marimba. designs" className="brand-logo" />
          </Link>
        </div>

        <nav className="site-nav" aria-label="Primary">
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
