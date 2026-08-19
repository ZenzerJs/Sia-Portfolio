/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIG — the single source of truth for content across the template.
 *
 * Everything below is safe to edit without touching component markup:
 * identity, contact details, socials, showreel, award links, year, and the
 * design tokens used for metadata.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Brand & identity */
  name: "Marimba Designs",
  legalName: "Marimba. Designs",
  domain: "https://marimba.design",
  role: "Communications, Marketing & Project Coordination",
  location: "Based in [Your City], [Country]",
  tagline:
    "I create living, breathing websites for brands that want to be felt, not just seen.",

  /** Owner — used on the About page and image alt text */
  person: {
    firstName: "Myranda",
    fullName: "Myranda Wicks",
    portraitAlt: "Portrait of Myranda Wicks",
  },

  /** SEO */
  description:
    "Digital designer crafting living, breathing websites for brands that want to be felt, not just seen. Web design and development with clarity, character, and craft.",
  metadataBase: new URL("https://marimba.design"),
  keywords: [
    "web design",
    "web development",
    "digital designer",
    "creative portfolio",
    "branding",
  ],

  /** Contact */
  email: "hello@marimba.design",

  /** Socials (used in contact + footer sections) */
  socials: {
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/marimba.design/",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/myrandawicks/",
    },
    behance: {
      label: "Behance",
      href: "https://www.behance.net/marimba-designs",
    },
  },

  /** Awards / recognition links */
  awards: {
    cssWinner: {
      label: "CSS Winner 2026",
      href: "https://www.csswinner.com/details/marimbadesigns-portfolio-website/19149",
    },
    awwwards: {
      label: "Awwwards Site of the Day",
      href: "https://www.awwwards.com/sites/marimba-designs-portfolio",
    },
  },

  /** Home showreel (work showcase section) */
  showreel: {
    src: "https://marimba.design/assets/showReel_1-opt.mp4",
    title: "Showreel — selected work",
  },

  /** Education (About page) */
  education: [
    {
      school: "University of Calgary",
      degree: "B.A. Communications & Design",
      period: "2023 — 2027",
      note: "Minor in Visual Studies · Dean's List",
    },
  ],

  /** Skill matrix (About page) */
  skills: [
    "Brand voice",
    "Copywriting",
    "Campaign strategy",
    "Social content",
    "Editorial design",
    "Typography",
    "User research",
    "Wireframing",
    "Web design",
    "Art direction",
  ],

  /** Downloadable CV (About page) — drop your PDF into public/assets/. */
  resumeUrl: "/assets/resume.pdf",

  /** Testimonials rotator (home page) */
  testimonials: [
    {
      quote:
        "One of the most thoughtful students I've worked with — she turns a vague brief into a clear story, then crafts every detail to serve it.",
      author: "Professor, Communications Program",
    },
    {
      quote:
        "She treated our campaign like her own — sharp copy, on-brand visuals, and a presentation the whole team wanted to steal.",
      author: "Internship Supervisor, Brand Studio",
    },
    {
      quote:
        "The site she built sounds like us and converts like crazy. Rare to find someone who cares about both the words and the pixels.",
      author: "Client, Small Business",
    },
  ],

  /** Tools marquee (home page divider) — software + AI tools. Icons are local
      SVGs in /public/assets/tools/ (official simple-icons marks, plus three
      hand-drawn marks for brands simple-icons no longer ships: Midjourney,
      Stable Diffusion, Microsoft Copilot — and a sparkle for Nano Banana,
      which has no official mark). */
  toolMarquee: [
    { label: "After Effects", icon: "/assets/tools/adobeaftereffects.svg" },
    { label: "Canva", icon: "/assets/tools/canva.svg" },
    { label: "PowerPoint", icon: "/assets/tools/microsoftpowerpoint.svg" },
    { label: "Word", icon: "/assets/tools/microsoftword.svg" },
    { label: "Excel", icon: "/assets/tools/microsoftexcel.svg" },
    { label: "Outlook", icon: "/assets/tools/microsoftoutlook.svg" },
    { label: "Teams", icon: "/assets/tools/microsoftteams.svg" },
    { label: "Photoshop", icon: "/assets/tools/adobephotoshop.svg" },
    { label: "Illustrator", icon: "/assets/tools/adobeillustrator.svg" },
    { label: "WordPress", icon: "/assets/tools/wordpress.svg" },
    { label: "Wix", icon: "/assets/tools/wix.svg" },
    { label: "Moodle", icon: "/assets/tools/moodle.svg" },
    { label: "Midjourney", icon: "/assets/tools/midjourney.svg" },
    { label: "Stable Diffusion", icon: "/assets/tools/stablediffusion.svg" },
    { label: "ChatGPT", icon: "/assets/tools/openai.svg" },
    { label: "Claude", icon: "/assets/tools/claude.svg" },
    { label: "Gemini", icon: "/assets/tools/googlegemini.svg" },
    { label: "Nano Banana", icon: "/assets/tools/nanobanana.svg" },
    { label: "Copilot", icon: "/assets/tools/microsoftcopilot.svg" },
  ],

  /** Footer */
  copyrightStartYear: 2026,

  /** Design tokens (mirrors `:root` in app/globals.css) */
  theme: {
    canvas: "#F0EFE9",
    surface: "#F1F0EA",
    olive: "#1E3A5F",
    oliveDark: "#142A4A",
    muted: "#7C8AA0",
    loaderBackground: "#142A4A",
    /** Brand accent pastels — used by the hero shapes, orbit ring, and
        placeholder project tiles. Change these to re-skin the template. */
    accentSky: "#A8CBE8",
    accentLilac: "#C3C6E8",
    accentMint: "#A9C6A4",
    accentCoral: "#EFAF8C",
    accentLeaf: "#C9D9B6",
    accentAmber: "#E0AE62",
  },
} as const;