export interface ProjectMedia {
  type: "video" | "image" | "placeholder";
  src?: string;
  gradient?: string;
  alt?: string;
}

export interface EvolutionPhase {
  id: string;
  label: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  accent?: string;
  rotation?: string;
}

export interface OutputItem {
  title: string;
  category?: string;
  image: string;
  alt?: string;
  type?: "image" | "video";
}

export interface ProjectResult {
  value: string;
  label: string;
  sublabel?: string;
}

export type CaseStudyVariant = "data" | "sport" | "eco" | "culture" | "systems" | "cinematic";

export interface Project {
  slug: string;
  variant: CaseStudyVariant;
  name: string;
  title: string;
  tagline: string;
  categories: string[];
  description: string;
  media: ProjectMedia;
  role: string;
  timeline: string;
  tools: string;
  client: string;
  heroDescription: string;
  challenge?: string;
  strategy?: string;
  brief?: string;
  objective?: string;
  detailVideo?: string;
  deckPdf?: string;
  slides?: string[];
  gallery?: string[];
  outputs?: OutputItem[];
  phases: EvolutionPhase[];
  accent: string;
  accentLime?: string;
  accentBlue?: string;
  accentEco?: string;
  accentOrange?: string;
  accentPink?: string;
  results?: ProjectResult[];
  quote?: { text: string; author: string; role?: string };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
  };
}

