/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIG — the single source of truth for Shanesia Saha's portfolio.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Brand & identity */
  name: "Shanesia Saha",
  legalName: "Shanesia Saha",
  domain: "https://shanesia-saha-portfolio.vercel.app",
  role: "Communications, Marketing & Project Coordination",
  location: "London, United Kingdom · Toronto, Canada",
  tagline:
    "Translating complex ideas into resonant stories, data-driven marketing campaigns, and cross-institutional creative impact.",

  /** Owner — used on the About page and image alt text */
  person: {
    firstName: "Shanesia",
    fullName: "Shanesia Saha",
    portraitAlt: "Portrait of Shanesia Saha",
  },

  /** SEO */
  description:
    "Communications and Project Coordination professional specialising in digital campaigns, audience growth, brand strategy, and multi-stakeholder initiatives across arts, higher education, and public sector.",
  metadataBase: new URL("https://shanesia-saha-portfolio.vercel.app"),
  keywords: [
    "Shanesia Saha",
    "Communications",
    "Digital Marketing",
    "Project Coordination",
    "Content Strategy",
    "Brand Messaging",
    "Stakeholder Engagement",
    "Toronto Metropolitan University",
    "Mass Culture Canada",
    "London UK",
    "Creative Direction",
  ],

  /** Contact */
  email: "shanesiasaha@yahoo.ca",

  /** Socials (standardized across site: LinkedIn only) */
  socials: {
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shanesia-s-3286a82bb/",
    },
  },

  /** Awards / recognition links */
  awards: {
    fifaHackathon: {
      label: "FIFA World Cup Global Challenge — Runner Up (2025)",
      note: "Global Marketing Hackathon alongside UK, Chile, Saudi Arabia & Netherlands",
    },
    distinction: {
      label: "Graduated with Distinction & Dean's List (2022–2025)",
      note: "Toronto Metropolitan University, CGPA: 4.0 / 4.2",
    },
    westminsterExchange: {
      label: "Summer UK Intensive Scholar (2023)",
      note: "1 of 20 students selected for Westminster London AI & Emerging Tech Programme",
    },
  },

  /** Home showreel (work showcase section) */
  showreel: {
    src: "/assets/cicu/showcase/showcase-reel.mp4",
    fallbackReel: "/assets/cicu/alum/alum-reel.mp4",
    title: "Selected Campaign & Motion Visuals",
  },

  /** Education (About page) */
  education: [
    {
      school: "Toronto Metropolitan University — The Creative School",
      degree: "BA, Digital Communications and Business",
      period: "Aug 2021 — May 2025",
      note: "CGPA: 4.0 / 4.2 · Graduated with Distinction · Dean's List 2022–2025",
    },
    {
      school: "University of Westminster, London UK",
      degree: "Summer UK Intensive Programme (FCD 580)",
      period: "Jun 2023",
      note: "Art, AI & Emerging Creative Technologies · Selected 1 of 20 Students",
    },
  ],

  /** Skill matrix (About page) */
  skills: [
    "Digital Communications Strategy",
    "Campaign Marketing & KPI Reporting",
    "Cross-Institutional Partnerships",
    "Project Coordination & Timelines",
    "Copywriting & Content Creation",
    "Brand Messaging & Visual Design",
    "Email Marketing & Newsletters",
    "Stakeholder Engagement",
    "AIGC Prompting & AI Workflows",
    "Digital Accessibility & CMS Audit",
  ],

  /** Downloadable CV */
  resumeUrl: "/assets/resume.pdf",

  /** Testimonials rotator (home page) */
  testimonials: [
    {
      quote:
        "Shanesia possesses an extraordinary talent for translating dense research data and institutional goals into human-centred stories that captivate and convert.",
      author: "Mass Culture Canada — Project Leadership",
    },
    {
      quote:
        "From conceptualising multi-platform campaigns to coordinating cross-institutional teams, she brings rigorous project management and immense creative spark to every initiative.",
      author: "Toronto Metropolitan University — Academic Project Director",
    },
    {
      quote:
        "Her campaign strategy for our showcase brought record engagement across all digital channels. She doesn't just manage communications—she elevates the entire brand.",
      author: "Creative Industries Course Union (CICU) — Leadership Team",
    },
  ],

  /** Tools marquee (home page divider) — software + creative tools */
  toolMarquee: [
    { label: "Photoshop", icon: "/assets/tools/adobephotoshop.svg" },
    { label: "Illustrator", icon: "/assets/tools/adobeillustrator.svg" },
    { label: "After Effects", icon: "/assets/tools/adobeaftereffects.svg" },
    { label: "Canva", icon: "/assets/tools/canva.svg" },
    { label: "Blender", icon: "/assets/tools/blender.svg" },
    { label: "AutoCAD", icon: "/assets/tools/autocad.svg" },
    { label: "MS Office", icon: "/assets/tools/msoffice.svg" },
    { label: "Word", icon: "/assets/tools/microsoftword.svg" },
    { label: "Excel", icon: "/assets/tools/microsoftexcel.svg" },
    { label: "Teams", icon: "/assets/tools/microsoftteams.svg" },
    { label: "WordPress", icon: "/assets/tools/wordpress.svg" },
    { label: "Wix", icon: "/assets/tools/wix.svg" },
    { label: "Moodle", icon: "/assets/tools/moodle.svg" },
    { label: "Midjourney", icon: "/assets/tools/midjourney.svg" },
    { label: "Stable Diffusion", icon: "/assets/tools/stablediffusion.svg" },
  ],

  /** Footer */
  copyrightStartYear: 2026,

  /** Design tokens (mirrors `:root` in app/globals.css) */
  theme: {
    canvas: "#F8F9FA",
    surface: "#FAFAFA",
    navy: "#1E3A5F",
    navyDark: "#142A4A",
    muted: "#7C8AA0",
    loaderBackground: "#142A4A",
    accentSky: "#A8CBE8",
    accentLilac: "#C3C6E8",
    accentMint: "#8FB6D8",
    accentCoral: "#EFAF8C",
    accentLeaf: "#EFD0B4",
    accentAmber: "#E0AE62",
  },
} as const;