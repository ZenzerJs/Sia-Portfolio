export interface ProjectMedia {
  /** "video" for a hotlinked/asset video, "placeholder" for a gradient tile. */
  type: "video" | "placeholder";
  src?: string;
  /** Gradient used for placeholder tiles. */
  gradient?: string;
}

export interface EvolutionPhase {
  id: string;
  label: string;
  date: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  /** Short name used in the work slider. */
  name: string;
  title: string;
  tagline: string;
  categories: string[];
  description: string;
  media: ProjectMedia;
  /** Meta grid shown in the case study hero. */
  role: string;
  timeline: string;
  tools: string;
  client: string;
  heroDescription: string;
  /** Optional video used inside the 3D tilted "iPad" mockup on the detail page. */
  detailVideo?: string;
  phases: EvolutionPhase[];
  accent: string;
  /** Measurable outcomes — shown as a results grid on the detail page. */
  results?: { value: string; label: string }[];
  /** Client/supervisor pull-quote shown on the detail page. */
  quote?: { text: string; author: string };
  /** Before/after scrub slider — `before`/`after` are CSS backgrounds
      (gradients or `url(...)`); shown only when present. */
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
  };
}

export const projects: Project[] = [
  {
    slug: "hannah-macready",
    name: "Hannah Macready",
    title: "Hannah Macready",
    tagline: "Copywriter & Content Strategist",
    categories: ["Copywriting", "Content Strategy", "Web Design"],
    description:
      "A warm, editorial portfolio for a copywriter who helps brands find their voice — built to feel like reading a well-crafted essay.",
    media: {
      type: "placeholder",
      gradient: "linear-gradient(135deg, #C1E4F7 0%, #DAC6EB 100%)",
    },
    role: "Design & Development",
    timeline: "6 weeks",
    tools: "WordPress, GSAP, Figma",
    client: "Hannah Macready",
    heroDescription:
      "Giving a words-first brand a digital home that reads as beautifully as it writes.",
    accent: "#C1E4F7",
    results: [
      { value: "+38%", label: "Client inquiries" },
      { value: "2.1×", label: "Time on page" },
      { value: "#1", label: "Keyword result" },
    ],
    quote: {
      text: "The site finally sounds like me — every word in place, and it made clients take me more seriously before we even met.",
      author: "Hannah Macready — Copywriter & Content Strategist",
    },
    beforeAfter: {
      before: "linear-gradient(135deg, #8F9BB3 0%, #C1C9D9 100%)",
      after: "linear-gradient(135deg, #C1E4F7 0%, #DAC6EB 100%)",
      beforeLabel: "Before",
      afterLabel: "After",
    },
    phases: [
      {
        id: "discovery",
        label: "Discovery",
        date: "Week 1–2",
        title: "Finding the voice",
        description:
          "Stakeholder interviews and content audits to understand Hannah's tone, audience, and what makes her writing land.",
      },
      {
        id: "wireframes",
        label: "Wireframes",
        date: "Week 3",
        title: "Editorial structure",
        description:
          "Low-fidelity layouts focused on readability, pacing, and letting the words lead the experience.",
      },
      {
        id: "visual",
        label: "Visual Design",
        date: "Week 4–5",
        title: "Warm editorial art direction",
        description:
          "Serif-led typography, soft paper tones, and quiet motion that frames the writing without competing with it.",
      },
      {
        id: "build",
        label: "Build",
        date: "Week 6",
        title: "Crafted in WordPress",
        description:
          "A flexible, content-first build with scroll-triggered reveals and an easy-to-edit blog system.",
      },
    ],
  },
  {
    slug: "mountain-mindset-therapy",
    name: "Mountain Mindset Therapy",
    title: "Mountain Mindset Therapy",
    tagline: "Mental Health & Counseling Practice",
    categories: ["Healthcare", "Brand", "Web Design"],
    description:
      "A calm, grounding website for a counseling practice — designed to feel safe, human, and reassuring from the first visit.",
    media: {
      type: "placeholder",
      gradient: "linear-gradient(135deg, #93DD89 0%, #C5E1A5 100%)",
    },
    role: "Design & Development",
    timeline: "8 weeks",
    tools: "WordPress, GSAP, Figma",
    client: "Mountain Mindset Therapy",
    detailVideo: "https://marimba.design/assets/MMT/MMT-V1-opt2.mp4",
    heroDescription:
      "Making mental health support feel approachable through warm, human-centered design.",
    accent: "#93DD89",
    results: [
      { value: "+45%", label: "Booking inquiries" },
      { value: "−32%", label: "Bounce rate" },
      { value: "9.4/10", label: "Ease-of-use rating" },
    ],
    quote: {
      text: "Patients told us the site felt like the calmest part of their day — that is exactly what we hoped it could do.",
      author: "Founder — Mountain Mindset Therapy",
    },
    beforeAfter: {
      before: "linear-gradient(135deg, #6d7a86 0%, #9aa7b0 100%)",
      after: "linear-gradient(135deg, #93DD89 0%, #C5E1A5 100%)",
      beforeLabel: "Before",
      afterLabel: "After",
    },
    phases: [
      {
        id: "discovery",
        label: "Discovery",
        date: "Week 1–2",
        title: "Understanding the practice",
        description:
          "Workshops with the therapists to understand their approach, services, and the emotions they wanted patients to feel.",
      },
      {
        id: "wireframes",
        label: "Wireframes",
        date: "Week 3–4",
        title: "Calm information architecture",
        description:
          "Clear paths to booking, services, and resources — no friction, no overwhelm.",
      },
      {
        id: "visual",
        label: "Visual Design",
        date: "Week 5–6",
        title: "Warm, grounded visual language",
        description:
          "Natural palettes, organic shapes, and gentle typography that mirror the practice's mountain-minded philosophy.",
      },
      {
        id: "build",
        label: "Build",
        date: "Week 7–8",
        title: "Accessible, empathetic build",
        description:
          "WCAG-conscious development with reduced-motion fallbacks and a content system the team can manage themselves.",
      },
    ],
  },
  {
    slug: "charlie-holley",
    name: "Charlie Holley",
    title: "Charlie Holley",
    tagline: "Creative Direction & Brand Studio",
    categories: ["Branding", "Creative Direction", "Web Design"],
    description:
      "A bold, characterful site for a creative director — balancing editorial confidence with playful, unexpected moments.",
    media: {
      type: "placeholder",
      gradient: "linear-gradient(135deg, #FFCBF3 0%, #E8A5C4 100%)",
    },
    role: "Design & Development",
    timeline: "7 weeks",
    tools: "WordPress, GSAP, Figma",
    client: "Charlie Holley",
    heroDescription:
      "A portfolio with personality to match — expressive, confident, and unmistakably his.",
    accent: "#FFCBF3",
    results: [
      { value: "3×", label: "Project inquiries" },
      { value: "+27%", label: "Newsletter signups" },
      { value: "SOTD", label: "Awwwards mention" },
    ],
    quote: {
      text: "It has exactly the personality I wanted the portfolio to have — confident, a little playful, unmistakably mine.",
      author: "Charlie Holley — Creative Director",
    },
    phases: [
      {
        id: "discovery",
        label: "Discovery",
        date: "Week 1–2",
        title: "Defining the character",
        description:
          "Brand workshops to distill Charlie's point of view, voice, and the kind of work he wanted to attract.",
      },
      {
        id: "wireframes",
        label: "Wireframes",
        date: "Week 3",
        title: "Big, editorial moments",
        description:
          "Layouts built around large imagery, strong type, and a rhythm that lets projects breathe.",
      },
      {
        id: "visual",
        label: "Visual Design",
        date: "Week 4–6",
        title: "Confidence with a wink",
        description:
          "A distinctive color story and typographic system that feel authored — never templated.",
      },
      {
        id: "build",
        label: "Build",
        date: "Week 7",
        title: "Motion that feels alive",
        description:
          "Scroll-driven transitions and hover states that reward exploration without slowing it down.",
      },
    ],
  },
  {
    slug: "precision-archery",
    name: "Precision Archery",
    title: "Precision Archery",
    tagline: "Athletic Platform & Community",
    categories: ["Athletics", "Community", "Web Design"],
    description:
      "An energetic hub for an archery community — scheduling, events, and member stories in one focused, fast experience.",
    media: {
      type: "placeholder",
      gradient: "linear-gradient(135deg, #F46732 0%, #FC6A00 100%)",
    },
    role: "Design & Development",
    timeline: "6 weeks",
    tools: "WordPress, GSAP, Figma",
    client: "Precision Archery & Bowhunting Club",
    heroDescription:
      "A digital clubhouse that brings an athletic community together — schedules, events, and stories in one place.",
    accent: "#F46732",
    results: [
      { value: "+60%", label: "Event registrations" },
      { value: "12k+", label: "Monthly visitors" },
      { value: "4.8★", label: "Member feedback" },
    ],
    quote: {
      text: "Members finally know where everything is. Registration numbers went up within a month of launch.",
      author: "Club Director — Precision Archery & Bowhunting Club",
    },
    phases: [
      {
        id: "discovery",
        label: "Discovery",
        date: "Week 1–2",
        title: "Mapping the community",
        description:
          "Interviews with members and coaches to understand the rhythms of a club — from weekly practice to big tournaments.",
      },
      {
        id: "wireframes",
        label: "Wireframes",
        date: "Week 3",
        title: "One place for everything",
        description:
          "Consolidating scheduling, registration, and news into a single, easy-to-scan structure.",
      },
      {
        id: "visual",
        label: "Visual Design",
        date: "Week 4–5",
        title: "Energetic and precise",
        description:
          "Bold typography and sharp grids that echo the focus of the sport while keeping things friendly.",
      },
      {
        id: "build",
        label: "Build",
        date: "Week 6",
        title: "Fast and functional",
        description:
          "A performant build with integrated event calendars and member sign-up flows.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function getPreviousProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index - 1 + projects.length) % projects.length];
}
