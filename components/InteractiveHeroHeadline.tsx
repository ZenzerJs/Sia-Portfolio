// components/InteractiveHeroHeadline.tsx
'use client';

import React from 'react';

export function InteractiveHeroHeadline() {
  return (
    <h1
      className="hero-headline font-serif font-normal leading-[1.12] text-center max-w-4xl mx-auto select-none cursor-default text-[#1E3A5F] tracking-tight"
      style={{
        textShadow:
          '0 2px 4px rgba(30, 58, 95, 0.08), 0 8px 24px rgba(30, 58, 95, 0.14), 0 16px 40px rgba(30, 58, 95, 0.07)',
      }}
    >
      Connecting data, research, and community
      <br className="hidden sm:inline" />
      {' '}through strategic storytelling
      <br className="hidden sm:inline" />
      {' '}and digital media.
    </h1>
  );
}

export default InteractiveHeroHeadline;
