export interface ProjectMedia {
  type: "video" | "image" | "placeholder";
  src?: string;
  gradient?: string;
}

export interface EvolutionPhase {
  id: string;
  label: string;
  date: string;
  title: string;
  description: string;
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
  brief?: string;
  objective?: string;
  detailVideo?: string;
  deckPdf?: string;
  slides?: string[];
  gallery?: string[];
  phases: EvolutionPhase[];
  accent: string;
  results?: { value: string; label: string }[];
  quote?: { text: string; author: string };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
  };
}

export const projects: Project[] = [
  {
    slug: "mass-culture-dna",
    variant: "data",
    name: "Mass Culture DNA",
    title: "Mass Culture Canada — Data Narratives for the Arts",
    tagline: "Digital Communications Strategy & Cross-Institutional Coordination",
    categories: ["Communications", "Data Storytelling", "Project Coordination"],
    description:
      "A data-driven digital communications strategy and platform launch for Canada's national arts research organisation, translating complex sector analytics into human stories.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mass-culture-slide-1.jpg",
      gradient: "linear-gradient(135deg, #A8CBE8 0%, #C3C6E8 100%)",
    },
    role: "Project Coordinator & Digital Strategist",
    timeline: "Dec 2024 — Apr 2025",
    tools: "LinkedIn, MailerLite, Canva, PowerPoint, Data Analytics",
    client: "Mass Culture Canada · Brenau University",
    heroDescription:
      "Translating complex cultural research and sector data into engaging multi-platform narratives, national newsletters, and cross-institutional campaigns.",
    brief: "Mass Culture Canada and Brenau University needed a communications system that could make arts-sector research legible, useful, and shareable across a national network.",
    objective: "Turn dense research and institutional priorities into human-centred stories that grow participation and create measurable audience momentum.",
    accent: "#A8CBE8",
    deckPdf: "/assets/decks/mass-culture-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mass-culture-slide-1.jpg",
      "/assets/decks/slides/mass-culture-slide-3.jpg",
      "/assets/decks/slides/mass-culture-slide-4.jpg",
      "/assets/decks/slides/mass-culture-slide-5.jpg",
      "/assets/decks/slides/mass-culture-slide-8.jpg",
      "/assets/decks/slides/river-clyde-slide-1.jpg",
    ],
    gallery: [
      "/assets/social-campaigns/654651294_18520046998073873_8861659328534541782_n.jpg",
      "/assets/social-campaigns/657330996_18523546387073873_6501039019688977632_n.jpg",
      "/assets/social-campaigns/657940324_18524237413073873_4812515398533879252_n.jpg",
      "/assets/social-campaigns/658961156_18525005860073873_6256835132353504235_n.jpg",
      "/assets/social-campaigns/662825545_18525195049073873_5801258258147508811_n.jpg",
    ],
    results: [
      { value: "74K+", label: "Total Audience Reach" },
      { value: "+42%", label: "Engagement Rate Increase" },
      { value: "13K+", label: "Monthly Digital Views" },
      { value: "5+", label: "Partner Institutions" },
    ],
    quote: {
      text: "Shanesia possesses an extraordinary talent for translating dense research data and institutional goals into human-centred stories that captivate and convert.",
      author: "Project Leadership — Mass Culture Canada",
    },
    beforeAfter: {
      before: "url('/assets/social-campaigns/657330996_18523546387073873_6501039019688977632_n.jpg')",
      after: "url('/assets/decks/slides/mass-culture-slide-1.jpg')",
      beforeLabel: "Research Inputs",
      afterLabel: "DNA Visual Storytelling",
    },
    phases: [
      {
        id: "discovery",
        label: "Research & Audit",
        date: "Dec 2024",
        title: "Mapping Arts Sector Insights",
        description:
          "Conducted comprehensive content audits and reviewed Brenau University thesis research to distill key brand narratives for arts service organisations.",
      },
      {
        id: "strategy",
        label: "Campaign Strategy",
        date: "Jan — Feb 2025",
        title: "Multi-Platform Audience Framework",
        description:
          "Developed audience segmentation frameworks across LinkedIn, X, Instagram, and MailerLite newsletters with dedicated KPIs and data-coaching series.",
      },
      {
        id: "launch",
        label: "DNA Platform Launch",
        date: "Mar 2025",
        title: "Creative Champions Network Debut",
        description:
          "Led national debut of the Data Narrative for the Arts (DNA) platform at the Spring Social, coordinating presentation decks, press graphics, and live outreach.",
      },
      {
        id: "optimization",
        label: "KPI Analytics",
        date: "Apr 2025",
        title: "Performance Optimisation & River Clyde Rollout",
        description:
          "Established analytics dashboards tracking registration conversion, community feedback loops, and campaign amplification for River Clyde Arts.",
      },
    ],
  },
  {
    slug: "fifa-2026-challenge",
    variant: "sport",
    name: "FIFA 2026 Challenge",
    title: "FIFA World Cup 2026: Our Neighbourhood, Your Nation",
    tagline: "Multicultural Fan Engagement & Digital Campaign (Hackathon Runner-Up)",
    categories: ["Campaign Strategy", "International Marketing", "Creative Direction"],
    description:
      "An award-winning multicultural marketing concept celebrating Toronto's diverse diaspora neighbourhoods during the FIFA 2026 World Cup, created in a global hackathon with international collaborators.",
    media: {
      type: "image",
      src: "/assets/decks/slides/fifa-slide-1.jpg",
      gradient: "linear-gradient(135deg, #E0AE62 0%, #EFAF8C 100%)",
    },
    role: "Digital Marketing & Creative Strategist",
    timeline: "Mar 2025",
    tools: "Figma, PowerPoint, Social Media Analytics, Brand Strategy",
    client: "Toronto Metropolitan University · FIFA World Cup Challenge",
    heroDescription:
      "Uniting international fans with Toronto's authentic cultural neighbourhoods—Little Portugal, Little Italy, Koreatown, and Little Brazil—through immersive hubs and digital storytelling.",
    brief: "The FIFA challenge called for an international campaign concept that could turn Toronto's multicultural neighbourhoods into meaningful destinations for visiting supporters.",
    objective: "Build a high-energy, culturally specific fan journey that connects global football audiences to the people, food, and stories of Toronto's neighbourhoods.",
    accent: "#E0AE62",
    deckPdf: "/assets/decks/fifa-2026-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/fifa-slide-1.jpg",
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-5.jpg",
      "/assets/decks/slides/fifa-slide-7.jpg",
      "/assets/decks/slides/fifa-slide-10.jpg",
      "/assets/decks/slides/fifa-slide-15.jpg",
    ],
    gallery: [
      "/assets/decks/slides/fifa-slide-2.jpg",
      "/assets/decks/slides/fifa-slide-6.jpg",
      "/assets/decks/slides/fifa-slide-8.jpg",
      "/assets/decks/slides/fifa-slide-11.jpg",
      "/assets/decks/slides/fifa-slide-14.jpg",
    ],
    results: [
      { value: "Runner-Up", label: "Global Hackathon Award" },
      { value: "4 Hubs", label: "Cultural Neighbourhood Activations" },
      { value: "5 Countries", label: "Cross-Border Student Team" },
      { value: "360°", label: "Integrated Media Strategy" },
    ],
    quote: {
      text: "A forward-thinking marketing concept that showcases how football becomes an international language through authentic neighbourhood culture.",
      author: "FIFA Challenge Jury — TMU Global Marketing Initiative",
    },
    phases: [
      {
        id: "brief",
        label: "Context & Findings",
        date: "Stage 1",
        title: "Analysing Fan Demographics",
        description:
          "Explored fan behaviour patterns from previous World Cups and identified opportunities to leverage Canada's vibrant multicultural mosaic.",
      },
      {
        id: "concept",
        label: "Creative Ideation",
        date: "Stage 2",
        title: "Our Neighbourhood, Your Nation",
        description:
          "Formulated the core concept connecting visiting international supporters directly to corresponding diaspora communities in Toronto.",
      },
      {
        id: "broadcasting",
        label: "Activation Strategy",
        date: "Stage 3",
        title: "Immersive Cultural Viewing Hubs",
        description:
          "Designed broadcaster partnerships, digital travel content integrations, and localized community viewing hubs with real-time fan interaction.",
      },
      {
        id: "pitch",
        label: "Global Pitch",
        date: "Stage 4",
        title: "International Jury Presentation",
        description:
          "Presented the 17-slide pitch deck to an international panel of industry judges, securing runner-up honours among global competitors.",
      },
    ],
  },
  {
    slug: "mastercard-sustainability",
    variant: "eco",
    name: "Mastercard Eco-Rebrand",
    title: "Mastercard: Sustainable Rebranding Campaign",
    tagline: "Eco-Conscious Brand Identity & Multi-Channel Rollout",
    categories: ["Brand Strategy", "Sustainable Design", "Social Campaigns"],
    description:
      "A comprehensive brand transformation positioning Mastercard as an environmental leader, featuring eco-centred visual guidelines, transparent metrics, and multi-channel campaign rollouts.",
    media: {
      type: "image",
      src: "/assets/decks/slides/mastercard-slide-1.jpg",
      gradient: "linear-gradient(135deg, #8FB6D8 0%, #A9C6A4 100%)",
    },
    role: "Brand Strategist & Creative Lead",
    timeline: "8 weeks",
    tools: "Adobe Illustrator, Photoshop, Figma, Social Mockup Kits",
    client: "RTA The Creative School · Academic Rebrand Initiative",
    heroDescription:
      "Re-imagining a global financial icon through the lens of affordable sustainability and accessible environmental accountability.",
    brief: "The challenge was to make sustainability feel practical and commercially viable without losing the confidence or recognition of a global financial brand.",
    objective: "Create an accessible eco-conscious identity and multi-channel framework that turns environmental accountability into a daily brand behaviour.",
    accent: "#8FB6D8",
    deckPdf: "/assets/decks/rta-mastercard-slide-deck.pdf",
    slides: [
      "/assets/decks/slides/mastercard-slide-1.jpg",
      "/assets/decks/slides/mastercard-slide-3.jpg",
      "/assets/decks/slides/mastercard-slide-4.jpg",
      "/assets/decks/slides/mastercard-slide-6.jpg",
      "/assets/decks/slides/mastercard-slide-8.jpg",
    ],
    gallery: [
      "/assets/decks/slides/mastercard-slide-3.jpg",
      "/assets/decks/slides/mastercard-slide-5.jpg",
      "/assets/decks/slides/mastercard-slide-7.jpg",
      "/assets/decks/slides/mastercard-slide-9.jpg",
      "/assets/decks/slides/mastercard-slide-10.jpg",
    ],
    results: [
      { value: "100%", label: "Recycled Core Materials Concept" },
      { value: "#1", label: "Hashtag Campaign Strategy" },
      { value: "3 Channels", label: "Tailored Multi-Platform Rollouts" },
      { value: "A+", label: "Academic Distinction" },
    ],
    quote: {
      text: "A stellar, grounded campaign that proves sustainable branding can be aspirational, accessible, and commercially viable.",
      author: "Professor Chelsea Vernhout — RTA The Creative School",
    },
    phases: [
      {
        id: "strategy",
        label: "Strategic Positioning",
        date: "Phase 1",
        title: "Affordable Sustainability",
        description:
          "Formulated the core brand promise: making sustainability accessible to everyday cardholders through micro-rewards and carbon tracking.",
      },
      {
        id: "visual",
        label: "Visual Identity",
        date: "Phase 2",
        title: "Eco-Conscious Design Language",
        description:
          "Crafted a serene, nature-inspired palette (Teal #99C0C4, Forest tones), refreshed typography, and eco-certified emblem overlays.",
      },
      {
        id: "social",
        label: "Social Framework",
        date: "Phase 3",
        title: "Omnichannel Campaign Mockups",
        description:
          "Designed multi-format content suites across Instagram carousels, Twitter poll activations, and Facebook educational hubs.",
      },
      {
        id: "guidelines",
        label: "Brand Guidelines",
        date: "Phase 4",
        title: "Complete Style Guide & Pitch Deck",
        description:
          "Delivered the 11-page master deck complete with voice parameters, language hashtags, and implementation guidelines.",
      },
    ],
  },
  {
    slug: "cicu-creative-showcase",
    variant: "culture",
    name: "CICU Creative Showcase",
    title: "Creative Industries Course Union: Showcase & Events",
    tagline: "Event Creative Direction, Photography & Multichannel Campaign",
    categories: ["Creative Direction", "Event Production", "35mm Photography"],
    description:
      "End-to-end creative direction, multichannel social media promotion, and live 35mm film event photography for TMU's premier Creative Industries Showcase and Alum Night.",
    media: {
      type: "image",
      src: "/assets/cicu/showcase/showcase-slide-1.jpg",
      gradient: "linear-gradient(135deg, #C3C6E8 0%, #EFAF8C 100%)",
    },
    role: "VP Marketing / Creative Director",
    timeline: "Annual 2023 — 2025",
    tools: "35mm Film, Adobe Premiere, After Effects, Canva, Instagram",
    client: "Creative Industries Course Union (CRI Union)",
    heroDescription:
      "Driving student engagement and professional alumni networking through high-energy motion reels, retro 35mm film photography, and multi-slide carousels.",
    brief: "CICU needed a recognizable campaign language that could move fluidly from event promotion to live coverage, alumni networking, and post-showcase merch.",
    objective: "Build a living visual identity that makes student creativity feel immediate, communal, and worth showing up for.",
    accent: "#C3C6E8",
    detailVideo: "/assets/cicu/showcase/showcase-reel.mp4",
    gallery: [
      "/assets/cicu/events/001152030003.jpg",
      "/assets/cicu/events/001152030006.jpg",
      "/assets/cicu/events/001152030008.jpg",
      "/assets/cicu/events/001152030023.jpg",
      "/assets/cicu/events/IMG_1071.JPG",
      "/assets/cicu/events/IMG_1082.JPG",
      "/assets/cicu/events/IMG_1087.JPG",
      "/assets/cicu/showcase/showcase-post-1.jpg",
      "/assets/cicu/alum/alum-graphic-1.jpg",
      "/assets/cicu/merch/cicu-merch.jpg",
    ],
    results: [
      { value: "500+", label: "Showcase Event Attendees" },
      { value: "+120%", label: "Instagram Reel Impressions" },
      { value: "9+", label: "Signature Events Executed" },
      { value: "100%", label: "Student Sold-Out Merch Drop" },
    ],
    quote: {
      text: "Shanesia brought unparalleled energy and visual artistry to every campaign. The 35mm photos and reels captured the spirit of our community flawlessly.",
      author: "Executive Board — Creative Industries Course Union",
    },
    phases: [
      {
        id: "concept",
        label: "Visual Direction",
        date: "Month 1",
        title: "Showcase Brand Identity",
        description:
          "Created retro-modern design assets and promotional typography for the annual student showcase across print and digital media.",
      },
      {
        id: "reels",
        label: "Motion & Teasers",
        date: "Month 2",
        title: "Short-Form Video Production",
        description:
          "Produced fast-paced Instagram reels and multi-card teaser carousels spotlighting student artists and industry guest speakers.",
      },
      {
        id: "events",
        label: "Event Execution",
        date: "Month 3",
        title: "Live Production & 35mm Coverage",
        description:
          "Managed live on-site media capture using analog 35mm film and digital rigs, documenting student performances and networking floors.",
      },
      {
        id: "recap",
        label: "Recap & Merch",
        date: "Month 4",
        title: "Post-Event Engagement & Merch Launch",
        description:
          "Launched the official CICU merchandise line and curated digital galleries to celebrate community creators.",
      },
    ],
  },
  {
    slug: "parks-canada-tmu",
    variant: "systems",
    name: "Digital Knowledge Hubs",
    title: "Parks Canada & TMU Bridging Divides: Digital Knowledge Platforms",
    tagline: "Enterprise Intranet Rollout & Academic Research Hub",
    categories: ["Digital Transformation", "Information Architecture", "Content Audits"],
    description:
      "Led digital content coordination and LMS platform transitions across government agencies and academic research initiatives, ensuring seamless adoption and WCAG accessibility.",
    media: {
      type: "image",
      src: "/assets/social-campaigns/657330996_18523546387073873_6501039019688977632_n.jpg",
      gradient: "linear-gradient(135deg, #A9C6A4 0%, #8FB6D8 100%)",
    },
    role: "Digital Communications Coordinator",
    timeline: "2022 — 2024",
    tools: "Microsoft 365, SharePoint, Teams, Moodle LMS, Mailchimp",
    client: "Government of Canada (Parks Canada) · TMU Bridging Divides",
    heroDescription:
      "Centralising multi-departmental research, onboarding materials, and digital workflows into intuitive, human-centred knowledge hubs.",
    brief: "Parks Canada and TMU teams were navigating dispersed files, platforms, and onboarding resources that made everyday knowledge harder to find and maintain.",
    objective: "Design an accessible information architecture that gives complex organisations a shared, governable source of truth.",
    accent: "#A9C6A4",
    gallery: [
      "/assets/social-campaigns/657330996_18523546387073873_6501039019688977632_n.jpg",
      "/assets/social-campaigns/658199108_1502077238100106_6599288384797853068_n.jpg",
      "/assets/social-campaigns/658546107_18525261145073873_9165961374694293050_n.jpg",
    ],
    results: [
      { value: "1,000+", label: "Employees Onboarded to M365" },
      { value: "100%", label: "WCAG Accessibility Compliance" },
      { value: "40+", label: "Research Projects Centralised" },
      { value: "-50%", label: "Information Search Friction" },
    ],
    quote: {
      text: "Her structured approach to knowledge hubs and digital accessibility ensured smooth adoption across complex inter-departmental teams.",
      author: "Director of Digital Strategy — Public Sector Initiatives",
    },
    phases: [
      {
        id: "audit",
        label: "Content Audit",
        date: "Phase 1",
        title: "Identifying Communication Gaps",
        description:
          "Conducted thorough audits of legacy files and platform usage across SharePoint, Teams, and departmental servers.",
      },
      {
        id: "architecture",
        label: "Platform Architecture",
        date: "Phase 2",
        title: "Intuitive Knowledge Architecture",
        description:
          "Designed clean navigation pathways, tagged taxonomy, and standardised resource repositories for cross-functional staff.",
      },
      {
        id: "training",
        label: "Fluency & Onboarding",
        date: "Phase 3",
        title: "Tutorial Decks & Video Guides",
        description:
          "Authored step-by-step onboarding decks, infographics, and quick-start tutorials to foster organisational digital fluency.",
      },
      {
        id: "review",
        label: "Quality & Governance",
        date: "Phase 4",
        title: "Two-Way Feedback & Governance",
        description:
          "Established feedback channels with leadership to maintain content accuracy, WCAG standards, and ongoing system health.",
      },
    ],
  },
  {
    slug: "good-gift-visual",
    variant: "cinematic",
    name: "Good Gift Motion",
    title: "Good Gift: Visual Storytelling & Motion Production",
    tagline: "Creative Video Production & Visual Identity",
    categories: ["Motion Graphics", "Video Production", "Visual Storytelling"],
    description:
      "A cinematic visual narrative blending experimental motion design, evocative pacing, and art direction to explore modern gift-giving and emotional connection.",
    media: {
      type: "video",
      src: "/assets/cicu/alum/alum-reel.mp4",
      gradient: "linear-gradient(135deg, #EFD0B4 0%, #EFAF8C 100%)",
    },
    role: "Director & Motion Designer",
    timeline: "Creative Exploration",
    tools: "Adobe Premiere, After Effects, DaVinci Resolve, Adobe Illustrator",
    client: "Creative Studio Production",
    heroDescription:
      "Crafting an intimate, sensory visual narrative through rhythmic editing, bespoke colour grading, and deliberate audio-visual choreography.",
    brief: "Good Gift was an exploration of how pacing, texture, and visual warmth can make a simple exchange feel cinematic and emotionally specific.",
    objective: "Use motion, sound, and tactile art direction to turn a familiar gesture into an intimate visual story.",
    accent: "#EFD0B4",
    detailVideo: "/assets/cicu/alum/alum-reel.mp4",
    slides: [
      "/assets/cicu/alum/alum-graphic-1.jpg",
      "/assets/cicu/alum/alum-graphic-2.jpg",
      "/assets/cicu/alum/alum-graphic-3.jpg",
      "/assets/cicu/merch/cicu-merch.jpg",
    ],
    results: [
      { value: "4K Master", label: "Cinematic Video Quality" },
      { value: "100%", label: "Original Creative Direction" },
      { value: "60fps", label: "Smooth Visual Choreography" },
    ],
    quote: {
      text: "A poignant exploration of rhythm, motion, and visual warmth that demonstrates how video moves audiences emotionally.",
      author: "Film & Creative Technologies Workshop — London UK",
    },
    phases: [
      {
        id: "concept",
        label: "Visual Concept",
        date: "Phase 1",
        title: "Moodboard & Storyboarding",
        description:
          "Developed visual themes centred around warmth, tactile textures, and subtle emotional micro-interactions.",
      },
      {
        id: "production",
        label: "Cinematography",
        date: "Phase 2",
        title: "Shooting & Dynamic Lighting",
        description:
          "Captured high-frame-rate visual plates with dramatic shadows and atmospheric natural lighting.",
      },
      {
        id: "post",
        label: "Post-Production",
        date: "Phase 3",
        title: "Editing, Sound & Grading",
        description:
          "Fine-tuned cut rhythms, mastered audio textures, and graded colour tones into a cohesive warm palette.",
      },
      {
        id: "export",
        label: "Master Delivery",
        date: "Phase 4",
        title: "Multi-Format Export",
        description:
          "Delivered optimised web masters for interactive portfolio showcase and high-resolution playback.",
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
