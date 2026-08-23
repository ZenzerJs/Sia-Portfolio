# 🎨 Marimba.Designs — Creative Engineering & Design Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Smooth_Scroll-Lenis-black?style=flat-square)](https://lenis.darkroom.engineering/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

> An award-style creative portfolio built with Next.js 15 App Router, React 19, GSAP ScrollTrigger, and Lenis smooth scrolling. Features editorial serif typography, a scroll-driven trigonometric orbit hero, organic conic-gradient process disks, and seamless reduced-motion accessibility.

---

## 🌟 Key Features

- **Scroll-Driven Motion & Animations**: Orchestrated using GSAP 3 and ScrollTrigger, featuring a trigonometric hero orbit convergence (`orbitEngine.ts`), conic-gradient process disks (`processStack.ts`), and Lenis smooth scrolling.
- **Interactive Work & Case Studies**: Dynamic project showcases at `/work` with slider navigation and deep-dive case study layouts at `/work/[slug]`, driven centrally from `projects.ts`.
- **Curtain & Page Transitions**: Frictionless route navigation powered by curtain overlay transitions (`PageTransitionProvider.tsx`) and an interactive custom mouse cursor (`CursorDot.tsx`).
- **Centralized Site Configuration**: Single-file management for identity, social profiles, awards, dynamic tool marquees, and testimonials inside `siteConfig.ts`.
- **Automatic Reduced Motion**: Native `prefers-reduced-motion` compliance that gracefully disables intense orbit physics, video autoplay, and explosion effects.
- **Modern Typographic Hierarchy**: Editorial serif displays (Instrument Serif), modern body type (Geist), and clean metadata monospace (Roboto Mono) configured via `next/font`.

---

## 🏗️ Repository Architecture

```text
marimba/
├── public/
│   └── assets/                 # SVGs, WebP shapes, tool icons, & resume.pdf
├── src/
│   ├── app/                    # Next.js 15 App Router pages & metadata
│   │   ├── about/              # About page route
│   │   ├── work/               # Work portfolio & dynamic [slug] case studies
│   │   ├── globals.css         # Design tokens, CSS variables, & pin-spacer rules
│   │   ├── layout.tsx          # Font setups & dynamic Open Graph metadata
│   │   └── page.tsx            # Main landing page
│   ├── components/             # Modular UI & animation components
│   │   ├── CursorDot.tsx       # Custom mouse follower
│   │   ├── MarimbaExactPortfolio.tsx # Core homepage layout container
│   │   ├── PageTransitionProvider.tsx # Page-to-page curtain overlays
│   │   ├── SiteHeader.tsx      # Persistent site navigation
│   │   └── ToolMarquee.tsx     # Infinite scroll tool & software strip
│   └── lib/                    # Animation engines & structured content data
│       ├── heroExplode.ts      # Intro loader & curtain timing engine
│       ├── orbitEngine.ts      # Trigonometric scroll convergence math
│       ├── processStack.ts     # Conic-gradient process disk logic
│       ├── projects.ts         # Portfolio case study registry
│       ├── siteConfig.ts       # Global profile, links, & testimonial data
│       └── testimonialRotator.ts # Drag/swipe quote slider engine
├── design-system.json          # Core palette & color token specifications
├── tailwind.config.ts          # Custom Tailwind canvas, surface, & font configs
└── vercel.json                 # Vercel production hosting configuration
