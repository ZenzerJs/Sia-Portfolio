# Marimba.Designs — Reverse-Engineering & Reconstruction Plan

Comprehensive audit and React/Next.js reconstruction blueprint for [marimba.design](https://marimba.design/).

---

## 1. Architectural Blueprint & Design System

### A. Design Aesthetic
- **Category**: Editorial Organic Modernism / Award-Winning Creative Portfolio.
- **Atmosphere**: Calm, tactile, crafted, typography-driven with dynamic mathematical motion (conic gradients, spring cursor, 3D disk stack).
- **Core Color Contrast**: High-contrast organic harmony between linen parchment (`#F0EFE9`) and deep forest olive (`#3A4A16`).

### B. Extracted Design Tokens

| Category | Token | Value | Notes |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--color-bg-canvas` | `#F0EFE9` (`rgb(240, 239, 233)`) | Warm paper/linen backdrop |
| **Card / Surface** | `--color-bg-card` | `#F1F0EA` (`rgb(241, 240, 234)`) | Subtle elevated container fill |
| **Text Primary** | `--color-text-primary` | `#3A4A16` (`rgb(58, 74, 22)`) | Deep natural olive green |
| **Text Secondary** | `--color-text-secondary` | `#212E02` (`rgb(33, 46, 2)`) | Darker olive variant |
| **Text Muted** | `--color-text-muted` | `#8F8F8E` (`rgb(143, 143, 142)`) | Neutral gray for subtext/dates |
| **Border / Stroke** | `--color-border-primary`| `#3A4A16` (15% - 35% opacity) | Hairline geometric borders |
| **Heading Font** | `--font-serif` | `"Instrument Serif", Georgia, serif` | Editorial elegance, italic accents |
| **Body Font** | `--font-sans` | `Geist, Inter, system-ui, sans-serif` | Clean, high-legibility sans |
| **Mono / Meta Font** | `--font-mono` | `"Roboto Mono", monospace` | Precision tags and coordinates |

### C. Conic Gradient Disks (Process Stack)
1. **Disk 4 ("Listen & define")**: `conic-gradient(from 90deg, #C1E4F7 0deg, #DAC6EB 360deg)`
2. **Disk 3 ("Strategy & plan")**: `conic-gradient(#93DD89 0deg, #FC6A00 360deg)`
3. **Disk 2 ("Design & refine")**: `conic-gradient(from 180deg, #DAC6EB 0deg, #93DD89 360deg)`
4. **Disk 1 ("Build & test")**: `conic-gradient(from 90deg, #F46732 0deg, #DAC6EB 360deg)`

---

## 2. React / Next.js Component Hierarchy

```
<MarimbaPortfolio>                       // Root container (bg-[#F0EFE9], text-[#3A4A16])
├── <CustomCursor />                     // Spring-physics cursor follower dot & "view work" tag
├── <Header>                             // Sticky 88px nav
│   ├── <BrandLogo />                    // SVG Wordmark
│   ├── <HeaderMeta />                   // Tag ("Digital designer") & location ("Calgary, Canada")
│   └── <Navigation />                   // Nav links (Home, Work, About, Contact)
│
├── <HeroSection>                        // Pinned hero viewport
│   ├── <HeroBackgroundShapes>           // Absolute positioned interactive ambient shapes
│   │   ├── <AstrixShape />              // Continuous rotating asterisk texture
│   │   ├── <OrbitingPlanet label="Visual design" />
│   │   ├── <OrbitingPlanet label="Interaction design" />
│   │   ├── <OrbitingPlanet label="UI/UX" />
│   │   └── <DecorativeLeafAndStars />
│   └── <HeroHeadline>                   // Large serif statement with inline interactive badges
│       ├── <InlineMediaBadge id="selfie" href="/about" />
│       └── <InlineMediaBadge id="website" href="/work" />
│
├── <ExpertiseSection>                   // Orbit ring / design practice highlight
│   ├── <ExpertiseRing desktop />        // GSAP / Framer Motion SVG orbital ring
│   └── <MobileVideoFallback mobile />   // Auto-playing seamless video loop
│
├── <WorkSection>                        // Featured showcase
│   ├── <LaptopFrame>                    // Isometric 3D laptop hardware frame
│   │   └── <ShowreelVideo />            // Autoplay looping showcase video
│   └── <WorkCursorTrigger />            // Magnetic target expanding custom cursor
│
├── <ProcessSection>                     // Pinned 4-step disk stack
│   ├── <ProcessHeadline />              // "Designing, building, and refining..."
│   └── <ProcessDisksStack>              // 4 Conic gradient isometric elliptical disks
│       ├── <ProcessDisk step="1" title="Listen & define" />
│       ├── <ProcessDisk step="2" title="Strategy & plan" />
│       ├── <ProcessDisk step="3" title="Design & refine" />
│       └── <ProcessDisk step="4" title="Build & test" />
│
├── <ContactSection>                     // Direct reach-out block
│   ├── <ContactHeadline />              // "Let's work together"
│   ├── <ContactBio />                   // Brief description & email CTA
│   └── <SocialLinks />                  // Instagram, LinkedIn, Behance
│
├── <Footer>                             // Site footer
│   ├── <Copyright />                    // © 2026 Marimba. Designs
│   └── <AwardBadges />                  // CSS Winner & Awwwards floating badges
```

---

## 3. Motion & Animation Profiling

### 1. Ambient Floating & Drifts
- **Shapes**: Sinusoidal floating path (`y: [0, -14, 0]`, `rotate: [0, 4, -4, 0]`) with `duration: 4s - 6s`, `ease: "easeInOut"`.
- **Asterisk Texture**: Continuous infinite 360° rotation (`duration: 25s`, `ease: "linear"`).

### 2. Custom Cursor Follower
- **Physics**: Smooth spring trajectory (`stiffness: 350, damping: 28, mass: 0.5`).
- **Interaction**:
  - Default: 8px solid olive dot.
  - Hover over Work/Interactive: morphs to 80px circle containing SVG arrow and `"view work"` label.

### 3. Process Section Stacking
- **Scroll Pinning**: Main process container pinned for 2000px scroll delta.
- **Disk Entry**: Disks start translated up (`translateY(-450px)` to `0px`) and scale `0.95 -> 1.0` with staggered opacity fade-in keyed to scroll progress.

---

## 4. Tailwind CSS Extension Configuration

```typescript
// tailwind.config.ts extension
export const marimbaTheme = {
  colors: {
    marimba: {
      canvas: "#F0EFE9",
      card: "#F1F0EA",
      olive: "#3A4A16",
      darkOlive: "#212E02",
      muted: "#8F8F8E",
      pure: "#FFFFFF",
      dark: "#020202",
    },
  },
  fontFamily: {
    serif: ["'Instrument Serif'", "Georgia", "serif"],
    sans: ["Geist", "Inter", "sans-serif"],
    mono: ["'Roboto Mono'", "monospace"],
  },
};
```
