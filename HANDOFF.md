# HANDOFF — Portfolio Template

Handoff doc for the polish-phase state of the portfolio template (created Aug 18, 2026).
The polish phase is complete and the template is ready for final customization
(brand name, location, real projects, real links).

---

## 1. Quick status

- **Stack:** Next.js 15 (App Router, React 19), GSAP 3 + ScrollTrigger, Lenis, Tailwind 3.
- **Theme:** cream-free **white canvas + navy** — canvas `#FFFFFF`, text `#1E3A5F`,
  dark sections `#142A4A`, muted `#7C8AA0`, pastel accents (sky/lilac/powder blue/
  coral/peach/amber).
- **Fonts:** **Instrument Serif** (display), Geist (body/UI), Roboto Mono (meta) via `next/font`.
- **Homepage:** loader + shape "throw-out" intro, pinned orbit hero, MacBook showreel,
  tools marquee, testimonials rotator, process disks, contact/footer — all in
  `components/MarimbaExactPortfolio.tsx` + `lib/*` GSAP engines.
- **Git:** clean checkpoint chain (see §7). Run `npm run dev` / `npm run build` to verify.

### Still needed from the owner (template placeholders)

| Item | Where | Current value |
| :--- | :--- | :--- |
| Brand name | `lib/siteConfig.ts` (`name`, `legalName`) | "Marimba Designs" (template) |
| Location | `lib/siteConfig.ts` (`location`) | `"Based in [Your City], [Country]"` |
| Projects | `lib/projects.ts` | Template placeholders |
| Showreel video | `siteConfig.showreel.src` | `https://marimba.design/assets/showReel_1-opt.mp4` |
| Email / socials / awards | `siteConfig` | marimba.design placeholders |
| Resume PDF | `public/assets/resume.pdf` | Placeholder |
| Deployed domain | `siteConfig.domain` / `metadataBase` | `https://marimba.design` |
| Favicon | `app/layout.tsx` icons | `/assets/asset 0.svg` |
| Tool marquee list | `siteConfig.toolMarquee` | 19 icons in `public/assets/tools/*.svg` |

---

## 2. Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (type-checks via next build)
npx tsc --noEmit     # fast typecheck
npm run start        # serve production build
```

Windows note: terminal commands run in Git Bash (POSIX syntax).

---

## 3. Theme — where the tokens live

Single-source truth is the `:root` block in `app/globals.css`:

```css
--bg-light: #FFFFFF;  --text-dark: #1E3A5F;  --loader-bg: #142A4A;
--accent-sky: #A8CBE8;   /* light blue */
--accent-lilac: #C3C6E8; /* lavender */
--accent-mint: #8FB6D8;  /* powder blue (was green) */
--accent-coral: #EFAF8C; /* orange */
--accent-leaf: #EFD0B4;  /* pale peach (was green) */
--accent-amber: #E0AE62; /* deep orange */
--text-muted: #7C8AA0;
```

- **Tailwind mirror:** `tailwind.config.ts` — `canvas`, `surface`, `navy` (+ `navy.dark`, `navy.muted`).
- **TS mirror:** `siteConfig.theme` in `lib/siteConfig.ts` (used for `themeColor` metadata).
- **Palette reference doc:** `design-system.json` (documentation only, not wired).
- **Fonts:** swap the `next/font/google` imports in `app/layout.tsx` (currently
  `Instrument_Serif`, `Geist`, `Roboto_Mono`).
- Hardcoded accent hexes in components were tokenized during theming; the hero
  asset tints (hue-rotate filters on `.shape-* .shape-img` in `globals.css`) are the
  remaining "recolor" knobs for the baked `.webp` shapes.

---

## 4. Homepage motion systems (`lib/`)

| Engine | Job |
| :--- | :--- |
| `heroExplode.ts` | Loader curtain, logo fill, then the shape **throw-out** intro. **Only the two asterisks tumble in 3D** (`#shape-astrix`, `#shape-astrix-2`); circles/leaf/starburst pop flat. Astrix #1 keeps its continuous idle z-spin; #2 has its own opposite-direction idle loop. |
| `orbitEngine.ts` | Scroll-scrubbed orbit convergence of the hero shapes. **The "My design practice" center label is deliberately NOT tracked** — it stays fixed and centered. |
| `processStack.ts` | Process disk stack lift on scroll. |
| `workSlider.ts` | `/work` slider. |
| `testimonialRotator.ts` | Testimonials autoplay + drag/swipe, prev/next, keyboard. |
| `beforeAfter.ts`, `caseStudy.ts` | Case-study before/after scrub + hero. |
| `themeScroll.ts` | Header/hero theme inversion as you scroll. |
| `cursor.ts` | Custom cursor. |
| `smoothScroll.ts` | Lenis smooth scroll. |

