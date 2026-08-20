"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BentoItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  href?: string;
  tag?: string;
}

export function BentoGrid({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-[1380px] mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className = "",
  href,
  tag,
}: BentoItemProps) {
  const content = (
    <div
      className={cn(
        "group/bento relative rounded-[32px] overflow-hidden bg-white/95 border border-gray-200/90 p-7 sm:p-8 flex flex-col justify-between transition-all duration-400 hover:shadow-2xl hover:-translate-y-2 hover:border-[var(--accent-mint)]/50 backdrop-blur-sm shadow-md",
        className
      )}
    >
      <div>
        {header && <div className="mb-5 overflow-hidden rounded-2xl">{header}</div>}
        <div className="flex items-center justify-between gap-2 mb-3">
          {tag && (
            <span className="text-xs font-mono tracking-wider uppercase px-3 py-1.5 rounded-full bg-slate-100 text-[var(--text-dark)] font-medium">
              {tag}
            </span>
          )}
          {icon && (
            <div className="text-[var(--text-muted)] group-hover/bento:text-[var(--text-dark)] transition-colors">
              {icon}
            </div>
          )}
        </div>
        <h4 className="text-2xl md:text-3xl font-serif text-[var(--text-dark)] group-hover/bento:text-[#2A528A] transition-colors leading-snug">
          {title}
        </h4>
        <p className="text-sm md:text-base text-[var(--text-muted)] mt-2.5 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm font-mono text-[var(--text-dark)] font-medium">
        <span>View Project</span>
        <span className="transform group-hover/bento:translate-x-1.5 transition-transform text-base">
          →
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}

export default BentoGrid;
