# Marimba.Designs — Engineering Handoff & Gap Analysis

Comprehensive technical audit and feature roadmap comparing the current Next.js implementation against the live production site [marimba.design](https://marimba.design/).

---

## 1. Feature Status & Matrix Overview

| Module / Surface | Current Status | Remaining Gap / Required Implementation | Priority |
| :--- | :--- | :--- | :--- |
| **Home: Entrance & Loader** | 🟢 Complete (10/10) | None. Bar fill, curtain exit, blur clearance verified. | Done |
| **Home: Hero Section** | 🟢 Complete | None. Headline, inline media badges, ambient shapes active. | Done |
| **Home: Orbit Trigonometry** | 🟢 Complete | Mobile fallback toggle polish (breakpoint `< 768px`). | Low |
| **Home: Work Showcase** | 🟡 Partial | Replace single showcase with interactive showreel switcher. | Medium |
| **Home: 3D Process Disks** | 🟢 Complete | 4-layer conic gradients, isometric angle, pinning active. | Done |
| **Home: Contact Inversion** | 🟢 Complete | Theme transition (`#212E02` bg, `#F0EFE9` text) verified. | Done |
| **Custom Magnetic Cursor** | 🟢 Complete | `lerp: 0.18`, work hover scale (`112px`), click scale (`120px`). | Done |
| **Work Index Page (`/work`)** | 🔴 Not Built | Multi-project slider, counter (`01/04`), pagination bars. | **High** |
| **About Page (`/about`)** | 🔴 Not Built | About hero, selfie layered graphics, experience timeline. | **High** |
| **Case Study Detail Pages** | 🔴 Not Built | 3D iPad tilt video, asymmetric gallery, phase switcher. | **High** |
| **Page-to-Page Transitions** | 🟡 Partial | Curtain slide wrapper between route navigations. | Medium |

---

## 2. Detailed Work Packages Still Needed

### Work Package 1: Work Index Page (`/work`)
**File Target**: `app/work/page.tsx` & `components/WorkSlider.tsx`

1. **Interactive Multi-Project Slider**:
   - 4 Featured Projects:
     1. **Hannah Macready**: Copywriter & Content Strategist Portfolio.
     2. **Mountain Mindset Therapy (MMT)**: Mental Health & Counseling Practice.
     3. **Charlie Holley**: Creative Direction & Brand Studio.
     4. **Precision Archery (PABC)**: Athletic Platform & Community.
2. **Fixed Numeric Counter**:
   - Format: `<span class="work-slider__counter-current">01</span> / 04`.
   - GSAP / Framer Motion vertical slide transition on project change.
3. **Interactive Pagination Pill Indicators**:
   - 4 vertical pill dots in the bottom left.
   - Active dot expands from `8px` to `32px` with animated progress fill bar (`--fill-height: 0% -> 100%`).
4. **Project Descriptions & CTA**:
   - Client title, category tags, project summary, and magnetic pill button `"View case study →"`.

---

### Work Package 2: About Page (`/about`)
**File Target**: `app/about/page.tsx` & `components/AboutHero.tsx`

1. **Hero Headline & Ambient Stars**:
   - Headline: `"Crafting digital experiences with character, clarity, and craft."`
   - Floating SVG starbursts and half-circle graphic backdrop.
2. **Layered Portrait & Shape Collage**:
   - Portrait photo (`/assets/title-selfie.jpg`) with floating ring texture (`about__image-shape-ring`) and starburst badge.
3. **Stats Counter Grid**:
   - `7+` Years Experience
   - `30+` Websites Launched
   - `10+` Industry Awards (Awwwards, CSS Winner, FWA)
4. **Experience & Career Timeline**:
   - 2-Column editorial layout:
     - Independent Digital Designer & Developer (`2021 – Present`)
     - Lead UI/UX Designer (`2019 – 2021`)
     - Digital Art Director (`2017 – 2019`)
5. **Personal Interests & Design Values**:
   - Editorial serif quotes, typography passion, outdoor/hiking inspirations.

---

### Work Package 3: Case Study Template Architecture (`/work/[slug]`)
**File Target**: `app/work/[slug]/page.tsx` & `components/case-study/*`

1. **Case Study Hero Section**:
   - Large 5vw serif project title.
   - Metadata grid: Role, Timeline, Tools, Client.
   - Full-bleed 16:9 hero video player.
2. **5-Column Editorial Layout Grid**:
   - Strict CSS grid alignment (`50px repeat(5, 1fr) 50px`).
   - Context, problem statement, client quote.
3. **Interactive Design Evolution Timeline**:
   - Interactive phase switcher (Discovery -> Wireframing -> Visual Design -> Development).
   - **3D Isometric iPad Mockup**:
     - Custom CSS 3D transform on nested video:
       ```css
       transform: perspective(4051px) rotateX(22deg) rotateY(28deg) rotateZ(-15deg) skew(2deg) rotate(-1deg);
       ```
4. **Asymmetric Off-Edge Image Galleries**:
   - Left/right bleed images extending beyond container margins (`margin-left: -144%`, `margin-right: -144%`).
   - Mobile mockup side-by-side floating carousels.
5. **Next Project Navigation**:
   - 2-Column bottom footer cards with auto-playing video hover previews.

---

### Work Package 4: Global Motion & Page Transition Engine
**File Target**: `components/PageTransitionProvider.tsx`

1. **Curtain Route Transitions**:
   - Intercept route changes via Next.js `useRouter` / `usePathname`.
   - Slide `#loader` curtain down (`yPercent: 0`), swap route, and slide up (`yPercent: -100`).
2. **Smooth Scroll Recalibration**:
   - On route change, execute `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()`.

---

## 3. Recommended Implementation Plan

1. **Step 1**: Scaffold `/work` page with the full 4-project slider and progress dot animations.
2. **Step 2**: Scaffold `/about` page with the portrait collage and experience timeline.
3. **Step 3**: Implement dynamic `/work/[slug]` template for Hannah Macready and MMT case studies.
4. **Step 4**: Integrate the global curtain page-transition coordinator.
