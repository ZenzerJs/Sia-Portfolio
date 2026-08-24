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
      "For Mass Culture Canada, I created and delivered an information session, introducing the newly launched Data Narrative and Arts (DNA) platform and demonstrating how data can support arts and cultural organizations.\n\nUsing core messaging and presentation requirements provided by leadership, along with an established colour and visual theme guide, I designed the presentation in Canva. I translated complex platform information into a clear and accessible narrative, guiding the audience through DNA’s purpose, key insights, and practical applications while creating space for discussion and questions.\n\nThe project brought together presentation design, information storytelling, research, and audience engagement to make data-driven concepts approachable and relevant to a creative-sector audience.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mass-culture-slide-1.jpg",
      gradient: "linear-gradient(135deg, #1E3A5F 0%, #476083 100%)",
      alt: "Mass Culture Info Session Presentation Deck",
    },
    role: "Project Coordinator",
    timeline: "January 2024",
    tools: "PowerPoint, Canva, Data Visualization, Slide Design",
    client: "Mass Culture Canada",
    heroDescription:
      "Created and delivered an information session and presentation for Mass Culture, introducing the DNA platform and its role in supporting arts and cultural organizations through data.",
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
      src: "/assets/cicu/showcase/showcase-slide-1.jpg",
      gradient: "linear-gradient(135deg, #FF007F 0%, #FF5F1F 100%)",
      alt: "Creative Industries Show Case",
    },
    role: "VP Marketing & Creative Director",
    timeline: "April 2024",
    tools: "Social Media Analytics, Canva, Adobe After Effects, Event Photography",
    client: "Toronto Metropolitan University",
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
      "As part of the Creative Industries Course Union (CICU), I supported the promotion and execution of Creative Industries Alumni Night, creating visual and informational content to build awareness and engagement around the event.\n\nI designed these promotional assets and informational materials on Canva and Adobe illustrator to communicate key event details and maintain a consistent visual identity across CICU’s communications. During the event, I captured and made a short form video highlighting key moments and creating real-time engagement with the CICU community.\n\nThe project combined event marketing, graphic design, and video production to strengthen alumni and student engagement both during and after the event.",
    media: {
      type: "image",
      src: "/assets/cicu/alum/alum-graphic-1.jpg",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      alt: "Creative Industries Alumni Night Promotion",
    },
    role: "VP Marketing & Creative Director",
    timeline: "February 2024",
    tools: "Canva, Adobe Illustrator, Video Editing, Social Graphics",
    client: "Toronto Metropolitan University",
    heroDescription:
      "Supported the promotion and execution of Creative Industries Alumni Night by designing promotional assets and informational materials.",
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
    title: "FIFA World Cup Campaign Strategy",
    tagline: "Global Hackathon Campaign & Brand Strategy",
    categories: ["Digital Marketing", "Campaign Strategy", "Brand Storytelling"],
    description:
      "I competed in a global digital marketing hackathon for the FIFA World Cup 2026, collaborating with an international team of students and creatives from the UK, Chile, Saudi Arabia, and the Netherlands to develop an audience engagement campaign.\n\nWorking remotely across multiple time zones, our team collaborated closely to develop the campaign strategy, creative concept, and visual direction within a fast-paced, deadline-driven environment. We used Canva to develop and present our campaign materials, bringing our ideas together into a cohesive visual concept before pitching our final campaign.\n\nThe project brought together digital marketing strategy, international collaboration, creative concept development, presentation design, and teamwork, challenging us to create a compelling campaign while coordinating across different countries, schedules, and time zones.",
    media: {
      type: "image",
      src: "/assets/decks/slides/fifa-slide-1.jpg",
      gradient: "linear-gradient(135deg, #0047FF 0%, #D4FF00 100%)",
      alt: "FIFA World Cup 2026 Campaign Strategy",
    },
    role: "Creative Collaborator",
    timeline: "February 2025",
    tools: "Canva, Presentation Design, Campaign Strategy, Brand Strategy",
    client: "FIFA World Cup 2026",
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
    name: "Mastercard Brand Reimagination",
    title: "Mastercard Brand Reimagination",
    tagline: "Brand Strategy & Visual Identity",
    categories: ["Brand Strategy", "Visual Identity"],
    description:
      "As part of my RTA 902 university course, I was challenged to take an existing brand and reimagine its identity for a new direction. I chose Mastercard and developed a brand concept focused on sustainability and environmental responsibility.\n\nUsing Canva, I developed a refreshed brand identity including new messaging, colour palette, typography, and brand imagery. I also created social media mockups across different platforms to demonstrate how the new identity could be applied consistently across digital communications.\n\nThe final concept was presented through a comprehensive brand strategy deck and presentation, strengthening my ability to analyze an existing brand, develop a creative direction, and translate it into cohesive visual communications.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mastercard-slide-1.jpg",
      gradient: "linear-gradient(135deg, #00A86B 0%, #001F3F 100%)",
      alt: "Mastercard Brand Reimagination presentation slide",
    },
    role: "Brand Strategist",
    timeline: "May 2023",
    tools: "Canva, Brand Strategy, Visual Identity, Social Media Design",
    client: "RTA 905 Professor",
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
    name: "The Good Gift Video",
    title: "The Good Gift Video",
    tagline: "Motion Design & Video Editing",
    categories: ["Motion Design", "Video Editing"],
    description:
      "As part of my CRI 300 university course, I created a short flat motion graphics video, taking the project from initial concept and graphic development through to the final animation.\n\nI designed the visual elements in Adobe Illustrator and brought them to life in Adobe After Effects, using movement, transitions, and timing to create a cohesive visual narrative. I completed the project with open-source audio, combining original graphics and animation into a polished motion-based piece.\n\nThe project strengthened my skills in graphic design, motion graphics, animation, and visual storytelling.",
    media: {
      type: "video",
      src: "/assets/videos/good-gift-visual.mp4",
      gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      alt: "The Good Gift Motion Graphic Preview",
    },
    role: "Graphic Designer / Video Editor",
    timeline: "November 2023",
    tools: "Adobe Illustrator, Adobe After Effects, Motion Graphics, Audio Design",
    client: "CRI 300 Professor",
    heroDescription:
      "Produced a flat motion graphics animation from initial vector illustration to final video rendering.",
    accent: "#EC4899",
    detailVideo: "/assets/videos/good-gift-visual.mp4",
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
