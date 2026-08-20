"use client";

import React from "react";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Tools marquee — software + AI tool icons (icon + short label) in an infinite
 * moving row. Pauses on hover so the row is readable while a user interacts
 * with it. Reduced-motion users get a static row via the global CSS rule.
 */
export function ToolMarquee() {
  const tools = siteConfig.toolMarquee;
  // Duplicate the set so the -50% translate loop is seamless. The duplicate
  // half is aria-hidden so screen readers don't announce every item twice;
  // the visible labels on the first half are the accessible names.
  const items = [
    ...tools.map((tool, i) => ({ ...tool, key: `a-${i}`, hidden: false })),
    ...tools.map((tool, i) => ({ ...tool, key: `b-${i}`, hidden: true })),
  ];

  return (
    <div className="marquee marquee--tools" aria-label="Software and AI tools">
      <div className="marquee__track marquee__track--tools">
        {items.map((tool) => (
          <div
            key={tool.key}
            className="marquee__tool"
            aria-hidden={tool.hidden || undefined}
          >
            <span className="marquee__tool-icon" aria-hidden="true">
              <img
                src={tool.icon}
                alt=""
                width="34"
                height="34"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="marquee__tool-label">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolMarquee;
