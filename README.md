# Marimba.Designs — Portfolio Template

Award-style creative portfolio built with **Next.js 15 (App Router)**, **GSAP + ScrollTrigger**, **Lenis** smooth scroll, and Tailwind CSS. Editorial serif headlines, organic conic-gradient process disks, a scroll-driven trigonometric orbit hero, and a grain-free linen aesthetic.

---

## Stack

| Area | Tool |
| :--- | :--- |
| Framework | Next.js 15 (App Router, React 19) |
| Motion | GSAP 3 + ScrollTrigger, Lenis, framer-motion (subpages) |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Fonts | Fraunces (display), Geist (body/UI), Roboto Mono (meta) via `next/font` |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## Customize the template

### 1. Identity, contact, links — `lib/siteConfig.ts` ✔ start here

Every piece of personal data lives in one file:

- `name`, `legalName`, `role`, `location`, `tagline`, `person`
- `email`, `socials` (Instagram / LinkedIn / Behance — swap or extend)
- `showreel.src` (homepage showcase video)
- `awards` links (CSS Winner, Awwwards)
- `testimonials` (home rotator: quote + author)
- `education` + `skills` + `resumeUrl` (About page; drop your PDF at `public/assets/resume.pdf`)
- `toolMarquee` (software + AI tool icons in the scrolling divider — icon SVGs live in `public/assets/tools/`)
- `metadataBase` / `domain` — **set to your deployed URL** (used for SEO)

Metadata (title, description, Open Graph, Twitter, theme-color) is generated from this file in `app/layout.tsx`. To add a social preview image, place one in `public/assets/` and add `openGraph.images` in `app/layout.tsx`.

### 2. Projects & case studies — `lib/projects.ts`

Projects power both `/work` (slider) and `/work/[slug]` (case study). Add/rename an entry and the pages update automatically:

```ts
{
  slug: "my-project",
  name: "My Project",
  tagline: "Subtitle",
  categories: ["Branding", "Web Design"],
  description: "Short slider blurb",
  media: { type: "video" | "placeholder", src?, gradient? },
  role: "Design & Development",
  timeline: "6 weeks",
  tools: "WordPress, GSAP, Figma",
  client: "Client name",
  heroDescription: "Case study intro",
  detailVideo: "https://...",
  accent: "#C1E4F7",
  phases: [{ id,label,date,title,description }, ...],
}
```

- `media.type: "video"` → host a file and point `src` at it.
- `media.type: "placeholder"` → gradient tile (great for templates you haven't filmed yet).

Optionally add per project:

- `results: [{ value: "+38%", label: "Client inquiries" }]` → results grid on the detail page
- `quote: { text, author }` → client/supervisor pull-quote
- `beforeAfter: { before, after, beforeLabel, afterLabel }` → scroll-scrubbed before/after comparison (CSS gradients or `url(...)` backgrounds)

### 3. Assets — `public/assets/`

| File | Purpose |
| :--- | :--- |
| `logo.svg` | Loading-logo + header brand |
| `shape-*.webp` | Hero orbit shapes (circles, star, leaf, asterisk texture) |
| `laptop-sequence-_00073.webp` | Laptop frame for the work showcase (showreel is clipped to its screen) |
| `tools/*.svg` | Software + AI tool icons for the marquee (official simple-icons marks + a few hand-drawn) |
| `resume.pdf` | Placeholder CV — replace with your own PDF (About page download) |

Swap the files and keep the names — zero code changes.

### 4. Colors & type

- **Tokens**: `:root` variables in `app/globals.css` (`--bg-light`, `--text-dark`, `--loader-bg`, …).
- **Tailwind colors**: `tailwind.config.ts` (`canvas`, `surface`, `olive`).
- **Fonts**: swap `next/font/google` imports in `app/layout.tsx`.
- **Palette reference**: `design-system.json`.

### 5. Homepage sections

All in one file — `components/MarimbaExactPortfolio.tsx`:

| Section | Notes |
| :--- | :--- |
| Loader + intro | Timing in `lib/heroExplode.ts` (loader bar fill, curtain, shape explosion) |
| Hero orbit | `lib/orbitEngine.ts` (scroll-scrubbed shape convergence) |
| Work showcase | Showreel clipped to the laptop screen (config via `siteConfig.showreel`) |
| Tools marquee | `components/ToolMarquee.tsx` (icon tiles, pauses on hover) |
| Kind words | `lib/testimonialRotator.ts` (autoplay + drag/swipe, prev/next, keyboard) |
| Process disks | `lib/processStack.ts` + markup in the section |
| Contact / Footer | Powered by `siteConfig` |

Sub-pages (`/about`, `/work`, `/work/[slug]`) share `components/SiteHeader.tsx` and `components/CursorDot.tsx`.

### 6. Reduced motion — automatic

`prefers-reduced-motion` is respected everywhere:

- Loader/intro explode is skipped; content appears instantly (`lib/heroExplode.ts`)
- Hero scroll fade drops blur/drift; autonomous orbit spin is disabled (`lib/orbitEngine.ts`)
- Showreel autoplay paused (`components/MarimbaExactPortfolio.tsx`)
- Global CSS kills transitions/animations (`app/globals.css`)

Verify with OS-level "reduce motion," DevTools rendering emulation, or `page.emulateMediaFeatures` in Playwright/Puppeteer.

---

## Architecture notes

- **GSAP engines** live in `lib/` and are mounted inside `useEffect` with full cleanup (StrictMode-safe).
- The homepage pins its backdrop (`hero-background` via ScrollTrigger). The pin-spacer is kept out of the flex flow with the `.hero .pin-spacer { position: absolute !important; }` rule in `app/globals.css` — do not remove it or `.hero-content` will be pushed below the fold.
- `components/index.ts` exports only the route-wired components. The older `MarimbaPortfolio`/`HeroSection`/`Header` framer-motion variants remain in the folder as reference but are not exported.
- Page-to-page navigations use a curtain overlay (`components/PageTransitionProvider.tsx`).

## Deployment

Any Node host works (Vercel, Netlify, your own server):

```bash
npm run build
npm run start
```

Remember to update `siteConfig.domain` / `metadataBase` to your live URL before deploying.