All engines mount in `useEffect` with full cleanup (StrictMode-safe) and honor
`prefers-reduced-motion` (intro skipped, orbit spin disabled, showreel paused,
global CSS kills transitions).

**Do not remove** the `.hero .pin-spacer { position: absolute !important; }` rule
in `globals.css` — it keeps the pinned hero background out of the flex flow, or
`.hero-content` falls below the fold.

---

## 5. Layout notes (current state)

- **Header:** brand left, nav right, center column pinned to the 5-column grid
  (`50px` gutters, cells `(100vw − 100px)/5`). The **role sits on grid line 2/5**
  and the **location stacks beneath it** (muted, smaller) — it was moved off the
  3/5 line because the 48-char role collided with it on laptop widths.
- **Hero text:** centered; headline `clamp(2.6rem → 5.25rem)` Instrument Serif,
  `text-wrap: balance`; tag pill above it.
- **Marquee:** infinite scroll, **no hover pause** (pauses only on keyboard focus).
  Duplicated track loops at exactly −50% — each tile carries its own right margin
  so there's no seam jump.
- **Grid lines** (`body::before`): decorative 5-column overlay at `rgba(30,58,95,…)`.
- Mobile (≤768px): header center hidden, orbit shapes + ring hidden, mobile video
  replaces the MacBook, grid lines off.

---

## 6. File map (key files)

| Area | Files |
| :--- | :--- |
| Routes | `app/page.tsx` (home), `app/about/page.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/layout.tsx` |
| Homepage | `components/MarimbaExactPortfolio.tsx`, `components/ToolMarquee.tsx`, `components/MacbookLaptop.tsx`, `components/BeforeAfterSlider.tsx` |
| Subpages | `components/AboutPage.tsx`, `components/WorkPage.tsx`, `components/CaseStudyPage.tsx`, `components/SiteHeader.tsx` |
| Shell | `components/SmoothScrollProvider.tsx`, `components/PageTransitionProvider.tsx`, `components/CursorDot.tsx`, `components/BlindsLightingOverlay.tsx` |
| Content | `lib/siteConfig.ts` (identity/contact), `lib/projects.ts` (projects), `lib/about.ts` |
| Motion | `lib/*.ts` — see §4 |
| Styling | `app/globals.css` (design system), `tailwind.config.ts` |
| Assets | `public/assets/` — `logo.svg`, `shape-*.webp`, `shape-astrix.svg`, `shape-astrix-2.svg`, `tools/*.svg`, `resume.pdf` |
| Reference (not in build) | `pulled-css&js/` (original site CSS/JS), `marimba.design-svg/`, `design-system.json` |
| Component surface | `components/index.ts` — exports only route-wired components |

**Legacy components kept for reference, NOT exported:** `Header.tsx`,
`HeroSection.tsx`, `MarimbaPortfolio.tsx`, `ExpertiseRing.tsx`, `ProcessSection.tsx`,
`WorkSection.tsx`, `ContactSection.tsx`, `Footer.tsx`, `CustomCursor.tsx`.

**Hero asset gotcha:** `shape-astrix.png` (the original mask) was byte-identical to
`texture-astrix.png`, so the asterisk rendered as a rectangle. It was replaced by
hand-built SVGs (`shape-astrix.svg`, `shape-astrix-2.svg`) with themed gradients.

---

## 7. Git checkpoints (newest first)

```
c6d7082  Polish: marquee never pauses on hover, fix header text collision, purge remaining greens
bf83509  Polish: navy tool icons, true white canvas, green assets recolored
68b1253  Polish: navy logo, white canvas, cool-tinted hero assets
a14ded8  Customize: navy blue theme, Instrument Serif, new role
096b10b  Theming: tokenize remaining accent colors into CSS vars
9654595  Polish: centralize palette, enable Fraunces axes, refine type rhythm
f3f865a  Checkpoint: portfolio template baseline before polish phase
```

`.gitignore` excludes `node_modules/` and `.next/`.

---

## 8. Customization checklist (the next session)

1. `lib/siteConfig.ts` — name, legalName, location, email, socials, awards, showreel,
   education, skills, testimonials, `domain`/`metadataBase`.
2. `lib/projects.ts` — replace placeholder projects; media can be `placeholder`
   gradients until real videos exist.
3. `public/assets/` — swap `logo.svg` to the owner's wordmark (single-color navy
   fill works for both header and loader — the loader lightens it via a filter),
   replace `resume.pdf`, add project media.
4. Re-skin knobs: `:root` tokens in `globals.css`, hue-rotate filters on the hero
   `.webp` shapes, `tailwind.config.ts` navy scale.
5. Verify: `npm run build` + `npx tsc --noEmit`, then check reduced-motion mode.