export const projects: Project[] = [
  {
    slug: "mass-culture-info-session",
    variant: "data",
    name: "Mass Culture Info Session",
    title: "Mass Culture Info Session",
    tagline: "Data Storytelling & Presentation Design",
    categories: ["Data Storytelling", "Presentation Design"],
    description:
      "For Mass Culture Canada, I created and delivered an information session as part of our collaboration with Brenau University, introducing the newly launched Data Narrative and Arts (DNA) platform and demonstrating how data can support arts and cultural organizations.\n\nUsing core messaging and presentation requirements provided by leadership, along with an established colour and visual theme guide, I designed the presentation in Canva. I translated complex platform information into a clear and accessible narrative, guiding the audience through DNA’s purpose, key insights, and practical applications while creating space for discussion and questions.\n\nThe project brought together presentation design, information storytelling, research, and audience engagement to make data-driven concepts approachable and relevant to a creative-sector audience.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mass-culture-slide-1.jpg",
      gradient: "linear-gradient(135deg, #1E3A5F 0%, #476083 100%)",
      alt: "Mass Culture Info Session Presentation Deck",
    },
    role: "Project Coordinator",
    timeline: "January 2024",
    tools: "PowerPoint, Canva, Data Visualization, Slide Design",
    client: "Mass Culture Canada · Brenau University",
    heroDescription:
      "Created and delivered an information session and presentation for Mass Culture at Brenau University, introducing the DNA platform and its role in supporting arts and cultural organizations through data.",
    accent: "#1E3A5F",
    accentBlue: "#1E3A5F",
    deckPdf: "/assets/decks/mass-culture-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mass-culture-slide-1.jpg",
      "/assets/decks/slides/mass-culture-slide-2.jpg",
      "/assets/decks/slides/mass-culture-slide-3.jpg",
      "/assets/decks/slides/mass-culture-slide-4.jpg",
      "/assets/decks/slides/mass-culture-slide-5.jpg",
      "/assets/decks/slides/mass-culture-slide-6.jpg",
      "/assets/decks/slides/mass-culture-slide-7.jpg",
      "/assets/decks/slides/mass-culture-slide-8.jpg",
    ],
    phases: [],
  },
  {
    slug: "cicu-end-of-year-showcase",
    variant: "culture",
    name: "Creative Industries Show Case",
    title: "Creative Industries Show Case",
    tagline: "Event Promotion & Content Strategy",
    categories: ["Event Promotion", "Content Strategy"],
    description:
      "As part of the Creative Industries Course Union (CICU), I supported the planning and promotion of the annual Showcase, helping build anticipation, strengthen event visibility, and drive attendance leading up to the event.\n\nI created promotional graphics using Canva and Adobe After Effects, developing visual assets for CICU’s Instagram coordinating an countdown campaign to build excitement. I collaborated closely with CICU members to ensure that our promotional materials remained visually consistent and aligned. I also supported some live event photography, capturing the energy, atmosphere, and student experience throughout the showcase.\n\nThe project brought together event marketing, social media strategy, collaboration, and photography to create a campaign that connected the promotional experience with the live event.",
    media: {
      type: "image",
      src: "/assets/cicu/showcase/showcase-post-1.jpg",
      gradient: "linear-gradient(135deg, #FF007F 0%, #FF5F1F 100%)",
      alt: "Creative Industries Show Case",
    },
    role: "VP Marketing & Creative Director",
    timeline: "April 2024",
    tools: "Social Media Analytics, Canva, Adobe After Effects, Event Photography",
    client: "Toronto Metropolitan University Students",
    heroDescription:
      "Supported the planning and promotion of the annual End of Year Showcase for the Creative Industries Student Union (CICU) to build excitement and drive attendance.",
    accent: "#FF007F",
    accentPink: "#FF007F",
    detailVideo: "/assets/cicu/showcase/showcase-reel.mp4",
    slides: [
      "/assets/cicu/showcase/showcase-slide-1.jpg",
      "/assets/cicu/showcase/showcase-slide-2.jpg",
      "/assets/cicu/showcase/showcase-slide-3.jpg",
      "/assets/cicu/showcase/showcase-slide-4.jpg",
      "/assets/cicu/showcase/showcase-slide-5.jpg",
      "/assets/cicu/showcase/showcase-slide-6.jpg",
    ],
    phases: [],
  },
  {
    slug: "cicu-alumni-night",
    variant: "culture",
    name: "CICU Alumni Night",
    title: "Creative Industries Alumni Night",
    tagline: "Event Marketing & Social Media",
    categories: ["Event Marketing", "Social Media"],
    description:
      "Supported the promotion and execution of Creative Industries (CRI) Alumni Night by designing promotional assets and informational materials. During the event, captured and curated live social media content for Instagram and produced a post-event video recap to extend community engagement across digital channels.",
    media: {
      type: "image",
      src: "/assets/cicu/alum/alum-graphic-1.jpg",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      alt: "Creative Industries Alumni Night Promotion",
    },
    role: "Co-VP of Marketing & Social Strategist",
    timeline: "2024",
    tools: "Instagram Strategy, Video Editing, Social Graphics",
    client: "Creative Industries (CRI)",
    heroDescription:
      "Supported the promotion and execution of Creative Industries (CRI) Alumni Night by designing promotional assets and informational materials.",
    accent: "#8B5CF6",
    detailVideo: "/assets/cicu/alum/alum-reel.mp4",
    slides: [
      "/assets/cicu/alum/alum-graphic-1.jpg",
      "/assets/cicu/alum/alum-graphic-2.jpg",
      "/assets/cicu/alum/alum-graphic-3.jpg",
    ],
    phases: [],
  },
  {
    slug: "tmu-fifa-world-cup-challenge",
    variant: "sport",
    name: "FIFA World Cup Campaign",
    title: "FIFA World Cup Campaign Strategy & Motion Graphics",
    tagline: "Global Hackathon Strategy & Motion Graphics",
    categories: ["Digital Marketing", "Motion Graphics", "Brand Strategy"],
    description:
      "Competed in a global digital marketing hackathon developing a creative campaign strategy for the FIFA World Cup 2026. Collaborated with an international team across the UK, Chile, Saudi Arabia, and the Netherlands to develop, design, and pitch an audience engagement concept in a fast-paced environment, paired with a custom motion graphics video asset.",
    media: {
      type: "video",
      src: "/assets/videos/good-gift-visual.mov",
      gradient: "linear-gradient(135deg, #0047FF 0%, #D4FF00 100%)",
      alt: "FIFA World Cup Campaign Strategy & Motion Graphics",
    },
    role: "Digital Marketing & Creative Strategist",
    timeline: "Mar 2025",
    tools: "Figma, PowerPoint, Social Media Analytics, Brand Strategy, After Effects",
    client: "Toronto Metropolitan University · FIFA World Cup Challenge",
    heroDescription:
      "Competed in a global digital marketing hackathon developing a creative campaign strategy for the FIFA World Cup 2026.",
    accent: "#0047FF",
    accentBlue: "#0047FF",
    deckPdf: "/assets/decks/fifa-2026-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/fifa-slide-1.jpg",
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-5.jpg",
      "/assets/decks/slides/fifa-slide-7.jpg",
      "/assets/decks/slides/fifa-slide-10.jpg",
      "/assets/decks/slides/fifa-slide-15.jpg",
    ],
    phases: [],
  },
  {
    slug: "mastercard-sustainability",
    variant: "eco",
    name: "Mastercard Eco-Rebrand",
    title: "Mastercard Sustainability Brand Reimagination",
    tagline: "Brand Strategy & Visual Identity",
    categories: ["Brand Strategy", "Visual Identity"],
    description:
      "Reimagined Mastercard's brand identity around sustainability and environmental responsibility. Analyzed the core brand and formulated refreshed messaging, visual identity guidelines, and sustainable brand imagery compiled into an executive-level strategy deck and presentation.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mastercard-slide-1.jpg",
      gradient: "linear-gradient(135deg, #00A86B 0%, #001F3F 100%)",
      alt: "Mastercard Sustainability Brand Reimagination presentation slide",
    },
    role: "Brand Strategist & Creative Lead",
    timeline: "8 weeks",
    tools: "Figma, Presentation Design, Brand Strategy, Visual Identity",
    client: "RTA 902 Course Project",
    heroDescription:
      "Reimagined Mastercard's brand identity around sustainability and environmental responsibility.",
    accent: "#00A86B",
    accentEco: "#00A86B",
    deckPdf: "/assets/decks/rta-mastercard-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mastercard-slide-1.jpg",
      "/assets/decks/slides/mastercard-slide-2.jpg",
      "/assets/decks/slides/mastercard-slide-3.jpg",
      "/assets/decks/slides/mastercard-slide-4.jpg",
      "/assets/decks/slides/mastercard-slide-5.jpg",
      "/assets/decks/slides/mastercard-slide-6.jpg",
      "/assets/decks/slides/mastercard-slide-7.jpg",
      "/assets/decks/slides/mastercard-slide-8.jpg",
      "/assets/decks/slides/mastercard-slide-9.jpg",
      "/assets/decks/slides/mastercard-slide-10.jpg",
      "/assets/decks/slides/mastercard-slide-11.jpg",
    ],
    phases: [],
  },
  {
    slug: "motion-graphics-animation",
    variant: "cinematic",
    name: "2D Motion Graphics Animation",
    title: "2D Motion Graphics Animation & Editing",
    tagline: "Motion Design & Video Editing",
    categories: ["Motion Design", "Video Editing"],
    description:
      "Produced a flat motion graphics animation from initial vector illustration to final video rendering. Designed custom visual assets in Adobe Illustrator, animated dynamic transitions and pacing in Adobe After Effects, and synced with open-source audio to create an engaging motion-based narrative asset.",
    media: {
      type: "video",
      src: "/assets/cicu/showcase/showcase-reel.mp4",
      gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      alt: "2D Motion Graphics Animation & Editing Preview",
    },
    role: "Motion Designer & Video Editor",
    timeline: "2024",
    tools: "Adobe Illustrator, Adobe After Effects, Sound Design",
    client: "CRI 300 Course Project",
    heroDescription:
      "Produced a flat motion graphics animation from initial vector illustration to final video rendering.",
    accent: "#EC4899",
    phases: [],
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
